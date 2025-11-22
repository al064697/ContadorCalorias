# 🥗 Contador de Calorías - Aplicación de Nutrición Avanzada

Aplicación web profesional para el monitoreo integral de nutrición, diseñada para proporcionar un seguimiento completo de calorías, macronutrientes y salud metabólica. Desarrollada con React 18, TypeScript y arquitectura moderna de componentes.

---

## 📊 Descripción del Sistema

**Contador de Calorías** es una plataforma integral de seguimiento nutricional que combina cálculos metabólicos científicos con una interfaz intuitiva para ayudar a los usuarios a alcanzar sus objetivos de salud. El sistema utiliza ecuaciones validadas médicamente (Harris-Benedict) y estándares nutricionales oficiales para proporcionar recomendaciones personalizadas.

### Filosofía del Proyecto

Este proyecto nace de la necesidad de democratizar el acceso a herramientas nutricionales profesionales, ofreciendo:

- **Precisión científica**: Cálculos basados en fórmulas médicas establecidas
- **Educación nutricional**: Sistema de semáforo nutricional intuitivo
- **Personalización total**: Adaptación a perfil, objetivos y estilo de vida de cada usuario
- **Transparencia**: Toda la información nutricional visible y explicada
- **Accesibilidad**: Interfaz simple para usuarios de todos los niveles

---

## 🎯 Características Principales del Sistema

### 1. Motor de Cálculo Metabólico

El corazón del sistema es su motor de cálculos nutricionales que implementa:

#### **Tasa Metabólica Basal (TMB/BMR)**
Calcula las calorías que el cuerpo quema en reposo absoluto usando la **Ecuación de Harris-Benedict Revisada**:

- **Para hombres**: `88.362 + (13.397 × peso_kg) + (4.799 × altura_cm) - (5.677 × edad)`
- **Para mujeres**: `447.593 + (9.247 × peso_kg) + (3.098 × altura_cm) - (4.330 × edad)`

Esta fórmula considera las diferencias metabólicas entre géneros y la reducción del metabolismo con la edad.

#### **Gasto Energético Total Diario (TDEE)**
Ajusta el TMB según el nivel de actividad física del usuario mediante multiplicadores validados:

| Nivel de Actividad | Multiplicador | Descripción |
|-------------------|---------------|-------------|
| Sedentario | 1.2 | Poco o ningún ejercicio, trabajo de oficina |
| Ligero | 1.375 | Ejercicio ligero 1-3 días/semana |
| Moderado | 1.55 | Ejercicio moderado 3-5 días/semana |
| Activo | 1.725 | Ejercicio intenso 6-7 días/semana |
| Muy Activo | 1.9 | Ejercicio muy intenso, trabajo físico o entrenamiento 2 veces/día |

#### **Índice de Masa Corporal (IMC)**
Calcula y categoriza el peso corporal según estándares de la OMS:

- **Fórmula**: `IMC = peso (kg) / altura (m)²`
- **Categorías**:
  - Bajo peso: IMC < 18.5
  - Normal: 18.5 ≤ IMC < 25
  - Sobrepeso: 25 ≤ IMC < 30
  - Obesidad: IMC ≥ 30

#### **Metas Calóricas Personalizadas**
El sistema genera tres metas automáticamente:

- **Mantenimiento**: TDEE (mantener peso actual)
- **Déficit**: 85% del TDEE (perder peso de forma saludable: ~0.5kg/semana)
- **Superávit**: 115% del TDEE (ganar masa muscular: ~0.25kg/semana)


---

### 2. Sistema de Macronutrientes

Implementa un seguimiento completo de los tres macronutrientes esenciales:

#### **Distribución Estándar**
Basada en recomendaciones de organismos de salud internacionales:

- **Carbohidratos**: 55% de calorías totales
  - Conversión: `(calorías × 0.55) / 4 kcal/g`
  - Función: Fuente principal de energía rápida
  
- **Proteínas**: 20% de calorías totales
  - Conversión: `(calorías × 0.20) / 4 kcal/g`
  - Función: Construcción y reparación de tejidos
  
- **Grasas**: 25% de calorías totales
  - Conversión: `(calorías × 0.25) / 9 kcal/g`
  - Función: Energía de reserva, absorción de vitaminas, hormonas

#### **Seguimiento en Tiempo Real**
El sistema calcula automáticamente:

- Total de gramos consumidos de cada macronutriente
- Porcentaje de meta diaria cumplida
- Distribución calórica real vs recomendada
- Balance entre macros

#### **Visualización de Macros**
Componente `MacronutrientBars` que muestra:

- Barras de progreso con gradientes de color distintivos
- Valores numéricos (consumido/meta en gramos)
- Porcentaje de completitud
- Código de colores:
  - 🟠 Naranja: Carbohidratos
  - 🔵 Azul: Proteínas
  - 🟢 Verde: Grasas

---

### 3. Sistema de Semáforo Nutricional

Basado en la **Guía de Alimentos para la Población Mexicana**, clasifica los alimentos en tres categorías:

#### **🟢 Verde - Consumo Libre**
Alimentos nutritivos de bajo contenido calórico que pueden consumirse sin restricción:

- **Frutas**: Manzana, naranja, sandía, papaya, pera
- **Verduras**: Brócoli, espinaca, lechuga, pepino, nopales, calabacita
- **Proteínas magras**: Pechuga de pollo sin piel, pescado blanco, claras de huevo, pavo
- **Leguminosas**: Frijoles, lentejas, garbanzos, habas
- **Lácteos bajos en grasa**: Leche descremada, yogurt natural bajo en grasa, queso cottage
- **Granos integrales**: Arroz integral, quinoa, avena, camote

**Características**: Alto contenido de fibra, vitaminas, minerales. Bajo en grasas saturadas y azúcares añadidos.

#### **🟡 Amarillo - Consumo Moderado**
Alimentos nutritivos pero con mayor densidad calórica. Consumir en porciones controladas:

- **Frutas dulces**: Plátano, uvas, mango
- **Proteínas con grasa**: Huevo entero, salmón, carne de res magra
- **Lácteos**: Leche semidescremada, yogurt griego, queso panela
- **Granos refinados**: Arroz blanco, pasta, tortillas de maíz, papa
- **Grasas saludables**: Aguacate, almendras, nueces, aceite de oliva, cacahuates

**Características**: Mayor contenido calórico pero con beneficios nutricionales. Requieren control de porciones.

#### **🔴 Rojo - Evitar o Limitar**
Alimentos de alto contenido calórico, grasas saturadas, azúcares o sodio. Consumo ocasional:

- **Alimentos procesados**: Papas fritas, donas, galletas de chocolate
- **Comida rápida**: Pizza, hamburguesas, hot dogs
- **Postres**: Helado, chocolate con leche
- **Lácteos altos en grasa**: Queso cheddar, leche entera
- **Bebidas azucaradas**: Refrescos, jugos comerciales, cerveza
- **Granos refinados**: Pan blanco

**Características**: Alto en calorías vacías, grasas trans, azúcares refinados. Mínimo valor nutricional.

---

### 4. Base de Datos Nutricional Completa

#### **Alcance de la Base de Datos**
La aplicación incluye una base de datos curada con **más de 80 alimentos** comunes en la alimentación, cada uno con información nutricional completa y verificada.

#### **Categorías de Alimentos** (12 categorías)

1. **🍎 Frutas** (10 alimentos)
   - Alimentos dulces naturales ricos en vitaminas y fibra
   - Ejemplos: Manzana, plátano, naranja, fresa, sandía

2. **🥗 Verduras** (10 alimentos)
   - Base de una alimentación saludable
   - Ejemplos: Brócoli, zanahoria, espinaca, tomate, calabacita

3. **🍗 Proteínas** (8 alimentos)
   - Fuentes de proteína animal magra
   - Ejemplos: Pollo, pescado, atún, huevo, carne de res

4. **🫘 Leguminosas** (5 alimentos)
   - Proteína vegetal y fibra
   - Ejemplos: Frijoles negros, lentejas, garbanzos, habas

5. **🌾 Cereales y Tubérculos** (10 alimentos)
   - Fuente principal de energía
   - Ejemplos: Arroz, pasta, avena, quinoa, papa, camote, tortilla

