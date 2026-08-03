/**
 * Calculates BMI (Body Mass Index)
 * @param weight Weight in kilograms
 * @param height Height in centimeters
 * @returns BMI score and category
 */
export function calculateBMI(weight: number, height: number): { score: number; category: string } {
  if (weight <= 0 || height <= 0) return { score: 0, category: "Invalid" };
  
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";
  
  return { score: bmi, category };
}

/**
 * Calculates BMR (Basal Metabolic Rate) using the Mifflin-St Jeor Equation
 * @param weight Weight in kilograms
 * @param height Height in centimeters
 * @param age Age in years
 * @param gender 'male' or 'female'
 * @returns BMR in calories per day
 */
export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (weight <= 0 || height <= 0 || age <= 0) return 0;
  
  // Mifflin-St Jeor Equation
  const base = (10 * weight) + (6.25 * height) - (5 * age);
  
  if (gender === 'male') {
    return base + 5;
  } else {
    return base - 161;
  }
}

/**
 * Activity level multipliers
 */
export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2, // Little or no exercise
  light: 1.375,   // Light exercise/sports 1-3 days/week
  moderate: 1.55, // Moderate exercise/sports 3-5 days/week
  active: 1.725,  // Hard exercise/sports 6-7 days a week
  veryActive: 1.9 // Very hard exercise/sports & physical job or 2x training
};

/**
 * Goal adjustments (Calories to add/subtract)
 */
export const GOAL_ADJUSTMENTS = {
  loseFast: -500, // Lose ~0.5kg per week
  loseSlow: -250, // Lose ~0.25kg per week
  maintain: 0,
  gainSlow: 250,  // Gain ~0.25kg per week
  gainFast: 500   // Gain ~0.5kg per week
};

/**
 * Calculates daily caloric needs based on BMR, activity level, and goal
 */
export function calculateDailyCalories(
  bmr: number, 
  activityLevel: keyof typeof ACTIVITY_MULTIPLIERS, 
  goal: keyof typeof GOAL_ADJUSTMENTS
): number {
  const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];
  const targetCalories = tdee + GOAL_ADJUSTMENTS[goal];
  
  // Safety check: Never recommend below 1200 calories for women or 1500 for men generally,
  // but as a simple generic safeguard:
  return Math.max(targetCalories, 1200); 
}

/**
 * Calculates Body Fat Percentage using the U.S. Navy Method (Metric)
 * @param gender 'male' or 'female'
 * @param height Height in centimeters
 * @param neck Neck circumference in centimeters
 * @param waist Waist circumference in centimeters
 * @param hip Hip circumference in centimeters (required for females)
 * @returns Body fat percentage
 */
export function calculateBodyFat(
  gender: 'male' | 'female',
  height: number,
  neck: number,
  waist: number,
  hip: number = 0
): { percentage: number; category: string } {
  if (height <= 0 || neck <= 0 || waist <= 0 || (gender === 'female' && hip <= 0)) {
    return { percentage: 0, category: "Invalid" };
  }

  let bodyFat = 0;
  if (gender === 'male') {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }

  // Cap the values to reasonable limits
  bodyFat = Math.max(1, Math.min(bodyFat, 80));

  let category = "";
  if (gender === 'male') {
    if (bodyFat < 6) category = "Essential fat";
    else if (bodyFat < 14) category = "Athletes";
    else if (bodyFat < 18) category = "Fitness";
    else if (bodyFat < 25) category = "Average";
    else category = "Obese";
  } else {
    if (bodyFat < 14) category = "Essential fat";
    else if (bodyFat < 21) category = "Athletes";
    else if (bodyFat < 25) category = "Fitness";
    else if (bodyFat < 32) category = "Average";
    else category = "Obese";
  }

  return { percentage: bodyFat, category };
}

/**
 * Calculates Ideal Weight using the Devine formula
 * @param gender 'male' or 'female'
 * @param height Height in centimeters
 * @returns Ideal weight in kilograms
 */
export function calculateIdealWeight(gender: 'male' | 'female', height: number): number {
  if (height <= 0) return 0;

  // Devine Formula
  // Male: 50.0 kg + 2.3 kg per inch over 5 feet
  // Female: 45.5 kg + 2.3 kg per inch over 5 feet
  // 5 feet = 152.4 cm, 1 inch = 2.54 cm
  
  const inchesOver5Feet = (height - 152.4) / 2.54;
  
  if (inchesOver5Feet < 0) {
    // For heights under 5 feet, adjust proportionally
    return gender === 'male' ? 50.0 - (Math.abs(inchesOver5Feet) * 2.3) : 45.5 - (Math.abs(inchesOver5Feet) * 2.3);
  }

  let idealWeight = 0;
  if (gender === 'male') {
    idealWeight = 50.0 + (2.3 * inchesOver5Feet);
  } else {
    idealWeight = 45.5 + (2.3 * inchesOver5Feet);
  }

  return Math.max(1, idealWeight);
}

/**
 * Calculates Daily Water Intake
 * @param weight Weight in kilograms
 * @param activity Activity level (sedentary, light, moderate, active, veryActive)
 * @param climate Climate (normal, hot)
 * @returns Water intake in liters
 */
export function calculateWaterIntake(
  weight: number,
  activity: keyof typeof ACTIVITY_MULTIPLIERS,
  climate: 'normal' | 'hot'
): number {
  if (weight <= 0) return 0;

  // Base requirement: 33ml per kg of body weight
  let waterLiters = (weight * 33) / 1000;

  // Adjust for activity level (add 350ml per step of activity above sedentary)
  const activityLevels = ['sedentary', 'light', 'moderate', 'active', 'veryActive'];
  const activityIndex = activityLevels.indexOf(activity);
  if (activityIndex > 0) {
    waterLiters += (activityIndex * 0.35); // 0.35L extra per level
  }

  // Adjust for climate
  if (climate === 'hot') {
    waterLiters += 0.5; // Extra 500ml for hot climate
  }

  return waterLiters;
}
