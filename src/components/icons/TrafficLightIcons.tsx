/**
 * Iconos de semáforo nutricional
 * Sistema de clasificación visual de alimentos
 */

import React from 'react';
import { Icon, IconProps } from './Icon';

// Verde - Consumo libre
export const GreenLightIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" fill="#10b981" />
    <path
      d="M8 12l2.5 2.5L16 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

// Amarillo - Consumo moderado
export const YellowLightIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" fill="#f59e0b" />
    <path
      d="M12 8v5M12 16h.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
);

// Rojo - Evitar o limitar
export const RedLightIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" fill="#ef4444" />
    <path
      d="M15 9l-6 6M9 9l6 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
);
