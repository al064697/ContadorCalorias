# 🎨 Sistema de Iconos Personalizados

El sistema de iconos del Contador de Calorías proporciona componentes SVG reutilizables y consistentes que reemplazan los emojis tradicionales, ofreciendo una identidad visual profesional y moderna.

---

## 📂 Estructura del Sistema

```
src/components/icons/
├── Icon.tsx                    # Componente base
├── Icon.css                    # Estilos base
├── TrafficLightIcons.tsx       # Semáforo nutricional
├── CategoryIcons.tsx           # Categorías de alimentos
├── MacroIcons.tsx              # Macronutrientes (C/P/G)
├── StatusIcons.tsx             # Estados y feedback
├── NavigationIcons.tsx         # Navegación y UI
└── index.ts                    # Barrel export
```

---

## 🎯 Componente Base: Icon

Todos los iconos heredan del componente `Icon` que proporciona props consistentes:

```typescript
interface IconProps {
  size?: number        // Tamaño en px (default: 24)
  color?: string       // Color CSS (default: 'currentColor')
  className?: string   // Clases CSS adicionales
  onClick?: () => void // Handler de click
}
```

### Ejemplo de Uso

```tsx
import { TargetIcon } from '@/components/icons';

<TargetIcon size={32} color="#10b981" />
```

---

## 🚦 Iconos de Semáforo Nutricional

Sistema de clasificación visual de alimentos basado en la Guía Nutricional Mexicana.

### GreenLightIcon 🟢
**Uso:** Alimentos de consumo libre  
**Características:** 
- Círculo verde con check ✓
- Representa alimentos saludables y nutritivos
- Color: `#10b981` (verde esmeralda)

**Aplicación:** Frutas, verduras, proteínas magras, leguminosas

```tsx
<GreenLightIcon size={20} />
```

### YellowLightIcon 🟡
**Uso:** Alimentos de consumo moderado  
**Características:**
- Círculo amarillo con signo de exclamación !
- Indica control de porciones necesario
- Color: `#f59e0b` (ámbar)

**Aplicación:** Grasas saludables, carbohidratos complejos, lácteos

```tsx
<YellowLightIcon size={20} />
```

### RedLightIcon 🔴
**Uso:** Alimentos para evitar o limitar  
**Características:**
- Círculo rojo con X
- Señala consumo ocasional
- Color: `#ef4444` (rojo coral)

**Aplicación:** Alimentos procesados, bebidas azucaradas, comida rápida

```tsx
<RedLightIcon size={20} />
```

---

## 🍎 Iconos de Categorías de Alimentos

Representación visual de los 9 grupos alimenticios principales.

### FruitIcon
**Representación:** Forma estilizada de fruta  
**Categoría:** Frutas frescas

### VegetableIcon
**Representación:** Hoja vegetal  
**Categoría:** Verduras y hortalizas

### ProteinIcon
**Representación:** Forma oval (huevo/proteína)  
**Categoría:** Carnes, pescados, huevos

### GrainIcon
**Representación:** Espigas de trigo  
**Categoría:** Cereales, granos, tubérculos

### DairyIcon
**Representación:** Botella de leche  
**Categoría:** Lácteos y derivados

### LegumeIcon
**Representación:** Legumbre (frijol)  
**Categoría:** Leguminosas (frijoles, lentejas)

### HealthyFatIcon
**Representación:** Aguacate estilizado  
**Categoría:** Grasas saludables (nueces, aceites)

### BeverageIcon
**Representación:** Vaso/taza  
**Categoría:** Bebidas

### HighCalorieIcon
**Representación:** Círculo de advertencia  
**Categoría:** Alimentos altos en calorías

---

## 📊 Iconos de Macronutrientes

Badges visuales para identificar macronutrientes en alimentos.

### CarbIcon (C)
**Macronutriente:** Carbohidratos  
**Color:** Naranja (`#f59e0b`)  
**Diseño:** Badge cuadrado con letra "C"

### ProteinBadgeIcon (P)
**Macronutriente:** Proteínas  
**Color:** Azul (`#3b82f6`)  
**Diseño:** Badge cuadrado con letra "P"

### FatIcon (G)
**Macronutriente:** Grasas  
**Color:** Verde (`#10b981`)  
**Diseño:** Badge cuadrado con letra "G"

**Uso en lista de alimentos:**

```tsx
<span className="macro-badge macro-badge-carbs">
  <CarbIcon size={16} />
  45.2g
</span>
```

---

## ✅ Iconos de Estado y Feedback

Mensajes motivacionales y estados del progreso.

### TargetIcon 🎯
**Estado:** Objetivo alcanzado / Excelente  
**Contexto:** Progreso en rango óptimo (90-110%)  
**Diseño:** Diana con punto central

### StrengthIcon 💪
**Estado:** Fortaleza / Bien hecho  
**Contexto:** Mensajes de ánimo  
**Diseño:** Bícep estilizado

### TrendUpIcon 📈
**Estado:** Exceso calórico  
**Contexto:** Consumo >110% de meta  
**Diseño:** Flecha ascendente

### TrendDownIcon 📉
**Estado:** Déficit calórico  
**Contexto:** Consumo <90% de meta  
**Diseño:** Flecha descendente

### AppleIcon 🍎
**Estado:** Necesitas energía  
**Contexto:** Recordatorio de alimentación  
**Diseño:** Manzana estilizada

### EnergyIcon ⚡
**Estado:** Energía / Calorías  
**Contexto:** Representación de calorías  
**Diseño:** Rayo eléctrico

### FireIcon 🔥
**Estado:** Metabolismo / Calorías quemadas  
**Contexto:** TMB, TDEE, actividad  
**Diseño:** Llama

### CheckCircleIcon ✅
**Estado:** Completado / Éxito  
**Contexto:** Confirmaciones  
**Diseño:** Círculo con check

---

## 🧭 Iconos de Navegación y UI

Elementos de interfaz y acciones del usuario.

### DashboardIcon
**Función:** Ir al dashboard / Inicio  
**Diseño:** Grid de 4 cuadrados

### HistoryIcon
**Función:** Ver historial  
**Diseño:** Gráfica ascendente

### SettingsIcon
**Función:** Configuración  
**Diseño:** Engranaje

### UserIcon
**Función:** Perfil de usuario  
**Diseño:** Silueta de persona

### LogoutIcon
**Función:** Cerrar sesión  
**Diseño:** Puerta con flecha

### PlusIcon
**Función:** Agregar elemento  
**Diseño:** Símbolo +

### TrashIcon
**Función:** Eliminar elemento  
**Diseño:** Bote de basura

### EditIcon
**Función:** Editar  
**Diseño:** Lápiz

### SaveIcon
**Función:** Guardar cambios  
**Diseño:** Diskette

### SearchIcon
**Función:** Buscar  
**Diseño:** Lupa

### SunIcon ☀️
**Función:** Tema claro  
**Diseño:** Sol con rayos

### MoonIcon 🌙
**Función:** Tema oscuro  
**Diseño:** Luna creciente

### ClockIcon 🕐
**Función:** Hora / Tiempo  
**Diseño:** Reloj analógico

### CalendarIcon 📅
**Función:** Fecha  
**Diseño:** Calendario

### InfoIcon ℹ️
**Función:** Información  
**Diseño:** i en círculo

---

## 🎨 Uso en Componentes

### Dashboard

```tsx
// Navegación
<EnergyIcon size={28} color="var(--accent)" />
<HistoryIcon size={18} />
<UserIcon size={18} />
<SunIcon size={18} /> / <MoonIcon size={18} />
<LogoutIcon size={18} />

// Bienvenida
<StrengthIcon size={32} color="var(--accent)" />

// Feedback motivacional
{motivational.type === 'excellent' && <TargetIcon size={24} color="#10b981" />}
{motivational.type === 'over' && <TrendUpIcon size={24} color="#ef4444" />}
{motivational.type === 'under' && <AppleIcon size={24} color="#f59e0b" />}

// Lista de alimentos
<GreenLightIcon size={20} /> // Semáforo
<ClockIcon size={14} /> // Hora de registro
<TrashIcon size={16} /> // Eliminar

// Macronutrientes
<CarbIcon size={16} />
<ProteinBadgeIcon size={16} />
<FatIcon size={16} />
```

### History

