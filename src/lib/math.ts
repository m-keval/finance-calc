export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
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
