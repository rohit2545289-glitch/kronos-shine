import React, { useState, useEffect } from 'react';
import { ref, get, update, remove } from 'firebase/database';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  // ✅ Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersArray = Object.keys(data).map(key => ({
          uid: key,
          ...data[key]
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // ✅ Update user role
  const handleRoleChange = async (uid, newRole) => {
    setActionLoading(prev => ({ ...prev, [uid]: true }));
    try {
      const userRef = ref(db, `users/${uid}`);
      await update(userRef, { role: newRole });
      await fetchUsers();
    } catch (err) {
      alert('❌ Failed to update role: ' + err.message);
    }
    setActionLoading(prev => ({ ...prev, [uid]: false }));
  };

  // ✅ Delete user
  const handleDeleteUser = async (uid) => {
    if (uid === user?.uid) {
      alert('❌ You cannot delete yourself!');
      return;
    }
    
    if (window.confirm('⚠️ Are you sure you want to delete this user?')) {
      setActionLoading(prev => ({ ...prev, [uid]: true }));
      try {
        const userRef = ref(db, `users/${uid}`);
        await remove(userRef);
        await fetchUsers();
      } catch (err) {
        alert('❌ Failed to delete user: ' + err.message);
      }
      setActionLoading(prev => ({ ...prev, [uid]: false }));
    }
  };

  // ✅ Toggle user active status
  const handleToggleActive = async (uid, currentStatus) => {
    setActionLoading(prev => ({ ...prev, [uid]: true }));
    try {
      const userRef = ref(db, `users/${uid}`);
      await update(userRef, { active: !currentStatus });
      await fetchUsers();
    } catch (err) {
      alert('❌ Failed to update status: ' + err.message);
    }
    setActionLoading(prev => ({ ...prev, [uid]: false }));
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>📡 Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <span className="error-icon">❌</span>
        <h3>Error loading users</h3>
        <p>{error}</p>
        <button onClick={fetchUsers}>🔄 Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-users">
      <div className="admin-header">
        <h2>👥 User Management</h2>
        <p>Total Users: <strong>{users.length}</strong></p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-icon">👤</span>
          <div>
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔑</span>
          <div>
            <h3>{users.filter(u => u.role === 'admin').length}</h3>
            <p>Admins</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🟢</span>
          <div>
            <h3>{users.filter(u => u.active).length}</h3>
            <p>Active</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔴</span>
          <div>
            <h3>{users.filter(u => !u.active).length}</h3>
            <p>Inactive</p>
          </div>
        </div>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">📭 No users found</td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr key={u.uid}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="user-cell">
                      <span className="user-avatar">{u.name?.[0] || 'U'}</span>
                      <span className="user-name">{u.name || 'Unknown'}</span>
                    </div>
                  </td>
                  <td>{u.email || 'N/A'}</td>
                  <td>
                    <select
                      value={u.role || 'user'}
                      onChange={(e) => handleRoleChange(u.uid, e.target.value)}
                      disabled={actionLoading[u.uid] || u.uid === user?.uid}
                      className={`role-select ${u.role === 'admin' ? 'admin' : 'user'}`}
                    >
                      <option value="user">👤 User</option>
                      <option value="admin">🔑 Admin</option>
                    </select>
                  </td>
                  <td>
                    <span className={`status-badge ${u.active ? 'active' : 'inactive'}`}>
                      {u.active ? '🟢 Active' : '🔴 Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleToggleActive(u.uid, u.active)}
                        disabled={actionLoading[u.uid] || u.uid === user?.uid}
                        className="action-btn toggle"
                        title={u.active ? 'Deactivate' : 'Activate'}
                      >
                        {u.active ? '⏸️' : '▶️'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.uid)}
                        disabled={actionLoading[u.uid] || u.uid === user?.uid}
                        className="action-btn delete"
                        title="Delete user"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .admin-users {
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
        }

        .admin-header p {
          margin: 0;
          color: var(--text-muted);
        }

        .admin-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
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

        .user-table-container {
          background: var(--bg-card);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-color);
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
        }

        .user-table th {
          text-align: left;
          padding: 12px 14px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          border-bottom: 2px solid var(--border-color);
          background: var(--bg-primary);
          font-weight: 600;
        }

        .user-table td {
          padding: 10px 14px;
          font-size: 13px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .user-table tr:last-child td {
          border-bottom: none;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 10px;
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
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
        }

        .user-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .role-select {
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .role-select.admin {
          border-color: var(--accent-gold);
          color: var(--accent-gold);
        }

        .role-select:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .status-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
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

        .action-buttons {
          display: flex;
          gap: 6px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
        }

        .action-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .action-btn.toggle:hover:not(:disabled) {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.05);
        }

        .action-btn.delete:hover:not(:disabled) {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        .action-btn:active:not(:disabled) {
          transform: scale(0.9);
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

        /* Responsive */
        @media (max-width: 600px) {
          .admin-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .user-table-container {
            overflow-x: auto;
          }

          .user-table {
            font-size: 12px;
            min-width: 500px;
          }

          .user-table th,
          .user-table td {
            padding: 8px 10px;
          }

          .action-btn {
            width: 28px;
            height: 28px;
            font-size: 12px;
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

export default AdminUsers;