export function formatCurrency(value: number) {
  if (isNaN(value) || !isFinite(value)) return "₹0";
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(absValue));

  return isNegative ? `-₹${formatted}` : `₹${formatted}`;
}

// SIP Math
export function calculateSIP(monthlyInvestment: number, annualRate: number, years: number) {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;
  
  const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const totalInvestment = monthlyInvestment * months;
  const estReturns = futureValue - totalInvestment;

  return {
    totalInvestment: Math.round(totalInvestment),
    estReturns: Math.round(estReturns),
    totalValue: Math.round(futureValue),
  };
}

export function generateSIPChartData(monthlyInvestment: number, annualRate: number, years: number) {
  const data = [];
  const monthlyRate = annualRate / 12 / 100;
  
  for (let year = 1; year <= years; year++) {
    const months = year * 12;
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = monthlyInvestment * months;
    
    data.push({
      year: year,
      invested: Math.round(invested),
      returns: Math.round(futureValue - invested),
      totalValue: Math.round(futureValue),
    });
  }
  
  return data;
}

export function calculateStepUpSIP(initialMonthlyInvestment: number, annualRate: number, years: number, stepUpPercentage: number) {
  const monthlyRate = annualRate / 12 / 100;
  let totalInvestment = 0;
  let futureValue = 0;
  let currentMonthlyInvestment = initialMonthlyInvestment;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      totalInvestment += currentMonthlyInvestment;
      futureValue = (futureValue + currentMonthlyInvestment) * (1 + monthlyRate);
    }
    currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpPercentage / 100);
  }

  const estReturns = futureValue - totalInvestment;

  return {
    totalInvestment: Math.round(totalInvestment),
    estReturns: Math.round(estReturns),
    totalValue: Math.round(futureValue),
  };
}

export function generateStepUpSIPChartData(initialMonthlyInvestment: number, annualRate: number, years: number, stepUpPercentage: number) {
  const data = [];
  const monthlyRate = annualRate / 12 / 100;
  let totalInvestment = 0;
  let futureValue = 0;
  let currentMonthlyInvestment = initialMonthlyInvestment;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      totalInvestment += currentMonthlyInvestment;
      futureValue = (futureValue + currentMonthlyInvestment) * (1 + monthlyRate);
    }
    
    data.push({
      year,
      invested: Math.round(totalInvestment),
      returns: Math.round(futureValue - totalInvestment),
      totalValue: Math.round(futureValue),
    });

    currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpPercentage / 100);
  }
  
  return data;
}

export function calculateLumpsum(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100;
  const futureValue = principal * Math.pow(1 + r, years);
  const estReturns = futureValue - principal;

  return {
    totalInvestment: principal,
    estReturns: Math.round(estReturns),
    totalValue: Math.round(futureValue),
  };
}

export function generateLumpsumChartData(principal: number, annualRate: number, years: number) {
  const data = [];
  const r = annualRate / 100;
  
  for (let year = 1; year <= years; year++) {
    const futureValue = principal * Math.pow(1 + r, year);
    data.push({
      year: year,
      invested: principal,
      returns: Math.round(futureValue - principal),
      totalValue: Math.round(futureValue),
    });
  }
  
  return data;
}

// Goal Planning Math
export function calculateGoalSIP(targetAmount: number, annualRate: number, years: number) {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;
  
  const compoundFactor = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const requiredSIP = targetAmount / compoundFactor;
  
  return {
    requiredSIP: Math.ceil(requiredSIP),
  };
}

export function calculateGoalLumpsum(targetAmount: number, annualRate: number, years: number) {
  const r = annualRate / 100;
  const requiredLumpsum = targetAmount / Math.pow(1 + r, years);
  
  return {
    requiredLumpsum: Math.ceil(requiredLumpsum),
  };
}

// FD Math
export function calculateFD(principal: number, annualRate: number, years: number) {
  const n = 4; // Quarterly compounding
  const r = annualRate / 100;
  const maturityAmount = principal * Math.pow(1 + r / n, n * years);
  const interestEarned = maturityAmount - principal;

  return {
    principal,
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount),
  };
}

export function generateFDChartData(principal: number, annualRate: number, years: number) {
  const data = [];
  const n = 4;
  const r = annualRate / 100;

  for (let year = 1; year <= years; year++) {
    const maturityAmount = principal * Math.pow(1 + r / n, n * year);
    data.push({
      year,
      invested: principal,
      returns: Math.round(maturityAmount - principal),
      totalValue: Math.round(maturityAmount),
    });
  }
  
  return data;
}

// Loan EMI Math
export function calculateLoanEMI(principal: number, annualRate: number, years: number) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    principal,
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}

