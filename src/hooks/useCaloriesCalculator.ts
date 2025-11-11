import { useMemo } from 'react'
import { User, CalorieGoals } from '../types'
import { getCalorieGoals } from '../utils/calculations'

/**
 * Custom hook to calculate user's calorie goals
 */
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
