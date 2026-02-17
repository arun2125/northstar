#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const INDEXNOW_KEY = 'fbda267b-db0e-40b2-b4fa-3002e9ff3dc9';
const BASE_URL = 'https://northstarastro.com';
const POSTS_DIR = path.join(__dirname, '../content/posts');

// Get all blog post slugs
const postFiles = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
const blogUrls = postFiles.map(file => {
  const slug = file.replace('.md', '');
  return `${BASE_URL}/blog/${slug}`;
});

// Add new pages
const newPages = [
  `${BASE_URL}/glossary`,
  `${BASE_URL}/chat`,
  `${BASE_URL}/free-birth-chart`,
  `${BASE_URL}/2026-astrology-predictions`,
  `${BASE_URL}/sitemap-visual`
];

// Combine all URLs
const allUrls = [...newPages, ...blogUrls];

console.log(`📊 Total URLs to submit: ${allUrls.length}`);
console.log(`   - New pages: ${newPages.length}`);
console.log(`   - Blog posts: ${blogUrls.length}`);

// IndexNow allows up to 10,000 URLs per request
// We'll submit in batches of 100 to be safe
const BATCH_SIZE = 100;
const batches = [];

for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
  batches.push(allUrls.slice(i, i + BATCH_SIZE));
}

console.log(`\n📦 Splitting into ${batches.length} batches\n`);

// Function to submit a batch to IndexNow
function submitBatch(urls, batchNum) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: 'northstarastro.com',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`✅ Batch ${batchNum}/${batches.length} submitted successfully (${urls.length} URLs)`);
          resolve({ success: true, batch: batchNum });
        } else {
          console.log(`⚠️  Batch ${batchNum}/${batches.length} - Status: ${res.statusCode}`);
          console.log(`   Response: ${data}`);
          resolve({ success: false, batch: batchNum, status: res.statusCode });
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Batch ${batchNum}/${batches.length} failed:`, error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

// Submit all batches with a small delay between them
async function submitAll() {
  console.log('🚀 Starting IndexNow submission...\n');
  
  let successCount = 0;
  
  for (let i = 0; i < batches.length; i++) {
    try {
      const result = await submitBatch(batches[i], i + 1);
      if (result.success) successCount++;
      
      // Small delay between batches
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`Failed to submit batch ${i + 1}`);
    }
  }
  
  console.log(`\n✨ Submission complete!`);
  console.log(`   Successful batches: ${successCount}/${batches.length}`);
  console.log(`\n📝 Note: IndexNow accepts submissions from Google, Bing, Yandex, and other search engines.`);
  console.log(`   Changes may take 24-48 hours to reflect in search results.`);
}

submitAll().catch(console.error);
