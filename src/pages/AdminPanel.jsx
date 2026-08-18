import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, updateUserRole, deleteUser } from '../firebase/config';
import ProtectedRoute from '../components/ProtectedRoute';

function AdminPanel() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const result = await getAllUsers();
    if (result.success) {
      setUsers(result.users);
    }
    setLoading(false);
  };

  const handleRoleChange = async (uid, newRole) => {
    setActionLoading(prev => ({ ...prev, [uid]: true }));
    const result = await updateUserRole(uid, newRole);
    if (result.success) {
      await loadUsers();
    } else {
      alert('Failed to update role: ' + result.error);
    }
    setActionLoading(prev => ({ ...prev, [uid]: false }));
  };

  const handleDeleteUser = async (uid) => {
    if (uid === user.uid) {
      alert('You cannot delete yourself!');
      return;
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
      setActionLoading(prev => ({ ...prev, [uid]: true }));
      const result = await deleteUser(uid);
      if (result.success) {
        await loadUsers();
      } else {
        alert('Failed to delete user: ' + result.error);
      }
      setActionLoading(prev => ({ ...prev, [uid]: false }));
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="admin-panel">
        <div className="admin-header">
          <h2>⚙️ Admin Panel</h2>
          <p>Manage users and system settings</p>
        </div>

        <div className="admin-stats">
          <div className="admin-stat">
            <span className="admin-stat-value">{users.length}</span>
            <span className="admin-stat-label">Total Users</span>
          </div>
          <div className="admin-stat">
            <span className="admin-stat-value">
              {users.filter(u => u.role === 'admin').length}
            </span>
            <span className="admin-stat-label">Admins</span>
          </div>
          <div className="admin-stat">
            <span className="admin-stat-value">
              {users.filter(u => u.active).length}
            </span>
            <span className="admin-stat-label">Active</span>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading">Loading users...</div>
        ) : (
          <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.uid}>
                    <td>
                      <span className="user-cell-name">
                        {u.name || 'Unknown'}
                      </span>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <select
                        value={u.role || 'user'}
                        onChange={(e) => handleRoleChange(u.uid, e.target.value)}
                        disabled={actionLoading[u.uid] || u.uid === user.uid}
                        className="role-select"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <span className={`status-badge ${u.active ? 'active' : 'inactive'}`}>
                        {u.active ? '🟢 Active' : '⚪ Inactive'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="delete-user-btn"
                        onClick={() => handleDeleteUser(u.uid)}
                        disabled={actionLoading[u.uid] || u.uid === user.uid}
                      >
                        {actionLoading[u.uid] ? '⏳' : '🗑️'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default AdminPanel;