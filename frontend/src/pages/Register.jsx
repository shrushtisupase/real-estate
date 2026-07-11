import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { User, Mail, Lock, Phone, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function Register() {
  const { register, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('buyer'); // Defaults to buyer
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    clearError();

    if (!name || !email || !password) {
      setValidationError('Please fill in all required fields.');
      return;
    }

    try {
      const user = await register(name, email, password, phone || undefined, role);
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
            Scaffolding Profile
          </span>
          <h2 className="font-serif text-3xl font-bold text-ink">
            Create Account
          </h2>
          <p className="text-xs text-ink-soft font-mono mt-1">
            Join the Meridian platform
          </p>
        </div>

        {/* Error notification */}
        {(error || validationError) && (
          <div className="mb-6 p-4 bg-brick/10 border border-brick text-brick text-xs font-mono flex items-start gap-2.5">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <div>{error || validationError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
              Full Name *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-line">
                <User size={16} />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-paper/30 border border-line pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blueprint focus:bg-white transition-all font-mono"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
              Email Address *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-line">
                <Mail size={16} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-paper/30 border border-line pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blueprint focus:bg-white transition-all font-mono"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-line">
                <Phone size={16} />
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-paper/30 border border-line pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blueprint focus:bg-white transition-all font-mono"
                placeholder="9998887777"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
              Password *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-line">
                <Lock size={16} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-paper/30 border border-line pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blueprint focus:bg-white transition-all font-mono"
                placeholder="Min 6 characters"
                required
              />
            </div>
          </div>

          {/* Role selector */}
          <div className="space-y-1.5 pt-1">
            <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`py-2 px-3 border text-xs font-mono uppercase tracking-wider transition-all ${
                  role === 'buyer'
                    ? 'border-blueprint bg-blueprint/10 text-blueprint font-bold shadow-sm'
                    : 'border-line text-ink-soft hover:bg-paper/50'
                }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => setRole('agent')}
                className={`py-2 px-3 border text-xs font-mono uppercase tracking-wider transition-all ${
                  role === 'agent'
                    ? 'border-blueprint bg-blueprint/10 text-blueprint font-bold shadow-sm'
                    : 'border-line text-ink-soft hover:bg-paper/50'
                }`}
              >
                Agent
              </button>
            </div>
          </div>

          {/* Agent notice */}
          {role === 'agent' && (
            <div className="p-3 bg-brass/10 border border-brass/30 text-[11px] font-mono text-ink-soft flex gap-2">
              <ShieldAlert size={16} className="text-brass shrink-0 mt-0.5" />
              <div>
                <strong>Notice:</strong> Agent profiles require manual review and verification by an admin before you can list properties or manage leads.
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-ink hover:bg-blueprint-deep text-white py-3 font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[3px_3px_0px_0px_rgba(26,71,137,0.4)] disabled:opacity-50 disabled:shadow-none cursor-pointer"
          >
            {loading ? 'Registering...' : 'Build Account'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-line text-center">
          <p className="text-xs text-ink-soft font-mono">
            Already have an account?{' '}
            <Link to="/login" className="text-brick hover:underline font-bold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
