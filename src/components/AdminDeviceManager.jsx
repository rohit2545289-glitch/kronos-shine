import React, { useState, useEffect } from 'react';
import { ref, get, remove, update } from 'firebase/database';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

function AdminDeviceManager() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [selectedUser, setSelectedUser] = useState('all');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all users
      const usersRef = ref(db, 'users');
      const usersSnap = await get(usersRef);
      const usersData = usersSnap.exists() ? usersSnap.val() : {};
      
      const usersArray = Object.keys(usersData).map(key => ({
        uid: key,
        ...usersData[key]
      }));
      setUsers(usersArray);

      // Fetch all devices
      const devicesRef = ref(db, 'devices');
      const devicesSnap = await get(devicesRef);
      const devicesData = devicesSnap.exists() ? devicesSnap.val() : {};
      
      const devicesArray = Object.keys(devicesData).map(key => ({
        deviceId: key,
        ...devicesData[key]
      }));
      setDevices(devicesArray);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Get user by deviceId
  const getUserForDevice = (deviceId) => {
    return users.find(u => u.uid === deviceId);
  };

  // Force logout device
  const handleForceLogout = async (deviceId, userId) => {
    if (userId === user?.uid) {
      alert('❌ You cannot logout your own device!');
      return;
    }

    if (!window.confirm(`⚠️ Are you sure you want to force logout this device?`)) {
      return;
    }

    setActionLoading(prev => ({ ...prev, [deviceId]: true }));
    try {
      // Remove device from user's devices list
      const userDeviceRef = ref(db, `users/${userId}/devices/${deviceId}`);
      await remove(userDeviceRef);
      
      // Also remove device from devices node
      const deviceRef = ref(db, `devices/${deviceId}`);
      await remove(deviceRef);

      // Update user's active status if no devices left
      const userDevicesRef = ref(db, `users/${userId}/devices`);
      const userDevicesSnap = await get(userDevicesRef);
      if (!userDevicesSnap.exists()) {
        await update(ref(db, `users/${userId}`), { active: false });
      }

      alert('✅ Device logged out successfully!');
      await fetchData();
    } catch (err) {
      alert('❌ Failed to logout device: ' + err.message);
    }
    setActionLoading(prev => ({ ...prev, [deviceId]: false }));
  };

  // Force logout all devices of a user
  const handleLogoutAllDevices = async (userId) => {
    if (userId === user?.uid) {
      alert('❌ You cannot logout your own devices!');
      return;
    }

    if (!window.confirm(`⚠️ Are you sure you want to logout ALL devices of this user?`)) {
      return;
    }

    setActionLoading(prev => ({ ...prev, ['all_' + userId]: true }));
    try {
      const userDevicesRef = ref(db, `users/${userId}/devices`);
      const snapshot = await get(userDevicesRef);
      
      if (snapshot.exists()) {
        const userDevices = snapshot.val();
        for (let deviceId in userDevices) {
          const deviceRef = ref(db, `devices/${deviceId}`);
          await remove(deviceRef);
        }
        await remove(userDevicesRef);
      }

      // Mark user as inactive
      await update(ref(db, `users/${userId}`), { active: false });

      alert('✅ All devices logged out successfully!');
      await fetchData();
    } catch (err) {
      alert('❌ Failed to logout all devices: ' + err.message);
    }
    setActionLoading(prev => ({ ...prev, ['all_' + userId]: false }));
  };

  const getFilteredDevices = () => {
    let filtered = devices;

    // Filter by user
    if (selectedUser !== 'all') {
      filtered = filtered.filter(d => d.userId === selectedUser);
    }

    // Filter by status
    if (filter === 'online') {
      filtered = filtered.filter(d => d.status === 'online');
    } else if (filter === 'offline') {
      filtered = filtered.filter(d => d.status === 'offline');
    }

    return filtered;
  };

  const filteredDevices = getFilteredDevices();
  const onlineCount = devices.filter(d => d.status === 'online').length;
  const offlineCount = devices.filter(d => d.status === 'offline').length;

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>📡 Loading devices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <span className="error-icon">❌</span>
        <h3>Error loading data</h3>
        <p>{error}</p>
        <button onClick={fetchData}>🔄 Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-device-manager">
      <div className="admin-header">
        <h2>📱 Device Manager</h2>
        <p>Total Devices: <strong>{devices.length}</strong></p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-icon">📱</span>
          <div>
            <h3>{devices.length}</h3>
            <p>Total Devices</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🟢</span>
          <div>
            <h3>{onlineCount}</h3>
            <p>Online</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔴</span>
          <div>
            <h3>{offlineCount}</h3>
            <p>Offline</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👤</span>
          <div>
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-section">
        <div className="filter-group">
          <label>User:</label>
          <select 
            value={selectedUser} 
            onChange={(e) => setSelectedUser(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Users</option>
            {users.map(u => (
              <option key={u.uid} value={u.uid}>
                {u.name || u.userId || u.uid}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'online' ? 'active' : ''}`}
              onClick={() => setFilter('online')}
            >
              🟢 Online
            </button>
            <button 
              className={`filter-btn ${filter === 'offline' ? 'active' : ''}`}
              onClick={() => setFilter('offline')}
            >
              🔴 Offline
            </button>
          </div>
        </div>
      </div>

      <div className="device-table-container">
        <table className="device-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Device</th>
              <th>User</th>
              <th>Status</th>
              <th>Battery</th>
              <th>Last Seen</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-row">📭 No devices found</td>
              </tr>
            ) : (
              filteredDevices.map((device, index) => {
                const userData = getUserForDevice(device.userId);
                const isOwnDevice = device.userId === user?.uid;
                
                return (
                  <tr key={device.deviceId}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="device-cell">
                        <span className="device-icon">📱</span>
                        <div>
                          <div className="device-name">
                            {device.brand || 'Unknown'} {device.model || ''}
                            {isOwnDevice && <span className="own-badge"> (You)</span>}
                          </div>
                          <div className="device-id-small">{device.deviceId?.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {userData ? (
                        <div className="user-cell">
                          <span className="user-avatar">{userData.name?.[0] || userData.userId?.[0] || 'U'}</span>
                          <span className="user-name">{userData.name || userData.userId || 'Unknown'}</span>
                        </div>
                      ) : (
                        <span className="no-user">No user</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${device.status === 'online' ? 'online' : 'offline'}`}>
                        {device.status === 'online' ? '🟢 Online' : '🔴 Offline'}
                      </span>
                    </td>
                    <td>
                      <div className="battery-cell">
                        <span className={`battery-icon ${parseInt(device.battery) < 20 ? 'low' : ''}`}>
                          🔋
                        </span>
                        <span className="battery-value">{device.battery || 'N/A'}</span>
                      </div>
                    </td>
                    <td>
                      <span className="last-seen">
                        {device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'N/A'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {!isOwnDevice && device.userId && (
                          <button
                            onClick={() => handleForceLogout(device.deviceId, device.userId)}
                            disabled={actionLoading[device.deviceId]}
                            className="action-btn logout"
                            title="Force logout this device"
                          >
                            🚪
                          </button>
                        )}
                        {!isOwnDevice && device.userId && (
                          <button
                            onClick={() => handleLogoutAllDevices(device.userId)}
                            disabled={actionLoading['all_' + device.userId]}
                            className="action-btn logout-all"
                            title="Logout all devices of this user"
                          >
                            🔥
                          </button>
                        )}
                        {isOwnDevice && (
                          <span className="self-hint">👤 You</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .admin-device-manager {
          padding: 16px;
          background: var(--bg-primary);
          border-radius: 12px;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .admin-header h2 {
          margin: 0;
          color: var(--text-primary);
          font-size: 18px;
        }

        .admin-header p {
          margin: 0;
          color: var(--text-muted);
          font-size: 13px;
        }

        .admin-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .stat-card {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow);
        }

        .stat-card .stat-icon {
          font-size: 28px;
        }

        .stat-card h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-card p {
          margin: 0;
          font-size: 11px;
          color: var(--text-muted);
        }

        .filter-section {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          flex-wrap: wrap;
          align-items: center;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-group label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .filter-select {
          padding: 6px 12px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 12px;
          outline: none;
        }

        .filter-buttons {
          display: flex;
          gap: 4px;
        }

        .filter-btn {
          padding: 4px 12px;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          background: var(--bg-card);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn.active {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: rgba(108, 99, 255, 0.05);
        }

        .device-table-container {
          background: var(--bg-card);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          overflow-x: auto;
        }

        .device-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }

        .device-table th {
          text-align: left;
          padding: 10px 14px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          border-bottom: 2px solid var(--border-color);
          background: var(--bg-primary);
          font-weight: 600;
        }

        .device-table td {
          padding: 8px 14px;
          font-size: 12px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .device-table tr:last-child td {
          border-bottom: none;
        }

        .device-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .device-icon {
          font-size: 20px;
        }

        .device-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 12px;
        }

        .device-name .own-badge {
          color: var(--accent-cyan);
          font-weight: 700;
          font-size: 10px;
        }

        .device-id-small {
          font-size: 9px;
          color: var(--text-muted);
          font-family: 'Courier New', monospace;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6c63ff, #3b82f6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
        }

        .user-name {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .no-user {
          color: var(--text-muted);
          font-size: 11px;
        }

        .status-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 12px;
        }

        .status-badge.online {
          color: #2ecc71;
          background: rgba(46, 204, 113, 0.08);
          border: 1px solid rgba(46, 204, 113, 0.15);
        }

        .status-badge.offline {
          color: #e74c3c;
          background: rgba(231, 76, 60, 0.06);
          border: 1px solid rgba(231, 76, 60, 0.1);
        }

        .battery-cell {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .battery-value {
          font-weight: 600;
          font-size: 12px;
          color: var(--text-primary);
        }

        .battery-icon.low {
          color: #e74c3c;
        }

        .last-seen {
          font-size: 10px;
          color: var(--text-muted);
        }

        .action-buttons {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .action-btn {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .action-btn.logout:hover:not(:disabled) {
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.05);
        }

        .action-btn.logout-all:hover:not(:disabled) {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        .action-btn:active:not(:disabled) {
          transform: scale(0.9);
        }

        .self-hint {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          padding: 4px 8px;
          background: var(--bg-input);
          border-radius: 4px;
        }

        .empty-row {
          text-align: center;
          padding: 30px;
          color: var(--text-muted);
        }

        .admin-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          gap: 12px;
          color: var(--text-muted);
        }

        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid var(--border-color);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .admin-error {
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }

        .admin-error .error-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }

        .admin-error button {
          margin-top: 12px;
          padding: 8px 20px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-card);
          color: var(--text-primary);
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .admin-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .filter-section {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            flex-wrap: wrap;
          }

          .device-table-container {
            overflow-x: auto;
          }

          .device-table {
            font-size: 11px;
            min-width: 600px;
          }

          .device-table th,
          .device-table td {
            padding: 6px 10px;
          }

          .action-btn {
            width: 26px;
            height: 26px;
            font-size: 11px;
          }
        }

        @media (max-width: 374px) {
          .admin-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminDeviceManager;