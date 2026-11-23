import React from 'react';

interface VegBadgeProps {
  size?: 'sm' | 'md';
}

const VegBadge: React.FC<VegBadgeProps> = ({ size = 'md' }) => {
  const dim = size === 'sm' ? 14 : 18;
  const dot = size === 'sm' ? 6 : 8;
  return (
    <span
      title="Pure Vegetarian"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: dim, height: dim,
        border: '2px solid #16a34a', borderRadius: 2, flexShrink: 0,
      }}
    >
      <span style={{ width: dot, height: dot, borderRadius: '50%', background: '#16a34a', display: 'block' }} />
    </span>
  );
};

export default VegBadge;
