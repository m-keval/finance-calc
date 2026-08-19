// Date utility functions for Age & Date calculators

export interface DateDiffResult {
  years: number
  months: number
  days: number
  totalDays: number
  totalWeeks: number
  totalMonths: number
  totalHours: number
  totalMinutes: number
  totalSeconds: number
  workingDays: number
  weekendDays: number
}

export interface ZodiacInfo {
  sign: string
  symbol: string
  element: "Fire" | "Earth" | "Air" | "Water"
  elementColor: string
  rulingPlanet: string
  traits: string[]
  dates: string
  glyph: string
}

export interface ChineseZodiacInfo {
  animal: string
  element: string
  yinYang: "Yin" | "Yang"
  luckyNumbers: number[]
  luckyColors: string[]
  traits: string[]
}

export interface CosmicProfile {
  zodiac: ZodiacInfo
  chineseZodiac: ChineseZodiacInfo
  birthstone: { name: string; color: string; meaning: string }
  birthFlower: { name: string; meaning: string }
  generation: { name: string; range: string; description: string }
}

export interface LifeStats {
  totalYearsDecimal: number
  totalMonths: number
  totalWeeks: number
  totalDays: number
  totalHours: number
  totalMinutes: number
  totalSeconds: number
  estimatedHeartbeats: number
  estimatedBreaths: number
  estimatedSleepYears: number
  earthSunDistanceKm: number
  tenThousandthDay: Date
  twentyThousandthDay: Date
  is10kPast: boolean
  is20kPast: boolean
}

export interface BirthdayMilestone {
  age: number
  date: Date
  dayOfWeek: string
  isWeekend: boolean
  daysUntil: number
  label?: string
}

export interface AgeResult {
  years: number
  months: number
  days: number
  nextBirthday: Date
  daysUntilBirthday: number
  hoursUntilBirthday: number
  minutesUntilBirthday: number
  secondsUntilBirthday: number
  dayOfWeek: string
  dayOfYear: number
  isLeapYearBorn: boolean
  totalDaysLived: number
  totalHoursLived: number
  totalMinutesLived: number
  totalSecondsLived: number
  cosmic: CosmicProfile
  lifeStats: LifeStats
  upcomingBirthdays: BirthdayMilestone[]
  yearProgressPercent: number
  halfBirthday: Date
  daysUntilHalfBirthday: number
}

export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export function formatDateFull(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export function calculateDateDiff(
  startDate: Date,
  endDate: Date,
  includeEndDate: boolean = false
): DateDiffResult {
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
  let end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())

  if (includeEndDate) {
    end = new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1)
  }

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  const diffMs = Math.max(0, end.getTime() - start.getTime())
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months
  const totalHours = totalDays * 24
  const totalMinutes = totalHours * 60
  const totalSeconds = totalMinutes * 60

  // Working days count
  let workingDays = 0
  let weekendDays = 0
  const current = new Date(start)
  while (current < end) {
    const day = current.getDay()
    if (day === 0 || day === 6) {
      weekendDays++
    } else {
      workingDays++
    }
    current.setDate(current.getDate() + 1)
  }

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    totalSeconds,
    workingDays,
    weekendDays
  }
}

