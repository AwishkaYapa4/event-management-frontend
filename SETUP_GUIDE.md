# Event Management Frontend - Setup Guide

## Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Backend service running on port 8087

## Step-by-Step Setup

### 1. Navigate to the Project Directory
```bash
cd "d:\Local Disk G\7 Sem\DEA ll\test\Microservice-Based-Hotel-Management-System\frontend\event-management"
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages:
- React 19
- React Router DOM
- Axios for API calls
- TanStack Query for data fetching
- Lucide React for icons
- Vite as build tool

### 3. Copy Hotel Logo (Important!)
Copy the hotel logo from employee-management to event-management:

**Windows Command:**
```bash
copy ..\employee-management\public\Hotel_Logo.png public\
```

**Or manually:**
- Navigate to `frontend/employee-management/public/`
- Copy `Hotel_Logo.png`
- Paste it into `frontend/event-management/public/`

### 4. Start the Backend Service
Before starting the frontend, ensure the Event Management backend is running:

```bash
cd "d:\Local Disk G\7 Sem\DEA ll\test\Microservice-Based-Hotel-Management-System\backend\eventManagementService"
mvn spring-boot:run
```

The backend should start on **port 8087**.

### 5. Start the Development Server
```bash
npm run dev
```

The application will start on **http://localhost:5173**

### 6. Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot-reload

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder

### Preview
```bash
npm run preview
```
Preview the production build locally

### Lint
```bash
npm run lint
```
Run ESLint to check code quality

## Troubleshooting

### Issue: "Cannot connect to backend"
**Solution:**
1. Verify backend is running on port 8087
2. Check backend logs for errors
3. Verify CORS is properly configured in EventController

### Issue: "Logo not displaying"
**Solution:**
1. Ensure `Hotel_Logo.png` exists in `public/` folder
2. Clear browser cache and refresh

### Issue: "npm install fails"
**Solution:**
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### Issue: "Port 5173 already in use"
**Solution:**
1. Kill the process using port 5173
2. Or modify port in `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174
  }
})
```

## Testing the Application

### 1. Test Venue Management
1. Click "Add Venue" in sidebar
2. Fill in venue details:
   - Name: "Grand Ballroom"
   - Capacity: 200
   - Price Per Hour: 50000
3. Click "Create Venue"
4. Verify venue appears in Venue List

### 2. Test Event Booking
1. Click "Book Event" in sidebar
2. Fill in event details:
   - Customer Name: "John Doe"
   - Venue: Select from dropdown
   - Event Date: Select future date
   - Attendees: 150
   - Status: CONFIRMED
3. Click "Book Event"
4. Verify event appears in Event List

### 3. Test Event Details
1. Go to Event List
2. Click the eye icon on any event
3. Verify all details display correctly

### 4. Test Edit Functionality
1. Go to Event List
2. Click edit icon
3. Modify details
4. Save changes
5. Verify changes are reflected

### 5. Test Delete Functionality
1. Go to Event or Venue List
2. Click delete icon
3. Confirm deletion
4. Verify item is removed

## Backend API Endpoints Verification

Test these endpoints to ensure backend is working:

### Check Events
```bash
curl http://localhost:8087/api/events
```

### Check Venues
```bash
curl http://localhost:8087/api/events/venues
```

### Create Test Venue
```bash
curl -X POST http://localhost:8087/api/events/venues \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Hall\",\"capacity\":100,\"pricePerHour\":25000}"
```

## Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy
The `dist` folder contains the production-ready files. Deploy to:
- Netlify
- Vercel
- AWS S3
- Azure Static Web Apps
- Or any static hosting service

### Environment Variables (Production)
Create `.env.production`:
```
VITE_API_URL=https://your-api-domain.com/api/events
```

Update `src/services/api.js` to use environment variable:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8087/api/events';
```

## Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Support
For issues or questions, contact the development team.

---
**Last Updated**: March 2026
