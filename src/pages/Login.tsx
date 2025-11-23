/**
 * PÁGINA DE INICIO DE SESIÓN
 * 
 * Permite a los usuarios autenticarse con email y contraseña.
 * 
 * Características:
 * - Validación de campos requeridos
 * - Manejo de errores (credenciales inválidas)
 * - Estado de carga durante autenticación
 * - Redirección al dashboard tras login exitoso
 * - Link a página de registro
 * 
 * Seguridad:
 * - Autocomplete apropiado para email y password
 * - Password type="password" para ocultar caracteres
 */

import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  /**
   * Maneja el envío del formulario de login.
   * Valida credenciales y redirige al dashboard si son correctas.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const success = await login(email, password)
    
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Credenciales inválidas')
    }
    
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Contador de Calorías</h1>
          <p>Inicia sesión para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>

        <div className="auth-footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  )
}