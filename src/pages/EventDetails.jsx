import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Edit, Trash2 } from 'lucide-react';
import { eventService, venueService } from '../services/api';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const eventResponse = await eventService.getEventById(id);
      const eventData = eventResponse.data;
      setEvent(eventData);

      // Fetch venue details
      if (eventData.venueId) {
        const venueResponse = await venueService.getVenueById(eventData.venueId);
        setVenue(venueResponse.data);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        navigate('/events');
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      CONFIRMED: 'badge-success',
      PENDING: 'badge-warning',
      COMPLETED: 'badge-success',
      CANCELLED: 'badge-danger'
    };
    return `badge ${badges[status] || 'badge-warning'}`;
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!event) {
    return (
      <div className="event-details fade-in">
        <div className="alert alert-danger">Event not found</div>
        <Link to="/events" className="btn btn-primary">
          <ArrowLeft size={20} />
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="event-details fade-in">
      <div className="page-header">
        <button onClick={() => navigate('/events')} className="back-btn">
          <ArrowLeft size={20} />
          Back to List
        </button>
      </div>

      <div className="details-container card">
        <div className="details-header">
          <div>
            <h1 className="details-title">{event.customerName}</h1>
            <span className={getStatusBadge(event.status)}>
              {event.status || 'PENDING'}
            </span>
          </div>
          <div className="action-buttons">
            <Link
              to={`/events/edit/${event.id}`}
              className="btn btn-secondary"
            >
              <Edit size={18} />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <div className="detail-icon">
              <Calendar size={24} />
            </div>
            <div>
              <p className="detail-label">Event Date</p>
              <p className="detail-value">
                {new Date(event.eventDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <MapPin size={24} />
            </div>
            <div>
              <p className="detail-label">Venue</p>
              <p className="detail-value">
                {venue ? venue.name : `Venue #${event.venueId}`}
              </p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <Users size={24} />
            </div>
            <div>
              <p className="detail-label">Number of Attendees</p>
              <p className="detail-value">{event.attendees}</p>
            </div>
          </div>

          {venue && (
            <div className="detail-item">
              <div className="detail-icon">
                <MapPin size={24} />
              </div>
              <div>
                <p className="detail-label">Venue Capacity</p>
                <p className="detail-value">{venue.capacity} people</p>
              </div>
            </div>
          )}
        </div>

        {venue && (
          <div className="venue-info-section">
            <h3 className="section-title">Venue Information</h3>
            <div className="venue-info-grid">
              <div className="info-item">
                <span className="info-label">Venue Name:</span>
                <span className="info-value">{venue.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Capacity:</span>
                <span className="info-value">{venue.capacity} people</span>
              </div>
              <div className="info-item">
                <span className="info-label">Price Per Hour:</span>
                <span className="info-value">Rs. {venue.pricePerHour.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