export function generateLoanAmortizationSchedule(principal: number, annualRate: number, years: number, period: 'monthly' | 'yearly' = 'yearly') {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  
  const schedule = [];
  let remainingBalance = principal;
  
  if (period === 'yearly') {
    for (let year = 1; year <= years; year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      
      for (let month = 1; month <= 12; month++) {
        const interestForMonth = remainingBalance * r;
        const principalForMonth = emi - interestForMonth;
        
        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        remainingBalance -= principalForMonth;
        
        if (remainingBalance < 0) remainingBalance = 0;
      }
      
      schedule.push({
        label: year,
        interest: Math.round(yearlyInterest),
        principal: Math.round(yearlyPrincipal),
        balance: Math.round(remainingBalance),
        totalPayment: Math.round(yearlyInterest + yearlyPrincipal)
      });
    }
  } else {
    for (let month = 1; month <= n; month++) {
      const interestForMonth = remainingBalance * r;
      const principalForMonth = emi - interestForMonth;
      
      remainingBalance -= principalForMonth;
      if (remainingBalance < 0) remainingBalance = 0;
      
      schedule.push({
        label: month,
        interest: Math.round(interestForMonth),
        principal: Math.round(principalForMonth),
        balance: Math.round(remainingBalance),
        totalPayment: Math.round(emi)
      });
    }
  }
  
  return schedule;
}

// Inflation Math
export function calculateInflation(currentAmount: number, inflationRate: number, years: number) {
  const r = inflationRate / 100;
  const futureCost = currentAmount * Math.pow(1 + r, years);
  
  // Purchasing power of current amount in future
  const purchasingPower = currentAmount / Math.pow(1 + r, years);

  return {
    currentAmount,
    futureCost: Math.round(futureCost),
    purchasingPower: Math.round(purchasingPower),
    lossDueToInflation: Math.round(currentAmount - purchasingPower)
  };
}

export function generateInflationChartData(currentAmount: number, inflationRate: number, years: number) {
  const data = [];
  const r = inflationRate / 100;

  for (let year = 1; year <= years; year++) {
    const futureCost = currentAmount * Math.pow(1 + r, year);
    data.push({
      year,
      currentValue: currentAmount,
      futureCost: Math.round(futureCost),
    });
  }
  
  return data;
}

// Rent vs Buy Math
export interface BuyParams {
  propertyValue: number;
  downPayment: number;
  loanInterestRate: number;
  loanTenure: number;
  propertyAppreciationRate: number;
  maintenanceRate: number;
}

export interface RentParams {
  monthlyRent: number;
  rentEscalationRate: number;
  investmentReturnRate: number;
}

