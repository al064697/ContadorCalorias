/**
 * PÁGINA DE CONFIGURACIÓN
 * 
 * Permite al usuario modificar su perfil y preferencias.
 * 
 * Características:
 * - Actualizar datos personales (nombre, email)
 * - Modificar datos físicos (edad, peso, altura)
 * - Cambiar género y nivel de actividad
 * - Cambiar contraseña
 * - Ver información de la cuenta (fecha de creación)
 * - Cerrar sesión
 * 
 * Los cambios se guardan automáticamente en localStorage
 * y se recalculan las metas calóricas al actualizar.
 */

import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { ActivityLevel, Gender } from '../types'
import { ACTIVITY_LABELS } from '../utils/constants'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { SettingsIcon, UserIcon, SunIcon, MoonIcon, SaveIcon, EditIcon } from '../components/icons'
import './Settings.css'

export default function Settings() {
  const { user, updateUser, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  // Estados del formulario
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || 0,
    weight: user?.weight || 0,
    height: user?.height || 0,
    gender: user?.gender || 'male' as Gender,
    activityLevel: user?.activityLevel || 'moderate' as ActivityLevel
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirigir si no hay usuario
  if (!user) {
    navigate('/login')
    return null
  }

  /**
   * Maneja la actualización del perfil.
   */
  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      // Validar datos
      if (formData.age < 15 || formData.age > 100) {
        setError('La edad debe estar entre 15 y 100 años')
        setLoading(false)
        return
      }

      if (formData.weight < 30 || formData.weight > 300) {
        setError('El peso debe estar entre 30 y 300 kg')
        setLoading(false)
        return
      }

      if (formData.height < 100 || formData.height > 250) {
        setError('La altura debe estar entre 100 y 250 cm')
        setLoading(false)
        return
      }

      // Actualizar usuario
      updateUser({
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
        gender: formData.gender,
        activityLevel: formData.activityLevel
      })

      setMessage('Perfil actualizado correctamente')
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setError('Error al actualizar el perfil')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Maneja el cambio de contraseña.
   */
  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    // Validar contraseñas
    if (passwordData.newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    // Verificar contraseña actual
    const usersData = localStorage.getItem('users')
    const users = usersData ? JSON.parse(usersData) : []
    const currentUser = users.find((u: { id: string; password: string }) => 
      u.id === user.id && u.password === passwordData.currentPassword
    )

    if (!currentUser) {
      setError('La contraseña actual es incorrecta')
      return
    }

    // Actualizar contraseña
    const userIndex = users.findIndex((u: { id: string }) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex].password = passwordData.newPassword
      localStorage.setItem('users', JSON.stringify(users))
      
      setMessage('Contraseña actualizada correctamente')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      
      setTimeout(() => setMessage(''), 3000)
    }
  }

  /**
   * Maneja el cierre de sesión con confirmación.
   */
  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      logout()
      navigate('/login')
    }
  }

  /**
   * Formatea la fecha de creación de la cuenta.
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          ← Volver
        </Button>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SettingsIcon size={32} color="var(--accent)" />
          Configuración
        </h1>
      </div>

      <div className="settings-content">
        {/* Mensajes de feedback */}
        {message && <div className="settings-message success">{message}</div>}
        {error && <div className="settings-message error">{error}</div>}

        {/* Información de la cuenta */}
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserIcon size={20} />
            Información de la cuenta
          </span>
        }>
          <div className="account-info">
            <div className="info-item">
              <span className="info-label">ID de usuario:</span>
              <span className="info-value">{user.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Cuenta creada:</span>
              <span className="info-value">{formatDate(user.createdAt)}</span>
            </div>
          </div>
        </Card>

        {/* Datos personales */}
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserIcon size={20} />
            Datos personales
          </span>
        }>
          <form onSubmit={handleUpdateProfile} className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Edad</label>
                <input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
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
                  onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                  min="30"
                  max="300"
                  step="0.1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="height">Altura (cm)</label>
                <input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: Number(e.target.value)})}
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

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </form>
        </Card>

        {/* Cambiar contraseña */}
        <Card title="Cambiar contraseña">
          <form onSubmit={handleChangePassword} className="settings-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Contraseña actual</label>
              <input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">Nueva contraseña</label>
              <input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                minLength={6}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                minLength={6}
                required
              />
            </div>

            <Button type="submit" variant="secondary" className="w-full">
              Cambiar contraseña
            </Button>
          </form>
        </Card>

        {/* Preferencias */}
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SettingsIcon size={20} />
            Preferencias
          </span>
        }>
          <div className="preferences">
            <div className="preference-item">
              <div className="preference-info">
                <strong>Tema de la aplicación</strong>
                <p>Cambia entre modo claro y oscuro</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={toggleTheme}
                className="theme-toggle-btn"
              >
                {theme === 'dark' ? (
                  <>
                    <SunIcon size={18} />
                    Modo claro
                  </>
                ) : (
                  <>
                    <MoonIcon size={18} />
                    Modo oscuro
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Acciones de cuenta */}
        <Card title="Zona de peligro">
          <div className="danger-zone">
            <div className="danger-item">
              <div>
                <strong>Cerrar sesión</strong>
                <p>Finaliza tu sesión actual</p>
              </div>
              <Button variant="danger" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
