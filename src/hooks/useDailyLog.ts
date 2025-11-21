/**
 * HOOKS PERSONALIZADOS - REGISTRO DIARIO DE ALIMENTOS
 * 
 * Este módulo contiene dos hooks:
 * 
 * 1. useDailyLog: Gestiona el registro de alimentos del día actual
 *    - Carga automáticamente el registro del día
 *    - Permite agregar alimentos
 *    - Permite eliminar alimentos
 *    - Persiste en localStorage
 * 
 * 2. useHistoricalLogs: Obtiene registros de días anteriores
 *    - Recupera logs de los últimos N días
 *    - Ordena por fecha descendente
 *    - Útil para gráficas y estadísticas
 */

import { useState, useEffect } from 'react'
import { DailyLog, FoodEntry } from '../types'
import { format } from 'date-fns'

/**
 * Hook para gestionar el registro diario de alimentos.
 * 
 * Funcionalidades:
 * - Carga el registro del día actual al montar
 * - Crea nuevo registro si no existe para hoy
 * - Permite agregar entradas de alimentos
 * - Permite eliminar entradas
 * - Actualiza totalCalories y macronutrientes automáticamente
 * - Persiste cambios en localStorage
 * 
 * @param userId - ID del usuario actual
 * @param targetCalories - Meta de calorías diarias
 * @param targetMacros - Meta de macronutrientes (opcional)
 * @returns Objeto con todayLog, addEntry, removeEntry
 */
export function useDailyLog(
  userId: string | undefined, 
  targetCalories: number,
  targetMacros?: { carbs: number; protein: number; fat: number }
) {
  const [todayLog, setTodayLog] = useState<DailyLog | null>(null)
  const today = format(new Date(), 'yyyy-MM-dd')

  // Al montar o cambiar usuario, cargar registro del día
  useEffect(() => {
    if (!userId) return

    // Cargar registro de hoy desde localStorage
    const logsData = localStorage.getItem('dailyLogs')
    const allLogs: DailyLog[] = logsData ? JSON.parse(logsData) : []
    
    const existingLog = allLogs.find(log => log.date === today && log.userId === userId)
    
    if (existingLog) {
      setTodayLog(existingLog)
    } else {
      // Crear nuevo registro para hoy
      const newLog: DailyLog = {
        date: today,
        userId,
        entries: [],
        totalCalories: 0,
        totalCarbs: 0,
        totalProtein: 0,
        totalFat: 0,
        targetCalories,
        targetCarbs: targetMacros?.carbs || 0,
        targetProtein: targetMacros?.protein || 0,
        targetFat: targetMacros?.fat || 0
      }
      setTodayLog(newLog)
    }
  }, [userId, today, targetCalories, targetMacros])

  /**
   * Agrega una nueva entrada de alimento al registro.
   * Actualiza el total de calorías y macronutrientes automáticamente.
   */
  const addEntry = (entry: FoodEntry) => {
    if (!todayLog || !userId) return

    const updatedLog: DailyLog = {
      ...todayLog,
      entries: [...todayLog.entries, entry],
      totalCalories: todayLog.totalCalories + entry.calories,
      totalCarbs: todayLog.totalCarbs + entry.carbs,
      totalProtein: todayLog.totalProtein + entry.protein,
      totalFat: todayLog.totalFat + entry.fat
    }

    setTodayLog(updatedLog)
    saveLogs(updatedLog)
  }

  /**
   * Elimina una entrada de alimento del registro.
   * Actualiza el total de calorías y macronutrientes automáticamente.
   */
  const removeEntry = (entryId: string) => {
    if (!todayLog) return

    const removedEntry = todayLog.entries.find(e => e.id === entryId)
    if (!removedEntry) return

    const updatedLog: DailyLog = {
      ...todayLog,
      entries: todayLog.entries.filter(e => e.id !== entryId),
      totalCalories: todayLog.totalCalories - removedEntry.calories,
      totalCarbs: todayLog.totalCarbs - removedEntry.carbs,
      totalProtein: todayLog.totalProtein - removedEntry.protein,
      totalFat: todayLog.totalFat - removedEntry.fat
    }

    setTodayLog(updatedLog)
    saveLogs(updatedLog)
  }

  /**
   * Guarda el registro en localStorage.
   * Actualiza el registro existente o crea uno nuevo.
   */
  const saveLogs = (log: DailyLog) => {
    const logsData = localStorage.getItem('dailyLogs')
    const allLogs: DailyLog[] = logsData ? JSON.parse(logsData) : []
    
    const existingIndex = allLogs.findIndex(l => l.date === log.date && l.userId === log.userId)
    
    if (existingIndex >= 0) {
      allLogs[existingIndex] = log
    } else {
      allLogs.push(log)
    }
    
    localStorage.setItem('dailyLogs', JSON.stringify(allLogs))
  }

  return {
    todayLog,
    addEntry,
    removeEntry
  }
}

/**
 * Hook para obtener registros históricos del usuario.
 * 
 * Recupera los últimos N días de registros del usuario,
 * ordenados por fecha descendente (más reciente primero).
 * 
 * Útil para:
 * - Mostrar gráficas de progreso
 * - Análisis de tendencias
 * - Página de historial
 * 
 * @param userId - ID del usuario actual
 * @param days - Número de días a recuperar (default: 7)
 * @returns Array de DailyLog ordenado por fecha
 */
export function useHistoricalLogs(userId: string | undefined, days: number = 7) {
  const [logs, setLogs] = useState<DailyLog[]>([])

  useEffect(() => {
    if (!userId) return

    const logsData = localStorage.getItem('dailyLogs')
    const allLogs: DailyLog[] = logsData ? JSON.parse(logsData) : []
    
    // Filtrar logs de este usuario y ordenar por fecha
    const userLogs = allLogs
      .filter(log => log.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, days)
    
    setLogs(userLogs)
  }, [userId, days])

  return logs
}
