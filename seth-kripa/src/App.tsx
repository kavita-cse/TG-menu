import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { MenuProvider } from './context/MenuContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const DishDetail = lazy(() => import('./pages/DishDetail'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF6F0' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#7B1D2E', marginBottom: '0.5rem' }}>Thade Gopal</div>
      <div style={{ width: 40, height: 3, background: 'linear-gradient(90deg, #C9A84C, #E2C97E)', borderRadius: 2, margin: '0 auto', animation: 'pulse 1s ease-in-out infinite' }} />
    </div>
  </div>
);

const isAdminRoute = (pathname: string) => pathname.startsWith('/admin');

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const admin = isAdminRoute(location.pathname);

  return (
    <>
      {!admin && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/dish/:id" element={<DishDetail />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute><AdminDashboard /></ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
      {!admin && <Footer />}
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <MenuProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1C1C1E', color: 'white', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12 },
            success: { iconTheme: { primary: '#C9A84C', secondary: '#1C1C1E' } },
          }}
        />
      </MenuProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
