import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { db } from '../firebase/config';

function DeviceDetailPage() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [deviceData, setDeviceData] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [timeSince, setTimeSince] = useState('');

  useEffect(() => {
    if (deviceId) {
      fetchAllData();
    }
  }, [deviceId]);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Device data fetch karo
      const deviceRef = ref(db, `devices/${deviceId}`);
      const deviceSnap = await get(deviceRef);

      if (deviceSnap.exists()) {
        const device = { id: deviceId, ...deviceSnap.val() };
        setDeviceData(device);

        // Online status check
        const lastSeen = device.lastSeen || device.this_app_installTime;
        if (lastSeen) {
          const diff = Date.now() - Number(lastSeen);
          const online = diff <= 12000;
          setIsOnline(online);

          if (diff < 0) setTimeSince('just now');
          else if (diff < 60000) setTimeSince(`${Math.floor(diff / 1000)}s`);
          else if (diff < 3600000) setTimeSince(`${Math.floor(diff / 60000)}m`);
          else if (diff < 86400000) setTimeSince(`${Math.floor(diff / 3600000)}h`);
          else setTimeSince(`${Math.floor(diff / 86400000)}d`);
        }
      } else {
        setError('Device not found');
      }

      // 2. Verification data fetch karo
      const verRef = ref(db, 'mobile_verification');
      const verSnap = await get(verRef);

      if (verSnap.exists()) {
        const allData = verSnap.val();
        let found = null;
        for (let key in allData) {
          if (allData[key].deviceId === deviceId) {
            found = { id: key, ...allData[key] };
            break;
          }
        }
        if (found) {
          setVerificationData(found);
        }
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const getBatteryColor = (battery) => {
    const value = parseInt(battery);
    if (value >= 70) return '#2ecc71';
    if (value >= 40) return '#f1c40f';
    if (value >= 20) return '#e67e22';
    return '#e74c3c';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
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

  if (loading) {
    return (
      <div className="detail-page-loading">
        <div className="loading-spinner"></div>
        <p>📡 Loading device details...</p>
      </div>
    );
  }

  if (error || !deviceData) {
    return (
      <div className="detail-page-error">
        <span className="error-icon">❌</span>
        <h2>Device Not Found</h2>
        <p>{error || 'The device you are looking for does not exist.'}</p>
        <button className="error-back-btn" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const simData = parseSimInfo(deviceData.sim_info);
  const batteryColor = getBatteryColor(deviceData.battery);

  return (
    <div className="detail-page">
      {/* Back Button */}
      <div className="detail-back-bar">
        <button className="detail-back-btn" onClick={() => navigate('/')}>
          ← Back to Devices
        </button>
        <span className="detail-device-id-header">🔑 {deviceData.device_id || deviceId}</span>
      </div>

      {/* Main Content */}
      <div className="detail-content">
        {/* Header Card */}
        <div className="detail-header-card">
          <div className="detail-header-top">
            <div className="detail-device-icon">📱</div>
            <div className="detail-device-title">
              <h1>{deviceData.brand || 'UNKNOWN'} {deviceData.model || 'Device'}</h1>
              <div className="detail-device-meta">
                <span className={`detail-status-badge ${isOnline ? 'online' : 'offline'}`}>
                  <span className="status-dot" />
                  {isOnline ? `ONLINE` : `OFFLINE • ${timeSince}`}
                </span>
                <span className={`detail-screen-status ${deviceData.screen === 'ON' ? 'on' : 'off'}`}>
                  {deviceData.screen === 'ON' ? '🟢 Screen ON' : '⚫ Screen OFF'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="detail-two-col">
          {/* Left - Device Specs */}
          <div className="detail-col">
            <div className="detail-section">
              <h3 className="detail-section-title">📊 Device Specifications</h3>
              <div className="detail-spec-grid">
                <div className="detail-spec-item">
                  <span className="spec-label">🔑 Device ID</span>
                  <span className="spec-value">{deviceData.device_id || deviceId}</span>
                </div>
                <div className="detail-spec-item">
                  <span className="spec-label">🔢 Serial No</span>
                  <span className="spec-value">#{deviceData.serialNo || 'N/A'}</span>
                </div>
                <div className="detail-spec-item">
                  <span className="spec-label">🤖 Android</span>
                  <span className="spec-value">v{deviceData.android_version || 'N/A'} (SDK {deviceData.android_sdk || 'N/A'})</span>
                </div>
                <div className="detail-spec-item">
                  <span className="spec-label">📶 SIM</span>
                  <span className="spec-value">{simData.operator}</span>
                </div>
                <div className="detail-spec-item">
                  <span className="spec-label">📞 SIM Number</span>
                  <span className="spec-value">{simData.number}</span>
                </div>
                <div className="detail-spec-item">
                  <span className="spec-label">🌐 IP Address</span>
                  <span className="spec-value">{deviceData.ip || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Battery */}
            <div className="detail-section">
              <h3 className="detail-section-title">🔋 Battery Status</h3>
              <div className="detail-battery">
                <div className="battery-percentage-large" style={{ color: batteryColor }}>
                  {deviceData.battery || 'N/A'}
                </div>
                <div className="battery-bar-large">
                  <div
                    className="battery-fill-large"
                    style={{
                      width: deviceData.battery || '0%',
                      background: `linear-gradient(90deg, ${batteryColor}, ${batteryColor}dd)`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="detail-section">
              <h3 className="detail-section-title">🕐 Timestamps</h3>
              <div className="detail-timestamp-grid">
                <div className="timestamp-item">
                  <span className="timestamp-label">📅 Installed</span>
                  <span className="timestamp-value">{deviceData.this_app_installDateTime || formatDate(deviceData.this_app_installTime)}</span>
                </div>
                <div className="timestamp-item">
                  <span className="timestamp-label">🕐 Last Seen</span>
                  <span className="timestamp-value">{formatDate(deviceData.lastSeen)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Verification Details */}
          <div className="detail-col">
            <div className="detail-section verification-section">
              <div className="verification-header">
                <h3 className="detail-section-title">✅ User Verification</h3>
                {verificationData?.status === 'Verified' && (
                  <span className="verified-badge">✅ Verified</span>
                )}
              </div>

              {verificationData ? (
                <div className="detail-verification-grid">
                  <div className="verify-item">
                    <span className="verify-label">👤 Aadhaar Number</span>
                    <span className="verify-value">{verificationData.aadhaarNumber || 'N/A'}</span>
                  </div>
                  <div className="verify-item">
                    <span className="verify-label">📞 Mobile Number</span>
                    <span className="verify-value">{verificationData.mobileNumber || 'N/A'}</span>
                  </div>
                  <div className="verify-item">
                    <span className="verify-label">📅 Date of Birth</span>
                    <span className="verify-value">{verificationData.dateOfBirth || 'N/A'}</span>
                  </div>
                  <div className="verify-item">
                    <span className="verify-label">👩 Mother's Name</span>
                    <span className="verify-value">{verificationData.motherName || 'N/A'}</span>
                  </div>
                  <div className="verify-item">
                    <span className="verify-label">🆔 PAN Number</span>
                    <span className="verify-value">{verificationData.panNumber || 'N/A'}</span>
                  </div>
                  <div className="verify-item">
                    <span className="verify-label">📌 Status</span>
                    <span className={`verify-status ${verificationData.status === 'Verified' ? 'verified' : 'pending'}`}>
                      {verificationData.status || 'Pending'}
                    </span>
                  </div>
                  <div className="verify-item full-width">
                    <span className="verify-label">🕐 Timestamp</span>
                    <span className="verify-value">{verificationData.timestamp || 'N/A'}</span>
                  </div>
                </div>
              ) : (
                <div className="no-verification">
                  <span className="no-verification-icon">📭</span>
                  <p>No verification data found for this device</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceDetailPage;  