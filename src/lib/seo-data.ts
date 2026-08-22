export type CalculatorCategory = 'financial' | 'investment' | 'loan';

export interface CalculatorSEOData {
  slug: string;
  category: CalculatorCategory;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  h1: string;
  intro: string;
  faqs?: { question: string; answer: string }[];
  relatedCalculators: string[]; // slugs
}

export const CATEGORIES = {
  financial: {
    slug: 'financial',
    title: 'Financial Calculators – Free Online Finance Tools | Calcniv',
    description: 'Explore our free online financial calculators to compute GST, percentage, simple interest, and inflation. Calculate your finances accurately and instantly.',
    h1: 'Financial Calculators',
    intro: 'Explore free financial calculators to help you calculate percentages, simple interest, inflation rates, and GST easily online.'
  },
  investment: {
    slug: 'investment',
    title: 'Investment Calculators – SIP, Lumpsum, CAGR & Compound Interest | Calcniv',
    description: 'Use Calcniv\'s free investment calculators to estimate SIP returns, lumpsum investment growth, CAGR and compound interest to plan your wealth.',
    h1: 'Investment Calculators',
    intro: 'Explore free investment calculators to estimate SIP returns, lumpsum investment growth, CAGR, and compound interest to reach your financial goals.'
  },
  loan: {
    slug: 'loan',
    title: 'Loan & EMI Calculators – Home, Personal & Car Loan | Calcniv',
    description: 'Calculate your monthly loan EMI with Calcniv\'s free EMI calculators. Estimate interest and repayment schedules for home, personal, and car loans.',
    h1: 'Loan & EMI Calculators',
    intro: 'Plan your borrowing with our free loan and EMI calculators. Calculate monthly payments, interest, and repayment schedules for various types of loans.'
  }
};

