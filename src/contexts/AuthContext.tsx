/**
 * CONTEXTO DE AUTENTICACIÓN
 * 
 * Maneja todo el estado de autenticación de la aplicación:
 * - Login: validar credenciales y crear sesión
 * - Register: crear nuevo usuario
 * - Logout: cerrar sesión
 * - UpdateUser: actualizar datos del usuario
 * 
 * Funcionalidades:
 * - Persiste usuarios en localStorage
 * - Mantiene sesión activa entre recargas
 * - Valida email único en registro
 * - Excluye contraseña del estado de usuario
 * 
 * Uso: 
 * Envolver componentes con <AuthProvider> y usar useAuth() hook.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'

/**
 * Función auxiliar para generar IDs únicos.
 * Combina timestamp con cadena aleatoria para garantizar unicidad.
 */
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

/**
 * Interfaz del contexto de autenticación.
 * Define todas las funciones y propiedades disponibles.
 */
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (user: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * PROVEEDOR DESTACADO: Contexto de Autenticación
 * 
 * Este componente implementa todo el sistema de autenticación de la aplicación.
 * Usa React Context API para compartir el estado de autenticación globalmente.
 * 
 * RESPONSABILIDADES:
 * 1. Gestionar el estado del usuario actual (logueado o no)
 * 2. Persistir la sesión en localStorage
 * 3. Proveer funciones de login, register, logout
 * 4. Validar credenciales
 * 5. Actualizar datos del usuario
 * 
 * PERSISTENCIA DE SESIÓN:
 * - Al hacer login: guarda usuario en localStorage
 * - Al recargar página: recupera usuario de localStorage
 * - Al hacer logout: elimina usuario de localStorage
 * 
 * ESTRUCTURA DE DATOS:
 * localStorage['users'] = [{ email, password, name, age, ... }, ...]
 * localStorage['currentUser'] = { email, password, name, age, ... }
 * 
 * IMPORTANTE: Este sistema usa localStorage, NO es seguro para producción.
 * En producción real se debe usar:
 * - Backend con API REST/GraphQL
 * - Tokens JWT para autenticación
 * - HTTPS para encriptación
 * - Hash de contraseñas (bcrypt, etc.)
 * 
 * USO:
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  /**
   * EFECTO DESTACADO: Recuperación de sesión al iniciar
   * 
   * Este efecto se ejecuta una sola vez al montar el componente.
   * Intenta recuperar la sesión del usuario desde localStorage.
   * 
   * FLUJO:
   * 1. Lee 'currentUser' de localStorage
   * 2. Si existe: parsea el JSON y establece el usuario
   * 3. Si no existe: el usuario permanece null (no logueado)
   * 
   * BENEFICIO:
   * El usuario permanece logueado después de recargar la página
   * o cerrar/abrir el navegador (mientras no limpie localStorage).
   * 
   * NOTA: useEffect con [] vacío = ejecuta solo una vez al montar.
   */
  useEffect(() => {
    // Cargar usuario desde localStorage al iniciar
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  /**
   * FUNCIÓN DESTACADA: Inicio de sesión
   * 
   * Autentica al usuario validando sus credenciales contra
   * la base de datos local (localStorage).
   * 
   * PROCESO DE AUTENTICACIÓN:
   * 1. Recupera todos los usuarios registrados de localStorage
   * 2. Busca un usuario cuyo email Y contraseña coincidan
   * 3. Si encuentra coincidencia:
   *    - Actualiza el estado global del usuario
   *    - Guarda la sesión en localStorage
   *    - Retorna true (login exitoso)
   * 4. Si no encuentra:
   *    - No hace cambios
   *    - Retorna false (credenciales inválidas)
   * 
   * SEGURIDAD (LIMITACIONES):
   * - Contraseñas en texto plano (NO seguro)
   * - Sin protección contra fuerza bruta
   * - Sin expiración de sesión
   * 
   * PARA PRODUCCIÓN, SE NECESITA:
   * - Hash de contraseñas (bcrypt)
   * - Tokens JWT con expiración
   * - Rate limiting
   * - Autenticación 2FA
   * - HTTPS obligatorio
   * 
   * @param email - Email del usuario
   * @param password - Contraseña en texto plano
   * @returns Promise<boolean> - true si login exitoso, false si falla
   * 
   * EJEMPLO:
   * await login('juan@example.com', 'password123')
   * → Busca en localStorage['users']
   * → Si existe: setUser({ email: 'juan@...', name: 'Juan', ... })
   * → Retorna true
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    // Obtener todos los usuarios de localStorage
    const usersData = localStorage.getItem('users')
    const users = usersData ? JSON.parse(usersData) : []
    
    // Buscar usuario con credenciales coincidentes
    // IMPORTANTE: Comparación exacta (case-sensitive) de email y password
    const foundUser = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    )
    
    if (foundUser) {
      // Excluir password del objeto de usuario
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _pwd, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      return true
    }
    
    return false
  }

  /**
   * Función de registro de nuevo usuario.
   * Crea un nuevo usuario si el email no existe.
   * 
   * @param userData - Datos del usuario (sin id ni createdAt)
   * @returns true si registro exitoso, false si email ya existe
   */
  const register = async (userData: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<boolean> => {
    try {
      // Obtener usuarios existentes
      const usersData = localStorage.getItem('users')
      const users = usersData ? JSON.parse(usersData) : []
      
      // Verificar si el email ya existe
      const emailExists = users.some(
        (u: { email: string }) => u.email === userData.email
      )
      
      if (emailExists) {
        return false
      }
      
      // Crear nuevo usuario con ID y fecha de creación
      const newUser = {
        ...userData,
        id: generateId(),
        createdAt: new Date().toISOString()
      }
      
      // Guardar usuario en localStorage
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      // Excluir password y establecer sesión
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

  /**
   * Cierra la sesión actual.
   * Limpia el estado y el localStorage.
   */
  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  /**
   * Actualiza los datos del usuario.
   * Modifica tanto el estado como el localStorage.
   * 
   * @param updates - Objeto con los campos a actualizar
   */
  const updateUser = (updates: Partial<User>) => {
    if (!user) return
    
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    // Actualizar en el array de usuarios también
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

/**
 * Hook personalizado para usar el contexto de autenticación.
 * Lanza error si se usa fuera del AuthProvider.
 * 
 * @returns Contexto de autenticación con user y funciones
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
