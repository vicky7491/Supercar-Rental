import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: '',
    description: '',
    location: { coordinates: [0, 0] }, // [longitude, latitude]
    features: [],
    images: []
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Enhanced image upload with error handling
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const res = await axios.post('/api/seller/upload-images', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFormData(prev => ({ ...prev, images: [...prev.images, ...res.data.urls] }));
    } catch (err) {
      console.error('Image upload failed:', err.response?.data?.message || 'Server error');
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('/api/seller/listings', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      setCars([...cars, res.data]);
      setFormData({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        pricePerDay: '',
        description: '',
        location: { coordinates: [0, 0] },
        features: [],
        images: []
      });
      alert('Car listed successfully! Status: Pending Approval');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Listing failed';
      console.error('Submission error:', errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch listings with authentication
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get('/api/seller/my-listings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCars(res.data);
      } catch (err) {
        if(err.response?.status === 401) navigate('/login');
        console.error('Fetch error:', err.response?.data?.message || 'Server error');
      }
    };
    fetchListings();
  }, [navigate]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">List Your Car</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Make (e.g., Tata)"
            value={formData.make}
            onChange={(e) => setFormData({...formData, make: e.target.value})}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Model (e.g., Nexon)"
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Year"
            min="2000"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: e.target.value})}
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price per day (₹)"
            value={formData.pricePerDay}
            onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
            required
            className="p-2 border rounded"
          />
        </div>

        {/* Location Picker */}
        <div className="space-y-2">
          <label className="block font-medium">Location Coordinates</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={formData.location.coordinates[0]}
              onChange={e => setFormData({
                ...formData,
                location: {
                  ...formData.location,
                  coordinates: [parseFloat(e.target.value), formData.location.coordinates[1]]
                }
              })}
              className="p-2 border rounded flex-1"
            />
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={formData.location.coordinates[1]}
              onChange={e => setFormData({
                ...formData,
                location: {
                  ...formData.location,
                  coordinates: [formData.location.coordinates[0], parseFloat(e.target.value)]
                }
              })}
              className="p-2 border rounded flex-1"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-2">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            accept="image/*"
            className="block w-full"
          />
          <div className="mt-2 flex gap-2 flex-wrap">
            {formData.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'List Car'}
        </button>
      </form>

      {/* Existing Listings */}
      <div className="my-8">
        <h3 className="text-xl font-semibold mb-4">Your Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cars.map(car => (
            <div key={car._id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 rounded text-sm ${
                  car.status === 'approved' ? 'bg-green-100 text-green-800' :
                  car.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {car.status.toUpperCase()}
                </span>
                <span className={`text-sm ${
                  car.availability ? 'text-green-600' : 'text-red-600'
                }`}>
                  {car.availability ? 'Available' : 'Booked'}
                </span>
              </div>
              <h4 className="font-medium text-lg">{car.make} {car.model}</h4>
              <p className="text-gray-600">Year: {car.year}</p>
              <p className="text-lg font-semibold">₹{car.pricePerDay}/day</p>
              {car.images[0] && (
                <img 
                  src={car.images[0]} 
                  alt={`${car.make} ${car.model}`} 
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;