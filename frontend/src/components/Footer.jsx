import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper relative overflow-hidden pt-16 pb-8 border-t border-line/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 relative z-10 flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
        
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-8 h-8" viewBox="0 0 48 48">
              <polygon points="6,17 24,6 42,17" fill="#F4F4F0" />
              <rect x="9" y="17" width="30" height="26" rx="1" fill="none" stroke="#F4F4F0" stroke-width="2.4" />
              <rect x="21" y="33" width="6" height="10" fill="#C19B48" />
              <rect x="13" y="21" width="6" height="6" fill="#1A4789" />
              <rect x="29" y="21" width="6" height="6" fill="#1A4789" />
            </svg>
            <span className="font-serif font-bold text-lg text-paper">Meridian</span>
          </div>
          <p className="text-paper/70 text-xs sm:text-sm leading-relaxed mb-6">
            A listing platform built like a good building: honest bones, clear plans, no surprises at closing.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[10px] sm:text-xs text-brass uppercase tracking-widest mb-4 font-bold">Navigation</h4>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm text-paper/80 font-mono">
            <li><a href="/#listings-grid" className="hover:text-brass transition-colors py-1 inline-block">Live Listings</a></li>
            <li><a href="/#process" className="hover:text-brass transition-colors py-1 inline-block">How it works</a></li>
            <li><a href="/#agents" className="hover:text-brass transition-colors py-1 inline-block">List a property</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 text-center sm:text-left">
        <span className="font-mono text-[10px] sm:text-xs text-paper/50">
          Designed and Developed by <strong className="text-paper">Shrushti Supase</strong>
        </span>
        <div className="flex gap-4 font-mono text-[10px] sm:text-xs text-paper/50">
          <a href="https://github.com/shrushtisupase" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <span className="opacity-30">/</span>
          <a href="https://linkedin.com/in/shrushtisupase" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
