import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react';

const Instagram = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const Facebook = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const Twitter = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);

const Footer: React.FC = () => (
  <footer style={{ background: '#0F0608', color: 'rgba(255,255,255,0.75)', paddingTop: '4rem' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', paddingBottom: '3rem' }}>
        {/* Brand */}
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: '#C9A84C' }}>Thade Gopal</span>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
              A Taste Worth Exploring
            </p>
          </div>
          <p style={{ lineHeight: 1.7, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.25rem' }}>
            A premium vegetarian dining experience in the heart of Indore, crafted with passion and served with love.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#C9A84C', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#0F0608'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#C9A84C', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', marginBottom: '1.25rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Explore Menu', to: '/menu' },
              { label: 'About Us', to: '/#about' },
              { label: 'Gallery', to: '/#gallery' },
              { label: 'Contact', to: '/#contact' },
            ].map(l => (
              <li key={l.label}>
                <Link to={l.to} style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#C9A84C', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', marginBottom: '1.25rem' }}>Contact Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={16} color="#C9A84C" style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>AB Road, Pigdamber, Rau, Indore, Madhya Pradesh, India</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Phone size={16} color="#C9A84C" />
              <a href="tel:+918878057777" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.875rem' }}>+91 88780 57777</a>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Clock size={16} color="#C9A84C" style={{ marginTop: 2, flexShrink: 0 }} />
              <div style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                <div>Mon – Sun</div>
                <div style={{ color: '#C9A84C' }}>7:00 AM – 10:30 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Highlights */}
        <div>
          <h4 style={{ color: '#C9A84C', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', marginBottom: '1.25rem' }}>Our Cuisine</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['North Indian', 'Punjabi', 'Chinese', 'Snacks', 'Breakfast', 'Beverages', 'Desserts'].map(tag => (
              <span key={tag} style={{
                background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)',
                color: '#C9A84C', padding: '0.3rem 0.8rem', borderRadius: '1rem',
                fontSize: '0.75rem', fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/menu" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)',
              color: 'white', padding: '0.6rem 1.5rem', borderRadius: '2rem',
              textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600,
            }}>
              View Full Menu →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '1.5rem 0',
        display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
        justifyContent: 'space-between', alignItems: 'center',
        fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
      }}>
        <span>© {new Date().getFullYear()} Thade Gopal. All rights reserved.</span>
        <span>Crafted with ❤️ for a pure vegetarian experience</span>
        <Link to="/admin" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: '0.75rem' }}>Admin</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
