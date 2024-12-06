import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound'; // A new 404 component

// Lazy-loaded components for better performance
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Profile = lazy(() => import('./components/Profile'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Bills = lazy(() => import('./components/Bills'));
const Friends = lazy(() => import('./components/Friends'));
const Camera = lazy(() => import('./components/Camera'));
const About = lazy(() => import('./components/About'));

// PrivateRoute component for authentication
function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(null); // Manages user state
  const location = useLocation();

  const navbarPaths = ['/dashboard', '/profile', '/bills', '/friends', '/camera']; // where navbar appears

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: '75vh', mx: 'auto', px: 2 }}>
        {navbarPaths.includes(location.pathname) && (
          <Navbar user={user} setUser={setUser} />
        )}
        <Suspense fallback={
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        }>
          <Routes>
            {/* Conditional Redirect for Home */}
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Navigate to="/home" />}
            />
            <Route
              path="/BillSplitter"
              element={user ? <Navigate to="/dashboard" /> : <Navigate to="/home" />}
            />

            {/* Public Routes */}
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute user={user}>
                  <Dashboard user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute user={user}>
                  <Profile user={user} setUser={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/bills"
              element={
                <PrivateRoute user={user}>
                  <Bills />
                </PrivateRoute>
              }
            />
            <Route
              path="/friends"
              element={
                <PrivateRoute user={user}>
                  <Friends />
                </PrivateRoute>
              }
            />
            <Route
              path="/camera"
              element={
                <PrivateRoute user={user}>
                  <Camera />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Box>
    </ThemeProvider>
  );
}

export default App;
