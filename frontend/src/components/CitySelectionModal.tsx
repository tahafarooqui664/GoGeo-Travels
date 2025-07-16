'use client';

import { useState, useEffect } from 'react';
import { apiService, City } from '@/services/api';
import { getCityContent } from '@/config/cityContent';

interface CitySelectionModalProps {
  isOpen: boolean;
  onCitySelect: (city: City) => void;
}

const CitySelectionModal = ({ isOpen, onCitySelect }: CitySelectionModalProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        console.log('Fetching cities...');
        const citiesData = await apiService.getCities();
        console.log('Cities fetched:', citiesData);
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      console.log('Modal is open, fetching cities...');
      fetchCities();
    }
  }, [isOpen]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  const handleConfirm = () => {
    if (selectedCity) {
      onCitySelect(selectedCity);
    }
  };

  const getCityServices = (citySlug: string) => {
    if (citySlug === 'london') {
      return ['🚗 Private Cars', '🚌 Private Buses', '🚁 Helicopters', '✈️ Private Jets'];
    }
    return ['🚗 Private Cars', '🚌 Private Buses'];
  };

  const getCityDescription = (citySlug: string) => {
    const cityData = getCityContent(citySlug);
    return cityData.aboutDescription;
  };

  console.log('CitySelectionModal render - isOpen:', isOpen, 'cities:', cities);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary-900/95 backdrop-blur-sm"></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-elegant-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-4 tracking-tight">
              Welcome to GoGeo Travels
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Select your city to discover our premium transportation services tailored for your location.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto"></div>
              <p className="text-neutral-600 mt-4">Loading cities...</p>
            </div>
          ) : cities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600">No cities available. Please try again later.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-accent-500 text-white px-4 py-2 rounded"
              >
                Reload
              </button>
            </div>
          ) : (
            <>
              {/* City Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {cities.map((city) => (
                  <div
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className={`card-elegant p-8 cursor-pointer smooth-transition hover-scale ${
                      selectedCity?.id === city.id
                        ? 'ring-2 ring-accent-500 shadow-elegant-xl'
                        : 'hover:shadow-elegant-lg'
                    }`}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-serif font-bold text-primary-900 mb-2">
                        {city.name}
                      </h3>
                      <p className="text-sm text-accent-600 font-medium uppercase tracking-wider">
                        {city.country}
                      </p>
                    </div>

                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {getCityDescription(city.slug)}
                    </p>

                    {/* Services */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-primary-800 uppercase tracking-wider">
                        Available Services
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {getCityServices(city.slug).map((service, index) => (
                          <span
                            key={index}
                            className="bg-neutral-50 text-neutral-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-neutral-200"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedCity?.id === city.id && (
                      <div className="mt-6 flex items-center justify-center">
                        <div className="bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Selected
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedCity}
                  className={`btn-primary px-12 py-4 text-lg ${
                    !selectedCity ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Continue to {selectedCity?.name || 'Selected City'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitySelectionModal;
