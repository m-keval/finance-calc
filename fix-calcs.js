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
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // If we already inserted CalculatorSchema, let's remove it and re-do properly.
  // Or just check if CalculatorSchema is present in the return statement.
  if (content.includes('<CalculatorSchema')) {
    console.log('Already correctly injected:', filePath);
    // Actually, maybe it was not injected correctly inside return. Let's verify.
  }

  const categoryId = calc.path.split('/')[0];
  const catName = categories[categoryId].name;
  const catSlug = categories[categoryId].slug;

  // Let's use a very permissive regex to find the first `<div ...>` or `<main ...>` after `return (`
  const returnRegex = /(return\s*\([\s\S]*?(?:<div|<main)[^>]*>)/;

  if (!content.match(returnRegex)) {
    console.log('Could not match return div for:', filePath);
    return;
  }
  
  if (content.includes('<Breadcrumbs')) {
    // If it has breadcrumbs, we might have successfully injected it or partially. Let's just log it.
    console.log('Already has Breadcrumbs:', filePath);
    return;
  }

  content = content.replace(returnRegex, `$1
      <CalculatorSchema seoData={seoData} />
      <Breadcrumbs 
        category={{ name: '${catName}', slug: '${catSlug}' }}
        calculator={{ name: seoData.h1, slug: seoData.slug }}
      />
      <div className="mb-2">
        <CalculatorIntro seoData={seoData} />
      </div>`);

  // Try to remove old h1 and intro
  content = content.replace(/<h1[^>]*>.*?<\/h1>/s, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', filePath);
});
