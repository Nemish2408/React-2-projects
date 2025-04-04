import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/NavBar';
import Dashboard from './components/Dashboard';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated
    ? children
    : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Navbar />
              <Dashboard />
              <Footer />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;