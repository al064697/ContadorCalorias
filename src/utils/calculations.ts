/**
 * FUNCIONES UTILITARIAS - CÁLCULOS NUTRICIONALES
 * 
 * Este módulo contiene todas las funciones relacionadas con cálculos de calorías y nutrición:
 * - TMB (Tasa Metabólica Basal): calorías que el cuerpo quema en reposo
 * - TDEE (Gasto Energético Total Diario): calorías totales según actividad
 * - IMC (Índice de Masa Corporal): clasificación de peso
 * - Metas calóricas: para mantener, perder o ganar peso
 * - Macronutrientes: distribución de carbohidratos, proteínas y grasas
 * - Mensajes motivacionales según progreso
 * - Funciones auxiliares (formateo, generación de IDs)
 * 
 * Usa la ecuación de Harris-Benedict para cálculo del TMB.
 */

import { Gender, ActivityLevel, CalorieGoals, WeightCategory } from '../types'
import { ACTIVITY_MULTIPLIERS, IMC_RANGES } from './constants'

/**
 * FUNCIÓN DESTACADA: Cálculo del Índice de Masa Corporal (IMC/BMI)
 * 
 * El IMC es un indicador clave de salud nutricional usado mundialmente.
 * Fórmula estándar de la OMS: IMC = peso (kg) / altura (m)²
 * 
 * PROCESO DE CÁLCULO:
 * 1. Convertir altura de cm a metros (ej: 170cm → 1.70m)
 * 2. Elevar altura al cuadrado (1.70² = 2.89)
 * 3. Dividir peso entre altura² (70kg / 2.89 = 24.2)
 * 4. Redondear a un decimal para precisión médica
 * 
 * INTERPRETACIÓN:
 * - < 18.5: Bajo peso
 * - 18.5-24.9: Peso normal
 * - 25-29.9: Sobrepeso
 * - ≥ 30: Obesidad
 * 
 * @param weight - Peso en kilogramos (ej: 70)
 * @param height - Altura en centímetros (ej: 170)
 * @returns IMC redondeado a un decimal (ej: 24.2)
 * 
 * Ejemplo: calculateIMC(70, 170) → 24.2 (peso normal)
 */
export function calculateIMC(weight: number, height: number): number {
  // Convertir altura de centímetros a metros
  const heightInMeters = height / 100
  
  // Aplicar fórmula IMC y redondear a 1 decimal
  // Multiplicar por 10, redondear, dividir por 10 = 1 decimal de precisión
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10
}

/**
 * Determina la categoría de peso según el IMC.
 * 
 * Rangos según OMS:
 * - Bajo peso: < 18.5
 * - Normal: 18.5 - 24.9
 * - Sobrepeso: 25 - 29.9
 * - Obesidad: ≥ 30
 * 
 * @param imc - Índice de Masa Corporal
 * @returns Categoría de peso
 */
export function getWeightCategory(imc: number): WeightCategory {
  if (imc < IMC_RANGES.underweight.max) {
    return 'underweight'
  } else if (imc < IMC_RANGES.normal.max) {
    return 'normal'
  } else if (imc < IMC_RANGES.overweight.max) {
    return 'overweight'
  } else {
    return 'obese'
  }
}

/**
 * FUNCIÓN DESTACADA: Cálculo de distribución de macronutrientes
 * 
 * Esta función implementa las recomendaciones nutricionales oficiales para
 * una dieta balanceada según la Guía de Alimentos para la Población Mexicana.
 * 
 * DISTRIBUCIÓN ESTÁNDAR DE MACRONUTRIENTES:
 * - Carbohidratos: 55% de calorías totales (4 kcal/g)
 * - Proteínas: 20% de calorías totales (4 kcal/g)
 * - Grasas: 25% de calorías totales (9 kcal/g)
 * 
 * CONVERSIÓN DE CALORÍAS A GRAMOS:
 * Cada macronutriente tiene un valor calórico diferente:
 * - 1g de carbohidratos = 4 kcal
 * - 1g de proteína = 4 kcal
 * - 1g de grasa = 9 kcal (más del doble que carbos/proteína)
 * 
 * EJEMPLO DE CÁLCULO para 2000 kcal:
 * Carbohidratos: (2000 * 0.55) / 4 = 275g
 * Proteínas: (2000 * 0.20) / 4 = 100g
 * Grasas: (2000 * 0.25) / 9 = 55.5g ≈ 56g
 * 
 * @param totalCalories - Calorías totales diarias (ej: 2000)
 * @returns Objeto con gramos objetivo de cada macronutriente
 */
export function calculateMacroTargets(totalCalories: number): {
  carbs: number
  protein: number
  fat: number
} {
  // Carbohidratos: 55% de calorías totales / 4 kcal por gramo
  // Ejemplo: (2000 * 0.55) / 4 = 275g de carbohidratos
  const carbs = Math.round((totalCalories * 0.55) / 4)
  
  // Proteínas: 20% de calorías totales / 4 kcal por gramo
  // Ejemplo: (2000 * 0.20) / 4 = 100g de proteína
  const protein = Math.round((totalCalories * 0.20) / 4)
  
  // Grasas: 25% de calorías totales / 9 kcal por gramo
  // Ejemplo: (2000 * 0.25) / 9 = 56g de grasa
  // Nota: Las grasas tienen más del doble de calorías por gramo
  const fat = Math.round((totalCalories * 0.25) / 9)
  
  return { carbs, protein, fat }
}

/**
 * Calcula el porcentaje de cada macronutriente del total de calorías.
 * 
 * @param carbs - Gramos de carbohidratos
 * @param protein - Gramos de proteínas
 * @param fat - Gramos de grasas
 * @returns Objeto con porcentaje de cada macro
 */
export function getMacroDistribution(
  carbs: number,
  protein: number,
  fat: number
): {
  carbsPercent: number
  proteinPercent: number
  fatPercent: number
} {
  const totalCalories = (carbs * 4) + (protein * 4) + (fat * 9)
  
  return {
    carbsPercent: Math.round(((carbs * 4) / totalCalories) * 100),
    proteinPercent: Math.round(((protein * 4) / totalCalories) * 100),
    fatPercent: Math.round(((fat * 9) / totalCalories) * 100)
  }
}

/**
 * Calcula la Tasa Metabólica Basal (TMB/BMR) usando la ecuación de Harris-Benedict.
 * 
 * Fórmulas:
 * - Hombres: TMB = 88.362 + (13.397 × peso en kg) + (4.799 × altura en cm) - (5.677 × edad)
 * - Mujeres: TMB = 447.593 + (9.247 × peso en kg) + (3.098 × altura en cm) - (4.330 × edad)
 * 
 * @param weight - Peso en kilogramos
 * @param height - Altura en centímetros
 * @param age - Edad en años
 * @param gender - Género ('male' o 'female')
 * @returns TMB en kilocalorías
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
 * Calcula el Gasto Energético Total Diario (TDEE/Total Daily Energy Expenditure).
 * 
 * El TDEE es el TMB multiplicado por un factor según nivel de actividad física.
 * Representa las calorías totales que una persona quema en un día normal.
 * 
 * @param bmr - Tasa Metabólica Basal
 * @param activityLevel - Nivel de actividad física del usuario
 * @returns TDEE en kilocalorías
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel]
}

/**
 * Calcula todas las metas calóricas del usuario.
 * 
 * Incluye:
 * - TMB: calorías en reposo absoluto
 * - TDEE: calorías para mantener peso actual
 * - Déficit (85% del TDEE): calorías para perder peso
 * - Superávit (115% del TDEE): calorías para ganar peso
 * - IMC: índice de masa corporal
 * - Categoría de peso según IMC
 * - Macronutrientes: distribución de carbos, proteínas y grasas en gramos
 * 
 * @param weight - Peso en kg
 * @param height - Altura en cm
 * @param age - Edad en años
 * @param gender - Género
 * @param activityLevel - Nivel de actividad
 * @returns Objeto con todas las metas calóricas y nutricionales
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
  const imc = calculateIMC(weight, height)
  const weightCategory = getWeightCategory(imc)
  const macros = calculateMacroTargets(tdee)
  
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    deficit: Math.round(tdee * 0.85), // 15% de déficit para pérdida de peso
    surplus: Math.round(tdee * 1.15), // 15% de superávit para ganancia de peso
    imc,
    weightCategory,
    carbs: macros.carbs,
    protein: macros.protein,
    fat: macros.fat
  }
}

/**
 * Calcula el porcentaje de meta diaria cumplida.
 * 
 * @param consumed - Calorías consumidas
 * @param target - Calorías meta
 * @returns Porcentaje redondeado (0-100+)
 */
export function getProgressPercentage(consumed: number, target: number): number {
  return Math.round((consumed / target) * 100)
}

/**
 * Genera un mensaje motivacional según el consumo de calorías.
 * 
 * Rangos:
 * - 90-110% de la meta: Excelente, en rango óptimo
 * - Más de 110%: Sobrepasaste la meta
 * - Menos de 90%: Necesitas consumir más
 * 
 * @param consumed - Calorías consumidas
 * @param target - Calorías meta
 * @returns Objeto con tipo, mensaje y emoji
 */
export function getMotivationalMessage(consumed: number, target: number) {
  const percentage = (consumed / target) * 100
  
  if (percentage >= 90 && percentage <= 110) {
    return {
      type: 'excellent' as const,
      message: '¡Excelente! Vas por buen camino',
      emoji: ''
    }
  } else if (percentage > 110) {
    return {
      type: 'over' as const,
      message: 'Te pasaste un poco, ¡mañana lo harás mejor!',
      emoji: ''
    }
  } else {
    return {
      type: 'under' as const,
      message: '¡Necesitas más energía! Come algo nutritivo',
      emoji: ''
    }
  }
}

/**
 * Formatea calorías con unidades apropiadas.
 * 
 * @param calories - Número de calorías
 * @returns String formateado (ej: "2,500 kcal")
 */
export function formatCalories(calories: number): string {
  return `${calories.toLocaleString()} kcal`
}

/**
 * Genera un ID único basado en timestamp y random.
 * Útil para crear IDs de alimentos, entradas, etc.
 * 
 * @returns String único (ej: "1699123456789-abc123")
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
