'use client';

import Link from 'next/link';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 pt-20"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />

      {/* Professional Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-700/85" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight tracking-tight animate-fade-in-up text-shadow">
            Experience London's
            <span className="block text-gradient mt-2">Elite Transportation</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up">
            From luxury helicopters soaring above the Thames to private jets connecting you globally,
            GoGeo Travels London delivers unparalleled comfort and sophistication in every journey.
          </p>

          {/* Service Types */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto animate-stagger">
            {[
              { icon: '🚁', name: 'Helicopters', desc: 'Sky-high luxury' },
              { icon: '✈️', name: 'Private Jets', desc: 'Global connections' },
              { icon: '🚌', name: 'Executive Buses', desc: 'Group comfort' },
              { icon: '🚗', name: 'Private Cars', desc: 'Personal elegance' },
            ].map((service, index) => (
              <div
                key={index}
                className="glass-effect rounded-3xl p-8 text-center hover:bg-white/15 smooth-transition cursor-pointer hover-lift border border-white/10"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-white font-bold text-lg md:text-xl tracking-wide mb-2">
                  {service.name}
                </h3>
                <p className="text-white/80 text-sm md:text-base font-light">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-fade-in-up">
            <Link
              href="#booking"
              className="btn-primary text-xl px-12 py-5 w-full sm:w-auto"
            >
              Book Your Journey
            </Link>
            <Link
              href="#fleet"
              className="btn-secondary text-xl px-12 py-5 w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Explore Fleet
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-24 pt-12 border-t border-white/20 animate-fade-in-up">
            <p className="text-white/90 text-xl mb-8 font-light tracking-wide">Trusted by London's Elite</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-accent-400 text-2xl font-bold mb-1">★★★★★</div>
                <div className="text-white/90 font-semibold">5.0 Rating</div>
              </div>
              <div className="text-center">
                <div className="text-accent-400 text-2xl font-bold mb-1">500+</div>
                <div className="text-white/90 font-semibold">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-accent-400 text-2xl font-bold mb-1">24/7</div>
                <div className="text-white/90 font-semibold">Concierge</div>
              </div>
              <div className="text-center">
                <div className="text-accent-400 text-2xl font-bold mb-1">✓</div>
                <div className="text-white/90 font-semibold">Licensed & Insured</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#fleet">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
