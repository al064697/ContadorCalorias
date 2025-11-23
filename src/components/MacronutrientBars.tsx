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
   * FUNCIÓN DESTACADA: Cálculo de porcentaje de macronutrientes
   * 
   * Esta función es crítica para la visualización del progreso nutricional.
   * Características importantes:
   * - Protege contra división por cero (si target === 0)
   * - Limita el porcentaje máximo a 100% (aunque se consuma más)
   * - Redondea a entero para mejor visualización
   * 
   * @param consumed - Gramos consumidos del macronutriente
   * @param target - Gramos objetivo del macronutriente
   * @returns Porcentaje entre 0 y 100
   * 
   * Ejemplo: Si consumiste 150g de carbos y tu meta es 200g
   * → (150/200) * 100 = 75%
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
            Carbohidratos
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
            Proteínas
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
            Grasas
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