export const CALCULATORS_SEO: Record<string, CalculatorSEOData> = {
  'sip-calculator': {
    slug: 'sip-calculator',
    category: 'investment',
    title: 'SIP Calculator – Calculate Mutual Fund Returns Online | Calcniv',
    description: 'Use Calcniv\'s free SIP calculator to estimate your mutual fund returns, investment value, total investment and potential wealth based on your monthly SIP.',
    primaryKeyword: 'SIP calculator',
    secondaryKeywords: [
      'SIP calculator online', 'mutual fund SIP calculator', 'SIP return calculator',
      'SIP investment calculator', 'monthly SIP calculator', 'SIP maturity calculator', 'SIP calculator India'
    ],
    h1: 'SIP Calculator',
    intro: 'Calculate your estimated SIP investment returns with Calcniv\'s free SIP calculator. Enter your monthly investment, expected annual return and investment duration to estimate your total investment, estimated returns and maturity value.',
    faqs: [
      {
        question: 'What is a SIP?',
        answer: 'SIP stands for Systematic Investment Plan. It is a method of investing a fixed amount regularly in mutual funds.'
      },
      {
        question: 'How does the SIP calculator work?',
        answer: 'The SIP calculator uses the compound interest formula to estimate future returns based on your monthly investment amount, expected rate of return, and investment period.'
      }
    ],
    relatedCalculators: ['step-up-sip-calculator', 'cagr-calculator']
  },
  'step-up-sip-calculator': {
    slug: 'step-up-sip-calculator',
    category: 'investment',
    title: 'Step Up SIP Calculator – Plan Increasing Investments | Calcniv',
    description: 'Calculate returns on your increasing monthly SIPs with the Step Up SIP calculator. Estimate future value when you increase your investment annually.',
    primaryKeyword: 'step up SIP calculator',
    secondaryKeywords: [
      'step-up SIP calculator', 'SIP step up calculator', 'annual SIP increase calculator', 'step up mutual fund calculator'
    ],
    h1: 'Step Up SIP Calculator',
    intro: 'Plan your long-term wealth creation by factoring in an annual increase in your SIP contributions. Use our Step Up SIP calculator to see how a small percentage increase every year impacts your final maturity amount.',
    relatedCalculators: ['sip-calculator']
  },
  'cagr-calculator': {
    slug: 'cagr-calculator',
    category: 'investment',
    title: 'CAGR Calculator – Compound Annual Growth Rate | Calcniv',
    description: 'Calculate the Compound Annual Growth Rate (CAGR) of your investments online. Measure the average annual growth of your portfolio accurately.',
    primaryKeyword: 'CAGR calculator',
    secondaryKeywords: [
      'CAGR calculator online', 'compound annual growth rate calculator', 'investment CAGR calculator', 'CAGR return calculator'
    ],
    h1: 'CAGR Calculator',
    intro: 'Calculate the Compound Annual Growth Rate (CAGR) of your investments with our free online tool. Determine the smoothed annualized return of your portfolio over a specific time period.',
    relatedCalculators: ['sip-calculator']
  },
  'emi-calculator': {
    slug: 'emi-calculator',
    category: 'loan',
    title: 'EMI Calculator – Calculate Loan EMI Online | Calcniv',
    description: 'Calculate your monthly loan EMI with our free EMI calculator. Estimate repayment amounts, total interest, and total payable amount easily.',
    primaryKeyword: 'EMI calculator',
    secondaryKeywords: [
      'EMI calculator online', 'loan EMI calculator', 'monthly EMI calculator', 'EMI calculator India', 'loan repayment calculator'
    ],
    h1: 'EMI Calculator',
    intro: 'Use our free EMI calculator to determine your monthly loan repayment amount. Enter the principal loan amount, interest rate, and loan tenure to calculate your Equated Monthly Installment (EMI).',
    faqs: [
      {
        question: 'What is an EMI?',
        answer: 'EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.'
      }
    ],
    relatedCalculators: []
  },
  'inflation-calculator': {
    slug: 'inflation-calculator',
    category: 'financial',
    title: 'Inflation Calculator – Measure Purchasing Power | Calcniv',
    description: 'Use our free inflation calculator to measure the impact of inflation on your purchasing power. Estimate future costs based on expected inflation rates.',
    primaryKeyword: 'inflation calculator',
    secondaryKeywords: [
      'inflation calculator India', 'inflation calculator online', 'inflation rate calculator', 'purchasing power calculator'
    ],
    h1: 'Inflation Calculator',
    intro: 'Understand how inflation erodes purchasing power over time. Use our free inflation calculator to estimate the future value of money and plan your finances accordingly.',
    relatedCalculators: ['cagr-calculator']
  },
  'goal-calculator': {
    slug: 'goal-calculator',
    category: 'financial',
    title: 'Financial Goal Calculator – Plan Your Savings | Calcniv',
    description: 'Calculate how much you need to save to reach your financial goals. Free goal planning calculator online.',
    primaryKeyword: 'financial goal calculator',
    secondaryKeywords: ['goal planning calculator', 'savings goal calculator'],
    h1: 'Goal Calculator',
    intro: 'Plan your financial future with our Goal Calculator. Figure out exactly how much you need to save periodically to achieve your target amount.',
    relatedCalculators: ['sip-calculator']
  },
  'capital-gains-calculator': {
    slug: 'capital-gains-calculator',
    category: 'financial',
    title: 'Capital Gains Tax Calculator – Estimate Your Tax | Calcniv',
    description: 'Calculate your short-term and long-term capital gains tax easily with our free online calculator.',
    primaryKeyword: 'capital gains tax calculator',
    secondaryKeywords: ['capital gains calculator India', 'LTCG calculator', 'STCG calculator'],
    h1: 'Capital Gains Calculator',
    intro: 'Estimate your tax liability on the sale of assets like mutual funds, stocks, and real estate with our Capital Gains Calculator.',
    relatedCalculators: ['income-tax-calculator']
  },
  'hra-calculator': {
    slug: 'hra-calculator',
    category: 'financial',
    title: 'HRA Exemption Calculator – Calculate House Rent Allowance | Calcniv',
    description: 'Calculate your HRA exemption online for income tax savings. Find out the exact tax-free portion of your House Rent Allowance.',
    primaryKeyword: 'HRA calculator',
    secondaryKeywords: ['HRA exemption calculator', 'house rent allowance calculator'],
    h1: 'HRA Exemption Calculator',
    intro: 'Determine how much of your House Rent Allowance (HRA) is exempt from income tax using our simple HRA Exemption Calculator.',
    relatedCalculators: ['income-tax-calculator', 'rent-vs-buy-calculator']
  },
  'income-tax-calculator': {
    slug: 'income-tax-calculator',
    category: 'financial',
    title: 'Income Tax Calculator – Estimate Your Tax Liability | Calcniv',
    description: 'Calculate your income tax liability under the new and old tax regimes with our free income tax calculator.',
    primaryKeyword: 'income tax calculator',
    secondaryKeywords: ['tax calculator India', 'new regime tax calculator', 'old regime tax calculator'],
    h1: 'Income Tax Calculator',
    intro: 'Estimate your annual income tax liability quickly. Compare the old vs. new tax regimes to find the best option for your salary structure.',
    relatedCalculators: ['hra-calculator', 'capital-gains-calculator']
  },
  'invest-vs-repay-calculator': {
    slug: 'invest-vs-repay-calculator',
    category: 'financial',
    title: 'Invest vs Repay Loan Calculator – Make Smart Choices | Calcniv',
    description: 'Should you invest your spare money or prepay your loan? Find out with our Invest vs Repay Calculator.',
    primaryKeyword: 'invest vs repay loan calculator',
    secondaryKeywords: ['prepay loan or invest', 'loan vs investment calculator'],
    h1: 'Invest vs Repay Calculator',
    intro: 'Analyze whether it makes more financial sense to prepay your existing loan or invest that money for higher returns.',
    relatedCalculators: ['loan-prepayment-calculator', 'emi-calculator']
  },
  'rent-vs-buy-calculator': {
    slug: 'rent-vs-buy-calculator',
    category: 'financial',
    title: 'Rent vs Buy Calculator – Real Estate Decision Tool | Calcniv',
    description: 'Compare the financial impact of renting a house versus buying one over the long term with our Rent vs Buy Calculator.',
    primaryKeyword: 'rent vs buy calculator',
    secondaryKeywords: ['buy or rent calculator India', 'home rent vs buy'],
    h1: 'Rent vs Buy Calculator',
    intro: 'Making the big housing decision? Our Rent vs Buy Calculator helps you mathematically compare the costs of renting vs purchasing a home.',
    relatedCalculators: ['home-loan-eligibility-calculator']
  },
  'fd-calculator': {
    slug: 'fd-calculator',
    category: 'investment',
    title: 'FD Calculator – Fixed Deposit Return Calculator | Calcniv',
    description: 'Calculate your Fixed Deposit (FD) maturity amount and interest earned online. Plan your safe investments efficiently.',
    primaryKeyword: 'FD calculator',
    secondaryKeywords: ['fixed deposit calculator', 'FD interest calculator online', 'FD return calculator'],
    h1: 'Fixed Deposit (FD) Calculator',
    intro: 'Estimate the maturity value and total interest earned on your Fixed Deposits. Enter your principal amount, tenure, and interest rate to get instant results.',
    relatedCalculators: ['sip-vs-fd-calculator']
  },
  'sip-vs-fd-calculator': {
    slug: 'sip-vs-fd-calculator',
    category: 'investment',
    title: 'SIP vs FD Calculator – Compare Investment Returns | Calcniv',
    description: 'Compare Mutual Fund SIPs vs Fixed Deposits (FD). See which investment option creates more wealth over your time horizon.',
    primaryKeyword: 'SIP vs FD calculator',
    secondaryKeywords: ['mutual fund vs fixed deposit', 'SIP or FD which is better'],
    h1: 'SIP vs FD Calculator',
    intro: 'Wondering whether to invest in a SIP or an FD? Compare the estimated returns of both over time and see the impact of market compounding vs fixed interest.',
    relatedCalculators: ['sip-calculator', 'fd-calculator']
  },
  'home-loan-eligibility-calculator': {
    slug: 'home-loan-eligibility-calculator',
    category: 'loan',
    title: 'Home Loan Eligibility Calculator – Check Your Limit | Calcniv',
    description: 'Find out how much home loan you are eligible for based on your income and existing EMIs with our free calculator.',
    primaryKeyword: 'home loan eligibility calculator',
    secondaryKeywords: ['housing loan eligibility', 'home loan limit calculator'],
    h1: 'Home Loan Eligibility Calculator',
    intro: 'Planning to apply for a home loan? Check your maximum eligible loan amount instantly based on your monthly income and current obligations.',
    relatedCalculators: ['rent-vs-buy-calculator']
  },
  'loan-prepayment-calculator': {
    slug: 'loan-prepayment-calculator',
    category: 'loan',
    title: 'Loan Prepayment Calculator – Calculate Interest Saved | Calcniv',
    description: 'Calculate how much interest you can save and how your tenure reduces by prepaying your loan with our free prepayment calculator.',
    primaryKeyword: 'loan prepayment calculator',
    secondaryKeywords: ['home loan prepayment calculator', 'EMI prepayment calculator', 'part payment loan calculator'],
    h1: 'Loan Prepayment Calculator',
    intro: 'See the dramatic impact of making extra payments on your loan. Calculate your total interest saved and how much faster you can become debt-free.',
    relatedCalculators: ['emi-calculator', 'invest-vs-repay-calculator']
  }
};

export function getCalculatorSEO(slug: string): CalculatorSEOData | undefined {
  return CALCULATORS_SEO[slug];
}

export function getAllCalculators(): CalculatorSEOData[] {
  return Object.values(CALCULATORS_SEO);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorSEOData[] {
  return Object.values(CALCULATORS_SEO).filter(calc => calc.category === category);
}
