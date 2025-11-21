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
export type FoodCategory = 
  | 'fruits' 
  | 'vegetables' 
  | 'proteins' 
  | 'grains' 
  | 'dairy' 
  | 'snacks' 
  | 'beverages' 
  | 'legumes'
  | 'healthy-fats'
  | 'high-calorie-avoid'
  | 'free-foods'
  | 'other'

/**
 * Nivel de semáforo nutricional según la guía.
 * Verde: consumo libre, Amarillo: moderado, Rojo: evitar
 */
export type TrafficLight = 'green' | 'yellow' | 'red'

/**
 * Tipo de grasa del alimento.
 */
export type FatType = 'monounsaturated' | 'polyunsaturated' | 'saturated' | 'trans' | 'mixed'

/**
 * Interfaz de alimento con información nutricional completa.
 * Define la estructura de cada alimento en la base de datos.
 */
export interface Food {
  id: string
  name: string
  calories: number // por porción estándar
  carbs: number // gramos de carbohidratos
  protein: number // gramos de proteína
  fat: number // gramos de grasa
  fiber?: number // gramos de fibra (opcional)
  category: FoodCategory
  servingSize: string // ej: "100g", "1 taza", "1 pieza"
  trafficLight: TrafficLight // semáforo nutricional
  fatType?: FatType // tipo de grasa predominante (opcional)
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
  carbs: number // gramos de carbohidratos
  protein: number // gramos de proteína
  fat: number // gramos de grasa
  quantity: number // multiplicador de porciones
  timestamp: string
  trafficLight: TrafficLight // semáforo del alimento
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
  totalCarbs: number // total carbohidratos del día
  totalProtein: number // total proteína del día
  totalFat: number // total grasa del día
  targetCalories: number
  targetCarbs: number // meta de carbohidratos
  targetProtein: number // meta de proteína
  targetFat: number // meta de grasa
  notes?: string
}

// ===== CÁLCULOS NUTRICIONALES =====

/**
 * Categoría de peso según IMC.
 */
export type WeightCategory = 'underweight' | 'normal' | 'overweight' | 'obese'

/**
 * Metas calóricas y nutricionales calculadas para el usuario.
 * Incluye diferentes escenarios (mantenimiento, déficit, superávit).
 */
export interface CalorieGoals {
  bmr: number // Tasa Metabólica Basal (calorías en reposo)
  tdee: number // Gasto Energético Total Diario
  deficit?: number // Calorías para perder peso
  surplus?: number // Calorías para ganar peso
  imc: number // Índice de Masa Corporal
  weightCategory: WeightCategory // Categoría de peso
  // Distribución de macronutrientes (basada en TDEE)
  carbs: number // gramos de carbohidratos (50-55% de calorías)
  protein: number // gramos de proteína (15-20% de calorías)
  fat: number // gramos de grasa (25-30% de calorías)
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
