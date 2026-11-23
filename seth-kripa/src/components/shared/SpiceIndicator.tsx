import React from 'react';

type SpiceLevel = 'mild' | 'medium' | 'spicy' | 'extra-spicy';

const levels: Record<SpiceLevel, { label: string; count: number; color: string }> = {
  mild:        { label: 'Mild',        count: 1, color: '#16a34a' },
  medium:      { label: 'Medium',      count: 2, color: '#d97706' },
  spicy:       { label: 'Spicy',       count: 3, color: '#dc2626' },
  'extra-spicy': { label: 'Extra Spicy', count: 4, color: '#7c3aed' },
};

const SpiceIndicator: React.FC<{ level: SpiceLevel }> = ({ level }) => {
  const { label, count, color } = levels[level];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }} title={label}>
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} style={{ fontSize: 10, opacity: i < count ? 1 : 0.2, color }}>🌶</span>
      ))}
      <span style={{ fontSize: 11, color, fontWeight: 500, marginLeft: 2 }}>{label}</span>
    </span>
  );
};

export default SpiceIndicator;
