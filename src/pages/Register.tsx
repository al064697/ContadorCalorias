import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ActivityLevel, Gender } from '../types'
import { ACTIVITY_LABELS } from '../utils/constants'
import Button from '../components/ui/Button'
import './Auth.css'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male' as Gender,
    activityLevel: 'moderate' as ActivityLevel
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      gender: formData.gender,
      activityLevel: formData.activityLevel
    })
    
    if (success) {
      navigate('/dashboard')
    } else {
      setError('El email ya está registrado')
    }
    
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-wide">
        <div className="auth-header">
          <h1>🥗 Crear cuenta</h1>
          <p>Completa tus datos para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Juan Pérez"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Edad</label>
              <input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                placeholder="25"
                min="15"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Peso (kg)</label>
              <input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                placeholder="70"
                min="30"
                max="300"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Altura (cm)</label>
              <input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                placeholder="170"
                min="100"
                max="250"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Sexo</label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value as Gender})}
              >
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="activity">Nivel de actividad</label>
              <select
                id="activity"
                value={formData.activityLevel}
                onChange={(e) => setFormData({...formData, activityLevel: e.target.value as ActivityLevel})}
              >
                {Object.entries(ACTIVITY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
        </form>

        <div className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </div>
      </div>
    </div>
  )
}
