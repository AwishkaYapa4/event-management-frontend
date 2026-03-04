import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { venueService } from '../services/api';
import './VenueForm.css';

const EditVenue = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    amenities: '',
    pricePerHour: ''
  });

  useEffect(() => {
    fetchVenue();
  }, [id]);

  const fetchVenue = async () => {
    try {
      const response = await venueService.getVenueById(id);
      const venue = response.data;
      setFormData({
        name: venue.name,
        location: venue.location || '',
        capacity: venue.capacity,
        amenities: venue.amenities || '',
        pricePerHour: venue.pricePerHour
      });
    } catch (error) {
      console.error('Error fetching venue:', error);
      setError('Failed to load venue details.');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        capacity: parseInt(formData.capacity),
        pricePerHour: parseFloat(formData.pricePerHour)
      };
      
      await venueService.updateVenue(id, submitData);
      navigate('/venues');
    } catch (error) {
      console.error('Error updating venue:', error);
      setError(error.response?.data?.message || 'Failed to update venue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="venue-form fade-in">
      <div className="page-header">
        <button onClick={() => navigate('/venues')} className="back-btn">
          <ArrowLeft size={20} />
          Back to List
        </button>
      </div>

      <div className="form-container card">
        <h1 className="form-title">Edit Venue</h1>
        <p className="form-subtitle">Update venue details below</p>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="name" className="form-label">
                Venue Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
                minLength="2"
                maxLength="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location <span className="required">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="e.g., Colombo, Kandy"
              />
            </div>

            <div className="form-group">
              <label htmlFor="capacity" className="form-label">
                Capacity <span className="required">*</span>
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="form-input"
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amenities" className="form-label">
                Amenities
              </label>
              <input
                type="text"
                id="amenities"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., WiFi, AC, Parking, Catering"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pricePerHour" className="form-label">
                Price Per Hour (Rs.) <span className="required">*</span>
              </label>
              <input
                type="number"
                id="pricePerHour"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={handleChange}
                className="form-input"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="form-actions">
            <Link to="/venues" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Venue
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVenue;
