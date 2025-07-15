const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Vehicle {
  id: string;
  name: string;
  category: 'HELICOPTER' | 'PRIVATE_JET' | 'BUS' | 'PRIVATE_CAR';
  capacity: string;
  description: string;
  features: string[];
  image: string;
  priceRange: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  city: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface City {
  id: string;
  name: string;
  slug: string;
  country: string;
  _count: {
    vehicles: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

class ApiService {
  private async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data.data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  async getVehicles(city?: string, category?: string): Promise<Vehicle[]> {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (category) params.append('category', category);
    
    const queryString = params.toString();
    const endpoint = `/vehicles${queryString ? `?${queryString}` : ''}`;
    
    return this.fetchApi<Vehicle[]>(endpoint);
  }

  async getVehicle(id: string): Promise<Vehicle> {
    return this.fetchApi<Vehicle>(`/vehicles/${id}`);
  }

  async getCities(): Promise<City[]> {
    return this.fetchApi<City[]>('/cities');
  }

  async getCity(slug: string): Promise<City> {
    return this.fetchApi<City>(`/cities/${slug}`);
  }

  async getVehicleCategories(city: string): Promise<string[]> {
    return this.fetchApi<string[]>(`/vehicles/categories/${city}`);
  }

  async submitBooking(bookingData: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Booking submission failed');
      }

      return data;
    } catch (error) {
      console.error('Booking submission error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default apiService;
