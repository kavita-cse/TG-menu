import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import MenuSearch from '../components/MenuSearch';

const Menu: React.FC = () => {
  const { categories, getDishesByCategory, dishes, searchDishes } = useMenu();
  const [searchParams, setSearchParams] = useSearchParams();
  const tableNumber = searchParams.get('table');
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [spiceFilter, setSpiceFilter] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(500);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
      setTimeout(() => document.getElementById('menu-dishes')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [categoryParam]);

  const activeCats = categories.filter(c => c.isActive).sort((a, b) => a.order - b.order);

  const getFilteredDishes = () => {
    let result = activeCategory ? getDishesByCategory(activeCategory) : dishes.filter(d => d.isAvailable);
    if (searchQuery.trim().length > 1) result = searchDishes(searchQuery);
    if (spiceFilter !== 'all') result = result.filter(d => d.spiceLevel === spiceFilter);
    result = result.filter(d => d.price <= priceMax);
    return result;
  };

  const filteredDishes = getFilteredDishes();
  const activeCategoryName = activeCategory ? categories.find(c => c.id === activeCategory)?.name : null;

  return (
    <div style={{ minHeight: '100vh', background: '#FAF6F0', paddingTop: 70 }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1C1C1E, #2C1218)',
        padding: '3rem 1.5rem 2rem',
        borderBottom: '1px solid rgba(201,168,76,0.2)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {tableNumber && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
                color: '#C9A84C', padding: '0.4rem 1rem', borderRadius: '2rem',
                fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              🪑 Table {tableNumber}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}
          >
            Explore Our <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Menu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', fontSize: '1rem' }}
          >
            Discover your next favourite dish.
          </motion.p>

          {/* Search + Filter Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <MenuSearch />
            <button
              onClick={() => setShowFilters(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: showFilters ? '#7B1D2E' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white', padding: '0.6rem 1.2rem', borderRadius: '2rem',
                fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <Filter size={15} />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginTop: '1rem', overflow: 'hidden' }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', paddingTop: '0.5rem' }}>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', marginBottom: '0.4rem', display: 'block' }}>Spice Level</span>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {['all', 'mild', 'medium', 'spicy', 'extra-spicy'].map(s => (
                        <button key={s} onClick={() => setSpiceFilter(s)} style={{
                          padding: '0.3rem 0.9rem', borderRadius: '2rem', fontSize: '0.78rem',
                          fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                          background: spiceFilter === s ? '#C9A84C' : 'rgba(255,255,255,0.1)',
                          color: spiceFilter === s ? '#0F0608' : 'white',
                        }}>
                          {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', marginBottom: '0.4rem', display: 'block' }}>Max Price: ₹{priceMax}</span>
                    <input type="range" min={50} max={500} step={10} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))}
                      style={{ accentColor: '#C9A84C', width: 180 }} />
                  </div>
                  {(spiceFilter !== 'all' || priceMax < 500) && (
                    <button onClick={() => { setSpiceFilter('all'); setPriceMax(500); }} style={{
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      background: 'rgba(123,29,46,0.3)', border: '1px solid rgba(123,29,46,0.5)',
                      color: '#ff8a8a', padding: '0.3rem 0.8rem', borderRadius: '2rem', cursor: 'pointer',
                      fontSize: '0.78rem', fontWeight: 500,
                    }}>
                      <X size={12} /> Clear filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid #f0ebe4', position: 'sticky', top: 70, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '0.25rem', padding: '0.75rem 0', scrollbarWidth: 'none' }}>
            <button
              onClick={() => { setActiveCategory(null); setSearchParams(tableNumber ? { table: tableNumber } : {}); }}
              style={{
                flexShrink: 0, padding: '0.5rem 1.25rem', borderRadius: '2rem',
                fontWeight: 600, fontSize: '0.825rem', cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: !activeCategory ? '#7B1D2E' : '#f5f0eb',
                color: !activeCategory ? 'white' : '#555',
              }}
            >
              All Items
            </button>
            {activeCats.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearchParams({ ...(tableNumber ? { table: tableNumber } : {}), category: cat.id }); }}
                style={{
                  flexShrink: 0, padding: '0.5rem 1.25rem', borderRadius: '2rem',
                  fontWeight: 600, fontSize: '0.825rem', cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                  background: activeCategory === cat.id ? '#7B1D2E' : '#f5f0eb',
                  color: activeCategory === cat.id ? 'white' : '#555',
                }}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {/* Category Grid (when no category selected) */}
        {!activeCategory && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: '#1C1C1E', marginBottom: '1.5rem' }}>
              Browse Categories
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
              {activeCats.map((cat, i) => <CategoryCard key={cat.id} category={cat} index={i} />)}
            </div>
          </div>
        )}

        {/* Dish Grid */}
        <div id="menu-dishes">
          {activeCategory && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: '#1C1C1E' }}>{activeCategoryName}</h2>
                <p style={{ color: '#888', fontSize: '0.875rem' }}>{filteredDishes.length} item{filteredDishes.length !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => { setActiveCategory(null); setSearchParams(tableNumber ? { table: tableNumber } : {}); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f5f0eb', border: 'none', color: '#7B1D2E', padding: '0.5rem 1rem', borderRadius: '2rem', cursor: 'pointer', fontSize: '0.825rem', fontWeight: 600 }}>
                ← All Categories
              </button>
            </div>
          )}

          {filteredDishes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#888' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#555', marginBottom: '0.5rem' }}>No dishes found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <motion.div
              layout
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}
            >
              <AnimatePresence>
                {filteredDishes.map((dish, i) => (
                  <FoodCard key={dish.id} dish={dish} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
