import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { eventService, venueService } from '../services/api';
import './EventForm.css';

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    venueId: '',
    customerName: '',
    eventDate: '',
    attendees: '',
    status: 'PENDING'
  });

  const statuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

  useEffect(() => {
    fetchEvent();
    fetchVenues();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await eventService.getEventById(id);
      const event = response.data;
      setFormData({
        venueId: event.venueId,
        customerName: event.customerName,
        eventDate: event.eventDate,
        attendees: event.attendees,
        status: event.status || 'PENDING'
      });
    } catch (error) {
      console.error('Error fetching event:', error);
      setError('Failed to load event details.');
    } finally {
      setFetching(false);
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await venueService.getAllVenues();
      setVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
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
        venueId: parseInt(formData.venueId),
        attendees: parseInt(formData.attendees)
      };
      
      await eventService.updateEvent(id, submitData);
      navigate('/events');
    } catch (error) {
      console.error('Error updating event:', error);
      setError(error.response?.data?.message || 'Failed to update event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="event-form fade-in">
      <div className="page-header">
        <button onClick={() => navigate('/events')} className="back-btn">
          <ArrowLeft size={20} />
          Back to List
        </button>
      </div>

      <div className="form-container card">
        <h1 className="form-title">Edit Event</h1>
        <p className="form-subtitle">Update event details below</p>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="customerName" className="form-label">
                Customer Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="form-input"
                required
                minLength="2"
                maxLength="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="venueId" className="form-label">
                Venue <span className="required">*</span>
              </label>
              <select
                id="venueId"
                name="venueId"
                value={formData.venueId}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Venue</option>
                {venues.map(venue => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name} (Capacity: {venue.capacity})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="eventDate" className="form-label">
                Event Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="attendees" className="form-label">
                Number of Attendees <span className="required">*</span>
              </label>
              <input
                type="number"
                id="attendees"
                name="attendees"
                value={formData.attendees}
                onChange={handleChange}
                className="form-input"
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status <span className="required">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
                required
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/events" className="btn btn-secondary">
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
                  Update Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