export function getZodiacSignInfo(date: Date): ZodiacInfo {
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return {
      sign: "Aries",
      symbol: "The Ram",
      element: "Fire",
      elementColor: "text-red-500",
      rulingPlanet: "Mars",
      traits: ["Courageous", "Determined", "Confident", "Passionate"],
      dates: "Mar 21 - Apr 19",
      glyph: "♈"
    }
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return {
      sign: "Taurus",
      symbol: "The Bull",
      element: "Earth",
      elementColor: "text-emerald-500",
      rulingPlanet: "Venus",
      traits: ["Reliable", "Patient", "Practical", "Devoted"],
      dates: "Apr 20 - May 20",
      glyph: "♉"
    }
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return {
      sign: "Gemini",
      symbol: "The Twins",
      element: "Air",
      elementColor: "text-sky-500",
      rulingPlanet: "Mercury",
      traits: ["Adaptable", "Outgoing", "Intelligent", "Curious"],
      dates: "May 21 - Jun 20",
      glyph: "♊"
    }
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return {
      sign: "Cancer",
      symbol: "The Crab",
      element: "Water",
      elementColor: "text-blue-500",
      rulingPlanet: "Moon",
      traits: ["Intuitive", "Compassionate", "Protective", "Loyal"],
      dates: "Jun 21 - Jul 22",
      glyph: "♋"
    }
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return {
      sign: "Leo",
      symbol: "The Lion",
      element: "Fire",
      elementColor: "text-amber-500",
      rulingPlanet: "Sun",
      traits: ["Charismatic", "Generous", "Warm-hearted", "Creative"],
      dates: "Jul 23 - Aug 22",
      glyph: "♌"
    }
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return {
      sign: "Virgo",
      symbol: "The Maiden",
      element: "Earth",
      elementColor: "text-emerald-500",
      rulingPlanet: "Mercury",
      traits: ["Analytical", "Hardworking", "Kind", "Detail-oriented"],
      dates: "Aug 23 - Sep 22",
      glyph: "♍"
    }
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return {
      sign: "Libra",
      symbol: "The Scales",
      element: "Air",
      elementColor: "text-sky-500",
      rulingPlanet: "Venus",
      traits: ["Diplomatic", "Fair-minded", "Social", "Harmonious"],
      dates: "Sep 23 - Oct 22",
      glyph: "♎"
    }
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return {
      sign: "Scorpio",
      symbol: "The Scorpion",
      element: "Water",
      elementColor: "text-purple-500",
      rulingPlanet: "Pluto & Mars",
      traits: ["Passionate", "Resourceful", "Brave", "Perceptive"],
      dates: "Oct 23 - Nov 21",
      glyph: "♏"
    }
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return {
      sign: "Sagittarius",
      symbol: "The Archer",
      element: "Fire",
      elementColor: "text-orange-500",
      rulingPlanet: "Jupiter",
      traits: ["Optimistic", "Adventurous", "Honest", "Enthusiastic"],
      dates: "Nov 22 - Dec 21",
      glyph: "♐"
    }
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return {
      sign: "Capricorn",
      symbol: "The Sea-Goat",
      element: "Earth",
      elementColor: "text-emerald-500",
      rulingPlanet: "Saturn",
      traits: ["Disciplined", "Responsible", "Ambitious", "Persistent"],
      dates: "Dec 22 - Jan 19",
      glyph: "♑"
    }
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return {
      sign: "Aquarius",
      symbol: "The Water-Bearer",
      element: "Air",
      elementColor: "text-cyan-500",
      rulingPlanet: "Uranus",
      traits: ["Innovative", "Independent", "Humanitarian", "Original"],
      dates: "Jan 20 - Feb 18",
      glyph: "♒"
    }
  }
  return {
    sign: "Pisces",
    symbol: "The Two Fishes",
    element: "Water",
    elementColor: "text-teal-500",
    rulingPlanet: "Neptune",
    traits: ["Compassionate", "Artistic", "Wise", "Empathetic"],
    dates: "Feb 19 - Mar 20",
    glyph: "♓"
  }
}

