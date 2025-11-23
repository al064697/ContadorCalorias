/**
 * Iconos de categorías de alimentos
 * Representación visual de cada grupo alimenticio
 */

import React from 'react';
import { Icon, IconProps } from './Icon';

// Frutas
export const FruitIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M12 3c-1.5 0-3 .5-4 1.5C7 3.5 5.5 3 4 3c-1 0-2 1-2 2 0 2 1 3 2 4 0 3 2 6 5 7 1 .5 2 .5 3 .5s2 0 3-.5c3-1 5-4 5-7 1-1 2-2 2-4 0-1-1-2-2-2-1.5 0-3 .5-4 1.5C15 3.5 13.5 3 12 3z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M12 3c-1.5 0-3 .5-4 1.5M12 3c1.5 0 3 .5 4 1.5M8 4.5C7 3.5 5.5 3 4 3c-1 0-2 1-2 2 0 2 1 3 2 4m10-4.5C15 3.5 16.5 3 18 3c1 0 2 1 2 2 0 2-1 3-2 4M4 9c0 3 2 6 5 7 1 .5 2 .5 3 .5s2 0 3-.5c3-1 5-4 5-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Verduras
export const VegetableIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M12 2C8 2 4 4 4 8c0 2 1 4 2 5l6 9 6-9c1-1 2-3 2-5 0-4-4-6-8-6z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M12 2C8 2 4 4 4 8c0 2 1 4 2 5l6 9 6-9c1-1 2-3 2-5 0-4-4-6-8-6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M12 2v6M9 5l3-3 3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

// Proteínas
export const ProteinIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <ellipse cx="12" cy="14" rx="8" ry="7" fill="currentColor" opacity="0.2" />
    <path
      d="M12 7c-4 0-8 3-8 7s4 7 8 7 8-3 8-7-4-7-8-7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M8 14c0-2 2-4 4-4s4 2 4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </Icon>
);

// Cereales y granos
export const GrainIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M12 2v20M7 7l5-5 5 5M7 12l5-3 5 3M7 17l5-3 5 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="7" cy="7" r="1.5" fill="currentColor" />
    <circle cx="17" cy="7" r="1.5" fill="currentColor" />
    <circle cx="7" cy="12" r="1.5" fill="currentColor" />
    <circle cx="17" cy="12" r="1.5" fill="currentColor" />
    <circle cx="7" cy="17" r="1.5" fill="currentColor" />
    <circle cx="17" cy="17" r="1.5" fill="currentColor" />
  </Icon>
);

// Lácteos
export const DairyIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M6 2h12l-2 8v8c0 2-1 4-4 4s-4-2-4-4v-8L6 2z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M6 2h12M18 2l-2 8M6 2l2 8M16 10v8c0 2-1 4-4 4s-4-2-4-4v-8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Leguminosas
export const LegumeIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M6 12c0-4 3-8 6-8s6 4 6 8-3 8-6 8-6-4-6-8z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M6 12c0-4 3-8 6-8s6 4 6 8-3 8-6 8-6-4-6-8z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M12 4c-2 0-4 2-4 5s2 5 4 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </Icon>
);

// Grasas saludables
export const HealthyFatIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M12 22c-5 0-9-4-9-9 0-3 1-5 3-7 2-2 4-3 6-4 2 1 4 2 6 4 2 2 3 4 3 7 0 5-4 9-9 9z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M12 22c-5 0-9-4-9-9 0-3 1-5 3-7 2-2 4-3 6-4 2 1 4 2 6 4 2 2 3 4 3 7 0 5-4 9-9 9z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="12" cy="14" r="3" fill="currentColor" />
  </Icon>
);

// Bebidas
export const BeverageIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M7 2h10l-1 20H8L7 2z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M7 2h10M7 2l1 20h8l1-20M6 8h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M18 8c2 0 2 2 2 3s0 3-2 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </Icon>
);

// Alimentos altos en calorías
export const HighCalorieIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1" />
    <path
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M12 8v5M12 16h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
);
