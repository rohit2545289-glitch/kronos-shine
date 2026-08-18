// components/DeviceCard.jsx
import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateDeviceField, getDevice } from '../firebase/config';

function DeviceCard({ device, index, onFavoriteToggle }) {
  const navigate = useNavigate();
  const [timeSince, setTimeSince] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(device.favorite || false);

  // ✅ 60 SECONDS THRESHOLD
  const ONLINE_THRESHOLD = useMemo(() => 60000, []);
  const STATUS_UPDATE_THRESHOLD = useMemo(() => 60000, []);

  // ============================================
  // STATUS CHECK
  // ============================================
  const checkStatus = useCallback(() => {
    if (!device) return;
    const lastSeen = device.lastSeen || device.this_app_installTime;
    if (!lastSeen) {
      setIsOnline(false);
      setTimeSince('never');
      return;
    }

    const diff = Date.now() - Number(lastSeen);
    const online = diff <= ONLINE_THRESHOLD;
    setIsOnline(prev => prev !== online ? online : prev);

    let newTimeSince = '';
    if (diff < 0) {
      newTimeSince = 'just now';
    } else if (diff < 60000) {
      newTimeSince = `${Math.floor(diff / 1000)}s ago`;
    } else if (diff < 3600000) {
      newTimeSince = `${Math.floor(diff / 60000)}m ago`;
    } else if (diff < 86400000) {
      newTimeSince = `${Math.floor(diff / 3600000)}h ago`;
    } else {
      newTimeSince = `${Math.floor(diff / 86400000)}d ago`;
    }
    setTimeSince(prev => prev !== newTimeSince ? newTimeSince : prev);

    if (diff > STATUS_UPDATE_THRESHOLD && device.status === 'online') {
      updateDeviceField(device.id, 'status', 'offline').catch(() => {});
    } else if (diff <= STATUS_UPDATE_THRESHOLD && device.status === 'offline') {
      updateDeviceField(device.id, 'status', 'online').catch(() => {});
    }
  }, [device]);

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  // ============================================
  // FAVORITE TOGGLE
  // ============================================
  const handleFavoriteToggle = useCallback(async (e) => {
    e.stopPropagation();
    const newFav = !isFavorite;
    setIsFavorite(newFav);
    try {
      await updateDeviceField(device.id, 'favorite', newFav);
      if (onFavoriteToggle) {
        onFavoriteToggle(device.id, newFav);
      }
    } catch (err) {
      setIsFavorite(!newFav);
      console.error('Favorite update failed', err);
    }
  }, [device.id, isFavorite, onFavoriteToggle]);

  // ============================================
  // 📡 STATUS CHECK - Dialog Show
  // ============================================
  const handleStatusCheck = useCallback(async (e) => {
    e.stopPropagation();
    setCheckingStatus(true);
    
    try {
      const latestDevice = await getDevice(device.id);
      if (latestDevice) {
        const lastSeen = latestDevice.lastSeen || latestDevice.this_app_installTime;
        const diff = Date.now() - Number(lastSeen);
        
        let timeMsg = '';
        let timeSeconds = Math.floor(diff / 1000);
        let timeMinutes = Math.floor(diff / 60000);
        let timeHours = Math.floor(diff / 3600000);
        let timeDays = Math.floor(diff / 86400000);
        
        if (diff < 60000) {
          timeMsg = `${timeSeconds} seconds ago`;
        } else if (diff < 3600000) {
          timeMsg = `${timeMinutes} minutes ago`;
        } else if (diff < 86400000) {
          timeMsg = `${timeHours} hours ago`;
        } else {
          timeMsg = `${timeDays} days ago`;
        }
        
        let prediction = '';
        let predictionColor = '';
        
        if (isOnline) {
          prediction = '✅ Device is currently ONLINE';
          predictionColor = '#2ecc71';
        } else if (diff < 120000) {
          const remaining = 60000 - (diff % 60000);
          const remainingSec = Math.floor(remaining / 1000);
          prediction = `🔮 Device may come online in ${remainingSec}s (App may be in background)`;
          predictionColor = '#f1c40f';
        } else if (diff < 600000) {
          prediction = '🔮 Device may come online soon (Check if app is running)';
          predictionColor = '#f39c12';
        } else if (diff < 3600000) {
          prediction = '🔮 Device might be offline. Try restarting the app.';
          predictionColor = '#e67e22';
        } else {
          prediction = '🔴 Device is offline. App may be uninstalled or permissions denied. IF SCREEN IS |OFF| THEN DEVICE WILL BE ONLINE 100% AFTER RESERT DEVICE.';
          predictionColor = '#e74c3c';
        }
        
        setDialogData({
          brand: device.brand || 'Unknown',
          model: device.model || 'Device',
          serial: device.serialNo || 'N/A',
          status: isOnline ? '🟢 ONLINE' : '🔴 OFFLINE',
          statusColor: isOnline ? '#2ecc71' : '#e74c3c',
          lastSeen: lastSeen ? new Date(lastSeen).toLocaleString() : 'Never',
          timeAgo: timeMsg,
          prediction: prediction,
          predictionColor: predictionColor,
          battery: device.battery || 'N/A',
          ip: device.ip || 'N/A',
          sim: device.sim_info || 'N/A',
          androidVersion: device.android_version || 'N/A',
          screen: device.screen === 'ON' ? '🟢 ON' : '⚫ OFF'
        });
        
        setShowDialog(true);
      }
    } catch (err) {
      console.error('Status check failed', err);
      alert('❌ Failed to check device status');
    }
    
    setTimeout(() => setCheckingStatus(false), 1000);
  }, [device, isOnline]);

  const handleDeviceClick = useCallback(() => {
    navigate(`/device/${device.device_id || device.id}`);
  }, [device, navigate]);

  // ============================================
  // HELPERS - Memoized
  // ============================================
  const batteryInfo = useMemo(() => {
    const value = parseInt(device.battery);
    if (value >= 70) return { bg: '#2ecc71', glow: 'rgba(46,204,113,0.3)', text: '#2ecc71' };
    if (value >= 40) return { bg: '#f1c40f', glow: 'rgba(241,196,15,0.3)', text: '#f1c40f' };
    if (value >= 20) return { bg: '#e67e22', glow: 'rgba(230,126,34,0.3)', text: '#e67e22' };
    return { bg: '#e74c3c', glow: 'rgba(231,76,60,0.3)', text: '#e74c3c' };
  }, [device.battery]);

  const simData = useMemo(() => {
    if (!device.sim_info) return { operator: 'N/A', number: 'N/A' };
    const parts = device.sim_info.split(' - ');
    if (parts.length === 2) {
      const operatorPart = parts[0].split(': ')[1] || parts[0];
      return { operator: operatorPart.trim(), number: parts[1].trim() };
    }
    return { operator: device.sim_info, number: 'N/A' };
  }, [device.sim_info]);

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  if (!device) return null;

  return (
    <>
      <div
        className={`device-card-premium-v2 ${isOnline ? 'online' : 'offline'} ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleDeviceClick}
        style={{ cursor: 'pointer', willChange: 'transform, opacity' }}
      >
        {/* Glow Effect */}
        <div className="card-glow-v2" style={{
          opacity: isOnline && isHovered ? 0.3 : 0,
          background: `radial-gradient(ellipse at 30% 20%, ${batteryInfo.glow}, transparent 70%)`,
          willChange: 'opacity'
        }} />

        {/* Status Bar */}
        <div className="card-status-v2" style={{
          background: isOnline
            ? 'linear-gradient(90deg, #2ecc71, #27ae60, #2ecc71)'
            : 'linear-gradient(90deg, #95a5a6, #7f8c8d, #95a5a6)',
          boxShadow: isOnline ? '0 0 20px rgba(46,204,113,0.2)' : 'none'
        }}>
          <div className="status-pulse-v2" />
        </div>

        <div className="card-body-v2">
          {/* Header - Device left, Actions + Time right */}
          <div className="card-header-v2">
            <div className="device-info-left">
              <div className="device-icon-v2">
                <span>📱</span>
                {isOnline && <span className="live-dot-v2" />}
              </div>
              <div className="device-name-group">
                <span className="device-brand-v2">{device.brand || 'UNKNOWN'}</span>
                <span className="device-model-v2">{device.model || 'Device'}</span>
              </div>
            </div>

            <div className="device-info-right">
              <div className="header-actions-v2">
                <span className="rank-badge-v2">
                  <span className="rank-icon">#</span>
                  {device.serialNo || 'N/A'}
                </span>
                <button
                  className={`action-btn-v2 fav-btn ${isFavorite ? 'active' : ''}`}
                  onClick={handleFavoriteToggle}
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite ? '⭐' : '☆'}
                </button>
                <button
                  className="action-btn-v2 status-btn"
                  onClick={handleStatusCheck}
                  disabled={checkingStatus}
                  title="Check online status & last update time"
                >
                  {checkingStatus ? '⏳' : '📡'}
                </button>
              </div>
              <div className={`time-since-right ${isOnline ? 'online' : 'offline'}`}>
                {timeSince}
              </div>
            </div>
          </div>

          {/* Device ID & Screen - Same row */}
          <div className="device-id-row-v2">
            <span className="device-id-v2">🔑 {device.device_id || device.id?.slice(-8)}</span>
            <span className={`screen-status-v2 ${device.screen === 'ON' ? 'on' : 'off'}`}>
              {device.screen === 'ON' ? '🟢 ON' : '⚫ OFF'}
            </span>
          </div>

          {/* Stats Row - SIM Left | Install Date Right - FIXED */}
          <div className="stats-row-v2">
            <div className="stat-item-left">
              <span className="stat-icon-v2">📶</span>
              <span className="sim-operator-v2">{simData.operator}</span>
              <span className="sim-divider-v2">—</span>
              <span className="sim-number-v2">{simData.number}</span>
            </div>

            <div className="install-date-right">
              <span className="install-date-icon-v2">📅</span>
              <span className="install-date-value-v2">
                {device.this_app_installDateTime || formatDate(device.this_app_installTime)}
              </span>
            </div>
          </div>

          {/* Battery */}
          <div className="battery-section-premium">
            <div className="battery-header">
              <div className="battery-info">
                <span className="battery-icon">🔋</span>
                <span className="battery-label-text">Battery</span>
              </div>
              <span className="battery-percentage" style={{ color: batteryInfo.text }}>
                {device.battery || 'N/A'}
              </span>
            </div>
            <div className="battery-track-premium">
              <div
                className="battery-fill-premium"
                style={{
                  width: device.battery || '0%',
                  background: `linear-gradient(90deg, ${batteryInfo.bg}, ${batteryInfo.bg}dd)`,
                  boxShadow: `0 0 20px ${batteryInfo.glow}`
                }}
              />
            </div>
          </div>
        </div>

        <style>{`
          /* ================================================================
             CARD HEADER - Device Left, Actions + Time Right
             ================================================================ */
          .card-header-v2 {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 6px;
            gap: 8px;
          }

          .device-info-left {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            min-width: 0;
          }

          .device-icon-v2 {
            font-size: 28px;
            position: relative;
            flex-shrink: 0;
          }

          .live-dot-v2 {
            position: absolute;
            bottom: -2px;
            right: -4px;
            width: 10px;
            height: 10px;
            background: #2ecc71;
            border-radius: 50%;
            animation: pulse-dot 1.5s ease-in-out infinite;
            border: 2px solid var(--bg-card);
          }

          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }

          .device-name-group {
            display: flex;
            align-items: baseline;
            gap: 6px;
            min-width: 0;
            flex-wrap: wrap;
          }

          .device-brand-v2 {
            font-size: 15px;
            font-weight: 700;
            color: var(--text-primary);
            letter-spacing: 0.3px;
          }

          .device-model-v2 {
            font-size: 12px;
            font-weight: 500;
            color: var(--text-muted);
            opacity: 0.8;
          }

          .device-info-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 2px;
            flex-shrink: 0;
          }

          .header-actions-v2 {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .rank-badge-v2 {
            display: inline-flex;
            align-items: center;
            gap: 2px;
            font-size: 12px;
            font-weight: 600;
            color: var(--text-muted);
            background: var(--bg-input);
            padding: 2px 8px;
            border-radius: 12px;
            white-space: nowrap;
          }

          .rank-icon {
            color: #6c63ff;
            font-weight: 700;
          }

          .action-btn-v2 {
            background: none;
            border: none;
            font-size: 16px;
            cursor: pointer;
            padding: 2px 6px;
            border-radius: 6px;
            transition: all 0.2s ease;
            color: var(--text-muted);
            line-height: 1;
          }

          .action-btn-v2:hover:not(:disabled) {
            transform: scale(1.15);
          }

          .fav-btn:hover {
            color: #f1c40f;
          }

          .fav-btn.active {
            color: #f1c40f;
            animation: starPop 0.3s ease;
          }

          @keyframes starPop {
            0% { transform: scale(1); }
            50% { transform: scale(1.4); }
            100% { transform: scale(1); }
          }

          .status-btn:hover:not(:disabled) {
            color: #6c63ff;
          }

          .status-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .time-since-right {
            font-size: 11px;
            font-weight: 600;
            padding: 1px 10px;
            border-radius: 12px;
            white-space: nowrap;
          }

          .time-since-right.online {
            color: #2ecc71;
            background: rgba(46, 204, 113, 0.08);
          }

          .time-since-right.offline {
            color: #95a5a6;
            background: rgba(149, 165, 166, 0.08);
          }

          /* ================================================================
             DEVICE ID ROW - With Screen ON/OFF
             ================================================================ */
          .device-id-row-v2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 0 6px;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 8px;
            flex-wrap: wrap;
            gap: 6px;
          }

          .device-id-v2 {
            font-size: 11px;
            color: var(--text-muted);
            font-weight: 500;
            font-family: 'Courier New', monospace;
            word-break: break-all;
          }

          .screen-status-v2 {
            font-size: 10px;
            font-weight: 600;
            padding: 2px 10px;
            border-radius: 12px;
            white-space: nowrap;
          }

          .screen-status-v2.on {
            color: #2ecc71;
            background: rgba(46, 204, 113, 0.12);
            border: 1px solid rgba(46, 204, 113, 0.2);
          }

          .screen-status-v2.off {
            color: #95a5a6;
            background: rgba(149, 165, 166, 0.08);
            border: 1px solid rgba(149, 165, 166, 0.1);
          }

          /* ================================================================
             STATS ROW - FIXED: SIM Left | Install Date Right
             ================================================================ */
          .stats-row-v2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;
            gap: 8px;
            margin-bottom: 6px;
            padding: 4px 0;
          }

          .stat-item-left {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            color: var(--text-muted);
            flex: 1;
            min-width: 0;
          }

          .stat-icon-v2 {
            font-size: 12px;
            flex-shrink: 0;
          }

          .sim-operator-v2 {
            font-weight: 500;
            color: var(--text-primary);
            white-space: nowrap;
          }

          .sim-divider-v2 {
            opacity: 0.3;
            margin: 0 2px;
            flex-shrink: 0;
          }

          .sim-number-v2 {
            font-weight: 500;
            color: var(--text-primary);
            white-space: nowrap;
          }

          .install-date-right {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 10px;
            color: var(--text-muted);
            flex-shrink: 0;
            white-space: nowrap;
          }

          .install-date-icon-v2 {
            font-size: 11px;
            flex-shrink: 0;
          }

          .install-date-value-v2 {
            font-weight: 500;
            color: var(--text-primary);
            white-space: nowrap;
          }

          /* ================================================================
             BATTERY
             ================================================================ */
          .battery-section-premium {
            padding: 6px 0 2px;
          }

          .battery-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
          }

          .battery-info {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .battery-icon {
            font-size: 14px;
          }

          .battery-label-text {
            font-size: 11px;
            font-weight: 500;
            color: var(--text-muted);
          }

          .battery-percentage {
            font-size: 13px;
            font-weight: 700;
          }

          .battery-track-premium {
            width: 100%;
            height: 4px;
            background: var(--bg-input);
            border-radius: 4px;
            overflow: hidden;
          }

          .battery-fill-premium {
            height: 100%;
            border-radius: 4px;
            transition: width 0.5s ease;
          }

          /* ================================================================
             RESPONSIVE - All Screen Sizes
             ================================================================ */
          /* Mobile */
          @media (max-width: 480px) {
            .card-header-v2 {
              flex-direction: row;
              align-items: flex-start;
              gap: 4px;
            }

            .device-info-left {
              gap: 6px;
              min-width: 0;
            }

            .device-icon-v2 {
              font-size: 22px;
            }

            .device-brand-v2 {
              font-size: 13px;
            }

            .device-model-v2 {
              font-size: 10px;
            }

            .device-info-right {
              gap: 1px;
            }

            .header-actions-v2 {
              gap: 2px;
            }

            .rank-badge-v2 {
              font-size: 10px;
              padding: 1px 6px;
            }

            .action-btn-v2 {
              font-size: 14px;
              padding: 1px 4px;
            }

            .time-since-right {
              font-size: 10px;
              padding: 1px 8px;
            }

            .device-id-v2 {
              font-size: 10px;
            }

            .screen-status-v2 {
              font-size: 9px;
              padding: 1px 8px;
            }

            /* Stats row mobile fix */
            .stats-row-v2 {
              flex-wrap: wrap;
              gap: 4px;
            }

            .stat-item-left {
              font-size: 10px;
              flex: 1 1 auto;
              min-width: 120px;
            }

            .sim-operator-v2 {
              font-size: 10px;
            }

            .sim-number-v2 {
              font-size: 10px;
            }

            .install-date-right {
              font-size: 9px;
              flex-shrink: 0;
            }

            .install-date-value-v2 {
              font-size: 9px;
              white-space: nowrap;
            }

            .battery-percentage {
              font-size: 12px;
            }
          }

          /* Small Phones */
          @media (max-width: 360px) {
            .device-brand-v2 {
              font-size: 11px;
            }

            .device-model-v2 {
              font-size: 9px;
            }

            .device-icon-v2 {
              font-size: 18px;
            }

            .header-actions-v2 {
              gap: 1px;
            }

            .rank-badge-v2 {
              font-size: 9px;
              padding: 1px 4px;
            }

            .action-btn-v2 {
              font-size: 12px;
              padding: 1px 3px;
            }

            .time-since-right {
              font-size: 9px;
              padding: 1px 6px;
            }

            .device-id-v2 {
              font-size: 9px;
            }

            .screen-status-v2 {
              font-size: 8px;
              padding: 1px 6px;
            }

            .stat-item-left {
              font-size: 9px;
              min-width: 80px;
            }

            .sim-operator-v2 {
              font-size: 9px;
            }

            .sim-number-v2 {
              font-size: 9px;
            }

            .install-date-right {
              font-size: 8px;
            }

            .install-date-value-v2 {
              font-size: 8px;
            }
          }

          /* Tablets */
          @media (min-width: 768px) and (max-width: 1024px) {
            .device-brand-v2 {
              font-size: 16px;
            }

            .device-model-v2 {
              font-size: 13px;
            }

            .device-icon-v2 {
              font-size: 30px;
            }

            .rank-badge-v2 {
              font-size: 13px;
              padding: 3px 10px;
            }

            .action-btn-v2 {
              font-size: 18px;
            }

            .time-since-right {
              font-size: 12px;
            }

            .stat-item-left {
              font-size: 12px;
            }

            .install-date-right {
              font-size: 11px;
            }
          }

          /* Large Screens */
          @media (min-width: 1025px) {
            .device-brand-v2 {
              font-size: 18px;
            }

            .device-model-v2 {
              font-size: 14px;
            }

            .device-icon-v2 {
              font-size: 34px;
            }

            .rank-badge-v2 {
              font-size: 14px;
              padding: 3px 12px;
            }

            .action-btn-v2 {
              font-size: 20px;
            }

            .time-since-right {
              font-size: 13px;
            }

            .device-id-v2 {
              font-size: 12px;
            }

            .screen-status-v2 {
              font-size: 11px;
              padding: 2px 12px;
            }

            .stat-item-left {
              font-size: 12px;
            }

            .install-date-right {
              font-size: 11px;
            }
          }
        `}</style>
      </div>

      {/* ============================================================
          📡 STATUS DIALOG
          ============================================================ */}
      {showDialog && dialogData && (
        <div className="status-dialog-overlay" onClick={() => setShowDialog(false)}>
          <div className="status-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="dialog-close" onClick={() => setShowDialog(false)}>✕</button>
            
            <div className="dialog-header">
              <span className="dialog-device-icon">📱</span>
              <div>
                <h2>{dialogData.brand} {dialogData.model}</h2>
                <span className="dialog-serial"># {dialogData.serial}</span>
              </div>
            </div>

            {/* Status */}
            <div className="dialog-status" style={{ borderColor: dialogData.statusColor }}>
              <span className="dialog-status-icon" style={{ color: dialogData.statusColor }}>
                {dialogData.status === '🟢 ONLINE' ? '🟢' : '🔴'}
              </span>
              <span className="dialog-status-text" style={{ color: dialogData.statusColor }}>
                {dialogData.status}
              </span>
            </div>

            {/* Time Info */}
            <div className="dialog-time-info">
              <div className="dialog-time-item">
                <span className="dialog-time-label">🕐 Last Update</span>
                <span className="dialog-time-value">{dialogData.lastSeen}</span>
              </div>
              <div className="dialog-time-item">
                <span className="dialog-time-label">⏱️ Time Ago</span>
                <span className="dialog-time-value highlight">{dialogData.timeAgo}</span>
              </div>
            </div>

            {/* ✅ AI PREDICTION */}
            <div className="dialog-prediction" style={{ borderColor: dialogData.predictionColor }}>
              <span className="dialog-prediction-icon">🤖</span>
              <div>
                <span className="dialog-prediction-label">AI Prediction</span>
                <span className="dialog-prediction-text" style={{ color: dialogData.predictionColor }}>
                  {dialogData.prediction}
                </span>
              </div>
            </div>

            {/* Device Details */}
            <div className="dialog-details-grid">
              <div className="dialog-detail-item">
                <span className="dialog-detail-label">🔋 Battery</span>
                <span className="dialog-detail-value">{dialogData.battery}</span>
              </div>
              <div className="dialog-detail-item">
                <span className="dialog-detail-label">📶 IP</span>
                <span className="dialog-detail-value">{dialogData.ip}</span>
              </div>
              <div className="dialog-detail-item">
                <span className="dialog-detail-label">📞 SIM</span>
                <span className="dialog-detail-value">{dialogData.sim.substring(0, 20)}...</span>
              </div>
              <div className="dialog-detail-item">
                <span className="dialog-detail-label">🤖 Android</span>
                <span className="dialog-detail-value">v{dialogData.androidVersion}</span>
              </div>
              <div className="dialog-detail-item full">
                <span className="dialog-detail-label">📱 Screen</span>
                <span className="dialog-detail-value">{dialogData.screen}</span>
              </div>
            </div>

            <button className="dialog-goto-btn" onClick={() => {
              setShowDialog(false);
              navigate(`/device/${device.device_id || device.id}`);
            }}>
              📖 View Full Details
            </button>
          </div>
        </div>
      )}

      <style>{`
        /* ================================================================
           STATUS DIALOG
           ================================================================ */
        .status-dialog-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .status-dialog {
          background: var(--bg-card);
          border-radius: 16px;
          padding: 24px;
          max-width: 440px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          position: relative;
        }

        .dialog-close {
          position: absolute;
          top: 12px;
          right: 16px;
          background: none;
          border: none;
          font-size: 20px;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .dialog-close:hover {
          background: var(--bg-input);
          color: var(--text-primary);
        }

        .dialog-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
        }

        .dialog-device-icon {
          font-size: 32px;
        }

        .dialog-header h2 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .dialog-serial {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .dialog-status {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 10px;
          border: 2px solid;
          margin-bottom: 16px;
          background: var(--bg-input);
        }

        .dialog-status-icon {
          font-size: 24px;
        }

        .dialog-status-text {
          font-size: 18px;
          font-weight: 700;
        }

        .dialog-time-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 16px;
        }

        .dialog-time-item {
          background: var(--bg-input);
          border-radius: 8px;
          padding: 8px 12px;
        }

        .dialog-time-label {
          display: block;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .dialog-time-value {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .dialog-time-value.highlight {
          color: #6c63ff;
        }

        .dialog-prediction {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 10px;
          border: 2px solid;
          margin-bottom: 16px;
          background: var(--bg-input);
        }

        .dialog-prediction-icon {
          font-size: 20px;
          margin-top: 2px;
        }

        .dialog-prediction-label {
          display: block;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .dialog-prediction-text {
          display: block;
          font-size: 13px;
          font-weight: 500;
          margin-top: 2px;
          line-height: 1.4;
        }

        .dialog-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 16px;
        }

        .dialog-detail-item {
          background: var(--bg-input);
          border-radius: 6px;
          padding: 6px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dialog-detail-item.full {
          grid-column: span 2;
        }

        .dialog-detail-label {
          font-size: 11px;
          color: var(--text-muted);
        }

        .dialog-detail-value {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .dialog-goto-btn {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #6c63ff, #3b82f6);
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .dialog-goto-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(108, 99, 255, 0.3);
        }

        @media (max-width: 480px) {
          .status-dialog {
            padding: 16px;
          }
          .dialog-time-info {
            grid-template-columns: 1fr;
          }
          .dialog-details-grid {
            grid-template-columns: 1fr;
          }
          .dialog-detail-item.full {
            grid-column: span 1;
          }
        }
      `}</style>
    </>
  );
}

export default memo(DeviceCard);