export function getChineseZodiac(year: number): ChineseZodiacInfo {
  const animals = [
    { animal: "Rat", traits: ["Quick-witted", "Resourceful", "Versatile"], luckyNumbers: [2, 3], luckyColors: ["Blue", "Gold", "Green"] },
    { animal: "Ox", traits: ["Diligent", "Dependable", "Strong", "Determined"], luckyNumbers: [1, 4], luckyColors: ["White", "Yellow", "Green"] },
    { animal: "Tiger", traits: ["Brave", "Confident", "Competitive", "Charming"], luckyNumbers: [1, 3, 4], luckyColors: ["Blue", "Grey", "Orange"] },
    { animal: "Rabbit", traits: ["Quiet", "Elegant", "Kind", "Responsible"], luckyNumbers: [3, 4, 6], luckyColors: ["Red", "Pink", "Purple"] },
    { animal: "Dragon", traits: ["Confident", "Intelligent", "Enthusiastic", "Noble"], luckyNumbers: [1, 6, 7], luckyColors: ["Gold", "Silver", "Greyish White"] },
    { animal: "Snake", traits: ["Enigmatic", "Intelligent", "Wise", "Intuitive"], luckyNumbers: [2, 8, 9], luckyColors: ["Black", "Red", "Yellow"] },
    { animal: "Horse", traits: ["Animated", "Active", "Energetic", "Free-spirited"], luckyNumbers: [2, 3, 7], luckyColors: ["Yellow", "Green"] },
    { animal: "Goat", traits: ["Calm", "Gentle", "Sympathetic", "Creative"], luckyNumbers: [2, 7], luckyColors: ["Brown", "Red", "Purple"] },
    { animal: "Monkey", traits: ["Sharp", "Smart", "Curious", "Playful"], luckyNumbers: [4, 9], luckyColors: ["White", "Blue", "Gold"] },
    { animal: "Rooster", traits: ["Observant", "Hardworking", "Courageous", "Talented"], luckyNumbers: [5, 7, 8], luckyColors: ["Gold", "Brown", "Yellow"] },
    { animal: "Dog", traits: ["Lovely", "Honest", "Prudent", "Loyal"], luckyNumbers: [3, 4, 9], luckyColors: ["Red", "Green", "Purple"] },
    { animal: "Pig", traits: ["Compassionate", "Generous", "Diligent", "Peace-loving"], luckyNumbers: [2, 5, 8], luckyColors: ["Yellow", "Grey", "Brown"] },
  ]

  // 1900 was Year of the Rat (offset 4 in modulo 12 from 0AD, 1924 is Rat, etc.)
  // formula: (year - 4) % 12
  const index = Math.abs((year - 4) % 12)
  const entry = animals[index]

  // Element: based on last digit of year
  const lastDigit = year % 10
  let element = "Metal"
  if (lastDigit === 0 || lastDigit === 1) element = "Metal"
  else if (lastDigit === 2 || lastDigit === 3) element = "Water"
  else if (lastDigit === 4 || lastDigit === 5) element = "Wood"
  else if (lastDigit === 6 || lastDigit === 7) element = "Fire"
  else element = "Earth"

  const yinYang: "Yin" | "Yang" = year % 2 === 0 ? "Yang" : "Yin"

  return {
    animal: entry.animal,
    element,
    yinYang,
    luckyNumbers: entry.luckyNumbers,
    luckyColors: entry.luckyColors,
    traits: entry.traits
  }
}

export function getBirthstone(month: number): { name: string; color: string; meaning: string } {
  const stones = [
    { name: "Garnet", color: "bg-red-700 text-white", meaning: "Protection, Strength & Friendship" },
    { name: "Amethyst", color: "bg-purple-700 text-white", meaning: "Peace, Wisdom & Clarity" },
    { name: "Aquamarine", color: "bg-cyan-500 text-white", meaning: "Serenity, Courage & Harmony" },
    { name: "Diamond", color: "bg-slate-200 text-slate-900", meaning: "Everlasting Love & Resilience" },
    { name: "Emerald", color: "bg-emerald-600 text-white", meaning: "Rebirth, Growth & Vitality" },
    { name: "Pearl / Alexandrite", color: "bg-indigo-200 text-indigo-950", meaning: "Purity, Grace & Good Luck" },
    { name: "Ruby", color: "bg-rose-600 text-white", meaning: "Passion, Prosperity & Vitality" },
    { name: "Peridot", color: "bg-lime-600 text-white", meaning: "Healing, Positivity & Abundance" },
    { name: "Sapphire", color: "bg-blue-700 text-white", meaning: "Wisdom, Loyalty & Nobility" },
    { name: "Opal / Tourmaline", color: "bg-pink-400 text-white", meaning: "Hope, Creativity & Intuition" },
    { name: "Topaz / Citrine", color: "bg-amber-500 text-white", meaning: "Joy, Abundance & Success" },
    { name: "Tanzanite / Turquoise", color: "bg-teal-600 text-white", meaning: "Tranquility, Good Fortune & Wisdom" },
  ]
  return stones[month] || stones[0]
}

