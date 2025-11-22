/**
 * Barrel export de todos los iconos del sistema
 * Simplifica las importaciones: import { GreenLightIcon, CarbIcon } from '@/components/icons'
 */

// Iconos base
export { Icon } from './Icon';
export type { IconProps } from './Icon';

// Semáforo nutricional
export { GreenLightIcon, YellowLightIcon, RedLightIcon } from './TrafficLightIcons';

// Categorías de alimentos
export {
  FruitIcon,
  VegetableIcon,
  ProteinIcon,
  GrainIcon,
  DairyIcon,
  LegumeIcon,
  HealthyFatIcon,
  BeverageIcon,
  HighCalorieIcon
} from './CategoryIcons';

// Macronutrientes
export { CarbIcon, ProteinBadgeIcon, FatIcon } from './MacroIcons';

// Estado y feedback
export {
  TargetIcon,
  StrengthIcon,
  TrendUpIcon,
  TrendDownIcon,
  SweatIcon,
  AppleIcon,
  CheckCircleIcon,
  EnergyIcon,
  FireIcon
} from './StatusIcons';

// Navegación y acciones
export {
  DashboardIcon,
  HistoryIcon,
  SettingsIcon,
  UserIcon,
  LogoutIcon,
  PlusIcon,
  TrashIcon,
  EditIcon,
  SaveIcon,
  SearchIcon,
  SunIcon,
  MoonIcon,
  ClockIcon,
  CalendarIcon,
  InfoIcon
} from './NavigationIcons';
