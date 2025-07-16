'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCityContext } from '@/contexts/CityContext';

const Navigation = () => {
  const { selectedCity, setShowCityModal } = useCityContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#fleet', label: 'Our Fleet' },
    { href: '#booking', label: 'Book Now' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 smooth-transition ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-elegant-lg border-b border-neutral-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 lg:h-22">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="#home" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center shadow-elegant group-hover:hover-lift smooth-transition">
                <span className="text-white font-bold text-2xl">G</span>
              </div>
              <div className="hidden sm:block">
                <h1 className={`font-serif text-2xl font-bold tracking-tight ${
                  isScrolled ? 'text-primary-900' : 'text-white'
                }`}>
                  GoGeo Travels
                </h1>
                <p className={`text-sm font-semibold tracking-wider ${
                  isScrolled ? 'text-accent-600' : 'text-accent-400'
                }`}>
                  {selectedCity?.name?.toUpperCase() || 'PREMIUM TRANSPORT'}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 font-semibold smooth-transition hover:hover-lift relative group ${
                    isScrolled ? 'text-primary-800 hover:text-accent-600' : 'text-white hover:text-accent-400'
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 smooth-transition group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* City Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {selectedCity && (
              <button
                onClick={() => setShowCityModal(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl smooth-transition ${
                  isScrolled
                    ? 'text-primary-700 hover:bg-neutral-100'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <span className="text-sm">📍</span>
                <span className="font-medium">{selectedCity.name}</span>
              </button>
            )}
            <Link
              href="#booking"
              className="btn-primary px-8 py-3"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg smooth-transition ${
                isScrolled ? 'text-primary-800 hover:bg-neutral-100' : 'text-white hover:bg-white/10'
              }`}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white/98 backdrop-blur-md rounded-2xl mt-4 shadow-elegant-lg border border-neutral-200">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-primary-800 font-semibold hover:text-accent-600 smooth-transition hover:bg-neutral-50 rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#booking"
                className="block w-full text-center btn-primary px-4 py-3 mt-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
