#!/bin/bash
# Post scheduled tweets for Feb 22, 2026 at 09:37 IST

cd /Users/ay/code/northstar

# Download fresh images
curl -sL -o /tmp/northstar_image.jpg 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=800&fit=crop'
curl -sL -o /tmp/hanuman_image.jpg 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=800&fit=crop'

# Post tweets
export NORTHSTAR_TWEET='The 2026 Fire Horse arrives Feb 17. Not since 1966 has this energy walked Earth.

For Gemini risings: Uranus enters your 1st house in July. Your entire identity is about to shatter and rebuild. 🔥♊

This isn'\''t astrology for the faint-hearted ✨

#Astrology #2026Predictions'

export HANUMAN_TWEET='Scorpio placements don'\''t have trust issues, they have "I already know what you'\''re going to do before you do it" issues 💀🦂

The 8th house sees everything. EVERYTHING.

#Scorpio #AstrologyMemes'

node scripts/tweet-with-media.js

echo "Done at $(date)"
