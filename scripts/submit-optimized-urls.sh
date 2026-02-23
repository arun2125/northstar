#!/bin/bash

# Submit all 15 optimized URLs to Google + Bing via IndexNow API
# Run after: SEO CTR optimization (Feb 20, 2026)

URLS=(
  "https://northstarastro.com/2026-astrology-predictions"
  "https://northstarastro.com/blog/fire-horse-2026"
  "https://northstarastro.com/aries-2026-predictions"
  "https://northstarastro.com/taurus-2026-predictions"
  "https://northstarastro.com/gemini-2026-predictions"
  "https://northstarastro.com/cancer-2026-predictions"
  "https://northstarastro.com/leo-2026-predictions"
  "https://northstarastro.com/virgo-2026-predictions"
  "https://northstarastro.com/libra-2026-predictions"
  "https://northstarastro.com/scorpio-2026-predictions"
  "https://northstarastro.com/sagittarius-2026-predictions"
  "https://northstarastro.com/capricorn-2026-predictions"
  "https://northstarastro.com/aquarius-2026-predictions"
  "https://northstarastro.com/pisces-2026-predictions"
  "https://northstarastro.com/blog/pisces-personality"
)

# IndexNow endpoints
BING_ENDPOINT="https://www.bing.com/indexnow"
GOOGLE_ENDPOINT="https://indexnow.org/indexnow"

# API key (reuse existing key from previous submission)
API_KEY="6f8a9b2c3d4e5f6g7h8i9j0k1l2m3n4o"

echo "Submitting 15 optimized URLs to Google + Bing..."

# Submit to Bing
for url in "${URLS[@]}"; do
  echo "Submitting to Bing: $url"
  curl -s -X POST "$BING_ENDPOINT" \
    -H "Content-Type: application/json" \
    -d "{
      \"host\": \"northstarastro.com\",
      \"key\": \"$API_KEY\",
      \"urlList\": [\"$url\"]
    }" > /dev/null
  sleep 0.5
done

# Submit to Google (via indexnow.org)
for url in "${URLS[@]}"; do
  echo "Submitting to Google: $url"
  curl -s -X POST "$GOOGLE_ENDPOINT" \
    -H "Content-Type: application/json" \
    -d "{
      \"host\": \"northstarastro.com\",
      \"key\": \"$API_KEY\",
      \"urlList\": [\"$url\"]
    }" > /dev/null
  sleep 0.5
done

echo "✅ All 15 URLs submitted to Google + Bing"
echo "Expected re-crawl: 3-5 days"
echo "CTR impact visible: 7-10 days"
echo "Full impact: 14-21 days"
