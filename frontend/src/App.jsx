import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './routes/ProtectedRoute';

// Lazy loading or explicit import for safety
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReferralForm from './pages/ReferralForm';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: 'font-sans font-bold text-sm rounded-2xl shadow-2xl border border-gray-50',
              duration: 4000,
            }}
          />
          <Routes>
            {/* AUTH ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PROTECTED ROUTES */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/referral"
              element={
                <ProtectedRoute>
                  <ReferralForm />
                </ProtectedRoute>
              }
            />

            {/* FALLBACKS */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
