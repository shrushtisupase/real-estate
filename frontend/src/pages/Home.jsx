import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePropertyStore } from '../store/propertyStore';
import { MapPin, Bed, Bath, Layers, ArrowUpRight, ArrowRight, HelpCircle } from 'lucide-react';

export default function Home() {
  const { properties, fetchProperties, loading } = usePropertyStore();

  useEffect(() => {
    fetchProperties({ status: 'Available' });
  }, []);

  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };
    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [properties]);

  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-paper text-ink">
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 lg:pt-48 lg:pb-0 overflow-hidden bg-blueprint-grid" id="top">
        {/* Drafting Crosshairs */}
        <div className="absolute top-24 left-10 w-4 h-4 border-l border-t border-blueprint opacity-40" />
        <div className="absolute bottom-40 right-10 w-4 h-4 border-r border-b border-blueprint opacity-40" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 font-mono text-xs lg:text-sm tracking-[0.2em] uppercase text-blueprint-deep mb-6">
              <span className="w-8 h-[2px] bg-brick inline-block" />
              Listings verified street by street
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.05] text-ink mb-8 tracking-tight">
              Find your next <br />
              <span className="relative inline-block text-white italic bg-brick px-4 pb-2 pt-1 shadow-solid mt-2 transform -rotate-1">
                address.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-ink-soft max-w-2xl mb-10 leading-relaxed font-light">
              Meridian connects you to homes the way a good contractor reads a building: the bones, the light, the neighbors, the walk to the train. <strong className="font-medium text-ink">No stock photography, no guesswork.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/listings"
                className="inline-flex justify-center items-center gap-2 bg-blueprint hover:bg-blueprint-deep text-white px-8 py-4 rounded-sm font-semibold text-lg transition-all shadow-solid hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none"
              >
                View active listings
                <ArrowRight size={20} />
              </Link>
              <a
                href="#process"
                className="inline-flex justify-center items-center px-8 py-4 font-mono text-sm tracking-wider uppercase font-semibold text-ink border border-ink hover:bg-ink hover:text-paper transition-colors rounded-sm"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Parallax Skyline Decor */}
          <div className="relative mt-20 h-[180px] sm:h-[250px] lg:h-[350px] w-full" aria-hidden="true">
            <svg className="absolute bottom-0 w-[120%] -left-[10%] h-full" viewBox="0 0 1200 250" preserveAspectRatio="none">
              <g fill="#2C4059" opacity="0.6">
                <rect x="0" y="120" width="90" height="130" />
                <rect x="230" y="140" width="70" height="110" />
                <rect x="420" y="50" width="60" height="200" />
                <polygon points="450,50 480,50 465,20" />
                <rect x="640" y="85" width="85" height="165" />
                <rect x="840" y="40" width="70" height="210" />
                <rect x="1060" y="150" width="140" height="100" />
              </g>
              <g fill="#0D1828">
                <rect x="100" y="70" width="120" height="180" />
                <rect x="310" y="100" width="100" height="150" />
                <rect x="490" y="130" width="140" height="120" />
                <rect x="735" y="160" width="95" height="90" />
                <rect x="920" y="105" width="130" height="145" />
              </g>
              <g fill="#DFBD73" className="animate-pulse">
                <rect x="115" y="90" width="12" height="16" />
                <rect x="145" y="90" width="12" height="16" />
                <rect x="115" y="130" width="12" height="16" />
                <rect x="325" y="120" width="10" height="14" />
                <rect x="355" y="120" width="10" height="14" />
                <rect x="510" y="150" width="10" height="14" />
                <rect x="540" y="150" width="10" height="14" />
                <rect x="940" y="130" width="10" height="14" />
              </g>
            </svg>
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brick"></div>
          </div>
        </div>
      </section>

      {/* Build Sequence Section */}
      <section className="py-20 sm:py-24 border-b border-line bg-white relative" id="process">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-line opacity-30" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 relative">
          <div className="max-w-xl mb-16">
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase text-brick mb-4 tracking-widest">
              <Layers size={16} />
              The build sequence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
              Three steps, in order, same as any good project.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="relative border-t border-line pt-8">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-blueprint" />
              <span className="font-mono text-xs font-semibold text-blueprint uppercase tracking-wider block mb-2">
                Phase 01 · Search
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-4">Search by Commute</h3>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                Commute times, natural sunlight levels, square footage, and pricing are compiled dynamically for each location.
              </p>
            </div>
            {/* Step 2 */}
            <div className="relative border-t border-line pt-8">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-blueprint" />
              <span className="font-mono text-xs font-semibold text-blueprint uppercase tracking-wider block mb-2">
                Phase 02 · View
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-4">Tour with the Plan</h3>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                Every listed property features verified photos and a detailed blueprint layout so you can walk in prepared.
              </p>
            </div>
            {/* Step 3 */}
            <div className="relative border-t border-line pt-8">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-blueprint" />
              <span className="font-mono text-xs font-semibold text-blueprint uppercase tracking-wider block mb-2">
                Phase 03 · Secure
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-4">Direct Site Visits</h3>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                Submit visit requests instantly. The platform coordinates paper works, keys, and agent follow-ups in our pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 sm:py-24 bg-paper-dark" id="listings-grid">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase text-blueprint-deep mb-2 tracking-widest block">
                Featured Blueprints
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
                Latest Available Homes
              </h2>
            </div>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-brick hover:text-brick-deep transition-colors"
            >
              Browse Full Grid
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Grid Layout */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-line">
              <div className="w-8 h-8 border-4 border-blueprint border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-mono text-xs text-ink-soft">Loading blueprint data...</p>
            </div>
          ) : featuredProperties.length === 0 ? (
            <div className="text-center py-16 bg-white border border-line shadow-sm">
              <HelpCircle size={40} className="text-line mx-auto mb-4" />
              <h3 className="font-serif text-lg font-bold text-ink">No Listings Found</h3>
              <p className="text-xs text-ink-soft font-mono mt-1 max-w-sm mx-auto">
                No active properties are currently available. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <Link
                  key={property._id}
                  to={`/properties/${property._id}`}
                  className="bg-white border border-line overflow-hidden shadow-sm hover:shadow-draft hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Property Image */}
                    <div className="aspect-[16/10] bg-paper-dark relative overflow-hidden border-b border-line">
                      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-line">
                          <Layers size={36} />
                          <span className="font-mono text-[10px] uppercase mt-2">Floor plan verified only</span>
                        </div>
                      )}
                      
                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3 bg-ink text-white font-mono text-xs px-2.5 py-1 shadow-solid font-semibold">
                        ${property.price.toLocaleString()}
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-3 right-3 bg-white/95 border border-line text-ink font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 shadow-sm">
                        {property.propertyType}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-[10px] text-ink-soft font-mono mb-2">
                        <MapPin size={10} className="text-brick" />
                        <span className="truncate">{property.location.address}</span>
                      </div>
                      
                      <h3 className="font-serif text-lg font-bold text-ink mb-2 group-hover:text-brick transition-colors line-clamp-1">
                        {property.title}
                      </h3>
                      
                      <p className="text-xs text-ink-soft line-clamp-2 leading-relaxed mb-4">
                        {property.description}
                      </p>
                    </div>
                  </div>

                  {/* Foot Specs */}
                  <div className="px-5 pb-5 mt-auto">
                    <div className="flex items-center justify-between border-t border-line/60 pt-4">
                      <div className="flex gap-4 font-mono text-[10px] text-ink-soft">
                        <span className="flex items-center gap-1">
                          <Bed size={12} className="text-blueprint" />
                          <strong>{property.bedrooms}</strong> Bed{property.bedrooms !== 1 && 's'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={12} className="text-blueprint" />
                          <strong>{property.bathrooms}</strong> Bath{property.bathrooms !== 1 && 's'}
                        </span>
                      </div>
                      
                      <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold uppercase tracking-wider text-brick group-hover:text-brick-deep transition-colors">
                        View Details
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Show Browse All CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/listings"
              className="inline-flex justify-center items-center gap-2 bg-ink hover:bg-blueprint-deep text-white px-8 py-4 rounded-sm font-semibold text-xs tracking-wider uppercase font-mono shadow-solid hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none"
            >
              Browse Complete Inventory ({properties.length} homes)
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-draft-pattern bg-paper border-t border-line" id="agents">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="inline-block bg-white border border-line px-8 py-10 shadow-draft w-full sm:w-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-brick mb-4 block">
              For agents &amp; owners
            </span>
            <h2 className="font-serif text-3xl font-bold text-ink mb-6">
              Your foundation starts here.
            </h2>
            <p className="text-sm text-ink-soft max-w-xl mx-auto mb-8 leading-relaxed">
              List a property in minutes. Our system automatically processes your scanning scan uploads, notifies verified agents, and populates Kanban boards instantly.
            </p>
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-ink hover:bg-blueprint-deep text-white px-8 py-4 rounded-sm font-semibold text-xs tracking-wider uppercase font-mono shadow-solid hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none"
            >
              Start Listing Properties
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
