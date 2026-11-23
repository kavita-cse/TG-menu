import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import VegBadge from './shared/VegBadge';

const MenuSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const { searchDishes } = useMenu();
  const navigate = useNavigate();

  const results = query.trim().length > 1 ? searchDishes(query).slice(0, 8) : [];

  return (
    <div style={{ position: 'relative', maxWidth: 480, width: '100%' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        background: 'white', border: focused ? '2px solid #7B1D2E' : '2px solid transparent',
        borderRadius: 40, padding: '0.6rem 1.2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        ...(focused ? { boxShadow: '0 4px 20px rgba(123,29,46,0.15)' } : {}),
      }}>
        <Search size={18} color="#7B1D2E" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search dishes, ingredients..."
          style={{
            border: 'none', outline: 'none', flex: 1, fontSize: '0.9rem',
            fontFamily: 'Inter, sans-serif', color: '#1C1C1E', background: 'transparent',
          }}
        />
        {query && (
          <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex', padding: 0 }}>
            <X size={16} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {focused && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
              background: 'white', borderRadius: 16, boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
              overflow: 'hidden', zIndex: 100,
            }}
          >
            {results.map(dish => (
              <div
                key={dish.id}
                onClick={() => { navigate(`/dish/${dish.id}`); setQuery(''); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 1rem', cursor: 'pointer', transition: 'background 0.15s',
                  borderBottom: '1px solid #f5f5f5',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#faf6f0')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <img src={dish.image} alt={dish.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <VegBadge size="sm" />
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1C1C1E' }}>{dish.name}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>{dish.description.slice(0, 50)}…</span>
                </div>
                <span style={{ fontWeight: 700, color: '#7B1D2E', fontSize: '0.875rem', flexShrink: 0 }}>₹{dish.price}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuSearch;
