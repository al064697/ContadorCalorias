import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'

// Helper function to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (user: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Get all users from localStorage
    const usersData = localStorage.getItem('users')
    const users = usersData ? JSON.parse(usersData) : []
    
    // Find user with matching credentials
    const foundUser = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    )
    
    if (foundUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _pwd, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      return true
    }
    
    return false
  }

  const register = async (userData: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<boolean> => {
    try {
      // Get existing users
      const usersData = localStorage.getItem('users')
      const users = usersData ? JSON.parse(usersData) : []
      
      // Check if email already exists
      const emailExists = users.some(
        (u: { email: string }) => u.email === userData.email
      )
      
      if (emailExists) {
        return false
      }
      
      // Create new user
      const newUser = {
        ...userData,
        id: generateId(),
        createdAt: new Date().toISOString()
      }
      
      // Save user to localStorage
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _pwd, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      
      return true
    } catch (error) {
      console.error('Error registering user:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return
    
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    // Update in users array
    const usersData = localStorage.getItem('users')
    const users = usersData ? JSON.parse(usersData) : []
    const userIndex = users.findIndex((u: { id: string }) => u.id === user.id)
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      localStorage.setItem('users', JSON.stringify(users))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
