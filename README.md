# Contador de Calorías

Aplicación web para monitoreo de nutrición con cálculos metabólicos científicos. Desarrollada con React 18 + TypeScript.

---

## Documentación Adicional

- **[Documentación](https://drive.google.com/file/d/1brPudKAjq-iHnfHoCAMhw8vOZXqpyIoF/view?usp=sharing)**: Documentación (PDF)
- **[Manual de Usuario](https://drive.google.com/file/d/1B0EewkJ_KJza9Vf3rE2dIULF88g3pGUd/view?usp=sharing)**: Guía completa para usuarios finales (PDF)
- **[ICONOS.md](./ICONOS.md)**: Documentación del sistema de iconos SVG

---

## Características

### Cálculos Metabólicos
- **TMB (Tasa Metabólica Basal)**: Ecuación Harris-Benedict revisada
- **TDEE (Gasto Energético Total)**: TMB ajustado por nivel de actividad
- **IMC**: Clasificación según estándares OMS
- **Metas personalizadas**: Mantenimiento, déficit (-15%), superávit (+15%)

### Seguimiento Nutricional
- **Base de datos**: 80+ alimentos comunes con información nutricional completa
- **Macronutrientes**: Tracking de carbohidratos (55%), proteínas (20%), grasas (25%)
- **Semáforo nutricional**: Clasificación verde/amarillo/rojo por calidad
- **Registro diario**: Historial completo con análisis por fecha

### Interfaz
- **Dashboard interactivo**: Círculo de progreso, estadísticas del día, gráficas de macros
- **Sistema de iconos**: 40+ iconos SVG personalizados organizados en categorías
- **Temas**: Modo claro y oscuro con persistencia
- **Responsive**: Diseño adaptable a móviles, tablets y desktop

---

## Tecnologías

**Frontend:**
- React 18.2 (Hooks, Context API)
- TypeScript 5.1
- React Router 6.20
- Recharts 2.10 (gráficas)
- React Circular Progressbar 2.1

**Herramientas:**
- Vite 5.0 (build tool)
- ESLint + Prettier
- Vitest + Testing Library

**Persistencia:**
- LocalStorage para datos de usuario y logs

---

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/al064697/ContadorCalorias.git
cd ContadorCalorias

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview producción
npm run preview

# Tests
npm test
```

---

## Arquitectura

```
src/
├── components/         # Componentes reutilizables
│   ├── icons/         # Sistema de iconos SVG
│   └── ui/            # Componentes UI base
├── contexts/          # React Context (Auth, Theme)
├── data/              # Base de datos de alimentos
├── hooks/             # Custom hooks
├── pages/             # Páginas principales
├── types/             # TypeScript interfaces
└── utils/             # Funciones helper
```

### Componentes Principales

**`Dashboard.tsx`**: Panel principal con círculo de progreso, estadísticas y registro de alimentos

**`History.tsx`**: Historial de días con logs expandibles

**`Settings.tsx`**: Configuración de perfil y preferencias

**`MacronutrientBars.tsx`**: Barras de progreso de macros

### Contextos

**`AuthContext`**: Gestión de autenticación y perfil de usuario

**`ThemeContext`**: Tema visual (light/dark)

### Custom Hooks

**`useCaloriesCalculator`**: Cálculos metabólicos (TMB, TDEE, IMC)

**`useDailyLog`**: Gestión de registro diario de alimentos

---

## Fórmulas Principales

### Tasa Metabólica Basal (TMB)
```typescript
// Hombres
TMB = 88.362 + (13.397 × peso_kg) + (4.799 × altura_cm) - (5.677 × edad)

// Mujeres
TMB = 447.593 + (9.247 × peso_kg) + (3.098 × altura_cm) - (4.330 × edad)
```

### Gasto Energético Total (TDEE)
```typescript
TDEE = TMB × factor_actividad

Factores:
- Sedentario: 1.2
- Ligero: 1.375
- Moderado: 1.55
- Activo: 1.725
- Muy Activo: 1.9
```

### Índice de Masa Corporal (IMC)
```typescript
IMC = peso_kg / (altura_m)²

Categorías:
- < 18.5: Bajo peso
- 18.5-24.9: Normal
- 25-29.9: Sobrepeso
- ≥ 30: Obesidad
```

### Macronutrientes
```typescript
Carbohidratos = (calorías × 0.55) / 4  // gramos
Proteínas = (calorías × 0.20) / 4      // gramos
Grasas = (calorías × 0.25) / 9         // gramos
```

---

## Sistema de Iconos

40+ iconos SVG personalizados organizados en 6 categorías:

- **Semáforo**: Verde, amarillo, rojo (indicadores nutricionales)
- **Categorías**: 9 tipos de alimentos (frutas, verduras, proteínas, etc.)
- **Macros**: Carbohidratos, proteínas, grasas
- **Estado**: Objetivo, fuerza, tendencias, energía
- **Navegación**: Dashboard, historial, configuración, tema
- **Acciones**: Agregar, eliminar, editar, guardar

**Componente base**: `Icon.tsx` con props TypeScript para tamaño, color y eventos

Ver documentación completa en [ICONOS.md](./ICONOS.md)

---

## Base de Datos de Alimentos

80+ alimentos organizados por categorías:

- **Frutas**: Manzana, plátano, naranja, etc.
- **Verduras**: Lechuga, espinaca, brócoli, etc.
- **Proteínas**: Pollo, res, pescado, huevos, etc.
- **Carbohidratos**: Arroz, pasta, pan, tortilla, etc.
- **Lácteos**: Leche, yogurt, queso, etc.
- **Legumbres**: Frijoles, lentejas, garbanzos, etc.
- **Grasas saludables**: Aguacate, nueces, aceite de oliva, etc.
- **Bebidas**: Agua, café, té, jugos, etc.
- **Alto en calorías**: Pizza, hamburguesa, refrescos, etc.

**Estructura de cada alimento:**
```typescript
{
  id: string
  name: string
  calories: number
  carbs: number
  protein: number
  fat: number
  serving: string
  category: string
  trafficLight: 'green' | 'yellow' | 'red'
}
```

---

## Persistencia de Datos

**LocalStorage** con claves organizadas:

```typescript
'cc_users'           // Usuarios registrados
'cc_currentUser'     // Usuario activo
'cc_dailyLogs'       // Logs de alimentos por día
'cc_theme'           // Preferencia de tema
```

**Formato de logs:**
```typescript
{
  userId: string
  date: string        // YYYY-MM-DD
  entries: FoodEntry[]
  totalCalories: number
  macros: { carbs, protein, fat }
}
```

---

## Responsive Design

**Breakpoints:**
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

**Adaptaciones:**
- Grid columns ajustables (2→1)
- Navegación responsive
- Tipografía escalable
- Espaciados optimizados

---

## Temas

**Variables CSS dinámicas:**

```css
/* Light Mode */
--bg-primary: #ffffff
--bg-secondary: #f8f9fa
--text: #1f2937
--accent: #3b82f6

/* Dark Mode */
--bg-primary: #1f2937
--bg-secondary: #111827
--text: #f9fafb
--accent: #60a5fa
```

**Transiciones suaves** en todos los elementos para cambios de tema fluidos.

---

## Testing

```bash
# Ejecutar todos los tests
npm test

# Coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

**Framework**: Vitest + Testing Library

---

## Deployment

**Vercel** (configuración en `vercel.json`):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

**Build optimizado:**
- Code splitting
- Tree shaking
- Minificación
- Gzip compression

---

## Casos de Uso

### 1. Registro de Usuario Nuevo
```
Usuario ingresa → Completa formulario → Sistema calcula TMB/TDEE → Perfil guardado
```

### 2. Agregar Alimento
```
Buscar alimento → Seleccionar → Ajustar porciones → Agregar → Actualiza totales
```

### 3. Visualizar Progreso
```
Dashboard muestra círculo (% meta) → Macros en barras → Lista de alimentos → Mensaje motivacional
```

### 4. Revisar Historial
```
Navegar a historial → Seleccionar día → Ver detalles expandidos → Analizar consumo
```

---

## Contribuciones

Este proyecto es de código abierto. Para contribuir:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: agregar funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Autor

**Sebastian E Rios Fuentes**
- GitHub: [@al064697](https://github.com/al064697)
- Repositorio: [ContadorCalorias](https://github.com/al064697/ContadorCalorias)

---

Si este proyecto te fue útil, considera darle una estrella en GitHub