6. **🥛 Lácteos** (8 alimentos)
   - Calcio y proteína
   - Ejemplos: Leche, yogurt, queso en distintas presentaciones

7. **🥑 Grasas Saludables** (6 alimentos)
   - Grasas mono y poliinsaturadas
   - Ejemplos: Aguacate, almendras, nueces, aceite de oliva, chía

8. **⚠️ Alimentos Altos en Calorías** (8 alimentos)
   - Para limitar su consumo
   - Ejemplos: Papas fritas, galletas, chocolate, pizza, donas, helado

9. **🥤 Bebidas** (8 alimentos)
   - Desde agua hasta bebidas calóricas
   - Ejemplos: Agua, café, té, jugos, refrescos, cerveza

10. **✅ Alimentos Libres** (3 alimentos)
    - Verduras de muy bajo contenido calórico
    - Ejemplos: Lechuga, pepino, nopales

#### **Información por Alimento**
Cada entrada incluye:

- **ID único**: Identificador del alimento
- **Nombre**: Denominación común
- **Calorías**: Kilocalorías por porción
- **Carbohidratos**: Gramos totales
- **Proteínas**: Gramos totales
- **Grasas**: Gramos totales
- **Fibra**: Gramos (cuando aplica)
- **Semáforo**: Clasificación verde/amarillo/rojo
- **Tipo de grasa**: Categorización (cuando aplica):
  - Monoinsaturada (aguacate, aceite de oliva)
  - Poliinsaturada (pescado, nueces)
  - Saturada (carnes, lácteos)
  - Trans (alimentos procesados)
- **Categoría**: Grupo alimenticio
- **Porción**: Tamaño estándar (ej: "100g (1 mediana)")

#### **Ejemplo de Registro Completo**

```typescript
{
  id: 'f1',
  name: 'Manzana',
  calories: 52,
  carbs: 14,
  protein: 0.3,
  fat: 0.2,
  fiber: 2.4,
  trafficLight: 'green',
  category: 'fruits',
  servingSize: '100g (1 mediana)'
}
```

---

### 5. Sistema de Registro Diario

#### **Estructura de Datos**
Cada día genera un registro único (`DailyLog`) que contiene:

##### **Metadatos del Registro**
- **date**: Fecha en formato ISO (YYYY-MM-DD)
- **userId**: Identificador del usuario propietario
- **targetCalories**: Meta de calorías del día
- **targetCarbs**: Meta de carbohidratos (g)
- **targetProtein**: Meta de proteínas (g)
- **targetFat**: Meta de grasas (g)

##### **Entradas de Alimentos** (`FoodEntry[]`)
Array de alimentos consumidos, cada uno con:
- **id**: ID único de la entrada
- **foodId**: Referencia al alimento en la base de datos
- **foodName**: Nombre del alimento
- **calories**: Calorías calculadas según cantidad
- **carbs**: Carbohidratos totales
- **protein**: Proteínas totales
- **fat**: Grasas totales
- **trafficLight**: Semáforo nutricional
- **quantity**: Número de porciones
- **timestamp**: Momento exacto del registro

##### **Totales Acumulados**
Calculados automáticamente:
- **totalCalories**: Suma de todas las calorías
- **totalCarbs**: Suma de carbohidratos
- **totalProtein**: Suma de proteínas
- **totalFat**: Suma de grasas

#### **Flujo de Registro**

1. **Usuario selecciona alimento** → Búsqueda en base de datos
2. **Especifica cantidad** → Multiplicador de porción
3. **Sistema calcula valores** → Calorías y macros × cantidad
4. **Crea entrada** → `FoodEntry` con timestamp
5. **Actualiza totales** → Suma acumulativa
6. **Persiste datos** → Guardado en localStorage
7. **Actualiza UI** → Reflejo inmediato en interfaz

---

### 6. Interfaz de Usuario

#### **Arquitectura de Componentes**

##### **Componente Dashboard** (Vista Principal)
El centro de control de la aplicación que integra:

**a) Círculo de Progreso Calórico**
- Implementado con `react-circular-progressbar`
- Muestra porcentaje de meta cumplida
- Sistema de colores dinámico:
  - 🟢 Verde (90-110%): Rango óptimo
  - 🔴 Rojo (>110%): Exceso calórico
  - 🟡 Amarillo (<90%): Consumo insuficiente
