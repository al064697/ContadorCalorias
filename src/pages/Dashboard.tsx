/**
 * PÁGINA PRINCIPAL - DASHBOARD
 * 
 * Dashboard principal de la aplicación donde el usuario:
 * - Ve su progreso diario en un círculo de progreso
 * - Consulta sus metas calóricas (TMB, TDEE, déficit)
 * - Agrega alimentos consumidos con búsqueda y selector
 * - Ve la lista de alimentos del día
 * - Recibe mensajes motivacionales según su progreso
 * 
 * Componentes principales:
 * - Círculo de progreso (CircularProgressbar)
 * - Estadísticas metabólicas
 * - Formulario de búsqueda y selección de alimentos
 * - Lista de alimentos consumidos hoy
 * - Navegación a historial y configuración de tema
 * 
 * Estados:
 * - selectedFood: alimento seleccionado del dropdown
 * - quantity: número de porciones
 * - searchTerm: filtro de búsqueda de alimentos
 */

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
import MacronutrientBars from '../components/MacronutrientBars'
import './Dashboard.css'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const goals = useCaloriesCalculator(user)
  const { todayLog, addEntry, removeEntry } = useDailyLog(
    user?.id, 
    goals?.tdee || 2000,
    goals ? { carbs: goals.carbs, protein: goals.protein, fat: goals.fat } : undefined
  )
  
  const [selectedFood, setSelectedFood] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  
  const navigate = useNavigate()

  // Si no hay datos, mostrar cargando
  if (!user || !goals || !todayLog) {
    return <div className="loading">Cargando...</div>
  }

  // Calcular porcentaje de meta cumplida
  const percentage = Math.round((todayLog.totalCalories / goals.tdee) * 100)
  const motivational = getMotivationalMessage(todayLog.totalCalories, goals.tdee)
  
  // Filtrar alimentos según búsqueda
  const filteredFoods = FOODS_DATABASE.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  /**
   * Maneja la adición de un alimento al registro.
   * Crea una nueva entrada con el alimento y cantidad seleccionados.
   */
  const handleAddFood = () => {
    if (!selectedFood) return
    
    const food = FOODS_DATABASE.find(f => f.id === selectedFood)
    if (!food) return

    const entry: FoodEntry = {
      id: generateId(),
      foodId: food.id,
      foodName: food.name,
      calories: Math.round(food.calories * quantity),
      carbs: Math.round(food.carbs * quantity * 10) / 10,
      protein: Math.round(food.protein * quantity * 10) / 10,
      fat: Math.round(food.fat * quantity * 10) / 10,
      trafficLight: food.trafficLight,
      quantity,
      timestamp: new Date().toISOString()
    }

    addEntry(entry)
    setSelectedFood('')
    setQuantity(1)
    setSearchTerm('')
  }

  /**
   * Determina el color del círculo de progreso según porcentaje.
   * - Verde: 90-110% (rango óptimo)
   * - Rojo: >110% (exceso)
   * - Amarillo: <90% (insuficiente)
   */
  const getProgressColor = () => {
    if (percentage >= 90 && percentage <= 110) return '#10b981'
    if (percentage > 110) return '#ef4444'
    return '#f59e0b'
  }

  /**
   * Obtiene el emoji del semáforo nutricional.
   */
  const getTrafficLightEmoji = (trafficLight: 'green' | 'yellow' | 'red') => {
    switch (trafficLight) {
      case 'green':
        return '🟢'
      case 'yellow':
        return '🟡'
      case 'red':
        return '🔴'
      default:
        return '⚪'
    }
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
            <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
              ⚙️ Configuración
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
          {/* Círculo de progreso */}
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

          {/* Información metabólica */}
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
              <div className="metabolism-item">
                <span className="metabolism-label">IMC</span>
                <span className="metabolism-value">{goals.imc}</span>
              </div>
            </div>
          </Card>

          {/* Macronutrientes */}
          <Card title="Macronutrientes" className="macros-card">
            <MacronutrientBars
              consumed={{
                carbs: todayLog.totalCarbs,
                protein: todayLog.totalProtein,
                fat: todayLog.totalFat
              }}
              target={{
                carbs: goals.carbs,
                protein: goals.protein,
                fat: goals.fat
              }}
            />
          </Card>

          {/* Formulario para agregar alimentos */}
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

          {/* Lista de alimentos consumidos hoy */}
          <Card title={`Alimentos de hoy (${todayLog.entries.length})`} className="foods-list-card">
            {todayLog.entries.length === 0 ? (
              <p className="empty-state">No has registrado alimentos hoy</p>
            ) : (
              <ul className="foods-list">
                {todayLog.entries.map(entry => (
                  <li key={entry.id} className="food-entry">
                    <div className="food-entry-main">
                      <div className="food-entry-info">
                        <span className="traffic-light">{getTrafficLightEmoji(entry.trafficLight)}</span>
                        <div>
                          <strong>{entry.foodName}</strong>
                          <span className="food-entry-quantity">
                            {entry.quantity}x • {new Date(entry.timestamp).toLocaleTimeString('es', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
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
                    </div>
                    <div className="food-entry-macros">
                      <span className="macro-badge macro-badge-carbs">C: {entry.carbs}g</span>
                      <span className="macro-badge macro-badge-protein">P: {entry.protein}g</span>
                      <span className="macro-badge macro-badge-fat">G: {entry.fat}g</span>
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
