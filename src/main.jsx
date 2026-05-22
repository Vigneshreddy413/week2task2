import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import SkeletonLoader from './components/SkeletonLoader.jsx';
import './styles/index.css';

const Login = lazy(() => import('./pages/Login.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Jobs = lazy(() => import('./pages/Jobs.jsx'));
const Applicants = lazy(() => import('./pages/Applicants.jsx'));
const Users = lazy(() => import('./pages/Users.jsx'));
const Analytics = lazy(() => import('./pages/Analytics.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));

function ProtectedRoute() {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Suspense fallback={<SkeletonLoader fullScreen />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/users" element={<Users />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  </React.StrictMode>,
);
