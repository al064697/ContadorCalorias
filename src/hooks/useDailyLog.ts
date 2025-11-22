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

  /**
   * EFECTO DESTACADO: Inicialización y carga del registro diario
   * 
   * Este efecto es fundamental para la persistencia de datos en la aplicación.
   * Se ejecuta cuando:
   * - El componente se monta por primera vez
   * - Cambia el usuario (userId)
   * - Cambia la fecha (today)
   * - Cambian las metas calóricas o de macros
   * 
   * FLUJO DE DATOS:
   * 1. Lee todos los registros de localStorage (JSON)
   * 2. Busca el registro del día actual para el usuario activo
   * 3. Si existe: lo carga en el estado
   * 4. Si NO existe: crea uno nuevo con valores iniciales en 0
   * 
   * ESTRUCTURA DE DATOS EN localStorage:
   * 'dailyLogs' = [
   *   { date: '2025-11-21', userId: '123', entries: [...], totalCalories: 1500, ... },
   *   { date: '2025-11-20', userId: '123', entries: [...], totalCalories: 1800, ... },
   *   ...
   * ]
   * 
   * NOTA IMPORTANTE: localStorage persiste datos solo en el navegador actual.
   * Para sincronización multi-dispositivo se necesitaría un backend.
   */
  useEffect(() => {
    if (!userId) return

    // Cargar registro de hoy desde localStorage
    const logsData = localStorage.getItem('dailyLogs')
    const allLogs: DailyLog[] = logsData ? JSON.parse(logsData) : []
    
    // Buscar si ya existe un registro para hoy y este usuario
    const existingLog = allLogs.find(log => log.date === today && log.userId === userId)
    
    if (existingLog) {
      // Cargar registro existente
      setTodayLog(existingLog)
    } else {
      // Crear nuevo registro para hoy con valores iniciales
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
   * FUNCIÓN DESTACADA: Agregar entrada de alimento al registro
   * 
   * Esta función es el corazón del tracking nutricional.
   * Gestiona la lógica completa de registro de alimentos.
   * 
   * PROCESO:
   * 1. Valida que exista registro y usuario
   * 2. Crea nuevo objeto de log con:
   *    - Todas las entradas anteriores (spread operator)
   *    - La nueva entrada agregada
   *    - Totales actualizados SUMANDO los valores de la nueva entrada
   * 3. Actualiza el estado local (React)
   * 4. Persiste en localStorage (para no perder datos al recargar)
   * 
   * ACUMULACIÓN DE TOTALES:
   * - totalCalories: suma todas las calorías consumidas
   * - totalCarbs: suma todos los carbohidratos
   * - totalProtein: suma todas las proteínas
   * - totalFat: suma todas las grasas
   * 
   * EJEMPLO:
   * Estado anterior: { totalCalories: 1200, totalCarbs: 150, ... }
   * Nueva entrada: { calories: 300, carbs: 40, protein: 20, fat: 10 }
   * Estado nuevo: { totalCalories: 1500, totalCarbs: 190, ... }
   * 
   * @param entry - Objeto FoodEntry con toda la info nutricional
   */
  const addEntry = (entry: FoodEntry) => {
    if (!todayLog || !userId) return

    // Crear nuevo log con la entrada agregada y totales actualizados
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
   * FUNCIÓN DESTACADA: Eliminar entrada de alimento del registro
   * 
   * Esta función gestiona la eliminación segura de alimentos registrados.
   * Es importante para corregir errores del usuario.
   * 
   * PROCESO:
   * 1. Busca la entrada a eliminar por ID
   * 2. Valida que exista (protección contra errores)
   * 3. Crea nuevo log:
   *    - Filtra entries para excluir el eliminado
   *    - RESTA los valores nutricionales del total
   * 4. Actualiza estado y localStorage
   * 
   * DESCUENTO DE TOTALES:
   * Es crucial RESTAR (no sumar) los valores de la entrada eliminada.
   * 
   * EJEMPLO:
   * Estado actual: { totalCalories: 1500, totalCarbs: 190, ... }
   * Eliminar: { calories: 300, carbs: 40, protein: 20, fat: 10 }
   * Estado nuevo: { totalCalories: 1200, totalCarbs: 150, ... }
   * 
   * PROTECCIÓN: Si la entrada no existe, la función termina sin hacer cambios.
   * 
   * @param entryId - ID único de la entrada a eliminar
   */
  const removeEntry = (entryId: string) => {
    if (!todayLog) return

    // Buscar la entrada que se va a eliminar
    const removedEntry = todayLog.entries.find(e => e.id === entryId)
    if (!removedEntry) return // Protección: si no existe, no hacer nada

    // Crear nuevo log sin la entrada eliminada y con totales decrementados
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
