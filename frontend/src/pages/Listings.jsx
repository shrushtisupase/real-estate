import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePropertyStore } from '../store/propertyStore';
import { Search, MapPin, Bed, Bath, Layers, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function Listings() {
  const { properties, fetchProperties, loading } = usePropertyStore();

  // Filter states
  const [status, setStatus] = useState('Available');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProperties({ status, propertyType: propertyType || undefined, bedrooms: bedrooms || undefined });
  }, [status, propertyType, bedrooms]);

  const filteredProperties = properties.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.location.address.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-paper text-ink pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        
        {/* Header Block */}
        <div className="mb-10 relative">
          <span className="font-mono text-xs uppercase tracking-widest text-brick block mb-2">
            Meridian Directory
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink">
            Active Real Estate Grid
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft font-mono mt-2 max-w-xl">
            Inspect verified layouts, plans, and details. Filter by occupancy status, types, and configurations.
          </p>
        </div>

        {/* Filtering Panel */}
        <div className="bg-white border border-line p-6 shadow-sm mb-12 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Keyword Search */}
            <div className="space-y-1">
              <label className="block font-mono text-[10px] uppercase text-ink-soft">
                Keyword Search
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-line">
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search address, titles..."
                  className="w-full bg-paper/30 border border-line pl-8 pr-3 py-2 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-1">
              <label className="block font-mono text-[10px] uppercase text-ink-soft">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-paper/30 border border-line px-3 py-2 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="space-y-1">
              <label className="block font-mono text-[10px] uppercase text-ink-soft">
                Min Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-paper/30 border border-line px-3 py-2 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
              >
                <option value="">Any Beds</option>
                <option value="0">Studio / 0 Beds</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4+ Beds</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="block font-mono text-[10px] uppercase text-ink-soft">
                Status
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setStatus('Available')}
                  className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                    status === 'Available'
                      ? 'border-blueprint bg-blueprint/10 text-blueprint font-bold'
                      : 'border-line text-ink-soft hover:bg-paper/50'
                  }`}
                >
                  Available
                </button>
                <button
                  onClick={() => setStatus('Reserved')}
                  className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                    status === 'Reserved'
                      ? 'border-blueprint bg-blueprint/10 text-blueprint font-bold'
                      : 'border-line text-ink-soft hover:bg-paper/50'
                  }`}
                >
                  Reserved
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Grid Layout */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white border border-line">
            <div className="w-8 h-8 border-4 border-blueprint border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-mono text-xs text-ink-soft">Loading directory inventory...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-24 bg-white border border-line shadow-sm">
            <HelpCircle size={40} className="text-line mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-ink">No Listings Match</h3>
            <p className="text-xs text-ink-soft font-mono mt-1 max-w-sm mx-auto">
              We couldn't find any listings matching your criteria. Try adjusting filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white border border-line overflow-hidden shadow-sm hover:shadow-draft hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
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
                        <span className="font-mono text-[10px] uppercase mt-2">Plan blueprint verified</span>
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
                    
                    <Link
                      to={`/properties/${property._id}`}
                      className="inline-flex items-center gap-0.5 text-xs font-mono font-bold uppercase tracking-wider text-brick hover:text-brick-deep transition-colors"
                    >
                      Inspect Specs
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
