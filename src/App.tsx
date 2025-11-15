/**
 * COMPONENTE PRINCIPAL - APP
 * 
 * Componente raíz de la aplicación.
 * 
 * Responsabilidades:
 * - Configurar React Router con todas las rutas
 * - Envolver la app con los proveedores de contexto (Auth, Theme)
 * - Definir rutas protegidas (requieren autenticación)
 * - Definir rutas públicas (login, register)
 * 
 * Rutas:
 * - / → Redirige a /dashboard o /login según autenticación
 * - /login → Página de inicio de sesión (pública)
 * - /register → Página de registro (pública)
 * - /dashboard → Dashboard principal (protegida)
 * - /history → Historial de 7 días (protegida)
 * 
 * Proveedores:
 * - BrowserRouter: enrutamiento
 * - AuthProvider: estado de autenticación
 * - ThemeProvider: tema visual
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Settings from './pages/Settings'

/**
 * Componente de ruta protegida.
 * Redirige a /login si el usuario no está autenticado.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

/**
 * Componente de ruta pública.
 * Redirige a /dashboard si el usuario ya está autenticado.
 */
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? children : <Navigate to="/dashboard" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
