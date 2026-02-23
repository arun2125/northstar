#!/usr/bin/env node
/**
 * Tweet with Media - Posts to @northstar_astro and @angry_hanuman
 * Usage: node tweet-with-media.js
 * 
 * Reads tweet content from env vars or command line args:
 *   NORTHSTAR_TWEET, NORTHSTAR_IMAGE
 *   HANUMAN_TWEET, HANUMAN_IMAGE
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

async function postTweet(client, handle, tweet, imagePath) {
  try {
    let mediaId = null;
    
    if (imagePath && fs.existsSync(imagePath)) {
      console.log(`[${handle}] Uploading image: ${imagePath}`);
      mediaId = await client.v1.uploadMedia(imagePath);
      console.log(`[${handle}] Media uploaded: ${mediaId}`);
    }
    
    const tweetData = { text: tweet };
    if (mediaId) {
      tweetData.media = { media_ids: [mediaId] };
    }
    
    const result = await client.v2.tweet(tweetData);
    console.log(`[${handle}] Tweet posted! ID: ${result.data.id}`);
    console.log(`[${handle}] URL: https://twitter.com/${handle.replace('@', '')}/status/${result.data.id}`);
    return result;
  } catch (error) {
    console.error(`[${handle}] Error:`, error.message);
    if (error.data) {
      console.error(`[${handle}] Details:`, JSON.stringify(error.data, null, 2));
    }
    throw error;
  }
}

async function main() {
  const northstarTweet = process.env.NORTHSTAR_TWEET || process.argv[2];
  const northstarImage = process.env.NORTHSTAR_IMAGE || '/tmp/northstar_image.jpg';
  const hanumanTweet = process.env.HANUMAN_TWEET || process.argv[3];
  const hanumanImage = process.env.HANUMAN_IMAGE || '/tmp/hanuman_image.jpg';
  
  if (!northstarTweet && !hanumanTweet) {
    console.error('Usage: node tweet-with-media.js "<northstar_tweet>" "<hanuman_tweet>"');
    console.error('Or set NORTHSTAR_TWEET and HANUMAN_TWEET env vars');
    process.exit(1);
  }
  
  const results = [];
  
  if (northstarTweet) {
    console.log('\n=== Posting to @northstar_astro ===');
    console.log(`Tweet: ${northstarTweet}`);
    try {
      const result = await postTweet(northstarClient, '@northstar_astro', northstarTweet, northstarImage);
      results.push({ account: '@northstar_astro', success: true, id: result.data.id });
    } catch (e) {
      results.push({ account: '@northstar_astro', success: false, error: e.message });
    }
  }
  
  if (hanumanTweet) {
    console.log('\n=== Posting to @angry_hanuman ===');
    console.log(`Tweet: ${hanumanTweet}`);
    try {
      const result = await postTweet(hanumanClient, '@angry_hanuman', hanumanTweet, hanumanImage);
      results.push({ account: '@angry_hanuman', success: true, id: result.data.id });
    } catch (e) {
      results.push({ account: '@angry_hanuman', success: false, error: e.message });
    }
  }
  
  console.log('\n=== Summary ===');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
