/**
 * COMPONENTE REUTILIZABLE - CARD
 * 
 * Tarjeta contenedora con estilo glassmorphism.
 * 
 * Props:
 * - children: contenido de la tarjeta
 * - className: clases CSS adicionales
 * - title: título opcional de la tarjeta
 * 
 * Uso:
 * <Card title="Mis estadísticas">
 *   <p>Contenido aquí</p>
 * </Card>
 */

import { ReactNode } from 'react'
import './Card.css'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export default function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  )
}
