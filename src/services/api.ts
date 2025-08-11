import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = 'https://6860b9808e7486408443d77e.mockapi.io';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productService = {
  // Obtener todos los productos
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await api.get('/productos');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Error al cargar los productos');
    }
  },

  // Obtener producto por ID
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Error al cargar el producto');
    }
  },

  // Crear nuevo producto
  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      const response = await api.post('/productos', product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Error al crear el producto');
    }
  },

  // Actualizar producto
  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    try {
      const response = await api.put(`/productos/${id}`, product);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Error al actualizar el producto');
    }
  },

  // Eliminar producto
  async deleteProduct(id: string): Promise<void> {
    try {
      await api.delete(`/productos/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Error al eliminar el producto');
    }
  },
};

export default api;
