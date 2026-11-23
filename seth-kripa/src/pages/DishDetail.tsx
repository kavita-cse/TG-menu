import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import VegBadge from '../components/shared/VegBadge';
import SpiceIndicator from '../components/shared/SpiceIndicator';
import FoodCard from '../components/FoodCard';

const DishDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDishById, getCategoryById, getDishesByCategory } = useMenu();

  const dish = getDishById(id!);
  if (!dish) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 70, background: '#FAF6F0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#1C1C1E', marginBottom: '1rem' }}>Dish not found</h2>
          <Link to="/menu" style={{ color: '#7B1D2E', textDecoration: 'none', fontWeight: 600 }}>← Back to Menu</Link>
        </div>
      </div>
    );
  }

  const category = getCategoryById(dish.categoryId);
  const relatedDishes = getDishesByCategory(dish.categoryId).filter(d => d.id !== dish.id).slice(0, 4);

  const spiceColors: Record<string, string> = {
    mild: '#16a34a', medium: '#d97706', spicy: '#dc2626', 'extra-spicy': '#7c3aed',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FAF6F0', paddingTop: 70 }}>
      {/* Breadcrumb */}
      <div style={{ background: 'white', borderBottom: '1px solid #f0ebe4', padding: '0.75rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#888', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={12} />
          <Link to="/menu" style={{ color: '#888', textDecoration: 'none' }}>Menu</Link>
          {category && (<><ChevronRight size={12} />
            <Link to={`/menu?category=${category.id}`} style={{ color: '#888', textDecoration: 'none' }}>{category.name}</Link>
          </>)}
          <ChevronRight size={12} />
          <span style={{ color: '#1C1C1E', fontWeight: 500 }}>{dish.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: '#7B1D2E', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem', padding: 0 }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', position: 'relative' }}>
              <img
                src={dish.image}
                alt={dish.name}
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                onError={e => {
                  const t = e.currentTarget;
                  t.onerror = null;
                  t.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';
                }}
              />
              {/* Badges */}
              <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
                {dish.isChefSpecial && (
                  <span style={{ background: '#C9A84C', color: '#0F0608', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.05em' }}>
                    ✦ CHEF'S SPECIAL
                  </span>
                )}
                {dish.isPopular && (
                  <span style={{ background: '#7B1D2E', color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
                    POPULAR
                  </span>
                )}
              </div>
            </div>

            {/* Quick info panel */}
            <div style={{ background: 'white', borderRadius: 16, padding: '1.25rem', marginTop: '1.25rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ textAlign: 'center', borderRight: '1px solid #f0ebe4' }}>
                <div style={{ fontSize: '0.72rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Price</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: dish.price > 0 ? '1.75rem' : '1rem', fontWeight: 700, color: '#7B1D2E' }}>
                  {dish.price > 0 ? `₹${dish.price}` : 'Ask server'}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Prep Time</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontWeight: 600, color: '#1C1C1E', fontSize: '1rem' }}>
                  <Clock size={15} />
                  {dish.prepTime || '—'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Category tag */}
            {category && (
              <span style={{ display: 'inline-block', background: '#faf6f0', border: '1px solid #e8dfd4', color: '#7B1D2E', fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px', borderRadius: 20, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                {category.icon} {category.name}
              </span>
            )}

            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#1C1C1E', marginBottom: '0.75rem', lineHeight: 1.2 }}>
              {dish.name}
            </h1>

            {/* Indicators row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <VegBadge />
                <span style={{ fontSize: '0.825rem', color: '#16a34a', fontWeight: 500 }}>Pure Vegetarian</span>
              </div>
              <SpiceIndicator level={dish.spiceLevel} />
            </div>

            {/* Description */}
            <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic' }}>
              "{dish.fullDescription}"
            </p>

            {/* Taste Profile */}
            {dish.tasteProfile && (
              <div style={{ background: 'linear-gradient(135deg, #faf6f0, #f5ede2)', border: '1px solid #e8dfd4', borderRadius: 12, padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.4rem' }}>Taste Profile</div>
                <div style={{ color: '#1C1C1E', fontWeight: 500, fontSize: '0.925rem' }}>{dish.tasteProfile}</div>
              </div>
            )}

            {/* Ingredients */}
            {dish.ingredients.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7B1D2E', marginBottom: '0.6rem' }}>Key Ingredients</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {dish.ingredients.map(ing => (
                    <span key={ing} style={{ background: 'white', border: '1px solid #e8dfd4', color: '#555', padding: '3px 10px', borderRadius: 20, fontSize: '0.8rem' }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preparation */}
            {dish.preparationNote && (
              <div style={{ background: 'rgba(123,29,46,0.04)', border: '1px solid rgba(123,29,46,0.1)', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7B1D2E', marginBottom: '0.4rem' }}>Preparation</div>
                <div style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>{dish.preparationNote}</div>
              </div>
            )}

            {/* Spice detail */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'white', borderRadius: 12, border: '1px solid #f0ebe4' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: spiceColors[dish.spiceLevel], flexShrink: 0 }} />
              <span style={{ fontSize: '0.825rem', color: '#555' }}>
                <strong>Spice Level:</strong> {dish.spiceLevel.charAt(0).toUpperCase() + dish.spiceLevel.slice(1)}
              </span>
            </div>

            {/* Availability */}
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)', borderRadius: 16, textAlign: 'center' }}>
              <div style={{ color: '#C9A84C', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                {dish.isAvailable ? '✓ Available Now' : '✗ Currently Unavailable'}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.825rem' }}>
                Ask your server or place your order at the counter
              </div>
            </div>

            {/* Back to category */}
            {category && (
              <Link
                to={`/menu?category=${category.id}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', color: '#7B1D2E', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}
              >
                ← More from {category.name}
              </Link>
            )}
          </motion.div>
        </div>

        {/* Related dishes */}
        {relatedDishes.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: '#1C1C1E', marginBottom: '1.5rem' }}>
              More from {category?.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {relatedDishes.map((d, i) => <FoodCard key={d.id} dish={d} index={i} compact />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishDetail;