- Animación suave de transición

**b) Estadísticas Metabólicas**
Tarjeta que muestra:
- **TMB**: Calorías en reposo
- **TDEE**: Calorías de mantenimiento
- **Déficit**: Calorías para pérdida de peso
- **IMC**: Índice de masa corporal

**c) Barras de Macronutrientes**
Componente personalizado que visualiza:
- 3 barras horizontales (carbos/proteínas/grasas)
- Gradientes de color por tipo
- Valores numéricos y porcentajes
- Actualización en tiempo real

**d) Formulario de Registro**
Sistema de entrada de alimentos que incluye:
- **Buscador en tiempo real**: Filtrado instantáneo
- **Selector de alimentos**: Dropdown con 80+ opciones
- **Control de cantidad**: Input numérico con incrementos de 0.5
- **Validación**: Botón deshabilitado hasta selección válida
- **Feedback visual**: Muestra calorías y porción

**e) Lista de Alimentos Consumidos**
Listado dinámico que presenta:
- Nombre del alimento
- Indicador de semáforo (🟢🟡🔴)
- Cantidad de porciones
- Hora de registro
- Calorías totales
- Badges de macronutrientes (C/P/G)
- Botón de eliminación

##### **Componente History** (Historial)
Análisis temporal del consumo:

**a) Gráfica de Tendencias**
- Implementada con `recharts`
- LineChart de últimos 7 días
- Eje X: Fechas formateadas en español
- Eje Y: Calorías
- Línea con gradiente
- Puntos interactivos con tooltip
- Línea de referencia de meta

**b) Estadísticas Resumen**
- Total de días registrados
- Promedio de calorías
- Día con mayor consumo
- Día con menor consumo
- Tendencia general

##### **Componente Settings** (Configuración)
Panel de gestión de perfil:

**a) Información de Cuenta**
- Email (solo lectura)
- Botón de cambio de contraseña

**b) Datos Personales Editables**
- Nombre completo
- Edad (años)
- Peso (kg)
- Altura (cm)
- Género (select)
- Nivel de actividad (select)
- Validación en tiempo real
- Confirmación antes de guardar

**c) Preferencias**
- Toggle de tema claro/oscuro
- Persistencia de preferencia

**d) Seguridad**
- Cambio de contraseña
- Validación de contraseña actual
- Confirmación de nueva contraseña
- Feedback de éxito/error

##### **Componentes Reutilizables**

**Button Component**
```typescript
Props:
- variant: 'primary' | 'secondary' | 'ghost'
- size: 'sm' | 'md' | 'lg'
- disabled: boolean
- onClick: function
```

Variantes:
- **Primary**: Botón de acción principal (color acento)
- **Secondary**: Botón secundario (con borde)
- **Ghost**: Botón transparente (solo hover)

**Card Component**
```typescript
Props:
- title: string (opcional)
- children: ReactNode
- className: string (opcional)
```

Características:
- Efecto glassmorphism
- Borde sutil
- Sombra adaptativa
- Padding consistente

---

### 7. Sistema de Temas

#### **Implementación**
Context API con `ThemeContext` que provee:

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
```

#### **Variables CSS**

**Tema Claro:**
```css
--background: #f5f5f5
--card: rgba(255, 255, 255, 0.7)
--text: #1a1a1a
--text-secondary: #666666
--accent: #6366f1
--border: rgba(0, 0, 0, 0.1)
```

**Tema Oscuro:**
```css
--background: #0f172a
--card: rgba(30, 41, 59, 0.7)
--text: #f1f5f9
--text-secondary: #94a3b8
--accent: #818cf8
--border: rgba(255, 255, 255, 0.1)
```

#### **Persistencia**
El tema seleccionado se guarda en localStorage y se aplica automáticamente al cargar la aplicación.

---

### 8. Gestión de Estado

#### **Context API**

**AuthContext** (Autenticación Global)
Gestiona:
- Usuario actual en sesión
- Funciones de login/logout
- Registro de nuevos usuarios
- Actualización de perfil
- Persistencia de sesión

**ThemeContext** (Tema Visual)
Gestiona:
- Tema actual (claro/oscuro)
- Toggle entre temas
- Persistencia de preferencia

#### **Custom Hooks**

**useCaloriesCalculator**
```typescript
Input: User | null
Output: CalorieGoals | null

