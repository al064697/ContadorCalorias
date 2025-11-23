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
import {
  GreenLightIcon,
  YellowLightIcon,
  RedLightIcon,
  CarbIcon,
  ProteinBadgeIcon,
  FatIcon,
  EnergyIcon,
  TrashIcon,
  ClockIcon,
  SunIcon,
  MoonIcon,
  LogoutIcon,
  HistoryIcon,
  UserIcon
} from '../components/icons'
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

  /**
   * CÁLCULO DESTACADO: Porcentaje de meta calórica diaria
   * 
   * Este cálculo determina qué tan cerca está el usuario de su meta.
   * Se usa para:
   * - Mostrar el círculo de progreso
   * - Determinar el color (verde/amarillo/rojo)
   * - Generar mensajes motivacionales
   * 
   * Ejemplo: Si consumiste 1500 kcal de 2000 meta
   * → (1500/2000) * 100 = 75%
   */
  const percentage = Math.round((todayLog.totalCalories / goals.tdee) * 100)
  const motivational = getMotivationalMessage(todayLog.totalCalories, goals.tdee)
  
  /**
   * FILTRADO DINÁMICO: Búsqueda de alimentos en tiempo real
   * 
   * Implementa búsqueda case-insensitive mientras el usuario escribe.
   * 
   * PROCESO:
   * 1. Convierte tanto el nombre del alimento como el término de búsqueda a minúsculas
   * 2. Verifica si el nombre incluye el término
   * 3. Devuelve solo los alimentos que coincidan
   * 
   * EXPERIENCIA DE USUARIO:
   * - Búsqueda instantánea (sin necesidad de botón "Buscar")
   * - No distingue mayúsculas/minúsculas
   * - Encuentra coincidencias parciales ("man" encuentra "Manzana")
   * 
   * Ejemplo: searchTerm="pol" → encuentra "Pollo", "Polen", etc.
   */
  const filteredFoods = FOODS_DATABASE.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  /**
   * FUNCIÓN DESTACADA: Agregar alimento al registro diario
   * 
   * Esta función gestiona todo el proceso de registrar un alimento consumido.
   * Es la función principal de interacción del usuario con la app.
   * 
   * PROCESO COMPLETO:
   * 1. Validación: Verifica que haya un alimento seleccionado
   * 2. Búsqueda: Encuentra el alimento en la base de datos
   * 3. Cálculo: Multiplica valores nutricionales por la cantidad
   * 4. Creación: Genera objeto FoodEntry con toda la info
   * 5. Registro: Agrega la entrada al log del día
   * 6. Limpieza: Resetea el formulario para siguiente entrada
   * 
   * CÁLCULO DE MACRONUTRIENTES POR CANTIDAD:
   * - Cada alimento en la DB tiene valores por 100g
   * - Se multiplica por la cantidad (porciones)
   * - Se redondea a 1 decimal para precisión sin exceso
   * 
   * EJEMPLO:
   * Alimento: Pollo (165 kcal, 31g prot, 3.6g grasa)
   * Cantidad: 1.5 porciones
   * Resultado: 247.5 kcal, 46.5g prot, 5.4g grasa
   * 
   * REDONDEO INTELIGENTE:
   * - Calorías: redondeo normal (entero)
   * - Macros: redondeo a 1 decimal (más preciso)
   *   Math.round(value * 10) / 10 = redondea a 1 decimal
   * 
   * EXPERIENCIA DE USUARIO:
   * Después de agregar, el formulario se resetea automáticamente
   * para facilitar agregar múltiples alimentos rápidamente.
   */
  const handleAddFood = () => {
    if (!selectedFood) return
    
    const food = FOODS_DATABASE.find(f => f.id === selectedFood)
    if (!food) return

    // Crear entrada con valores calculados según la cantidad
    const entry: FoodEntry = {
      id: generateId(),
      foodId: food.id,
      foodName: food.name,
      // Calorías: redondeo simple a entero
      calories: Math.round(food.calories * quantity),
      // Macros: redondeo a 1 decimal para mayor precisión
      carbs: Math.round(food.carbs * quantity * 10) / 10,
      protein: Math.round(food.protein * quantity * 10) / 10,
      fat: Math.round(food.fat * quantity * 10) / 10,
      // Información adicional
      trafficLight: food.trafficLight,
      quantity,
      timestamp: new Date().toISOString()
    }

    addEntry(entry)
    
    // Limpiar formulario para siguiente entrada
    setSelectedFood('')
    setQuantity(1)
    setSearchTerm('')
  }

  /**
   * FUNCIÓN DESTACADA: Determinar color del círculo de progreso
   * 
   * Esta función implementa un sistema de "semáforo" para visualizar
   * qué tan bien el usuario está cumpliendo su meta calórica.
   * 
   * RANGOS Y SIGNIFICADOS:
   * - VERDE (90-110%): Rango óptimo
   *   El usuario está dentro del margen recomendado (±10% de la meta)
   *   
   * - ROJO (>110%): Exceso
   *   El usuario ha sobrepasado significativamente su meta
   *   Puede afectar objetivos de pérdida de peso
   *   
   * - AMARILLO (<90%): Insuficiente
   *   El usuario no ha consumido suficientes calorías
   *   Puede afectar energía y metabolismo
   * 
   * COLORES HEXADECIMALES:
   * #10b981 = Verde esmeralda (success)
   * #ef4444 = Rojo (danger)
   * #f59e0b = Amarillo ámbar (warning)
   * 
   * EJEMPLO:
   * Meta: 2000 kcal
   * - 1950 kcal (97.5%) → Verde
   * - 2300 kcal (115%) → Rojo
   * - 1700 kcal (85%) → Amarillo
   * 
   * @returns Color hexadecimal para el componente CircularProgressbar
   */
  const getProgressColor = () => {
    if (percentage >= 90 && percentage <= 110) return '#10b981' // Verde: rango óptimo
    if (percentage > 110) return '#ef4444' // Rojo: exceso
    return '#f59e0b' // Amarillo: insuficiente
  }

  /**
   * FUNCIÓN DESTACADA: Obtener icono del semáforo nutricional
   * 
   * Implementa el sistema de clasificación nutricional basado en la
   * Guía de Alimentos para la Población Mexicana.
   * 
   * SISTEMA DE SEMÁFORO NUTRICIONAL:
   * Este sistema ayuda a los usuarios a identificar rápidamente
   * qué tan saludable es un alimento.
   * 
   * CATEGORÍAS:
   * 
   * VERDE - Consumo libre:
   * - Alimentos nutritivos y bajos en calorías
   * - Verduras, frutas, proteínas magras
   * - Se pueden consumir en cantidades generosas
   * - Ejemplos: Lechuga, pollo sin piel, manzana
   * 
   * AMARILLO - Consumo moderado:
   * - Alimentos nutritivos pero más calóricos
   * - Grasas saludables, carbohidratos complejos
   * - Controlar porciones
   * - Ejemplos: Aguacate, nueces, arroz integral
   * 
   * ROJO - Evitar o limitar:
   * - Altos en calorías, azúcares o grasas saturadas
   * - Consumo ocasional y en pequeñas cantidades
   * - Afectan objetivos de salud
   * - Ejemplos: Papas fritas, refrescos, donas
   * 
   * VISUALIZACIÓN:
   * Los iconos SVG personalizados aparecen junto a cada alimento registrado,
   * permitiendo al usuario ver de un vistazo la calidad
   * nutricional de su alimentación del día.
   * 
   * @param trafficLight - Clasificación del alimento
   * @returns Componente de icono SVG correspondiente al nivel nutricional
   */
  const getTrafficLightIcon = (trafficLight: 'green' | 'yellow' | 'red') => {
    switch (trafficLight) {
      case 'green':
        return <GreenLightIcon size={20} /> // Consumo libre - alimentos saludables
      case 'yellow':
        return <YellowLightIcon size={20} /> // Consumo moderado - controlar porciones
      case 'red':
        return <RedLightIcon size={20} /> // Evitar o limitar - altos en calorías/grasas
      default:
        return null // Sin clasificación
    }
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <EnergyIcon size={28} color="var(--accent)" />
            Contador de Calorías
          </h2>
          <div className="nav-actions">
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
              <HistoryIcon size={18} />
              Historial
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
              <UserIcon size={18} />
              Configuración
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogoutIcon size={18} />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>
            Hola, {user.name}!
          </h1>
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
                        <span className="traffic-light">{getTrafficLightIcon(entry.trafficLight)}</span>
                        <div>
                          <strong>{entry.foodName}</strong>
                          <span className="food-entry-quantity" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            {entry.quantity}x • 
                            <ClockIcon size={14} />
                            {new Date(entry.timestamp).toLocaleTimeString('es', {
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
                          aria-label="Eliminar alimento"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="food-entry-macros">
                      <span className="macro-badge macro-badge-carbs">
                        <CarbIcon size={16} />
                        {entry.carbs}g
                      </span>
                      <span className="macro-badge macro-badge-protein">
                        <ProteinBadgeIcon size={16} />
                        {entry.protein}g
                      </span>
                      <span className="macro-badge macro-badge-fat">
                        <FatIcon size={16} />
                        {entry.fat}g
                      </span>
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
