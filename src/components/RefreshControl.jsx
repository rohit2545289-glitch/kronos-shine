import React, { useState } from 'react';

function RefreshControl({ onRefresh }) {
  const [interval, setInterval] = useState(30);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="refresh-control">
      <button
        className={`refresh-btn ${isRefreshing ? 'spinning' : ''}`}
        onClick={handleRefresh}
        disabled={isRefreshing}
      >
        {isRefreshing ? '⟳' : '⟳'}
      </button>
      <select
        className="refresh-interval"
        value={interval}
        onChange={(e) => setInterval(Number(e.target.value))}
      >
        <option value="10">10s</option>
        <option value="30">30s</option>
        <option value="60">1m</option>
        <option value="120">2m</option>
      </select>
    </div>
  );
}

export default RefreshControl;