export function getBirthFlower(month: number): { name: string; meaning: string } {
  const flowers = [
    { name: "Carnation & Snowdrop", meaning: "Devotion, Love & Fascination" },
    { name: "Violet & Primrose", meaning: "Loyalty, Modesty & Faithfulness" },
    { name: "Daffodil & Jonquil", meaning: "New Beginnings, Hope & Rebirth" },
    { name: "Daisy & Sweet Pea", meaning: "Innocence, Joy & Blissful Pleasure" },
    { name: "Lily of the Valley & Hawthorn", meaning: "Sweetness, Humility & Happiness" },
    { name: "Rose & Honeysuckle", meaning: "Love, Passion, Beauty & Devotion" },
    { name: "Larkspur & Water Lily", meaning: "Positivity, Grace & Open Heart" },
    { name: "Gladiolus & Poppy", meaning: "Strength of Character, Integrity & Remembrance" },
    { name: "Aster & Morning Glory", meaning: "Wisdom, Valor, Faith & Affection" },
    { name: "Marigold & Cosmos", meaning: "Warmth, Creativity, Fierce Passion & Peace" },
    { name: "Chrysanthemum", meaning: "Joy, Optimism, Friendship & Longevity" },
    { name: "Narcissus & Holly", meaning: "Hope, Rebirth, Good Fortune & Protection" },
  ]
  return flowers[month] || flowers[0]
}

export function getGeneration(year: number): { name: string; range: string; description: string } {
  if (year >= 2013) {
    return { name: "Generation Alpha", range: "2013 – 2025+", description: "Digital natives of the AI and hyper-connected era." }
  }
  if (year >= 1997) {
    return { name: "Generation Z (Zoomers)", range: "1997 – 2012", description: "Tech-savvy, values-driven digital innovators." }
  }
  if (year >= 1981) {
    return { name: "Millennials (Gen Y)", range: "1981 – 1996", description: "Pioneered modern internet culture, tech, and workplace flexibility." }
  }
  if (year >= 1965) {
    return { name: "Generation X", range: "1965 – 1980", description: "Self-reliant, bridge between analog & digital worlds." }
  }
  if (year >= 1946) {
    return { name: "Baby Boomers", range: "1946 – 1964", description: "Post-war generation that shaped modern global economy & culture." }
  }
  return { name: "Silent Generation", range: "1928 – 1945", description: "Resilient generation of hard work, discipline, and community." }
}

