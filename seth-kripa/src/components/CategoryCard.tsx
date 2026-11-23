import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';

interface Props {
  category: Category;
  index: number;
}

const CategoryCard: React.FC<Props> = ({ category, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/menu?category=${category.id}`)}
      style={{
        cursor: 'pointer', borderRadius: 16, overflow: 'hidden',
        background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.3s',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 16px 40px rgba(123,29,46,0.18)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)')}
    >
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        <motion.img
          src={category.image}
          alt={category.name}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
          onError={e => {
            const t = e.currentTarget;
            t.onerror = null;
            t.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80';
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(28,10,16,0.6) 0%, transparent 60%)',
        }} />
        <span style={{
          position: 'absolute', top: 10, left: 10,
          fontSize: '1.6rem', lineHeight: 1,
        }}>{category.icon}</span>
      </div>
      <div style={{ padding: '0.9rem 1rem 1rem' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 600, color: '#1C1C1E', marginBottom: '0.3rem' }}>
          {category.name}
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.4 }}>{category.description}</p>
        <div style={{ marginTop: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#7B1D2E', fontSize: '0.78rem', fontWeight: 600 }}>
          Explore <span>→</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
