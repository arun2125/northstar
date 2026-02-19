#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Convert markdown blog posts to Medium-compatible format.

Handles:
- Tables → bullet lists
- Markdown links → preserved (Medium supports these)
- Frontmatter → stripped
- CTAs → adjusted for Medium
"""

import re
import sys
from pathlib import Path

def strip_frontmatter(content):
    """Remove YAML frontmatter."""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            return parts[2].strip()
    return content

def convert_table_to_list(content):
    """Convert markdown tables to bullet lists."""
    
    def replace_table(match):
        table = match.group(0)
        lines = [line.strip() for line in table.split('\n') if line.strip()]
        
        # Skip header separator line (the one with ---)
        lines = [line for line in lines if not re.match(r'^[\|\s\-:]+$', line)]
        
        # Convert rows to bullet points
        bullets = []
        for line in lines:
            # Remove leading/trailing pipes
            line = line.strip('|').strip()
            # Split by pipe and clean
            cells = [cell.strip() for cell in line.split('|')]
            # Format as bullet
            if len(cells) >= 2:
                bullets.append("• " + " — ".join(cells))
        
        return '\n'.join(bullets)
    
    # Match markdown tables (lines with pipes)
    pattern = r'(?:^\|.+\|$\n?)+'
    content = re.sub(pattern, replace_table, content, flags=re.MULTILINE)
    
    return content

def add_canonical_notice(content, canonical_url):
    """Add canonical URL notice at the end."""
    notice = "\n\n---\n\n*Originally published at [" + canonical_url + "](" + canonical_url + ")*\n"
    return content + notice

def clean_for_medium(content):
    """General cleanup for Medium compatibility."""
    
    # Remove meta description blocks
    content = re.sub(r'\*\*Meta Description.*?\*\*', '', content, flags=re.DOTALL)
    
    # Remove CTA blocks (they render poorly on Medium)
    # Pattern: blockquote with multiple lines including links
    content = re.sub(r'^> .*?(?=\n\n|\n---)', '', content, flags=re.MULTILINE | re.DOTALL)
    
    # Remove standalone horizontal rules after blockquotes
    content = re.sub(r'\n---\n\n---', '\n\n---', content)
    
    # Convert internal links to full URLs
    content = re.sub(r'\]\(/blog/', '](https://northstarastro.com/blog/', content)
    content = re.sub(r'\]\(/chat', '](https://northstarastro.com/chat', content)
    content = re.sub(r'\]\(/free-birth-chart', '](https://northstarastro.com/free-birth-chart', content)
    content = re.sub(r'\]\(/#waitlist', '](https://northstarastro.com/#waitlist', content)
    
    # Remove "Last updated" footer
    content = re.sub(r'\*Last updated:.*?\*', '', content)
    
    return content

def convert_post(filepath, canonical_url=None):
    """Convert a markdown post to Medium format."""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Process
    content = strip_frontmatter(content)
    content = convert_table_to_list(content)
    content = clean_for_medium(content)
    
    if canonical_url:
        content = add_canonical_notice(content, canonical_url)
    
    return content

def main():
    if len(sys.argv) < 2:
        print("Usage: python convert-to-medium.py <post-slug>")
        print("Example: python convert-to-medium.py 2026-astrology-predictions")
        sys.exit(1)
    
    slug = sys.argv[1]
    filepath = Path("content/posts/" + slug + ".md")
    
    if not filepath.exists():
        print("Error: " + str(filepath) + " not found")
        sys.exit(1)
    
    canonical_url = "https://northstarastro.com/blog/" + slug
    
    converted = convert_post(filepath, canonical_url)
    
    # Save to clipboard-ready file
    output_file = Path("medium-exports/" + slug + "-medium.md")
    output_file.parent.mkdir(exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(converted)
    
    print("✅ Converted: " + str(filepath))
    print("📄 Saved to: " + str(output_file))
    print("\n📋 Copy this file and paste into Medium:")
    print("   cat " + str(output_file) + " | pbcopy")
    print("\n🔗 Don't forget to set canonical URL in Medium:")
    print("   " + canonical_url)

if __name__ == '__main__':
    main()
