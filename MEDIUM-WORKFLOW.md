# Medium Cross-Posting Workflow

## Quick Start (3 minutes per post)

### Step 1: Convert Post to Medium Format
```bash
cd /Users/ay/code/northstar
python3 scripts/convert-to-medium.py <post-slug>
```

**Example:**
```bash
python3 scripts/convert-to-medium.py 2026-astrology-predictions
```

### Step 2: Copy to Clipboard
```bash
cat medium-exports/2026-astrology-predictions-medium.md | pbcopy
```

### Step 3: Paste into Medium
1. Go to medium.com/new-story
2. Paste (Cmd+V)
3. Add a cover image if needed
4. Click "..." → "More settings"
5. Add canonical URL: `https://northstarastro.com/blog/<slug>`
6. Click "Publish"

---

## What the Converter Does

✅ **Strips frontmatter** — Removes YAML metadata Medium doesn't need  
✅ **Converts tables to bullets** — Medium doesn't support markdown tables  
✅ **Fixes internal links** — Converts `/blog/` to full URLs  
✅ **Adds canonical notice** — Attribution footer with original URL  
✅ **Removes meta descriptions** — Cleans up SEO-specific content  

---

## Best Posts to Cross-Post

**Priority 1: Evergreen guides**
- 2026-astrology-predictions (hub page)
- Aries-2026-predictions (Neptune in Aries is HUGE)
- Western-vedic-numerology-combined (unique angle)

**Priority 2: Personality content**
- Zodiac sign personality trait posts
- Compatibility guides
- Best matches posts

**Priority 3: Educational**
- 12-houses-explained
- Astrology-elements-explained
- What-is-vedic-astrology

---

## Canonical URL Rules

**Always set canonical URL in Medium settings.**

This tells Google: "This is a copy, the original is at northstarastro.com"

**Why:** Protects your site from duplicate content penalties and funnels SEO juice back to your site.

**Format:** `https://northstarastro.com/blog/<slug>`

---

## Engagement Strategy (from Week 2 plan)

After cross-posting:
1. Find 20-30 astrology writers on Medium
2. Clap their best stories
3. Follow them
4. Comment thoughtfully (no spam)
5. They'll discover your profile → follow back → read your posts

**Expected result:** 5-10 high-quality backlinks from their blogs + increased Medium reach.

---

## Automation Ideas (Future)

- [ ] Script to auto-publish via Medium API (requires API key)
- [ ] Batch convert all top 10 posts at once
- [ ] Auto-schedule Medium posts (stagger over 2 weeks)
- [ ] Track which Medium posts drive most traffic back to site

---

## Troubleshooting

**Q: Tables still look weird?**  
A: Re-run the converter — we updated the table parser.

**Q: Images missing?**  
A: Medium doesn't auto-import images. Upload manually or use Medium's image import feature.

**Q: Links broken?**  
A: Check the converted file — all `/blog/` links should be full URLs now.

**Q: Want to edit the converted version?**  
A: Edit `medium-exports/<slug>-medium.md` before copying to clipboard.

---

**Next:** Cross-post 3 articles this week, engage with 20 astrology writers, get 5-10 backlinks. Go!
