import React, { useState } from 'react';
import { ref, set, get } from 'firebase/database';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

function AdminAdd() {
  const { user } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Check if current user is admin
  const isAdmin = user?.role === 'admin' || user?.userData?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="admin-add-page">
        <h2>⛔ Access Denied</h2>
        <p>Only admin can add new admins</p>
      </div>
    );
  }

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Check if user already exists
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      const users = snapshot.val() || {};

      // Check if userId already exists
      for (let uid in users) {
        if (users[uid].userId === userId) {
          setError('❌ User ID already exists!');
          setLoading(false);
          return;
        }
        if (users[uid].email === email) {
          setError('❌ Email already exists!');
          setLoading(false);
          return;
        }
      }

      // Generate unique UID
      const newUid = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      
      // Create admin user
      await set(ref(db, `users/${newUid}`), {
        userId: userId,
        email: email,
        name: name,
        role: 'admin', // ✅ Important - Admin role
        password: password,
        createdAt: Date.now(),
        lastLogin: Date.now(),
        active: true
      });

      setMessage('✅ Admin user created successfully!');
      setUserId('');
      setPassword('');
      setName('');
      setEmail('');

    } catch (err) {
      setError('❌ Failed to create admin: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="admin-add-page">
      <div className="admin-add-container">
        <h2>🔑 Add New Admin</h2>
        <p className="subtitle">Create a new admin user account</p>

        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleAddAdmin}>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              required
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (min 6 chars)"
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? '⏳ Creating...' : '➕ Add Admin'}
          </button>
        </form>
      </div>

      <style>{`
        .admin-add-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: var(--bg-primary);
        }

        .admin-add-container {
          max-width: 420px;
          width: 100%;
          background: var(--bg-card);
          border-radius: 16px;
          padding: 30px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-hover);
        }

        .admin-add-container h2 {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px;
          text-align: center;
        }

        .subtitle {
          font-size: 14px;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 16px;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-group input {
          padding: 10px 14px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-primary);
          font-size: 14px;
          transition: all 0.3s;
          outline: none;
        }

        .form-group input:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.08);
        }

        .add-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #6c63ff, #3b82f6);
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 8px;
        }

        .add-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(108, 99, 255, 0.3);
        }

        .add-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-msg {
          padding: 10px 14px;
          background: rgba(46, 204, 113, 0.08);
          border: 1px solid rgba(46, 204, 113, 0.15);
          border-radius: 8px;
          color: #2ecc71;
          font-size: 13px;
          text-align: center;
          margin-bottom: 16px;
        }

        .error-msg {
          padding: 10px 14px;
          background: rgba(231, 76, 60, 0.08);
          border: 1px solid rgba(231, 76, 60, 0.15);
          border-radius: 8px;
          color: #e74c3c;
          font-size: 13px;
          text-align: center;
          margin-bottom: 16px;
        }

        @media (max-width: 480px) {
          .admin-add-container {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminAdd;