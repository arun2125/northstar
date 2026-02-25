#!/bin/bash
# Post scheduled tweets for Feb 25, 2026 at 09:43 IST

cd /Users/ay/code/northstar

# Download fresh celestial images
curl -sL -o /tmp/northstar_image.jpg 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&h=800&fit=crop'
curl -sL -o /tmp/hanuman_image.jpg 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&h=800&fit=crop'

# Post tweets
export NORTHSTAR_TWEET='Neptune prepares to leave Pisces after 14 years (April 2025 - Oct 2025, then final exit Jan 2026).

If you'\''ve felt lost in the fog lately, clarity is coming 🌊✨

Those born 1986-1990: your Neptune opposition is ending. Time to rebuild.

#Astrology #Neptune #2026'

export HANUMAN_TWEET='POV: You'\''re a Capricorn rising trying to explain to your therapist why you enjoy suffering 💀🐐

"It builds character"
"Pain is just growth in disguise"
"Saturn is my friend actually"

#Capricorn #SaturnReturn #AstrologyMemes 🪐'

node scripts/tweet-with-media.js

echo "Done at $(date)"
