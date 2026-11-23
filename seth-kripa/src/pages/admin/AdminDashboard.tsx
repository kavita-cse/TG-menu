import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, UtensilsCrossed, Tag, QrCode,
  LogOut, Plus, Edit2, Trash2, ChevronDown, ChevronUp, Eye, EyeOff,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMenu } from '../../context/MenuContext';
import { Dish, Category } from '../../types';
import toast from 'react-hot-toast';
import QRGenerator from './QRGenerator';

type Tab = 'dashboard' | 'categories' | 'dishes' | 'qr';

const AdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<Tab>('dashboard');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { categories, dishes, addCategory, updateCategory, deleteCategory, addDish, updateDish, deleteDish } = useMenu();

  const handleLogout = () => { logout(); navigate('/admin'); };

  const totalDishes = dishes.length;
  const availableDishes = dishes.filter(d => d.isAvailable).length;
  const totalCategories = categories.length;
  const popularDishes = dishes.filter(d => d.isPopular).length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0F0608' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: '#160A0D', borderRight: '1px solid rgba(201,168,76,0.12)',
        display: 'flex', flexDirection: 'column', flexShrink: 0,
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: '#C9A84C' }}>Seth Kripa</div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>ADMIN PANEL</div>
        </div>

        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {([
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'categories', label: 'Categories', icon: Tag },
            { id: 'dishes', label: 'Dishes', icon: UtensilsCrossed },
            { id: 'qr', label: 'QR Codes', icon: QrCode },
          ] as { id: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1.5rem', background: tab === id ? 'rgba(201,168,76,0.1)' : 'transparent',
                borderLeft: tab === id ? '3px solid #C9A84C' : '3px solid transparent',
                border: 'none', color: tab === id ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                fontSize: '0.875rem', fontWeight: tab === id ? 600 : 400, cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', background: 'rgba(255,100,100,0.08)', border: '1px solid rgba(255,100,100,0.15)', borderRadius: 10, color: '#ff8a8a', fontSize: '0.825rem', cursor: 'pointer' }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
        {tab === 'dashboard' && <DashboardOverview total={totalDishes} available={availableDishes} totalCats={totalCategories} popular={popularDishes} />}
        {tab === 'categories' && <CategoryManager categories={categories} addCategory={addCategory} updateCategory={updateCategory} deleteCategory={deleteCategory} />}
        {tab === 'dishes' && <DishManager dishes={dishes} categories={categories} addDish={addDish} updateDish={updateDish} deleteDish={deleteDish} />}
        {tab === 'qr' && <QRGenerator />}
      </main>
    </div>
  );
};

// ---- Dashboard Overview ----
const DashboardOverview: React.FC<{ total: number; available: number; totalCats: number; popular: number }> = ({ total, available, totalCats, popular }) => (
  <div>
    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '0.4rem' }}>Dashboard</h1>
    <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '2rem', fontSize: '0.875rem' }}>Overview of Seth Kripa's digital menu</p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      {[
        { label: 'Total Dishes', value: total, color: '#C9A84C', icon: '🍽️' },
        { label: 'Available', value: available, color: '#16a34a', icon: '✅' },
        { label: 'Categories', value: totalCats, color: '#3b82f6', icon: '📋' },
        { label: 'Popular Items', value: popular, color: '#7B1D2E', icon: '⭐' },
      ].map(stat => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.5rem' }}
        >
          <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, fontFamily: 'Playfair Display, serif' }}>{stat.value}</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.825rem', marginTop: '0.25rem' }}>{stat.label}</div>
        </motion.div>
      ))}
    </div>

    <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 14, padding: '1.25rem' }}>
      <div style={{ color: '#C9A84C', fontWeight: 600, marginBottom: '0.4rem' }}>💡 Quick Tips</div>
      <ul style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.8, paddingLeft: '1rem' }}>
        <li>Use the Categories tab to add or reorder menu sections.</li>
        <li>Use the Dishes tab to add new items, update prices or toggle availability.</li>
        <li>Use the QR tab to generate downloadable QR codes for each table.</li>
        <li>All changes are saved instantly to local storage (connect Supabase for production).</li>
      </ul>
    </div>
  </div>
);

