import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Eye, EyeOff, Lock, Mail, AlertTriangle } from 'lucide-react';

export default function Login() {
  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    clearError();

    if (!email || !password) {
      setValidationError('Please fill in all fields.');
      return;
    }

    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'agent') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      // Handled by store
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 flex flex-col items-center justify-center bg-blueprint-grid px-5">
      <div className="w-full max-w-md bg-white border border-line p-8 shadow-draft relative">
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l border-t border-blueprint" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r border-t border-blueprint" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-l border-b border-blueprint" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-r border-b border-blueprint" />

        <div className="text-center mb-8">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-brick block mb-2">
            Access Portal
          </span>
          <h2 className="font-serif text-3xl font-bold text-ink">
            Log in to Meridian
          </h2>
          <p className="text-xs text-ink-soft font-mono mt-1">
            Enter your credentials below
          </p>
        </div>

        {/* Errors */}
        {(error || validationError) && (
          <div className="mb-6 p-4 bg-brick/10 border border-brick text-brick text-xs font-mono flex items-start gap-2.5">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <div>{error || validationError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div className="space-y-1.5">
            <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-line">
                <Mail size={16} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-paper/30 border border-line pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blueprint focus:bg-white transition-all font-mono"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-line">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-paper/30 border border-line pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-blueprint focus:bg-white transition-all font-mono"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-line hover:text-ink-soft"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-ink hover:bg-blueprint-deep text-white py-3 font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[3px_3px_0px_0px_rgba(26,71,137,0.4)] disabled:opacity-50 disabled:shadow-none cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-line text-center">
          <p className="text-xs text-ink-soft font-mono">
            Don't have an account?{' '}
            <Link to="/register" className="text-brick hover:underline font-bold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
