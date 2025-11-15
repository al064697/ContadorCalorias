/**
 * BASE DE DATOS DE ALIMENTOS
 * 
 * Contiene una lista predefinida de alimentos comunes con sus valores nutricionales.
 * Cada alimento incluye:
 * - ID único
 * - Nombre del alimento
 * - Calorías por porción
 * - Categoría (frutas, verduras, proteínas, etc.)
 * - Tamaño de porción estándar
 * 
 * Esta base de datos se usa para:
 * - Autocompletar al agregar alimentos
 * - Calcular calorías automáticamente
 * - Filtrar por categorías
 */

import { Food } from '../types'

export const FOODS_DATABASE: Food[] = [
  // ========== FRUTAS ==========
  { id: 'f1', name: 'Manzana', calories: 52, category: 'fruits', servingSize: '100g' },
  { id: 'f2', name: 'Plátano', calories: 89, category: 'fruits', servingSize: '100g' },
  { id: 'f3', name: 'Naranja', calories: 47, category: 'fruits', servingSize: '100g' },
  { id: 'f4', name: 'Fresa', calories: 32, category: 'fruits', servingSize: '100g' },
  { id: 'f5', name: 'Uvas', calories: 69, category: 'fruits', servingSize: '100g' },
  { id: 'f6', name: 'Sandía', calories: 30, category: 'fruits', servingSize: '100g' },
  { id: 'f7', name: 'Piña', calories: 50, category: 'fruits', servingSize: '100g' },
  { id: 'f8', name: 'Mango', calories: 60, category: 'fruits', servingSize: '100g' },
  
  // ========== VERDURAS ==========
  { id: 'v1', name: 'Brócoli', calories: 34, category: 'vegetables', servingSize: '100g' },
  { id: 'v2', name: 'Zanahoria', calories: 41, category: 'vegetables', servingSize: '100g' },
  { id: 'v3', name: 'Espinaca', calories: 23, category: 'vegetables', servingSize: '100g' },
  { id: 'v4', name: 'Tomate', calories: 18, category: 'vegetables', servingSize: '100g' },
  { id: 'v5', name: 'Lechuga', calories: 15, category: 'vegetables', servingSize: '100g' },
  { id: 'v6', name: 'Pepino', calories: 16, category: 'vegetables', servingSize: '100g' },
  { id: 'v7', name: 'Aguacate', calories: 160, category: 'vegetables', servingSize: '100g' },
  
  // ========== PROTEÍNAS ==========
  { id: 'p1', name: 'Pechuga de pollo', calories: 165, category: 'proteins', servingSize: '100g' },
  { id: 'p2', name: 'Carne de res', calories: 250, category: 'proteins', servingSize: '100g' },
  { id: 'p3', name: 'Salmón', calories: 208, category: 'proteins', servingSize: '100g' },
  { id: 'p4', name: 'Atún', calories: 132, category: 'proteins', servingSize: '100g' },
  { id: 'p5', name: 'Huevo', calories: 155, category: 'proteins', servingSize: '100g (2 huevos)' },
  { id: 'p6', name: 'Lentejas', calories: 116, category: 'proteins', servingSize: '100g' },
  { id: 'p7', name: 'Frijoles negros', calories: 132, category: 'proteins', servingSize: '100g' },
  
  // ========== GRANOS Y CEREALES ==========
  { id: 'g1', name: 'Arroz blanco', calories: 130, category: 'grains', servingSize: '100g cocido' },
  { id: 'g2', name: 'Arroz integral', calories: 111, category: 'grains', servingSize: '100g cocido' },
  { id: 'g3', name: 'Pasta', calories: 131, category: 'grains', servingSize: '100g cocida' },
  { id: 'g4', name: 'Pan integral', calories: 247, category: 'grains', servingSize: '100g' },
  { id: 'g5', name: 'Avena', calories: 389, category: 'grains', servingSize: '100g cruda' },
  { id: 'g6', name: 'Quinoa', calories: 120, category: 'grains', servingSize: '100g cocida' },
  
  // ========== LÁCTEOS ==========
  { id: 'd1', name: 'Leche entera', calories: 61, category: 'dairy', servingSize: '100ml' },
  { id: 'd2', name: 'Leche descremada', calories: 34, category: 'dairy', servingSize: '100ml' },
  { id: 'd3', name: 'Yogurt natural', calories: 59, category: 'dairy', servingSize: '100g' },
  { id: 'd4', name: 'Queso cheddar', calories: 403, category: 'dairy', servingSize: '100g' },
  { id: 'd5', name: 'Queso panela', calories: 280, category: 'dairy', servingSize: '100g' },
  
  // ========== SNACKS ==========
  { id: 's1', name: 'Almendras', calories: 579, category: 'snacks', servingSize: '100g' },
  { id: 's2', name: 'Nueces', calories: 654, category: 'snacks', servingSize: '100g' },
  { id: 's3', name: 'Papas fritas', calories: 536, category: 'snacks', servingSize: '100g' },
  { id: 's4', name: 'Galletas', calories: 502, category: 'snacks', servingSize: '100g' },
  { id: 's5', name: 'Chocolate', calories: 546, category: 'snacks', servingSize: '100g' },
  { id: 's6', name: 'Palomitas', calories: 387, category: 'snacks', servingSize: '100g' },
  
  // ========== BEBIDAS ==========
  { id: 'b1', name: 'Agua', calories: 0, category: 'beverages', servingSize: '100ml' },
  { id: 'b2', name: 'Jugo de naranja', calories: 45, category: 'beverages', servingSize: '100ml' },
  { id: 'b3', name: 'Café negro', calories: 2, category: 'beverages', servingSize: '100ml' },
  { id: 'b4', name: 'Té verde', calories: 1, category: 'beverages', servingSize: '100ml' },
  { id: 'b5', name: 'Refresco', calories: 41, category: 'beverages', servingSize: '100ml' },
  { id: 'b6', name: 'Cerveza', calories: 43, category: 'beverages', servingSize: '100ml' },
]
