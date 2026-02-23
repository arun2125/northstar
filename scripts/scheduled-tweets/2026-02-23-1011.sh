#!/bin/bash
# Post scheduled tweets for Feb 23, 2026 at 10:11 IST

cd /Users/ay/code/northstar

# Download fresh images
curl -sL -o /tmp/northstar_image.jpg 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&h=800&fit=crop'
curl -sL -o /tmp/hanuman_image.jpg 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&h=800&fit=crop'

# Post tweets
export NORTHSTAR_TWEET='The Fire Horse Year officially began Feb 17. Wood gives way to Fire.

Chinese astrology meets Western transits:
♈ Saturn opposite = restructuring
♊ Uranus enters = revolution
♓ Neptune exits = clarity returns

2026 activates ALL three zodiac systems at once ✨🐴

#Astrology #FireHorse2026'

export HANUMAN_TWEET='Saturn return survivors be like: "Yeah I'\''m fine now, I just don'\''t trust anyone, changed careers twice, and developed a morning routine that would make a monk cry" 💀🪐

The 29-year wake-up call hits different.

#SaturnReturn #Astrology'

node scripts/tweet-with-media.js

echo "Done at $(date)"
