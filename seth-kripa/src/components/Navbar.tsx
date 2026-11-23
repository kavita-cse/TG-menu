import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Explore Menu', to: '/menu' },
  { label: 'About Us', to: '/#about' },
  { label: 'Specialities', to: '/#specialities' },
  { label: 'Gallery', to: '/#gallery' },
  { label: 'Contact', to: '/#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('/#')) {
      e.preventDefault();
      const id = to.replace('/#', '');
      if (location.pathname !== '/') {
        window.location.href = to;
        return;
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(28,28,30,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : 'none',
        transition: 'all 0.4s ease',
        padding: '0 1.5rem',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: '#C9A84C', letterSpacing: '0.03em' }}>
              Seth Kripa
            </span>
            <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 1 }}>
              A Taste Worth Exploring
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              onClick={e => handleHashLink(e as any, link.to)}
              style={{
                color: location.pathname === link.to ? '#C9A84C' : 'rgba(255,255,255,0.85)',
                textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
                letterSpacing: '0.03em', transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
              onMouseLeave={e => (e.currentTarget.style.color = location.pathname === link.to ? '#C9A84C' : 'rgba(255,255,255,0.85)')}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+918878057777"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)',
              color: 'white', padding: '0.45rem 1.1rem', borderRadius: '2rem',
              fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.3s', letterSpacing: '0.02em',
            }}
          >
            <Phone size={13} />
            Call Us
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '0.5rem', display: 'none' }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(20,10,12,0.98)', backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(201,168,76,0.2)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={e => handleHashLink(e as any, link.to)}
                  style={{
                    color: 'rgba(255,255,255,0.9)', textDecoration: 'none',
                    padding: '0.75rem 0', fontSize: '1.1rem', fontWeight: 500,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    display: 'block',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+918878057777"
                style={{
                  marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)',
                  color: 'white', padding: '0.75rem 1.5rem', borderRadius: '2rem',
                  fontWeight: 600, textDecoration: 'none', justifyContent: 'center',
                }}
              >
                <Phone size={16} />
                +91 88780 57777
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.header>
  );
};

export default Navbar;
