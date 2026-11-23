import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, UtensilsCrossed } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Explore Menu', to: '/menu' },
  { label: 'About', to: '/#about' },
  { label: 'Gallery', to: '/#gallery' },
  { label: 'Contact', to: '/#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('/#')) {
      e.preventDefault();
      setMenuOpen(false);
      const id = to.replace('/#', '');
      if (location.pathname !== '/') {
        window.location.href = to;
        return;
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const bg = scrolled || menuOpen
    ? 'rgba(15,6,8,0.98)'
    : 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)';

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: bg,
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
          transition: 'background 0.35s ease, border-color 0.35s ease',
        }}
      >
        {/* Main header row */}
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 1rem',
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '0.75rem',
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }} onClick={() => setMenuOpen(false)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7B1D2E, #C9A84C)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <UtensilsCrossed size={16} color="white" />
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, color: '#C9A84C', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                  Thade Gopal
                </div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  Pure Vegetarian
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'center' }} className="sk-desktop-nav">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                onClick={e => handleHashLink(e as React.MouseEvent<HTMLAnchorElement>, link.to)}
                style={{
                  color: location.pathname === link.to ? '#C9A84C' : 'rgba(255,255,255,0.85)',
                  textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
                  letterSpacing: '0.02em', transition: 'color 0.2s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = location.pathname === link.to ? '#C9A84C' : 'rgba(255,255,255,0.85)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Call button + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <a
              href="tel:+918878057777"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)',
                color: 'white', padding: '0.42rem 0.9rem', borderRadius: '2rem',
                fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <Phone size={12} />
              <span className="sk-call-text">Call Us</span>
            </a>
            {/* Hamburger — shown only on mobile */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10, cursor: 'pointer', color: 'white',
                width: 40, height: 40,
                display: 'none', // shown via media query
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
              className="sk-hamburger"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{
                background: 'rgba(10,4,6,0.99)',
                borderTop: '1px solid rgba(201,168,76,0.15)',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '0.75rem 1rem 1.5rem' }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={link.to}
                      onClick={e => handleHashLink(e as React.MouseEvent<HTMLAnchorElement>, link.to)}
                      style={{
                        display: 'flex', alignItems: 'center',
                        color: location.pathname === link.to ? '#C9A84C' : 'rgba(255,255,255,0.88)',
                        textDecoration: 'none',
                        padding: '0.9rem 0.5rem',
                        fontSize: '1.05rem', fontWeight: 500,
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {link.label}
                      {location.pathname === link.to && (
                        <span style={{ marginLeft: 'auto', color: '#C9A84C', fontSize: '0.75rem' }}>●</span>
                      )}
                    </Link>
                  </motion.div>
                ))}

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  href="tel:+918878057777"
                  style={{
                    marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)',
                    color: 'white', padding: '0.85rem 1.5rem', borderRadius: '0.75rem',
                    fontWeight: 600, textDecoration: 'none', fontSize: '1rem',
                  }}
                >
                  <Phone size={16} />
                  +91 88780 57777
                </motion.a>

                {/* Restaurant info in drawer */}
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(201,168,76,0.07)', borderRadius: 10, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, textAlign: 'center' }}>
                  Opp. Medicaps University, Rau, Indore, MP
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Responsive styles injected via style tag */}
      <style>{`
        @media (max-width: 768px) {
          .sk-desktop-nav { display: none !important; }
          .sk-hamburger { display: flex !important; }
        }
        @media (max-width: 400px) {
          .sk-call-text { display: none; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
