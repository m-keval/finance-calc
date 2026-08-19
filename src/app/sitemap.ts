import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.calcniv.in'
  
  const routes = [
    '',
    '/calculators/sip',
    '/calculators/step-up-sip',
    '/calculators/goal',
    '/calculators/sip-vs-fd',
    '/calculators/fd',
    '/calculators/income-tax',
    '/calculators/capital-gains',
    '/calculators/hra',
    '/calculators/rent-vs-buy',
    '/calculators/home-loan-eligibility',
    '/calculators/loan-emi',
    '/calculators/invest-vs-repay',
    '/calculators/loan-prepayment',
    '/age-date/age',
    '/health/bmi',
    '/health/ideal-weight',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
