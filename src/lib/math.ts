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
