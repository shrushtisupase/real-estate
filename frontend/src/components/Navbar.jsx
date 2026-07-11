import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, LayoutDashboard, UserCheck, Shield, Phone, Mail, MapPin, Clock, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on page navigate
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  const handleScrollTo = (elementId) => (e) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(`/#${elementId}`);
    }
  };

  const handleLogoClick = (e) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-30 bg-paper/85 backdrop-blur-md border-b border-line transition-all duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 flex items-center justify-between py-4">
          
          {/* Brand/Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
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
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/listings"
              className={`font-mono text-xs uppercase tracking-widest hover:text-brick relative p-2 transition-colors duration-200 ${
                isLinkActive('/listings') ? 'text-brick font-semibold' : 'text-ink-soft'
              } after:absolute after:bottom-1 after:left-2 after:right-2 after:h-[2px] after:bg-brick ${
                isLinkActive('/listings') ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
              } after:transition-transform after:duration-300`}
            >
              Listings
            </Link>
            
            <a
              href="#process"
              onClick={handleScrollTo('process')}
              className="font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-brick relative p-2 transition-colors duration-200 after:absolute after:bottom-1 after:left-2 after:right-2 after:h-[2px] after:bg-brick after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              How it Works
            </a>
            
            {user && (
              <Link
                to={getDashboardLink() || '#'}
                className={`font-mono text-xs uppercase tracking-widest hover:text-brick relative p-2 flex items-center gap-1.5 transition-colors duration-200 ${
                  isLinkActive('/dashboard') || isLinkActive('/admin') ? 'text-brick font-semibold' : 'text-ink-soft'
                } after:absolute after:bottom-1 after:left-2 after:right-2 after:h-[2px] after:bg-brick ${
                  isLinkActive('/dashboard') || isLinkActive('/admin') ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                } after:transition-transform after:duration-300`}
              >
                <LayoutDashboard size={14} />
                Dashboard
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
                  className="flex items-center gap-1.5 bg-paper hover:bg-paper-dark border border-line text-ink px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
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

          {/* Animated Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ink hover:text-brick transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-10 h-10 rounded-full border border-transparent hover:border-line"
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span className={`absolute w-6 h-[2px] bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`} />
              <span className={`absolute w-6 h-[2px] bg-current transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-2' : 'opacity-100'}`} />
              <span className={`absolute w-6 h-[2px] bg-current transition-all duration-300 ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-ink/40 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 w-full sm:w-[380px] h-[100dvh] bg-paper border-l border-line z-50 shadow-draft p-6 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Top Brand & Close Button Bar */}
          <div className="flex justify-between items-center pb-4 border-b border-line">
            <span className="font-serif font-bold text-xl text-ink">Meridian</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-ink hover:text-brick transition-colors"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft opacity-60">Navigation</span>
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={handleLogoClick}
                className="font-serif text-2xl font-bold flex items-baseline gap-3 text-ink hover:text-brick transition-colors"
              >
                <span className="font-mono text-xs text-brass">01</span>
                Home
              </Link>
              <Link
                to="/listings"
                onClick={() => setIsOpen(false)}
                className={`font-serif text-2xl font-bold flex items-baseline gap-3 hover:text-brick transition-colors ${
                  isLinkActive('/listings') ? 'text-brick' : 'text-ink'
                }`}
              >
                <span className="font-mono text-xs text-brass">02</span>
                Listings
              </Link>
              <a
                href="#process"
                onClick={handleScrollTo('process')}
                className="font-serif text-2xl font-bold flex items-baseline gap-3 text-ink hover:text-brick transition-colors"
              >
                <span className="font-mono text-xs text-brass">03</span>
                How It Works
              </a>
              
              {user ? (
                <Link
                  to={getDashboardLink() || '#'}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-2xl font-bold flex items-baseline gap-3 text-ink hover:text-brick transition-colors"
                >
                  <span className="font-mono text-xs text-brass">04</span>
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-2xl font-bold flex items-baseline gap-3 text-ink hover:text-brick transition-colors"
                  >
                    <span className="font-mono text-xs text-brass">04</span>
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-2xl font-bold flex items-baseline gap-3 text-ink hover:text-brick transition-colors"
                  >
                    <span className="font-mono text-xs text-brass">05</span>
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Blueprint Specs Visual */}
          <div className="space-y-4 pt-6 border-t border-line">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-brick block mb-1">FOUNDATION DECK // GRID 01</span>
              <h4 className="font-serif text-sm font-bold text-ink">Building brick by brick.</h4>
            </div>
            
            <svg className="w-full h-32 border border-line/50 bg-paper-dark/30 relative overflow-hidden" viewBox="0 0 300 120">
              <defs>
                <pattern id="brick-grid" width="12" height="12" patternUnits="userSpaceOnUse">
                  <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(13, 24, 40, 0.05)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#brick-grid)" />
              
              {/* Row 1 (Bricks) */}
              <rect x="25" y="80" width="50" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />
              <rect x="80" y="80" width="50" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />
              <rect x="135" y="80" width="50" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />
              <rect x="190" y="80" width="50" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />
              <rect x="245" y="80" width="35" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" strokeDasharray="2,2" />
              
              {/* Row 2 (Stacked bricks) */}
              <rect x="10" y="55" width="40" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" strokeDasharray="2,2" />
              <rect x="55" y="55" width="50" height="20" fill="none" stroke="#B4432C" strokeWidth="1.5" />
              <rect x="110" y="55" width="50" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />
              <rect x="165" y="55" width="50" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />
              <rect x="220" y="55" width="50" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />
              <rect x="275" y="55" width="15" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" strokeDasharray="2,2" />

              {/* Row 3 (Top stack) */}
              <rect x="35" y="30" width="50" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />
              <rect x="90" y="30" width="50" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />
              <rect x="145" y="30" width="50" height="20" fill="none" stroke="#B4432C" strokeWidth="1.5" />
              <rect x="200" y="30" width="50" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />
              <rect x="255" y="30" width="20" height="20" fill="none" stroke="#1A4789" strokeWidth="1.2" />

              {/* Blueprint Center Axis Line */}
              <line x1="150" y1="10" x2="150" y2="110" stroke="#B4432C" strokeWidth="1" strokeDasharray="4,4" />
              <circle cx="150" cy="65" r="3" fill="#B4432C" />

              {/* Drafting text label */}
              <text x="155" y="20" fontFamily="monospace" fontSize="6" fill="#B4432C" fontWeight="bold">ALIGNMENT INDEX</text>
              
              {/* Measurement indicators */}
              <line x1="55" y1="108" x2="105" y2="108" stroke="#1A4789" strokeWidth="0.8" />
              <line x1="55" y1="105" x2="55" y2="111" stroke="#1A4789" strokeWidth="0.8" />
              <line x1="105" y1="105" x2="105" y2="111" stroke="#1A4789" strokeWidth="0.8" />
              <text x="80" y="104" fontFamily="monospace" fontSize="6" fill="#1A4789" textAnchor="middle">50.00mm</text>
            </svg>
          </div>
        </div>

        {/* Footer Area with user profile info */}
        <div className="pt-6 border-t border-line mt-8">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-paper-dark/50 border border-line p-3 rounded-sm">
                {user.role === 'admin' ? (
                  <Shield size={18} className="text-blueprint shrink-0" />
                ) : (
                  <UserCheck size={18} className={`${user.isVerified ? 'text-blueprint' : 'text-brick'} shrink-0`} />
                )}
                <div className="truncate">
                  <div className="text-xs font-bold text-ink truncate">{user.name}</div>
                  <div className="text-[10px] font-mono text-ink-soft capitalize">
                    {user.role} {user.role === 'agent' && !user.isVerified && ' (Pending)'}
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-brick hover:bg-brick-deep text-white py-3 rounded-sm font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[2px_2px_0px_rgba(13,24,40,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div className="text-center font-mono text-[9px] text-ink-soft opacity-60">
              Built by Shrushti Supase
            </div>
          )}
        </div>
      </div>
    </>
  );
}
