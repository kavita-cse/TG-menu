import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Leaf, Heart, Users } from 'lucide-react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import { useMenu } from '../context/MenuContext';
import { galleryImages } from '../data/menuData';

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.5rem' }}>
    ✦ {children} ✦
  </span>
);

const GoldDivider = () => (
  <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #C9A84C, #E2C97E)', borderRadius: 2, margin: '0.75rem auto 0' }} />
);

const Home: React.FC = () => {
  const { categories, popularDishes, chefSpecials } = useMenu();

  return (
    <div>
      <Hero />

      {/* Specialities Banner */}
      <section id="specialities" style={{ background: '#1C1C1E', padding: '1.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem' }}>
          {[
            { icon: Leaf, label: '100% Vegetarian', desc: 'Pure veg menu' },
            { icon: Star, label: 'Premium Quality', desc: 'Fresh ingredients daily' },
            { icon: Heart, label: 'Made with Love', desc: 'Cooked with care' },
            { icon: Users, label: 'Family Dining', desc: 'Perfect for everyone' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color="#C9A84C" />
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>{label}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Categories */}
      <section style={{ background: '#FAF6F0', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel>Explore Categories</SectionLabel>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#1C1C1E' }}>
              What Would You Like Today?
            </h2>
            <GoldDivider />
            <p style={{ color: '#888', marginTop: '1rem', fontSize: '1rem', maxWidth: 500, margin: '1rem auto 0' }}>
              From hearty North Indian classics to crispy Indo-Chinese favourites
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
            {categories.filter(c => c.isActive).sort((a, b) => a.order - b.order).map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/menu" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)',
              color: 'white', padding: '0.85rem 2.5rem', borderRadius: '2rem',
              textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.03em',
            }}>
              View Full Menu →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Chef's Special */}
      {chefSpecials.length > 0 && (
        <section style={{ background: '#1C1C1E', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionLabel>Handpicked for You</SectionLabel>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white' }}>
                Chef's <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Special</span>
              </h2>
              <GoldDivider />
              <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: '1rem' }}>Dishes curated by our kitchen team</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {chefSpecials.map((dish, i) => (
                <FoodCard key={dish.id} dish={dish} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Dishes */}
      {popularDishes.length > 0 && (
        <section style={{ background: '#FAF6F0', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionLabel>Customer Favourites</SectionLabel>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#1C1C1E' }}>
                Most <span style={{ color: '#7B1D2E', fontStyle: 'italic' }}>Loved</span> Dishes
              </h2>
              <GoldDivider />
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {popularDishes.map((dish, i) => (
                <FoodCard key={dish.id} dish={dish} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" style={{ background: '#1C1C1E', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel>Our Story</SectionLabel>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              More Than Just a Meal,{' '}
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>It's an Experience.</span>
            </h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #C9A84C, #E2C97E)', borderRadius: 2, marginBottom: '1.5rem' }} />
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              Seth Kripa is more than a restaurant — it's a celebration of vegetarian cooking at its finest. Located on AB Road in Rau, Indore, we bring together the rich culinary traditions of North India, Punjab and beyond.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              Every dish we prepare reflects our belief that vegetarian food can be bold, vibrant, indulgent and deeply satisfying. We use fresh, quality ingredients and cook with the kind of care that you can taste in every bite.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Whether you're here for a quick breakfast, a family lunch or a special dinner, we promise you'll leave with a full stomach and a happy heart.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '2rem' }}>
              {[
                { label: 'Fresh Ingredients', desc: 'Sourced daily from local markets' },
                { label: 'No MSG', desc: 'Natural flavours only' },
                { label: 'Family Recipes', desc: 'Passed down with love' },
                { label: 'Warm Hospitality', desc: 'We treat you like family' },
              ].map(item => (
                <div key={item.label} style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: '1rem' }}>
                  <div style={{ color: '#C9A84C', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" alt="Restaurant interior" style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 16 }} />
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" alt="Dining ambiance" style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 16, marginTop: 30 }} />
              <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80" alt="Dal Makhani" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 16, marginTop: -30 }} />
              <img src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80" alt="Paneer dish" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 16 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={{ background: '#FAF6F0', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel>Gallery</SectionLabel>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#1C1C1E' }}>
              A Feast for the <span style={{ color: '#7B1D2E', fontStyle: 'italic' }}>Eyes</span>
            </h2>
            <GoldDivider />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {galleryImages.slice(0, 8).map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                style={{ borderRadius: 14, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              >
                <img src={img.url} alt={img.caption} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ background: '#1C1C1E', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Find Us</SectionLabel>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
              Visit <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Seth Kripa</span>
            </h2>
            <GoldDivider />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem', textAlign: 'left' }}>
              {[
                { icon: '📍', title: 'Address', lines: ['AB Road, Pigdamber, Rau,', 'Indore, Madhya Pradesh'] },
                { icon: '📞', title: 'Phone', lines: ['+91 88780 57777'] },
                { icon: '🕐', title: 'Hours', lines: ['Mon – Sun', '7:00 AM – 10:30 PM'] },
                { icon: '🌿', title: 'Cuisine', lines: ['North Indian · Punjabi', 'Chinese · Snacks'] },
              ].map(item => (
                <div key={item.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 16, padding: '1.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <div style={{ color: '#C9A84C', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{item.title}</div>
                  {item.lines.map((l, i) => <div key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.6 }}>{l}</div>)}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(201,168,76,0.2)', height: 300 }}>
              <iframe
                title="Seth Kripa Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.3!2d75.73!3d22.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM5JzAwLjAiTiA3NcKwNDMnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="300" style={{ border: 0, display: 'block' }} loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #7B1D2E, #5A1520)',
        padding: '4rem 1.5rem', textAlign: 'center',
      }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <p style={{ color: '#C9A84C', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>✦ Ready to explore? ✦</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>
            Scan. Explore. Enjoy.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', maxWidth: 450, margin: '0 auto 2rem' }}>
            Scan the QR code on your table to open our digital menu and discover your next favourite dish.
          </p>
          <Link to="/menu" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#C9A84C', color: '#0F0608', padding: '0.9rem 2.5rem',
            borderRadius: '2rem', textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
          }}>
            Open Digital Menu →
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
