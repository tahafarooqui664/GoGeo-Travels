'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiService, Vehicle } from '@/services/api';
import { useCityContext } from '@/contexts/CityContext';

const FleetSection = () => {
  const { selectedCity } = useCityContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get available categories based on selected city
  const getAvailableCategories = () => {
    const allCategories = [
      { id: 'all', name: 'All Vehicles', icon: '🚀' },
      { id: 'HELICOPTER', name: 'Helicopters', icon: '🚁' },
      { id: 'PRIVATE_JET', name: 'Private Jets', icon: '✈️' },
      { id: 'BUS', name: 'Executive Buses', icon: '🚌' },
      { id: 'PRIVATE_CAR', name: 'Private Cars', icon: '🚗' },
    ];

    if (!selectedCity) return allCategories;

    // For London, show all categories
    if (selectedCity.slug === 'london') {
      return allCategories;
    }

    // For other cities (Manchester, Budapest, Madrid), only show cars and buses
    return allCategories.filter(cat =>
      cat.id === 'all' || cat.id === 'BUS' || cat.id === 'PRIVATE_CAR'
    );
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!selectedCity) return;

      try {
        setLoading(true);
        setError(null);

        const vehicleData = await apiService.getVehicles(selectedCity.slug);
        setVehicles(vehicleData);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('Failed to load vehicles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [selectedCity]);

  const filteredVehicles = selectedCategory === 'all'
    ? vehicles
    : vehicles.filter(vehicle => vehicle.category === selectedCategory);

  return (
    <section id="fleet" className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary-900 mb-8 tracking-tight">
            Our Premium Fleet
            {selectedCity && (
              <span className="block text-3xl md:text-4xl text-accent-600 mt-2">
                in {selectedCity.name}
              </span>
            )}
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-light">
            Discover our meticulously curated collection of luxury vehicles, each designed to provide
            an unparalleled transportation experience in {selectedCity?.name || 'your selected city'}.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 animate-stagger">
          {getAvailableCategories().map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold smooth-transition shadow-elegant ${
                selectedCategory === category.id
                  ? 'gradient-accent text-white shadow-elegant-lg hover-lift'
                  : 'bg-white text-primary-800 hover:bg-neutral-50 hover:text-accent-600 hover-lift border border-neutral-200'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="tracking-wide">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-elegant-lg overflow-hidden animate-pulse border border-neutral-100">
                <div className="h-72 bg-neutral-200"></div>
                <div className="p-8">
                  <div className="h-6 bg-neutral-200 rounded mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-6 w-3/4"></div>
                  <div className="flex gap-2 mb-6">
                    <div className="h-6 bg-neutral-200 rounded w-16"></div>
                    <div className="h-6 bg-neutral-200 rounded w-20"></div>
                    <div className="h-6 bg-neutral-200 rounded w-18"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-neutral-200 rounded w-24"></div>
                    <div className="h-10 bg-neutral-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">
              Oops! Something went wrong
            </h3>
            <p className="text-neutral-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary px-8 py-3"
            >
              Try Again
            </button>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">
              No vehicles found
            </h3>
            <p className="text-neutral-600">
              No vehicles match your current filter. Try selecting a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20 animate-fade-in-up">
          <div className="card-elegant shadow-elegant-xl p-12 max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-6 tracking-tight">
              Ready to Experience Luxury?
            </h3>
            <p className="text-xl text-neutral-600 mb-8 font-light leading-relaxed">
              Our fleet is available 24/7 with professional chauffeurs and pilots ready to serve you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#booking"
                className="btn-primary text-lg px-10 py-4"
              >
                Book Your Journey
              </a>
              <a
                href="tel:+442084326418"
                className="btn-secondary text-lg px-10 py-4"
              >
                Call +44 208 432 6418
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <div className="card-elegant hover:shadow-elegant-xl smooth-transition overflow-hidden group hover-scale">
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover group-hover:scale-110 smooth-transition"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent"></div>
        <div className="absolute top-6 right-6">
          <span className="gradient-accent text-white px-4 py-2 rounded-full text-sm font-semibold shadow-elegant">
            {vehicle.capacity}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-serif font-bold text-primary-900 tracking-tight">
            {vehicle.name}
          </h3>
          <span className="text-3xl opacity-80">
            {vehicle.category === 'HELICOPTER' && '🚁'}
            {vehicle.category === 'PRIVATE_JET' && '✈️'}
            {vehicle.category === 'BUS' && '🚌'}
            {vehicle.category === 'PRIVATE_CAR' && '🚗'}
          </span>
        </div>

        <p className="text-neutral-600 mb-6 leading-relaxed font-light">
          {vehicle.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-primary-800 mb-3 uppercase tracking-wider">Features</h4>
          <div className="flex flex-wrap gap-2">
            {vehicle.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-neutral-50 text-neutral-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-200"
              >
                {feature}
              </span>
            ))}
            {vehicle.features.length > 3 && (
              <span className="bg-accent-50 text-accent-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-accent-200">
                +{vehicle.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div>
            <p className="text-accent-600 font-bold text-xl tracking-tight">{vehicle.priceRange}</p>
          </div>
          <a
            href="#booking"
            className="btn-primary px-6 py-3 text-sm"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default FleetSection;
