import { VehicleType } from '@/types';

export const vehicleFleet: VehicleType[] = [
  // Helicopters
  {
    id: 'helicopter-luxury',
    name: 'Executive Helicopter',
    category: 'helicopter',
    capacity: '4-6 Passengers',
    description: 'Experience London from above in our state-of-the-art helicopters with panoramic views and luxury interiors.',
    features: ['Panoramic Windows', 'Noise Cancellation', 'Leather Seating', 'Climate Control', 'Professional Pilot'],
    image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £1,200/hour',
  },
  {
    id: 'helicopter-vip',
    name: 'VIP Helicopter',
    category: 'helicopter',
    capacity: '2-4 Passengers',
    description: 'Ultimate luxury helicopter service with premium amenities and personalized service for the most discerning clients.',
    features: ['Premium Leather', 'Champagne Service', 'Concierge', 'Private Lounge Access', 'Bespoke Routes'],
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £2,000/hour',
  },

  // Private Jets
  {
    id: 'jet-light',
    name: 'Light Private Jet',
    category: 'private-jet',
    capacity: '6-8 Passengers',
    description: 'Perfect for short to medium-haul flights with exceptional comfort and efficiency.',
    features: ['Spacious Cabin', 'Wi-Fi', 'Refreshment Center', 'Business Seating', 'Baggage Compartment'],
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £3,500/hour',
  },
  {
    id: 'jet-mid-size',
    name: 'Mid-Size Private Jet',
    category: 'private-jet',
    capacity: '8-10 Passengers',
    description: 'Enhanced comfort and range for longer journeys with premium amenities and spacious interiors.',
    features: ['Stand-up Cabin', 'Full Galley', 'Entertainment System', 'Conference Table', 'Lavatory'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £5,500/hour',
  },
  {
    id: 'jet-heavy',
    name: 'Heavy Private Jet',
    category: 'private-jet',
    capacity: '12-16 Passengers',
    description: 'Ultimate luxury for long-haul flights with bedroom suites, full kitchen, and premium entertainment.',
    features: ['Bedroom Suite', 'Full Kitchen', 'Shower', 'Lounge Area', 'Satellite Communication'],
    image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £8,500/hour',
  },

  // Executive Buses
  {
    id: 'bus-executive',
    name: 'Executive Coach',
    category: 'bus',
    capacity: '25-35 Passengers',
    description: 'Luxury group transportation with premium amenities for corporate events and group travel.',
    features: ['Reclining Seats', 'Wi-Fi', 'Entertainment System', 'Refreshment Bar', 'Climate Control'],
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £150/hour',
  },
  {
    id: 'bus-luxury',
    name: 'Luxury Tour Bus',
    category: 'bus',
    capacity: '45-55 Passengers',
    description: 'Premium touring experience with panoramic windows and luxury amenities for sightseeing.',
    features: ['Panoramic Windows', 'Audio Guide System', 'Comfortable Seating', 'Restroom', 'Professional Guide'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £200/hour',
  },
  {
    id: 'bus-vip',
    name: 'VIP Party Bus',
    category: 'bus',
    capacity: '15-25 Passengers',
    description: 'Ultimate party experience with premium sound system, lighting, and luxury amenities.',
    features: ['Premium Sound System', 'LED Lighting', 'Bar Area', 'Leather Seating', 'Dance Floor'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £250/hour',
  },

  // Private Cars
  {
    id: 'car-luxury-sedan',
    name: 'Luxury Sedan',
    category: 'private-car',
    capacity: '1-3 Passengers',
    description: 'Elegant and comfortable transportation for business and personal travel.',
    features: ['Leather Interior', 'Climate Control', 'Professional Chauffeur', 'Complimentary Water', 'Phone Chargers'],
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £80/hour',
  },
  {
    id: 'car-suv',
    name: 'Executive SUV',
    category: 'private-car',
    capacity: '1-6 Passengers',
    description: 'Spacious and luxurious SUV perfect for families or small groups with premium amenities.',
    features: ['Spacious Interior', 'Premium Sound', 'Tinted Windows', 'Luggage Space', 'Child Seats Available'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £120/hour',
  },
  {
    id: 'car-rolls-royce',
    name: 'Rolls-Royce',
    category: 'private-car',
    capacity: '1-4 Passengers',
    description: 'The pinnacle of luxury transportation with unmatched elegance and prestige.',
    features: ['Handcrafted Interior', 'Champagne Service', 'Starlight Headliner', 'Massage Seats', 'Concierge Service'],
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    priceRange: 'From £300/hour',
  },
];