// ---- Category Manager ----
const emptyCategory = (): Category => ({
  id: 'cat_' + Date.now(), name: '', description: '', image: '', icon: '🍽️', order: 99, isActive: true,
});

const CategoryManager: React.FC<{
  categories: Category[];
  addCategory: (c: Category) => void;
  updateCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
}> = ({ categories, addCategory, updateCategory, deleteCategory }) => {
  const [form, setForm] = useState<Category | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const save = () => {
    if (!form || !form.name.trim()) return toast.error('Category name required');
    if (editId) { updateCategory(form); toast.success('Category updated'); }
    else { addCategory({ ...form, id: 'cat_' + Date.now() }); toast.success('Category added'); }
    setForm(null); setEditId(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>Categories</h2>
        <button onClick={() => { setForm(emptyCategory()); setEditId(null); }} style={btnStyle}>
          <Plus size={15} /> Add Category
        </button>
      </div>

      {form && (
        <div style={formCard}>
          <h3 style={{ color: 'white', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>{editId ? 'Edit' : 'New'} Category</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            <Field label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
            <Field label="Description" value={form.description} onChange={v => setForm({ ...form, description: v })} />
            <Field label="Icon (emoji)" value={form.icon} onChange={v => setForm({ ...form, icon: v })} />
            <Field label="Image URL" value={form.image} onChange={v => setForm({ ...form, image: v })} />
            <Field label="Order" value={String(form.order)} onChange={v => setForm({ ...form, order: Number(v) })} type="number" />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button onClick={save} style={btnStyle}>Save</button>
            <button onClick={() => { setForm(null); setEditId(null); }} style={cancelBtnStyle}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {categories.sort((a, b) => a.order - b.order).map(cat => (
          <div key={cat.id} style={rowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
              <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
              <div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{cat.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{cat.description}</div>
              </div>
              <span style={{ marginLeft: 'auto', marginRight: '1rem', fontSize: '0.75rem', color: cat.isActive ? '#16a34a' : '#dc2626' }}>
                {cat.isActive ? '● Active' : '● Hidden'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => { updateCategory({ ...cat, isActive: !cat.isActive }); }} style={iconBtn} title="Toggle">
                {cat.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button onClick={() => { setForm({ ...cat }); setEditId(cat.id); }} style={iconBtn} title="Edit">
                <Edit2 size={14} />
              </button>
              <button onClick={() => { if (window.confirm('Delete this category?')) { deleteCategory(cat.id); toast.success('Deleted'); } }} style={{ ...iconBtn, color: '#ff8a8a' }} title="Delete">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- Dish Manager ----
const emptyDish = (categories: Category[]): Dish => ({
  id: 'dish_' + Date.now(), categoryId: categories[0]?.id || '', name: '', price: 0,
  description: '', fullDescription: '', ingredients: [], preparationNote: '', tasteProfile: '',
  spiceLevel: 'mild', isVeg: true, isPopular: false, isChefSpecial: false, isAvailable: true,
  prepTime: '10 min', image: '', tags: [],
});

const DishManager: React.FC<{
  dishes: Dish[]; categories: Category[];
  addDish: (d: Dish) => void; updateDish: (d: Dish) => void; deleteDish: (id: string) => void;
}> = ({ dishes, categories, addDish, updateDish, deleteDish }) => {
  const [form, setForm] = useState<Dish | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filterCat === 'all' ? dishes : dishes.filter(d => d.categoryId === filterCat);

  const save = () => {
    if (!form || !form.name.trim()) return toast.error('Dish name required');
    if (form.price <= 0) return toast.error('Enter a valid price');
    if (editId) { updateDish(form); toast.success('Dish updated'); }
    else { addDish({ ...form, id: 'dish_' + Date.now() }); toast.success('Dish added'); }
    setForm(null); setEditId(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>Dishes</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={selectStyle}>
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button onClick={() => { setForm(emptyDish(categories)); setEditId(null); }} style={btnStyle}>
            <Plus size={15} /> Add Dish
          </button>
        </div>
      </div>

      {form && (
        <div style={formCard}>
          <h3 style={{ color: 'white', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>{editId ? 'Edit' : 'New'} Dish</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            <Field label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
            <Field label="Price (₹)" value={String(form.price)} onChange={v => setForm({ ...form, price: Number(v) })} type="number" />
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} style={selectStyle}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Spice Level</label>
              <select value={form.spiceLevel} onChange={e => setForm({ ...form, spiceLevel: e.target.value as Dish['spiceLevel'] })} style={selectStyle}>
                {['mild', 'medium', 'spicy', 'extra-spicy'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <Field label="Prep Time" value={form.prepTime || ''} onChange={v => setForm({ ...form, prepTime: v })} />
            <Field label="Image URL" value={form.image} onChange={v => setForm({ ...form, image: v })} />
            <Field label="Short Description" value={form.description} onChange={v => setForm({ ...form, description: v })} />
            <Field label="Full Description" value={form.fullDescription} onChange={v => setForm({ ...form, fullDescription: v })} />
            <Field label="Taste Profile" value={form.tasteProfile} onChange={v => setForm({ ...form, tasteProfile: v })} />
            <Field label="Preparation Note" value={form.preparationNote} onChange={v => setForm({ ...form, preparationNote: v })} />
            <Field label="Ingredients (comma-separated)" value={form.ingredients.join(', ')} onChange={v => setForm({ ...form, ingredients: v.split(',').map(s => s.trim()).filter(Boolean) })} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {(['isPopular', 'isChefSpecial', 'isAvailable'] as const).map(key => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.825rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={!!form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })} style={{ accentColor: '#C9A84C' }} />
                {key === 'isPopular' ? 'Popular' : key === 'isChefSpecial' ? "Chef's Special" : 'Available'}
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button onClick={save} style={btnStyle}>Save</button>
            <button onClick={() => { setForm(null); setEditId(null); }} style={cancelBtnStyle}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {filtered.map(dish => {
          const cat = categories.find(c => c.id === dish.categoryId);
          const isExpanded = expandedId === dish.id;
          return (
            <div key={dish.id} style={{ ...rowStyle, flexDirection: 'column', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={dish.image} alt={dish.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{dish.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{cat?.name} · ₹{dish.price}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: dish.isAvailable ? '#16a34a' : '#dc2626' }}>{dish.isAvailable ? '●' : '●'}</span>
                  <button onClick={() => { updateDish({ ...dish, isAvailable: !dish.isAvailable }); }} style={iconBtn} title="Toggle availability">
                    {dish.isAvailable ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => { setForm({ ...dish }); setEditId(dish.id); }} style={iconBtn} title="Edit">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => { if (window.confirm('Delete?')) { deleteDish(dish.id); toast.success('Deleted'); } }} style={{ ...iconBtn, color: '#ff8a8a' }} title="Delete">
                    <Trash2 size={14} />
                  </button>
                  <button onClick={() => setExpandedId(isExpanded ? null : dish.id)} style={{ ...iconBtn, color: 'rgba(255,255,255,0.4)' }}>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>
              {isExpanded && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  <div><strong style={{ color: '#C9A84C' }}>Description:</strong> {dish.description}</div>
                  <div><strong style={{ color: '#C9A84C' }}>Spice:</strong> {dish.spiceLevel}</div>
                  <div><strong style={{ color: '#C9A84C' }}>Tags:</strong> {dish.tags.join(', ')}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---- Shared styles ----
const btnStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)', color: 'white', border: 'none', borderRadius: 10, padding: '0.6rem 1.2rem', fontSize: '0.825rem', fontWeight: 600, cursor: 'pointer' };
const cancelBtnStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '0.6rem 1.2rem', fontSize: '0.825rem', cursor: 'pointer' };
const formCard: React.CSSProperties = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' };
const rowStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '0.9rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' };
const iconBtn: React.CSSProperties = { background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: '0.4rem', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'flex' };
const selectStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0.5rem 0.75rem', color: 'white', fontSize: '0.825rem', cursor: 'pointer', outline: 'none' };
const labelStyle: React.CSSProperties = { color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem', display: 'block' };

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string }> = ({ label, value, onChange, type = 'text' }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)}
      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0.5rem 0.75rem', color: 'white', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
    />
  </div>
);

export default AdminDashboard;
