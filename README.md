# 🥗 Contador de Calorías - Aplicación Web Completa

> **Proyecto Feria de Ciencias 2025** - Aplicación web profesional para el seguimiento y monitoreo de calorías diarias con visualizaciones, historial y cálculos personalizados de metabolismo.

---

## 📋 Descripción del Proyecto

Aplicación web desarrollada en **React + TypeScript** que permite a los usuarios:

✅ Registrarse con datos personales (edad, peso, altura, sexo, nivel de actividad)  
✅ Calcular automáticamente su **TMB** (Tasa Metabólica Basal) y **TDEE** (Gasto Energético Total Diario)  
✅ Registrar alimentos consumidos con búsqueda inteligente  
✅ Visualizar progreso diario con **gráfico circular** y mensajes motivacionales  
✅ Ver historial de 7 días con **gráficos comparativos**  
✅ Alternar entre **modo oscuro/claro**  
✅ Datos persistentes en **localStorage** (sin backend)

---

## 🎯 Objetivos Cumplidos

### Requerimientos Funcionales ✅
- [x] Sistema de registro y autenticación (localStorage)
- [x] Cálculo de TMB usando fórmula Harris-Benedict
- [x] Cálculo de TDEE según nivel de actividad física
- [x] Base de datos de 50+ alimentos con calorías
- [x] Búsqueda y autocompletado de alimentos
- [x] Registro de porciones y cantidad
- [x] Visualización con progreso circular (react-circular-progressbar)
- [x] Gráficos de líneas para historial (Recharts)
- [x] Mensajes motivacionales dinámicos
- [x] Historial de últimos 7 días

### Requerimientos Técnicos ✅
- [x] TypeScript con tipos estrictos
- [x] React 18 con hooks personalizados
- [x] Context API para estado global (Auth, Theme)
- [x] React Router para navegación
- [x] Diseño responsive (móvil, tablet, escritorio)
- [x] Modo oscuro/claro con switch
- [x] Código modular y comentado
- [x] Almacenamiento en localStorage

---

## 🚀 Cómo Ejecutar

### Prerequisitos
- Node.js 16+ y npm instalados
- Navegador moderno (Chrome, Safari, Firefox)

### Instalación

```bash
# 1. Navegar al directorio del proyecto
cd /Users/sebastianeligio/Code_Projects/ContadorCalorias

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Comandos disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
npm run test     # Ejecutar tests
```

---

## 📁 Estructura del Proyecto

```
ContadorCalorias/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx         # Componente botón reutilizable
│   │       ├── Button.css
│   │       ├── Card.tsx           # Componente tarjeta
│   │       └── Card.css
│   ├── contexts/
│   │   ├── AuthContext.tsx        # Estado global autenticación
│   │   └── ThemeContext.tsx       # Estado global tema
│   ├── data/
│   │   └── foods.ts               # Base de datos de alimentos
│   ├── hooks/
│   │   ├── useCaloriesCalculator.ts  # Hook para cálculo TMB/TDEE
│   │   └── useDailyLog.ts            # Hook para logs diarios
│   ├── pages/
│   │   ├── Login.tsx              # Página de inicio de sesión
│   │   ├── Register.tsx           # Página de registro
│   │   ├── Dashboard.tsx          # Dashboard principal
│   │   ├── History.tsx            # Página de historial
│   │   └── Auth.css               # Estilos compartidos
│   ├── utils/
│   │   ├── calculations.ts        # Fórmulas TMB/TDEE
│   │   └── constants.ts           # Constantes globales
│   ├── App.tsx                    # Componente raíz con routing
│   ├── main.tsx                   # Entry point
│   ├── styles.css                 # Estilos globales
│   └── types.ts                   # Tipos TypeScript
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🧮 Fórmulas Utilizadas

### TMB (Tasa Metabólica Basal) - Harris-Benedict

**Hombres:**
```
TMB = 88.362 + (13.397 × peso en kg) + (4.799 × altura en cm) - (5.677 × edad)
```

**Mujeres:**
```
TMB = 447.593 + (9.247 × peso en kg) + (3.098 × altura en cm) - (4.330 × edad)
```

### TDEE (Gasto Energético Total Diario)

```
TDEE = TMB × Factor de Actividad
```

**Factores de Actividad:**
- Sedentario: 1.2
- Ligero: 1.375
- Moderado: 1.55
- Activo: 1.725
- Muy activo: 1.9

---

## 💡 Funcionalidades Destacadas

### 1. Sistema de Autenticación
- Registro con validación de datos
- Inicio de sesión persistente
- Protección de rutas privadas

### 2. Cálculo Inteligente
- TMB personalizado por sexo, edad, peso y altura
- TDEE ajustado según nivel de actividad
- Sugerencias de déficit/superávit calórico

### 3. Registro de Alimentos
- Base de datos de 50+ alimentos categorizados
- Búsqueda en tiempo real
- Sistema de porciones flexible
- Timestamp de cada entrada

### 4. Visualizaciones
- **Progreso circular** con colores dinámicos:
  - Verde: 90-110% de la meta (excelente)
  - Rojo: >110% (exceso)
  - Amarillo: <90% (déficit)
- **Gráfico de líneas** para comparación de 7 días
- **Mensajes motivacionales** adaptativos

### 5. Experiencia de Usuario
- Modo oscuro/claro
- Diseño responsive
- Animaciones suaves
- Feedback visual inmediato

---

## 📊 Base de Datos de Alimentos

La aplicación incluye 50+ alimentos en 7 categorías:

- 🍎 **Frutas** (8): Manzana, Plátano, Naranja, Fresa, etc.
- 🥗 **Verduras** (7): Brócoli, Zanahoria, Espinaca, etc.
- 🍗 **Proteínas** (7): Pollo, Res, Salmón, Huevo, etc.
- 🌾 **Granos** (6): Arroz, Pasta, Avena, Quinoa, etc.
- 🥛 **Lácteos** (5): Leche, Yogurt, Queso, etc.
- 🍪 **Snacks** (6): Almendras, Chocolate, Galletas, etc.
- 🥤 **Bebidas** (6): Agua, Jugo, Café, Té, etc.

---

## 🎨 Diseño y UX

### Paleta de Colores

**Modo Oscuro:**
- Fondo: Gradient slate (#0f172a → #1e293b)
- Cards: Glass effect con backdrop-blur
- Acento: Azul (#3b82f6)
- Éxito: Verde (#10b981)
- Peligro: Rojo (#ef4444)

**Modo Claro:**
- Fondo: Gradient gris claro
- Cards: Blanco con sombras sutiles
- Mismos colores de acento

### Componentes Reutilizables
- `<Button variant="primary|secondary|danger|ghost" size="sm|md|lg" />`
- `<Card title="..." />`

---

## 🔐 Seguridad y Privacidad

- Datos almacenados **100% localmente** (localStorage)
- Sin envío de datos a servidores externos
- Contraseñas almacenadas en texto plano (solo demostración educativa)
- Sesiones persistentes por dispositivo

⚠️ **Nota:** En producción real se requeriría:
- Hash de contraseñas (bcrypt)
- Backend con autenticación JWT
- Base de datos segura

---

## 📈 Próximas Mejoras

- [ ] Exportar historial a PDF
- [ ] Compartir resultados en redes sociales
- [ ] Agregar alimentos personalizados
- [ ] Calculadora de IMC
- [ ] Sugerencias de menús
- [ ] Integración con APIs de nutrición
- [ ] Backend real con Node.js + MongoDB

---

## 👨‍💻 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| React | 18.2 | Framework UI |
| TypeScript | 5.1 | Tipado estático |
| Vite | 5.0 | Build tool |
| React Router | 6.20 | Navegación |
| Recharts | 2.10 | Gráficos |
| react-circular-progressbar | 2.1 | Progreso circular |
| date-fns | 3.0 | Manejo de fechas |
| ESLint | 8.47 | Linting |
| Vitest | 1.0 | Testing |

---

## 📝 Licencia

Proyecto educativo para Feria de Ciencias 2025.  
Desarrollado por: Sebastian Eligio

---

## 🙋 Preguntas Frecuentes

**¿Cómo se calculan las calorías recomendadas?**  
Usamos la fórmula Harris-Benedict para TMB y la multiplicamos por tu nivel de actividad para obtener el TDEE.

**¿Los datos se pierden al cerrar el navegador?**  
No, todos los datos se guardan en localStorage y persisten entre sesiones.

**¿Puedo usar la app sin internet?**  
Sí, una vez cargada, funciona completamente offline.

**¿Cuántos alimentos puedo agregar?**  
Ilimitados. Todos se guardan en el historial diario.

---

## 📞 Soporte

Para dudas o sugerencias durante la feria:  
📧 Contacto disponible en el stand

**¡Gracias por usar el Contador de Calorías! 🥗💪**
