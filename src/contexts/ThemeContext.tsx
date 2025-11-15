/**
 * CONTEXTO DE TEMA VISUAL
 * 
 * Maneja el tema visual de la aplicación (oscuro/claro):
 * - Permite alternar entre modo oscuro y claro
 * - Persiste la preferencia en localStorage
 * - Aplica el tema al documento HTML automáticamente
 * 
 * El tema se aplica mediante el atributo data-theme en el elemento raíz,
 * que es usado por las variables CSS en styles.css.
 * 
 * Uso:
 * Envolver componentes con <ThemeProvider> y usar useTheme() hook.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Theme } from '../types'

/**
 * Interfaz del contexto de tema.
 */
interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * Proveedor del contexto de tema.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  // Al montar, cargar tema guardado
  useEffect(() => {
    // Cargar tema desde localStorage
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Al cambiar tema, aplicarlo al documento y guardarlo
  useEffect(() => {
    // Aplicar tema al documento raíz
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  /**
   * Alterna entre tema claro y oscuro.
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook personalizado para usar el contexto de tema.
 * Lanza error si se usa fuera del ThemeProvider.
 * 
 * @returns Contexto de tema con theme y toggleTheme
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
