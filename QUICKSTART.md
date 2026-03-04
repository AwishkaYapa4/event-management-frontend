# Event Management Frontend - Quick Start

## 🚀 Quick Start Guide

### Start in 3 Steps:

#### Step 1: Install Dependencies
```bash
cd "d:\Local Disk G\7 Sem\DEA ll\test\Microservice-Based-Hotel-Management-System\frontend\event-management"
npm install
```

#### Step 2: Start Backend (In separate terminal)
```bash
cd "d:\Local Disk G\7 Sem\DEA ll\test\Microservice-Based-Hotel-Management-System\backend\eventManagementService"
mvn spring-boot:run
```

#### Step 3: Start Frontend
```bash
npm run dev
```

## ✅ Verify Setup

1. **Backend Running**: http://localhost:8087/api/events/venues
2. **Frontend Running**: http://localhost:5173

## 🎯 First Actions

1. **Add a Venue**: Click "Add Venue" → Fill details → Save
2. **Book an Event**: Click "Book Event" → Select venue → Fill details → Save
3. **View Dashboard**: See statistics update automatically

## 📱 Features Available

- ✅ Dashboard with statistics
- ✅ Event booking and management
- ✅ Venue management
- ✅ Search and filters
- ✅ Edit/Delete operations
- ✅ Detailed event view

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📊 API Connection

- **Development**: http://localhost:8087/api/events
- **Backend Port**: 8087
- **Frontend Port**: 5173 (Vite default)

---
**Ready to go!** Open http://localhost:5173 in your browser 🎉
