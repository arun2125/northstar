#!/usr/bin/env python3
"""
Add glossary anchor links from all blog posts to the glossary page.
Links the FIRST occurrence of each glossary term per post.
"""

import os
import re
from pathlib import Path

# Glossary terms extracted from GLOSSARY-CONTENT.md, organized by anchor
GLOSSARY_TERMS = {
    'A': [
        'ascendant', 'rising sign', 'aspect', 'atmakaraka', 'ayanamsa'
    ],
    'B': [
        'birth chart', 'natal chart', 'bhava', 'bhukti'
    ],
    'C': [
        'cardinal signs', 'conjunction', 'cusp'
    ],
    'D': [
        'dasha', 'descendant', 'decan', 'debilitation'
    ],
    'E': [
        'eclipse', 'elements', 'exaltation', 'expression number'
    ],
    'F': [
        'fixed signs'
    ],
    'G': [
        'gochara', 'graha'
    ],
    'H': [
        'houses'
    ],
    'I': [
        'ic', 'imum coeli'
    ],
    'J': [
        'jyotish', 'jupiter return'
    ],
    'K': [
        'kala sarpa yoga', 'karaka', 'ketu', 'kundali'
    ],
    'L': [
        'lagnam', 'life path number', 'lunar nodes'
    ],
    'M': [
        'mahadasha', 'malefic', 'master numbers', 'mc', 'midheaven', 
        'modalities', 'moon sign', 'mutable signs'
    ],
    'N': [
        'nakshatra', 'nakshatras', 'nodes'
    ],
    'O': [
        'opposition', 'orb'
    ],
    'P': [
        'panchanga', 'planetary dignity', 'pluto return', 'progressed chart'
    ],
    'Q': [
        'quadrants'
    ],
    'R': [
        'rahu', 'rashi', 'retrograde'
    ],
    'S': [
        'sade sati', 'saturn return', 'sextile', 'sidereal zodiac', 
        'square', 'sun sign'
    ],
    'T': [
        'tithi', 'transit', 'trine', 'tropical zodiac'
    ],
    'U': [
        'upachaya houses'
    ],
    'V': [
        'varga charts', 'vimshottari dasha'
    ],
    'Y': [
        'yoga'
    ],
    'Z': [
        'zenith', 'zodiac'
    ]
}

def get_all_terms_with_anchors():
    """Returns a list of (term, anchor) tuples, sorted by length (longest first)."""
    terms = []
    for anchor, term_list in GLOSSARY_TERMS.items():
        for term in term_list:
            terms.append((term.lower(), anchor))
    # Sort by length (longest first) to match multi-word terms before single words
    terms.sort(key=lambda x: len(x[0]), reverse=True)
    return terms

def is_already_linked(content, pos, term_len):
    """Check if the term at position pos is already part of a markdown link."""
    # Look back to see if we're inside a link
    before = content[max(0, pos-100):pos]
    after = content[pos+term_len:pos+term_len+100]
    
    # Check if inside markdown link syntax [text](url)
    if '[' in before and '](' not in before:
        # We might be inside the link text
        if ')' in after:
            return True
    
    # Check if the term itself is wrapped in link syntax
    if before.endswith('[') and after.startswith(']'):
        return True
        
    return False

def add_glossary_links(content, post_name):
    """Add glossary links to first occurrence of each term in content."""
    terms_linked = {}
    modified_content = content
    offset = 0  # Track position changes due to insertions
    
    terms_with_anchors = get_all_terms_with_anchors()
    
    # Find all term occurrences first
    replacements = []
    
    for term, anchor in terms_with_anchors:
        if term in terms_linked:
            continue
            
        # Create case-insensitive regex that matches whole words
        # Escape special regex characters in term
        escaped_term = re.escape(term)
        pattern = r'\b' + escaped_term + r'\b'
        
        # Find first occurrence (case-insensitive)
        match = re.search(pattern, content, re.IGNORECASE)
        
        if match:
            pos = match.start()
            matched_text = match.group()
            
            # Check if already linked
            if is_already_linked(content, pos, len(matched_text)):
                continue
            
            # Check if inside frontmatter (YAML between --- markers)
            # Count --- before this position
            frontmatter_markers = content[:pos].count('---')
            if frontmatter_markers % 2 == 1:
                # Inside frontmatter, skip
                continue
                
            # Check if inside code block
            code_blocks_before = content[:pos].count('```')
            if code_blocks_before % 2 == 1:
                # Inside code block, skip
                continue
            
            # Store replacement
            replacements.append({
                'pos': pos,
                'length': len(matched_text),
                'term': matched_text,
                'anchor': anchor,
                'original_term': term
            })
            terms_linked[term] = True
    
    # Sort replacements by position (reverse order to avoid offset issues)
    replacements.sort(key=lambda x: x['pos'], reverse=True)
    
    # Apply replacements
    for repl in replacements:
        pos = repl['pos']
        length = repl['length']
        term = repl['term']
        anchor = repl['anchor']
        
        # Create the link with lowercase term
        link = f"[{term.lower()}](/glossary#{anchor})"
        
        # Replace in content
        modified_content = modified_content[:pos] + link + modified_content[pos+length:]
    
    if replacements:
        print(f"  ✓ {post_name}: Added {len(replacements)} glossary links")
        return modified_content, len(replacements)
    else:
        return content, 0

def process_all_posts():
    """Process all blog posts and add glossary links."""
    posts_dir = Path('/Users/ay/code/northstar/content/posts')
    
    if not posts_dir.exists():
        print(f"Error: Directory {posts_dir} not found")
        return
    
    markdown_files = list(posts_dir.glob('*.md'))
    total_posts = len(markdown_files)
    total_links_added = 0
    posts_modified = 0
    
    print(f"\n🔗 Processing {total_posts} blog posts...\n")
    
    for md_file in sorted(markdown_files):
        try:
            content = md_file.read_text(encoding='utf-8')
            new_content, links_added = add_glossary_links(content, md_file.name)
            
            if links_added > 0:
                md_file.write_text(new_content, encoding='utf-8')
                total_links_added += links_added
                posts_modified += 1
                
        except Exception as e:
            print(f"  ✗ Error processing {md_file.name}: {e}")
    
    print(f"\n{'='*60}")
    print(f"✅ COMPLETE!")
    print(f"{'='*60}")
    print(f"Posts processed: {total_posts}")
    print(f"Posts modified: {posts_modified}")
    print(f"Total glossary links added: {total_links_added}")
    print(f"Average links per modified post: {total_links_added/posts_modified:.1f}" if posts_modified > 0 else "")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    process_all_posts()
