#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const results = {
  pages: [],
  issues: {
    missingMetaDescription: [],
    missingOgTags: [],
    missingCanonical: [],
    missingH1: [],
    missingAltTags: [],
    missingSchema: [],
  }
};

// Pages to audit
const pagesToAudit = [
  'src/app/page.tsx',
  'src/app/chat/page.tsx',
  'src/app/about/page.tsx',
  'src/app/glossary/page.tsx',
  'src/app/free-birth-chart/page.tsx',
  'src/app/life-path-calculator/page.tsx',
  'src/app/numerology/page.tsx',
  'src/app/western-astrology/page.tsx',
  'src/app/vedic-astrology/page.tsx',
  'src/app/2026-astrology-predictions/page.tsx',
  'src/app/sitemap-visual/page.tsx',
  'src/app/blog/page.tsx',
  'src/app/blog/[slug]/page.tsx',
];

console.log('🔍 Starting SEO Audit...\n');

function auditFile(filePath) {
  const fullPath = path.join('/Users/ay/code/northstar', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  const pageName = filePath.replace('src/app/', '').replace('/page.tsx', '') || 'home';
  
  const audit = {
    page: pageName,
    hasMetadata: content.includes('export const metadata'),
    hasDescription: content.match(/description:\s*["']/),
    hasOgTags: content.includes('openGraph'),
    hasCanonical: content.includes('canonical'),
    hasH1: content.match(/<h1[^>]*>/) || content.match(/className="[^"]*text-[45]xl/),
    hasImageAlt: !content.includes('<img') || content.includes('alt='),
    hasSchema: content.includes('application/ld+json'),
  };

  return audit;
}

console.log('📄 Auditing pages...\n');

pagesToAudit.forEach(pagePath => {
  const audit = auditFile(pagePath);
  if (audit) {
    results.pages.push(audit);
    
    // Track issues
    if (!audit.hasDescription) {
      results.issues.missingMetaDescription.push(audit.page);
    }
    if (!audit.hasOgTags) {
      results.issues.missingOgTags.push(audit.page);
    }
    if (!audit.hasCanonical) {
      results.issues.missingCanonical.push(audit.page);
    }
    if (!audit.hasH1) {
      results.issues.missingH1.push(audit.page);
    }
    if (!audit.hasImageAlt) {
      results.issues.missingAltTags.push(audit.page);
    }
    if (!audit.hasSchema) {
      results.issues.missingSchema.push(audit.page);
    }
    
    const status = Object.values(audit).slice(1).every(Boolean) ? '✅' : '⚠️ ';
    console.log(`${status} ${audit.page}`);
  }
});

console.log('\n📊 SEO Audit Summary\n');
console.log('═'.repeat(50));

const issueTypes = [
  { key: 'missingMetaDescription', label: 'Missing Meta Description' },
  { key: 'missingOgTags', label: 'Missing Open Graph Tags' },
  { key: 'missingCanonical', label: 'Missing Canonical URL' },
  { key: 'missingH1', label: 'Missing H1 Tag' },
  { key: 'missingAltTags', label: 'Images Missing Alt Text' },
  { key: 'missingSchema', label: 'Missing Schema Markup' },
];

let totalIssues = 0;

issueTypes.forEach(({ key, label }) => {
  const count = results.issues[key].length;
  totalIssues += count;
  
  if (count > 0) {
    console.log(`\n❌ ${label}: ${count}`);
    results.issues[key].forEach(page => {
      console.log(`   - ${page}`);
    });
  } else {
    console.log(`\n✅ ${label}: All good!`);
  }
});

console.log('\n' + '═'.repeat(50));
console.log(`\n📈 Total pages audited: ${results.pages.length}`);
console.log(`📉 Total issues found: ${totalIssues}`);

if (totalIssues === 0) {
  console.log('\n🎉 No SEO issues found! Great job!');
} else {
  console.log('\n⚠️  Please review and fix the issues listed above.');
}

console.log('\n');

// Save detailed report
const reportPath = '/Users/ay/code/northstar/SEO-AUDIT-REPORT.md';
let report = `# SEO Audit Report
Generated: ${new Date().toISOString()}

## Summary

- **Pages Audited:** ${results.pages.length}
- **Total Issues:** ${totalIssues}

## Issues by Category

`;

issueTypes.forEach(({ key, label }) => {
  const count = results.issues[key].length;
  report += `### ${label}\n\n`;
  
  if (count === 0) {
    report += `✅ No issues found.\n\n`;
  } else {
    report += `❌ **${count} page(s) affected:**\n\n`;
    results.issues[key].forEach(page => {
      report += `- \`${page}\`\n`;
    });
    report += '\n';
  }
});

report += `## Detailed Page Audit\n\n`;
report += `| Page | Meta Desc | OG Tags | Canonical | H1 | Alt Tags | Schema |\n`;
report += `|------|-----------|---------|-----------|----|-----------|---------|\n`;

results.pages.forEach(audit => {
  const icon = (val) => val ? '✅' : '❌';
  report += `| ${audit.page} | ${icon(audit.hasDescription)} | ${icon(audit.hasOgTags)} | ${icon(audit.hasCanonical)} | ${icon(audit.hasH1)} | ${icon(audit.hasImageAlt)} | ${icon(audit.hasSchema)} |\n`;
});

report += `\n## Recommendations\n\n`;

if (results.issues.missingMetaDescription.length > 0) {
  report += `### Add Meta Descriptions\n\nMeta descriptions improve click-through rates from search results. Add them to:\n\n`;
  results.issues.missingMetaDescription.forEach(page => {
    report += `- \`${page}\`: Add a compelling 150-160 character description\n`;
  });
  report += '\n';
}

if (results.issues.missingOgTags.length > 0) {
  report += `### Add Open Graph Tags\n\nOG tags control how your pages appear when shared on social media.\n\n`;
}

if (results.issues.missingCanonical.length > 0) {
  report += `### Add Canonical URLs\n\nCanonical tags prevent duplicate content issues.\n\n`;
}

if (results.issues.missingH1.length > 0) {
  report += `### Add H1 Tags\n\nEvery page should have exactly one H1 tag for SEO.\n\n`;
}

if (results.issues.missingSchema.length > 0) {
  report += `### Add Schema Markup\n\nConsider adding structured data for:\n- Articles (blog posts)\n- FAQs\n- How-to guides\n- Breadcrumbs\n\n`;
}

report += `## Blog Posts\n\nBlog posts are handled by the dynamic route \`blog/[slug]/page.tsx\`. Ensure this template includes all necessary SEO metadata.\n\n`;

fs.writeFileSync(reportPath, report);
console.log(`📝 Detailed report saved to: SEO-AUDIT-REPORT.md\n`);
