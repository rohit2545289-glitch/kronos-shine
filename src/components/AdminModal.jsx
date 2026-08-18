import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../firebase/config';

function AdminModal({ isOpen, onClose, onToast }) {
  const [adminNumber, setAdminNumber] = useState('');
  const [forward, setForward] = useState('true');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const loadSettings = async () => {
    try {
      const settings = await getSettings();
      const num = settings.admin_number || '';
      setAdminNumber(num.replace(/\D/g, '').slice(-10));
      setForward(settings.forward !== undefined ? String(settings.forward) : 'true');
    } catch (err) {
      console.error('Failed to load settings', err);
    }
  };

  const handleNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    setAdminNumber(value);
  };

  const handleSave = async () => {
    if (adminNumber.length !== 10) {
      if (onToast) onToast('❌ Enter 10 digits', 'error');
      return;
    }

    setLoading(true);
    try {
      await updateSettings({
        admin_number: '+91' + adminNumber,
        forward: forward === 'true'
      });
      if (onToast) onToast('✔ CONFIG UPDATED', 'success');
      onClose();
    } catch (err) {
      if (onToast) onToast('❌ UPDATE FAILED', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>⚙ ADMIN CONFIG</h2>
        
        <label>Admin Number (10 digits)</label>
        <input
          type="text"
          placeholder="Enter 10 digits"
          maxLength="10"
          value={adminNumber}
          onChange={handleNumberChange}
        />

        <label>Forward</label>
        <select
          value={forward}
          onChange={(e) => setForward(e.target.value)}
        >
          <option value="true">TRUE</option>
          <option value="false">FALSE</option>
        </select>

        <button 
          className="btn-save" 
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? '⏳ SAVING...' : '💾 SAVE'}
        </button>
        <button 
          className="btn-cancel" 
          onClick={onClose}
          disabled={loading}
        >
          ✕ CANCEL
        </button>
      </div>
    </div>
  );
}

export default AdminModal;