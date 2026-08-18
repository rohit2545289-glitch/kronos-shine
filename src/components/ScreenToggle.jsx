// src/components/ScreenToggle.jsx
import React, { useState, useEffect } from 'react';
import { ref, set, get, onValue } from 'firebase/database';
import { db } from '../firebase/config';

function ScreenToggle({ deviceId }) {
  const [loading, setLoading] = useState(false);
  const [isScreenOn, setIsScreenOn] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!deviceId) return;

    const statusRef = ref(db, `screen_status/${deviceId}`);
    
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsScreenOn(data.screenOn !== undefined ? data.screenOn : true);
        setStatus(data.status || 'ON');
      }
    });

    return () => unsubscribe();
  }, [deviceId]);

  const toggleScreen = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const cmdRef = ref(db, `screen_commands/${deviceId}`);
      await set(cmdRef, 'toggle');

      // Wait for response
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get updated status
      const statusRef = ref(db, `screen_status/${deviceId}`);
      const statusSnap = await get(statusRef);

      if (statusSnap.exists()) {
        const data = statusSnap.val();
        setIsScreenOn(data.screenOn || false);
        setStatus(data.status || (data.screenOn ? 'ON' : 'OFF'));
      }

    } catch (err) {
      setStatus('error');
      console.error('Toggle failed:', err);
    }
    setLoading(false);
  };

  return (
    <div className="screen-toggle">
      <button
        className={`toggle-btn ${isScreenOn ? 'on' : 'off'}`}
        onClick={toggleScreen}
        disabled={loading}
      >
        <span className="toggle-icon">
          {loading ? '⏳' : isScreenOn ? '🟢' : '🔴'}
        </span>
        <span className="toggle-text">
          {loading ? 'Processing...' : isScreenOn ? 'Screen ON' : 'Screen OFF'}
        </span>
        <span className="toggle-action">
          {loading ? '⏳' : isScreenOn ? '📱 Turn OFF' : '📱 Turn ON'}
        </span>
      </button>

      <style>{`
        .screen-toggle {
          display: flex;
          justify-content: center;
          padding: 10px 0;
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          border: none;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          max-width: 320px;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .toggle-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .toggle-btn:active:not(:disabled) {
          transform: scale(0.95);
        }

        .toggle-btn.on {
          background: linear-gradient(135deg, #2ecc71, #27ae60);
          color: white;
          box-shadow: 0 4px 25px rgba(46, 204, 113, 0.4);
        }

        .toggle-btn.off {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          box-shadow: 0 4px 25px rgba(231, 76, 60, 0.4);
        }

        .toggle-icon {
          font-size: 20px;
        }

        .toggle-text {
          font-size: 15px;
        }

        .toggle-action {
          font-size: 13px;
          opacity: 0.8;
          background: rgba(255,255,255,0.15);
          padding: 2px 12px;
          border-radius: 20px;
        }

        @media (max-width: 374px) {
          .toggle-btn {
            padding: 12px 16px;
            font-size: 14px;
            gap: 8px;
          }

          .toggle-text {
            font-size: 13px;
          }

          .toggle-action {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}

export default ScreenToggle;