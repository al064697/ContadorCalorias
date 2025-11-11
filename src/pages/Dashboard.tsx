import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useCaloriesCalculator } from '../hooks/useCaloriesCalculator'
import { useDailyLog } from '../hooks/useDailyLog'
import { FOODS_DATABASE } from '../data/foods'
import { FoodEntry } from '../types'
import { getMotivationalMessage, generateId, formatCalories } from '../utils/calculations'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import './Dashboard.css'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const goals = useCaloriesCalculator(user)
  const { todayLog, addEntry, removeEntry } = useDailyLog(user?.id, goals?.tdee || 2000)
  
  const [selectedFood, setSelectedFood] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  
  const navigate = useNavigate()

  if (!user || !goals || !todayLog) {
    return <div className="loading">Cargando...</div>
  }

  const percentage = Math.round((todayLog.totalCalories / goals.tdee) * 100)
  const motivational = getMotivationalMessage(todayLog.totalCalories, goals.tdee)
  
  const filteredFoods = FOODS_DATABASE.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddFood = () => {
    if (!selectedFood) return
    
    const food = FOODS_DATABASE.find(f => f.id === selectedFood)
    if (!food) return

    const entry: FoodEntry = {
      id: generateId(),
      foodId: food.id,
      foodName: food.name,
      calories: Math.round(food.calories * quantity),
      quantity,
      timestamp: new Date().toISOString()
    }

    addEntry(entry)
    setSelectedFood('')
    setQuantity(1)
    setSearchTerm('')
  }

  const getProgressColor = () => {
    if (percentage >= 90 && percentage <= 110) return '#10b981'
    if (percentage > 110) return '#ef4444'
    return '#f59e0b'
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <h2>🥗 Contador de Calorías</h2>
          <div className="nav-actions">
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
              📊 Historial
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Hola, {user.name}! 👋</h1>
          <p className="welcome-subtitle">
            {user.age} años • {user.weight} kg • {user.height} cm
          </p>
        </div>

        <div className="dashboard-grid">
          {/* Progress Circle */}
          <Card className="progress-card">
            <div className="progress-circle">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  textColor: 'var(--text)',
                  pathColor: getProgressColor(),
                  trailColor: 'var(--border)'
                })}
              />
            </div>
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-label">Consumido</span>
                <span className="stat-value">{formatCalories(todayLog.totalCalories)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Meta diaria</span>
                <span className="stat-value">{formatCalories(goals.tdee)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Restante</span>
                <span className="stat-value">
                  {formatCalories(Math.max(0, goals.tdee - todayLog.totalCalories))}
                </span>
              </div>
            </div>
            <div className={`motivational motivational-${motivational.type}`}>
              <span className="motivational-emoji">{motivational.emoji}</span>
              <span>{motivational.message}</span>
            </div>
          </Card>

          {/* Calories Info */}
          <Card title="Tu metabolismo">
            <div className="metabolism-stats">
              <div className="metabolism-item">
                <span className="metabolism-label">TMB (Metabolismo basal)</span>
                <span className="metabolism-value">{formatCalories(goals.bmr)}</span>
              </div>
              <div className="metabolism-item">
                <span className="metabolism-label">TDEE (Gasto total)</span>
                <span className="metabolism-value">{formatCalories(goals.tdee)}</span>
              </div>
              {goals.deficit && (
                <div className="metabolism-item">
                  <span className="metabolism-label">Para perder peso</span>
                  <span className="metabolism-value">{formatCalories(goals.deficit)}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Add Food */}
          <Card title="Agregar alimento" className="add-food-card">
            <div className="add-food-form">
              <input
                type="text"
                placeholder="Buscar alimento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              
              <select
                value={selectedFood}
                onChange={(e) => setSelectedFood(e.target.value)}
                className="food-select"
              >
                <option value="">Selecciona un alimento</option>
                {filteredFoods.map(food => (
                  <option key={food.id} value={food.id}>
                    {food.name} ({food.calories} kcal - {food.servingSize})
                  </option>
                ))}
              </select>

              <div className="quantity-group">
                <label>Porciones:</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <Button onClick={handleAddFood} disabled={!selectedFood} className="w-full">
                Agregar alimento
              </Button>
            </div>
          </Card>

          {/* Today's Foods */}
          <Card title={`Alimentos de hoy (${todayLog.entries.length})`} className="foods-list-card">
            {todayLog.entries.length === 0 ? (
              <p className="empty-state">No has registrado alimentos hoy</p>
            ) : (
              <ul className="foods-list">
                {todayLog.entries.map(entry => (
                  <li key={entry.id} className="food-entry">
                    <div className="food-entry-info">
                      <strong>{entry.foodName}</strong>
                      <span className="food-entry-quantity">
                        {entry.quantity}x • {new Date(entry.timestamp).toLocaleTimeString('es', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="food-entry-actions">
                      <span className="food-entry-calories">{entry.calories} kcal</span>
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="remove-btn"
                        aria-label={`Eliminar ${entry.foodName}`}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
