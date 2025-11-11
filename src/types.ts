// ===== TIPOS DE USUARIO =====
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'

export type Gender = 'male' | 'female'

export interface User {
  id: string
  name: string
  email: string
  age: number
  weight: number // kg
  height: number // cm
  gender: Gender
  activityLevel: ActivityLevel
  createdAt: string
}

// ===== TIPOS DE ALIMENTOS =====
export type FoodCategory = 'fruits' | 'vegetables' | 'proteins' | 'grains' | 'dairy' | 'snacks' | 'beverages' | 'other'

export interface Food {
  id: string
  name: string
  calories: number // per 100g or standard serving
  category: FoodCategory
  servingSize: string // e.g., "100g", "1 cup", "1 piece"
}

// ===== TIPOS DE REGISTRO DIARIO =====
export interface FoodEntry {
  id: string
  foodId: string
  foodName: string
  calories: number
  quantity: number // multiplier for servings
  timestamp: string
}

export interface DailyLog {
  date: string // YYYY-MM-DD
  userId: string
  entries: FoodEntry[]
  totalCalories: number
  targetCalories: number
  notes?: string
}

// ===== CÁLCULOS NUTRICIONALES =====
export interface CalorieGoals {
  bmr: number // Basal Metabolic Rate
  tdee: number // Total Daily Energy Expenditure
  deficit?: number
  surplus?: number
}

// ===== UI/UX =====
export type Theme = 'light' | 'dark'

export interface MotivationalMessage {
  type: 'excellent' | 'over' | 'under'
  message: string
  emoji: string
}
