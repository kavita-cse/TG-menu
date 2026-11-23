import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Dish } from '../types';
import VegBadge from './shared/VegBadge';

interface Props {
  dish: Dish;
  index?: number;
  compact?: boolean;
}

const spiceColors: Record<string, string> = {
  mild: '#16a34a', medium: '#d97706', spicy: '#dc2626', 'extra-spicy': '#7c3aed',
};

const FoodCard: React.FC<Props> = ({ dish, index = 0, compact = false }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -5 }}
      onClick={() => navigate(`/dish/${dish.id}`)}
      style={{
        cursor: 'pointer', borderRadius: 16, overflow: 'hidden',
        background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.3s', display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 36px rgba(123,29,46,0.14)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)')}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: compact ? 150 : 190, overflow: 'hidden', flexShrink: 0 }}>
        <motion.img
          src={dish.image}
          alt={dish.name}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />
        {/* Badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {dish.isChefSpecial && (
            <span style={{ background: '#C9A84C', color: '#0F0608', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20, letterSpacing: '0.05em' }}>
              ✦ CHEF'S SPECIAL
            </span>
          )}
          {dish.isPopular && !dish.isChefSpecial && (
            <span style={{ background: '#7B1D2E', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
              POPULAR
            </span>
          )}
        </div>
        {/* Price */}
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          background: 'rgba(28,10,16,0.85)', backdropFilter: 'blur(8px)',
          color: '#C9A84C', fontSize: '1rem', fontWeight: 700,
          padding: '3px 10px', borderRadius: 20,
        }}>
          ₹{dish.price}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '0.85rem 1rem 1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', fontWeight: 600, color: '#1C1C1E', lineHeight: 1.3, flex: 1 }}>
            {dish.name}
          </h3>
          <VegBadge size="sm" />
        </div>

        <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.5, flex: 1, marginBottom: '0.75rem' }}>
          {dish.description.length > 70 ? dish.description.slice(0, 70) + '…' : dish.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: spiceColors[dish.spiceLevel], display: 'inline-block' }} />
            <span style={{ fontSize: '0.72rem', color: '#888', textTransform: 'capitalize' }}>{dish.spiceLevel}</span>
          </div>
          {dish.prepTime && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.72rem', color: '#aaa' }}>
              <Clock size={11} />
              {dish.prepTime}
            </span>
          )}
        </div>

        <button style={{
          marginTop: '0.75rem', background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)',
          color: 'white', border: 'none', borderRadius: 20, padding: '0.5rem',
          fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', width: '100%',
          letterSpacing: '0.03em', transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
