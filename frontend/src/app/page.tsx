'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FleetSection from '@/components/FleetSection';
import AboutSection from '@/components/AboutSection';
import BookingForm from '@/components/BookingForm';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CitySelectionModal from '@/components/CitySelectionModal';
import { CityProvider, useCityContext } from '@/contexts/CityContext';

function HomeContent() {
  const { selectedCity, showCityModal, setSelectedCity, setShowCityModal } = useCityContext();

  console.log('HomeContent render - selectedCity:', selectedCity, 'showCityModal:', showCityModal);

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FleetSection />
      <AboutSection />
      <BookingForm />
      <ContactSection />
      <Footer />



      <CitySelectionModal
        isOpen={showCityModal}
        onCitySelect={setSelectedCity}
      />
    </main>
  );
}

export default function Home() {
  return (
    <CityProvider>
      <HomeContent />
    </CityProvider>
  );
}
