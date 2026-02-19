#!/usr/bin/env node
/**
 * Submit URLs to IndexNow API (Google, Bing, Yandex)
 * Usage: node scripts/submit-indexnow.js <url1> <url2> ...
 * Or: node scripts/submit-indexnow.js --all (submits all blog posts)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const INDEXNOW_KEY = '86116428-0e9d-466f-9102-3329529f5b63';
const DOMAIN = 'northstarastro.com';

// Get URLs from command line
const args = process.argv.slice(2);

let urls = [];

if (args.includes('--all')) {
  // Read all blog posts from content/posts
  const postsDir = path.join(__dirname, '../content/posts');
  const files = fs.readdirSync(postsDir);
  
  urls = files
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const slug = f.replace('.md', '');
      return `https://${DOMAIN}/blog/${slug}`;
    });
  
  console.log(`📚 Found ${urls.length} blog posts`);
} else if (args.length > 0) {
  urls = args.map(arg => {
    // If just slug provided, convert to full URL
    if (!arg.startsWith('http')) {
      return `https://${DOMAIN}/blog/${arg}`;
    }
    return arg;
  });
} else {
  console.error('Usage: node submit-indexnow.js <url1> <url2> ...');
  console.error('   Or: node submit-indexnow.js --all');
  process.exit(1);
}

const payload = JSON.stringify({
  host: DOMAIN,
  key: INDEXNOW_KEY,
  keyLocation: `https://${DOMAIN}/${INDEXNOW_KEY}.txt`,
  urlList: urls
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log(`\n📤 Submitting ${urls.length} URL(s) to IndexNow...`);
console.log('   Target: Google, Bing, Yandex\n');

const req = https.request(options, (res) => {
  console.log(`\nResponse: ${res.statusCode} ${res.statusMessage}`);
  
  if (res.statusCode === 200) {
    console.log('✅ Successfully submitted!');
  } else if (res.statusCode === 202) {
    console.log('✅ Submission accepted (processing)');
  } else {
    console.log(`⚠️ Unexpected status: ${res.statusCode}`);
  }
  
  res.on('data', (d) => {
    const response = d.toString().trim();
    if (response) {
      console.log('\nAPI Response:', response);
    }
  });
});

req.on('error', (e) => {
  console.error(`\n❌ Error: ${e.message}`);
});

req.write(payload);
req.end();

// Show first 5 URLs as preview
console.log('URLs:');
urls.slice(0, 5).forEach((url, i) => console.log(`  ${i+1}. ${url}`));
if (urls.length > 5) {
  console.log(`  ... and ${urls.length - 5} more`);
}
