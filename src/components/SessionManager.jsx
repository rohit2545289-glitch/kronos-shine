// components/SessionManager.jsx
import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db, listenAllSessions } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

function SessionManager() {
  const { 
    user, 
    sessions, 
    logoutSpecificDevice,  // ✅ Individual device logout
    remoteLogoutAll,       // ✅ Logout all devices
    remoteLogoutDevice     // ✅ Admin force logout
  } = useAuth();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  const isAdmin = user?.role === 'admin' || user?.userData?.role === 'admin';

  useEffect(() => {
    fetchUsers();
    
    const unsubscribe = listenAllSessions(() => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRef = ref(db, 'users');
      const usersSnap = await get(usersRef);
      const usersData = usersSnap.exists() ? usersSnap.val() : {};
      const usersArray = Object.keys(usersData).map(key => ({
        uid: key,
        ...usersData[key]
      }));
      setUsers(usersArray);
    } catch (err) {
      console.error('❌ Error fetching users:', err);
    }
  };

  const getUser = (userId) => users.find(u => u.uid === userId);
  const getUserName = (userId) => {
    const user = getUser(userId);
    return user ? (user.name || user.userId || userId) : userId;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatus = (timestamp) => {
    if (!timestamp) return 'offline';
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'online';
    if (diff < 300000) return 'away';
    return 'offline';
  };

  // ✅ LOGOUT SPECIFIC DEVICE
  const handleLogoutDevice = async (sessionId, deviceName) => {
    if (!window.confirm(`⚠️ Logout from "${deviceName}"?\n\nThis will logout this specific device only.`)) return;

    setActionLoading(prev => ({ ...prev, [sessionId]: true }));
    try {
      const result = await logoutSpecificDevice(sessionId);
      if (result.success) {
        alert('✅ Device logged out successfully!');
      } else {
        alert('❌ Failed: ' + result.error);
      }
    } catch (err) {
      alert('❌ Failed: ' + err.message);
    }
    setActionLoading(prev => ({ ...prev, [sessionId]: false }));
  };

  // ✅ ADMIN REMOTE LOGOUT
  const handleRemoteLogout = async (userId, sessionId, deviceName) => {
    if (!isAdmin) return alert('❌ Admin only!');
    
    const isOwn = userId === user?.uid;
    const confirmMsg = isOwn 
      ? `⚠️ You are about to logout YOUR OWN device "${deviceName}"?\n\nThis will logout you from this device.`
      : `⚠️ Force logout ${getUserName(userId)} from "${deviceName}"?`;
      
    if (!window.confirm(confirmMsg)) return;

    setActionLoading(prev => ({ ...prev, [sessionId]: true }));
    try {
      const result = await remoteLogoutDevice(sessionId);
      if (result.success) {
        alert('✅ Device logged out successfully!');
      } else {
        alert('❌ Failed: ' + result.error);
      }
    } catch (err) {
      alert('❌ Failed: ' + err.message);
    }
    setActionLoading(prev => ({ ...prev, [sessionId]: false }));
  };

  // ✅ REMOTE LOGOUT ALL
  const handleRemoteLogoutAll = async () => {
    if (!isAdmin) return alert('❌ Admin only!');
    
    const confirmText = sessions.length > 1 
      ? `⚠️ Logout ALL users from ALL ${sessions.length} devices?\n\nThis will force logout everyone including you.`
      : `⚠️ Logout all devices?`;
      
    if (!window.confirm(confirmText)) return;

    setLoading(true);
    try {
      const result = await remoteLogoutAll();
      if (result.success) {
        alert('✅ All devices logged out successfully!');
      } else {
        alert('❌ Failed: ' + result.error);
      }
    } catch (err) {
      alert('❌ Failed: ' + err.message);
    }
    setLoading(false);
  };

  const displaySessions = isAdmin ? sessions : sessions.filter(s => s.userId === user?.uid);

  // Group sessions by user for admin view
  const groupedSessions = {};
  if (isAdmin) {
    displaySessions.forEach(session => {
      if (!groupedSessions[session.userId]) {
        groupedSessions[session.userId] = [];
      }
      groupedSessions[session.userId].push(session);
    });
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>📡 Loading sessions...</p>
      </div>
    );
  }

  return (
    <div className="session-manager">
      <div className="session-header">
        <h2>🔐 Active Sessions</h2>
        <div className="session-header-actions">
          <span className="session-count">
            {displaySessions.length} device{displaySessions.length !== 1 ? 's' : ''} active
          </span>
          {isAdmin && displaySessions.length > 0 && (
            <button 
              onClick={handleRemoteLogoutAll}
              className="logout-all-btn"
              disabled={loading}
            >
              🚫 Logout All Devices
            </button>
          )}
        </div>
      </div>

      <div className="session-list">
        {displaySessions.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No active sessions found</p>
          </div>
        ) : (
          isAdmin ? (
            // Admin View - Grouped by User
            Object.entries(groupedSessions).map(([userId, userSessions]) => (
              <div key={userId} className="user-group">
                <div className="user-group-header">
                  <span className="user-group-name">👤 {getUserName(userId)}</span>
                  <span className="user-group-count">{userSessions.length} device(s)</span>
                </div>
                {userSessions.map((session) => (
                  <SessionItem
                    key={session.sessionId}
                    session={session}
                    isOwn={session.userId === user?.uid}
                    isAdmin={isAdmin}
                    actionLoading={actionLoading}
                    onLogoutDevice={handleLogoutDevice}
                    onRemoteLogout={handleRemoteLogout}
                    formatTime={formatTime}
                    getStatus={getStatus}
                  />
                ))}
              </div>
            ))
          ) : (
            // User View - Only their own sessions
            displaySessions.map((session) => (
              <SessionItem
                key={session.sessionId}
                session={session}
                isOwn={true}
                isAdmin={isAdmin}
                actionLoading={actionLoading}
                onLogoutDevice={handleLogoutDevice}
                onRemoteLogout={handleRemoteLogout}
                formatTime={formatTime}
                getStatus={getStatus}
              />
            ))
          )
        )}
      </div>

      <style>{`
        .session-manager { padding: 16px; background: var(--bg-primary); max-width: 1200px; margin: 0 auto; }
        .session-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; flex-wrap: wrap; gap: 8px; }
        .session-header h2 { font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .session-header-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .session-count { font-size: 14px; color: var(--text-muted); background: var(--bg-card); padding: 4px 12px; border-radius: 12px; }
        .logout-all-btn { padding: 6px 16px; border: none; border-radius: 6px; background: #e74c3c; color: white; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s; }
        .logout-all-btn:hover:not(:disabled) { background: #c0392b; transform: scale(1.02); }
        .logout-all-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .user-group { margin-bottom: 16px; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; }
        .user-group-header { background: var(--bg-card); padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); }
        .user-group-name { font-weight: 600; color: var(--text-primary); }
        .user-group-count { font-size: 12px; color: var(--text-muted); }
        
        .session-list { display: flex; flex-direction: column; gap: 4px; }
        .session-item { background: var(--bg-card); border-radius: 6px; padding: 10px 14px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; margin: 2px 0; }
        .session-item:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .session-item.online { border-left: 3px solid #2ecc71; }
        .session-item.away { border-left: 3px solid #f1c40f; }
        .session-item.offline { border-left: 3px solid #e74c3c; opacity: 0.7; }
        .session-item.current-device { background: rgba(46, 204, 113, 0.05); border-color: #2ecc71; }
        
        .session-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
        .device-icon { font-size: 24px; }
        .session-details { flex: 1; min-width: 0; }
        .session-device-name { font-weight: 600; color: var(--text-primary); font-size: 14px; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
        .this-device-badge { font-size: 10px; font-weight: 700; color: #2ecc71; background: rgba(46, 204, 113, 0.1); padding: 1px 8px; border-radius: 4px; margin-left: 8px; }
        .session-meta { display: flex; gap: 8px; font-size: 11px; color: var(--text-muted); margin-top: 2px; flex-wrap: wrap; }
        .session-user { font-weight: 500; color: var(--text-secondary); }
        
        .session-right { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
        .status-dot.online { background: #2ecc71; animation: pulse 1.5s ease-in-out infinite; }
        .status-dot.away { background: #f1c40f; }
        .status-dot.offline { background: #e74c3c; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        .status-text { font-size: 11px; font-weight: 500; }
        .status-text.online { color: #2ecc71; }
        .status-text.away { color: #f1c40f; }
        .status-text.offline { color: #e74c3c; }
        
        .btn-group { display: flex; gap: 4px; flex-wrap: wrap; }
        .logout-btn { padding: 4px 12px; border: 1px solid #e74c3c; border-radius: 4px; background: rgba(231, 76, 60, 0.05); color: #e74c3c; cursor: pointer; font-size: 11px; font-weight: 600; transition: all 0.2s; }
        .logout-btn:hover:not(:disabled) { background: rgba(231, 76, 60, 0.15); transform: scale(1.02); }
        .logout-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .logout-btn.primary { background: #e74c3c; color: white; }
        .logout-btn.primary:hover:not(:disabled) { background: #c0392b; }
        .logout-btn.admin { border-color: #f39c12; color: #f39c12; }
        .logout-btn.admin:hover:not(:disabled) { background: rgba(243, 156, 18, 0.15); }
        .current-badge { font-size: 11px; color: var(--text-muted); font-weight: 600; padding: 2px 10px; background: var(--bg-input); border-radius: 4px; }
        
        .empty-state { text-align: center; padding: 40px; color: var(--text-muted); }
        .empty-state .empty-icon { font-size: 48px; display: block; margin-bottom: 8px; }
        .admin-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; gap: 12px; }
        .loading-spinner { width: 36px; height: 36px; border: 3px solid var(--border-color); border-top-color: var(--accent-cyan); border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        @media (max-width: 768px) { 
          .session-item { flex-direction: column; align-items: stretch; gap: 8px; } 
          .session-right { justify-content: flex-end; } 
          .session-header { flex-direction: column; align-items: stretch; }
          .session-device-name { font-size: 13px; }
          .session-meta { font-size: 10px; }
          .btn-group { width: 100%; justify-content: flex-end; }
        }
      `}</style>
    </div>
  );
}

// ============================================
// SESSION ITEM COMPONENT
// ============================================
const SessionItem = ({ 
  session, 
  isOwn, 
  isAdmin, 
  actionLoading, 
  onLogoutDevice, 
  onRemoteLogout,
  formatTime,
  getStatus 
}) => {
  const status = getStatus(session.lastActive);
  const deviceName = session.deviceName || 'Unknown Device';
  const isCurrentDevice = session.isCurrentDevice || false;

  return (
    <div className={`session-item ${status} ${isCurrentDevice ? 'current-device' : ''}`}>
      <div className="session-left">
        <span className="device-icon">📱</span>
        <div className="session-details">
          <div className="session-device-name">
            {deviceName.length > 35 ? deviceName.substring(0, 35) + '...' : deviceName}
            {isCurrentDevice && <span className="this-device-badge">● CURRENT</span>}
          </div>
          <div className="session-meta">
            <span>🕐 {formatTime(session.loginTime)}</span>
            <span>•</span>
            <span>{session.os || 'Unknown OS'}</span>
            <span>•</span>
            <span>IP: {session.ip || 'Unknown'}</span>
          </div>
        </div>
      </div>
      
      <div className="session-right">
        <span className={`status-dot ${status}`}></span>
        <span className={`status-text ${status}`}>
          {status === 'online' ? '🟢 Active' : status === 'away' ? '🟡 Away' : '🔴 Offline'}
        </span>
        
        <div className="btn-group">
          {/* ✅ LOGOUT SPECIFIC DEVICE - Available for all users */}
          {(isOwn || isAdmin) && (
            <button
              onClick={() => onLogoutDevice(session.sessionId, deviceName)}
              disabled={actionLoading[session.sessionId]}
              className="logout-btn primary"
              title="Logout this specific device"
            >
              {actionLoading[session.sessionId] ? '⏳' : '🚪 Logout Device'}
            </button>
          )}
          
          {/* ✅ ADMIN REMOTE LOGOUT - Force logout any device */}
          {isAdmin && !isOwn && (
            <button
              onClick={() => onRemoteLogout(session.userId, session.sessionId, deviceName)}
              disabled={actionLoading[session.sessionId]}
              className="logout-btn admin"
              title="Force logout this device (Admin)"
            >
              {actionLoading[session.sessionId] ? '⏳' : '🔒 Force Logout'}
            </button>
          )}
          
          {isCurrentDevice && !isAdmin && (
            <span className="current-badge">👤 Current</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionManager;