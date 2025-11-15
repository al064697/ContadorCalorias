/**
 * FUNCIONES UTILITARIAS - CÁLCULOS NUTRICIONALES
 * 
 * Este módulo contiene todas las funciones relacionadas con cálculos de calorías y nutrición:
 * - TMB (Tasa Metabólica Basal): calorías que el cuerpo quema en reposo
 * - TDEE (Gasto Energético Total Diario): calorías totales según actividad
 * - Metas calóricas: para mantener, perder o ganar peso
 * - Mensajes motivacionales según progreso
 * - Funciones auxiliares (formateo, generación de IDs)
 * 
 * Usa la ecuación de Harris-Benedict para cálculo del TMB.
 */

import { Gender, ActivityLevel, CalorieGoals } from '../types'
import { ACTIVITY_MULTIPLIERS } from './constants'

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
 * 
 * @param weight - Peso en kg
 * @param height - Altura en cm
 * @param age - Edad en años
 * @param gender - Género
 * @param activityLevel - Nivel de actividad
 * @returns Objeto con todas las metas calóricas
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
    deficit: Math.round(tdee * 0.85), // 15% de déficit para pérdida de peso
    surplus: Math.round(tdee * 1.15)  // 15% de superávit para ganancia de peso
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
