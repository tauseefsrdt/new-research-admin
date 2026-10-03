import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layout
import AdminLayout from '../components/layout/AdminLayout';

// Pages
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import PatentsPage from '../pages/PatentsPage';
import ResearchPapersPage from '../pages/ResearchPapersPage';
import BooksPage from '../pages/BooksPage';
import InstitutesPage from '../pages/InstitutesPage';
import VacantSeatsPage from '../pages/VacantSeatsPage';
import ThesesAwardedPage from '../pages/ThesesAwardedPage';
import PhdSupervisorsPage from '../pages/PhdSupervisorsPage';
import RcDocumentsPage from '../pages/RcDocumentsPage';
import LeadershipPage from '../pages/LeadershipPage';
import PatronsPage from '../pages/PatronsPage';
import GalleryImagesPage from '../pages/GalleryImagesPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  if (isAuthenticated || token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="patents" element={<PatentsPage />} />
        <Route path="research-papers" element={<ResearchPapersPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="institutes" element={<InstitutesPage />} />
        <Route path="vacant-seats" element={<VacantSeatsPage />} />
        <Route path="theses-awarded" element={<ThesesAwardedPage />} />
        <Route path="phd-supervisors" element={<PhdSupervisorsPage />} />
        <Route path="rc-documents" element={<RcDocumentsPage />} />
        <Route path="leaderships" element={<LeadershipPage />} />
        <Route path="patrons" element={<PatronsPage />} />
        <Route path="gallery" element={<GalleryImagesPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
