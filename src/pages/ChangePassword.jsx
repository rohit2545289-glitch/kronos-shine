import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import './DetailPages.css';

function ChangePassword() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('❌ New passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('❌ Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await changePassword(user.userId, oldPassword, newPassword);
    if (result.success) {
      setSuccess('✅ Password changed successfully! All devices logged out.');
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 3000);
    } else {
      setError('❌ ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="detail-page" style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>🔑 Change Password</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>
        Changing password will logout all your devices
      </p>

      <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="auth-input-group">
          <label>Current Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter current password"
            required
          />
        </div>

        <div className="auth-input-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="auth-input-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>

        {error && <div className="auth-error-msg">{error}</div>}
        {success && <div className="auth-success-msg">{success}</div>}

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? '⏳ Changing...' : '🔄 Change Password'}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;