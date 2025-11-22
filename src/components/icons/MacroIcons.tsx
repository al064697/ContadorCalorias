/**
 * Iconos de macronutrientes
 * Representación visual de carbohidratos, proteínas y grasas
 */

import React from 'react';
import { Icon, IconProps } from './Icon';

// Carbohidratos (C)
export const CarbIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" fill="#f59e0b" opacity="0.2" />
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      stroke="#f59e0b"
      strokeWidth="2"
      fill="none"
    />
    <text
      x="12"
      y="16"
      fontSize="12"
      fontWeight="bold"
      fill="#f59e0b"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      C
    </text>
  </Icon>
);

// Proteínas (P)
export const ProteinBadgeIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" fill="#3b82f6" opacity="0.2" />
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      stroke="#3b82f6"
      strokeWidth="2"
      fill="none"
    />
    <text
      x="12"
      y="16"
      fontSize="12"
      fontWeight="bold"
      fill="#3b82f6"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      P
    </text>
  </Icon>
);

// Grasas (G)
export const FatIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" fill="#10b981" opacity="0.2" />
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      stroke="#10b981"
      strokeWidth="2"
      fill="none"
    />
    <text
      x="12"
      y="16"
      fontSize="12"
      fontWeight="bold"
      fill="#10b981"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      G
    </text>
  </Icon>
);
