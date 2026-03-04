import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, CalendarPlus, Building2, TrendingUp } from 'lucide-react';
import { eventService, venueService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalVenues: 0,
    totalAttendees: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setError('');
      const [eventsResponse, venuesResponse] = await Promise.all([
        eventService.getAllEvents().catch(err => ({ data: [] })),
        venueService.getAllVenues().catch(err => ({ data: [] })),
      ]);

      const events = Array.isArray(eventsResponse.data) ? eventsResponse.data : [];
      const venues = Array.isArray(venuesResponse.data) ? venuesResponse.data : [];

      const totalAttendees = events.reduce((sum, event) => sum + (event.attendees || 0), 0);

      setStats({
        totalEvents: events.length,
        totalVenues: venues.length,
        totalAttendees: totalAttendees,
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setError('Failed to load dashboard data. Please refresh the page.');
      setStats({
        totalEvents: 0,
        totalVenues: 0,
        totalAttendees: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  const statCards = [
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: '#3b82f6',
      bgColor: '#dbeafe',
    },
    {
      title: 'Total Venues',
      value: stats.totalVenues,
      icon: MapPin,
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      title: 'Total Attendees',
      value: stats.totalAttendees,
      icon: Users,
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
  ];

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome to ආලකමන්දා Hotel Event Management System</p>
        </div>
        <Link to="/events/add" className="btn btn-primary">
          <CalendarPlus size={20} />
          Book New Event
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 mt-4">
        <div className="card">
          <h3 className="card-title">
            <TrendingUp size={20} />
            Event Overview
          </h3>
          <div className="financial-stats">
            <div className="financial-item">
              <span className="financial-label">Active Events</span>
              <span className="financial-value">{stats.totalEvents}</span>
            </div>
            <div className="financial-item">
              <span className="financial-label">Available Venues</span>
              <span className="financial-value">{stats.totalVenues}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">
            <Building2 size={20} />
            Quick Actions
          </h3>
          <div className="quick-actions">
            <Link to="/events" className="action-link">
              View All Events
            </Link>
            <Link to="/events/add" className="action-link">
              Book New Event
            </Link>
            <Link to="/venues" className="action-link">
              Manage Venues
            </Link>
            <Link to="/venues/add" className="action-link">
              Add New Venue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
