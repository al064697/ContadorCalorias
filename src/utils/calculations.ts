import { Gender, ActivityLevel, CalorieGoals } from '../types'
import { ACTIVITY_MULTIPLIERS } from './constants'

/**
 * Calculate Basal Metabolic Rate (BMR) using Harris-Benedict equation
 * Men: BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age)
 * Women: BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age)
 */
export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: Gender
): number {
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
  }
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * TDEE = BMR × Activity Level Multiplier
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel]
}

/**
 * Get complete calorie goals for a user
 */
export function getCalorieGoals(
  weight: number,
  height: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel
): CalorieGoals {
  const bmr = calculateBMR(weight, height, age, gender)
  const tdee = calculateTDEE(bmr, activityLevel)
  
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    deficit: Math.round(tdee * 0.85), // 15% deficit for weight loss
    surplus: Math.round(tdee * 1.15)  // 15% surplus for weight gain
  }
}

/**
 * Calculate percentage of daily goal achieved
 */
export function getProgressPercentage(consumed: number, target: number): number {
  return Math.round((consumed / target) * 100)
}

/**
 * Get motivational message based on calorie consumption
 */
export function getMotivationalMessage(consumed: number, target: number) {
  const percentage = (consumed / target) * 100
  
  if (percentage >= 90 && percentage <= 110) {
    return {
      type: 'excellent' as const,
      message: '¡Excelente! Vas por buen camino 💪',
      emoji: '🎯'
    }
  } else if (percentage > 110) {
    return {
      type: 'over' as const,
      message: 'Te pasaste un poco, ¡mañana lo harás mejor! 😅',
      emoji: '📈'
    }
  } else {
    return {
      type: 'under' as const,
      message: '¡Necesitas más energía! Come algo nutritivo 🍎',
      emoji: '📉'
    }
  }
}

/**
 * Format calories with proper units
 */
export function formatCalories(calories: number): string {
  return `${calories.toLocaleString()} kcal`
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
