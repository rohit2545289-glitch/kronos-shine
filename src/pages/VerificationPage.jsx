import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { db } from '../firebase/config';

function VerificationPage() {
  const { deviceId } = useParams();
  const [data, setData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allVerifications, setAllVerifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (deviceId) {
      fetchData();
    }
  }, [deviceId]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // ✅ 1. User Details fetch karo (always)
      const userRef = ref(db, `users_details/${deviceId}`);
      const userSnap = await get(userRef);
      if (userSnap.exists()) {
        setUserDetails(userSnap.val());
      }

      // ✅ 2. Verification data fetch karo
      const verifRef = ref(db, `mobile_verification/${deviceId}`);
      const snap = await get(verifRef);

      if (snap.exists()) {
        const allData = snap.val();
        const verificationsArray = Object.keys(allData).map(key => ({
          id: key,
          ...allData[key]
        }));

        verificationsArray.sort((a, b) => {
          const tsA = a.timestamp ? new Date(a.timestamp.split(' ').reverse().join(' ')).getTime() : 0;
          const tsB = b.timestamp ? new Date(b.timestamp.split(' ').reverse().join(' ')).getTime() : 0;
          return tsB - tsA;
        });

        setAllVerifications(verificationsArray);
        setData(verificationsArray[0] || null);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    if (status === 'Verified') return '#2ecc71';
    if (status === 'Pending') return '#f1c40f';
    if (status === 'Rejected') return '#e74c3c';
    return '#95a5a6';
  };

  const getStatusIcon = (status) => {
    if (status === 'Verified') return '✅';
    if (status === 'Pending') return '⏳';
    if (status === 'Rejected') return '❌';
    return '⚪';
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
        gap: '8px',
        padding: '10px'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          border: '3px solid #e2e8f0',
          borderTopColor: '#6c63ff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}></div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Loading...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
        <span style={{ fontSize: '32px', display: 'block', marginBottom: '4px' }}>❌</span>
        <p style={{ fontSize: '13px' }}>Failed to load data</p>
        <button onClick={fetchData} style={{
          marginTop: '8px',
          padding: '4px 16px',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontSize: '12px'
        }}>Retry</button>
      </div>
    );
  }

  // 📭 Dono empty hain
  if (!data && !userDetails) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
        <span style={{ fontSize: '32px', display: 'block', marginBottom: '4px' }}>📭</span>
        <p style={{ fontSize: '13px' }}>No data found</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '4px 0' }}>

      {/* ✅ User Details Card - Always dikhao agar hai */}
      {userDetails && (
        <div style={{
          background: 'linear-gradient(135deg, #6c63ff, #3b82f6)',
          borderRadius: '8px',
          padding: '8px 12px',
          marginBottom: '8px',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2px 0'
          }}>
            <span style={{ fontSize: '11px', opacity: 0.9, fontWeight: 500 }}>👤 User Name</span>
            <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'monospace' }}>
              {userDetails.name || 'N/A'}
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2px 0'
          }}>
            <span style={{ fontSize: '11px', opacity: 0.9, fontWeight: 500 }}>📞 User Number</span>
            <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'monospace' }}>
              {userDetails.number || 'N/A'}
            </span>
          </div>
        </div>
      )}

      {/* ✅ Verification Data - Sirf tab dikhao jab hai */}
      {data ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px',
          marginBottom: '6px'
        }}>
          <div style={{
            gridColumn: 'span 2',
            background: 'var(--bg-card)',
            borderRadius: '6px',
            padding: '6px 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>📱 Mobile Number</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
              {data.mobileNumber || 'N/A'}
            </span>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '6px',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>🆔 Aadhaar</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace', letterSpacing: '2px' }}>
              {data.aadhaarNumber || 'N/A'}
            </span>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '6px',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>📅 DOB</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {data.dateOfBirth || 'N/A'}
            </span>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '6px',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>👩 Mother</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {data.motherName || 'N/A'}
            </span>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '6px',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>📄 PAN</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace', letterSpacing: '1px' }}>
              {data.panNumber || 'N/A'}
            </span>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '6px',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>📌 Status</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: getStatusColor(data.status) }}>
              {getStatusIcon(data.status)} {data.status || 'Pending'}
            </span>
          </div>

          <div style={{
            gridColumn: 'span 2',
            background: 'var(--bg-card)',
            borderRadius: '6px',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>🕐 Timestamp</span>
            <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)' }}>
              {data.timestamp || 'N/A'}
            </span>
          </div>
        </div>
      ) : (
        /* ✅ Agar verification nahi hai toh message dikhao */
        userDetails && (
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '6px',
            padding: '12px',
            textAlign: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>📭</span>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              No verification data found
            </p>
          </div>
        )
      )}

      {/* ✅ All Verifications */}
      {allVerifications.length > 1 && (
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '6px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          marginTop: '4px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 10px',
            background: 'var(--bg-input)',
            borderBottom: '1px solid var(--border-color)',
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--text-primary)'
          }}>
            <span>📋 All Verifications</span>
            <span style={{
              background: '#6c63ff',
              color: 'white',
              fontSize: '10px',
              padding: '1px 8px',
              borderRadius: '10px'
            }}>
              {allVerifications.length}
            </span>
          </div>
          {allVerifications.map((verification, index) => (
            <div key={verification.id || index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '5px 10px',
              borderBottom: index < allVerifications.length - 1 ? '1px solid var(--border-color)' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>✅</span>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {verification.mobileNumber || 'N/A'}
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 500, color: getStatusColor(verification.status), marginLeft: '6px' }}>
                    {verification.status || 'Pending'}
                  </span>
                </div>
              </div>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                {verification.timestamp || 'N/A'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VerificationPage;