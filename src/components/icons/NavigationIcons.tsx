/**
 * Iconos de navegación y acciones
 * UI común del sistema
 */

import React from 'react';
import { Icon, IconProps } from './Icon';

// Dashboard / Inicio
export const DashboardIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </Icon>
);

// Historial / Gráfica
export const HistoryIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M3 3v18h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M7 14l4-4 3 3 5-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Configuración
export const SettingsIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Icon>
);

// Usuario / Perfil
export const UserIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M5 20c0-4 3-7 7-7s7 3 7 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </Icon>
);

// Cerrar sesión
export const LogoutIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Agregar / Plus
export const PlusIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Icon>
);

// Eliminar / Trash
export const TrashIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Editar / Pencil
export const EditIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M17 3l4 4L7 21H3v-4L17 3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Guardar / Save
export const SaveIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M7 3v6h8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

// Buscar / Search
export const SearchIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M21 21l-4.35-4.35"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Icon>
);

// Sol / Tema claro
export const SunIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Icon>
);

// Luna / Tema oscuro
export const MoonIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

// Reloj / Tiempo
export const ClockIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M12 6v6l4 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Icon>
);

// Calendario
export const CalendarIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M16 2v4M8 2v4M3 10h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Icon>
);

// Info / Información
export const InfoIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M12 16v-4M12 8h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
);
