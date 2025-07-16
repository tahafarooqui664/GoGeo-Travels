import React from 'react';
import { useCityContext } from '@/contexts/CityContext';
import { getCityContent } from '@/config/cityContent';

const ContactSection = () => {
  const { selectedCity } = useCityContext();
  const cityData = getCityContent(selectedCity?.slug || 'london');
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            Ready to experience {cityData.name}&apos;s finest transportation? Our dedicated team is available 24/7
            to assist with your luxury travel needs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phone */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/15 smooth-transition">
              <div className="w-16 h-16 bg-accent-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 elegant-shadow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 tracking-wide">Phone</h3>
              <p className="text-white/90 text-lg font-medium">{cityData.phoneNumber}</p>
              <p className="text-white/70 text-sm mt-2">Available 24/7</p>
            </div>

            {/* Email */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/15 smooth-transition">
              <div className="w-16 h-16 bg-accent-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 elegant-shadow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 tracking-wide">Email</h3>
              <p className="text-white/90 text-lg font-medium">info@gogeotravels.com</p>
              <p className="text-white/70 text-sm mt-2">Quick response guaranteed</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Address */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/15 smooth-transition">
              <div className="w-16 h-16 bg-accent-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 elegant-shadow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 tracking-wide">Address</h3>
              <p className="text-white/90 text-lg font-medium">
                Canary Wharf, London E14 5AB<br />
                United Kingdom
              </p>
            </div>

            {/* Hours */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/15 smooth-transition">
              <div className="w-16 h-16 bg-accent-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 elegant-shadow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 tracking-wide">Operating Hours</h3>
              <p className="text-white/90 text-lg font-medium">
                24/7 Concierge Service<br />
                Emergency bookings available
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center mt-16 pt-12 border-t border-white/20">
            <h3 className="text-white font-bold text-2xl mb-8 tracking-wide">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-accent-500 smooth-transition hover-lift">
                <span className="text-2xl">📘</span>
              </a>
              <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-accent-500 smooth-transition hover-lift">
                <span className="text-2xl">📷</span>
              </a>
              <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-accent-500 smooth-transition hover-lift">
                <span className="text-2xl">🐦</span>
              </a>
              <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-accent-500 smooth-transition hover-lift">
                <span className="text-2xl">💼</span>
              </a>
            </div>
            <p className="text-white/70 mt-6 text-lg">Stay connected for exclusive offers and updates</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
