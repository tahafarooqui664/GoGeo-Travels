export interface BookingRequest {
  city: string;
  transportMode: string;
  vehicleId?: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface ContactRequest {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export interface EmailTemplate {
  to: string[];
  subject: string;
  htmlContent: string;
  textContent?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
