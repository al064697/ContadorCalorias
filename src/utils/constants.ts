import { ActivityLevel } from '../types'

// Activity level multipliers for TDEE calculation
export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  'sedentary': 1.2,       // Little or no exercise
  'light': 1.375,         // Light exercise 1-3 days/week
  'moderate': 1.55,       // Moderate exercise 3-5 days/week
  'active': 1.725,        // Heavy exercise 6-7 days/week
  'very-active': 1.9      // Very heavy exercise, physical job
}

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  'sedentary': 'Sedentario (poco o ningún ejercicio)',
  'light': 'Ligero (ejercicio 1-3 días/semana)',
  'moderate': 'Moderado (ejercicio 3-5 días/semana)',
  'active': 'Activo (ejercicio 6-7 días/semana)',
  'very-active': 'Muy activo (ejercicio intenso diario)'
}

export const CATEGORY_LABELS = {
  'fruits': '🍎 Frutas',
  'vegetables': '🥗 Verduras',
  'proteins': '🍗 Proteínas',
  'grains': '🌾 Granos',
  'dairy': '🥛 Lácteos',
  'snacks': '🍪 Snacks',
  'beverages': '🥤 Bebidas',
  'other': '🍽️ Otros'
}
