/**
 * HOOK PERSONALIZADO - CALCULADORA DE CALORÍAS
 * 
 * Hook que calcula automáticamente las metas calóricas del usuario.
 * 
 * Calcula:
 * - TMB (Tasa Metabólica Basal): calorías en reposo
 * - TDEE (Gasto Energético Total): calorías según actividad
 * - Déficit: calorías para perder peso
 * - Superávit: calorías para ganar peso
 * 
 * Usa useMemo para evitar recalcular innecesariamente.
 * Solo recalcula cuando los datos del usuario cambian.
 * 
 * @param user - Usuario actual o null
 * @returns Objeto CalorieGoals o null si no hay usuario
 */

import { useMemo } from 'react'
import { User, CalorieGoals } from '../types'
import { getCalorieGoals } from '../utils/calculations'

export function useCaloriesCalculator(user: User | null): CalorieGoals | null {
  return useMemo(() => {
    if (!user) return null
    
    return getCalorieGoals(
      user.weight,
      user.height,
      user.age,
      user.gender,
      user.activityLevel
    )
  }, [user])
}
