# Event Management Frontend - Implementation Summary

## Overview
This is the frontend application for the Event Management service of ආලකමන්දා Hotel Management System. Built with React and Vite, it provides a modern, responsive interface for managing events and venues.

## Features Implemented

### 1. Dashboard
- Overview statistics (Total Events, Total Venues, Total Attendees)
- Quick action links
- Event overview panel
- Responsive stats cards with icons

### 2. Event Management
- **Event List**: View all events with search and status filtering
- **Add Event**: Book new events with venue selection
- **Edit Event**: Update existing event details
- **Event Details**: View comprehensive event information including venue details
- **Delete Event**: Remove events with confirmation

### 3. Venue Management
- **Venue List**: View all venues with search functionality
- **Add Venue**: Create new venues with capacity and pricing
- **Edit Venue**: Update venue information
- **Delete Venue**: Remove venues with confirmation

## Technical Stack

- **React 19**: Latest React version with modern hooks
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **TanStack Query**: Data fetching and caching
- **Lucide React**: Modern icon library

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Main layout wrapper
│   ├── Layout.css
│   ├── Sidebar.jsx         # Navigation sidebar
│   └── Sidebar.css
├── pages/
│   ├── Dashboard.jsx       # Main dashboard
│   ├── Dashboard.css
│   ├── EventList.jsx       # Event directory
│   ├── EventList.css
│   ├── AddEvent.jsx        # Book new event
│   ├── EditEvent.jsx       # Edit event
│   ├── EventForm.css
│   ├── EventDetails.jsx    # Event details view
│   ├── EventDetails.css
│   ├── VenueList.jsx       # Venue directory
│   ├── VenueList.css
│   ├── AddVenue.jsx        # Create venue
│   ├── EditVenue.jsx       # Edit venue
│   └── VenueForm.css
├── services/
│   └── api.js              # API service layer
├── App.jsx                 # Main app component
├── App.css                 # Global styles
├── main.jsx                # Entry point
└── index.css               # Base styles
```

## API Integration

### Backend Configuration
- **Development**: http://localhost:8087/api/events
- **Production**: /api/events (proxy configured)
- **Port**: 8087

### API Endpoints Used

#### Events
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `POST /api/events/book` - Book new event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

#### Venues
- `GET /api/events/venues` - Get all venues
- `GET /api/events/venues/{id}` - Get venue by ID
- `POST /api/events/venues` - Create venue
- `PUT /api/events/venues/{id}` - Update venue
- `DELETE /api/events/venues/{id}` - Delete venue

## Data Models

### Event
```javascript
{
  id: number,
  venueId: number,
  customerName: string,
  eventDate: date,
  attendees: number,
  status: string, // PENDING, CONFIRMED, COMPLETED, CANCELLED
  createdAt: dateTime
}
```

### Venue
```javascript
{
  id: number,
  name: string,
  capacity: number,
  pricePerHour: number,
  createdAt: dateTime
}
```

## Styling

### Design System
- **Primary Color**: #1e40af (Blue)
- **Secondary Color**: #10b981 (Green)
- **Danger Color**: #ef4444 (Red)
- **Warning Color**: #f59e0b (Amber)

### Features
- Responsive design (mobile-first)
- Modern card-based layout
- Smooth animations and transitions
- Consistent spacing and typography
- Accessible form inputs with validation

## Installation & Setup

1. **Install Dependencies**
   ```bash
   cd frontend/event-management
   npm install
   ```

2. **Copy Hotel Logo**
   Copy the `Hotel_Logo.png` file from `employee-management/public/` to `event-management/public/`

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

4. **Build for Production**
   ```bash
   npm run build
   ```

## Backend Requirements

Ensure the Event Management Service backend is running on port 8087:
```bash
cd backend/eventManagementService
mvn spring-boot:run
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements (Suggested)
- Authentication integration
- Event calendar view
- Venue booking conflict detection
- Email notifications for bookings
- Payment integration
- Customer portal
- Advanced reporting and analytics
- Image upload for venues
- Recurring events support

## Notes
- All forms include proper validation
- Uses the same styling as employee-management for consistency
- Fully responsive across all device sizes
- Loading states for all async operations
- Error handling with user-friendly messages
- Confirmation dialogs for destructive actions

---
**Author**: Event Management Team  
**Date**: March 2026  
**Version**: 1.0.0