Proceso:
1. Extrae datos del usuario
2. Calcula BMR (Harris-Benedict)
3. Calcula TDEE (BMR × actividad)
4. Calcula IMC
5. Determina categoría de peso
6. Calcula distribución de macros
7. Retorna objeto completo
```

**useDailyLog**
```typescript
Input: userId, targetCalories, targetMacros
Output: { todayLog, addEntry, removeEntry }

Funciones:
- Carga registro del día actual
- Crea nuevo registro si no existe
- addEntry: Agrega alimento y recalcula totales
- removeEntry: Elimina alimento y ajusta totales
- Persistencia automática en localStorage
```

**useHistoricalLogs**
```typescript
Input: userId, days (default: 7)
Output: DailyLog[]

Proceso:
1. Carga todos los logs del usuario
2. Filtra últimos N días
3. Ordena por fecha descendente
4. Retorna array de logs
```

---

### 9. Persistencia de Datos

#### **Tecnología**: localStorage

El sistema utiliza el almacenamiento local del navegador para persistir datos sin necesidad de backend.

#### **Estructura de Almacenamiento**

**Key: 'users'**
Array de todos los usuarios registrados:
```json
[
  {
    "id": "1699123456789-abc123",
    "email": "usuario@ejemplo.com",
    "password": "contraseña_hasheada",
    "name": "Juan Pérez",
    "age": 25,
    "weight": 70,
    "height": 175,
    "gender": "male",
    "activityLevel": "moderate"
  }
]
```

**Key: 'currentUser'**
Usuario actualmente autenticado (objeto único)

**Key: 'dailyLogs'**
Array de todos los registros diarios:
```json
[
  {
    "date": "2025-11-21",
    "userId": "1699123456789-abc123",
    "entries": [...],
    "totalCalories": 1850,
    "totalCarbs": 250,
    "totalProtein": 90,
    "totalFat": 52,
    "targetCalories": 2000,
    "targetCarbs": 275,
    "targetProtein": 100,
    "targetFat": 56
  }
]
```

**Key: 'theme'**
Preferencia de tema: 'light' | 'dark'

#### **Ventajas de localStorage**
- ✅ Sin necesidad de servidor
- ✅ Persistencia entre sesiones
- ✅ Acceso instantáneo
- ✅ Sin costos de infraestructura

#### **Limitaciones**
- ⚠️ Datos solo en el navegador local
- ⚠️ Sin sincronización entre dispositivos
- ⚠️ Límite de ~5-10 MB
- ⚠️ Datos no encriptados

---

### 10. Mensajes Motivacionales

Sistema de feedback automático según progreso:

#### **Lógica de Mensajes**

**Rango Óptimo (90-110%)**
```
Tipo: 'excellent'
Mensaje: "¡Excelente! Vas por buen camino 💪"
Emoji: 🎯
Color: Verde
```

**Exceso (>110%)**
```
Tipo: 'over'
Mensaje: "Te pasaste un poco, ¡mañana lo harás mejor! 😅"
Emoji: 📈
Color: Rojo
```

**Insuficiente (<90%)**
```
Tipo: 'under'
Mensaje: "¡Necesitas más energía! Come algo nutritivo 🍎"
Emoji: 📉
Color: Amarillo
```

---

### 11. Validaciones y Seguridad

#### **Validaciones de Entrada**

**Registro de Usuario:**
- Email: Formato válido, único en el sistema
- Contraseña: Mínimo 6 caracteres
- Edad: 15-100 años
- Peso: 30-300 kg
- Altura: 100-250 cm
- Todos los campos requeridos

**Login:**
- Email: No vacío, formato válido
- Contraseña: No vacía
- Credenciales deben coincidir

**Registro de Alimentos:**
- Alimento seleccionado requerido
- Cantidad > 0
- Cantidad en incrementos de 0.5

#### **Seguridad**
⚠️ **Nota**: Esta es una aplicación de demostración. En producción se debe:
- Encriptar contraseñas (bcrypt)
- Usar HTTPS
- Implementar tokens JWT
- Validar en servidor
- Sanitizar inputs

---

### 12. Responsive Design

#### **Breakpoints**

**Mobile First Approach**
```css
/* Base: Mobile (< 640px) */
.dashboard-grid {
  grid-template-columns: 1fr;
}

