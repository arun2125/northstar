#!/usr/bin/env python3
"""Fix Related Articles section in all zodiac 2026 prediction posts."""

import os
import re
from pathlib import Path

# Zodiac signs
SIGNS = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
]

# Base content directory
CONTENT_DIR = Path('/Users/ay/code/northstar/content/posts')

def get_related_articles(sign):
    """Generate related articles links for a zodiac sign."""
    sign_cap = sign.capitalize()
    
    # Core related articles (same for all signs)
    articles = [
        f"- [2026 Astrology Predictions: Complete Year Guide](/blog/2026-astrology-predictions)",
        f"- [{sign_cap} Personality Traits & Characteristics](/blog/{sign}-personality-traits)",
    ]
    
    # Add best matches if the file exists
    best_matches_file = CONTENT_DIR / f"best-matches-for-{sign}.md"
    if best_matches_file.exists():
        articles.append(f"- [Best Matches for {sign_cap}](/blog/best-matches-for-{sign})")
    
    # Add one relevant general astrology article based on sign element
    fire_signs = ['aries', 'leo', 'sagittarius']
    earth_signs = ['taurus', 'virgo', 'capricorn']
    air_signs = ['gemini', 'libra', 'aquarius']
    water_signs = ['cancer', 'scorpio', 'pisces']
    
    if sign in fire_signs:
        articles.append(f"- [Understanding the Fire Element in Astrology](/blog/astrology-elements-explained)")
    elif sign in earth_signs:
        articles.append(f"- [Understanding the Earth Element in Astrology](/blog/astrology-elements-explained)")
    elif sign in air_signs:
        articles.append(f"- [Understanding the Air Element in Astrology](/blog/astrology-elements-explained)")
    else:  # water signs
        articles.append(f"- [Understanding the Water Element in Astrology](/blog/astrology-elements-explained)")
    
    return "\n".join(articles)

def fix_post(sign):
    """Fix Related Articles section in a single post."""
    filename = CONTENT_DIR / f"{sign}-2026-predictions.md"
    
    if not filename.exists():
        print(f"❌ Post not found: {filename}")
        return False
    
    # Read file
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find and replace the Related Articles section
    # Pattern: **Related Articles:** followed by any list items until next --- or end
    # More flexible pattern to handle both complete and incomplete links
    pattern = r'\*\*Related Articles:\*\*\n(?:- .*\n?)+(?=\n---|\Z)'
    
    new_related = f"\n**Related Articles:**\n{get_related_articles(sign)}\n"
    
    # Replace if pattern exists
    if re.search(pattern, content):
        new_content = re.sub(pattern, new_related.strip() + "\n", content)
        
        # Write back
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Fixed {sign.capitalize()} 2026 predictions (replaced)")
        return True
    else:
        # Related Articles section doesn't exist - add it before the final line
        # Look for the last non-empty line (usually ending text)
        # Add Related Articles before the very last "---" or at the end
        
        # Strategy: Add before the very last line of the file
        lines = content.rstrip().split('\n')
        
        # Insert before last line (which is usually "---" or similar)
        if lines[-1].strip() in ['', '---', '*Last updated*']:
            # Insert before the last line
            lines.insert(-1, new_related.rstrip())
        else:
            # Append at the end
            lines.append(new_related.rstrip())
        
        new_content = '\n'.join(lines) + '\n'
        
        # Write back
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Fixed {sign.capitalize()} 2026 predictions (added)")
        return True

def main():
    """Fix all zodiac prediction posts."""
    print("🔧 Fixing Related Articles in all 2026 prediction posts...\n")
    
    success_count = 0
    for sign in SIGNS:
        if fix_post(sign):
            success_count += 1
    
    print(f"\n✅ Fixed {success_count}/{len(SIGNS)} posts")

if __name__ == '__main__':
    main()
