/**
 * PÁGINA DE HISTORIAL
 * 
 * Muestra el historial de consumo de calorías de los últimos 7 días.
 * 
 * Características:
 * - Gráfica de líneas comparando consumo vs meta diaria
 * - Lista detallada de cada día con:
 *   - Fecha en español
 *   - Porcentaje de meta cumplida
 *   - Total de calorías consumidas vs objetivo
 *   - Número de alimentos registrados
 * - Badge de color según rendimiento (verde=bueno, amarillo=fuera de rango)
 * 
 * Usa Recharts para la visualización y date-fns para formateo de fechas.
 */

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useHistoricalLogs } from '../hooks/useDailyLog'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { HistoryIcon, CalendarIcon, EnergyIcon } from '../components/icons'
import './History.css'

export default function History() {
  const { user } = useAuth()
  const logs = useHistoricalLogs(user?.id, 7)
  const navigate = useNavigate()

  // Redirigir si no hay usuario
  if (!user) {
    navigate('/login')
    return null
  }

  // Preparar datos para la gráfica
  const chartData = logs.reverse().map(log => ({
    date: format(new Date(log.date), 'dd MMM', { locale: es }),
    consumido: log.totalCalories,
    meta: log.targetCalories
  }))

  return (
    <div className="history-page">
      <div className="history-header">
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          ← Volver
        </Button>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HistoryIcon size={32} color="var(--accent)" />
          Historial de 7 días
        </h1>
      </div>

      <div className="history-content">
        {/* Gráfica comparativa de consumo vs meta */}
        <Card title="Gráfica de consumo">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="consumido" stroke="var(--accent)" strokeWidth={2} name="Consumido" />
                <Line type="monotone" dataKey="meta" stroke="var(--success)" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Lista de registros diarios */}
        <Card title="Registros diarios">
          <div className="history-list">
            {logs.length === 0 ? (
              <p className="empty-state">No hay registros aún</p>
            ) : (
              logs.map(log => {
                const percentage = Math.round((log.totalCalories / log.targetCalories) * 100)
                const isGood = percentage >= 90 && percentage <= 110
                
                return (
                  <div key={log.date} className="history-item">
                    <div className="history-item-header">
                      <span className="history-date" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CalendarIcon size={18} />
                        {format(new Date(log.date), "EEEE, d 'de' MMMM", { locale: es })}
                      </span>
                      <span className={`history-badge ${isGood ? 'badge-success' : 'badge-warning'}`}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="history-item-stats">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <EnergyIcon size={16} />
                        {log.totalCalories} / {log.targetCalories} kcal
                      </span>
                      <span className="history-foods">{log.entries.length} alimentos</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
