// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  logoutUser as firebaseLogout,
  getUserSessions,
  listenUserSessions,
  listenRemoteLogout,
  remoteLogoutAllDevices,
  remoteLogoutDevice,
  logoutAllSessions,
  logoutSession
} from '../firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('kronos_user');
    const savedSession = localStorage.getItem('kronos_session');
    
    console.log('🔵 AuthProvider: Checking saved session...');
    
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setUserData(parsed);
        if (savedSession) {
          setCurrentSessionId(savedSession);
        }
      } catch (e) {
        console.error('❌ Error parsing saved user:', e);
        localStorage.removeItem('kronos_user');
        localStorage.removeItem('kronos_session');
      }
    }
    setLoading(false);
  }, []);

  // Listen for sessions when user logs in
  useEffect(() => {
    if (user && user.uid) {
      console.log('🔵 Setting up session listener for user:', user.uid);
      
      const unsubscribe = listenUserSessions(user.uid, (sessionsData) => {
        console.log('🔵 Sessions updated:', sessionsData.length);
        setSessions(sessionsData);
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [user]);

  const login = (userData, sessionId) => {
    console.log('🔵 Login called with:', userData, sessionId);
    setUser(userData);
    setUserData(userData);
    setCurrentSessionId(sessionId);
    localStorage.setItem('kronos_user', JSON.stringify(userData));
    if (sessionId) {
      localStorage.setItem('kronos_session', sessionId);
    }
  };

  const logout = async () => {
    console.log('🔵 Logout called');
    try {
      await firebaseLogout();
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
    
    setUser(null);
    setUserData(null);
    setSessions([]);
    setCurrentSessionId(null);
    localStorage.removeItem('kronos_user');
    localStorage.removeItem('kronos_session');
  };

  // ✅ LOGOUT SPECIFIC DEVICE (User can logout their own device)
  const logoutSpecificDevice = async (sessionId) => {
    console.log('🔵 Logout specific device called:', sessionId);
    if (!user) return { success: false, error: 'No user logged in' };
    
    try {
      const result = await logoutSession(user.uid, sessionId);
      
      if (result.success) {
        // Refresh sessions list
        const updatedSessions = await getUserSessions(user.uid);
        if (updatedSessions.success) {
          setSessions(updatedSessions.sessions);
        }
        
        // If current device was logged out
        if (sessionId === currentSessionId) {
          await logout();
          window.location.href = '/login';
        }
        
        return { success: true };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('❌ Logout specific device error:', error);
      return { success: false, error: error.message };
    }
  };

  // ✅ REMOTE LOGOUT SPECIFIC DEVICE (Admin force logout)
  const remoteLogoutDeviceById = async (sessionId) => {
    console.log('🔵 Remote logout device called:', sessionId);
    if (!user) return { success: false, error: 'No user logged in' };
    
    try {
      await remoteLogoutDevice(user.uid, sessionId);
      
      // Refresh sessions
      const result = await getUserSessions(user.uid);
      if (result.success) {
        setSessions(result.sessions);
      }
      
      return { success: true };
    } catch (error) {
      console.error('❌ Remote logout device error:', error);
      return { success: false, error: error.message };
    }
  };

  // ✅ REMOTE LOGOUT ALL DEVICES
  const remoteLogoutAll = async () => {
    console.log('🔵 Remote logout all called for user:', user?.uid);
    if (!user) return { success: false, error: 'No user logged in' };
    
    try {
      await remoteLogoutAllDevices(user.uid);
      await logout();
      window.location.href = '/login';
      return { success: true };
    } catch (error) {
      console.error('❌ Remote logout all error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    userData,
    loading,
    sessions,
    currentSessionId,
    login,
    logout,
    logoutSpecificDevice,      // ✅ Individual device logout
    remoteLogoutDevice: remoteLogoutDeviceById,  // ✅ Admin force logout
    remoteLogoutAll,           // ✅ Logout all devices
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('❌ useAuth must be used within AuthProvider');
  }
  return context;
};