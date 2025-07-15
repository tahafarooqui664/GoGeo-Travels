export interface BookingFormData {
  serviceType: 'helicopter' | 'private-jet' | 'bus' | 'private-car';
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  passengers: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  isRoundTrip: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export interface VehicleType {
  id: string;
  name: string;
  category: 'helicopter' | 'private-jet' | 'bus' | 'private-car';
  capacity: string;
  description: string;
  features: string[];
  image: string;
  priceRange: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'airport' | 'helipad' | 'hotel' | 'landmark' | 'station';
  category: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}
