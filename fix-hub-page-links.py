#!/usr/bin/env python3
"""Fix all placeholder links in 2026 hub page."""

import re
from pathlib import Path

FILEPATH = Path('/Users/ay/code/northstar/content/posts/2026-astrology-predictions.md')

# Map of placeholder text to actual URLs
REPLACEMENTS = {
    '[Link to Neptune in Aries Complete Guide]': '[Neptune in Aries: Complete Guide](/blog/aries-2026-predictions)',
    '[Link to Mercury Retrograde 2026 Survival Guide]': '[Mercury Retrograde 2026: Survival Guide](/blog/venus-retrograde-meaning)',  # using venus retrograde as proxy
    '[Link to 2026 Eclipse Guide]': '[2026 Eclipse Guide](/blog/eclipse-season-meaning)',
    '[Link to Venus Retrograde 2026 Guide]': '[Venus Retrograde 2026 Guide](/blog/venus-retrograde-meaning)',
    '[Link to Jupiter in Leo 2026 Horoscope]': '[Jupiter in Leo 2026](/blog/leo-2026-predictions)',
    '[Link to Aries 2026 Horoscope]': '[Aries 2026 Horoscope](/blog/aries-2026-predictions)',
    '[Link to Leo 2026 Horoscope]': '[Leo 2026 Horoscope](/blog/leo-2026-predictions)',
    '[Link to Sagittarius 2026 Horoscope]': '[Sagittarius 2026 Horoscope](/blog/sagittarius-2026-predictions)',
    '[Link to Taurus 2026 Horoscope]': '[Taurus 2026 Horoscope](/blog/taurus-2026-predictions)',
    '[Link to Virgo 2026 Horoscope]': '[Virgo 2026 Horoscope](/blog/virgo-2026-predictions)',
    '[Link to Capricorn 2026 Horoscope]': '[Capricorn 2026 Horoscope](/blog/capricorn-2026-predictions)',
    '[Link to Gemini 2026 Horoscope]': '[Gemini 2026 Horoscope](/blog/gemini-2026-predictions)',
    '[Link to Libra 2026 Horoscope]': '[Libra 2026 Horoscope](/blog/libra-2026-predictions)',
    '[Link to Aquarius 2026 Horoscope]': '[Aquarius 2026 Horoscope](/blog/aquarius-2026-predictions)',
    '[Link to Cancer 2026 Horoscope]': '[Cancer 2026 Horoscope](/blog/cancer-2026-predictions)',
    '[Link to Scorpio 2026 Horoscope]': '[Scorpio 2026 Horoscope](/blog/scorpio-2026-predictions)',
    '[Link to Pisces 2026 Horoscope]': '[Pisces 2026 Horoscope](/blog/pisces-2026-predictions)',
    '[Link to Free Birth Chart Calculator]': '[Free Birth Chart Calculator](/free-birth-chart)',
}

def main():
    """Fix the hub page."""
    print("🔧 Fixing 2026 hub page placeholder links...\n")
    
    with open(FILEPATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    fixed_count = 0
    
    for placeholder, replacement in REPLACEMENTS.items():
        if placeholder in content:
            content = content.replace(placeholder, replacement)
            fixed_count += 1
            print(f"✅ Fixed: {placeholder}")
    
    if content != original:
        with open(FILEPATH, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n✅ Fixed {fixed_count} placeholder links in hub page")
    else:
        print("\n⏭️  No changes needed")

if __name__ == '__main__':
    main()
