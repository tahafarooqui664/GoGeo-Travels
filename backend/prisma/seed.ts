import { PrismaClient, VehicleType } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create cities
  const london = await prisma.city.upsert({
    where: { slug: 'london' },
    update: {},
    create: {
      name: 'London',
      slug: 'london',
      country: 'UK',
      isActive: true,
    },
  });

  const manchester = await prisma.city.upsert({
    where: { slug: 'manchester' },
    update: {},
    create: {
      name: 'Manchester',
      slug: 'manchester',
      country: 'UK',
      isActive: true,
    },
  });

  const budapest = await prisma.city.upsert({
    where: { slug: 'budapest' },
    update: {},
    create: {
      name: 'Budapest',
      slug: 'budapest',
      country: 'Hungary',
      isActive: true,
    },
  });

  const madrid = await prisma.city.upsert({
    where: { slug: 'madrid' },
    update: {},
    create: {
      name: 'Madrid',
      slug: 'madrid',
      country: 'Spain',
      isActive: true,
    },
  });

  console.log('✅ Cities created');

  // Create vehicles for London (all types)
  const londonVehicles = [
    // Private Jets
    {
      name: 'Gulfstream G650',
      category: VehicleType.PRIVATE_JET,
      capacity: '14-18 Passengers',
      description: 'Ultra-long-range business jet with exceptional speed and luxury amenities for transcontinental flights.',
      features: ['Ultra-long Range', 'High-speed Wi-Fi', 'Full Galley', 'Master Suite', 'Conference Area', 'Premium Entertainment'],
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £12,000/hour',
      cityId: london.id,
    },
    {
      name: 'Bombardier Global 7500',
      category: VehicleType.PRIVATE_JET,
      capacity: '10-14 Passengers',
      description: 'World\'s largest and longest-range business jet with four distinct living spaces and unmatched comfort.',
      features: ['Four Living Spaces', 'Master Bedroom', 'Full Kitchen', 'Shower', 'Satellite Communications', 'Premium Sound System'],
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £15,000/hour',
      cityId: london.id,
    },
    {
      name: 'Cessna Citation X+',
      category: VehicleType.PRIVATE_JET,
      capacity: '8-12 Passengers',
      description: 'Fastest civilian aircraft with cutting-edge technology and luxurious cabin for efficient business travel.',
      features: ['Fastest Speed', 'Advanced Avionics', 'Spacious Cabin', 'Business Seating', 'High-speed Internet', 'Premium Catering'],
      image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £8,500/hour',
      cityId: london.id,
    },
    // Helicopters
    {
      name: 'Airbus H175',
      category: VehicleType.HELICOPTER,
      capacity: '12-16 Passengers',
      description: 'Super-medium twin-engine helicopter with exceptional safety features and luxury VIP configuration.',
      features: ['VIP Interior', 'Panoramic Windows', 'Advanced Safety Systems', 'Noise Reduction', 'Climate Control', 'Premium Seating'],
      image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £3,200/hour',
      cityId: london.id,
    },
    {
      name: 'Leonardo AW139',
      category: VehicleType.HELICOPTER,
      capacity: '10-15 Passengers',
      description: 'Medium twin-engine helicopter renowned for its versatility, safety, and luxurious passenger experience.',
      features: ['Twin Engine Safety', 'Spacious Cabin', 'Leather Interior', 'Entertainment System', 'Refreshment Center', 'Professional Crew'],
      image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £2,800/hour',
      cityId: london.id,
    },
    {
      name: 'Bell 429 GlobalRanger',
      category: VehicleType.HELICOPTER,
      capacity: '6-8 Passengers',
      description: 'Light twin-engine helicopter with advanced glass cockpit and exceptional performance for executive transport.',
      features: ['Glass Cockpit', 'Executive Seating', 'Quiet Operation', 'Advanced Navigation', 'Luxury Amenities', 'Scenic Routes'],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £2,200/hour',
      cityId: london.id,
    },
  ];

  for (const vehicle of londonVehicles) {
    await prisma.vehicle.upsert({
      where: { id: `${vehicle.name.toLowerCase().replace(/\s+/g, '-')}-${london.slug}` },
      update: {},
      create: {
        id: `${vehicle.name.toLowerCase().replace(/\s+/g, '-')}-${london.slug}`,
        ...vehicle,
      },
    });
  }

  console.log('✅ London vehicles created (jets and helicopters)');

  // Add buses and cars for London
  const londonBusesAndCars = [
    // Buses
    {
      name: 'Mercedes-Benz Tourismo',
      category: VehicleType.BUS,
      capacity: '45-55 Passengers',
      description: 'Premium touring coach with exceptional comfort and advanced safety features for group transportation.',
      features: ['Reclining Seats', 'Air Conditioning', 'Entertainment System', 'Wi-Fi', 'Restroom', 'Panoramic Windows'],
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £180/hour',
      cityId: london.id,
    },
    {
      name: 'Volvo 9700 Executive',
      category: VehicleType.BUS,
      capacity: '35-45 Passengers',
      description: 'Executive coach with premium amenities and superior comfort for corporate events and luxury tours.',
      features: ['Executive Seating', 'Conference Table', 'Premium Sound', 'Climate Control', 'Refreshment Bar', 'Professional Driver'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £220/hour',
      cityId: london.id,
    },
    {
      name: 'Setra TopClass S 516',
      category: VehicleType.BUS,
      capacity: '25-35 Passengers',
      description: 'Luxury VIP coach with spacious interior and premium amenities for exclusive group transportation.',
      features: ['VIP Seating', 'LED Lighting', 'Premium Bar', 'Entertainment Center', 'Leather Interior', 'Concierge Service'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £280/hour',
      cityId: london.id,
    },
    // Private Cars
    {
      name: 'Rolls-Royce Phantom',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'The pinnacle of automotive luxury with handcrafted excellence and unparalleled comfort.',
      features: ['Handcrafted Interior', 'Starlight Headliner', 'Champagne Cooler', 'Massage Seats', 'Bespoke Audio', 'Concierge Service'],
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £350/hour',
      cityId: london.id,
    },
    {
      name: 'Bentley Mulsanne',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'British luxury sedan combining traditional craftsmanship with modern technology and performance.',
      features: ['Handcrafted Leather', 'Veneer Trim', 'Premium Audio', 'Climate Comfort', 'Privacy Glass', 'Professional Chauffeur'],
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £280/hour',
      cityId: london.id,
    },
    {
      name: 'Mercedes-Benz S-Class',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'Executive sedan with cutting-edge technology and supreme comfort for business and leisure travel.',
      features: ['Executive Seating', 'Advanced Safety', 'Premium Sound', 'Ambient Lighting', 'Wireless Charging', 'Refreshments'],
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £150/hour',
      cityId: london.id,
    },
  ];

  for (const vehicle of londonBusesAndCars) {
    await prisma.vehicle.upsert({
      where: { id: `${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${london.slug}` },
      update: {},
      create: {
        id: `${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${london.slug}`,
        ...vehicle,
      },
    });
  }

  console.log('✅ London vehicles created (buses and cars)');

  // Create vehicles for Manchester (buses and cars only)
  const manchesterVehicles = [
    // Buses
    {
      name: 'Scania Touring HD',
      category: VehicleType.BUS,
      capacity: '40-50 Passengers',
      description: 'Modern touring coach with excellent fuel efficiency and passenger comfort for regional travel.',
      features: ['Comfortable Seating', 'Air Conditioning', 'Wi-Fi', 'USB Charging', 'Luggage Space', 'Professional Driver'],
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £160/hour',
      cityId: manchester.id,
    },
    {
      name: 'MAN Lion\'s Coach',
      category: VehicleType.BUS,
      capacity: '35-45 Passengers',
      description: 'Reliable and comfortable coach perfect for group transportation and corporate events.',
      features: ['Ergonomic Seats', 'Climate Control', 'Entertainment', 'Safety Systems', 'Refreshment Area', 'Experienced Driver'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £140/hour',
      cityId: manchester.id,
    },
    {
      name: 'Iveco Magelys Pro',
      category: VehicleType.BUS,
      capacity: '30-40 Passengers',
      description: 'Premium coach with advanced comfort features and excellent road performance for luxury group travel.',
      features: ['Premium Comfort', 'Advanced Suspension', 'Quiet Operation', 'Modern Interior', 'Safety Features', 'Professional Service'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £170/hour',
      cityId: manchester.id,
    },
    // Private Cars
    {
      name: 'BMW 7 Series',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'Executive sedan with innovative technology and luxurious comfort for premium transportation.',
      features: ['Executive Lounge', 'Gesture Control', 'Premium Audio', 'Massage Function', 'Ambient Lighting', 'Professional Chauffeur'],
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £120/hour',
      cityId: manchester.id,
    },
    {
      name: 'Audi A8',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'Sophisticated luxury sedan with cutting-edge technology and refined comfort for discerning travelers.',
      features: ['Quattro Drive', 'Virtual Cockpit', 'Premium Interior', 'Advanced Safety', 'Comfort Seating', 'Concierge Service'],
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £110/hour',
      cityId: manchester.id,
    },
    {
      name: 'Jaguar XJ',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'British luxury sedan combining elegant design with dynamic performance and premium amenities.',
      features: ['British Luxury', 'Premium Leather', 'Advanced Infotainment', 'Climate Comfort', 'Refined Performance', 'Professional Driver'],
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From £130/hour',
      cityId: manchester.id,
    },
  ];

  for (const vehicle of manchesterVehicles) {
    await prisma.vehicle.upsert({
      where: { id: `${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${manchester.slug}` },
      update: {},
      create: {
        id: `${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${manchester.slug}`,
        ...vehicle,
      },
    });
  }

  console.log('✅ Manchester vehicles created (buses and cars only)');

  // Create vehicles for Budapest (buses and cars only)
  const budapestVehicles = [
    // Buses
    {
      name: 'Mercedes-Benz Sprinter VIP',
      category: VehicleType.BUS,
      capacity: '16-20 Passengers',
      description: 'Luxury VIP minibus with premium amenities for group transportation in Budapest.',
      features: ['VIP Seating', 'Air Conditioning', 'Wi-Fi', 'Entertainment System', 'Refreshments', 'Professional Driver'],
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €120/hour',
      cityId: budapest.id,
    },
    {
      name: 'Volvo 9900 Executive',
      category: VehicleType.BUS,
      capacity: '30-40 Passengers',
      description: 'Executive touring coach with superior comfort for corporate events and city tours.',
      features: ['Executive Comfort', 'Climate Control', 'Premium Sound', 'Panoramic Windows', 'Luggage Space', 'Tour Guide System'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €150/hour',
      cityId: budapest.id,
    },
    {
      name: 'Neoplan Cityliner',
      category: VehicleType.BUS,
      capacity: '45-55 Passengers',
      description: 'Premium touring coach perfect for large group transportation and sightseeing tours.',
      features: ['Comfortable Seating', 'Advanced Suspension', 'Entertainment', 'Restroom', 'Catering Service', 'Multi-language Guide'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €180/hour',
      cityId: budapest.id,
    },
    // Private Cars
    {
      name: 'Mercedes-Benz S-Class',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'Luxury sedan with cutting-edge technology and supreme comfort for Budapest business travel.',
      features: ['Executive Interior', 'Advanced Safety', 'Premium Audio', 'Climate Comfort', 'Wireless Charging', 'Concierge Service'],
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €80/hour',
      cityId: budapest.id,
    },
    {
      name: 'BMW 7 Series',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'Executive sedan with innovative technology and luxurious comfort for premium transportation.',
      features: ['Executive Lounge', 'Gesture Control', 'Premium Audio', 'Massage Function', 'Ambient Lighting', 'Professional Chauffeur'],
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €75/hour',
      cityId: budapest.id,
    },
    {
      name: 'Audi A8 L',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'Sophisticated luxury sedan with extended wheelbase and refined comfort for discerning travelers.',
      features: ['Extended Wheelbase', 'Quattro Drive', 'Virtual Cockpit', 'Premium Interior', 'Advanced Safety', 'Comfort Seating'],
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €85/hour',
      cityId: budapest.id,
    },
  ];

  for (const vehicle of budapestVehicles) {
    await prisma.vehicle.upsert({
      where: { id: `${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${budapest.slug}` },
      update: {},
      create: {
        id: `${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${budapest.slug}`,
        ...vehicle,
      },
    });
  }

  console.log('✅ Budapest vehicles created (buses and cars only)');

  // Create vehicles for Madrid (buses and cars only)
  const madridVehicles = [
    // Buses
    {
      name: 'Irizar i8 Executive',
      category: VehicleType.BUS,
      capacity: '35-45 Passengers',
      description: 'Premium executive coach with Spanish elegance and superior comfort for Madrid tours.',
      features: ['Spanish Design', 'Premium Comfort', 'Climate Control', 'Entertainment System', 'Wi-Fi', 'Professional Service'],
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €140/hour',
      cityId: madrid.id,
    },
    {
      name: 'Scania Touring HD',
      category: VehicleType.BUS,
      capacity: '40-50 Passengers',
      description: 'Modern touring coach with excellent comfort and efficiency for Madrid group transportation.',
      features: ['Modern Design', 'Comfortable Seating', 'Air Conditioning', 'USB Charging', 'Luggage Space', 'Tour Guide System'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €130/hour',
      cityId: madrid.id,
    },
    {
      name: 'Mercedes-Benz Tourismo RHD',
      category: VehicleType.BUS,
      capacity: '48-55 Passengers',
      description: 'Luxury touring coach with premium amenities perfect for Madrid sightseeing and corporate events.',
      features: ['Luxury Interior', 'Panoramic Windows', 'Premium Sound', 'Restroom', 'Catering Options', 'Multi-language Support'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €170/hour',
      cityId: madrid.id,
    },
    // Private Cars
    {
      name: 'Mercedes-Benz E-Class',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'Executive sedan combining elegance and performance for premium Madrid transportation.',
      features: ['Executive Comfort', 'Advanced Technology', 'Premium Audio', 'Climate Control', 'Safety Systems', 'Professional Driver'],
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €70/hour',
      cityId: madrid.id,
    },
    {
      name: 'BMW 5 Series',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'Business sedan with dynamic performance and luxury features for Madrid business travel.',
      features: ['Business Comfort', 'Dynamic Performance', 'Premium Interior', 'Advanced Navigation', 'Connectivity', 'Concierge Service'],
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €65/hour',
      cityId: madrid.id,
    },
    {
      name: 'Lexus LS 500h',
      category: VehicleType.PRIVATE_CAR,
      capacity: '1-4 Passengers',
      description: 'Hybrid luxury sedan with Japanese craftsmanship and eco-friendly performance for Madrid.',
      features: ['Hybrid Technology', 'Japanese Craftsmanship', 'Luxury Interior', 'Eco-Friendly', 'Advanced Safety', 'Premium Service'],
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      priceRange: 'From €90/hour',
      cityId: madrid.id,
    },
  ];

  for (const vehicle of madridVehicles) {
    await prisma.vehicle.upsert({
      where: { id: `${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${madrid.slug}` },
      update: {},
      create: {
        id: `${vehicle.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${madrid.slug}`,
        ...vehicle,
      },
    });
  }

  console.log('✅ Madrid vehicles created (buses and cars only)');
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