/* Tablet (≥ 768px) */
@media (min-width: 768px) {
  .progress-card {
    grid-column: span 2;
  }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}
```

#### **Adaptaciones por Dispositivo**

**Mobile:**
- Navegación simplificada
- Cards apiladas verticalmente
- Fuentes más grandes
- Botones de fácil toque

**Tablet:**
- Grid de 2 columnas
- Navegación horizontal
- Aprovechamiento de espacio

**Desktop:**
- Grid flexible adaptativo
- Sidebar permanente
- Tooltips informativos
- Atajos de teclado


---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico Completo

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|-----------|
| **Core** | React | 18.2.0 | Framework UI |
| **Lenguaje** | TypeScript | 5.1.6 | Tipado estático |
| **Build Tool** | Vite | 5.0.8 | Dev server + bundler |
| **Routing** | React Router | 6.20.1 | Navegación SPA |
| **Gráficas** | Recharts | 2.10.3 | Visualización de datos |
| **Progress** | react-circular-progressbar | 2.1.0 | Círculo de progreso |
| **Fechas** | date-fns | 3.0.6 | Manejo de fechas |
| **Linting** | ESLint | 8.55.0 | Calidad de código |
| **Formato** | Prettier | 3.1.1 | Formato consistente |
| **Testing** | Vitest | 1.1.0 | Unit testing |

### Principios de Diseño

**1. Separation of Concerns**
- Contexts: Estado global
- Hooks: Lógica de negocio
- Components: UI reutilizable
- Utils: Funciones puras
- Data: Fuentes de datos

**2. DRY (Don't Repeat Yourself)**
- Componentes reutilizables (Button, Card)
- Hooks personalizados
- Utilidades compartidas
- Constantes globales

**3. Single Responsibility**
- Cada componente una responsabilidad
- Funciones con propósito único
- Módulos cohesivos

**4. Type Safety**
- Interfaces TypeScript estrictas
- Props tipadas
- Estado tipado
- Sin uso de `any`

---

## 📈 Flujo de Datos Completo

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Interfaz (React Components)        │
│  - Dashboard                        │
│  - History                          │
│  - Settings                         │
└──────┬──────────────────────┬───────┘
       │                      │
       ▼                      ▼
┌──────────────┐      ┌──────────────┐
│   Contexts   │      │ Custom Hooks │
│ - Auth       │◄────►│ - Calculator │
│ - Theme      │      │ - DailyLog   │
└──────┬───────┘      └──────┬───────┘
       │                     │
       ▼                     ▼
┌─────────────────────────────────────┐
│  Utils (Calculations)               │
│  - calculateBMR()                   │
│  - calculateTDEE()                  │
│  - calculateIMC()                   │
│  - calculateMacroTargets()          │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  localStorage (Persistence)         │
│  - users                            │
│  - currentUser                      │
│  - dailyLogs                        │
│  - theme                            │
└─────────────────────────────────────┘
```

---

## 🎨 Diseño Visual

### Paleta de Colores

**Acentos Principales:**
- Primario: `#6366f1` (Índigo vibrante)
- Éxito: `#10b981` (Verde esmeralda)
- Advertencia: `#f59e0b` (Ámbar)
- Peligro: `#ef4444` (Rojo coral)

**Sistema de Colores Semánticos:**
- Carbohidratos: `#f59e0b` → `#f97316` (Gradiente naranja)
- Proteínas: `#3b82f6` → `#2563eb` (Gradiente azul)
- Grasas: `#10b981` → `#059669` (Gradiente verde)

### Efectos Visuales

**Glassmorphism:**
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

**Transiciones Suaves:**
- Hover states: 200ms ease
- Theme switching: 300ms ease
- Progress bars: 500ms ease-in-out

---

