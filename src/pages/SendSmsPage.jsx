// pages/SendSmsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, ref, set, push, onValue } from 'firebase/database';
import { db } from '../firebase/config';

function SendSmsPage() {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [simSlot, setSimSlot] = useState(0);
  const [simList, setSimList] = useState([]);
  const [lastSms, setLastSms] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSimInfo();
    fetchLastSms();

    const smsRef = ref(db, `smsRequests/${deviceId}`);
    const unsubscribe = onValue(smsRef, (snapshot) => {
      if (snapshot.exists()) {
        setLastSms(snapshot.val());
      } else {
        setLastSms(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [deviceId]);

  const fetchSimInfo = async () => {
    try {
      const snap = await get(ref(db, `devices/${deviceId}/sim_info`));
      if (snap.exists()) {
        const simInfoRaw = snap.val();
        const sims = simInfoRaw.split('\n').map(s => s.trim()).filter(Boolean);
        if (sims.length === 0) {
          setSimList(['SIM 1', 'SIM 2']);
        } else {
          setSimList(sims);
        }
      } else {
        setSimList(['SIM 1', 'SIM 2']);
      }
    } catch (err) {
      console.error('Error fetching SIM info:', err);
      setSimList(['SIM 1', 'SIM 2']);
    }
  };

  const fetchLastSms = async () => {
    try {
      const snap = await get(ref(db, `smsRequests/${deviceId}`));
      if (snap.exists()) {
        setLastSms(snap.val());
      }
    } catch (err) {
      console.error('Error fetching last SMS:', err);
    }
  };

  // ✅ Send SMS Function
  const handleSendSms = async () => {
    if (!number || number.length < 3) {
      setError('MIN 3-digit');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!message) {
      setError('Message is required');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setSending(true); // ✅ Button disable + loading state
    setError('');
    setSuccess('');

    try {
      console.log("📤 Sending to smsRequests...");

      // 1️⃣ Send to smsRequests
      const smsRef = ref(db, `smsRequests/${deviceId}`);
      await set(smsRef, {
        number: number,
        message: message,
        simSlot: simSlot,
        sent: false,
        delivered: false,
        status: 'pending',
        initiated: Date.now(),
        timestamp: new Date().toLocaleString('en-IN')
      });

      console.log("✅ Sent to smsRequests");

      // 2️⃣ Add to inbox
      const inboxRef = ref(db, `inbox/${deviceId}`);
      await push(inboxRef, {
        sender: 'Admin',
        number: number,
        message: message,
        simSlot: simSlot,
        time: Date.now(),
        status: 'pending',
        delivered: false,
        timestamp: new Date().toLocaleString('en-IN')
      });

      console.log("✅ Added to inbox");

      setSuccess(`✅ SMS command sent to device!`);
      setNumber('');
      setMessage('');

      // Refresh last SMS after 2 seconds
      setTimeout(() => fetchLastSms(), 2000);

    } catch (err) {
      console.error("❌ SMS send failed:", err);
      setError('❌ Failed to send SMS');
      setTimeout(() => setError(''), 3000);
    }

    setSending(false); // ✅ Button enable
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setMessage(text);
      setSuccess('📋 Pasted');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('❌ Clipboard access denied');
      setTimeout(() => setError(''), 2000);
    }
  };

  const formatDate = (ts) => {
    if (!ts) return 'N/A';
    return new Date(ts).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80px', gap: '6px' }}>
        <div style={{ width: '24px', height: '24px', border: '3px solid #e2e8f0', borderTopColor: '#6c63ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
        <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Loading...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '4px 0', maxWidth: '100%', background: 'var(--bg-primary)', minHeight: 'auto' }}>

      {/* HEADER */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '2px 0 6px',
        borderBottom: '2px solid var(--border-color)',
        marginBottom: '6px'
      }}>
      
        <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, flex: 1 }}>📨 Send SMS</h2>
      </div>

      {/* LAST SMS STATUS */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '8px',
        padding: '6px 10px',
        border: lastSms ? `2px solid ${lastSms.sent ? '#2ecc71' : '#f1c40f'}` : '1px solid var(--border-color)',
        marginBottom: '6px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: lastSms ? `linear-gradient(135deg, ${lastSms.sent ? '#2ecc71' : '#f1c40f'}, ${lastSms.sent ? '#27ae60' : '#f39c12'})` : 'var(--bg-input)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: 'white'
          }}>
            {lastSms ? (lastSms.sent ? '✅' : '⏳') : '📨'}
          </div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {lastSms ? 'Last SMS' : 'No SMS Sent'}
            </span>
            {lastSms && (
              <span style={{
                fontSize: '9px',
                fontWeight: 600,
                color: lastSms.sent ? '#2ecc71' : '#f1c40f',
                marginLeft: '6px',
                background: lastSms.sent ? 'rgba(46,204,113,0.08)' : 'rgba(241,196,15,0.08)',
                padding: '1px 8px',
                borderRadius: '10px'
              }}>
                {lastSms.sent ? '✅ Sent' : '⏳ Pending'}
              </span>
            )}
          </div>
        </div>

        {lastSms ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px 8px',
            background: 'var(--bg-input)',
            padding: '6px 10px',
            borderRadius: '6px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>📱 Number</span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                {lastSms.number || 'N/A'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>📶 SIM</span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                SIM {lastSms.simSlot != null ? lastSms.simSlot + 1 : 'N/A'}
              </span>
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>💬 Message</span>
              <span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-primary)', maxWidth: '60%', textAlign: 'right', wordBreak: 'break-word' }}>
                {lastSms.message || 'No message'}
              </span>
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '4px', marginTop: '2px' }}>
              <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>⏰ {lastSms.timestamp || formatDate(lastSms.initiated)}</span>
              {lastSms.delivered && <span style={{ fontSize: '8px', color: '#2ecc71' }}>📬 Delivered</span>}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '8px', color: 'var(--text-muted)', fontSize: '11px' }}>
            📭 No SMS sent yet
          </div>
        )}
      </div>

      {/* MESSAGES */}
      {error && (
        <div style={{ padding: '4px 8px', background: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.15)', borderRadius: '4px', color: '#e74c3c', fontSize: '11px', marginBottom: '4px' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ padding: '4px 8px', background: 'rgba(46,204,113,0.08)', border: '1px solid rgba(46,204,113,0.15)', borderRadius: '4px', color: '#2ecc71', fontSize: '11px', marginBottom: '4px' }}>
          {success}
        </div>
      )}

      {/* SMS FORM */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '8px',
        padding: '6px 10px',
        border: '1px solid var(--border-color)',
        marginBottom: '4px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>

          {/* Number Input */}
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '14px',
              color: 'var(--text-muted)'
            }}>📱</span>
            <input
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/\D/g, '').slice(0, 15))}
              placeholder="Enter Number"
              style={{
                padding: '8px 10px 8px 34px',
                border: `2px solid #6c63ff`,
                borderRadius: '8px',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'monospace',
                width: '100%',
                height: '38px',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#8b5cf6'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#6c63ff'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Message + Paste */}
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '10px',
              top: '14px',
              fontSize: '14px',
              color: 'var(--text-muted)'
            }}>💬</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows="2"
              style={{
                padding: '10px 10px 10px 34px',
                border: `2px solid #6c63ff`,
                borderRadius: '8px',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                minHeight: '65px',
                width: '100%',
                transition: 'all 0.3s',
                paddingRight: '50px'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#8b5cf6'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#6c63ff'; e.target.style.boxShadow = 'none'; }}
            />
            <button
              onClick={handlePaste}
              style={{
                position: 'absolute',
                right: '8px',
                bottom: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(108,99,255,0.12))',
                color: '#8b5cf6',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => { e.target.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(108,99,255,0.25))'; e.target.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(108,99,255,0.12))'; e.target.style.transform = 'scale(1)'; }}
              title="Paste from clipboard"
            >
              ♥️
            </button>
          </div>

          <div style={{ fontSize: '9px', color: 'var(--text-muted)', textAlign: 'right', marginTop: '-2px' }}>
            {message.length} characters
          </div>

          {/* SIM Select */}
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '14px',
              color: 'var(--text-muted)'
            }}>📶</span>
            <select
              value={simSlot}
              onChange={(e) => setSimSlot(parseInt(e.target.value))}
              style={{
                padding: '6px 10px 6px 34px',
                border: `2px solid #6c63ff`,
                borderRadius: '8px',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
                width: '100%',
                height: '36px',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%236c63ff\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#8b5cf6'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#6c63ff'; e.target.style.boxShadow = 'none'; }}
            >
              {simList.map((sim, index) => (
                <option key={index} value={index} style={{ padding: '4px' }}>
                  {sim}
                </option>
              ))}
            </select>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendSms}
            disabled={sending || !number || !message}
            style={{
              padding: '8px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: sending || !number || !message ? 'not-allowed' : 'pointer',
              background: sending || !number || !message ? '#95a5a6' : 'linear-gradient(135deg, #28a745, #1e7e34)',
              color: 'white',
              opacity: sending || !number || !message ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '38px',
              transition: 'all 0.3s',
              boxShadow: sending || !number || !message ? 'none' : '0 2px 12px rgba(40,167,69,0.25)'
            }}
            onMouseEnter={(e) => { if (!sending && number && message) { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 20px rgba(40,167,69,0.35)'; } }}
            onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = sending || !number || !message ? 'none' : '0 2px 12px rgba(40,167,69,0.25)'; }}
          >
            {sending ? '⏳ Sending...' : '📤 Send SMS'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendSmsPage;