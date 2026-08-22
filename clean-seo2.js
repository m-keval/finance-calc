const fs = require('fs');
const path = require('path');

const seoDataPath = path.join(__dirname, 'src/lib/seo-data.ts');
let content = fs.readFileSync(seoDataPath, 'utf8');

const missingCalculators = [
  'lumpsum-calculator',
  'compound-interest-calculator',
  'home-loan-emi-calculator',
  'personal-loan-emi-calculator',
  'car-loan-emi-calculator',
  'loan-interest-calculator',
  'gst-calculator',
  'percentage-calculator',
  'simple-interest-calculator'
];

missingCalculators.forEach(missing => {
  // Regex to remove from relatedCalculators
  content = content.replace(new RegExp(`'${missing}',?\\s*`, 'g'), '');
  content = content.replace(new RegExp(`,?\\s*'${missing}'`, 'g'), '');

  // Regex to remove the block from CALCULATORS_SEO
  // Matches `'slug': { ... },\n` precisely by using lazy match up to the FIRST `  },` that marks the end of a calculator block in our specific formatting.
  // We match from `'missing': {` until the next `  },` (inclusive)
  const blockRegex = new RegExp(`\\s*'${missing}': \\{[\\s\\S]*?^  \\},?\\n`, 'gm');
  content = content.replace(blockRegex, '\n');
});

fs.writeFileSync(seoDataPath, content, 'utf8');
console.log('Cleaned up seo-data.ts successfully');
