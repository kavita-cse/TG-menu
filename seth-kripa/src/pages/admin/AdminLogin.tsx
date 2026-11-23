import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials. Try admin@sethkripa.com / admin@123');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F0608, #1C1C1E, #2C1218)',
      padding: '1.5rem',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 24, padding: '2.5rem', maxWidth: 400, width: '100%', backdropFilter: 'blur(20px)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 60, height: 60, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Lock size={22} color="#C9A84C" />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '0.4rem' }}>Admin Login</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Seth Kripa Management Panel</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@sethkripa.com"
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '0.75rem 0.75rem 0.75rem 2.5rem', color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '0.75rem 2.5rem 0.75rem 2.5rem', color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
              <button type="button" onClick={() => setShowPwd(o => !o)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            style={{ background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)', color: 'white', border: 'none', borderRadius: 12, padding: '0.85rem', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 10, padding: '0.9rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
          <strong style={{ color: '#C9A84C' }}>Demo credentials:</strong><br />
          Email: admin@sethkripa.com<br />
          Password: admin@123
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