export function calculateRentVsBuy(buyParams: BuyParams, rentParams: RentParams, years: number) {
  const { propertyValue, downPayment, loanInterestRate, loanTenure, propertyAppreciationRate, maintenanceRate } = buyParams;
  const { monthlyRent, rentEscalationRate, investmentReturnRate } = rentParams;

  const loanAmount = propertyValue - downPayment;
  const monthlyLoanRate = loanInterestRate / 12 / 100;
  const totalMonths = loanTenure * 12;
  
  // Calculate EMI
  let emi = 0;
  if (loanAmount > 0 && monthlyLoanRate > 0) {
    emi = (loanAmount * monthlyLoanRate * Math.pow(1 + monthlyLoanRate, totalMonths)) / (Math.pow(1 + monthlyLoanRate, totalMonths) - 1);
  } else if (loanAmount > 0) {
    emi = loanAmount / totalMonths;
  }

  const yearlyMaintenance = propertyValue * (maintenanceRate / 100);
  const monthlyInvestmentReturn = investmentReturnRate / 12 / 100;

  let currentPropertyValue = propertyValue;
  let currentRent = monthlyRent;
  let investmentPortfolio = downPayment; // Opportunity cost: invest down payment instead of buying
  
  let totalRentPaid = 0;
  let totalEMIPaid = 0;
  let totalMaintenancePaid = 0;
  let remainingLoan = loanAmount;

  const chartData = [];

  for (let year = 1; year <= years; year++) {
    let yearlyRentPaid = 0;
    let yearlyEMIPaid = 0;
    const yearlyMaintenancePaid = yearlyMaintenance; 
    
    for (let month = 1; month <= 12; month++) {
      yearlyRentPaid += currentRent;
      
      let interestForMonth = 0;
      let principalForMonth = 0;
      let actualEMI = 0;
      
      if (remainingLoan > 0) {
        interestForMonth = remainingLoan * monthlyLoanRate;
        actualEMI = Math.min(emi, remainingLoan + interestForMonth);
        principalForMonth = actualEMI - interestForMonth;
        remainingLoan -= principalForMonth;
        if (remainingLoan < 0) remainingLoan = 0;
        yearlyEMIPaid += actualEMI;
      }

      // monthly cash flow difference (what you would have paid to buy vs what you paid to rent)
      const buyMonthlyCost = actualEMI + (yearlyMaintenance / 12);
      const rentMonthlyCost = currentRent;
      const monthlySavings = buyMonthlyCost - rentMonthlyCost;

      // Compound the investment portfolio and add monthly savings
      investmentPortfolio = (investmentPortfolio * (1 + monthlyInvestmentReturn)) + monthlySavings;
    }
    
    totalRentPaid += yearlyRentPaid;
    totalEMIPaid += yearlyEMIPaid;
    totalMaintenancePaid += yearlyMaintenancePaid;
    
    currentPropertyValue = currentPropertyValue * (1 + propertyAppreciationRate / 100);
    currentRent = currentRent * (1 + rentEscalationRate / 100);

    const netWorthBuy = currentPropertyValue - remainingLoan;
    const netWorthRent = investmentPortfolio;

    chartData.push({
      year,
      propertyValue: Math.round(currentPropertyValue),
      remainingLoan: Math.round(remainingLoan),
      netWorthBuy: Math.round(netWorthBuy),
      netWorthRent: Math.round(netWorthRent),
      rentPaid: Math.round(totalRentPaid)
    });
  }

  const finalNetWorthBuy = chartData[chartData.length - 1].netWorthBuy;
  const finalNetWorthRent = chartData[chartData.length - 1].netWorthRent;
  const isBuyingBetter = finalNetWorthBuy > finalNetWorthRent;
  const difference = Math.abs(finalNetWorthBuy - finalNetWorthRent);

  return {
    emi: Math.round(emi),
    totalEMIPaid: Math.round(totalEMIPaid),
    totalMaintenancePaid: Math.round(totalMaintenancePaid),
    totalRentPaid: Math.round(totalRentPaid),
    finalPropertyValue: Math.round(currentPropertyValue),
    finalInvestmentPortfolio: Math.round(investmentPortfolio),
    finalNetWorthBuy: Math.round(finalNetWorthBuy),
    finalNetWorthRent: Math.round(finalNetWorthRent),
    isBuyingBetter,
    difference: Math.round(difference),
    chartData
  };
}

// Home Loan Eligibility Math
export function calculateHomeLoanEligibility(monthlyIncome: number, existingEMIs: number, interestRate: number, tenureYears: number) {
  // Max EMI a person can afford is generally capped at 50% of net monthly income
  const foir = 0.50; // Fixed Obligation to Income Ratio
  const maxTotalEMI = monthlyIncome * foir;
  
  // The EMI they can afford for the NEW loan
  let availableEMI = maxTotalEMI - existingEMIs;
  if (availableEMI < 0) availableEMI = 0;

  const r = interestRate / 12 / 100;
  const n = tenureYears * 12;

  // Max Loan Amount = E * ((1+r)^n - 1) / (r * (1+r)^n)
  let maxEligibleLoan = 0;
  if (availableEMI > 0 && r > 0) {
    maxEligibleLoan = availableEMI * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
  } else if (availableEMI > 0) {
    maxEligibleLoan = availableEMI * n;
  }

  // Assuming an 80% LTV (Loan to Value) ratio, calculate max property value
  const maxPropertyValue = maxEligibleLoan / 0.80;
  const minimumDownPayment = maxPropertyValue - maxEligibleLoan;

  return {
    maxEligibleLoan: Math.round(maxEligibleLoan),
    availableEMI: Math.round(availableEMI),
    maxTotalAffordableEMI: Math.round(maxTotalEMI),
    maxPropertyValue: Math.round(maxPropertyValue),
    minimumDownPayment: Math.round(minimumDownPayment)
  };
}

// HRA Exemption Math
export function calculateHRA(basicSalary: number, hraReceived: number, rentPaid: number, isMetro: boolean) {
  // Rule 1: Actual HRA received
  const rule1 = hraReceived;
  
  // Rule 2: 50% of Basic Salary for Metro, 40% for Non-Metro
  const rule2 = isMetro ? (basicSalary * 0.5) : (basicSalary * 0.4);
  
  // Rule 3: Actual Rent Paid - 10% of Basic Salary
  const rule3 = Math.max(0, rentPaid - (basicSalary * 0.1));
  
  // Exemption is the minimum of the three rules
  const exemptHRA = Math.min(rule1, rule2, rule3);
  const taxableHRA = hraReceived - exemptHRA;

  return {
    rule1: Math.round(rule1),
    rule2: Math.round(rule2),
    rule3: Math.round(rule3),
    exemptHRA: Math.round(exemptHRA),
    taxableHRA: Math.max(0, Math.round(taxableHRA))
  };
}

