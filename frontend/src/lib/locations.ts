import { Location } from '@/types';

export const londonLocations: Location[] = [
  // Airports
  {
    id: 'heathrow',
    name: 'Heathrow Airport',
    type: 'airport',
    category: ['helicopter', 'private-jet', 'bus', 'private-car'],
  },
  {
    id: 'gatwick',
    name: 'Gatwick Airport',
    type: 'airport',
    category: ['helicopter', 'private-jet', 'bus', 'private-car'],
  },
  {
    id: 'stansted',
    name: 'Stansted Airport',
    type: 'airport',
    category: ['helicopter', 'private-jet', 'bus', 'private-car'],
  },
  {
    id: 'luton',
    name: 'Luton Airport',
    type: 'airport',
    category: ['helicopter', 'private-jet', 'bus', 'private-car'],
  },
  {
    id: 'city-airport',
    name: 'London City Airport',
    type: 'airport',
    category: ['helicopter', 'private-jet', 'bus', 'private-car'],
  },
  {
    id: 'biggin-hill',
    name: 'Biggin Hill Airport',
    type: 'airport',
    category: ['helicopter', 'private-jet'],
  },
  {
    id: 'northolt',
    name: 'RAF Northolt',
    type: 'airport',
    category: ['helicopter', 'private-jet'],
  },

  // Helipads
  {
    id: 'battersea-heliport',
    name: 'Battersea Heliport',
    type: 'helipad',
    category: ['helicopter'],
  },
  {
    id: 'redhill-aerodrome',
    name: 'Redhill Aerodrome',
    type: 'helipad',
    category: ['helicopter'],
  },
  {
    id: 'denham-aerodrome',
    name: 'Denham Aerodrome',
    type: 'helipad',
    category: ['helicopter'],
  },

  // Hotels & Landmarks
  {
    id: 'ritz-london',
    name: 'The Ritz London',
    type: 'hotel',
    category: ['helicopter', 'private-jet', 'bus', 'private-car'],
  },
  {
    id: 'savoy-hotel',
    name: 'The Savoy',
    type: 'hotel',
    category: ['helicopter', 'private-jet', 'bus', 'private-car'],
  },
  {
    id: 'claridges',
    name: "Claridge's",
    type: 'hotel',
    category: ['helicopter', 'private-jet', 'bus', 'private-car'],
  },
  {
    id: 'buckingham-palace',
    name: 'Buckingham Palace',
    type: 'landmark',
    category: ['bus', 'private-car'],
  },
  {
    id: 'tower-bridge',
    name: 'Tower Bridge',
    type: 'landmark',
    category: ['bus', 'private-car'],
  },
  {
    id: 'westminster',
    name: 'Westminster',
    type: 'landmark',
    category: ['bus', 'private-car'],
  },
  {
    id: 'canary-wharf',
    name: 'Canary Wharf',
    type: 'landmark',
    category: ['helicopter', 'private-jet', 'bus', 'private-car'],
  },

  // Train Stations
  {
    id: 'kings-cross',
    name: "King's Cross Station",
    type: 'station',
    category: ['bus', 'private-car'],
  },
  {
    id: 'paddington',
    name: 'Paddington Station',
    type: 'station',
    category: ['bus', 'private-car'],
  },
  {
    id: 'victoria',
    name: 'Victoria Station',
    type: 'station',
    category: ['bus', 'private-car'],
  },
  {
    id: 'waterloo',
    name: 'Waterloo Station',
    type: 'station',
    category: ['bus', 'private-car'],
  },
];
