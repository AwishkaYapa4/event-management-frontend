import axios from 'axios';

// Event Management Service API URL
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'http://Event-management-service-env.eba-qrma82w3.us-east-1.elasticbeanstalk.com/api/events'  // AWS Production
  : 'http://Event-management-service-env.eba-qrma82w3.us-east-1.elasticbeanstalk.com/api/events';  // Using AWS for development too

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (for future auth implementation)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const venueService = {
  // Get all venues
  getAllVenues: () => api.get('/venues'),
  
  // Get venue by ID
  getVenueById: (id) => api.get(`/venues/${id}`),
  
  // Create new venue
  createVenue: (venueData) => api.post('/venues', venueData),
  
  // Update venue
  updateVenue: (id, venueData) => api.put(`/venues/${id}`, venueData),
  
  // Delete venue
  deleteVenue: (id) => api.delete(`/venues/${id}`),
};

export const eventService = {
  // Get all events
  getAllEvents: () => api.get(''),
  
  // Get event by ID
  getEventById: (id) => api.get(`/${id}`),
  
  // Book/Create new event
  bookEvent: (eventData) => api.post('/book', eventData),
  
  // Update event
  updateEvent: (id, eventData) => api.put(`/${id}`, eventData),
  
  // Delete event
  deleteEvent: (id) => api.delete(`/${id}`),
};

export default api;