// Capital Gains Tax Math
export type AssetType = 'equity' | 'realEstate';

export function calculateCapitalGains(
  assetType: AssetType, 
  purchasePrice: number, 
  salePrice: number, 
  holdingPeriodMonths: number
) {
  const totalGain = salePrice - purchasePrice;
  let isLongTerm = false;
  let stcgTaxRate = 0;
  let ltcgTaxRate = 0;
  let ltcgExemption = 0;

  if (assetType === 'equity') {
    isLongTerm = holdingPeriodMonths > 12;
    stcgTaxRate = 0.20; // 20% STCG on Equity
    ltcgTaxRate = 0.125; // 12.5% LTCG on Equity
    ltcgExemption = 125000; // 1.25 Lakh exemption
  } else {
    isLongTerm = holdingPeriodMonths > 24;
    stcgTaxRate = 0.30; // 30% STCG assumed for Real Estate (slab rate)
    ltcgTaxRate = 0.125; // 12.5% without indexation
    ltcgExemption = 0;
  }

  let taxableGain = 0;
  let taxLiability = 0;

  if (totalGain > 0) {
    if (isLongTerm) {
      taxableGain = Math.max(0, totalGain - ltcgExemption);
      taxLiability = taxableGain * ltcgTaxRate;
    } else {
      taxableGain = totalGain;
      taxLiability = taxableGain * stcgTaxRate;
    }
  }

  return {
    totalGain: Math.round(totalGain),
    isLongTerm,
    taxableGain: Math.round(taxableGain),
    taxLiability: Math.round(taxLiability),
    netProfit: Math.round(totalGain - taxLiability)
  };
}

// Income Tax Math (FY 2024-25 / AY 2025-26)
export function calculateIncomeTax(
  grossIncome: number,
  totalDeductions: number // e.g. 80C, 80D, HRA, LTA etc for old regime
) {
  // 1. Standard Deduction
  const stdDeductionOld = 50000;
  const stdDeductionNew = 75000; // Budget 2024

  // 2. Taxable Income
  const taxableOld = Math.max(0, grossIncome - stdDeductionOld - totalDeductions);
  const taxableNew = Math.max(0, grossIncome - stdDeductionNew); // Deductions generally not allowed in new regime

  // 3. Calculate Tax for Old Regime
  let taxOld = 0;
  if (taxableOld > 250000) {
    if (taxableOld <= 500000) {
      taxOld = (taxableOld - 250000) * 0.05;
    } else if (taxableOld <= 1000000) {
      taxOld = 250000 * 0.05 + (taxableOld - 500000) * 0.20;
    } else {
      taxOld = 250000 * 0.05 + 500000 * 0.20 + (taxableOld - 1000000) * 0.30;
    }
  }

  // 4. Calculate Tax for New Regime (Budget 2024 slabs)
  let taxNew = 0;
  if (taxableNew > 300000) {
    if (taxableNew <= 700000) {
      taxNew = (taxableNew - 300000) * 0.05;
    } else if (taxableNew <= 1000000) {
      taxNew = 400000 * 0.05 + (taxableNew - 700000) * 0.10;
    } else if (taxableNew <= 1200000) {
      taxNew = 400000 * 0.05 + 300000 * 0.10 + (taxableNew - 1000000) * 0.15;
    } else if (taxableNew <= 1500000) {
      taxNew = 400000 * 0.05 + 300000 * 0.10 + 200000 * 0.15 + (taxableNew - 1200000) * 0.20;
    } else {
      taxNew = 400000 * 0.05 + 300000 * 0.10 + 200000 * 0.15 + 300000 * 0.20 + (taxableNew - 1500000) * 0.30;
    }
  }

  // 5. Rebate under section 87A
  if (taxableOld <= 500000) taxOld = 0; // Max 12500 rebate
  if (taxableNew <= 700000) taxNew = 0; // Max 25000 rebate
  // Note: Marginal relief for new regime is ignored for simplicity but exists for income just above 7L

  // 6. Health & Education Cess (4%)
  const cessOld = taxOld * 0.04;
  const cessNew = taxNew * 0.04;

  const finalTaxOld = taxOld + cessOld;
  const finalTaxNew = taxNew + cessNew;

  return {
    grossIncome,
    stdDeductionOld,
    stdDeductionNew,
    totalDeductions,
    taxableOld,
    taxableNew,
    finalTaxOld: Math.round(finalTaxOld),
    finalTaxNew: Math.round(finalTaxNew),
    taxSavedOld: Math.max(0, Math.round(finalTaxNew - finalTaxOld)),
    taxSavedNew: Math.max(0, Math.round(finalTaxOld - finalTaxNew)),
    betterRegime: finalTaxOld < finalTaxNew ? 'old' : 'new'
  };
}
