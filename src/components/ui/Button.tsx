/**
 * COMPONENTE REUTILIZABLE - BUTTON
 * 
 * Botón personalizado con diferentes variantes y tamaños.
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'ghost' | 'danger' (default: 'primary')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - children: contenido del botón
 * - className: clases CSS adicionales
 * - disabled: deshabilitar botón
 * - onClick, type, etc.: props estándar de HTML button
 * 
 * Uso:
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Guardar
 * </Button>
 */

import { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
