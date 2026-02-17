#!/bin/bash

# CTA templates
MID_CTA='

---

> 💫 **Want Your Personal 2026 Forecast?**  
> Chat with Tara, our AI astrologer, for a free reading combining Western, Vedic, and Numerology insights tailored to your birth chart.  
> [Start Free Reading →](/chat)

---

'

END_CTA='

---

## 📬 Get Your Weekly Cosmic Weather Report

Join 2,000+ readers getting personalized astrology insights every Monday.

**What you'\''ll get:**
- Weekly planetary transits explained
- Your personal horoscope (all 12 signs)
- Moon phase guidance
- Mercury retrograde alerts

*No spam. Unsubscribe anytime.*

[Join the Waitlist →](/#waitlist)

---

'

# Process each 2026 prediction post
for file in content/posts/*2026-predictions.md; do
  echo "Processing $file..."
  
  # Create backup
  cp "$file" "${file}.backup"
  
  # Add mid-article CTA after the first major section that ends with "---"
  # This will be after the Neptune/main transit section
  awk -v cta="$MID_CTA" '
    BEGIN { section_count = 0; cta_added = 0 }
    /^---$/ { 
      section_count++
      print
      # Add CTA after 3rd or 4th "---" (after first major section)
      if (section_count == 4 && cta_added == 0) {
        print cta
        cta_added = 1
      }
      next
    }
    { print }
  ' "$file" > "${file}.tmp"
  
  mv "${file}.tmp" "$file"
  
  # Add end-article CTA before the final sections
  # Insert before "## Final Guidance" or similar closing section
  awk -v cta="$END_CTA" '
    /^## (Final Guidance|Your 2026 Transformation Toolkit|Embracing Your)/ {
      if (!cta_added) {
        print cta
        cta_added = 1
      }
    }
    { print }
  ' "$file" > "${file}.tmp"
  
  mv "${file}.tmp" "$file"
  
  echo "✓ Added CTAs to $file"
done

echo ""
echo "✅ All 2026 prediction posts updated!"
echo "Review the changes with: git diff content/posts/*2026-predictions.md"
