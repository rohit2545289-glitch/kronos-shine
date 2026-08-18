import React, { useState, useEffect } from 'react';
import { ref, get, onValue } from 'firebase/database';
import { db, sendPing } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pingStatus, setPingStatus] = useState({});
  const [stats, setStats] = useState({
    total: 0,
    online: 0,
    offline: 0,
    responsive: 0,
    notResponsive: 0
  });

  const isAdmin = user?.role === 'admin' || user?.userData?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    console.log('🔄 AdminDashboard mounted, fetching devices...');

    // ✅ Real-time listener for devices
    const devicesRef = ref(db, 'devices');
    const unsubscribe = onValue(devicesRef, (snapshot) => {
      console.log('📡 Devices data received');
      if (snapshot.exists()) {
        const data = snapshot.val();
        const devicesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        console.log('📱 Devices found:', devicesArray.length);
        setDevices(devicesArray);
        updateStats(devicesArray);
        setLoading(false);
      } else {
        console.log('📭 No devices found');
        setDevices([]);
        setLoading(false);
      }
    }, (error) => {
      console.error('❌ Firebase error:', error);
      setLoading(false);
    });

    return () => {
      console.log('🔄 Unsubscribing from devices');
      unsubscribe();
    };
  }, [isAdmin]);

// ✅ Update statistics - 1 hour threshold
const updateStats = (devicesArray) => {
  // ✅ Last 1 hour ke andar wale online
  const oneHourAgo = Date.now() - 3600000; // 1 hour = 3,600,000 ms
  
  const online = devicesArray.filter(d => {
    const lastSeen = d.lastSeen || 0;
    return lastSeen > oneHourAgo;
  }).length;
  
  const total = devicesArray.length;
  const offline = total - online;
  
  setStats({
    total: total,
    online: online,
    offline: offline,
    responsive: online,
    notResponsive: offline
  });
};

  // ✅ Ping all devices at once
  const handlePingAll = async () => {
    if (!isAdmin) return;

    setPingStatus(prev => ({ ...prev, all: 'sending' }));

    let pinged = 0;
    let responded = 0;

    for (const device of devices) {
      try {
        const result = await sendPing(device.id);
        if (result.success) {
          pinged++;
          // Check response after 2 seconds
          setTimeout(() => {
            const deviceRef = ref(db, `devices/${device.id}`);
            get(deviceRef).then(snap => {
              if (snap.exists()) {
                const data = snap.val();
                if (data.status === 'online') {
                  responded++;
                }
              }
            });
          }, 2000);
        }
      } catch (err) {
        console.error('Ping failed for', device.id, err);
      }
    }

    setTimeout(() => {
      alert(`📊 Ping Results:\n\n✅ Responded: ${responded}\n❌ Not Responded: ${pinged - responded}\n📱 Total: ${pinged}`);
      setPingStatus(prev => ({ ...prev, all: null }));
    }, 4000);
  };

  // ✅ Ping single device
  const handlePingDevice = async (deviceId) => {
    if (!isAdmin) return;

    setPingStatus(prev => ({ ...prev, [deviceId]: 'sending' }));

    try {
      const result = await sendPing(deviceId);
      if (result.success) {
        // Check response after 3 seconds
        setTimeout(() => {
          const deviceRef = ref(db, `devices/${deviceId}`);
          get(deviceRef).then(snap => {
            if (snap.exists()) {
              const data = snap.val();
              if (data.status === 'online') {
                setPingStatus(prev => ({ ...prev, [deviceId]: 'online' }));
                setTimeout(() => {
                  setPingStatus(prev => ({ ...prev, [deviceId]: null }));
                }, 3000);
              } else {
                setPingStatus(prev => ({ ...prev, [deviceId]: 'offline' }));
                setTimeout(() => {
                  setPingStatus(prev => ({ ...prev, [deviceId]: null }));
                }, 3000);
              }
            }
          });
        }, 3000);
      }
    } catch (err) {
      console.error('Ping failed:', err);
      setPingStatus(prev => ({ ...prev, [deviceId]: null }));
    }
  };

  const getStatusColor = (status) => {
    if (status === 'online') return '#2ecc71';
    if (status === 'offline') return '#e74c3c';
    return '#f1c40f';
  };

  const getStatusText = (status) => {
    if (status === 'online') return '🟢 Online';
    if (status === 'offline') return '🔴 Offline';
    return '🟡 Away';
  };

  const getPingStatusIcon = (deviceId) => {
    const status = pingStatus[deviceId];
    if (status === 'sending') return '⏳';
    if (status === 'online') return '✅';
    if (status === 'offline') return '❌';
    return '📡';
  };

  if (!isAdmin) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>⛔</span>
        <h2>Access Denied</h2>
        <p>Only admin can access this page</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e2e8f0',
          borderTopColor: '#6c63ff',
          borderRadius: '50%',
          margin: '0 auto 12px',
          animation: 'spin 0.8s linear infinite'
        }}></div>
        <p>📡 Loading devices...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>📊 Device Dashboard</h2>
        <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Total: {stats.total} devices</span>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: '10px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '28px' }}>📱</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.total}</h3>
            <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>Total Devices</p>
          </div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '10px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '28px' }}>🟢</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#2ecc71' }}>{stats.online}</h3>
            <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>Online</p>
          </div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '10px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '28px' }}>🔴</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#e74c3c' }}>{stats.offline}</h3>
            <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>Offline</p>
          </div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '10px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '28px' }}>✅</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#2ecc71' }}>{stats.responsive}</h3>
            <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>Responsive</p>
          </div>
        </div>
      </div>

      {/* Ping All Button */}
      <div style={{ marginBottom: '16px', textAlign: 'center' }}>
        <button
          onClick={handlePingAll}
          disabled={pingStatus.all === 'sending' || devices.length === 0}
          style={{
            padding: '10px 30px',
            border: '2px solid #3b82f6',
            borderRadius: '10px',
            background: 'rgba(59, 130, 246, 0.08)',
            color: '#3b82f6',
            cursor: pingStatus.all === 'sending' || devices.length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '15px',
            fontWeight: 700,
            opacity: pingStatus.all === 'sending' || devices.length === 0 ? 0.5 : 1
          }}
        >
          {pingStatus.all === 'sending' ? '⏳ Pinging...' : '📡 Ping All Devices'}
        </button>
      </div>

      {/* Device List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '12px' }}>
        {devices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '8px' }}>📭</span>
            <p>No devices found</p>
          </div>
        ) : (
          devices.map((device) => {
            const status = device.status || 'offline';
            const pingIcon = getPingStatusIcon(device.id);
            const isPinging = pingStatus[device.id] === 'sending';

            return (
              <div
                key={device.id}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '12px',
                  padding: '14px',
                  border: '1px solid var(--border-color)',
                  borderLeft: `4px solid ${status === 'online' ? '#2ecc71' : '#e74c3c'}`,
                  opacity: status === 'offline' ? 0.7 : 1,
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '28px' }}>📱</span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>
                        {device.brand || 'Unknown'} {device.model || 'Device'}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'Courier New, monospace' }}>
                        ID: {device.id?.slice(0, 8)}...
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      display: 'inline-block',
                      background: status === 'online' ? '#2ecc71' : '#e74c3c'
                    }}></span>
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>
                      {status === 'online' ? '🟢 Online' : '🔴 Offline'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'var(--bg-input)', borderRadius: '4px', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>📶 IP</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{device.ip || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'var(--bg-input)', borderRadius: '4px', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>🔋 Battery</span>
                    <span style={{
                      fontWeight: 600,
                      color: parseInt(device.battery) < 20 ? '#e74c3c' : parseInt(device.battery) < 50 ? '#f1c40f' : '#2ecc71'
                    }}>
                      {device.battery || 'N/A'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'var(--bg-input)', borderRadius: '4px', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>🤖 Version</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>v{device.android_version || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'var(--bg-input)', borderRadius: '4px', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>📞 SIM</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{device.sim_info?.substring(0, 12) || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'var(--bg-input)', borderRadius: '4px', fontSize: '11px', gridColumn: 'span 2' }}>
                    <span style={{ color: 'var(--text-muted)' }}>🕐 Last Seen</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                  <button
                    onClick={() => handlePingDevice(device.id)}
                    disabled={isPinging}
                    style={{
                      flex: 1,
                      padding: '6px 12px',
                      border: `1px solid ${pingStatus[device.id] === 'online' ? '#2ecc71' : '#3b82f6'}`,
                      borderRadius: '6px',
                      background: pingStatus[device.id] === 'online' ? 'rgba(46, 204, 113, 0.08)' : 'rgba(59, 130, 246, 0.08)',
                      color: pingStatus[device.id] === 'online' ? '#2ecc71' : '#3b82f6',
                      cursor: isPinging ? 'not-allowed' : 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      opacity: isPinging ? 0.5 : 1
                    }}
                  >
                    {isPinging ? '⏳' : pingIcon} Ping
                  </button>
                  <button
                    onClick={() => window.location.href = `/device/${device.id}`}
                    style={{
                      flex: 1,
                      padding: '6px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      background: 'var(--bg-input)',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    📖 Details
                  </button>
                </div>

                {pingStatus[device.id] === 'online' && (
                  <div style={{ marginTop: '8px', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, textAlign: 'center', background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', border: '1px solid rgba(46, 204, 113, 0.2)' }}>
                    ✅ Device is responsive!
                  </div>
                )}
                {pingStatus[device.id] === 'offline' && (
                  <div style={{ marginTop: '8px', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, textAlign: 'center', background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', border: '1px solid rgba(231, 76, 60, 0.2)' }}>
                    ❌ Device is not responding!
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;