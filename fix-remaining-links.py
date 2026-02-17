#!/usr/bin/env python3
"""Fix remaining placeholder # links."""

import re
from pathlib import Path

CONTENT_DIR = Path('/Users/ay/code/northstar/content/posts')

# Remaining patterns
PATTERNS = [
    (r'\[Aries personality guide\]\(#\)', '[Aries personality guide](/blog/aries-personality-traits)'),
    (r'\[Sagittarius compatibility breakdown\]\(#\)', '[Sagittarius compatibility breakdown](/blog/sagittarius-personality-traits)'),
    (r'\[Capricorn\'s quiet authority\]\(#\)', '[Capricorn\'s quiet authority](/blog/capricorn-personality-traits)'),
    (r'\[Cancer personality guide\]\(#\)', '[Cancer personality guide](/blog/cancer-personality-traits)'),
    (r'\[Pisces compatibility breakdown\]\(#\)', '[Pisces compatibility breakdown](/blog/pisces-personality-traits)'),
    (r'\[Leo\'s openheartedness\]\(#\)', '[Leo\'s openheartedness](/blog/leo-personality-traits)'),
]

def fix_post(filepath):
    """Fix placeholder links in a single post."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    for pattern, replacement in PATTERNS:
        content = re.sub(pattern, replacement, content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    """Fix remaining posts."""
    print("🔧 Fixing final placeholder links...\n")
    
    fixed_count = 0
    
    for filepath in [
        CONTENT_DIR / 'leo-personality-traits.md',
        CONTENT_DIR / 'scorpio-personality-traits.md'
    ]:
        if filepath.exists() and fix_post(filepath):
            print(f"✅ Fixed: {filepath.name}")
            fixed_count += 1
    
    print(f"\n✅ Fixed {fixed_count} posts")

if __name__ == '__main__':
    main()