## 💡 Casos de Uso Detallados

### Caso 1: Usuario Nuevo - Pérdida de Peso

**Perfil:**
- Nombre: María González
- Edad: 30 años
- Peso: 75 kg
- Altura: 165 cm
- Género: Femenino
- Actividad: Sedentaria
- Objetivo: Perder peso

**Cálculos del Sistema:**
1. BMR = 447.593 + (9.247 × 75) + (3.098 × 165) - (4.330 × 30) = **1,456 kcal**
2. TDEE = 1,456 × 1.2 = **1,747 kcal**
3. Déficit = 1,747 × 0.85 = **1,485 kcal** (-262 kcal/día)
4. IMC = 75 / (1.65)² = **27.5** (Sobrepeso)
5. Macros para déficit:
   - Carbos: (1,485 × 0.55) / 4 = **204g**
   - Proteína: (1,485 × 0.20) / 4 = **74g**
   - Grasa: (1,485 × 0.25) / 9 = **41g**

**Experiencia de Usuario:**
1. Se registra con sus datos
2. Dashboard muestra meta de 1,485 kcal
3. Selecciona alimentos 🟢 verdes prioritariamente
4. Monitorea macros para alcanzar proteína
5. Historial muestra progreso semanal
6. Pérdida esperada: ~0.5 kg/semana

### Caso 2: Atleta - Ganancia Muscular

**Perfil:**
- Nombre: Carlos Rodríguez
- Edad: 25 años
- Peso: 80 kg
- Altura: 180 cm
- Género: Masculino
- Actividad: Muy activa
- Objetivo: Ganar masa muscular

**Cálculos del Sistema:**
1. BMR = 88.362 + (13.397 × 80) + (4.799 × 180) - (5.677 × 25) = **1,959 kcal**
2. TDEE = 1,959 × 1.9 = **3,722 kcal**
3. Superávit = 3,722 × 1.15 = **4,280 kcal** (+558 kcal/día)
4. IMC = 80 / (1.80)² = **24.7** (Normal)
5. Macros para superávit:
   - Carbos: (4,280 × 0.55) / 4 = **588g**
   - Proteína: (4,280 × 0.20) / 4 = **214g**
   - Grasa: (4,280 × 0.25) / 9 = **119g**

**Estrategia:**
- Prioriza proteínas (pollo, pescado, huevos)
- Incluye carbos complejos (arroz integral, avena)
- Grasas saludables (aguacate, nueces)
- Monitorea especialmente barra de proteínas
- Ganancia esperada: ~0.25 kg músculo/semana

### Caso 3: Mantenimiento Saludable

**Perfil:**
- Nombre: Ana López
- Edad: 28 años
- Peso: 60 kg
- Altura: 168 cm
- Género: Femenino
- Actividad: Moderada
- Objetivo: Mantener peso, mejorar nutrición

**Cálculos del Sistema:**
1. BMR = 447.593 + (9.247 × 60) + (3.098 × 168) - (4.330 × 28) = **1,417 kcal**
2. TDEE = 1,417 × 1.55 = **2,196 kcal**
3. IMC = 60 / (1.68)² = **21.3** (Normal)
4. Macros:
   - Carbos: **302g**
   - Proteína: **110g**
   - Grasa: **61g**

**Enfoque:**
- Usa semáforo para elecciones saludables
- Balance 70% 🟢 verde, 25% 🟡 amarillo, 5% 🔴 rojo
- No cuenta calorías estrictamente
- Monitorea tendencias semanales
- Mantiene peso estable y energía alta

---

## 🔧 Mantenibilidad y Escalabilidad

### Estructura Modular

El código está organizado para facilitar:

**Expansión de Funcionalidades:**
- Agregar nuevos alimentos: Editar `foods.ts`
- Nuevas categorías: Actualizar tipos y constantes
- Nuevos cálculos: Agregar en `calculations.ts`
- Nuevos componentes: Carpeta `components/`

**Testing:**
- Funciones puras fáciles de testear
- Componentes aislados
- Mocks de datos disponibles

**Documentación:**
- Comentarios JSDoc en funciones
- README detallado
- Tipos TypeScript auto-documentados

### Próximas Evoluciones Técnicas

