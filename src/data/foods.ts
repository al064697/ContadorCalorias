/**
 * BASE DE DATOS DE ALIMENTOS
 * 
 * Contiene una lista predefinida de alimentos comunes con sus valores nutricionales completos.
 * Cada alimento incluye:
 * - ID único
 * - Nombre del alimento
 * - Calorías por porción
 * - Carbohidratos (g)
 * - Proteínas (g)
 * - Grasas (g)
 * - Fibra (g) - opcional
 * - Semáforo nutricional (verde/amarillo/rojo)
 * - Tipo de grasa - opcional
 * - Categoría (frutas, verduras, proteínas, etc.)
 * - Tamaño de porción estándar
 * 
 * Sistema de semáforo nutricional basado en la Guía de Alimentos para la Población Mexicana:
 * - VERDE: Consumo libre, alimentos nutritivos y bajos en calorías
 * - AMARILLO: Consumo moderado, alimentos nutritivos pero con más calorías
 * - ROJO: Evitar o limitar, alimentos altos en calorías, azúcares o grasas saturadas
 * 
 * Esta base de datos se usa para:
 * - Autocompletar al agregar alimentos
 * - Calcular calorías y macronutrientes automáticamente
 * - Filtrar por categorías
 * - Mostrar indicadores de semáforo nutricional
 * - Calcular distribución de macronutrientes
 */

import { Food } from '../types'

