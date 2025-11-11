import { useState, useEffect } from 'react'
import { DailyLog, FoodEntry } from '../types'
import { format } from 'date-fns'

/**
 * Custom hook to manage daily food logs
 */
export function useDailyLog(userId: string | undefined, targetCalories: number) {
  const [todayLog, setTodayLog] = useState<DailyLog | null>(null)
  const today = format(new Date(), 'yyyy-MM-dd')

  useEffect(() => {
    if (!userId) return

    // Load today's log from localStorage
    const logsData = localStorage.getItem('dailyLogs')
    const allLogs: DailyLog[] = logsData ? JSON.parse(logsData) : []
    
    const existingLog = allLogs.find(log => log.date === today && log.userId === userId)
    
    if (existingLog) {
      setTodayLog(existingLog)
    } else {
      // Create new log for today
      const newLog: DailyLog = {
        date: today,
        userId,
        entries: [],
        totalCalories: 0,
        targetCalories
      }
      setTodayLog(newLog)
    }
  }, [userId, today, targetCalories])

  const addEntry = (entry: FoodEntry) => {
    if (!todayLog || !userId) return

    const updatedLog: DailyLog = {
      ...todayLog,
      entries: [...todayLog.entries, entry],
      totalCalories: todayLog.totalCalories + entry.calories
    }

    setTodayLog(updatedLog)
    saveLogs(updatedLog)
  }

  const removeEntry = (entryId: string) => {
    if (!todayLog) return

    const removedEntry = todayLog.entries.find(e => e.id === entryId)
    if (!removedEntry) return

    const updatedLog: DailyLog = {
      ...todayLog,
      entries: todayLog.entries.filter(e => e.id !== entryId),
      totalCalories: todayLog.totalCalories - removedEntry.calories
    }

    setTodayLog(updatedLog)
    saveLogs(updatedLog)
  }

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
 * Get historical logs for a user
 */
export function useHistoricalLogs(userId: string | undefined, days: number = 7) {
  const [logs, setLogs] = useState<DailyLog[]>([])

  useEffect(() => {
    if (!userId) return

    const logsData = localStorage.getItem('dailyLogs')
    const allLogs: DailyLog[] = logsData ? JSON.parse(logsData) : []
    
    // Filter logs for this user and sort by date
    const userLogs = allLogs
      .filter(log => log.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, days)
    
    setLogs(userLogs)
  }, [userId, days])

  return logs
}
