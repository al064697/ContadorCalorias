/**
 * TIPOS Y ESTRUCTURAS DE DATOS
 * 
 * Este archivo define todas las interfaces y tipos TypeScript de la aplicación.
 * Incluye:
 * - Tipos de usuario (User, Gender, ActivityLevel)
 * - Tipos de alimentos (Food, FoodCategory, FoodEntry)
 * - Tipos de registros (DailyLog)
 * - Tipos de cálculos nutricionales (CalorieGoals)
 * - Tipos de UI (Theme, MotivationalMessage)
 * 
 * Permite desarrollo seguro con TypeScript y autocomplete en el IDE.
 */

// ===== TIPOS DE USUARIO =====

/**
 * Nivel de actividad física del usuario.
 * Se usa para calcular el TDEE (gasto energético total diario).
 */
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'

/**
 * Género del usuario.
 * Afecta la fórmula de cálculo del TMB (metabolismo basal).
 */
export type Gender = 'male' | 'female'

/**
 * Interfaz principal de usuario.
 * Almacena datos personales y preferencias.
 */
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

/**
 * Categorías de alimentos disponibles.
 * Ayuda a organizar la base de datos y filtrar alimentos.
 */
export type FoodCategory = 'fruits' | 'vegetables' | 'proteins' | 'grains' | 'dairy' | 'snacks' | 'beverages' | 'other'

/**
 * Interfaz de alimento.
 * Define la estructura de cada alimento en la base de datos.
 */
export interface Food {
  id: string
  name: string
  calories: number // por 100g o porción estándar
  category: FoodCategory
  servingSize: string // ej: "100g", "1 taza", "1 pieza"
}

// ===== TIPOS DE REGISTRO DIARIO =====

/**
 * Entrada individual de alimento consumido.
 * Representa un alimento agregado al registro del día.
 */
export interface FoodEntry {
  id: string
  foodId: string
  foodName: string
  calories: number
  quantity: number // multiplicador de porciones
  timestamp: string
}

/**
 * Registro diario completo.
 * Almacena todos los alimentos consumidos en un día específico.
 */
export interface DailyLog {
  date: string // formato: YYYY-MM-DD
  userId: string
  entries: FoodEntry[]
  totalCalories: number
  targetCalories: number
  notes?: string
}

// ===== CÁLCULOS NUTRICIONALES =====

/**
 * Metas calóricas calculadas para el usuario.
 * Incluye diferentes escenarios (mantenimiento, déficit, superávit).
 */
export interface CalorieGoals {
  bmr: number // Tasa Metabólica Basal (calorías en reposo)
  tdee: number // Gasto Energético Total Diario
  deficit?: number // Calorías para perder peso
  surplus?: number // Calorías para ganar peso
}

// ===== UI/UX =====

/**
 * Tema visual de la aplicación.
 */
export type Theme = 'light' | 'dark'

/**
 * Mensaje motivacional según progreso.
 * Se muestra en el dashboard según el porcentaje de meta cumplida.
 */
export interface MotivationalMessage {
  type: 'excellent' | 'over' | 'under'
  message: string
  emoji: string
}
