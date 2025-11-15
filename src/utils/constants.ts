/**
 * CONSTANTES DE LA APLICACIÓN
 * 
 * Este archivo contiene todas las constantes usadas en la aplicación:
 * - Multiplicadores de actividad física para cálculo del TDEE
 * - Etiquetas legibles de niveles de actividad
 * - Etiquetas de categorías de alimentos con emojis
 */

import { ActivityLevel } from '../types'

/**
 * Multiplicadores de nivel de actividad para calcular TDEE.
 * Se multiplican por el TMB para obtener el gasto energético total.
 * 
 * Basados en la ecuación de Harris-Benedict:
 * - Sedentario: poco o ningún ejercicio
 * - Ligero: ejercicio ligero 1-3 días/semana
 * - Moderado: ejercicio moderado 3-5 días/semana
 * - Activo: ejercicio intenso 6-7 días/semana
 * - Muy activo: ejercicio muy intenso, trabajo físico
 */
export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  'sedentary': 1.2,       // Poco o ningún ejercicio
  'light': 1.375,         // Ejercicio ligero 1-3 días/semana
  'moderate': 1.55,       // Ejercicio moderado 3-5 días/semana
  'active': 1.725,        // Ejercicio intenso 6-7 días/semana
  'very-active': 1.9      // Ejercicio muy intenso, trabajo físico
}

/**
 * Etiquetas descriptivas de niveles de actividad.
 * Se muestran en el formulario de registro y perfil del usuario.
 */
export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  'sedentary': 'Sedentario (poco o ningún ejercicio)',
  'light': 'Ligero (ejercicio 1-3 días/semana)',
  'moderate': 'Moderado (ejercicio 3-5 días/semana)',
  'active': 'Activo (ejercicio 6-7 días/semana)',
  'very-active': 'Muy activo (ejercicio intenso diario)'
}

/**
 * Etiquetas con emojis para categorías de alimentos.
 * Se usan para organizar y filtrar la base de datos de alimentos.
 */
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
