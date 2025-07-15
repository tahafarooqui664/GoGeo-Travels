'use client';

import { useState, useEffect } from 'react';
import { apiService, Vehicle } from '@/services/api';
import { useCityContext } from '@/contexts/CityContext';

interface BookingFormData {
  transportMode: string; // HELICOPTER, PRIVATE_JET, BUS, PRIVATE_CAR
  vehicleId?: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

const BookingForm = () => {
  const { selectedCity } = useCityContext();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const [formData, setFormData] = useState<BookingFormData>({
    transportMode: '',
    vehicleId: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    passengers: '1',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!selectedCity) return;

      try {
        setLoading(true);
        const vehiclesData = await apiService.getVehicles(selectedCity.slug);
        setVehicles(vehiclesData);
        // Reset vehicle selection when city changes
        setFormData(prev => ({ ...prev, vehicleId: '' }));
      } catch (error) {
        console.error('Error fetching vehicles for city:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [selectedCity]);

  // Get available transport modes based on selected city
  const getAvailableTransportModes = () => {
    const allModes = [
      { id: 'PRIVATE_JET', name: 'Private Jet', icon: '✈️' },
      { id: 'HELICOPTER', name: 'Private Helicopter', icon: '🚁' },
      { id: 'PRIVATE_CAR', name: 'Private Car', icon: '🚗' },
      { id: 'BUS', name: 'Private Bus', icon: '🚌' },
    ];

    if (!selectedCity) return [];

    // For London, show all transport modes
    if (selectedCity.slug === 'london') {
      return allModes;
    }

    // For other cities (Manchester, Budapest, Madrid), only show cars and buses
    return allModes.filter(mode =>
      mode.id === 'PRIVATE_CAR' || mode.id === 'BUS'
    );
  };

  // Get vehicles filtered by selected transport mode
  const getVehiclesByTransportMode = () => {
    if (!formData.transportMode) return [];
    return vehicles.filter(vehicle => vehicle.category === formData.transportMode);
  };

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };

      // Reset vehicle selection when transport mode changes
      if (field === 'transportMode') {
        newData.vehicleId = '';
      }

      return newData;
    });

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Required field validations
    if (!formData.transportMode) newErrors.transportMode = 'Transport mode is required';
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
    if (!formData.dropoffLocation.trim()) newErrors.dropoffLocation = 'Drop-off location is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (basic)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation (must be today or future)
    if (formData.pickupDate) {
      const selectedDate = new Date(formData.pickupDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.pickupDate = 'Pickup date cannot be in the past';
      }
    }

    // Passengers validation
    if (!formData.passengers.trim()) {
      newErrors.passengers = 'Number of passengers is required';
    } else {
      const passengersNum = parseInt(formData.passengers);
      if (isNaN(passengersNum) || passengersNum < 1) {
        newErrors.passengers = 'Please enter a valid number of passengers (minimum 1)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCity) {
      alert('Please select a city first.');
      return;
    }

    // Validate form
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    try {
      setSubmitting(true);

      const bookingData = {
        ...formData,
        city: selectedCity.slug
      };

      const response = await apiService.submitBooking(bookingData);

      alert('Booking request submitted successfully! We will contact you within 2 hours with a detailed quote.');

      // Reset form
      setFormData({
        transportMode: '',
        vehicleId: '',
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        pickupTime: '',
        passengers: '1',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: '',
      });
      setErrors({});

    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6">
            Book Your Journey
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Experience luxury transportation tailored to your needs. Complete the form below to request your booking.
          </p>
        </div>



        {/* Form */}
        <div className="bg-white rounded-2xl shadow-elegant-xl p-8 border border-neutral-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Selected City Display */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-primary-900">Selected City</h4>
                  <p className="text-neutral-600">{selectedCity?.name}, {selectedCity?.country}</p>
                </div>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                >
                  Change City
                </button>
              </div>
            </div>

            {/* Transport Mode Selection */}
            {!loading && (
              <div>
                <label className="block text-sm font-medium text-primary-800 mb-2">
                  Select Mode of Transport *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {getAvailableTransportModes().map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => handleInputChange('transportMode', mode.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.transportMode === mode.id
                          ? 'border-accent-500 bg-accent-50 text-accent-700'
                          : errors.transportMode
                          ? 'border-red-300 bg-white text-neutral-700 hover:border-red-400'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-accent-300 hover:bg-accent-50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{mode.icon}</div>
                        <div className="font-semibold text-sm">{mode.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.transportMode && (
                  <p className="text-red-500 text-sm mt-1">{errors.transportMode}</p>
                )}
              </div>
            )}

            {/* Specific Vehicle Selection */}
            {formData.transportMode && getVehiclesByTransportMode().length > 0 && (
              <div>
                <label className="block text-sm font-medium text-primary-800 mb-2">
                  Select Specific Vehicle (Optional)
                </label>
                <select
                  value={formData.vehicleId || ''}
                  onChange={(e) => handleInputChange('vehicleId', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-primary-900"
                >
                  <option value="">Any available vehicle</option>
                  {getVehiclesByTransportMode().map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} - {vehicle.capacity} - {vehicle.priceRange}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Pickup Location *
                </label>
                <input
                  type="text"
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                    errors.pickupLocation ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter pickup address"
                />
                {errors.pickupLocation && (
                  <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Drop-off Location *
                </label>
                <input
                  type="text"
                  value={formData.dropoffLocation}
                  onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                    errors.dropoffLocation ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter destination address"
                />
                {errors.dropoffLocation && (
                  <p className="text-red-500 text-sm mt-1">{errors.dropoffLocation}</p>
                )}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                    errors.pickupDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.pickupDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Pickup Time *
                </label>
                <input
                  type="time"
                  value={formData.pickupTime}
                  onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                    errors.pickupTime ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.pickupTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Passengers *
                </label>
                <input
                  type="text"
                  value={formData.passengers}
                  onChange={(e) => handleInputChange('passengers', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                    errors.passengers ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter number of passengers"
                />
                {errors.passengers && (
                  <p className="text-red-500 text-sm mt-1">{errors.passengers}</p>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Any special requirements, dietary restrictions, or additional services..."
                />
              </div>
            </div>

            {/* Submit Section */}
            <div className="border-t border-neutral-200 pt-8">
              <div className="bg-accent-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-accent-800 mb-2">Next Steps</h4>
                <ul className="text-accent-700 space-y-1 text-sm">
                  <li>• We'll review your booking request within 2 hours</li>
                  <li>• You'll receive a detailed quote via email</li>
                  <li>• Our team will contact you to confirm details</li>
                  <li>• Payment can be made via card, bank transfer, or cash</li>
                </ul>
              </div>



              <div className="text-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`bg-accent-500 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg ${
                    submitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-accent-600 hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Submit Booking Request'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
