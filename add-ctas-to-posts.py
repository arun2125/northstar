#!/usr/bin/env python3
import os
import re

MID_CTA = """
---

> 💫 **Want Your Personal 2026 Forecast?**  
> Chat with Tara, our AI astrologer, for a free reading combining Western, Vedic, and Numerology insights tailored to your birth chart.  
> [Start Free Reading →](/chat)

---
"""

END_CTA = """
---

## 📬 Get Your Weekly Cosmic Weather Report

Join 2,000+ readers getting personalized astrology insights every Monday.

**What you'll get:**
- Weekly planetary transits explained
- Your personal horoscope (all 12 signs)
- Moon phase guidance
- Mercury retrograde alerts

*No spam. Unsubscribe anytime.*

[Join the Waitlist →](/#waitlist)

---
"""

def add_ctas_to_file(filepath):
    """Add CTAs to a single blog post file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if CTAs already exist
    if '💫 **Want Your Personal 2026 Forecast?**' in content:
        print(f"⏭️  CTAs already exist in {filepath}, skipping")
        return False
    
    lines = content.split('\n')
    new_lines = []
    mid_cta_added = False
    end_cta_added = False
    section_count = 0
    
    for i, line in enumerate(lines):
        # Count major sections (## headers)
        if line.startswith('## ') and not line.startswith('### '):
            section_count += 1
            
            # Add mid-CTA after 3rd major section (usually after Mercury Retrograde or main transit section)
            if section_count == 3 and not mid_cta_added:
                new_lines.append(line)
                new_lines.append(MID_CTA)
                mid_cta_added = True
                continue
        
        # Add end-CTA before final sections (Final Guidance, Transformation Toolkit, etc.)
        if re.match(r'^## (Final|Your 2026 Transformation|Embracing)', line) and not end_cta_added:
            new_lines.append(END_CTA)
            end_cta_added = True
        
        new_lines.append(line)
    
    # Write back
    new_content = '\n'.join(new_lines)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    posts_dir = 'content/posts'
    
    # Process 2026 prediction posts first
    prediction_posts = [
        f for f in os.listdir(posts_dir) 
        if f.endswith('2026-predictions.md')
    ]
    
    print(f"Found {len(prediction_posts)} prediction posts to update\n")
    
    updated = 0
    for filename in sorted(prediction_posts):
        filepath = os.path.join(posts_dir, filename)
        print(f"Processing {filename}...")
        if add_ctas_to_file(filepath):
            print(f"  ✓ Added CTAs")
            updated += 1
        print()
    
    print(f"\n✅ Updated {updated} posts with CTAs!")
    print(f"\nNext steps:")
    print(f"1. Review changes: cd /Users/ay/code/northstar && git diff content/posts/")
    print(f"2. Commit: git add content/posts/ && git commit -m 'Add conversion CTAs to 2026 prediction posts'")
    print(f"3. Deploy: git push")

if __name__ == '__main__':
    main()
