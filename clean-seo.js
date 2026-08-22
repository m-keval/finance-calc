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

// Remove them from relatedCalculators arrays
missingCalculators.forEach(missing => {
  const regex = new RegExp(`'${missing}',?\\s*`, 'g');
  content = content.replace(regex, '');
  
  // also handle " 'calc', 'missing' "
  const regex2 = new RegExp(`,?\\s*'${missing}'`, 'g');
  content = content.replace(regex2, '');
});

// Remove them from CALCULATORS_SEO object
missingCalculators.forEach(missing => {
  // Regex to match the block: 'slug': { ... },
  const blockRegex = new RegExp(`\\s*'${missing}':\\s*\\{[\\s\\S]*?\\},?\\n`, 'g');
  content = content.replace(blockRegex, '\n');
});

fs.writeFileSync(seoDataPath, content, 'utf8');
console.log('Cleaned up seo-data.ts');
