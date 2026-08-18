// pages/OldSmsPage.jsx
import React, { useState, useEffect } from 'react';
import { get, ref } from 'firebase/database';
import { db } from '../firebase/config';

function OldSmsPage({ deviceId }) {
  const [loading, setLoading] = useState(true);
  const [smsList, setSmsList] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, Received, Sent

  useEffect(() => {
    if (deviceId) {
      fetchOldSms();
    }
  }, [deviceId]);

  const fetchOldSms = async () => {
    setLoading(true);
    setError(null);
    try {
      const oldSmsRef = ref(db, `old_sms/${deviceId}`);
      const snapshot = await get(oldSmsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const smsArray = Object.values(data).map((sms, index) => ({
          id: index,
          address: sms.address || 'Unknown',
          body: sms.body || 'No message',
          date: sms.date || Date.now(),
          formatted_date: sms.formatted_date || 'N/A',
          type: sms.type || 'Received',
          upload_timestamp: sms.upload_timestamp || Date.now()
        }));
        // Sort by date (newest first)
        smsArray.sort((a, b) => b.date - a.date);
        setSmsList(smsArray);
      } else {
        setSmsList([]);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Never';
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const getFilteredSms = () => {
    if (filter === 'all') return smsList;
    return smsList.filter(sms => sms.type === filter);
  };

  const filteredSms = getFilteredSms();

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>📥 Loading old messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-error">
        <span className="error-icon">❌</span>
        <h2>Error Loading Messages</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="old-sms-page">
      <div className="old-sms-header">
        <span className="old-sms-title">📥 Old SMS Inbox</span>
        <span className="old-sms-count">{smsList.length} messages</span>
      </div>

      {/* Filters */}
      <div className="old-sms-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          📨 All
        </button>
        <button
          className={`filter-btn ${filter === 'Received' ? 'active' : ''}`}
          onClick={() => setFilter('Received')}
        >
          📩 Received
        </button>
        <button
          className={`filter-btn ${filter === 'Sent' ? 'active' : ''}`}
          onClick={() => setFilter('Sent')}
        >
          📤 Sent
        </button>
        <button className="filter-btn refresh" onClick={fetchOldSms}>
          🔄 Refresh
        </button>
      </div>

      {/* SMS List */}
      <div className="old-sms-list">
        {filteredSms.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No old messages found</p>
          </div>
        ) : (
          filteredSms.map((sms) => (
            <div key={sms.id} className={`old-sms-item ${sms.type === 'Received' ? 'received' : 'sent'}`}>
              <div className="sms-header">
                <span className="sms-sender">📩 {sms.address}</span>
                <span className="sms-time">{formatDate(sms.date)}</span>
              </div>
              <div className="sms-body">
                {sms.body}
              </div>
              <div className="sms-footer">
                <span className={`sms-type ${sms.type === 'Received' ? 'received' : 'sent'}`}>
                  {sms.type === 'Received' ? '📩 Received' : '📤 Sent'}
                </span>
                <span className="sms-ago">{formatTimeAgo(sms.date)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .old-sms-page {
          padding: 12px 0;
          max-width: 100%;
        }

        .old-sms-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: var(--bg-card);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          margin-bottom: 12px;
        }

        .old-sms-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .old-sms-count {
          font-size: 12px;
          color: var(--text-muted);
          background: var(--bg-input);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .old-sms-filters {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 6px 16px;
          border: 2px solid var(--border-color);
          border-radius: 20px;
          background: var(--bg-input);
          color: var(--text-muted);
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .filter-btn.active {
          border-color: #6c63ff;
          background: rgba(108,99,255,0.1);
          color: #6c63ff;
        }

        .filter-btn.refresh {
          border-color: #28a745;
          background: rgba(40,167,69,0.08);
          color: #28a745;
        }

        .filter-btn.refresh:hover {
          background: #28a745;
          color: white;
        }

        .old-sms-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .old-sms-item {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 14px 16px;
          border: 1px solid var(--border-color);
          border-left: 4px solid #6c63ff;
          transition: all 0.3s;
        }

        .old-sms-item:hover {
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transform: translateX(2px);
        }

        .old-sms-item.received {
          border-left-color: #2ecc71;
        }

        .old-sms-item.sent {
          border-left-color: #f59e0b;
        }

        .sms-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }

        .sms-sender {
          font-size: 13px;
          font-weight: 700;
          color: #6c63ff;
        }

        .sms-time {
          font-size: 11px;
          color: var(--text-muted);
        }

        .sms-body {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.6;
          word-wrap: break-word;
          white-space: pre-wrap;
          margin-bottom: 8px;
        }

        .sms-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
          padding-top: 8px;
          border-top: 1px solid var(--border-color);
        }

        .sms-type {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 12px;
        }

        .sms-type.received {
          color: #2ecc71;
          background: rgba(46,204,113,0.08);
        }

        .sms-type.sent {
          color: #f59e0b;
          background: rgba(245,158,11,0.08);
        }

        .sms-ago {
          font-size: 10px;
          color: var(--text-muted);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-muted);
          background: var(--bg-card);
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        .empty-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }

        .page-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          gap: 12px;
          color: var(--text-muted);
        }

        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(108,99,255,0.1);
          border-top-color: #6c63ff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .page-error {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-muted);
        }

        .error-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }

        .page-error h2 {
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        @media (max-width: 480px) {
          .old-sms-item {
            padding: 10px 12px;
          }
          
          .sms-sender {
            font-size: 12px;
          }
          
          .sms-body {
            font-size: 12px;
          }
          
          .old-sms-filters {
            gap: 4px;
          }
          
          .filter-btn {
            padding: 4px 12px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}

export default OldSmsPage;