import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper relative overflow-hidden pt-16 pb-8 border-t border-line/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
        
        <div className="lg:col-span-1">
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
          <p className="text-paper/70 text-xs sm:text-sm leading-relaxed max-w-xs">
            A listing platform built like a good building: honest bones, clear plans, no surprises at closing.
          </p>
        </div>

        <div>
          <h4 class="font-mono text-[10px] sm:text-xs text-brass uppercase tracking-widest mb-4">Explore</h4>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm text-paper/80">
            <li><a href="#listings" className="hover:text-brass transition-colors py-1 inline-block">Live Listings</a></li>
            <li><a href="#process" className="hover:text-brass transition-colors py-1 inline-block">How it works</a></li>
            <li><a href="#agents" className="hover:text-brass transition-colors py-1 inline-block">List a property</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-mono text-[10px] sm:text-xs text-brass uppercase tracking-widest mb-4">Company</h4>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm text-paper/80">
            <li><a href="#" className="hover:text-brass transition-colors py-1 inline-block">About Us</a></li>
            <li><a href="#" className="hover:text-brass transition-colors py-1 inline-block">Careers (We're hiring)</a></li>
            <li><a href="#" className="hover:text-brass transition-colors py-1 inline-block">Press & Media</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-mono text-[10px] sm:text-xs text-brass uppercase tracking-widest mb-4">Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-white mb-1">12k+</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-paper/50 uppercase tracking-wider">Properties</span>
            </div>
            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-white mb-1">63</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-paper/50 uppercase tracking-wider">Cities</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 text-center sm:text-left">
        <span className="font-mono text-[10px] sm:text-xs text-paper/50">&copy; 2026 Meridian, Inc. All rights reserved.</span>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs text-paper/50">
          <a href="#" className="hover:text-white transition-colors p-1">Privacy</a>
          <a href="#" className="hover:text-white transition-colors p-1">Terms</a>
          <span className="p-1">Rev. Blueprint C</span>
        </div>
      </div>
    </footer>
  );
}