export function calculateAge(birthDate: Date, onDate: Date = new Date()): AgeResult {
  const diff = calculateDateDiff(birthDate, onDate)

  // Next birthday calculation
  const nextBirthdayYear = onDate.getFullYear()
  let nextBirthday = new Date(nextBirthdayYear, birthDate.getMonth(), birthDate.getDate())
  if (nextBirthday <= onDate) {
    nextBirthday = new Date(nextBirthdayYear + 1, birthDate.getMonth(), birthDate.getDate())
  }

  // Previous birthday
  const prevBirthday = new Date(nextBirthday.getFullYear() - 1, birthDate.getMonth(), birthDate.getDate())
  const totalDaysInCurrentYearSpan = Math.floor((nextBirthday.getTime() - prevBirthday.getTime()) / (1000 * 60 * 60 * 24))
  const daysPassedSinceLastBirthday = Math.max(0, Math.floor((onDate.getTime() - prevBirthday.getTime()) / (1000 * 60 * 60 * 24)))
  const yearProgressPercent = Math.min(100, Math.max(0, Math.round((daysPassedSinceLastBirthday / totalDaysInCurrentYearSpan) * 100)))

  // Countdown to next birthday in ms
  const diffToBirthdayMs = Math.max(0, nextBirthday.getTime() - onDate.getTime())
  const daysUntilBirthday = Math.floor(diffToBirthdayMs / (1000 * 60 * 60 * 24))
  const hoursUntilBirthday = Math.floor((diffToBirthdayMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutesUntilBirthday = Math.floor((diffToBirthdayMs % (1000 * 60 * 60)) / (1000 * 60))
  const secondsUntilBirthday = Math.floor((diffToBirthdayMs % (1000 * 60)) / 1000)

  // Total times lived
  const totalDaysLived = Math.max(0, Math.floor((onDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)))
  const totalHoursLived = totalDaysLived * 24
  const totalMinutesLived = totalHoursLived * 60
  const totalSecondsLived = totalMinutesLived * 60

  const dayOfWeek = birthDate.toLocaleDateString('en-IN', { weekday: 'long' })
  const dayOfYear = getDayOfYear(birthDate)
  const isLeapYearBorn = isLeapYear(birthDate.getFullYear())

  // Half-Birthday: 6 months after birth month
  const halfBirthdayMonth = (birthDate.getMonth() + 6) % 12
  const halfBirthdayYear = onDate.getFullYear()
  let halfBirthday = new Date(halfBirthdayYear, halfBirthdayMonth, birthDate.getDate())
  if (halfBirthday <= onDate) {
    halfBirthday = new Date(halfBirthdayYear + 1, halfBirthdayMonth, birthDate.getDate())
  }
  const daysUntilHalfBirthday = Math.max(0, Math.ceil((halfBirthday.getTime() - onDate.getTime()) / (1000 * 60 * 60 * 24)))

  // Cosmic Profile
  const zodiac = getZodiacSignInfo(birthDate)
  const chineseZodiac = getChineseZodiac(birthDate.getFullYear())
  const birthstone = getBirthstone(birthDate.getMonth())
  const birthFlower = getBirthFlower(birthDate.getMonth())
  const generation = getGeneration(birthDate.getFullYear())

  // Life Stats
  const estimatedHeartbeats = Math.floor(totalMinutesLived * 75) // ~75 bpm average
  const estimatedBreaths = Math.floor(totalMinutesLived * 16) // ~16 breaths/min
  const estimatedSleepYears = Number(((totalDaysLived * 8) / (24 * 365.25)).toFixed(1))
  const earthSunDistanceKm = Math.floor((totalDaysLived / 365.25) * 940000000) // ~940 million km per earth orbit

  const tenThousandthDay = new Date(birthDate.getTime() + 10000 * 24 * 60 * 60 * 1000)
  const twentyThousandthDay = new Date(birthDate.getTime() + 20000 * 24 * 60 * 60 * 1000)
  const is10kPast = onDate >= tenThousandthDay
  const is20kPast = onDate >= twentyThousandthDay

  // Upcoming 6 Birthdays with milestones
  const upcomingBirthdays: BirthdayMilestone[] = Array.from({ length: 6 }, (_, i) => {
    const ageNum = diff.years + i + (nextBirthday.getFullYear() === onDate.getFullYear() && (onDate.getMonth() > birthDate.getMonth() || (onDate.getMonth() === birthDate.getMonth() && onDate.getDate() >= birthDate.getDate())) ? 1 : 1)
    const bDate = new Date(birthDate.getFullYear() + ageNum, birthDate.getMonth(), birthDate.getDate())
    const dayName = bDate.toLocaleDateString('en-IN', { weekday: 'long' })
    const isWk = bDate.getDay() === 0 || bDate.getDay() === 6
    const daysLeft = Math.max(0, Math.ceil((bDate.getTime() - onDate.getTime()) / (1000 * 60 * 60 * 24)))

    let label: string | undefined = undefined
    if (ageNum % 10 === 0) label = `Big ${ageNum}th!`
    else if (ageNum === 18) label = "Adult (18)"
    else if (ageNum === 21) label = "Milestone 21"
    else if (ageNum === 50) label = "Golden 50"
    else if (ageNum === 75) label = "Diamond 75"
    else if (ageNum === 100) label = "Centennial 100 👑"

    return {
      age: ageNum,
      date: bDate,
      dayOfWeek: dayName,
      isWeekend: isWk,
      daysUntil: daysLeft,
      label
    }
  })

  return {
    years: diff.years,
    months: diff.months,
    days: diff.days,
    nextBirthday,
    daysUntilBirthday,
    hoursUntilBirthday,
    minutesUntilBirthday,
    secondsUntilBirthday,
    dayOfWeek,
    dayOfYear,
    isLeapYearBorn,
    totalDaysLived,
    totalHoursLived,
    totalMinutesLived,
    totalSecondsLived,
    cosmic: {
      zodiac,
      chineseZodiac,
      birthstone,
      birthFlower,
      generation,
    },
    lifeStats: {
      totalYearsDecimal: Number((totalDaysLived / 365.2425).toFixed(2)),
      totalMonths: diff.totalMonths,
      totalWeeks: diff.totalWeeks,
      totalDays: totalDaysLived,
      totalHours: totalHoursLived,
      totalMinutes: totalMinutesLived,
      totalSeconds: totalSecondsLived,
      estimatedHeartbeats,
      estimatedBreaths,
      estimatedSleepYears,
      earthSunDistanceKm,
      tenThousandthDay,
      twentyThousandthDay,
      is10kPast,
      is20kPast
    },
    upcomingBirthdays,
    yearProgressPercent,
    halfBirthday,
    daysUntilHalfBirthday
  }
}

export function getZodiacSign(date: Date): string {
  return getZodiacSignInfo(date).sign
}

export function calculateBirthday(birthDate: Date, nthBirthday: number): Date {
  return new Date(birthDate.getFullYear() + nthBirthday, birthDate.getMonth(), birthDate.getDate())
}

export function calculateDateOfBirth(targetAge: number, targetDate: Date = new Date()): Date {
  return new Date(targetDate.getFullYear() - targetAge, targetDate.getMonth(), targetDate.getDate())
}

export function calculateDateOfBirthExact(
  years: number,
  months: number,
  days: number,
  targetDate: Date = new Date()
): Date {
  const result = new Date(targetDate)
  result.setFullYear(result.getFullYear() - years)
  result.setMonth(result.getMonth() - months)
  result.setDate(result.getDate() - days)
  return result
}

export function addUnitsToDate(
  startDate: Date,
  options: { years?: number; months?: number; weeks?: number; days?: number; businessDaysOnly?: boolean }
): Date {
  const { years = 0, months = 0, weeks = 0, days = 0, businessDaysOnly = false } = options
  const result = new Date(startDate)

  if (years !== 0) result.setFullYear(result.getFullYear() + years)
  if (months !== 0) result.setMonth(result.getMonth() + months)

  const calendarDays = weeks * 7 + days
  if (businessDaysOnly) {
    let added = 0
    while (added < calendarDays) {
      result.setDate(result.getDate() + 1)
      const day = result.getDay()
      if (day !== 0 && day !== 6) {
        added++
      }
    }
  } else {
    result.setDate(result.getDate() + calendarDays)
  }

  return result
}

export function subtractUnitsFromDate(
  startDate: Date,
  options: { years?: number; months?: number; weeks?: number; days?: number; businessDaysOnly?: boolean }
): Date {
  const { years = 0, months = 0, weeks = 0, days = 0, businessDaysOnly = false } = options
  const result = new Date(startDate)

  if (years !== 0) result.setFullYear(result.getFullYear() - years)
  if (months !== 0) result.setMonth(result.getMonth() - months)

  const calendarDays = weeks * 7 + days
  if (businessDaysOnly) {
    let subtracted = 0
    while (subtracted < calendarDays) {
      result.setDate(result.getDate() - 1)
      const day = result.getDay()
      if (day !== 0 && day !== 6) {
        subtracted++
      }
    }
  } else {
    result.setDate(result.getDate() - calendarDays)
  }

  return result
}

export function addDaysToDate(startDate: Date, days: number): Date {
  return addUnitsToDate(startDate, { days })
}

export function subtractDaysFromDate(startDate: Date, days: number): Date {
  return subtractUnitsFromDate(startDate, { days })
}

export function calculateWorkingDays(
  startDate: Date,
  endDate: Date,
  weekendPattern: "sat-sun" | "sun-only" | "fri-sat" = "sat-sun",
  holidays: number = 0
): {
  workingDays: number
  weekendDays: number
  holidays: number
  totalDays: number
  workingDaysPercent: number
} {
  let workingDays = 0
  let weekendDays = 0
  const current = new Date(startDate)

  while (current <= endDate) {
    const day = current.getDay()
    let isWeekend = false

    if (weekendPattern === "sat-sun") {
      isWeekend = day === 0 || day === 6
    } else if (weekendPattern === "sun-only") {
      isWeekend = day === 0
    } else if (weekendPattern === "fri-sat") {
      isWeekend = day === 5 || day === 6
    }

    if (isWeekend) {
      weekendDays++
    } else {
      workingDays++
    }
    current.setDate(current.getDate() + 1)
  }

  // Deduct holidays from working days
  const actualHolidays = Math.min(holidays, workingDays)
  const adjustedWorkingDays = Math.max(0, workingDays - actualHolidays)
  const totalDays = adjustedWorkingDays + weekendDays + actualHolidays
  const workingDaysPercent = totalDays > 0 ? Math.round((adjustedWorkingDays / totalDays) * 100) : 0

  return {
    workingDays: adjustedWorkingDays,
    weekendDays,
    holidays: actualHolidays,
    totalDays,
    workingDaysPercent
  }
}

export function calculateWeeksBetween(
  startDate: Date,
  endDate: Date
): {
  weeks: number
  remainingDays: number
  totalDays: number
  totalHours: number
  totalMonthsDecimal: number
} {
  const diffMs = Math.max(0, endDate.getTime() - startDate.getTime())
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(totalDays / 7)
  const remainingDays = totalDays % 7
  const totalHours = totalDays * 24
  const totalMonthsDecimal = Number((totalDays / 30.4375).toFixed(2))

  return {
    weeks,
    remainingDays,
    totalDays,
    totalHours,
    totalMonthsDecimal
  }
}

export interface TimeDuration {
  hours: number
  minutes: number
  seconds: number
  totalHoursDecimal: number
  totalMinutes: number
  totalSeconds: number
  breakMinutes: number
  netHours: number
  netMinutes: number
  estimatedEarnings?: number
}

export function calculateTimeDuration(
  startTime: string,
  endTime: string,
  breakMinutes: number = 0,
  hourlyRate: number = 0,
  crossMidnight: boolean = false
): TimeDuration {
  const [startH, startM, startS] = startTime.split(':').map(Number)
  const [endH, endM, endS] = endTime.split(':').map(Number)

  const startTotalSeconds = startH * 3600 + startM * 60 + (startS || 0)
  let endTotalSeconds = endH * 3600 + endM * 60 + (endS || 0)

  if (endTotalSeconds < startTotalSeconds || crossMidnight) {
    endTotalSeconds += 24 * 3600
  }

  const diffSeconds = Math.max(0, endTotalSeconds - startTotalSeconds)
  const grossHours = Math.floor(diffSeconds / 3600)
  const grossMinutes = Math.floor((diffSeconds % 3600) / 60)
  const grossSec = diffSeconds % 60

  const netSeconds = Math.max(0, diffSeconds - breakMinutes * 60)
  const netHours = Math.floor(netSeconds / 3600)
  const netMins = Math.floor((netSeconds % 3600) / 60)
  const totalHoursDecimal = Number((netSeconds / 3600).toFixed(2))
  const estimatedEarnings = hourlyRate > 0 ? Number((totalHoursDecimal * hourlyRate).toFixed(2)) : undefined

  return {
    hours: grossHours,
    minutes: grossMinutes,
    seconds: grossSec,
    totalHoursDecimal,
    totalMinutes: Math.floor(diffSeconds / 60),
    totalSeconds: diffSeconds,
    breakMinutes,
    netHours,
    netMinutes: netMins,
    estimatedEarnings
  }
}

export function calculateDoubleAgeMilestone(
  person1Birth: Date,
  person2Birth: Date
): {
  olderPerson: 1 | 2
  milestoneDate: Date
  olderAgeAtMilestone: number
  youngerAgeAtMilestone: number
  isPast: boolean
} {
  const isP1Older = person1Birth <= person2Birth
  const olderBirth = isP1Older ? person1Birth : person2Birth
  const youngerBirth = isP1Older ? person2Birth : person1Birth

  // The age difference in ms:
  const diffMs = youngerBirth.getTime() - olderBirth.getTime()
  // When younger person reaches age == diffMs, older will be 2 * diffMs.
  const milestoneDate = new Date(youngerBirth.getTime() + diffMs)

  const olderAgeAtMilestone = Number(( (2 * diffMs) / (1000 * 60 * 60 * 24 * 365.2425) ).toFixed(1))
  const youngerAgeAtMilestone = Number(( diffMs / (1000 * 60 * 60 * 24 * 365.2425) ).toFixed(1))
  const isPast = new Date() >= milestoneDate

  return {
    olderPerson: isP1Older ? 1 : 2,
    milestoneDate,
    olderAgeAtMilestone,
    youngerAgeAtMilestone,
    isPast
  }
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN')
}
