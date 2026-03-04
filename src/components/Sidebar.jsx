import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, MapPin, CalendarPlus, Building2, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/events', icon: Calendar, label: 'All Events' },
    { path: '/events/add', icon: CalendarPlus, label: 'Book Event' },
    { path: '/venues', icon: MapPin, label: 'Venues' },
    { path: '/venues/add', icon: Building2, label: 'Add Venue' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/Hotel_Logo.png" alt="Hotel Logo" className="hotel-logo" />
      </div>

      <div className="user-info">
        <div className="user-avatar">
          <User size={24} />
        </div>
        <div className="user-details">
          <p className="user-name">{user?.fullName || 'Event Manager'}</p>
          <p className="user-role">{user?.role || 'Admin'}</p>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">Event Management</h3>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
        <p className="footer-text">© 2026 ආලකමන්දා Hotel</p>
        <p className="footer-subtext">Event Management System</p>
      </div>
    </div>
  );
};

export default Sidebar;
