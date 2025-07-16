export interface CityContent {
  name: string;
  country: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  trustIndicator: string;
  phoneNumber: string;
  landmarks: string[];
  fleetDescription: string;
  aboutDescription: string;
  backgroundImage: string;
}

export const cityContent: Record<string, CityContent> = {
  london: {
    name: 'London',
    country: 'United Kingdom',
    heroTitle: "Experience London's",
    heroSubtitle: 'Elite Transportation',
    heroDescription: 'From luxury helicopters soaring above the Thames to private jets connecting you globally, GoGeo Travels London delivers unparalleled comfort and sophistication in every journey.',
    trustIndicator: "Trusted by London's Elite",
    phoneNumber: '+44 208 432 6418',
    landmarks: ['Thames', 'Big Ben', 'Tower Bridge', 'Buckingham Palace'],
    fleetDescription: 'Discover our meticulously curated collection of luxury vehicles, each designed to provide an unparalleled transportation experience in the heart of London.',
    aboutDescription: 'Based in London, we provide premium transportation services across the UK capital with our complete fleet of helicopters, private jets, luxury cars, and executive buses.',
    backgroundImage: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  manchester: {
    name: 'Manchester',
    country: 'United Kingdom',
    heroTitle: "Discover Manchester's",
    heroSubtitle: 'Premium Transportation',
    heroDescription: 'Experience the vibrant energy of Manchester with our luxury ground transportation. From executive cars navigating the Northern Quarter to comfortable buses for group travel, we deliver excellence in every journey.',
    trustIndicator: "Trusted by Manchester's Business Community",
    phoneNumber: '+44 161 123 4567',
    landmarks: ['Northern Quarter', 'Old Trafford', 'Etihad Stadium', 'Manchester Cathedral'],
    fleetDescription: 'Our premium fleet in Manchester features luxury cars and executive buses, perfectly suited for business travel and group transportation in the Greater Manchester area.',
    aboutDescription: 'Serving Manchester and the Greater Manchester area, we specialize in luxury ground transportation with premium cars and executive buses for business and leisure travel.',
    backgroundImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  budapest: {
    name: 'Budapest',
    country: 'Hungary',
    heroTitle: "Explore Budapest's",
    heroSubtitle: 'Elegant Transportation',
    heroDescription: 'Navigate the stunning Hungarian capital in style with our premium transportation services. From luxury cars crossing the iconic Chain Bridge to executive buses touring the historic Buda Castle, experience Budapest like never before.',
    trustIndicator: "Trusted by Budapest's Distinguished Guests",
    phoneNumber: '+36 1 234 5678',
    landmarks: ['Chain Bridge', 'Buda Castle', 'Parliament Building', 'Széchenyi Thermal Baths'],
    fleetDescription: 'Our elegant fleet in Budapest offers luxury cars and comfortable buses, ideal for exploring the beautiful Hungarian capital and its historic landmarks.',
    aboutDescription: 'Operating in the heart of Budapest, we provide sophisticated transportation solutions with luxury vehicles and executive coaches for exploring Hungary\'s magnificent capital.',
    backgroundImage: 'https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  madrid: {
    name: 'Madrid',
    country: 'Spain',
    heroTitle: "Experience Madrid's",
    heroSubtitle: 'Sophisticated Transportation',
    heroDescription: 'Immerse yourself in the vibrant Spanish capital with our luxury transportation services. From premium cars navigating the elegant Paseo del Prado to executive buses exploring the historic Royal Palace, discover Madrid in ultimate comfort.',
    trustIndicator: "Trusted by Madrid's Elite Travelers",
    phoneNumber: '+34 91 123 4567',
    landmarks: ['Prado Museum', 'Royal Palace', 'Retiro Park', 'Gran Vía'],
    fleetDescription: 'Our sophisticated fleet in Madrid features luxury vehicles and executive coaches, perfect for experiencing the rich culture and vibrant energy of Spain\'s capital.',
    aboutDescription: 'Based in Madrid, we offer premium transportation services throughout the Spanish capital with luxury cars and executive buses for business and cultural exploration.',
    backgroundImage: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  }
};

export const getCityContent = (citySlug: string): CityContent => {
  return cityContent[citySlug] || cityContent.london;
};
