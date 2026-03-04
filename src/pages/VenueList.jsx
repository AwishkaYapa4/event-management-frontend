import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, Eye, Edit, Trash2 } from 'lucide-react';
import { venueService } from '../services/api';
import './VenueList.css';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    filterVenues();
  }, [searchTerm, venues]);

  const fetchVenues = async () => {
    try {
      const response = await venueService.getAllVenues();
      setVenues(response.data);
      setFilteredVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVenues = () => {
    let filtered = venues;

    if (searchTerm) {
      filtered = filtered.filter(venue =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredVenues(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        await venueService.deleteVenue(id);
        fetchVenues();
      } catch (error) {
        console.error('Error deleting venue:', error);
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

      <div className="filters-section card">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by venue name..."
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
              <th>Capacity</th>
              <th>Price Per Hour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVenues.map((venue) => (
              <tr key={venue.id}>
                <td>#{venue.id}</td>
                <td className="venue-name">{venue.name}</td>
                <td>{venue.capacity} people</td>
                <td>Rs. {venue.pricePerHour.toLocaleString()}</td>
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
