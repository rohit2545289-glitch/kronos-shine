// utils/logUtils.js - Complete file

/**
 * Smart Log Status Detector
 * Determines the actual status of a log entry
 */
export const getSmartLogStatus = (log) => {
  const msg = log?.msg || '';
  const status = log?.status || 'PENDING';

  // ✅ FIRST: Check if app was opened successfully
  if (log?.app_open_attempted === true || 
      msg.toLowerCase().includes('app opened')) {
    return { 
      text: '✅ DONE', 
      color: '#2ecc71', 
      bg: 'rgba(46,204,113,0.15)',
      icon: '✅',
      isDone: true
    };
  }

  // ✅ SECOND: "App not found" - should be PENDING
  if (msg.toLowerCase().includes('not found')) {
    return { 
      text: '⏸️ PENDING', 
      color: '#95a5a6', 
      bg: 'rgba(149,165,166,0.15)',
      icon: '⏸️',
      isDone: false
    };
  }

  // ✅ THIRD: SUCCESS - Installation successful
  if (status === 'SUCCESS' ||
      msg.includes('✅') ||
      msg.toLowerCase().includes('successful') ||
      msg.toLowerCase().includes('completed') ||
      msg.toLowerCase().includes('installed') ||
      msg.toLowerCase().trim() === 'installation successful' ||
      log?.install_success === true) {
    return { 
      text: '✅ DONE', 
      color: '#2ecc71', 
      bg: 'rgba(46,204,113,0.15)',
      icon: '✅',
      isDone: true
    };
  }

  // ❌ FOURTH: FAILED
  if (status === 'FAILED' ||
      msg.toLowerCase().includes('failed') ||
      msg.toLowerCase().includes('error') ||
      msg.toLowerCase().includes('denied') ||
      log?.install_failed === true) {
    return { 
      text: '❌ FAILED', 
      color: '#e74c3c', 
      bg: 'rgba(231,76,60,0.15)',
      icon: '❌',
      isDone: false
    };
  }

  // ⏳ FIFTH: IN PROGRESS
  if (msg.toLowerCase().includes('vpn') ||
      msg.toLowerCase().includes('permission') ||
      msg.toLowerCase().includes('installation started') ||
      msg.toLowerCase().includes('decrypting') ||
      msg.toLowerCase().includes('extracting') ||
      msg.toLowerCase().includes('connecting') ||
      msg.toLowerCase().includes('granted') ||
      msg.toLowerCase().includes('accepted')) {
    return { 
      text: '⏳ IN PROGRESS', 
      color: '#f59e0b', 
      bg: 'rgba(245,158,11,0.15)',
      icon: '⏳',
      isDone: false
    };
  }

  // ⏸️ DEFAULT: PENDING
  return { 
    text: '⏸️ PENDING', 
    color: '#95a5a6', 
    bg: 'rgba(149,165,166,0.15)',
    icon: '⏸️',
    isDone: false
  };
};

/**
 * Get Final Status of Device (Overall)
 */
export const getDeviceFinalStatus = (logs) => {
  if (!logs || logs.length === 0) {
    return { text: '⏸️ PENDING', color: '#95a5a6' };
  }
  
  // ✅ FIRST: Check if any "App not found" log exists (LATEST)
  const sortedLogs = [...logs].sort((a, b) => b.timestamp - a.timestamp);
  
  // ✅ Check if the latest log is "App not found"
  const latestLog = sortedLogs[0];
  if (latestLog && latestLog.msg && latestLog.msg.toLowerCase().includes('not found')) {
    return { text: '⏸️ PENDING', color: '#95a5a6' };
  }
  
  // ✅ Check if any recent "App not found" log exists (last 5 logs)
  const recentLogs = sortedLogs.slice(0, 5);
  const hasRecentAppNotFound = recentLogs.some(log => 
    log.msg && log.msg.toLowerCase().includes('not found')
  );
  if (hasRecentAppNotFound) {
    return { text: '⏸️ PENDING', color: '#95a5a6' };
  }
  
  // ✅ Check if any "App not found" log exists at all
  const hasAppNotFound = logs.some(log => 
    log.msg && log.msg.toLowerCase().includes('not found')
  );
  if (hasAppNotFound) {
    // Check if there's a newer SUCCESS log after the "App not found"
    const appNotFoundIndex = logs.findIndex(log => 
      log.msg && log.msg.toLowerCase().includes('not found')
    );
    const hasNewerSuccess = logs.some((log, index) => 
      index < appNotFoundIndex && 
      (log.msg && (log.msg.includes('✅') || 
       log.msg.toLowerCase().includes('success') ||
       log.msg.toLowerCase().includes('opened')))
    );
    
    // If no newer success, it's still PENDING
    if (!hasNewerSuccess) {
      return { text: '⏸️ PENDING', color: '#95a5a6' };
    }
  }
  
  // ✅ Check if app was opened successfully
  const hasAppOpened = logs.some(log => 
    log.app_open_attempted === true ||
    (log.msg && log.msg.toLowerCase().includes('app opened'))
  );
  
  if (hasAppOpened) {
    return { text: '✅ INSTALLED', color: '#2ecc71' };
  }
  
  // ✅ Check other success conditions
  let hasSuccess = false;
  let hasFailed = false;
  
  for (const log of logs) {
    const smart = getSmartLogStatus(log);
    if (smart.isDone && smart.text === '✅ DONE') {
      hasSuccess = true;
    }
    if (smart.text === '❌ FAILED') {
      hasFailed = true;
    }
  }
  
  const hasInstallSuccess = logs.some(log => log.install_success === true);
  const hasInstallFailed = logs.some(log => log.install_failed === true);
  
  if (hasSuccess || hasInstallSuccess) {
    return { text: '✅ INSTALLED', color: '#2ecc71' };
  } else if (hasFailed || hasInstallFailed) {
    return { text: '❌ FAILED', color: '#e74c3c' };
  } else {
    return { text: '⏸️ PENDING', color: '#95a5a6' };
  }
};

/**
 * Get Status Badge for UI
 */
export const getStatusBadge = (log) => {
  const smart = getSmartLogStatus(log);
  return {
    text: smart.text,
    color: smart.color,
    bg: smart.bg,
    icon: smart.icon
  };
};

/**
 * Get Status Color for UI
 */
export const getStatusColor = (log) => {
  const smart = getSmartLogStatus(log);
  return smart.color;
};

/**
 * Get Stats from Logs
 */
export const getLogStats = (logs) => {
  if (!logs || logs.length === 0) {
    return { total: 0, done: 0, failed: 0, inProgress: 0, pending: 0 };
  }
  
  let done = 0, failed = 0, inProgress = 0, pending = 0;
  
  logs.forEach(log => {
    const smart = getSmartLogStatus(log);
    if (smart.text === '✅ DONE') done++;
    else if (smart.text === '❌ FAILED') failed++;
    else if (smart.text === '⏳ IN PROGRESS') inProgress++;
    else pending++;
  });
  
  return { total: logs.length, done, failed, inProgress, pending };
};

/**
 * Get Status Text from Message (For quick checks)
 */
export const getStatusFromMessage = (msg) => {
  if (!msg) return 'PENDING';
  
  if (msg.includes('not found')) return 'PENDING';
  if (msg.includes('✅') || msg.toLowerCase().includes('success') || msg.toLowerCase().includes('opened')) return 'SUCCESS';
  if (msg.includes('❌') || msg.toLowerCase().includes('failed') || msg.toLowerCase().includes('error')) return 'FAILED';
  if (msg.toLowerCase().includes('vpn') || msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('started')) return 'IN_PROGRESS';
  
  return 'PENDING';
};