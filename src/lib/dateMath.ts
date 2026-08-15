// Date utility functions for Age & Date calculators

export interface DateDiffResult {
  years: number
  months: number
  days: number
  totalDays: number
  totalWeeks: number
  totalMonths: number
}

export interface AgeResult {
  years: number
  months: number
  days: number
  nextBirthday: Date
  daysUntilBirthday: number
  dayOfWeek: string
  totalDaysLived: number
  totalHoursLived: number
  zodiacSign: string
}

export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function calculateDateDiff(startDate: Date, endDate: Date): DateDiffResult {
  let years = endDate.getFullYear() - startDate.getFullYear()
  let months = endDate.getMonth() - startDate.getMonth()
  let days = endDate.getDate() - startDate.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  const diffMs = endDate.getTime() - startDate.getTime()
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months

  return { years, months, days, totalDays, totalWeeks, totalMonths }
}

export function calculateAge(birthDate: Date, onDate: Date = new Date()): AgeResult {
  const diff = calculateDateDiff(birthDate, onDate)

  // Next birthday
  let nextBirthdayYear = onDate.getFullYear()
  let nextBirthday = new Date(nextBirthdayYear, birthDate.getMonth(), birthDate.getDate())
  if (nextBirthday <= onDate) {
    nextBirthday = new Date(nextBirthdayYear + 1, birthDate.getMonth(), birthDate.getDate())
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - onDate.getTime()) / (1000 * 60 * 60 * 24))

  const totalDaysLived = Math.floor((onDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
  const totalHoursLived = totalDaysLived * 24

  const dayOfWeek = birthDate.toLocaleDateString('en-IN', { weekday: 'long' })
  const zodiacSign = getZodiacSign(birthDate)

  return {
    years: diff.years,
    months: diff.months,
    days: diff.days,
    nextBirthday,
    daysUntilBirthday,
    dayOfWeek,
    totalDaysLived,
    totalHoursLived,
    zodiacSign,
  }
}

export function getZodiacSign(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces"
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"
  return "Capricorn"
}

export function calculateBirthday(birthDate: Date, nthBirthday: number): Date {
  const birthday = new Date(birthDate.getFullYear() + nthBirthday, birthDate.getMonth(), birthDate.getDate())
  return birthday
}

export function calculateDateOfBirth(targetAge: number, targetDate: Date): Date {
  const dob = new Date(targetDate.getFullYear() - targetAge, targetDate.getMonth(), targetDate.getDate())
  return dob
}

export function addDaysToDate(startDate: Date, days: number): Date {
  const result = new Date(startDate)
  result.setDate(result.getDate() + days)
  return result
}

export function subtractDaysFromDate(startDate: Date, days: number): Date {
  const result = new Date(startDate)
  result.setDate(result.getDate() - days)
  return result
}

export function calculateWorkingDays(startDate: Date, endDate: Date): { workingDays: number; weekendDays: number; holidays: number } {
  let workingDays = 0
  let weekendDays = 0
  const current = new Date(startDate)

  while (current <= endDate) {
    const day = current.getDay()
    if (day === 0 || day === 6) {
      weekendDays++
    } else {
      workingDays++
    }
    current.setDate(current.getDate() + 1)
  }

  return { workingDays, weekendDays, holidays: 0 }
}

export function calculateWeeksBetween(startDate: Date, endDate: Date): { weeks: number; remainingDays: number; totalDays: number } {
  const diffMs = endDate.getTime() - startDate.getTime()
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(totalDays / 7)
  const remainingDays = totalDays % 7
  return { weeks, remainingDays, totalDays }
}

export interface TimeDuration {
  hours: number
  minutes: number
  seconds: number
}

export function calculateTimeDuration(startTime: string, endTime: string): TimeDuration & { totalMinutes: number; totalSeconds: number } {
  const [startH, startM, startS] = startTime.split(':').map(Number)
  const [endH, endM, endS] = endTime.split(':').map(Number)

  let startTotalSeconds = startH * 3600 + startM * 60 + (startS || 0)
  let endTotalSeconds = endH * 3600 + endM * 60 + (endS || 0)

  if (endTotalSeconds < startTotalSeconds) {
    endTotalSeconds += 24 * 3600
  }

  const diff = endTotalSeconds - startTotalSeconds
  const hours = Math.floor(diff / 3600)
  const minutes = Math.floor((diff % 3600) / 60)
  const seconds = diff % 60

  return {
    hours,
    minutes,
    seconds,
    totalMinutes: Math.floor(diff / 60),
    totalSeconds: diff,
  }
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN')
}
