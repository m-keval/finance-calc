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
    relatedCalculators: ['lumpsum-calculator', 'step-up-sip-calculator', 'cagr-calculator', 'compound-interest-calculator']
  },
  'lumpsum-calculator': {
    slug: 'lumpsum-calculator',
    category: 'investment',
    title: 'Lumpsum Calculator – Mutual Fund Lumpsum Returns | Calcniv',
    description: 'Calculate your one-time mutual fund investment returns with Calcniv\'s lumpsum calculator. Estimate future wealth with our free tool.',
    primaryKeyword: 'lumpsum calculator',
    secondaryKeywords: [
      'lumpsum investment calculator', 'lumpsum return calculator', 'mutual fund lumpsum calculator',
      'lumpsum calculator online', 'one time investment calculator'
    ],
    h1: 'Lumpsum Calculator',
    intro: 'Estimate the future value of your one-time mutual fund investments using our lumpsum calculator. Enter your total investment amount, expected rate of return, and time period.',
    faqs: [
      {
        question: 'What is lumpsum investment?',
        answer: 'Lumpsum investment means investing a significant sum of money in a mutual fund or other asset at one time, rather than in regular intervals like a SIP.'
      }
    ],
    relatedCalculators: ['sip-calculator', 'cagr-calculator', 'compound-interest-calculator']
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
    relatedCalculators: ['sip-calculator', 'lumpsum-calculator']
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
    relatedCalculators: ['sip-calculator', 'lumpsum-calculator', 'compound-interest-calculator']
  },
  'compound-interest-calculator': {
    slug: 'compound-interest-calculator',
    category: 'financial', // Note: User requested it under both, I will put it in financial for category but link it everywhere. Let's make it financial.
    title: 'Compound Interest Calculator – Estimate Investment Growth | Calcniv',
    description: 'Calculate compound interest online to see how your money grows over time. Use our free compound interest calculator with daily, monthly, or yearly compounding.',
    primaryKeyword: 'compound interest calculator',
    secondaryKeywords: [
      'compound interest calculator online', 'compound interest formula', 'investment compound interest calculator', 'compound growth calculator'
    ],
    h1: 'Compound Interest Calculator',
    intro: 'Understand the power of compounding with our free compound interest calculator. Calculate the future value of your initial principal based on the interest rate and compounding frequency.',
    relatedCalculators: ['simple-interest-calculator', 'sip-calculator']
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
    relatedCalculators: ['home-loan-emi-calculator', 'personal-loan-emi-calculator', 'car-loan-emi-calculator', 'loan-interest-calculator']
  },
  'home-loan-emi-calculator': {
    slug: 'home-loan-emi-calculator',
    category: 'loan',
    title: 'Home Loan EMI Calculator – Housing Loan Repayment | Calcniv',
    description: 'Calculate your home loan EMI online. Estimate your monthly housing loan repayment, total interest, and overall loan cost with Calcniv.',
    primaryKeyword: 'home loan EMI calculator',
    secondaryKeywords: [
      'home loan calculator', 'home loan EMI calculator India', 'housing loan EMI calculator', 'home loan repayment calculator', 'home loan interest calculator'
    ],
    h1: 'Home Loan EMI Calculator',
    intro: 'Planning to buy a house? Use our home loan EMI calculator to estimate your monthly mortgage payments and plan your housing finance better.',
    relatedCalculators: ['emi-calculator', 'personal-loan-emi-calculator']
  },
  'personal-loan-emi-calculator': {
    slug: 'personal-loan-emi-calculator',
    category: 'loan',
    title: 'Personal Loan EMI Calculator – Estimate Monthly Repayment | Calcniv',
    description: 'Calculate your personal loan EMI accurately online. Plan your finances and monthly budget with our free personal loan calculator.',
    primaryKeyword: 'personal loan EMI calculator',
    secondaryKeywords: [
      'personal loan calculator', 'personal loan EMI calculator India', 'personal loan repayment calculator', 'personal loan interest calculator'
    ],
    h1: 'Personal Loan EMI Calculator',
    intro: 'Calculate the EMI for your personal loan using our free online calculator. Determine your monthly repayment obligations before borrowing.',
    relatedCalculators: ['emi-calculator', 'home-loan-emi-calculator', 'car-loan-emi-calculator']
  },
  'car-loan-emi-calculator': {
    slug: 'car-loan-emi-calculator',
    category: 'loan',
    title: 'Car Loan EMI Calculator – Vehicle Loan EMI | Calcniv',
    description: 'Use our free car loan EMI calculator to estimate your monthly vehicle loan repayment. Calculate total interest and total amount payable.',
    primaryKeyword: 'car loan EMI calculator',
    secondaryKeywords: [
      'car EMI calculator', 'car loan calculator', 'vehicle loan EMI calculator', 'car loan repayment calculator'
    ],
    h1: 'Car Loan EMI Calculator',
    intro: 'Estimate your monthly car loan repayments quickly and easily with our car loan EMI calculator. Plan your dream vehicle purchase efficiently.',
    relatedCalculators: ['emi-calculator', 'personal-loan-emi-calculator']
  },
  'loan-interest-calculator': {
    slug: 'loan-interest-calculator',
    category: 'loan',
    title: 'Loan Interest Calculator – Calculate Total Interest Payable | Calcniv',
    description: 'Calculate the total interest on your loan easily. Use our loan interest calculator to find out how much you are paying in interest over the loan tenure.',
    primaryKeyword: 'loan interest calculator',
    secondaryKeywords: [
      'loan interest calculator online', 'loan repayment calculator', 'interest on loan calculator', 'loan interest calculation'
    ],
    h1: 'Loan Interest Calculator',
    intro: 'Find out exactly how much interest you will pay over the life of your loan. Our loan interest calculator breaks down the principal and interest components clearly.',
    relatedCalculators: ['emi-calculator', 'home-loan-emi-calculator']
  },
  'gst-calculator': {
    slug: 'gst-calculator',
    category: 'financial',
    title: 'GST Calculator – Calculate GST Inclusive & Exclusive | Calcniv',
    description: 'Calculate Goods and Services Tax (GST) easily online. Find GST inclusive and exclusive amounts with Calcniv\'s free GST calculator.',
    primaryKeyword: 'GST calculator',
    secondaryKeywords: [
      'GST calculator online', 'GST calculator India', 'calculate GST', 'GST calculation', 'GST inclusive calculator', 'GST exclusive calculator'
    ],
    h1: 'GST Calculator',
    intro: 'Calculate the Goods and Services Tax (GST) for your products or services. Easily determine both GST inclusive and exclusive prices with our simple tool.',
    relatedCalculators: ['percentage-calculator', 'simple-interest-calculator']
  },
  'percentage-calculator': {
    slug: 'percentage-calculator',
    category: 'financial',
    title: 'Percentage Calculator – Calculate Percentages Online | Calcniv',
    description: 'Free online percentage calculator. Calculate percentage increase, percentage decrease, and general percentage problems quickly and easily.',
    primaryKeyword: 'percentage calculator',
    secondaryKeywords: [
      'percentage calculator online', 'calculate percentage', 'percentage increase calculator', 'percentage decrease calculator'
    ],
    h1: 'Percentage Calculator',
    intro: 'Solve percentage problems effortlessly with our free percentage calculator. Quickly calculate percentage increases, decreases, and fractions.',
    relatedCalculators: ['gst-calculator']
  },
  'simple-interest-calculator': {
    slug: 'simple-interest-calculator',
    category: 'financial',
    title: 'Simple Interest Calculator – Calculate Interest Accrued | Calcniv',
    description: 'Calculate simple interest online. Use our free tool to estimate the total interest accrued on loans or investments based on principal, rate, and time.',
    primaryKeyword: 'simple interest calculator',
    secondaryKeywords: [
      'simple interest calculator online', 'simple interest formula', 'interest calculator'
    ],
    h1: 'Simple Interest Calculator',
    intro: 'Calculate simple interest easily with our free online calculator. Determine the interest earned or paid on a principal sum over a specific time period.',
    relatedCalculators: ['compound-interest-calculator']
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
    relatedCalculators: ['cagr-calculator', 'compound-interest-calculator']
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
    relatedCalculators: ['sip-calculator', 'compound-interest-calculator']
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
    relatedCalculators: ['home-loan-emi-calculator', 'home-loan-eligibility-calculator']
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
    relatedCalculators: ['sip-vs-fd-calculator', 'compound-interest-calculator']
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
    relatedCalculators: ['home-loan-emi-calculator', 'rent-vs-buy-calculator']
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
