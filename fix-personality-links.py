#!/usr/bin/env python3
"""Fix placeholder # links in personality trait posts."""

import re
from pathlib import Path

CONTENT_DIR = Path('/Users/ay/code/northstar/content/posts')

# Pattern replacements - more general patterns
SIGN_PATTERNS = [
    # Format: pattern -> replacement
    (r'\[Scorpio\'s intensity\]\(#\)', '[Scorpio\'s intensity](/blog/scorpio-personality-traits)'),
    (r'\[Capricorn\'s endurance\]\(#\)', '[Capricorn\'s endurance](/blog/capricorn-personality-traits)'),
    (r'\[Capricorn\'s professional boundaries\]\(#\)', '[Capricorn\'s professional boundaries](/blog/capricorn-personality-traits)'),
    (r'\[Capricorn\'s self-sufficiency\]\(#\)', '[Capricorn\'s self-sufficiency](/blog/capricorn-personality-traits)'),
    (r'\[Capricorn\'s work ethic\]\(#\)', '[Capricorn\'s work ethic](/blog/capricorn-personality-traits)'),
    (r'\[Aries\' directness\]\(#\)', '[Aries\' directness](/blog/aries-personality-traits)'),
    (r'\[Aries\' efficient intensity\]\(#\)', '[Aries\' efficient intensity](/blog/aries-personality-traits)'),
    (r'\[Aries\' play and spontaneity\]\(#\)', '[Aries\' play and spontaneity](/blog/aries-personality-traits)'),
    (r'\[Pisces\' compassion\]\(#\)', '[Pisces\' compassion](/blog/pisces-personality-traits)'),
    (r'\[Cancer\'s emotional intelligence\]\(#\)', '[Cancer\'s emotional intelligence](/blog/cancer-personality-traits)'),
    (r'\[Cancer\'s emotional openness\]\(#\)', '[Cancer\'s emotional openness](/blog/cancer-personality-traits)'),
    (r'\[Leo\'s work-life celebration\]\(#\)', '[Leo\'s work-life celebration](/blog/leo-personality-traits)'),
    (r'\[zodiac compatibility guide\]\(#\)', '[zodiac compatibility guide](/blog/zodiac-compatibility-real-way)'),
    (r'\[fire sign dynamics\]\(#\)', '[fire sign dynamics](/blog/astrology-elements-explained)'),
    (r'\[Taurus compatibility guide\]\(#\)', '[Taurus compatibility guide](/blog/best-matches-for-taurus)'),
    (r'\[Virgo personality breakdown\]\(#\)', '[Virgo personality breakdown](/blog/virgo-personality-traits)'),
]

def fix_post(filepath):
    """Fix placeholder links in a single post."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Apply all pattern replacements
    for pattern, replacement in SIGN_PATTERNS:
        content = re.sub(pattern, replacement, content)
    
    # Only write if changed
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    """Fix all personality posts."""
    print("🔧 Fixing placeholder # links in personality posts...\n")
    
    fixed_count = 0
    
    for filepath in sorted(CONTENT_DIR.glob('*personality-traits.md')):
        if fix_post(filepath):
            print(f"✅ Fixed: {filepath.name}")
            fixed_count += 1
    
    print(f"\n✅ Fixed {fixed_count} personality posts")

if __name__ == '__main__':
    main()
