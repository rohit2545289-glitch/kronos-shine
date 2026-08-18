import React, { useState, useEffect } from 'react';
import { ref, get, update, remove } from 'firebase/database';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

function AdminManagement() {
  const { user, userData } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const adminsArray = Object.keys(data)
          .filter(key => data[key].role === 'admin')
          .map(key => ({
            uid: key,
            ...data[key]
          }));
        setAdmins(adminsArray);
      } else {
        setAdmins([]);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Force logout admin from all devices
  const handleForceLogout = async (uid) => {
    if (uid === user?.uid) {
      alert('❌ You cannot logout yourself!');
      return;
    }

    if (!window.confirm(`⚠️ Are you sure you want to force logout this admin from ALL devices?`)) {
      return;
    }

    setActionLoading(prev => ({ ...prev, [uid]: true }));
    try {
      const devicesRef = ref(db, `users/${uid}/devices`);
      const snapshot = await get(devicesRef);
      
      if (snapshot.exists()) {
        const devices = snapshot.val();
        for (let deviceId in devices) {
          const deviceRef = ref(db, `devices/${deviceId}`);
          await remove(deviceRef);
        }
        await remove(devicesRef);
      }

      const sessionRef = ref(db, `sessions/${uid}`);
      await remove(sessionRef);

      alert(`✅ Admin logged out from all devices successfully!`);
      await fetchAdmins();
    } catch (err) {
      alert('❌ Failed to force logout: ' + err.message);
    }
    setActionLoading(prev => ({ ...prev, [uid]: false }));
  };

  // Demote admin to user
  const handleDemoteAdmin = async (uid) => {
    if (uid === user?.uid) {
      alert('❌ You cannot demote yourself!');
      return;
    }

    if (!window.confirm(`⚠️ Are you sure you want to demote this admin to user?`)) {
      return;
    }

    setActionLoading(prev => ({ ...prev, [uid]: true }));
    try {
      const userRef = ref(db, `users/${uid}`);
      await update(userRef, { role: 'user' });
      alert('✅ Admin demoted to user successfully!');
      await fetchAdmins();
    } catch (err) {
      alert('❌ Failed to demote admin: ' + err.message);
    }
    setActionLoading(prev => ({ ...prev, [uid]: false }));
  };

  // Delete admin
  const handleDeleteAdmin = async (uid) => {
    if (uid === user?.uid) {
      alert('❌ You cannot delete yourself!');
      return;
    }

    if (!window.confirm(`⚠️ Are you sure you want to permanently delete this admin?`)) {
      return;
    }

    setActionLoading(prev => ({ ...prev, [uid]: true }));
    try {
      const userRef = ref(db, `users/${uid}`);
      await remove(userRef);
      alert('✅ Admin deleted successfully!');
      await fetchAdmins();
    } catch (err) {
      alert('❌ Failed to delete admin: ' + err.message);
    }
    setActionLoading(prev => ({ ...prev, [uid]: false }));
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>📡 Loading admins...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <span className="error-icon">❌</span>
        <h3>Error loading admins</h3>
        <p>{error}</p>
        <button onClick={fetchAdmins}>🔄 Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-management">
      <div className="admin-header">
        <h2>🔑 Admin Management</h2>
        <p>Total Admins: <strong>{admins.length}</strong></p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-icon">🔑</span>
          <div>
            <h3>{admins.length}</h3>
            <p>Total Admins</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👤</span>
          <div>
            <h3>{admins.filter(a => a.active !== false).length}</h3>
            <p>Active Admins</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📱</span>
          <div>
            <h3>{admins.reduce((acc, a) => acc + (a.devices ? Object.keys(a.devices).length : 0), 0)}</h3>
            <p>Total Devices</p>
          </div>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Admin</th>
              <th>Email</th>
              <th>Status</th>
              <th>Devices</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">📭 No admins found</td>
              </tr>
            ) : (
              admins.map((admin, index) => (
                <tr key={admin.uid}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="admin-cell">
                      <span className="admin-avatar">{admin.name?.[0] || admin.email?.[0] || 'A'}</span>
                      <div>
                        <div className="admin-name">
                          {admin.name || 'Unknown'}
                          {admin.uid === user?.uid && (
                            <span className="you-badge"> (You)</span>
                          )}
                        </div>
                        <div className="admin-uid">{admin.uid?.slice(0, 12)}...</div>
                      </div>
                    </div>
                  </td>
                  <td>{admin.email || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${admin.active !== false ? 'active' : 'inactive'}`}>
                      {admin.active !== false ? '🟢 Active' : '🔴 Inactive'}
                    </span>
                  </td>
                  <td>
                    <span className="device-count">
                      {admin.devices ? Object.keys(admin.devices).length : 0}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {admin.uid !== user?.uid && (
                        <>
                          <button
                            onClick={() => handleForceLogout(admin.uid)}
                            disabled={actionLoading[admin.uid]}
                            className="action-btn logout"
                            title="Force logout from all devices"
                          >
                            🚪
                          </button>
                          <button
                            onClick={() => handleDemoteAdmin(admin.uid)}
                            disabled={actionLoading[admin.uid]}
                            className="action-btn demote"
                            title="Demote to user"
                          >
                            ⬇️
                          </button>
                          <button
                            onClick={() => handleDeleteAdmin(admin.uid)}
                            disabled={actionLoading[admin.uid]}
                            className="action-btn delete"
                            title="Delete admin"
                          >
                            🗑️
                          </button>
                        </>
                      )}
                      {admin.uid === user?.uid && (
                        <span className="self-action-hint">👤 You</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .admin-management {
          padding: 16px;
          background: var(--bg-primary);
          border-radius: 12px;
          max-width: 100%;
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
          grid-template-columns: repeat(3, 1fr);
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

        .admin-table-container {
          background: var(--bg-card);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .admin-table th {
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

        .admin-table td {
          padding: 8px 14px;
          font-size: 12px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .admin-table tr:last-child td {
          border-bottom: none;
        }

        .admin-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
        }

        .admin-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 13px;
        }

        .admin-name .you-badge {
          color: var(--accent-cyan);
          font-weight: 700;
          font-size: 11px;
        }

        .admin-uid {
          font-size: 9px;
          color: var(--text-muted);
          font-family: 'Courier New', monospace;
        }

        .status-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 12px;
        }

        .status-badge.active {
          color: #2ecc71;
          background: rgba(46, 204, 113, 0.08);
          border: 1px solid rgba(46, 204, 113, 0.15);
        }

        .status-badge.inactive {
          color: #e74c3c;
          background: rgba(231, 76, 60, 0.06);
          border: 1px solid rgba(231, 76, 60, 0.1);
        }

        .device-count {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
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

        .action-btn.demote:hover:not(:disabled) {
          border-color: #8b5cf6;
          background: rgba(139, 92, 246, 0.05);
        }

        .action-btn.delete:hover:not(:disabled) {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        .action-btn:active:not(:disabled) {
          transform: scale(0.9);
        }

        .self-action-hint {
          font-size: 12px;
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

          .admin-table-container {
            overflow-x: auto;
          }

          .admin-table {
            font-size: 11px;
            min-width: 500px;
          }

          .admin-table th,
          .admin-table td {
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

export default AdminManagement;