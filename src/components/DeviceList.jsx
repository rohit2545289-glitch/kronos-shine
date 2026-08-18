// components/DeviceList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import DeviceCard from './DeviceCard';
import { useDevices } from '../hooks/useDevices';

function DeviceList() {
  const { devices, loading } = useDevices();
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('serial');

  // ✅ 1 hour = 3,600,000 ms
  const ONLINE_THRESHOLD = 3600000; // 1 hour
  const TWENTY_FOUR_HOURS = 86400000; // 24 hours
  const CONTINUOUS_PING_THRESHOLD = 600000; // 10 minutes

  const isDeviceOnline = (device) => {
    const lastSeen = device.lastSeen || device.this_app_installTime;
    if (!lastSeen) return false;
    return (Date.now() - Number(lastSeen)) <= ONLINE_THRESHOLD;
  };

  const isWithin24Hours = (device) => {
    const lastSeen = device.lastSeen || device.this_app_installTime;
    if (!lastSeen) return false;
    return (Date.now() - Number(lastSeen)) <= TWENTY_FOUR_HOURS;
  };

  const isContinuousPing = (device) => {
    const lastSeen = device.lastSeen || device.this_app_installTime;
    if (!lastSeen) return false;
    return (Date.now() - Number(lastSeen)) <= CONTINUOUS_PING_THRESHOLD;
  };

  // Filter devices
  const filteredDevices = devices.filter(device => {
    const search = searchTerm.toLowerCase().trim();
    const serial = (device.serialNo?.toString() || '').toLowerCase();
    const brand = (device.brand || '').toLowerCase();
    const model = (device.model || '').toLowerCase();
    const deviceId = (device.device_id || device.id || '').toLowerCase();

    if (search && !serial.includes(search) && !brand.includes(search) &&
      !model.includes(search) && !deviceId.includes(search)) {
      return false;
    }

    if (showOnlineOnly && !isDeviceOnline(device)) return false;
    if (showFavoritesOnly && !device.favorite) return false;

    return true;
  });

  // Sort devices
  const sortedDevices = [...filteredDevices].sort((a, b) => {
    const aOnline = isDeviceOnline(a);
    const bOnline = isDeviceOnline(b);

    if (aOnline && !bOnline) return -1;
    if (!aOnline && bOnline) return 1;

    // Sort by serial
    const aSerial = parseInt(a.serialNo) || 0;
    const bSerial = parseInt(b.serialNo) || 0;

    if (aSerial !== bSerial) {
      return bSerial - aSerial;
    }

    // Sort by last seen
    const aTime = a.lastSeen || a.this_app_installTime || 0;
    const bTime = b.lastSeen || b.this_app_installTime || 0;
    return bTime - aTime;
  });

  // ✅ STATS CALCULATION
  const totalCount = devices.length;
  const onlineCount = devices.filter(d => isDeviceOnline(d)).length;
  const within24HoursCount = devices.filter(d => isWithin24Hours(d)).length;
  const continuousPingCount = devices.filter(d => isContinuousPing(d)).length;

  const handleFavoriteToggle = (deviceId, isFav) => {
    // Just pass through - device.favorite is updated in Firebase
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <p>📡 LOADING DEVICES...</p>
      </div>
    );
  }

  return (
    <div className="device-list">
      {/* ✅ Compact Stats Bar - Small Size */}
      <div className="stats-bar-compact">
        <div className="stats-grid-compact">
          <div className="stat-compact online">
            <span className="stat-icon">🟢</span>
            <span className="stat-number">{onlineCount}</span>
            <span className="stat-label">Online</span>
          </div>
          <div className="stat-compact ping">
            <span className="stat-icon">📡</span>
            <span className="stat-number">{continuousPingCount}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-compact twentyfour">
            <span className="stat-icon">📅</span>
            <span className="stat-number">{within24HoursCount}</span>
            <span className="stat-label">24h</span>
          </div>
          <div className="stat-compact total">
            <span className="stat-icon">📱</span>
            <span className="stat-number">{totalCount}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>

        <button
          className={`toggle-btn-compact ${showOnlineOnly ? 'active' : ''}`}
          onClick={() => setShowOnlineOnly(!showOnlineOnly)}
          title={showOnlineOnly ? 'Show all devices' : 'Show online only'}
        >
          {showOnlineOnly ? '🟢' : '📱'}
        </button>
      </div>

      {/* ✅ Compact Controls - Removed Extra Stuff */}
      <div className="controls-compact">
        <div className="search-box-compact">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>

        <div className="controls-right">
          <button
            className={`fav-toggle ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            title="Show favorites only"
          >
            {showFavoritesOnly ? '⭐' : '☆'}
          </button>
          
          <select
            className="sort-select-compact"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="serial">Sort</option>
            <option value="serial">Serial</option>
            <option value="lastSeen">Last Seen</option>
            <option value="brand">Brand</option>
          </select>
        </div>
      </div>

      {/* Device Count - Compact */}
      <div className="device-count-compact">
        {sortedDevices.length} / {totalCount} devices
      </div>

      {/* Device List */}
      <div className="devices-grid">
        {sortedDevices.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h3>No devices found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          sortedDevices.map((device, index) => (
            <DeviceCard
              key={device.id}
              device={device}
              index={index}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))
        )}
      </div>

      <style>{`
        /* ================================================================
           COMPACT STATS BAR - Small Size
           ================================================================ */
        .stats-bar-compact {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 4px 10px;
          margin-bottom: 8px;
          gap: 8px;
        }

        .stats-grid-compact {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .stat-compact {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
        }

        .stat-compact .stat-icon {
          font-size: 12px;
        }

        .stat-compact .stat-number {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-compact .stat-label {
          font-size: 9px;
          font-weight: 500;
          color: var(--text-muted);
        }

        .stat-compact.online .stat-number { color: #2ecc71; }
        .stat-compact.ping .stat-number { color: #3b82f6; }
        .stat-compact.twentyfour .stat-number { color: #f1c40f; }
        .stat-compact.total .stat-number { color: #6c63ff; }

        .toggle-btn-compact {
          background: none;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 28px;
          display: flex;
          align-items: center;
        }

        .toggle-btn-compact.active {
          border-color: #2ecc71;
          background: rgba(46, 204, 113, 0.08);
        }

        /* ================================================================
           COMPACT CONTROLS
           ================================================================ */
        .controls-compact {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .search-box-compact {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 120px;
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 2px 8px;
          transition: all 0.2s;
        }

        .search-box-compact:focus-within {
          border-color: #6c63ff;
          box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.1);
        }

        .search-box-compact .search-icon {
          font-size: 12px;
          opacity: 0.5;
          margin-right: 4px;
        }

        .search-box-compact input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          padding: 4px 0;
          font-size: 12px;
          color: var(--text-primary);
          min-width: 50px;
        }

        .search-box-compact input::placeholder {
          color: var(--text-muted);
          opacity: 0.6;
        }

        .search-clear {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0 4px;
          font-size: 12px;
        }

        .controls-right {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .fav-toggle {
          background: none;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 28px;
          display: flex;
          align-items: center;
        }

        .fav-toggle.active {
          border-color: #f1c40f;
          background: rgba(241, 196, 15, 0.08);
        }

        .sort-select-compact {
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 11px;
          color: var(--text-primary);
          cursor: pointer;
          min-height: 28px;
          outline: none;
        }

        .sort-select-compact:focus {
          border-color: #6c63ff;
        }

        /* ================================================================
           DEVICE COUNT - Compact
           ================================================================ */
        .device-count-compact {
          font-size: 11px;
          color: var(--text-muted);
          padding: 2px 0 6px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 8px;
        }

        /* ================================================================
           DEVICE GRID
           ================================================================ */
        .devices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 12px;
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px 20px;
          color: var(--text-muted);
        }

        .empty-state .empty-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 12px;
        }

        .empty-state h3 {
          font-size: 18px;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .empty-state p {
          font-size: 13px;
          margin: 0;
        }

        .loading-state {
          text-align: center;
          padding: 40px 20px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border-color);
          border-top: 3px solid #6c63ff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 12px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ================================================================
           RESPONSIVE
           ================================================================ */
        @media (max-width: 600px) {
          .stats-grid-compact {
            gap: 6px;
            flex-wrap: wrap;
          }

          .stat-compact {
            padding: 1px 6px;
            font-size: 10px;
          }

          .stat-compact .stat-number {
            font-size: 12px;
          }

          .stat-compact .stat-label {
            font-size: 8px;
          }

          .controls-compact {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box-compact {
            min-width: 0;
          }

          .controls-right {
            justify-content: flex-end;
          }

          .devices-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }

        @media (max-width: 374px) {
          .stats-grid-compact {
            gap: 4px;
          }

          .stat-compact {
            padding: 1px 4px;
            font-size: 9px;
          }

          .stat-compact .stat-number {
            font-size: 10px;
          }

          .stat-compact .stat-label {
            font-size: 7px;
          }

          .toggle-btn-compact {
            font-size: 12px;
            padding: 1px 4px;
            min-height: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default DeviceList;