export const FOODS_DATABASE: Food[] = [
  // ========== FRUTAS (Verde - consumo libre) ==========
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
  },
  { 
    id: 'f2', 
    name: 'Plátano', 
    calories: 89, 
    carbs: 23, 
    protein: 1.1, 
    fat: 0.3, 
    fiber: 2.6,
    trafficLight: 'yellow',
    category: 'fruits', 
    servingSize: '100g (1 pequeño)' 
  },
  { 
    id: 'f3', 
    name: 'Naranja', 
    calories: 47, 
    carbs: 12, 
    protein: 0.9, 
    fat: 0.1, 
    fiber: 2.4,
    trafficLight: 'green',
    category: 'fruits', 
    servingSize: '100g (1 mediana)' 
  },
  { 
    id: 'f4', 
    name: 'Fresa', 
    calories: 32, 
    carbs: 8, 
    protein: 0.7, 
    fat: 0.3, 
    fiber: 2,
    trafficLight: 'green',
    category: 'fruits', 
    servingSize: '100g (8-10 piezas)' 
  },
  { 
    id: 'f5', 
    name: 'Uvas', 
    calories: 69, 
    carbs: 18, 
    protein: 0.7, 
    fat: 0.2, 
    fiber: 0.9,
    trafficLight: 'yellow',
    category: 'fruits', 
    servingSize: '100g (17 uvas)' 
  },
  { 
    id: 'f6', 
    name: 'Sandía', 
    calories: 30, 
    carbs: 8, 
    protein: 0.6, 
    fat: 0.2, 
    fiber: 0.4,
    trafficLight: 'green',
    category: 'fruits', 
    servingSize: '100g (1 taza)' 
  },
  { 
    id: 'f7', 
    name: 'Piña', 
    calories: 50, 
    carbs: 13, 
    protein: 0.5, 
    fat: 0.1, 
    fiber: 1.4,
    trafficLight: 'green',
    category: 'fruits', 
    servingSize: '100g (1 rebanada)' 
  },
  { 
    id: 'f8', 
    name: 'Mango', 
    calories: 60, 
    carbs: 15, 
    protein: 0.8, 
    fat: 0.4, 
    fiber: 1.6,
    trafficLight: 'yellow',
    category: 'fruits', 
    servingSize: '100g (1/2 mango)' 
  },
  { 
    id: 'f9', 
    name: 'Papaya', 
    calories: 43, 
    carbs: 11, 
    protein: 0.5, 
    fat: 0.3, 
    fiber: 1.7,
    trafficLight: 'green',
    category: 'fruits', 
    servingSize: '100g (1 taza)' 
  },
  { 
    id: 'f10', 
    name: 'Pera', 
    calories: 57, 
    carbs: 15, 
    protein: 0.4, 
    fat: 0.1, 
    fiber: 3.1,
    trafficLight: 'green',
    category: 'fruits', 
    servingSize: '100g (1 mediana)' 
  },
  
  // ========== VERDURAS (Verde - alimentos libres) ==========
  { 
    id: 'v1', 
    name: 'Brócoli', 
    calories: 34, 
    carbs: 7, 
    protein: 2.8, 
    fat: 0.4, 
    fiber: 2.6,
    trafficLight: 'green',
    category: 'vegetables', 
    servingSize: '100g (1 taza)' 
  },
  { 
    id: 'v2', 
    name: 'Zanahoria', 
    calories: 41, 
    carbs: 10, 
    protein: 0.9, 
    fat: 0.2, 
    fiber: 2.8,
    trafficLight: 'green',
    category: 'vegetables', 
    servingSize: '100g (1 grande)' 
  },
  { 
    id: 'v3', 
    name: 'Espinaca', 
    calories: 23, 
    carbs: 3.6, 
    protein: 2.9, 
    fat: 0.4, 
    fiber: 2.2,
    trafficLight: 'green',
    category: 'vegetables', 
    servingSize: '100g (2 tazas)' 
  },
  { 
    id: 'v4', 
    name: 'Tomate', 
    calories: 18, 
    carbs: 3.9, 
    protein: 0.9, 
    fat: 0.2, 
    fiber: 1.2,
    trafficLight: 'green',
    category: 'vegetables', 
    servingSize: '100g (1 mediano)' 
  },
  { 
    id: 'v5', 
    name: 'Lechuga', 
    calories: 15, 
    carbs: 2.9, 
    protein: 1.4, 
    fat: 0.2, 
    fiber: 1.3,
    trafficLight: 'green',
    category: 'free-foods', 
    servingSize: '100g (2 tazas)' 
  },
  { 
    id: 'v6', 
    name: 'Pepino', 
    calories: 16, 
    carbs: 3.6, 
    protein: 0.7, 
    fat: 0.1, 
    fiber: 0.5,
    trafficLight: 'green',
    category: 'free-foods', 
    servingSize: '100g (1/2 pepino)' 
  },
  { 
    id: 'v7', 
    name: 'Calabacita', 
    calories: 17, 
    carbs: 3.1, 
    protein: 1.2, 
    fat: 0.3, 
    fiber: 1,
    trafficLight: 'green',
    category: 'vegetables', 
    servingSize: '100g (1 taza)' 
  },
  { 
    id: 'v8', 
    name: 'Chayote', 
    calories: 19, 
    carbs: 4.5, 
    protein: 0.8, 
    fat: 0.1, 
    fiber: 1.7,
    trafficLight: 'green',
    category: 'vegetables', 
    servingSize: '100g (1/2 pieza)' 
  },
  { 
    id: 'v9', 
    name: 'Nopales', 
    calories: 16, 
    carbs: 3.3, 
    protein: 1.4, 
    fat: 0.1, 
    fiber: 2.2,
    trafficLight: 'green',
    category: 'free-foods', 
    servingSize: '100g (2 piezas)' 
  },
  { 
    id: 'v10', 
    name: 'Coliflor', 
    calories: 25, 
    carbs: 5, 
    protein: 1.9, 
    fat: 0.3, 
    fiber: 2,
    trafficLight: 'green',
    category: 'vegetables', 
    servingSize: '100g (1 taza)' 
  },
  
  // ========== PROTEÍNAS MAGRAS (Verde - consumo libre) ==========
  { 
    id: 'p1', 
    name: 'Pechuga de pollo sin piel', 
    calories: 165, 
    carbs: 0, 
    protein: 31, 
    fat: 3.6,
    trafficLight: 'green',
    fatType: 'polyunsaturated',
    category: 'proteins', 
    servingSize: '100g (1 pieza)' 
  },
  { 
    id: 'p2', 
    name: 'Pescado blanco (tilapia)', 
    calories: 128, 
    carbs: 0, 
    protein: 26, 
    fat: 2.7,
    trafficLight: 'green',
    fatType: 'polyunsaturated',
    category: 'proteins', 
    servingSize: '100g (1 filete)' 
  },
  { 
    id: 'p3', 
    name: 'Salmón', 
    calories: 208, 
    carbs: 0, 
    protein: 20, 
    fat: 13,
    trafficLight: 'yellow',
    fatType: 'polyunsaturated',
    category: 'proteins', 
    servingSize: '100g (1 filete)' 
  },
  { 
    id: 'p4', 
    name: 'Atún en agua', 
    calories: 116, 
    carbs: 0, 
    protein: 26, 
    fat: 0.8,
    trafficLight: 'green',
    fatType: 'polyunsaturated',
    category: 'proteins', 
    servingSize: '100g (1 lata)' 
  },
  { 
    id: 'p5', 
    name: 'Claras de huevo', 
    calories: 52, 
    carbs: 0.7, 
    protein: 11, 
    fat: 0.2,
    trafficLight: 'green',
    category: 'proteins', 
    servingSize: '100g (3 claras)' 
  },
  { 
    id: 'p6', 
    name: 'Huevo entero', 
    calories: 155, 
    carbs: 1.1, 
    protein: 13, 
    fat: 11,
    trafficLight: 'yellow',
    fatType: 'saturated',
    category: 'proteins', 
    servingSize: '100g (2 huevos)' 
  },
  { 
    id: 'p7', 
    name: 'Carne de res magra', 
    calories: 250, 
    carbs: 0, 
    protein: 26, 
    fat: 15,
    trafficLight: 'yellow',
    fatType: 'saturated',
    category: 'proteins', 
    servingSize: '100g' 
  },
  { 
    id: 'p8', 
    name: 'Pavo (pechuga)', 
    calories: 135, 
    carbs: 0, 
    protein: 30, 
    fat: 0.7,
    trafficLight: 'green',
    category: 'proteins', 
    servingSize: '100g' 
  },
  
  // ========== LEGUMINOSAS (Verde - consumo moderado) ==========
  { 
    id: 'l1', 
    name: 'Frijoles negros cocidos', 
    calories: 132, 
    carbs: 24, 
    protein: 8.9, 
    fat: 0.5, 
    fiber: 8.7,
    trafficLight: 'green',
    category: 'legumes', 
    servingSize: '100g (1/2 taza)' 
  },
  { 
    id: 'l2', 
    name: 'Lentejas cocidas', 
    calories: 116, 
    carbs: 20, 
    protein: 9, 
    fat: 0.4, 
    fiber: 7.9,
    trafficLight: 'green',
    category: 'legumes', 
    servingSize: '100g (1/2 taza)' 
  },
  { 
    id: 'l3', 
    name: 'Garbanzos cocidos', 
    calories: 164, 
    carbs: 27, 
    protein: 8.9, 
    fat: 2.6, 
    fiber: 7.6,
    trafficLight: 'green',
    category: 'legumes', 
    servingSize: '100g (1/2 taza)' 
  },
  { 
    id: 'l4', 
    name: 'Frijoles pintos cocidos', 
    calories: 143, 
    carbs: 26, 
    protein: 9, 
    fat: 0.7, 
    fiber: 9,
    trafficLight: 'green',
    category: 'legumes', 
    servingSize: '100g (1/2 taza)' 
  },
  { 
    id: 'l5', 
    name: 'Habas cocidas', 
    calories: 110, 
    carbs: 20, 
    protein: 7.6, 
    fat: 0.4, 
    fiber: 5.4,
    trafficLight: 'green',
    category: 'legumes', 
    servingSize: '100g (1/2 taza)' 
  },
  
  // ========== CEREALES Y TUBÉRCULOS (Amarillo - moderación) ==========
  { 
    id: 'g1', 
    name: 'Arroz blanco cocido', 
    calories: 130, 
    carbs: 28, 
    protein: 2.7, 
    fat: 0.3, 
    fiber: 0.4,
    trafficLight: 'yellow',
    category: 'grains', 
    servingSize: '100g (1/2 taza)' 
  },
  { 
    id: 'g2', 
    name: 'Arroz integral cocido', 
    calories: 111, 
    carbs: 23, 
    protein: 2.6, 
    fat: 0.9, 
    fiber: 1.8,
    trafficLight: 'green',
    category: 'grains', 
    servingSize: '100g (1/2 taza)' 
  },
  { 
    id: 'g3', 
    name: 'Pasta cocida', 
    calories: 131, 
    carbs: 25, 
    protein: 5, 
    fat: 1.1, 
    fiber: 1.8,
    trafficLight: 'yellow',
    category: 'grains', 
    servingSize: '100g (1/2 taza)' 
  },
  { 
    id: 'g4', 
    name: 'Pan integral', 
    calories: 247, 
    carbs: 41, 
    protein: 13, 
    fat: 4.2, 
    fiber: 7,
    trafficLight: 'green',
    category: 'grains', 
    servingSize: '100g (2 rebanadas)' 
  },
  { 
    id: 'g5', 
    name: 'Avena cruda', 
    calories: 389, 
    carbs: 66, 
    protein: 17, 
    fat: 6.9, 
    fiber: 10.6,
    trafficLight: 'green',
    category: 'grains', 
    servingSize: '100g' 
  },
  { 
    id: 'g6', 
    name: 'Quinoa cocida', 
    calories: 120, 
    carbs: 21, 
    protein: 4.4, 
    fat: 1.9, 
    fiber: 2.8,
    trafficLight: 'green',
    category: 'grains', 
    servingSize: '100g (1/2 taza)' 
  },
  { 
    id: 'g7', 
    name: 'Papa cocida', 
    calories: 77, 
    carbs: 17, 
    protein: 2, 
    fat: 0.1, 
    fiber: 2.1,
    trafficLight: 'yellow',
    category: 'grains', 
    servingSize: '100g (1 mediana)' 
  },
  { 
    id: 'g8', 
    name: 'Camote cocido', 
    calories: 90, 
    carbs: 21, 
    protein: 2, 
    fat: 0.2, 
    fiber: 3.3,
    trafficLight: 'green',
    category: 'grains', 
    servingSize: '100g (1 mediano)' 
  },
  { 
    id: 'g9', 
    name: 'Tortilla de maíz', 
    calories: 218, 
    carbs: 45, 
    protein: 5.7, 
    fat: 2.8, 
    fiber: 6.3,
    trafficLight: 'yellow',
    category: 'grains', 
    servingSize: '100g (2 piezas)' 
  },
  { 
    id: 'g10', 
    name: 'Pan blanco', 
    calories: 265, 
    carbs: 49, 
    protein: 9, 
    fat: 3.2, 
    fiber: 2.7,
    trafficLight: 'red',
    category: 'grains', 
    servingSize: '100g (3 rebanadas)' 
  },
  
  // ========== LÁCTEOS (Variable según tipo) ==========
  { 
    id: 'd1', 
    name: 'Leche descremada', 
    calories: 34, 
    carbs: 5, 
    protein: 3.4, 
    fat: 0.1,
    trafficLight: 'green',
    category: 'dairy', 
    servingSize: '100ml (1/2 vaso)' 
  },
  { 
    id: 'd2', 
    name: 'Leche semidescremada', 
    calories: 49, 
    carbs: 5, 
    protein: 3.3, 
    fat: 1.5,
    trafficLight: 'green',
    fatType: 'saturated',
    category: 'dairy', 
    servingSize: '100ml (1/2 vaso)' 
  },
  { 
    id: 'd3', 
    name: 'Leche entera', 
    calories: 61, 
    carbs: 4.8, 
    protein: 3.2, 
    fat: 3.3,
    trafficLight: 'yellow',
    fatType: 'saturated',
    category: 'dairy', 
    servingSize: '100ml (1/2 vaso)' 
  },
  { 
    id: 'd4', 
    name: 'Yogurt natural bajo en grasa', 
    calories: 59, 
    carbs: 4.7, 
    protein: 10, 
    fat: 0.4,
    trafficLight: 'green',
    category: 'dairy', 
    servingSize: '100g (1/2 taza)' 
  },
  { 
    id: 'd5', 
    name: 'Yogurt griego natural', 
    calories: 97, 
    carbs: 3.6, 
    protein: 9, 
    fat: 5,
    trafficLight: 'green',
    fatType: 'saturated',
    category: 'dairy', 
    servingSize: '100g' 
  },
  { 
    id: 'd6', 
    name: 'Queso panela', 
    calories: 280, 
    carbs: 4, 
    protein: 21, 
    fat: 20,
    trafficLight: 'yellow',
    fatType: 'saturated',
    category: 'dairy', 
    servingSize: '100g' 
  },
  { 
    id: 'd7', 
    name: 'Queso cottage bajo en grasa', 
    calories: 98, 
    carbs: 3.4, 
    protein: 11, 
    fat: 4.3,
    trafficLight: 'green',
    fatType: 'saturated',
    category: 'dairy', 
    servingSize: '100g' 
  },
  { 
    id: 'd8', 
    name: 'Queso cheddar', 
    calories: 403, 
    carbs: 1.3, 
    protein: 25, 
    fat: 33,
    trafficLight: 'red',
    fatType: 'saturated',
    category: 'dairy', 
    servingSize: '100g' 
  },
  
  // ========== GRASAS SALUDABLES (Amarillo - porciones controladas) ==========
  { 
    id: 'hf1', 
    name: 'Aguacate', 
    calories: 160, 
    carbs: 9, 
    protein: 2, 
    fat: 15, 
    fiber: 6.7,
    trafficLight: 'yellow',
    fatType: 'monounsaturated',
    category: 'healthy-fats', 
    servingSize: '100g (1/2 aguacate)' 
  },
  { 
    id: 'hf2', 
    name: 'Almendras', 
    calories: 579, 
    carbs: 22, 
    protein: 21, 
    fat: 50, 
    fiber: 12.5,
    trafficLight: 'yellow',
    fatType: 'monounsaturated',
    category: 'healthy-fats', 
    servingSize: '100g (23 piezas)' 
  },
  { 
    id: 'hf3', 
    name: 'Nueces', 
    calories: 654, 
    carbs: 14, 
    protein: 15, 
    fat: 65, 
    fiber: 6.7,
    trafficLight: 'yellow',
    fatType: 'polyunsaturated',
    category: 'healthy-fats', 
    servingSize: '100g (14 mitades)' 
  },
  { 
    id: 'hf4', 
    name: 'Aceite de oliva', 
    calories: 884, 
    carbs: 0, 
    protein: 0, 
    fat: 100,
    trafficLight: 'yellow',
    fatType: 'monounsaturated',
    category: 'healthy-fats', 
    servingSize: '100ml (7 cdas)' 
  },
  { 
    id: 'hf5', 
    name: 'Semillas de chía', 
    calories: 486, 
    carbs: 42, 
    protein: 17, 
    fat: 31, 
    fiber: 34.4,
    trafficLight: 'green',
    fatType: 'polyunsaturated',
    category: 'healthy-fats', 
    servingSize: '100g' 
  },
  { 
    id: 'hf6', 
    name: 'Cacahuates naturales', 
    calories: 567, 
    carbs: 16, 
    protein: 26, 
    fat: 49, 
    fiber: 8.5,
    trafficLight: 'yellow',
    fatType: 'monounsaturated',
    category: 'healthy-fats', 
    servingSize: '100g (28 piezas)' 
  },
  
  // ========== ALIMENTOS ALTOS EN CALORÍAS (Rojo - evitar o limitar) ==========
  { 
    id: 'ac1', 
    name: 'Papas fritas', 
    calories: 536, 
    carbs: 49, 
    protein: 6.6, 
    fat: 35, 
    fiber: 4.2,
    trafficLight: 'red',
    fatType: 'trans',
    category: 'high-calorie-avoid', 
    servingSize: '100g' 
  },
  { 
    id: 'ac2', 
    name: 'Galletas de chocolate', 
    calories: 502, 
    carbs: 64, 
    protein: 5.6, 
    fat: 25, 
    fiber: 2.3,
    trafficLight: 'red',
    fatType: 'saturated',
    category: 'high-calorie-avoid', 
    servingSize: '100g (7-8 piezas)' 
  },
  { 
    id: 'ac3', 
    name: 'Chocolate con leche', 
    calories: 546, 
    carbs: 59, 
    protein: 7.6, 
    fat: 31,
    trafficLight: 'red',
    fatType: 'saturated',
    category: 'high-calorie-avoid', 
    servingSize: '100g (1 tablilla)' 
  },
  { 
    id: 'ac4', 
    name: 'Pizza de pepperoni', 
    calories: 266, 
    carbs: 33, 
    protein: 11, 
    fat: 10,
    trafficLight: 'red',
    fatType: 'saturated',
    category: 'high-calorie-avoid', 
    servingSize: '100g (1 rebanada)' 
  },
  { 
    id: 'ac5', 
    name: 'Hamburguesa con queso', 
    calories: 295, 
    carbs: 24, 
    protein: 17, 
    fat: 14,
    trafficLight: 'red',
    fatType: 'saturated',
    category: 'high-calorie-avoid', 
    servingSize: '100g' 
  },
  { 
    id: 'ac6', 
    name: 'Hot dog', 
    calories: 290, 
    carbs: 22, 
    protein: 10, 
    fat: 18,
    trafficLight: 'red',
    fatType: 'saturated',
    category: 'high-calorie-avoid', 
    servingSize: '100g (1 pieza)' 
  },
  { 
    id: 'ac7', 
    name: 'Donas glaseadas', 
    calories: 452, 
    carbs: 51, 
    protein: 4.9, 
    fat: 25,
    trafficLight: 'red',
    fatType: 'trans',
    category: 'high-calorie-avoid', 
    servingSize: '100g (2 piezas)' 
  },
  { 
    id: 'ac8', 
    name: 'Helado de vainilla', 
    calories: 207, 
    carbs: 24, 
    protein: 3.5, 
    fat: 11,
    trafficLight: 'red',
    fatType: 'saturated',
    category: 'high-calorie-avoid', 
    servingSize: '100g (1/2 taza)' 
  },
  
  // ========== BEBIDAS ==========
  { 
    id: 'b1', 
    name: 'Agua natural', 
    calories: 0, 
    carbs: 0, 
    protein: 0, 
    fat: 0,
    trafficLight: 'green',
    category: 'beverages', 
    servingSize: '100ml' 
  },
  { 
    id: 'b2', 
    name: 'Café negro sin azúcar', 
    calories: 2, 
    carbs: 0, 
    protein: 0.3, 
    fat: 0,
    trafficLight: 'green',
    category: 'beverages', 
    servingSize: '100ml' 
  },
  { 
    id: 'b3', 
    name: 'Té verde sin azúcar', 
    calories: 1, 
    carbs: 0, 
    protein: 0, 
    fat: 0,
    trafficLight: 'green',
    category: 'beverages', 
    servingSize: '100ml' 
  },
  { 
    id: 'b4', 
    name: 'Jugo de naranja natural', 
    calories: 45, 
    carbs: 10, 
    protein: 0.7, 
    fat: 0.2,
    trafficLight: 'yellow',
    category: 'beverages', 
    servingSize: '100ml' 
  },
  { 
    id: 'b5', 
    name: 'Refresco de cola', 
    calories: 41, 
    carbs: 11, 
    protein: 0, 
    fat: 0,
    trafficLight: 'red',
    category: 'beverages', 
    servingSize: '100ml' 
  },
  { 
    id: 'b6', 
    name: 'Cerveza', 
    calories: 43, 
    carbs: 3.6, 
    protein: 0.5, 
    fat: 0,
    trafficLight: 'red',
    category: 'beverages', 
    servingSize: '100ml' 
  },
  { 
    id: 'b7', 
    name: 'Agua de jamaica sin azúcar', 
    calories: 2, 
    carbs: 0.5, 
    protein: 0, 
    fat: 0,
    trafficLight: 'green',
    category: 'beverages', 
    servingSize: '100ml' 
  },
  { 
    id: 'b8', 
    name: 'Leche de almendras sin azúcar', 
    calories: 17, 
    carbs: 0.6, 
    protein: 0.4, 
    fat: 1.4,
    trafficLight: 'green',
    fatType: 'monounsaturated',
    category: 'beverages', 
    servingSize: '100ml' 
  },
]
