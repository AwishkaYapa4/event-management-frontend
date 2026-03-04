import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EventList from './pages/EventList';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import EventDetails from './pages/EventDetails';
import VenueList from './pages/VenueList';
import AddVenue from './pages/AddVenue';
import EditVenue from './pages/EditVenue';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute>
                <Layout>
                  <EventList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/events/add" element={
              <ProtectedRoute>
                <Layout>
                  <AddEvent />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/events/edit/:id" element={
              <ProtectedRoute>
                <Layout>
                  <EditEvent />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/events/:id" element={
              <ProtectedRoute>
                <Layout>
                  <EventDetails />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/venues" element={
              <ProtectedRoute>
                <Layout>
                  <VenueList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/venues/add" element={
              <ProtectedRoute>
                <Layout>
                  <AddVenue />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/venues/edit/:id" element={
              <ProtectedRoute>
                <Layout>
                  <EditVenue />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Catch all - redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