```tsx
<HistoryIcon size={32} color="var(--accent)" />
<CalendarIcon size={18} />
<EnergyIcon size={16} />
```

### Settings

```tsx
<SettingsIcon size={32} color="var(--accent)" />
<UserIcon size={20} />
<SunIcon size={18} /> / <MoonIcon size={18} />
```

---

## 🎨 Personalización de Estilos

### Variables CSS Utilizadas

```css
--accent: #6366f1      /* Color principal */
--success: #10b981     /* Verde (éxito) */
--warning: #f59e0b     /* Amarillo (advertencia) */
--danger: #ef4444      /* Rojo (peligro) */
--text: color principal del texto
--text-muted: color de texto secundario
```

### Clases CSS

```css
.icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.icon:hover {
  opacity: 0.8;
}

.icon.clickable:active {
  transform: scale(0.95);
}
```

---

## ✨ Ventajas del Sistema de Iconos SVG

### 1. **Escalabilidad Perfecta**
- Los iconos SVG se ven nítidos en cualquier tamaño
- No se pixelan en pantallas de alta resolución (Retina, 4K)
- Responsive: se adaptan al tamaño del contenedor

### 2. **Personalización Total**
- Color dinámico mediante props
- Tamaño preciso en píxeles
- Compatible con temas (claro/oscuro)
- currentColor hereda color del padre

### 3. **Rendimiento**
- Peso mínimo (~1-2KB por icono)
- No requiere cargar fuentes externas
- Se empaquetan en el bundle final
- Tree-shaking: solo se incluyen los iconos usados

### 4. **Accesibilidad**
- Compatibles con lectores de pantalla
- aria-label para contexto
- onClick para interactividad
- Contraste adecuado en ambos temas

### 5. **Consistencia Visual**
- Diseño unificado en toda la app
- Mismo grosor de línea (strokeWidth: 1.5)
- Mismo viewBox (24x24)
- Paleta de colores consistente

### 6. **Mantenibilidad**
- Centralizados en un solo módulo
- Fácil actualización
- Barrel export para imports simples
- TypeScript para type safety

---

## 📝 Guía de Implementación

### Paso 1: Importar

```tsx
import { 
  GreenLightIcon, 
  CarbIcon, 
  TargetIcon 
} from '@/components/icons';
```

### Paso 2: Usar en JSX

```tsx
<GreenLightIcon size={20} />
```

### Paso 3: Personalizar

```tsx
<TargetIcon 
  size={32} 
  color="var(--accent)" 
  onClick={() => console.log('clicked')}
  className="custom-icon"
/>
```

---

## 🔄 Migración de Emojis a Iconos

### Antes (Emojis)

```tsx
<h2>🥗 Contador de Calorías</h2>
<span>{getTrafficLightEmoji(entry.trafficLight)}</span>
<button>× Eliminar</button>
```

### Después (Iconos SVG)

```tsx
<h2>
  <EnergyIcon size={28} color="var(--accent)" />
  Contador de Calorías
</h2>
<span>{getTrafficLightIcon(entry.trafficLight)}</span>
<button>
  <TrashIcon size={16} />
  Eliminar
</button>
```

---

## 🎯 Mejores Prácticas

### 1. Tamaños Recomendados
- **Navegación:** 18px
- **Títulos:** 28-32px
- **Inline (texto):** 14-16px
- **Botones:** 16-20px
- **Badges:** 16px

### 2. Colores
- Usar variables CSS para consistencia
- `currentColor` para heredar del padre
- Colores específicos para estados

### 3. Accesibilidad
- Agregar `aria-label` en iconos clickeables
- Combinar con texto cuando sea posible
- Asegurar contraste mínimo 4.5:1

### 4. Performance
- Importar solo iconos necesarios
- No usar inline styles excesivos
- Aprovechar tree-shaking

---

## 📈 Roadmap Futuro

- [ ] Iconos animados (loading spinners)
- [ ] Variantes filled vs outlined
- [ ] Más categorías de alimentos
- [ ] Iconos de actividad física
- [ ] Badges de logros
- [ ] Exportar como biblioteca independiente

---

**Versión:** 1.0.0  
**Fecha:** Noviembre 2025  
**Diseñado por:** al064697  
**Total de iconos:** 40+
