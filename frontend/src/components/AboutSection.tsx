import Image from 'next/image';

const AboutSection = () => {
  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '24/7', label: 'Concierge Service' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Safety Record' },
  ];

  const features = [
    {
      icon: '🛡️',
      title: 'Fully Licensed & Insured',
      description: 'All our vehicles and aircraft are fully licensed, insured, and maintained to the highest safety standards.',
    },
    {
      icon: '👨‍✈️',
      title: 'Professional Crew',
      description: 'Our experienced pilots and chauffeurs are trained professionals with impeccable safety records.',
    },
    {
      icon: '⭐',
      title: 'Luxury Experience',
      description: 'Every journey is crafted to provide the ultimate in comfort, style, and sophistication.',
    },
    {
      icon: '🕐',
      title: '24/7 Availability',
      description: 'Our concierge team is available around the clock to assist with your transportation needs.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6">
              London's Premier Transportation Service
            </h2>
            <p className="text-xl text-primary-600 mb-6 leading-relaxed">
              For over 15 years, GoGeo Travels London has been the trusted choice for discerning
              clients seeking unparalleled luxury transportation across London and beyond.
            </p>
            <p className="text-primary-600 mb-8 leading-relaxed">
              From intimate helicopter tours over the Thames to private jet connections across Europe, 
              executive bus services for corporate events, and elegant private car transfers, we deliver 
              exceptional experiences that exceed expectations.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-primary-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#booking"
                className="bg-accent-gradient text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
              >
                Book Your Journey
              </a>
              <a
                href="tel:+442084326418"
                className="bg-primary-100 text-primary-700 px-8 py-3 rounded-xl font-semibold hover:bg-primary-200 transition-all duration-300 text-center"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury transportation over London"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
              <h4 className="font-serif font-bold text-primary-900 mb-2">Why Choose Us?</h4>
              <p className="text-sm text-primary-600">
                Unmatched luxury, safety, and service excellence in every journey across London.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-luxury-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-serif font-bold text-primary-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-primary-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-4">
              How It Works
            </h3>
            <p className="text-xl text-primary-600 max-w-2xl mx-auto">
              Experience seamless luxury transportation in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Submit Journey Details',
                description: 'Complete our booking form with your travel requirements and preferences.',
                icon: '📝',
              },
              {
                step: '02',
                title: 'Receive Your Quote',
                description: 'Get a personalized quote within 2 hours with transparent pricing.',
                icon: '💰',
              },
              {
                step: '03',
                title: 'Enjoy Your Journey',
                description: 'Relax and enjoy your luxury transportation experience with our professional service.',
                icon: '✨',
              },
            ].map((process, index) => (
              <div key={index} className="relative text-center">
                <div className="bg-accent-gradient text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {process.step}
                </div>
                <div className="text-4xl mb-4">{process.icon}</div>
                <h4 className="text-xl font-serif font-bold text-primary-900 mb-3">
                  {process.title}
                </h4>
                <p className="text-primary-600 leading-relaxed">
                  {process.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="w-full h-0.5 bg-accent-200"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
