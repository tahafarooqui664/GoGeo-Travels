'use client';

import { useState, useEffect } from 'react';
import { apiService, City } from '@/services/api';
import ImageUpload from '@/components/ImageUpload';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface BookingRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  specialRequests?: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  city: {
    id: string;
    name: string;
    slug: string;
  };
  vehicle?: {
    id: string;
    name: string;
    category: string;
  };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedCity, setSelectedCity] = useState('london');
  const [cities, setCities] = useState<City[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'fleet'>('bookings');

  // Fleet management state
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [fleetForm, setFleetForm] = useState({
    name: '',
    category: 'PRIVATE_CAR',
    capacity: '',
    description: '',
    features: '',
    image: '',
    priceRange: '',
    isActive: true
  });
  const [submittingFleet, setSubmittingFleet] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<string | null>(null);
  const [showFleetForm, setShowFleetForm] = useState(false);

  // Status update functionality
  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/booking/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the booking in the local state
        setBookings(prev => prev.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: newStatus as any }
            : booking
        ));
      } else {
        alert('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating booking status');
    }
  };

  // Fetch vehicles for selected city
  const fetchVehicles = async () => {
    if (!isAuthenticated || !selectedCity) return;

    try {
      const response = await fetch(`${API_BASE_URL}/vehicles?city=${selectedCity}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setVehicles(data.data);
        }
      } else {
        console.error('Failed to fetch vehicles:', response.status);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  // Fleet management functions
  const handleFleetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingFleet(true);

    try {
      const selectedCityData = cities.find(c => c.slug === selectedCity);
      if (!selectedCityData) {
        alert('Please select a city first');
        return;
      }

      const fleetData = {
        ...fleetForm,
        features: fleetForm.features.split(',').map(f => f.trim()).filter(f => f),
        cityId: selectedCityData.id
      };

      const url = editingVehicle
        ? `${API_BASE_URL}/vehicles/${editingVehicle}`
        : `${API_BASE_URL}/vehicles`;

      const method = editingVehicle ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fleetData),
      });

      if (response.ok) {
        alert(`Vehicle ${editingVehicle ? 'updated' : 'added'} successfully!`);
        resetFleetForm();
        // Refresh data
        const citiesData = await apiService.getCities();
        setCities(citiesData);
        fetchVehicles();
      } else {
        const errorData = await response.json();
        alert(`Failed to ${editingVehicle ? 'update' : 'add'} vehicle: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Error adding vehicle. Please try again.');
    } finally {
      setSubmittingFleet(false);
    }
  };

  const resetFleetForm = () => {
    setFleetForm({
      name: '',
      category: 'PRIVATE_CAR',
      capacity: '',
      description: '',
      features: '',
      image: '',
      priceRange: '',
      isActive: true
    });
    setEditingVehicle(null);
    setShowFleetForm(false);
  };

  const handleEditVehicle = (vehicle: any) => {
    setFleetForm({
      name: vehicle.name,
      category: vehicle.category,
      capacity: vehicle.capacity,
      description: vehicle.description,
      features: vehicle.features.join(', '),
      image: vehicle.image || '',
      priceRange: vehicle.priceRange,
      isActive: vehicle.isActive
    });
    setEditingVehicle(vehicle.id);
    setShowFleetForm(true);
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Vehicle deleted successfully!');
        // Refresh data
        const citiesData = await apiService.getCities();
        setCities(citiesData);
        fetchVehicles();
      } else {
        const errorData = await response.json();
        alert(`Failed to delete vehicle: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Error deleting vehicle. Please try again.');
    }
  };

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (loginEmail === 'admin@gogeotravels.com' && loginPassword === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cities`);
        const data = await response.json();

        if (data.success && data.data) {
          setCities(data.data);
        } else {
          setError('Failed to load cities');
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('Failed to load cities');
      }
    };

    fetchCities();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking?city=${selectedCity}`);
        const data = await response.json();

        if (data.success) {
          setBookings(data.data);
        } else {
          setError('Failed to load bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    if (selectedCity) {
      fetchBookings();
    }
  }, [selectedCity]);

  // Separate useEffect for vehicles
  useEffect(() => {
    if (isAuthenticated && selectedCity) {
      fetchVehicles();
    }
  }, [selectedCity, isAuthenticated]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-elegant-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-primary-900 mb-2">Admin Portal</h1>
            <p className="text-primary-600">GoGeo Travels London</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-primary-900"
                placeholder="admin@gogeotravels.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-800 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-primary-900"
                placeholder="Enter your password"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-accent-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-primary-900">GoGeo Travels</h1>
                <p className="text-sm text-primary-600">Admin Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-primary-700">Welcome, Admin</span>
              <button
                onClick={handleLogout}
                className="text-sm text-accent-600 hover:text-accent-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0">
          <div className="p-6">
            {/* Navigation Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'bookings'
                      ? 'bg-white text-primary-900 shadow-sm'
                      : 'text-primary-600 hover:text-primary-900'
                  }`}
                >
                  Bookings
                </button>
                <button
                  onClick={() => setActiveTab('fleet')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'fleet'
                      ? 'bg-white text-primary-900 shadow-sm'
                      : 'text-primary-600 hover:text-primary-900'
                  }`}
                >
                  Fleet
                </button>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-primary-900 mb-6">Cities</h2>
            <nav className="space-y-2">
              {cities.length === 0 ? (
                <div className="text-primary-600 text-sm">Loading cities...</div>
              ) : (
                cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.slug)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    selectedCity === city.slug
                      ? 'bg-accent-500 text-white shadow-md'
                      : 'text-primary-700 hover:bg-primary-50 hover:text-primary-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{city.name}</span>
                    <span className="text-sm opacity-75">
                      {city._count.vehicles} vehicles
                    </span>
                  </div>
                </button>
                ))
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'bookings' ? (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-serif font-bold text-primary-900 mb-2">
                    Booking Requests - {cities.find(c => c.slug === selectedCity)?.name}
                  </h1>
                  <p className="text-primary-600">
                    Manage and track all booking requests for this city
                  </p>
                </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto"></div>
                <p className="text-primary-600 mt-4">Loading bookings...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 text-xl mb-4">⚠️</div>
                <p className="text-red-600">{error}</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">No bookings found</h3>
                <p className="text-primary-600">No booking requests for this city yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl elegant-shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider">
                          Journey
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider">
                          Vehicle
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-primary-900 uppercase tracking-wider">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 smooth-transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-semibold text-primary-900">
                                {booking.firstName} {booking.lastName}
                              </div>
                              <div className="text-sm text-primary-600">{booking.email}</div>
                              <div className="text-sm text-primary-600">{booking.phone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-primary-900">
                              <div className="font-medium">From: {booking.pickupLocation}</div>
                              <div>To: {booking.dropoffLocation}</div>
                              <div className="text-primary-600 mt-1">
                                {booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-primary-900">
                              {booking.vehicle ? (
                                <>
                                  <div className="font-medium">{booking.vehicle.name}</div>
                                  <div className="text-primary-600">{booking.vehicle.category}</div>
                                </>
                              ) : (
                                <span className="text-primary-500">Not specified</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-primary-900">
                              <div>{new Date(booking.pickupDate).toLocaleDateString('en-GB')}</div>
                              <div className="text-primary-600">{booking.pickupTime}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold border-0 focus:ring-2 focus:ring-accent-500 ${getStatusColor(booking.status)}`}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="IN_PROGRESS">IN_PROGRESS</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600">
                            {formatDate(booking.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
              </>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-3xl font-serif font-bold text-primary-900 mb-2">
                        Fleet Management - {cities.find(c => c.slug === selectedCity)?.name}
                      </h1>
                      <p className="text-primary-600">
                        Manage premium vehicles for this city
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowFleetForm(!showFleetForm);
                        if (!showFleetForm) {
                          // Reset form when opening
                          setEditingVehicle(null);
                        }
                      }}
                      className="bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
                    >
                      {showFleetForm ? 'Cancel' : 'Add New Vehicle'}
                    </button>
                  </div>
                </div>

                {/* Vehicle List */}
                <div className="bg-white rounded-2xl shadow-lg mb-8">
                  <div className="p-6 border-b border-neutral-200">
                    <h2 className="text-xl font-semibold text-primary-900">Current Fleet</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                            Vehicle
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                            Capacity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                            Price Range
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-neutral-200">
                        {vehicles.map((vehicle) => (
                          <tr key={vehicle.id} className="hover:bg-neutral-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {vehicle.image && (
                                  <img className="h-10 w-10 rounded-lg object-cover mr-3" src={vehicle.image} alt={vehicle.name} />
                                )}
                                <div>
                                  <div className="text-sm font-medium text-primary-900">{vehicle.name}</div>
                                  <div className="text-sm text-primary-600 truncate max-w-xs">{vehicle.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                                {vehicle.category.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900">
                              {vehicle.capacity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900">
                              {vehicle.priceRange}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                vehicle.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {vehicle.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEditVehicle(vehicle)}
                                className="text-accent-600 hover:text-accent-900 mr-3"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                        {vehicles.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-primary-600">
                              No vehicles found for this city. Add your first vehicle to get started.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Vehicle Form */}
                {showFleetForm && (
                  <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 border-2 border-accent-200">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-primary-900">
                        {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                      </h2>
                      <p className="text-primary-600 mt-1">
                        {editingVehicle ? 'Update vehicle information' : 'Add a new vehicle to the fleet'}
                      </p>
                    </div>
                    <form onSubmit={handleFleetSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-primary-800 mb-2">
                          Vehicle Name *
                        </label>
                        <input
                          type="text"
                          value={fleetForm.name}
                          onChange={(e) => setFleetForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-primary-900"
                          placeholder="e.g., Mercedes S-Class"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary-800 mb-2">
                          Vehicle Category *
                        </label>
                        <select
                          value={fleetForm.category}
                          onChange={(e) => setFleetForm(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-primary-900"
                          required
                        >
                          <option value="PRIVATE_CAR">Private Car</option>
                          <option value="BUS">Private Bus</option>
                          {selectedCity === 'london' && (
                            <>
                              <option value="HELICOPTER">Helicopter</option>
                              <option value="PRIVATE_JET">Private Jet</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary-800 mb-2">
                          Capacity *
                        </label>
                        <input
                          type="text"
                          value={fleetForm.capacity}
                          onChange={(e) => setFleetForm(prev => ({ ...prev, capacity: e.target.value }))}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-primary-900"
                          placeholder="e.g., 4 passengers"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary-800 mb-2">
                          Price Range *
                        </label>
                        <input
                          type="text"
                          value={fleetForm.priceRange}
                          onChange={(e) => setFleetForm(prev => ({ ...prev, priceRange: e.target.value }))}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-primary-900"
                          placeholder="e.g., £200-300/hour"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-800 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={fleetForm.description}
                        onChange={(e) => setFleetForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-primary-900"
                        placeholder="Describe the vehicle and its luxury features..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-800 mb-2">
                        Features (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={fleetForm.features}
                        onChange={(e) => setFleetForm(prev => ({ ...prev, features: e.target.value }))}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-primary-900"
                        placeholder="e.g., Leather seats, WiFi, Champagne service, Professional chauffeur"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-800 mb-2">
                        Vehicle Image
                      </label>
                      <ImageUpload
                        currentImage={fleetForm.image}
                        onImageUpload={(imageUrl) => setFleetForm(prev => ({ ...prev, image: imageUrl }))}
                        onImageRemove={() => setFleetForm(prev => ({ ...prev, image: '' }))}
                        placeholder="Upload a high-quality image of the vehicle"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={fleetForm.isActive}
                        onChange={(e) => setFleetForm(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-neutral-300 rounded"
                      />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-primary-800">
                        Vehicle is active and available for booking
                      </label>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={resetFleetForm}
                        className="bg-neutral-200 text-neutral-700 px-6 py-3 rounded-lg font-semibold hover:bg-neutral-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submittingFleet}
                        className={`bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors ${
                          submittingFleet
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-accent-600'
                        }`}
                      >
                        {submittingFleet
                          ? (editingVehicle ? 'Updating...' : 'Adding...')
                          : (editingVehicle ? 'Update Vehicle' : 'Add Vehicle')
                        }
                      </button>
                    </div>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
