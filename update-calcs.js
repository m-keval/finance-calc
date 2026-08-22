const fs = require('fs');
const path = require('path');

const calculators = [
  { slug: 'goal-calculator', path: 'financial/goal-calculator' },
  { slug: 'capital-gains-calculator', path: 'financial/capital-gains-calculator' },
  { slug: 'hra-calculator', path: 'financial/hra-calculator' },
  { slug: 'income-tax-calculator', path: 'financial/income-tax-calculator' },
  { slug: 'invest-vs-repay-calculator', path: 'financial/invest-vs-repay-calculator' },
  { slug: 'rent-vs-buy-calculator', path: 'financial/rent-vs-buy-calculator' },
  { slug: 'inflation-calculator', path: 'financial/inflation-calculator' },
  { slug: 'fd-calculator', path: 'investment/fd-calculator' },
  { slug: 'sip-vs-fd-calculator', path: 'investment/sip-vs-fd-calculator' },
  { slug: 'step-up-sip-calculator', path: 'investment/step-up-sip-calculator' },
  { slug: 'home-loan-eligibility-calculator', path: 'loan/home-loan-eligibility-calculator' },
  { slug: 'loan-prepayment-calculator', path: 'loan/loan-prepayment-calculator' },
];

const categories = {
  financial: { name: 'Financial Calculators', slug: 'financial' },
  investment: { name: 'Investment Calculators', slug: 'investment' },
  loan: { name: 'Loan Calculators', slug: 'loan' },
};

calculators.forEach(calc => {
  const filePath = path.join(__dirname, 'src/app/calculators', calc.path, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log('Skipping missing file:', filePath);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already processed
  if (content.includes('generateCalculatorMetadata')) {
    console.log('Already processed:', filePath);
    return;
  }

  // Find the component name
  const componentMatch = content.match(/export default function ([A-Za-z0-9_]+)/);
  if (!componentMatch) {
    console.log('Could not find component in:', filePath);
    return;
  }
  const componentName = componentMatch[1];

  // Remove existing metadata
  content = content.replace(/export const metadata.*?};\n+/s, '');

  const categoryId = calc.path.split('/')[0];
  const catName = categories[categoryId].name;
  const catSlug = categories[categoryId].slug;

  const imports = `
import { generateCalculatorMetadata } from "@/lib/seo-metadata";
import { getCalculatorSEO } from "@/lib/seo-data";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import CalculatorSchema from "@/components/seo/calculator-schema";
import { CalculatorIntro, CalculatorFAQ, RelatedCalculators } from "@/components/seo/calculator-content";

const seoData = getCalculatorSEO("${calc.slug}")!;

export const metadata = generateCalculatorMetadata(seoData);
`;

  // Insert imports below other imports
  const lines = content.split('\n');
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) {
      lastImportIdx = i;
    }
  }

  lines.splice(lastImportIdx + 1, 0, imports);
  
  let newContent = lines.join('\n');

  // Inject Breadcrumbs and Schema inside the top-level div
  // Assuming the component returns `<div ...>` or `<main ...>`
  const returnRegex = /(return\s*\(\s*<[A-Za-z0-9_\-\s"']+>)/;
  
  newContent = newContent.replace(returnRegex, `$1
      <CalculatorSchema seoData={seoData} />
      <Breadcrumbs 
        category={{ name: '${catName}', slug: '${catSlug}' }}
        calculator={{ name: seoData.h1, slug: seoData.slug }}
      />
      <div className="mb-2">
        <CalculatorIntro seoData={seoData} />
      </div>`);

  // We should also replace the old h1 if possible, but it might be complex
  // so we'll just inject at the top, and leave the old h1 which might mean duplicate h1.
  // We'll strip `<h1...</h1>` using regex if it's there
  newContent = newContent.replace(/<h1[^>]*>.*?<\/h1>/s, '');
  newContent = newContent.replace(/<p[^>]*className="text-muted-foreground[^"]*"[^>]*>.*?<\/p>/s, ''); // try to remove old intro p tag

  // Append FAQ and Related at the end of the div
  const endDivRegex = /(<\/div>\s*)$/;
  // We'll just inject it right before the last closing div of the component return
  const parts = newContent.split('  );');
  if (parts.length === 2) {
    const mainHtml = parts[0];
    const newMainHtml = mainHtml.replace(/(<\/[A-Za-z0-9_]+>\s*)$/, `
        <div className="mt-16 space-y-8">
          <CalculatorFAQ seoData={seoData} />
          <RelatedCalculators seoData={seoData} />
        </div>
      $1`);
    newContent = newMainHtml + '  );' + parts[1];
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Processed:', filePath);
});
