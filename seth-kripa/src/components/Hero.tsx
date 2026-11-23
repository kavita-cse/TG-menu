import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Background */}
      <div ref={bgRef} style={{
        position: 'absolute', inset: '-20%', zIndex: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=90)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(28,10,16,0.88) 0%, rgba(90,21,32,0.65) 50%, rgba(28,10,16,0.75) 100%)',
      }} />
      {/* Gold grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 1200, margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ display: 'inline-block', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', padding: '0.4rem 1.2rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}
          >
            ✦ Pure Vegetarian Restaurant · Indore
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: 700 }}
          >
            Good Food.{' '}
            <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Great</span>{' '}
            Moments.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', lineHeight: 1.7, maxWidth: 540, marginBottom: '2.5rem' }}
          >
            Discover delicious vegetarian flavours, prepared with passion and served with love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
          >
            <Link to="/menu" className="btn-primary" style={{ fontSize: '0.95rem', padding: '0.85rem 2.2rem' }}>
              Explore Our Menu →
            </Link>
            <a
              href="#about"
              onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-secondary"
              style={{ fontSize: '0.95rem', padding: '0.85rem 2.2rem' }}
            >
              Discover Our Story
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', marginTop: '4rem' }}
          >
            {[
              { num: '100%', label: 'Pure Vegetarian' },
              { num: '50+', label: 'Menu Items' },
              { num: '6+', label: 'Cuisine Styles' },
              { num: '❤️', label: 'Made with Love' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700, color: '#C9A84C', lineHeight: 1 }}>{stat.num}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: 4, letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3, cursor: 'pointer' }}
        onClick={() => document.getElementById('specialities')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={28} color="rgba(255,255,255,0.5)" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
