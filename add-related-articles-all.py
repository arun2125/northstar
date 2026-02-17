#!/usr/bin/env python3
"""Add Related Articles to ALL blog posts based on intelligent matching."""

import os
import re
from pathlib import Path
from collections import defaultdict

CONTENT_DIR = Path('/Users/ay/code/northstar/content/posts')

# Mapping of post categories/topics to related articles
RELATED_MAP = {
    # Zodiac 2026 predictions - already have related articles
    'aries-2026': ['blog/aries-personality-traits', 'blog/best-matches-for-aries', 'blog/2026-astrology-predictions'],
    'taurus-2026': ['blog/taurus-personality-traits', 'blog/astrology-elements-explained', 'blog/2026-astrology-predictions'],
    'gemini-2026': ['blog/gemini-personality-traits', 'blog/astrology-elements-explained', 'blog/2026-astrology-predictions'],
    'cancer-2026': ['blog/cancer-personality-traits', 'blog/best-matches-for-cancer', 'blog/2026-astrology-predictions'],
    'leo-2026': ['blog/leo-personality-traits', 'blog/best-matches-for-leo', 'blog/2026-astrology-predictions'],
    'virgo-2026': ['blog/virgo-personality-traits', 'blog/best-matches-for-virgo', 'blog/2026-astrology-predictions'],
    'libra-2026': ['blog/libra-personality-traits', 'blog/astrology-elements-explained', 'blog/2026-astrology-predictions'],
    'scorpio-2026': ['blog/scorpio-personality-traits', 'blog/best-matches-for-scorpio', 'blog/2026-astrology-predictions'],
    'sagittarius-2026': ['blog/sagittarius-personality-traits', 'blog/astrology-elements-explained', 'blog/2026-astrology-predictions'],
    'capricorn-2026': ['blog/capricorn-personality-traits', 'blog/best-matches-for-capricorn', 'blog/2026-astrology-predictions'],
    'aquarius-2026': ['blog/aquarius-personality-traits', 'blog/astrology-elements-explained', 'blog/2026-astrology-predictions'],
    'pisces-2026': ['blog/pisces-personality-traits', 'blog/astrology-elements-explained', 'blog/2026-astrology-predictions'],
    
    # Personality traits
    'personality': ['blog/astrology-elements-explained', 'blog/astrology-modalities-explained', 'blog/12-houses-explained'],
    
    # Compatibility
    'compatibility': ['blog/compatibility-all-systems', 'blog/attachment-styles-astrology'],
    
    # Numerology
    'numerology': ['blog/life-path-number-meaning', 'blog/expression-number-meaning', 'blog/birthday-number-meaning'],
    
    # Vedic astrology
    'vedic': ['blog/nakshatras-explained', 'blog/dasha-system-explained', 'blog/vedic-vs-western'],
    
    # General astrology
    'astrology-basics': ['blog/12-houses-explained', 'blog/astrology-elements-explained', 'blog/astrology-modalities-explained'],
}

def get_post_category(filename):
    """Determine category from filename."""
    name = filename.replace('.md', '')
    
    # 2026 predictions
    if '2026-predictions' in name:
        return f"{name.split('-')[0]}-2026"
    
    # Personality traits
    if 'personality-traits' in name:
        return 'personality'
    
    # Best matches
    if 'best-matches' in name:
        return 'compatibility'
    
    # Numerology
    if any(x in name for x in ['life-path', 'expression-number', 'soul-urge', 'birthday-number', 'master-numbers']):
        return 'numerology'
    
    # Vedic
    if any(x in name for x in ['vedic', 'nakshatra', 'dasha', 'kundali']):
        return 'vedic'
    
    # General astrology
    if any(x in name for x in ['houses', 'elements', 'modalities', 'zodiac', 'planets']):
        return 'astrology-basics'
    
    return 'general'

def get_related_articles(filename, category):
    """Generate related articles based on category."""
    name = filename.replace('.md', '')
    
    # If we have a specific mapping, use it
    if category in RELATED_MAP:
        links = RELATED_MAP[category]
    else:
        # Default to general astrology links
        links = ['blog/12-houses-explained', 'blog/astrology-elements-explained', 'blog/2026-astrology-predictions']
    
    # Don't link to self
    self_slug = f"blog/{name}"
    links = [link for link in links if link != self_slug]
    
    # Take first 3-4 links
    links = links[:4]
    
    # Convert to markdown list (need to add titles - for now use slugs)
    # In production, we'd fetch actual titles from frontmatter
    articles = []
    for link in links:
        slug = link.replace('blog/', '')
        # Create a readable title from slug
        title = slug.replace('-', ' ').title()
        # Handle special cases
        title = title.replace('2026 Predictions', '2026 Horoscope')
        title = title.replace('Personality Traits', 'Traits & Characteristics')
        articles.append(f"- [{title}](/{link})")
    
    return "\n".join(articles)

def post_has_related_articles(content):
    """Check if post already has Related Articles section."""
    return bool(re.search(r'\*\*Related Articles:\*\*', content))

def add_related_articles(filename):
    """Add Related Articles to a post if it doesn't have them."""
    filepath = CONTENT_DIR / filename
    
    if not filepath.exists():
        return False
    
    # Read file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has Related Articles
    if post_has_related_articles(content):
        return False
    
    # Determine category
    category = get_post_category(filename)
    
    # Generate related articles
    related = get_related_articles(filename, category)
    
    # Add Related Articles before the final "---" or at the end
    lines = content.rstrip().split('\n')
    
    # Find where to insert (before last line if it's "---" or similar)
    if lines[-1].strip() in ['', '---', '*Last updated*']:
        insertion_point = -1
    else:
        insertion_point = len(lines)
    
    new_section = f"\n**Related Articles:**\n{related}\n"
    
    if insertion_point == -1:
        lines.insert(-1, new_section.rstrip())
    else:
        lines.append(new_section.rstrip())
    
    new_content = '\n'.join(lines) + '\n'
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    """Add Related Articles to all posts."""
    print("🔧 Adding Related Articles to all blog posts...\n")
    
    # Get all markdown files
    posts = sorted([f.name for f in CONTENT_DIR.glob('*.md')])
    
    added_count = 0
    skipped_count = 0
    
    for post in posts:
        if add_related_articles(post):
            print(f"✅ Added Related Articles to: {post}")
            added_count += 1
        else:
            print(f"⏭️  Skipped (already has): {post}")
            skipped_count += 1
    
    print(f"\n✅ Added Related Articles to {added_count} posts")
    print(f"⏭️  Skipped {skipped_count} posts (already had them)")
    print(f"\n📊 Total: {added_count + skipped_count} posts processed")

if __name__ == '__main__':
    main()
