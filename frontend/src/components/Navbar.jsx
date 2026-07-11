import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Menu, X, LogOut, LayoutDashboard, UserCheck, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.role === 'admin') return '/admin';
    if (user.role === 'agent') return '/dashboard';
    return null;
  };

  const isLinkActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-paper/80 backdrop-blur-md border-b border-line transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 flex items-center justify-between py-4">
        
        {/* Brand/Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-500 group-hover:rotate-90" viewBox="0 0 48 48">
            <polygon points="6,17 24,6 42,17" fill="#0D1828" />
            <rect x="9" y="17" width="30" height="26" rx="1" fill="none" stroke="#0D1828" stroke-width="2.4" />
            <rect x="21" y="33" width="6" height="10" fill="#B4432C" />
            <rect x="13" y="21" width="6" height="6" fill="#1A4789" />
            <rect x="29" y="21" width="6" height="6" fill="#1A4789" />
          </svg>
          <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-ink">
            Meridian
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link
            to="/"
            className={`font-mono text-xs uppercase tracking-widest hover:text-brick relative p-2 ${
              isLinkActive('/') ? 'text-brick font-semibold' : 'text-ink-soft'
            }`}
          >
            Listings
            {isLinkActive('/') && <span className="absolute bottom-1 left-2 w-[calc(100%-16px)] h-[2px] bg-brick"></span>}
          </Link>
          
          {user && (
            <Link
              to={getDashboardLink() || '#'}
              className={`font-mono text-xs uppercase tracking-widest hover:text-brick relative p-2 flex items-center gap-1.5 ${
                isLinkActive('/dashboard') || isLinkActive('/admin') ? 'text-brick font-semibold' : 'text-ink-soft'
              }`}
            >
              <LayoutDashboard size={14} />
              Dashboard
              {(isLinkActive('/dashboard') || isLinkActive('/admin')) && (
                <span className="absolute bottom-1 left-2 w-[calc(100%-16px)] h-[2px] bg-brick"></span>
              )}
            </Link>
          )}
        </nav>

        {/* Actions / Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono bg-paper-dark/50 border border-line px-3 py-1.5 rounded-sm">
                {user.role === 'admin' ? (
                  <Shield size={14} className="text-blueprint" />
                ) : (
                  <UserCheck size={14} className={user.isVerified ? 'text-blueprint' : 'text-brick'} />
                )}
                <span>
                  {user.name} ({user.role})
                  {user.role === 'agent' && !user.isVerified && ' [Pending]'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-paper hover:bg-paper-dark border border-line text-ink px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-widest transition-colors"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="font-mono text-xs uppercase tracking-widest text-ink hover:text-brick px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blueprint hover:bg-blueprint-deep text-white px-5 py-2.5 rounded-sm font-semibold text-xs tracking-widest uppercase transition-all shadow-[2px_2px_0px_0px_rgba(13,24,40,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-ink hover:opacity-75 transition-opacity"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-paper z-[49] pt-24 pb-10 px-5 flex flex-col justify-between overflow-y-auto">
          <nav className="flex flex-col gap-6 font-serif text-3xl font-semibold">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="drawer-link flex items-baseline gap-4 hover:text-brick"
            >
              <span className="font-mono text-sm text-brass">01</span>
              Listings
            </Link>
            
            {user && (
              <Link
                to={getDashboardLink() || '#'}
                onClick={() => setIsOpen(false)}
                className="drawer-link flex items-baseline gap-4 hover:text-brick"
              >
                <span className="font-mono text-sm text-brass">02</span>
                Dashboard
              </Link>
            )}

            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="drawer-link flex items-baseline gap-4 hover:text-brick"
                >
                  <span className="font-mono text-sm text-brass">03</span>
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="drawer-link flex items-baseline gap-4 hover:text-brick"
                >
                  <span className="font-mono text-sm text-brass">04</span>
                  Register
                </Link>
              </>
            )}
          </nav>

          {user && (
            <div className="border-t border-line pt-6 flex flex-col gap-4">
              <div className="font-mono text-xs text-ink-soft">
                Logged in as <strong className="text-ink">{user.name}</strong> ({user.role})
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-center bg-brick hover:bg-brick-deep text-white py-3 rounded-sm font-mono text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
