#!/usr/bin/env node
/**
 * Post tweets to both @northstar_astro and @angry_hanuman accounts
 * Usage: node post-tweet.js
 */

const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');

// Load credentials
const secureDir = '/Users/ay/.openclaw/workspace/secure';
const northstarKeys = JSON.parse(fs.readFileSync(path.join(secureDir, 'twitter-keys-northstar.json'), 'utf8'));
const hanumanKeys = JSON.parse(fs.readFileSync(path.join(secureDir, 'twitter-keys.json'), 'utf8'));

// Initialize clients
const northstarClient = new TwitterApi({
  appKey: northstarKeys.consumer_key,
  appSecret: northstarKeys.consumer_secret,
  accessToken: northstarKeys.access_token,
  accessSecret: northstarKeys.access_token_secret,
});

const hanumanClient = new TwitterApi({
  appKey: hanumanKeys.consumer_key,
  appSecret: hanumanKeys.consumer_secret,
  accessToken: hanumanKeys.access_token,
  accessSecret: hanumanKeys.access_token_secret,
});

// Today's tweets
const northstarTweet = `The Moon enters Scorpio today, activating transformation in your emotional depths 🌙🦂

What you've been avoiding? Time to face it.

Scorpio moons don't do "fine." They do real.

#Astrology #ScorpioMoon #2026Predictions ✨`;

const hanumanTweet = `Scorpio placements don't have trust issues, they have "I already investigated your entire digital footprint before you said hello" issues 💀🦂

It's not paranoia if you're right 99% of the time.

#Scorpio #ZodiacMemes 🔥`;

async function postTweets() {
  const results = [];
  
  try {
    console.log('Posting to @northstar_astro...');
    const r1 = await northstarClient.v2.tweet(northstarTweet);
    console.log(`✅ @northstar_astro: https://twitter.com/northstar_astro/status/${r1.data.id}`);
    results.push({ account: '@northstar_astro', id: r1.data.id, success: true });
  } catch (err) {
    console.error(`❌ @northstar_astro failed: ${err.message}`);
    results.push({ account: '@northstar_astro', error: err.message, success: false });
  }

  try {
    console.log('Posting to @angry_hanuman...');
    const r2 = await hanumanClient.v2.tweet(hanumanTweet);
    console.log(`✅ @angry_hanuman: https://twitter.com/angry_hanuman/status/${r2.data.id}`);
    results.push({ account: '@angry_hanuman', id: r2.data.id, success: true });
  } catch (err) {
    console.error(`❌ @angry_hanuman failed: ${err.message}`);
    results.push({ account: '@angry_hanuman', error: err.message, success: false });
  }

  return results;
}

postTweets()
  .then(results => {
    console.log('\n📊 Results:', JSON.stringify(results, null, 2));
    process.exit(results.every(r => r.success) ? 0 : 1);
  })
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
