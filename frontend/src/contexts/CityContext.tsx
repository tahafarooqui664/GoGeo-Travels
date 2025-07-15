'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { City } from '@/services/api';

interface CityContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City) => void;
  showCityModal: boolean;
  setShowCityModal: (show: boolean) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const useCityContext = () => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCityContext must be used within a CityProvider');
  }
  return context;
};

interface CityProviderProps {
  children: React.ReactNode;
}

export const CityProvider = ({ children }: CityProviderProps) => {
  const [selectedCity, setSelectedCityState] = useState<City | null>(null);
  const [showCityModal, setShowCityModal] = useState(false);

  useEffect(() => {
    // Clear localStorage for testing - REMOVE THIS LATER
    localStorage.removeItem('selectedCity');

    // Check if user has previously selected a city
    const savedCity = localStorage.getItem('selectedCity');
    console.log('Saved city from localStorage:', savedCity);

    if (savedCity) {
      try {
        const city = JSON.parse(savedCity);
        console.log('Parsed saved city:', city);
        setSelectedCityState(city);
      } catch (error) {
        console.error('Error parsing saved city:', error);
        console.log('Showing city modal due to parse error');
        setShowCityModal(true);
      }
    } else {
      // Show city selection modal for new users
      console.log('No saved city, showing modal');
      setShowCityModal(true);
    }
  }, []);

  const setSelectedCity = (city: City) => {
    setSelectedCityState(city);
    localStorage.setItem('selectedCity', JSON.stringify(city));
    setShowCityModal(false);
  };

  const value = {
    selectedCity,
    setSelectedCity,
    showCityModal,
    setShowCityModal,
  };

  return (
    <CityContext.Provider value={value}>
      {children}
    </CityContext.Provider>
  );
};

export default CityContext;