**Backend Integration:**
- API REST con Node.js/Express
- Base de datos PostgreSQL/MongoDB
- Autenticación JWT
- Sincronización multi-dispositivo

**Funcionalidades Avanzadas:**
- Análisis nutricional con IA
- Recomendaciones personalizadas
- Sistema de recetas
- Integración con APIs externas (USDA Food Database)
- Escaneo de códigos de barras
- Exportación de reportes PDF

**Optimizaciones:**
- Server-side rendering (Next.js)
- Progressive Web App (PWA)
- Optimistic UI updates
- Cache strategies
- Lazy loading de imágenes

---

## 📁 Estructura del Proyecto

```
ContadorCalorias/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx              # Componente botón reutilizable
│   │   │   ├── Button.css
│   │   │   ├── Card.tsx                # Componente tarjeta
│   │   │   └── Card.css
│   │   ├── MacronutrientBars.tsx       # Barras de macronutrientes
│   │   └── MacronutrientBars.css
│   ├── contexts/
│   │   ├── AuthContext.tsx             # Estado global autenticación
│   │   └── ThemeContext.tsx            # Estado global tema
│   ├── data/
│   │   └── foods.ts                    # Base de datos 80+ alimentos
│   ├── hooks/
│   │   ├── useCaloriesCalculator.ts    # Hook TMB/TDEE/IMC/Macros
│   │   ├── useDailyLog.ts              # Hook logs diarios
│   │   └── useHistoricalLogs.ts        # Hook historial
│   ├── pages/
│   │   ├── Login.tsx                   # Página inicio de sesión
│   │   ├── Register.tsx                # Página registro
│   │   ├── Dashboard.tsx               # Dashboard principal
│   │   ├── Dashboard.css
│   │   ├── History.tsx                 # Página historial
│   │   ├── Settings.tsx                # Página configuración
│   │   └── Auth.css                    # Estilos compartidos
│   ├── utils/
│   │   ├── calculations.ts             # Fórmulas TMB/TDEE/IMC/Macros
│   │   └── constants.ts                # Constantes globales
│   ├── App.tsx                         # Componente raíz con routing
│   ├── main.tsx                        # Entry point
│   ├── styles.css                      # Estilos globales
│   └── types.ts                        # Tipos TypeScript completos
├── public/                              # Assets estáticos
├── package.json                         # Dependencias
├── tsconfig.json                        # Configuración TypeScript
├── vite.config.ts                       # Configuración Vite
├── DOCUMENTACION.md                     # Documentación técnica completa
└── README.md                            # Este archivo
```

---

## 📚 Glosario de Términos

**TMB/BMR**: Tasa Metabólica Basal - Energía necesaria para funciones vitales en reposo

**TDEE**: Total Daily Energy Expenditure - Gasto energético total considerando actividad

**IMC/BMI**: Índice de Masa Corporal - Relación entre peso y altura

**Macronutrientes**: Nutrientes que el cuerpo necesita en grandes cantidades (carbohidratos, proteínas, grasas)

**Micronutrientes**: Vitaminas y minerales necesarios en pequeñas cantidades

**Déficit calórico**: Consumir menos calorías de las que se gastan para perder peso

**Superávit calórico**: Consumir más calorías de las que se gastan para ganar peso

**Kilocalorías (kcal)**: Unidad de energía de los alimentos (comúnmente "calorías")

**Porción**: Cantidad estándar de alimento definida para cálculos nutricionales

**Semáforo nutricional**: Sistema de clasificación verde/amarillo/rojo según calidad nutricional

**Glassmorphism**: Efecto visual de cristal translúcido con desenfoque

---

## 📄 Licencia y Créditos

**Licencia:** MIT

**Desarrollado por:** al064697

**Basado en:**
- Ecuación de Harris-Benedict (1984)
- Guía de Alimentos para la Población Mexicana
- Estándares nutricionales de la OMS

**Tecnologías de código abierto:**
- React (Meta)
- TypeScript (Microsoft)
- Vite (Evan You)
- Recharts (Recharts Group)

---

**Versión de la Documentación:** 2.0.0  
**Fecha:** Noviembre 2025  
**Estado:** Producción
