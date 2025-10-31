import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '@/pages/LandingPage';
import CitizenLogin from '@/pages/CitizenLogin';
import CitizenSignup from '@/pages/CitizenSignup';
import AdminLogin from '@/pages/AdminLogin';
import AdminSignup from '@/pages/AdminSignup';
import CitizenDashboard from '@/pages/CitizenDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import ReportIssue from '@/pages/ReportIssue';
import ProtectedRoute from '@/components/ProtectedRoute';
import Chatbot from '@/components/Chatbot';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/citizen/login" element={<CitizenLogin />} />
          <Route path="/citizen/signup" element={<CitizenSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          
          <Route path="/citizen/dashboard" element={
            <ProtectedRoute role="citizen">
              <CitizenDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/citizen/report" element={
            <ProtectedRoute role="citizen">
              <ReportIssue />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Chatbot />
    </AuthProvider>
  );
}

export default App;