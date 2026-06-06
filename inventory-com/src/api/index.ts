import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  category: string;
  unitPrice: number;
  costPrice: number;
  quantity: number;
  reorderLevel: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const productApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; data: Product[] }>('/products');
    return response.data.data;
  },
  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Product }>(`/products/${id}`);
    return response.data.data;
  },
  create: async (data: Partial<Product>) => {
    const response = await api.post<{ success: boolean; data: Product }>('/products', data);
    return response.data.data;
  },
  update: async (id: string, data: Partial<Product>) => {
    const response = await api.put<{ success: boolean; data: Product }>(`/products/${id}`, data);
    return response.data.data;
  },
  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean }>(`/products/${id}`);
    return response.data.success;
  },
};

export default api;
