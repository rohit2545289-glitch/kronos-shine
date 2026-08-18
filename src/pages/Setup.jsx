// pages/Setup.js
import React, { useState } from 'react';
import { createAdminUser } from '../firebase/config';

function Setup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  console.log('✅ Setup page rendered');

  const createAdmin = async () => {
    console.log('🔵 Create Admin button clicked');
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await createAdminUser();
      console.log('🔵 Result:', result);
      
      if (result.success) {
        setMessage('✅ Admin user created successfully!');
        setShowDetails(true);
      } else {
        setError('⚠️ ' + result.error);
      }
    } catch (err) {
      console.error('❌ Error creating admin:', err);
      setError('⚠️ ' + err.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-logo">⚙️</span>
          <h1>Setup KRONOS</h1>
          <p>Create admin user in database</p>
        </div>

        {/* Debug Info */}
        <div style={{ 
          background: '#f0f0f0', 
          padding: '8px 12px', 
          borderRadius: '4px',
          marginBottom: '16px',
          fontSize: '12px',
          color: '#666'
        }}>
          🔍 Debug: Ready to create admin user
        </div>

        <div className="setup-info" style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            <strong>⚠️ Important:</strong> This will create an admin user directly in Realtime Database.
          </p>
          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '12px', 
            borderRadius: '8px',
            marginTop: '10px',
            fontSize: '13px'
          }}>
            <div>📧 Email: <code style={{ color: 'var(--accent-cyan)' }}>admin@kronos.com</code></div>
            <div>🔑 Password: <code style={{ color: 'var(--accent-cyan)' }}>Admin@123</code></div>
            <div>🆔 User ID: <code style={{ color: 'var(--accent-cyan)' }}>admin</code></div>
          </div>
        </div>

        {message && (
          <div className="auth-success-msg" style={{ 
            whiteSpace: 'pre-line',
            padding: '12px',
            borderRadius: '8px',
            background: '#d4edda',
            color: '#155724',
            marginBottom: '12px'
          }}>
            {message}
          </div>
        )}

        {showDetails && (
          <div style={{
            padding: '12px',
            borderRadius: '8px',
            background: '#cce5ff',
            color: '#004085',
            marginBottom: '12px',
            fontSize: '14px'
          }}>
            <div>✅ Admin user created successfully!</div>
            <div style={{ marginTop: '8px', fontSize: '13px' }}>
              <div>📧 Email: <strong>admin@kronos.com</strong></div>
              <div>🔑 Password: <strong>Admin@123</strong></div>
              <div>🆔 User ID: <strong>admin</strong></div>
            </div>
            <div style={{ marginTop: '8px' }}>
              <a href="/login" style={{ color: '#004085', fontWeight: 'bold' }}>
                → Go to Login
              </a>
            </div>
          </div>
        )}

        {error && (
          <div className="auth-error-msg" style={{
            padding: '12px',
            borderRadius: '8px',
            background: '#f8d7da',
            color: '#721c24',
            marginBottom: '12px'
          }}>
            {error}
          </div>
        )}

        <button 
          className="auth-btn" 
          onClick={createAdmin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: 'none',
            background: loading ? '#6c757d' : '#007bff',
            color: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s'
          }}
        >
          {loading ? '⏳ Creating...' : '🚀 Create Admin User'}
        </button>

        <div className="auth-links" style={{ marginTop: '16px', textAlign: 'center' }}>
          <a href="/login" className="auth-link" style={{ color: '#007bff' }}>
            ← Back to Login
          </a>
        </div>

        {/* Hidden debug info */}
        <div style={{ display: 'none' }}>
          Loading: {String(loading)}
          Message: {message}
          Error: {error}
        </div>
      </div>
    </div>
  );
}

export default Setup;