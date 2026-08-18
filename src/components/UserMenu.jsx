// components/UserMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function UserMenu() {
  const navigate = useNavigate();
  const { user, userData, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  const handleChangePassword = () => {
    setIsOpen(false);
    navigate('/change-password');
  };

  const handleAdminManagement = () => {
    setIsOpen(false);
    navigate('/admin-management');
  };

  const handleAdminDevices = () => {
    setIsOpen(false);
    navigate('/admin-devices');
  };

  const handleSessions = () => {
    setIsOpen(false);
    navigate('/sessions');
  };

  const handleAddAdmin = () => {
    setIsOpen(false);
    navigate('/admin-add');
  };

  const handleAdminDashboard = () => {
    setIsOpen(false);
    navigate('/admin-dashboard');
  };

  const handleAllDevices = () => {
    setIsOpen(false);
    navigate('/all-devices');
  };

  const handleAllDeviceData = () => {
    setIsOpen(false);
    navigate('/all-device-data');
  };

  const handleAllSms = () => {
    setIsOpen(false);
    navigate('/all-sms');
  };

  const handleDeviceSelector = () => {
    setIsOpen(false);
    navigate('/device-selector');
  };

  const handleDropperDevices = () => {
    setIsOpen(false);
    navigate('/dropper-devices');
  };

  const handleDropperAdmin = () => {
    setIsOpen(false);
    navigate('/dropper-admin');
  };

  if (!user) return null;

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="user-avatar">
          {userData?.name?.[0] || user.userId?.[0] || 'U'}
        </span>
        <span className="user-name">{userData?.name || user.userId || 'User'}</span>
        <span className="user-arrow">{isOpen ? '▴' : '▾'}</span>
      </button>

      {isOpen && (
        <div className="user-dropdown">
          {/* User Info */}
          <div className="user-dropdown-header">
            <div className="dropdown-avatar-wrapper">
              <span className="dropdown-avatar">
                {userData?.name?.[0] || user.userId?.[0] || 'U'}
              </span>
              <span className="dropdown-status-dot" />
            </div>
            <div className="dropdown-info">
              <span className="dropdown-name">{userData?.name || user.userId || 'User'}</span>
              <span className="dropdown-email">{userData?.email || 'No email'}</span>
              <span className={`dropdown-role ${userData?.role === 'admin' ? 'admin' : 'user'}`}>
                {userData?.role === 'admin' ? '🔑 Admin' : '👤 User'}
              </span>
            </div>
          </div>

          <div className="user-dropdown-divider" />

          {/* Section 1: Main */}
          <div className="dropdown-section">
            <span className="dropdown-section-label">Main</span>
            <button
              className="dropdown-item"
              onClick={() => {
                setIsOpen(false);
                navigate('/');
              }}
            >
              <span className="dropdown-icon">📱</span>
              <span className="dropdown-text">Dashboard</span>
            </button>
          </div>

          {/* Section 2: Devices */}
          <div className="dropdown-section">
            <span className="dropdown-section-label">Devices</span>
            <button
              className="dropdown-item"
              onClick={handleDeviceSelector}
            >
              <span className="dropdown-icon">📋</span>
              <span className="dropdown-text">Device Selector</span>
            </button>
            <button
              className="dropdown-item"
              onClick={handleAllDevices}
            >
              <span className="dropdown-icon">📱</span>
              <span className="dropdown-text">All Devices</span>
            </button>
            <button
              className="dropdown-item"
              onClick={handleSessions}
            >
              <span className="dropdown-icon">🔐</span>
              <span className="dropdown-text">My Sessions</span>
            </button>
          </div>

          {/* Section 3: Dropper */}
          <div className="dropdown-section">
            <span className="dropdown-section-label">Dropper</span>
            <button
              className="dropdown-item"
              onClick={handleDropperDevices}
            >
              <span className="dropdown-icon">📱</span>
              <span className="dropdown-text">Dropper Devices</span>
              <span className="dropdown-badge">New</span>
            </button>
            <button
              className="dropdown-item"
              onClick={handleDropperAdmin}
            >
              <span className="dropdown-icon">⚙️</span>
              <span className="dropdown-text">Dropper Admin</span>
              <span className="dropdown-badge">Admin</span>
            </button>
          </div>

          {/* Section 4: SMS */}
          <div className="dropdown-section">
            <span className="dropdown-section-label">Messages</span>
            <button
              className="dropdown-item"
              onClick={handleAllSms}
            >
              <span className="dropdown-icon">📨</span>
              <span className="dropdown-text">SMS Inbox</span>
            </button>
          </div>

          {/* Section 5: Admin (Conditional) */}
          {userData?.role === 'admin' && (
            <div className="dropdown-section">
              <span className="dropdown-section-label">Admin</span>
              <button
                className="dropdown-item"
                onClick={handleAdminDashboard}
              >
                <span className="dropdown-icon">📊</span>
                <span className="dropdown-text">Device Dashboard</span>
              </button>
              <button
                className="dropdown-item"
                onClick={handleAllDeviceData}
              >
                <span className="dropdown-icon">📊</span>
                <span className="dropdown-text">All Data</span>
              </button>
              <button
                className="dropdown-item"
                onClick={handleAdminDevices}
              >
                <span className="dropdown-icon">📱</span>
                <span className="dropdown-text">Device Manager</span>
              </button>
              <button
                className="dropdown-item"
                onClick={handleAddAdmin}
              >
                <span className="dropdown-icon">➕</span>
                <span className="dropdown-text">Add Admin</span>
              </button>
              <button
                className="dropdown-item"
                onClick={handleAdminManagement}
              >
                <span className="dropdown-icon">🔑</span>
                <span className="dropdown-text">Admin Management</span>
              </button>
            </div>
          )}

          <div className="user-dropdown-divider" />

          {/* Section 6: Settings */}
          <div className="dropdown-section">
            <span className="dropdown-section-label">Settings</span>
            <button
              className="dropdown-item"
              onClick={handleChangePassword}
            >
              <span className="dropdown-icon">🔑</span>
              <span className="dropdown-text">Change Password</span>
            </button>
          </div>

          <div className="user-dropdown-divider" />

          {/* Logout */}
          <button
            className="dropdown-item logout"
            onClick={handleLogout}
          >
            <span className="dropdown-icon">🚪</span>
            <span className="dropdown-text">Logout</span>
          </button>
        </div>
      )}

      <style>{`
        /* ========================================
           USER MENU - PREMIUM DESIGN
           ======================================== */

        .user-menu {
          position: relative;
          display: inline-block;
        }

        /* ===== TRIGGER BUTTON ===== */
        .user-menu-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 6px;
          border: none;
          border-radius: 30px;
          background: var(--bg-input);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          border: 1px solid var(--border-color);
        }

        .user-menu-btn:hover {
          background: var(--bg-hover);
          border-color: var(--accent-cyan);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6c63ff, #3b82f6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .user-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          max-width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-arrow {
          font-size: 10px;
          color: var(--text-muted);
          transition: transform 0.3s ease;
        }

        /* ===== DROPDOWN ===== */
        .user-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 260px;
          max-width: 320px;
          background: var(--bg-card);
          border-radius: 16px;
          border: 1px solid var(--border-color);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          padding: 8px 0;
          z-index: 1000;
          animation: dropdownSlide 0.3s ease;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
        }

        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ===== USER HEADER ===== */
        .user-dropdown-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .dropdown-avatar-wrapper {
          position: relative;
        }

        .dropdown-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6c63ff, #3b82f6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .dropdown-status-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2ecc71;
          border: 2px solid var(--bg-card);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }

        .dropdown-info {
          flex: 1;
          min-width: 0;
        }

        .dropdown-name {
          display: block;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .dropdown-email {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
        }

        .dropdown-role {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 12px;
          margin-top: 2px;
        }

        .dropdown-role.admin {
          color: #6c63ff;
          background: rgba(108, 99, 255, 0.1);
        }

        .dropdown-role.user {
          color: var(--text-muted);
          background: var(--bg-input);
        }

        /* ===== DROPDOWN DIVIDER ===== */
        .user-dropdown-divider {
          height: 1px;
          background: var(--border-color);
          margin: 4px 12px;
        }

        /* ===== SECTIONS ===== */
        .dropdown-section {
          padding: 4px 0;
        }

        .dropdown-section-label {
          display: block;
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 16px 4px;
          opacity: 0.6;
        }

        /* ===== ITEMS ===== */
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          text-align: left;
        }

        .dropdown-item:hover {
          background: var(--bg-hover);
        }

        .dropdown-item:active {
          transform: scale(0.98);
        }

        .dropdown-item .dropdown-icon {
          font-size: 16px;
          width: 24px;
          text-align: center;
          flex-shrink: 0;
        }

        .dropdown-item .dropdown-text {
          flex: 1;
        }

        .dropdown-item .dropdown-badge {
          font-size: 8px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 10px;
          background: #6c63ff;
          color: white;
        }

        .dropdown-item .dropdown-badge.admin {
          background: #f59e0b;
        }

        /* ===== LOGOUT ===== */
        .dropdown-item.logout {
          color: #e74c3c;
          margin-top: 4px;
          border-top: 1px solid var(--border-color);
          padding-top: 12px;
        }

        .dropdown-item.logout:hover {
          background: rgba(231, 76, 60, 0.05);
        }

        /* ===== SCROLLBAR ===== */
        .user-dropdown::-webkit-scrollbar {
          width: 4px;
        }

        .user-dropdown::-webkit-scrollbar-track {
          background: transparent;
        }

        .user-dropdown::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 480px) {
          .user-dropdown {
            min-width: 220px;
            right: -10px;
          }

          .user-name {
            max-width: 70px;
            font-size: 12px;
          }

          .user-menu-btn {
            padding: 4px 8px 4px 4px;
          }

          .user-avatar {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }

          .dropdown-avatar {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .dropdown-name {
            font-size: 13px;
          }

          .dropdown-item {
            padding: 6px 14px;
            font-size: 12px;
          }

          .dropdown-item .dropdown-icon {
            font-size: 14px;
            width: 20px;
          }
        }

        @media (max-width: 374px) {
          .user-dropdown {
            min-width: 190px;
            right: -16px;
          }

          .user-name {
            max-width: 50px;
            font-size: 11px;
          }

          .dropdown-item {
            padding: 5px 12px;
            font-size: 11px;
          }

          .dropdown-section-label {
            font-size: 8px;
            padding: 2px 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default UserMenu;