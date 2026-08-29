// src/pages/Setup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Setup.css';
import { createAdminUser } from '../firebase/config'; // ← isSetupComplete hatao

function Setup() {
  const [setupKey, setSetupKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [setupDone, setSetupDone] = useState(false);
  const navigate = useNavigate();

  // Check if setup already completed - Direct Firebase check
  useEffect(() => {
    const checkSetup = async () => {
      try {
        // Direct check karo ki users exist karte hain ya nahi
        const { db, get, ref } = await import('../firebase/config');
        const usersRef = ref(db, 'users');
        const snapshot = await get(usersRef);
        const users = snapshot.val() || {};
        
        // Agar koi user hai toh setup done
        if (Object.keys(users).length > 0) {
          setSetupDone(true);
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (error) {
        console.error('Setup check error:', error);
      }
    };
    checkSetup();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!setupKey.trim()) {
      setError('❌ Please enter the setup key!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await createAdminUser(setupKey);
      if (result.success) {
        setSuccess('✅ ' + result.message);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('❌ Setup failed: ' + err.message);
    }
    setLoading(false);
  };

  // If setup already done
  if (setupDone) {
    return (
      <div className="setup-container">
        <div className="setup-card">
          <div className="setup-icon">✅</div>
          <h2>Setup Already Completed</h2>
          <p>Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="setup-container">
      <div className="setup-card">
        <div className="setup-header">
          <div className="setup-logo">🔐</div>
          <h1>KRONOS Setup</h1>
          <p className="setup-subtitle">Enter setup key to create admin account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="setupKey">🔑 Setup Key</label>
            <input
              id="setupKey"
              type="password"
              value={setupKey}
              onChange={(e) => setSetupKey(e.target.value)}
              placeholder="Enter setup key..."
              required
              disabled={loading}
            />
            <small className="form-hint">
              Contact system administrator for setup key
            </small>
          </div>

          {error && (
            <div className="alert alert-error">
              <span className="alert-icon">❌</span>
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <span className="alert-icon">✅</span>
              {success}
            </div>
          )}

          <button 
            type="submit" 
            className="setup-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating...
              </>
            ) : (
              '🚀 Create Admin'
            )}
          </button>
        </form>

        <div className="setup-footer">
          <p>⚠️ This is a one-time setup. Only authorized users can access.</p>
        </div>
      </div>
    </div>
  );
}

export default Setup;