import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import './DetailPages.css';

function PermissionsPage() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const permRef = ref(db, `permissions/${deviceId}`);
    const unsubscribe = onValue(permRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [deviceId]);

  if (loading) return <div className="page-loading"><div className="loading-spinner"></div><p>Loading...</p></div>;

  const permEntries = data ? Object.entries(data).filter(([key]) => 
    !['timestamp', 'humanTime', 'deviceId', 'androidVersion', 'deviceModel', 'deviceBrand', 'apiLevel', 'totalPermissions', 'grantedCount', 'deniedCount', 'grantedPercentage'].includes(key)
  ) : [];

  return (
    <div className="detail-page">
     

      {data ? (
        <>
          <div className="perm-stats">
            <div className="perm-stat"><span>Total</span><strong>{data.totalPermissions}</strong></div>
            <div className="perm-stat"><span>Granted</span><strong style={{ color: '#2ecc71' }}>{data.grantedCount}</strong></div>
            <div className="perm-stat"><span>Denied</span><strong style={{ color: '#e74c3c' }}>{data.deniedCount}</strong></div>
            <div className="perm-stat"><span>%</span><strong style={{ color: '#f59e0b' }}>{data.grantedPercentage}%</strong></div>
          </div>
          <div className="detail-card">
            {permEntries.map(([key, value]) => (
              <div key={key} className={`detail-row ${value ? 'granted' : 'denied'}`}>
                <span className="label">{key.replace(/_/g, ' ')}</span>
                <span className="value">{value ? '✅ Granted' : '❌ Denied'}</span>
              </div>
            ))}
            <div className="detail-row full">
              <span className="label">📅 {data.humanTime}</span>
              <span className="value">📱 {data.deviceBrand} {data.deviceModel}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">📭 No permissions data found</div>
      )}
    </div>
  );
}

export default PermissionsPage;