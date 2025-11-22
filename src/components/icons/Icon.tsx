/**
 * Componente base para todos los iconos del sistema
 * Proporciona props consistentes y estilos uniformes
 */

import React from 'react';
import './Icon.css';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 24,
  color = 'currentColor',
  className = '',
  onClick,
  children
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`icon ${className}`}
      onClick={onClick}
      style={{ color }}
    >
      {children}
    </svg>
  );
};
