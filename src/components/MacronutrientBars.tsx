/**
 * COMPONENTE - BARRAS DE MACRONUTRIENTES
 * 
 * Muestra barras de progreso para carbohidratos, proteínas y grasas.
 * Cada barra indica:
 * - Cantidad consumida vs meta
 * - Porcentaje de progreso
 * - Color según tipo de macronutriente
 * 
 * Props:
 * - consumed: { carbs, protein, fat } - gramos consumidos
 * - target: { carbs, protein, fat } - gramos meta
 */

import './MacronutrientBars.css'

interface MacronutrientBarsProps {
  consumed: {
    carbs: number
    protein: number
    fat: number
  }
  target: {
    carbs: number
    protein: number
    fat: number
  }
}

export default function MacronutrientBars({ consumed, target }: MacronutrientBarsProps) {
  /**
   * Calcula el porcentaje de progreso para cada macro.
   */
  const getPercentage = (consumed: number, target: number) => {
    if (target === 0) return 0
    return Math.min(Math.round((consumed / target) * 100), 100)
  }

  const carbsPercent = getPercentage(consumed.carbs, target.carbs)
  const proteinPercent = getPercentage(consumed.protein, target.protein)
  const fatPercent = getPercentage(consumed.fat, target.fat)

  return (
    <div className="macronutrient-bars">
      {/* Carbohidratos */}
      <div className="macro-item">
        <div className="macro-header">
          <span className="macro-label">
            🍞 Carbohidratos
          </span>
          <span className="macro-values">
            {consumed.carbs}g / {target.carbs}g
          </span>
        </div>
        <div className="macro-bar-container">
          <div 
            className="macro-bar macro-bar-carbs" 
            style={{ width: `${carbsPercent}%` }}
          />
        </div>
        <span className="macro-percent">{carbsPercent}%</span>
      </div>

      {/* Proteínas */}
      <div className="macro-item">
        <div className="macro-header">
          <span className="macro-label">
            🥩 Proteínas
          </span>
          <span className="macro-values">
            {consumed.protein}g / {target.protein}g
          </span>
        </div>
        <div className="macro-bar-container">
          <div 
            className="macro-bar macro-bar-protein" 
            style={{ width: `${proteinPercent}%` }}
          />
        </div>
        <span className="macro-percent">{proteinPercent}%</span>
      </div>

      {/* Grasas */}
      <div className="macro-item">
        <div className="macro-header">
          <span className="macro-label">
            🥑 Grasas
          </span>
          <span className="macro-values">
            {consumed.fat}g / {target.fat}g
          </span>
        </div>
        <div className="macro-bar-container">
          <div 
            className="macro-bar macro-bar-fat" 
            style={{ width: `${fatPercent}%` }}
          />
        </div>
        <span className="macro-percent">{fatPercent}%</span>
      </div>
    </div>
  )
}
