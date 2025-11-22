# 📚 Documentación Técnica - Contador de Calorías

## 📋 Índice

1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Módulos Principales](#módulos-principales)
6. [Flujo de Datos](#flujo-de-datos)
7. [Componentes UI](#componentes-ui)
8. [Sistema de Autenticación](#sistema-de-autenticación)
9. [Gestión de Estado](#gestión-de-estado)
10. [Cálculos Nutricionales](#cálculos-nutricionales)
11. [Almacenamiento de Datos](#almacenamiento-de-datos)
12. [Guía de Instalación](#guía-de-instalación)
13. [Guía de Uso](#guía-de-uso)
14. [API Reference](#api-reference)
15. [Casos de Uso](#casos-de-uso)
16. [Troubleshooting](#troubleshooting)

---

## 📖 Descripción General

**Contador de Calorías** es una aplicación web moderna desarrollada con React y TypeScript que permite a los usuarios llevar un registro detallado de su consumo calórico diario y monitorear su nutrición de manera profesional.

### Características Principales

✅ **Seguimiento Calórico Completo**
- Registro diario de alimentos consumidos
- Cálculo automático de calorías totales
- Comparación con metas personalizadas

✅ **Sistema de Macronutrientes**
- Seguimiento de carbohidratos, proteínas y grasas
- Distribución automática basada en estándares nutricionales
- Barras de progreso visuales para cada macro

✅ **Semáforo Nutricional**
- Clasificación de alimentos: 🟢 Verde (saludable), 🟡 Amarillo (moderado), 🔴 Rojo (evitar)
- Basado en la Guía de Alimentos para la Población Mexicana
- Indicadores visuales en cada alimento

✅ **Cálculos Metabólicos Avanzados**
- TMB (Tasa Metabólica Basal) usando ecuación de Harris-Benedict
- TDEE (Gasto Energético Total Diario) según nivel de actividad
- IMC (Índice de Masa Corporal) con categorización automática
- Metas calóricas para mantener, perder o ganar peso

✅ **Base de Datos Nutricional**
- Más de 80 alimentos con información completa
- 12 categorías de alimentos
- Datos precisos de macronutrientes y fibra

✅ **Historial y Análisis**
- Gráficas de tendencias de 7 días
- Visualización de progreso con CircularProgressbar
- Estadísticas detalladas

✅ **Gestión de Perfil**
- Edición de datos personales
- Cambio de contraseña seguro
- Tema claro/oscuro

---

## 🏗️ Arquitectura del Sistema

### Patrón de Diseño

La aplicación sigue una arquitectura **Component-Based** con:

```
┌─────────────────────────────────────────┐
│           React Application              │
├─────────────────────────────────────────┤
│  Contexts (State Management)             │
│  ├── AuthContext (Usuario/Sesión)       │
│  └── ThemeContext (Tema claro/oscuro)   │
├─────────────────────────────────────────┤
│  Custom Hooks (Lógica de negocio)       │
│  ├── useCaloriesCalculator              │
│  ├── useDailyLog                         │
│  └── useHistoricalLogs                   │
├─────────────────────────────────────────┤
│  Pages (Vistas principales)              │
│  ├── Login                               │
│  ├── Register                            │
│  ├── Dashboard                           │
│  ├── History                             │
│  └── Settings                            │
├─────────────────────────────────────────┤
│  Components (UI reutilizable)            │
│  ├── Button                              │
│  ├── Card                                │
│  └── MacronutrientBars                   │
├─────────────────────────────────────────┤
│  Utils (Funciones auxiliares)            │
│  ├── calculations.ts                     │
│  └── constants.ts                        │
├─────────────────────────────────────────┤
│  Data (Fuentes de datos)                 │
│  └── foods.ts (Base de datos)            │
└─────────────────────────────────────────┘
           ↓
    ┌──────────────┐
    │ localStorage │
    └──────────────┘
```

### Flujo de Información

```
Usuario → Interfaz → Context/Hooks → Utils → localStorage
                ↓                      ↓
            Componentes ←────────── Cálculos
```

---

## 🛠️ Tecnologías Utilizadas

### Core

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.2.0 | Framework UI principal |
| **TypeScript** | 5.1.6 | Tipado estático |
| **Vite** | 5.0.8 | Build tool y dev server |
| **React Router** | 6.20.1 | Navegación SPA |

### Librerías UI

| Librería | Versión | Uso |
|----------|---------|-----|
| **react-circular-progressbar** | 2.1.0 | Círculo de progreso calórico |
| **recharts** | 2.10.3 | Gráficas de tendencias |
| **date-fns** | 3.0.6 | Manejo de fechas |

### Herramientas de Desarrollo

| Herramienta | Versión | Función |
|-------------|---------|---------|
| **ESLint** | 8.55.0 | Linting de código |
| **Prettier** | 3.1.1 | Formateo de código |
| **Vitest** | 1.1.0 | Testing framework |
| **TypeScript ESLint** | 6.15.0 | Reglas de linting para TS |

---

## 📁 Estructura del Proyecto

```
contador-calorias/
├── public/                          # Archivos estáticos
├── src/
│   ├── components/                  # Componentes reutilizables
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Botón personalizado
│   │   │   ├── Button.css
│   │   │   ├── Card.tsx            # Tarjeta contenedor
│   │   │   └── Card.css
│   │   ├── MacronutrientBars.tsx   # Barras de macros
│   │   └── MacronutrientBars.css
│   │
│   ├── contexts/                    # Context API providers
│   │   ├── AuthContext.tsx         # Autenticación y usuario
│   │   └── ThemeContext.tsx        # Tema claro/oscuro
│   │
│   ├── data/                        # Datos estáticos
│   │   └── foods.ts                # Base de datos de alimentos
│   │
│   ├── hooks/                       # Custom hooks
│   │   ├── useCaloriesCalculator.ts # Cálculos metabólicos
│   │   └── useDailyLog.ts          # Gestión de registro diario
│   │
│   ├── pages/                       # Páginas principales
│   │   ├── Login.tsx               # Página de inicio de sesión
│   │   ├── Register.tsx            # Página de registro
│   │   ├── Dashboard.tsx           # Panel principal
│   │   ├── Dashboard.css
│   │   ├── History.tsx             # Historial y gráficas
│   │   ├── History.css
│   │   ├── Settings.tsx            # Configuración de perfil
│   │   ├── Settings.css
│   │   └── Auth.css                # Estilos compartidos auth
│   │
│   ├── utils/                       # Utilidades
│   │   ├── calculations.ts         # Funciones de cálculo
│   │   └── constants.ts            # Constantes globales
│   │
│   ├── types.ts                     # Definiciones TypeScript
│   ├── styles.css                   # Estilos globales
│   ├── App.tsx                      # Componente raíz
│   └── main.tsx                     # Punto de entrada
│
├── .eslintrc.cjs                    # Configuración ESLint
├── .prettierrc                      # Configuración Prettier
├── .gitignore                       # Archivos ignorados por Git
├── index.html                       # HTML base
├── package.json                     # Dependencias
├── tsconfig.json                    # Configuración TypeScript
├── vite.config.ts                   # Configuración Vite
├── vitest.config.ts                 # Configuración Vitest
├── README.md                        # Documentación básica
├── MEJORAS_NUTRICIONALES.md         # Log de mejoras
└── DOCUMENTACION.md                 # Este archivo
```

---

## 🧩 Módulos Principales

### 1. Sistema de Tipos (`types.ts`)

Define todas las interfaces y tipos TypeScript del proyecto:

#### **User** - Información del usuario
```typescript
interface User {
  id: string              // ID único
  email: string           // Email (usado para login)
  password: string        // Contraseña (hasheada en producción)
  name: string            // Nombre completo
  age: number             // Edad en años
  weight: number          // Peso en kg
  height: number          // Altura en cm
  gender: Gender          // 'male' | 'female'
  activityLevel: ActivityLevel  // Nivel de actividad física
}
```

#### **Food** - Alimento en la base de datos
```typescript
interface Food {
  id: string              // ID único
  name: string            // Nombre del alimento
  calories: number        // Kilocalorías por porción
  carbs: number           // Carbohidratos en gramos
  protein: number         // Proteínas en gramos
  fat: number             // Grasas totales en gramos
  fiber?: number          // Fibra en gramos (opcional)
  trafficLight: TrafficLight    // 'green' | 'yellow' | 'red'
  fatType?: FatType       // Tipo de grasa predominante
  category: FoodCategory  // Categoría del alimento
  servingSize: string     // Tamaño de porción
}
```

#### **DailyLog** - Registro de un día
```typescript
interface DailyLog {
  date: string            // Formato: 'YYYY-MM-DD'
  userId: string          // ID del usuario
  entries: FoodEntry[]    // Alimentos consumidos
  totalCalories: number   // Calorías totales del día
  totalCarbs: number      // Carbohidratos totales
  totalProtein: number    // Proteínas totales
  totalFat: number        // Grasas totales
  targetCalories: number  // Meta de calorías
  targetCarbs: number     // Meta de carbohidratos
  targetProtein: number   // Meta de proteínas
  targetFat: number       // Meta de grasas
}
```

#### **CalorieGoals** - Metas metabólicas
```typescript
interface CalorieGoals {
  bmr: number             // Tasa Metabólica Basal
  tdee: number            // Gasto Energético Total Diario
  deficit: number         // Calorías para perder peso (-15%)
  surplus: number         // Calorías para ganar peso (+15%)
  imc: number             // Índice de Masa Corporal
  weightCategory: WeightCategory  // Categoría de peso
  carbs: number           // Meta de carbohidratos (g)
  protein: number         // Meta de proteínas (g)
  fat: number             // Meta de grasas (g)
}
```

---

### 2. Cálculos Nutricionales (`utils/calculations.ts`)

Contiene todas las funciones matemáticas y algoritmos nutricionales:

#### **calculateBMR()** - Tasa Metabólica Basal

Calcula las calorías que el cuerpo quema en reposo usando la **Ecuación de Harris-Benedict**:

```typescript
function calculateBMR(
  weight: number,    // Peso en kg
  height: number,    // Altura en cm
  age: number,       // Edad en años
  gender: Gender     // 'male' | 'female'
): number
```

**Fórmulas:**
- **Hombres:** `88.362 + (13.397 × peso) + (4.799 × altura) - (5.677 × edad)`
- **Mujeres:** `447.593 + (9.247 × peso) + (3.098 × altura) - (4.330 × edad)`

**Ejemplo:**
```typescript
// Hombre de 25 años, 70kg, 175cm
calculateBMR(70, 175, 25, 'male')
// Resultado: ~1,684 kcal/día
```

#### **calculateTDEE()** - Gasto Total Diario

Multiplica el BMR por un factor de actividad:

```typescript
function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number
```

**Multiplicadores:**
- Sedentario: 1.2 (poco o ningún ejercicio)
- Ligero: 1.375 (ejercicio 1-3 días/semana)
- Moderado: 1.55 (ejercicio 3-5 días/semana)
- Activo: 1.725 (ejercicio 6-7 días/semana)
- Muy Activo: 1.9 (ejercicio intenso diario)

#### **calculateIMC()** - Índice de Masa Corporal

```typescript
function calculateIMC(weight: number, height: number): number
```

**Fórmula:** `IMC = peso (kg) / altura (m)²`

**Clasificación OMS:**
- < 18.5: Bajo peso
- 18.5 - 24.9: Normal
- 25 - 29.9: Sobrepeso
- ≥ 30: Obesidad

#### **calculateMacroTargets()** - Distribución de Macronutrientes

Calcula la distribución en gramos según estándares nutricionales:

```typescript
function calculateMacroTargets(totalCalories: number): {
  carbs: number,
  protein: number,
  fat: number
}
```

**Distribución:**
- Carbohidratos: 55% de calorías ÷ 4 kcal/g
- Proteínas: 20% de calorías ÷ 4 kcal/g
- Grasas: 25% de calorías ÷ 9 kcal/g

**Ejemplo:**
```typescript
calculateMacroTargets(2000)
// Resultado: { carbs: 275g, protein: 100g, fat: 56g }
```

---

### 3. Context API

#### **AuthContext** - Gestión de Autenticación

Provee funcionalidades de autenticación global:

```typescript
interface AuthContextType {
  user: User | null                    // Usuario actual
  login: (email: string, password: string) => boolean
  logout: () => void
  register: (userData: Omit<User, 'id'>) => boolean
  updateUser: (userData: Partial<User>) => void
}
```

**Funciones principales:**

1. **login()** - Inicio de sesión
   - Busca usuario en localStorage
   - Valida credenciales
   - Establece sesión activa

2. **register()** - Registro de usuario
   - Valida email único
   - Genera ID único
   - Guarda en localStorage

3. **updateUser()** - Actualizar perfil
   - Modifica datos del usuario
   - Recalcula metas metabólicas
   - Persiste cambios

#### **ThemeContext** - Gestión de Tema

Maneja el tema visual (claro/oscuro):

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
```

---

### 4. Custom Hooks

#### **useCaloriesCalculator** - Calculadora Metabólica

Hook que calcula automáticamente todas las metas del usuario:

```typescript
function useCaloriesCalculator(user: User | null): CalorieGoals | null
```

**Proceso:**
1. Recibe datos del usuario (peso, altura, edad, género, actividad)
2. Calcula BMR usando Harris-Benedict
3. Calcula TDEE según nivel de actividad
4. Calcula IMC y categoría de peso
5. Calcula distribución de macronutrientes
6. Retorna objeto con todas las metas

**Uso:**
```typescript
const goals = useCaloriesCalculator(user)
// goals.tdee → 2,000 kcal
// goals.carbs → 275g
// goals.imc → 22.5
```

#### **useDailyLog** - Gestión del Registro Diario

Maneja el CRUD de alimentos consumidos:

```typescript
function useDailyLog(
  userId: string | undefined,
  targetCalories: number,
  targetMacros?: { carbs: number; protein: number; fat: number }
): {
  todayLog: DailyLog | null,
  addEntry: (entry: FoodEntry) => void,
  removeEntry: (entryId: string) => void
}
```

**Características:**
- Auto-carga del registro del día actual
- Crea registro nuevo si no existe
- Actualiza totales automáticamente
- Persiste en localStorage
- Calcula macros en tiempo real

#### **useHistoricalLogs** - Historial de Registros

Recupera registros de días anteriores:

```typescript
function useHistoricalLogs(
  userId: string | undefined,
  days: number = 7
): DailyLog[]
```

---

## 🎨 Componentes UI

### Button Component

Botón reutilizable con variantes:

```typescript
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}
```

**Variantes:**
- `primary`: Botón principal con color de acento
- `secondary`: Botón secundario con borde
- `ghost`: Botón transparente

### Card Component

Contenedor con estilo glassmorphism:

```typescript
interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
}
```

### MacronutrientBars Component

Barras de progreso para macronutrientes:

```typescript
interface MacronutrientBarsProps {
  consumed: { carbs: number; protein: number; fat: number }
  target: { carbs: number; protein: number; fat: number }
}
```

**Características:**
- Barras con gradientes de color
- Indicador de porcentaje
- Valores consumido/meta
- Responsive

---

## 💾 Almacenamiento de Datos

### localStorage Schema

#### **users** - Lista de usuarios
```json
[
  {
    "id": "1699123456789-abc123",
    "email": "user@example.com",
    "password": "hashed_password",
    "name": "Juan Pérez",
    "age": 25,
    "weight": 70,
    "height": 175,
    "gender": "male",
    "activityLevel": "moderate"
  }
]
```

#### **currentUser** - Usuario en sesión
```json
{
  "id": "1699123456789-abc123",
  "email": "user@example.com",
  ...
}
```

#### **dailyLogs** - Registros diarios
```json
[
  {
    "date": "2025-11-21",
    "userId": "1699123456789-abc123",
    "entries": [
      {
        "id": "entry-123",
        "foodId": "f1",
        "foodName": "Manzana",
        "calories": 52,
        "carbs": 14,
        "protein": 0.3,
        "fat": 0.2,
        "trafficLight": "green",
        "quantity": 1,
        "timestamp": "2025-11-21T08:30:00.000Z"
      }
    ],
    "totalCalories": 52,
    "totalCarbs": 14,
    "totalProtein": 0.3,
    "totalFat": 0.2,
    "targetCalories": 2000,
    "targetCarbs": 275,
    "targetProtein": 100,
    "targetFat": 56
  }
]
```

---

## 🚀 Guía de Instalación

### Requisitos Previos

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/al064697/ContadorCalorias.git
cd ContadorCalorias

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:5173
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia Vite dev server

# Producción
npm run build        # Compila para producción
npm run preview      # Preview del build

# Testing
npm run test         # Ejecuta tests con Vitest

# Linting
npm run lint         # Ejecuta ESLint
```

---

## 📖 Guía de Uso

### 1. Registro de Usuario

1. Accede a la aplicación
2. Click en "Crear cuenta"
3. Completa el formulario:
   - Email
   - Contraseña
   - Nombre completo
   - Edad (años)
   - Peso (kg)
   - Altura (cm)
   - Género
   - Nivel de actividad
4. Click en "Registrarse"

### 2. Dashboard Principal

El dashboard muestra:

**Círculo de Progreso:**
- Porcentaje de meta diaria cumplida
- Calorías consumidas vs meta
- Código de colores:
  - 🟢 Verde: 90-110% (óptimo)
  - 🔴 Rojo: >110% (exceso)
  - 🟡 Amarillo: <90% (insuficiente)

**Información Metabólica:**
- TMB: Calorías en reposo
- TDEE: Calorías de mantenimiento
- Déficit: Calorías para perder peso
- IMC: Índice de masa corporal

**Barras de Macronutrientes:**
- Carbohidratos (naranja)
- Proteínas (azul)
- Grasas (verde)
- Progreso visual de cada uno

### 3. Agregar Alimentos

1. Busca el alimento en el campo de búsqueda
2. Selecciona de la lista (80+ alimentos)
3. Ajusta cantidad de porciones
4. Click en "Agregar alimento"

Cada alimento muestra:
- 🟢🟡🔴 Semáforo nutricional
- Calorías
- Badges de macros (C, P, G)

### 4. Ver Historial

1. Click en "📊 Historial"
2. Visualiza:
   - Gráfica de 7 días
   - Tendencia de consumo
   - Promedio diario

### 5. Configurar Perfil

1. Click en "⚙️ Configuración"
2. Opciones disponibles:
   - Editar datos personales
   - Cambiar contraseña
   - Alternar tema claro/oscuro
   - Cerrar sesión

---

## 🔍 API Reference

### Funciones de Cálculo

#### `calculateBMR(weight, height, age, gender)`
Calcula la Tasa Metabólica Basal.

**Parámetros:**
- `weight`: número (kg)
- `height`: número (cm)
- `age`: número (años)
- `gender`: 'male' | 'female'

**Retorna:** número (kcal)

---

#### `calculateTDEE(bmr, activityLevel)`
Calcula el Gasto Energético Total Diario.

**Parámetros:**
- `bmr`: número (kcal)
- `activityLevel`: ActivityLevel

**Retorna:** número (kcal)

---

#### `calculateIMC(weight, height)`
Calcula el Índice de Masa Corporal.

**Parámetros:**
- `weight`: número (kg)
- `height`: número (cm)

**Retorna:** número (redondeado a 1 decimal)

---

#### `getWeightCategory(imc)`
Determina la categoría de peso según IMC.

**Parámetros:**
- `imc`: número

**Retorna:** WeightCategory ('underweight' | 'normal' | 'overweight' | 'obese')

---

#### `calculateMacroTargets(totalCalories)`
Calcula la distribución de macronutrientes.

**Parámetros:**
- `totalCalories`: número (kcal)

**Retorna:** `{ carbs: number, protein: number, fat: number }`

---

#### `getMacroDistribution(carbs, protein, fat)`
Calcula el porcentaje de cada macro.

**Parámetros:**
- `carbs`: número (gramos)
- `protein`: número (gramos)
- `fat`: número (gramos)

**Retorna:** `{ carbsPercent: number, proteinPercent: number, fatPercent: number }`

---

## 📊 Casos de Uso

### Caso de Uso 1: Usuario quiere perder peso

**Escenario:**
María, 30 años, 75kg, 165cm, sedentaria, quiere perder peso.

**Proceso:**
1. Registro con datos personales
2. Sistema calcula:
   - BMR: 1,456 kcal
   - TDEE: 1,747 kcal (sedentaria × 1.2)
   - Déficit: 1,485 kcal (-15%)
3. María sigue la meta de déficit
4. Registra alimentos diarios
5. Monitorea progreso en historial

**Resultado esperado:**
Pérdida de ~0.5kg/semana con déficit de 262 kcal/día

---

### Caso de Uso 2: Atleta monitorea macros

**Escenario:**
Carlos, 25 años, 80kg, 180cm, muy activo, necesita ganar masa muscular.

**Proceso:**
1. Registro como "muy activo"
2. Sistema calcula:
   - TDEE: 2,971 kcal
   - Superávit: 3,417 kcal (+15%)
   - Proteínas: 170g (20%)
   - Carbos: 471g (55%)
   - Grasas: 95g (25%)
3. Selecciona alimentos con alto contenido proteico (🟢 verde)
4. Monitorea barras de macros
5. Ajusta consumo según necesidad

---

### Caso de Uso 3: Usuario busca alimentación saludable

**Escenario:**
Ana quiere mejorar su alimentación sin contar calorías exactas.

**Proceso:**
1. Usa el semáforo nutricional
2. Prioriza alimentos 🟢 verdes:
   - Frutas (manzana, naranja, sandía)
   - Verduras (brócoli, espinaca, lechuga)
   - Proteínas magras (pollo, pescado)
3. Consume con moderación 🟡 amarillos:
   - Granos (arroz integral, avena)
   - Lácteos bajos en grasa
   - Grasas saludables (aguacate, nueces)
4. Evita 🔴 rojos:
   - Alimentos procesados
   - Alto en grasas saturadas
   - Bebidas azucaradas

---

## 🐛 Troubleshooting

### Problema: Los datos desaparecen al cerrar el navegador

**Causa:** localStorage solo persiste en el mismo navegador/dispositivo.

**Solución:**
- Usa siempre el mismo navegador
- Para persistencia entre dispositivos, considera migrar a backend (Supabase, Firebase)

---

### Problema: No se calculan las metas correctamente

**Verificar:**
1. Datos personales completos (peso, altura, edad)
2. Género seleccionado
3. Nivel de actividad apropiado

**Solución:**
- Ve a Configuración → Editar datos
- Actualiza información
- Las metas se recalculan automáticamente

---

### Problema: Error al agregar alimentos

**Causa:** Alimento no seleccionado o cantidad inválida.

**Solución:**
1. Selecciona un alimento de la lista
2. Asegúrate que cantidad > 0
3. El botón "Agregar" debe estar habilitado

---

### Problema: Gráficas no muestran datos

**Causa:** No hay registros de días anteriores.

**Solución:**
- Usa la aplicación durante varios días
- Las gráficas mostrarán tendencias de 7 días

---

## 🔐 Seguridad

### Consideraciones Actuales

⚠️ **Advertencia:** Esta aplicación almacena datos en localStorage sin encriptación. No usar para datos sensibles reales.

**Recomendaciones para producción:**
1. Implementar backend seguro
2. Encriptar contraseñas (bcrypt)
3. Usar HTTPS
4. Implementar JWT para sesiones
5. Validación de datos en servidor

---

## 🚀 Mejoras Futuras

### Alta Prioridad
- [ ] Backend con base de datos (PostgreSQL/MongoDB)
- [ ] Sistema de alertas nutricionales
- [ ] Menús sugeridos (1200/1500/2000 kcal)
- [ ] Sección educativa nutricional

### Media Prioridad
- [ ] Gráficas avanzadas de macros
- [ ] Análisis semanal/mensual
- [ ] Exportar datos a PDF/Excel
- [ ] Modo offline (PWA)

### Baja Prioridad
- [ ] Sistema de recetas
- [ ] Escaneo de códigos de barras
- [ ] Integración con wearables
- [ ] Red social / comunidad

---

## 📝 Notas de Desarrollo

### Convenciones de Código

**TypeScript:**
- Interfaces con PascalCase
- Funciones con camelCase
- Constantes en UPPER_SNAKE_CASE
- Tipos explícitos siempre que sea posible

**CSS:**
- BEM naming convention
- Variables CSS para colores y espaciado
- Mobile-first responsive design

**Git:**
- Commits descriptivos en español
- Formato: `tipo: descripción`
- Tipos: feat, fix, docs, style, refactor, test

### Performance

**Optimizaciones implementadas:**
- Lazy loading de rutas
- Memoización de cálculos pesados
- Virtualization en listas largas (si aplicable)
- CSS optimizado con variables

---

## 📞 Soporte

**Autor:** al064697  
**Repositorio:** https://github.com/al064697/ContadorCalorias  
**Issues:** https://github.com/al064697/ContadorCalorias/issues

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Última actualización:** 21 de noviembre de 2025  
**Versión de la documentación:** 1.0.0
