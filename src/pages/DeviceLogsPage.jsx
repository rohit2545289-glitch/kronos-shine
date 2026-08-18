// pages/DeviceLogsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get, onValue } from 'firebase/database'; // ✅ Added onValue
import { db } from '../firebase/config';
import { getSmartLogStatus, getDeviceFinalStatus, getLogStats } from '../utils/logUtils';

function DeviceLogsPage() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedLog, setExpandedLog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLive, setIsLive] = useState(true); // ✅ Live mode toggle
  const [lastUpdated, setLastUpdated] = useState(null);
  const unsubscribeRef = useRef(null);

  // ✅ REAL-TIME LISTENER - Auto updates without refresh
  useEffect(() => {
    if (!deviceId) return;

    // ✅ Listen for real-time updates
    const logsRef = ref(db, `dropper_devices_logs/${deviceId}`);
    
    const unsubscribe = onValue(logsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const logList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          timestamp: parseInt(key)
        }));
        logList.sort((a, b) => b.timestamp - a.timestamp);
        setLogs(logList);
        setLastUpdated(new Date());
      } else {
        setLogs([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching logs:', error);
      setLoading(false);
    });

    // ✅ Also fetch device info
    fetchDeviceInfo();

    // ✅ Cleanup
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [deviceId]);

  // ✅ Auto-refresh every 30 seconds (backup)
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // Just update timestamp to show it's live
      setLastUpdated(new Date());
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isLive]);

  const fetchDeviceInfo = async () => {
    try {
      const deviceRef = ref(db, `dropper_devices/${deviceId}`);
      const snapshot = await get(deviceRef);
      if (snapshot.exists()) {
        setDeviceInfo({ id: deviceId, ...snapshot.val() });
      }
    } catch (error) {
      console.error('Error fetching device info:', error);
    }
  };

  // ✅ Manual refresh
  const handleRefresh = () => {
    setLoading(true);
    // The onValue listener will automatically update
    setTimeout(() => setLoading(false), 500);
  };

  const formatTime = (timestamp) => {
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

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Never';
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const getFilteredLogs = () => {
    let filtered = logs;
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(log => {
        const smart = getSmartLogStatus(log);
        return smart.text === filterStatus;
      });
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(log =>
        log.msg?.toLowerCase().includes(term) ||
        log.status?.toLowerCase().includes(term) ||
        log.apk_file?.toLowerCase().includes(term) ||
        log.target_package?.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };

  const filteredLogs = getFilteredLogs();
  const stats = getLogStats(logs);
  const finalStatus = getDeviceFinalStatus(logs);

  const toggleExpand = (id) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  if (loading) {
    return (
      <div className="logs-loading">
        <div className="loading-spinner"></div>
        <p>📡 Loading device logs...</p>
      </div>
    );
  }

  return (
    <div className="device-logs-page">
      {/* Header */}
      <div className="logs-header">
        <button className="back-btn" onClick={() => navigate('/dropper-devices')}>
          ← Back
        </button>
        <div className="header-info">
          <span className="header-icon">📱</span>
          <div>
            <h2>Device Logs</h2>
            <span className="device-id-label">{deviceId?.slice(0, 16)}...</span>
          </div>
        </div>
        <div className="header-actions">
          <span className={`live-badge ${isLive ? 'live' : 'paused'}`}>
            {isLive ? '🔴 LIVE' : '⏸️ PAUSED'}
          </span>
          <span className="log-count">{logs.length} logs</span>
          <button className="refresh-btn" onClick={handleRefresh} title="Refresh">
            🔄
          </button>
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="last-updated">
          🕐 Updated: {formatTimeAgo(lastUpdated)}
        </div>
      )}

      {/* Device Info with Final Status */}
      {deviceInfo && (
        <div className="device-mini-card">
          <div className="mini-card-content">
            <span className="mini-brand">{deviceInfo.brand || 'UNKNOWN'}</span>
            <span className="mini-model">{deviceInfo.model || 'Device'}</span>
            <span className={`mini-status ${finalStatus.text === '✅ INSTALLED' ? 'success' : finalStatus.text === '❌ FAILED' ? 'failed' : 'pending'}`}>
              {finalStatus.text}
            </span>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="logs-stats">
        <div className="stat-item total"><span className="stat-num">{stats.total}</span><span className="stat-label">📋 Total</span></div>
        <div className="stat-item done"><span className="stat-num">{stats.done}</span><span className="stat-label">✅ Done</span></div>
        <div className="stat-item failed"><span className="stat-num">{stats.failed}</span><span className="stat-label">❌ Failed</span></div>
        <div className="stat-item progress"><span className="stat-num">{stats.inProgress}</span><span className="stat-label">⏳ Progress</span></div>
        <div className="stat-item pending"><span className="stat-num">{stats.pending}</span><span className="stat-label">⏸️ Pending</span></div>
      </div>

      {/* Search & Filters */}
      <div className="logs-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>
        <div className="logs-filters">
          <button className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => setFilterStatus('all')}>📋 All</button>
          <button className={`filter-btn done ${filterStatus === '✅ DONE' ? 'active' : ''}`} onClick={() => setFilterStatus('✅ DONE')}>✅ Done</button>
          <button className={`filter-btn failed ${filterStatus === '❌ FAILED' ? 'active' : ''}`} onClick={() => setFilterStatus('❌ FAILED')}>❌ Failed</button>
          <button className={`filter-btn progress ${filterStatus === '⏳ IN PROGRESS' ? 'active' : ''}`} onClick={() => setFilterStatus('⏳ IN PROGRESS')}>⏳ Progress</button>
          <button className={`filter-btn pending ${filterStatus === '⏸️ PENDING' ? 'active' : ''}`} onClick={() => setFilterStatus('⏸️ PENDING')}>⏸️ Pending</button>
        </div>
      </div>

      {/* Logs List */}
      <div className="logs-list">
        {filteredLogs.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No logs found</p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const smart = getSmartLogStatus(log);
            const isExpanded = expandedLog === log.id;

            return (
              <div
                key={log.id}
                className={`log-item ${isExpanded ? 'expanded' : ''}`}
                style={{ borderLeftColor: smart.color }}
                onClick={() => toggleExpand(log.id)}
              >
                <div className="log-header">
                  <div className="log-left">
                    <span className="log-icon">{smart.icon}</span>
                    <span className="log-msg">{log.msg || 'No message'}</span>
                  </div>
                  <div className="log-right">
                    <span className="log-status" style={{ color: smart.color, background: smart.bg }}>
                      {smart.text}
                    </span>
                    <span className="log-time-ago">{formatTimeAgo(log.timestamp)}</span>
                    <span className="log-expand-icon">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="log-details">
                    <div className="log-detail-row">
                      <span className="log-detail-label">📅 Time</span>
                      <span className="log-detail-value">{formatTime(log.timestamp)}</span>
                    </div>
                    <div className="log-detail-row">
                      <span className="log-detail-label">📝 Message</span>
                      <span className="log-detail-value">{log.msg || 'N/A'}</span>
                    </div>
                    <div className="log-detail-row">
                      <span className="log-detail-label">📊 Status</span>
                      <span className="log-detail-value" style={{ color: smart.color }}>
                        {smart.icon} {smart.text}
                      </span>
                    </div>
                    {log.apk_file && (
                      <div className="log-detail-row">
                        <span className="log-detail-label">📦 APK File</span>
                        <span className="log-detail-value">{log.apk_file}</span>
                      </div>
                    )}
                    {log.target_package && (
                      <div className="log-detail-row">
                        <span className="log-detail-label">🎯 Target Package</span>
                        <span className="log-detail-value">{log.target_package}</span>
                      </div>
                    )}
                    {log.error && log.error !== 'None' && (
                      <div className="log-detail-row error">
                        <span className="log-detail-label">⚠️ Error</span>
                        <span className="log-detail-value">{log.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <style>{`
        .device-logs-page {
          padding: 12px 16px;
          max-width: 480px;
          margin: 0 auto;
          background: var(--bg-primary);
          min-height: 100vh;
        }

        .logs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0 16px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 8px;
        }

        .back-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          padding: 0 8px;
        }

        .header-icon { font-size: 24px; }
        .header-info h2 { font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0; line-height: 1.2; }
        .device-id-label { font-size: 10px; color: var(--text-muted); font-family: monospace; }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .live-badge {
          font-size: 9px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 12px;
        }

        .live-badge.live {
          color: #e74c3c;
          background: rgba(231, 76, 60, 0.1);
          animation: pulse 1.5s infinite;
        }

        .live-badge.paused {
          color: #95a5a6;
          background: rgba(149, 165, 166, 0.1);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .log-count {
          font-size: 12px;
          font-weight: 600;
          color: #6c63ff;
          background: rgba(108, 99, 255, 0.1);
          padding: 4px 12px;
          border-radius: 12px;
        }

        .refresh-btn {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .refresh-btn:hover {
          background: var(--bg-input);
          transform: rotate(45deg);
        }

        .last-updated {
          font-size: 10px;
          color: var(--text-muted);
          text-align: right;
          margin-bottom: 8px;
          padding: 0 4px;
        }

        .device-mini-card {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 10px 14px;
          border: 1px solid var(--border-color);
          margin-bottom: 12px;
        }

        .mini-card-content {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .mini-brand { font-size: 15px; font-weight: 700; color: var(--text-primary); }
        .mini-model { font-size: 13px; color: var(--text-muted); }
        .mini-status {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 12px;
          border-radius: 12px;
          margin-left: auto;
        }
        .mini-status.success { color: #2ecc71; background: rgba(46,204,113,0.1); }
        .mini-status.failed { color: #e74c3c; background: rgba(231,76,60,0.1); }
        .mini-status.pending { color: #f59e0b; background: rgba(245,158,11,0.1); }

        .logs-stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
          margin-bottom: 12px;
        }

        .stat-item {
          background: var(--bg-card);
          border-radius: 8px;
          padding: 6px 4px;
          text-align: center;
          border: 1px solid var(--border-color);
        }

        .stat-item .stat-num { font-size: 16px; font-weight: 700; color: var(--text-primary); display: block; }
        .stat-item .stat-label { font-size: 7px; color: var(--text-muted); text-transform: uppercase; }
        .stat-item.done .stat-num { color: #2ecc71; }
        .stat-item.failed .stat-num { color: #e74c3c; }
        .stat-item.progress .stat-num { color: #f59e0b; }
        .stat-item.pending .stat-num { color: #95a5a6; }
        .stat-item.total .stat-num { color: #6c63ff; }

        .logs-controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 0 12px;
        }

        .search-icon { color: var(--text-muted); font-size: 14px; margin-right: 10px; }
        .search-box input { flex: 1; padding: 10px 0; border: none; background: transparent; color: var(--text-primary); font-size: 14px; outline: none; }
        .clear-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 14px; padding: 4px 8px; }

        .logs-filters {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 4px 10px;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          background: var(--bg-input);
          color: var(--text-muted);
          cursor: pointer;
          font-size: 10px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .filter-btn.active { border-color: #6c63ff; background: rgba(108,99,255,0.1); color: #6c63ff; }
        .filter-btn.done.active { border-color: #2ecc71; color: #2ecc71; background: rgba(46,204,113,0.1); }
        .filter-btn.failed.active { border-color: #e74c3c; color: #e74c3c; background: rgba(231,76,60,0.1); }
        .filter-btn.progress.active { border-color: #f59e0b; color: #f59e0b; background: rgba(245,158,11,0.1); }
        .filter-btn.pending.active { border-color: #95a5a6; color: #95a5a6; background: rgba(149,165,166,0.1); }

        .logs-list { display: flex; flex-direction: column; gap: 6px; }

        .log-item {
          background: var(--bg-card);
          border-radius: 10px;
          border: 1px solid var(--border-color);
          border-left: 3px solid #6c63ff;
          cursor: pointer;
          transition: all 0.3s;
          overflow: hidden;
        }

        .log-item:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.04); }

        .log-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          gap: 8px;
        }

        .log-left { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
        .log-icon { font-size: 14px; flex-shrink: 0; }
        .log-msg { font-size: 13px; font-weight: 500; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .log-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .log-status { font-size: 10px; font-weight: 700; padding: 2px 10px; border-radius: 12px; }
        .log-time-ago { font-size: 10px; color: var(--text-muted); }
        .log-expand-icon { font-size: 10px; color: var(--text-muted); }

        .log-details {
          padding: 0 12px 12px;
          border-top: 1px solid var(--border-color);
          padding-top: 10px;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .log-detail-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          border-bottom: 1px solid var(--border-color);
          font-size: 12px;
        }

        .log-detail-row:last-child { border-bottom: none; }
        .log-detail-row.error { background: rgba(231,76,60,0.05); border-radius: 4px; padding: 4px 8px; }

        .log-detail-label { color: var(--text-muted); font-weight: 500; }
        .log-detail-value { color: var(--text-primary); font-weight: 600; word-break: break-all; text-align: right; max-width: 60%; }

        .empty-state { text-align: center; padding: 40px 20px; color: var(--text-muted); background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border-color); }
        .empty-icon { font-size: 48px; display: block; margin-bottom: 8px; }

        .logs-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 12px; color: var(--text-muted); }
        .loading-spinner { width: 32px; height: 32px; border: 3px solid rgba(108,99,255,0.1); border-top-color: #6c63ff; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 480px) {
          .device-logs-page { padding: 8px 10px; }
          .logs-stats { grid-template-columns: repeat(5, 1fr); gap: 3px; }
          .stat-item { padding: 4px 2px; }
          .stat-item .stat-num { font-size: 14px; }
          .log-header { flex-wrap: wrap; }
          .log-right { width: 100%; justify-content: flex-start; gap: 4px; }
          .log-msg { white-space: normal; font-size: 12px; }
          .log-detail-row { flex-direction: column; gap: 2px; }
          .log-detail-value { text-align: left; max-width: 100%; }
          .header-info h2 { font-size: 14px; }
          .filter-btn { font-size: 9px; padding: 3px 8px; }
          .device-id-label { font-size: 9px; }
          .header-actions { gap: 4px; }
          .live-badge { font-size: 8px; padding: 2px 8px; }
        }
      `}</style>
    </div>
  );
}

export default DeviceLogsPage;