#!/usr/bin/env python3
import os
import re

# Generic CTAs that work for any astrology content
MID_CTA_GENERIC = """
---

> ✨ **Discover Your Complete Cosmic Blueprint**  
> Get a free AI-powered reading combining Western astrology, Vedic wisdom, and Numerology. Chat with Tara to unlock insights about your personality, life path, and destiny.  
> [Start Your Free Reading →](/chat)

---
"""

END_CTA_GENERIC = """
---

## 📬 Never Miss Your Cosmic Weather

Get weekly astrology insights delivered to your inbox every Monday.

**You'll receive:**
- Personalized horoscopes for all 12 signs
- Planetary transit explanations
- Moon phase guidance & rituals
- Mercury retrograde survival tips

*Join 2,000+ cosmic seekers. Unsubscribe anytime.*

[Get Free Weekly Horoscope →](/#waitlist)

---
"""

def add_ctas_to_file(filepath):
    """Add CTAs to a single blog post file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if CTAs already exist
    if '✨ **Discover Your Complete Cosmic Blueprint**' in content or '💫 **Want Your Personal' in content:
        return False
    
    lines = content.split('\n')
    new_lines = []
    mid_cta_added = False
    end_cta_added = False
    h2_count = 0
    total_lines = len(lines)
    
    for i, line in enumerate(lines):
        # Count H2 headers
        if line.startswith('## ') and not line.startswith('###'):
            h2_count += 1
            
            # Add mid-CTA after 2nd or 3rd H2 (roughly 25-30% through article)
            if h2_count == 3 and not mid_cta_added and i < total_lines * 0.4:
                new_lines.append(line)
                new_lines.append(MID_CTA_GENERIC)
                mid_cta_added = True
                continue
        
        # Add end-CTA before final sections or around 80% through
        if not end_cta_added:
            # Trigger on final-sounding headers
            if re.match(r'^## (Final|Conclusion|Summary|Takeaway|Key|Remember|Bottom Line)', line, re.IGNORECASE):
                new_lines.append(END_CTA_GENERIC)
                end_cta_added = True
            # Or if we're 80% through and haven't added it yet
            elif i > total_lines * 0.8 and h2_count > 3:
                new_lines.append(END_CTA_GENERIC)
                end_cta_added = True
        
        new_lines.append(line)
    
    # If we reached the end without adding end CTA, add it before last section
    if not end_cta_added and len(new_lines) > 50:
        # Insert before last 20 lines
        insert_pos = len(new_lines) - 20
        new_lines.insert(insert_pos, END_CTA_GENERIC)
    
    # Write back
    new_content = '\n'.join(new_lines)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    posts_dir = 'content/posts'
    
    # Get all markdown files
    all_posts = [
        f for f in os.listdir(posts_dir) 
        if f.endswith('.md')
    ]
    
    # Exclude prediction posts (already done)
    other_posts = [f for f in all_posts if '2026-predictions' not in f]
    
    print(f"Found {len(other_posts)} additional blog posts to update\n")
    
    updated = 0
    skipped = 0
    
    for filename in sorted(other_posts):
        filepath = os.path.join(posts_dir, filename)
        if add_ctas_to_file(filepath):
            print(f"✓ {filename}")
            updated += 1
        else:
            skipped += 1
    
    print(f"\n✅ Updated {updated} posts with CTAs!")
    print(f"⏭️  Skipped {skipped} posts (already had CTAs)")
    print(f"\nNext: Review and commit")
    print(f"  git diff content/posts/ | head -100")

if __name__ == '__main__':
    main()
