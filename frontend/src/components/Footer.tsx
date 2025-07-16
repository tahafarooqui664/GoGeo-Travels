import Link from 'next/link';
import { useCityContext } from '@/contexts/CityContext';
import { getCityContent } from '@/config/cityContent';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { selectedCity } = useCityContext();
  const cityData = getCityContent(selectedCity?.slug || 'london');

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Fleet', href: '#fleet' },
      { name: 'Safety', href: '#' },
      { name: 'Careers', href: '#' },
    ],
    services: [
      { name: 'Helicopter Charter', href: '#booking' },
      { name: 'Private Jet', href: '#booking' },
      { name: 'Executive Bus', href: '#booking' },
      { name: 'Private Car', href: '#booking' },
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  };

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-accent-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">GoGeo Travels</h3>
                <p className="text-sm text-white/80">{cityData.name}</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              {cityData.name}'s premier luxury transportation service, providing unparalleled comfort
              and sophistication for over 15 years.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors duration-300">
                <span>📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors duration-300">
                <span>📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors duration-300">
                <span>🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors duration-300">
                <span>💼</span>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-accent-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-accent-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-white/80 text-sm">Phone</p>
                <a
                  href={`tel:${cityData.phoneNumber.replace(/\s/g, '')}`}
                  className="text-accent-400 hover:text-accent-300 transition-colors duration-200"
                >
                  {cityData.phoneNumber}
                </a>
              </div>
              <div>
                <p className="text-white/80 text-sm">Email</p>
                <a
                  href="mailto:info@gogeotravels.com"
                  className="text-accent-400 hover:text-accent-300 transition-colors duration-200"
                >
                  info@gogeotravels.com
                </a>
              </div>
              <div>
                <p className="text-white/80 text-sm">Address</p>
                <p className="text-white/80" dangerouslySetInnerHTML={{ __html: cityData.address }}>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-white/80 mb-6">
              Subscribe to receive exclusive offers and transportation updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button className="bg-accent-gradient px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/80 text-sm mb-4 md:mb-0">
              © {currentYear} GoGeo Travels. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-white/80 hover:text-accent-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="#" className="text-white/80 hover:text-accent-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white/80 hover:text-accent-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-4">We accept all major payment methods</p>
            <div className="flex justify-center items-center space-x-4 opacity-60">
              <span className="text-2xl">💳</span>
              <span className="text-white/60">•</span>
              <span className="text-sm text-white/60">Visa</span>
              <span className="text-white/60">•</span>
              <span className="text-sm text-white/60">Mastercard</span>
              <span className="text-white/60">•</span>
              <span className="text-sm text-white/60">American Express</span>
              <span className="text-white/60">•</span>
              <span className="text-sm text-white/60">Bank Transfer</span>
              <span className="text-white/60">•</span>
              <span className="text-sm text-white/60">Cash</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
