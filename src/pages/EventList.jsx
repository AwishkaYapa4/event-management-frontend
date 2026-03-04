import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, CalendarPlus, Eye, Edit, Trash2, Filter } from 'lucide-react';
import { eventService } from '../services/api';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const statuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchTerm, statusFilter, events]);

  const fetchEvents = async () => {
    try {
      setError('');
      const response = await eventService.getAllEvents();
      const eventData = Array.isArray(response.data) ? response.data : [];
      setEvents(eventData);
      setFilteredEvents(eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please refresh the page.');
      setEvents([]);
      setFilteredEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    setFilteredEvents(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        setError('');
        setSuccess('');
        console.log('Deleting event ID:', id);
        await eventService.deleteEvent(id);
        setSuccess('Event deleted successfully!');
        setTimeout(() => {
          fetchEvents();
          setSuccess('');
        }, 500);
      } catch (error) {
        console.error('Error deleting event:', error);
        const errorMsg = error.response?.data?.message || error.message || 'Failed to delete event. Please try again.';
        setError(errorMsg);
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

  return (
    <div className="event-list fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Event Directory</h1>
          <p className="page-subtitle">{filteredEvents.length} events found</p>
        </div>
        <Link to="/events/add" className="btn btn-primary">
          <CalendarPlus size={20} />
          Book Event
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" style={{ marginBottom: '1rem', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', padding: '0.75rem', borderRadius: '0.25rem' }}>
          {success}
        </div>
      )}

      <div className="filters-section card">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <Filter size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Event Date</th>
              <th>Venue ID</th>
              <th>Attendees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id}>
                <td>#{event.id}</td>
                <td className="event-name">{event.customerName || 'N/A'}</td>
                <td>{event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'N/A'}</td>
                <td>Venue #{event.venueId || 'N/A'}</td>
                <td>{event.attendees || 0}</td>
                <td>
                  <span className={getStatusBadge(event.status)}>
                    {event.status || 'PENDING'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/events/${event.id}`}
                      className="action-btn view-btn"
                      title="View"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      to={`/events/edit/${event.id}`}
                      className="action-btn edit-btn"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="action-btn delete-btn"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEvents.length === 0 && (
        <div className="no-results">
          <p>No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EventList;
