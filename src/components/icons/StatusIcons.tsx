/**
 * Iconos de estado y feedback
 * Mensajes motivacionales y estados del sistema
 */

import React from 'react';
import { Icon, IconProps } from './Icon';

// Objetivo alcanzado / Excelente
export const TargetIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </Icon>
);

// Fortaleza / Bien hecho
export const StrengthIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M6 12h3m6 0h3M9 5l3 7 3-7M6 12c0 1 0 3 1 5 1 1 2 2 5 2s4-1 5-2c1-2 1-4 1-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Exceso calórico
export const TrendUpIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M3 17l6-6 4 4 8-8M21 7v6h-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Déficit calórico
export const TrendDownIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M3 7l6 6 4-4 8 8M21 17v-6h-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Necesitas ajustar
export const SweatIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M17 6c.5-.5.5-1 0-1.5-.5-.5-1-.5-1.5 0L15 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Icon>
);

// Necesitas energía
export const AppleIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M12 3c-1.5 0-3 .5-4 1.5-1-1-2.5-1.5-4-1.5-1 0-2 1-2 2 0 2 1 3 2 4 0 3 2 6 5 7 1 .5 2 .5 3 .5s2 0 3-.5c3-1 5-4 5-7 1-1 2-2 2-4 0-1-1-2-2-2-1.5 0-3 .5-4 1.5C15 3.5 13.5 3 12 3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Completado / Éxito
export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M8 12l2.5 2.5L16 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

// Energía / Calorías
export const EnergyIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Calorías quemadas / Metabolismo
export const FireIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M12 2c-1 3-3 4-3 7 0 2 1 4 3 4 1 0 2-1 2-2 0-1-1-2-1-3 0-1 2-1 3 0 1 2 2 4 2 6 0 3-2 6-6 6s-6-3-6-6c0-4 2-7 4-9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
