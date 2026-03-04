import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, Eye, Edit, Trash2 } from 'lucide-react';
import { venueService } from '../services/api';
import './VenueList.css';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    filterVenues();
  }, [searchTerm, venues]);

  const fetchVenues = async () => {
    try {
      setError('');
      const response = await venueService.getAllVenues();
      const venueData = Array.isArray(response.data) ? response.data : [];
      setVenues(venueData);
      setFilteredVenues(venueData);
    } catch (error) {
      console.error('Error fetching venues:', error);
      setError('Failed to load venues. Please refresh the page.');
      setVenues([]);
      setFilteredVenues([]);
    } finally {
      setLoading(false);
    }
  };

  const filterVenues = () => {
    let filtered = venues;

    if (searchTerm) {
      filtered = filtered.filter(venue =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (venue.location && venue.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredVenues(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        setError('');
        setSuccess('');
        console.log('Deleting venue ID:', id);
        await venueService.deleteVenue(id);
        setSuccess('Venue deleted successfully!');
        // Wait a moment before refetching to ensure backend has processed
        setTimeout(() => {
          fetchVenues();
          setSuccess('');
        }, 500);
      } catch (error) {
        console.error('Error deleting venue:', error);
        const errorMsg = error.response?.data?.message || error.message || 'Failed to delete venue. Please try again.';
        setError(errorMsg);
      }
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="venue-list fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Venue Directory</h1>
          <p className="page-subtitle">{filteredVenues.length} venues found</p>
        </div>
        <Link to="/venues/add" className="btn btn-primary">
          <Building2 size={20} />
          Add Venue
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
            placeholder="Search by venue name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Amenities</th>
              <th>Price Per Hour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVenues.map((venue) => (
              <tr key={venue.id}>
                <td>#{venue.id}</td>
                <td>{venue.name}</td>
                <td>{venue.location || 'N/A'}</td>
                <td>{venue.capacity || 0}</td>
                <td>{venue.amenities || 'N/A'}</td>
                <td>Rs. {venue.pricePerHour ? venue.pricePerHour.toLocaleString() : '0'}</td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/venues/edit/${venue.id}`}
                      className="action-btn edit-btn"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(venue.id)}
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

      {filteredVenues.length === 0 && (
        <div className="no-results">
          <p>No venues found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default VenueList;
