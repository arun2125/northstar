#!/usr/bin/env python3
"""Fix placeholder CTA links in all blog posts."""

import re
from pathlib import Path

CONTENT_DIR = Path('/Users/ay/code/northstar/content/posts')

# Pattern to match the placeholder CTAs
PATTERNS = [
    (r'\[Book a Reading\]', '[Chat with Tara →](/chat)'),
    (r'\[Get Your Personal 2026 Transit Report\]', '[Get Your Free Reading →](/chat)'),
    (r'\[Get Your 2026 Transit Report\]', '[Get Your Free Reading →](/chat)'),
]

def fix_post(filepath):
    """Fix placeholder CTAs in a single post."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Apply all pattern replacements
    for pattern, replacement in PATTERNS:
        content = re.sub(pattern, replacement, content)
    
    # Only write if changed
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    """Fix all posts."""
    print("🔧 Fixing placeholder CTA links...\n")
    
    fixed_count = 0
    
    for filepath in sorted(CONTENT_DIR.glob('*.md')):
        if fix_post(filepath):
            print(f"✅ Fixed: {filepath.name}")
            fixed_count += 1
    
    print(f"\n✅ Fixed {fixed_count} posts")

if __name__ == '__main__':
    main()
