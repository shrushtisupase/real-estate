import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePropertyStore } from '../store/propertyStore';
import { useLeadStore } from '../store/leadStore';
import { useAuthStore } from '../store/authStore';
import { MapPin, Bed, Bath, Layout, FileText, Send, CheckCircle, ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';

export default function ListingDetails() {
  const { id } = useParams();
  const { currentProperty, fetchPropertyById, loading: propertyLoading, error: propertyError } = usePropertyStore();
  const { createLead, loading: leadLoading } = useLeadStore();
  const { user } = useAuthStore();

  // Form states
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [source, setSource] = useState('Website');

  const [leadSuccess, setLeadSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchPropertyById(id);
  }, [id]);

  // Autofill if user is logged in (and is a buyer or agent)
  useEffect(() => {
    if (user) {
      setBuyerName(user.name || '');
      setBuyerEmail(user.email || '');
      setBuyerPhone(user.phone || '');
    }
  }, [user]);

  if (propertyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper pt-28">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blueprint border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-xs text-ink-soft">Loading property blueprint...</p>
        </div>
      </div>
    );
  }

  if (propertyError || !currentProperty) {
    return (
      <div className="min-h-screen bg-paper pt-28 px-5">
        <div className="max-w-md mx-auto text-center bg-white border border-line p-8 shadow-draft">
          <h3 className="font-serif text-xl font-bold text-ink">Blueprint Not Found</h3>
          <p className="text-xs font-mono text-ink-soft mt-2 mb-6">
            The property listing could not be found or has been archived.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-brick font-bold hover:underline"
          >
            <ArrowLeft size={14} />
            Back to grid
          </Link>
        </div>
      </div>
    );
  }

  const handleRequestVisit = async (e) => {
    e.preventDefault();
    setFormError('');
    setLeadSuccess(false);

    if (!buyerName || !buyerEmail) {
      setFormError('Name and Email are required.');
      return;
    }

    try {
      await createLead({
        buyerName,
        buyerEmail,
        buyerPhone: buyerPhone || undefined,
        propertyId: id,
        budget: budget ? Number(budget) : undefined,
        source,
      });
      setLeadSuccess(true);
      // reset non-autofilled fields
      if (!user) {
        setBuyerName('');
        setBuyerEmail('');
        setBuyerPhone('');
      }
      setBudget('');
    } catch (err) {
      setFormError(err.message || 'Failed to submit site visit request.');
    }
  };

  return (
    <div className="min-h-screen bg-paper-dark pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink hover:text-brick transition-colors"
          >
            <ArrowLeft size={14} />
            Back to listings grid
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Details (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-line p-6 sm:p-8 shadow-sm relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-blueprint" />
              <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-blueprint" />

              {/* Title & Location */}
              <div className="mb-6">
                <span className="font-mono text-[10px] tracking-widest uppercase text-blueprint block mb-2">
                  Unit Specification · {currentProperty.propertyType}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink mb-3">
                  {currentProperty.title}
                </h1>
                <div className="flex items-center gap-1.5 text-xs text-ink-soft font-mono">
                  <MapPin size={12} className="text-brick shrink-0" />
                  <span>{currentProperty.location.address}</span>
                </div>
              </div>

              {/* Price */}
              <div className="inline-block bg-ink text-white font-mono text-xl px-4 py-2 shadow-solid font-semibold mb-8">
                ${currentProperty.price.toLocaleString()}
              </div>

              {/* Image Gallery */}
              <div className="space-y-4 mb-8">
                <div className="aspect-[16/9] bg-paper-dark border border-line relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />
                  {currentProperty.images && currentProperty.images.length > 0 ? (
                    <img
                      src={currentProperty.images[0]}
                      alt={currentProperty.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-line flex flex-col items-center">
                      <Layout size={48} />
                      <span className="font-mono text-xs uppercase mt-2">No photos available</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Grid */}
                {currentProperty.images && currentProperty.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {currentProperty.images.map((img, index) => (
                      <div key={index} className="aspect-[4/3] bg-paper border border-line overflow-hidden">
                        <img src={img} alt={`thumbnail-${index}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4 border-y border-line py-6 mb-8 font-mono text-center">
                <div className="border-r border-line/60">
                  <span className="block text-[10px] text-ink-soft uppercase tracking-wider mb-1">Bedrooms</span>
                  <div className="flex items-center justify-center gap-1.5 text-ink font-bold text-lg">
                    <Bed size={16} className="text-blueprint" />
                    <span>{currentProperty.bedrooms}</span>
                  </div>
                </div>
                <div className="border-r border-line/60">
                  <span className="block text-[10px] text-ink-soft uppercase tracking-wider mb-1">Bathrooms</span>
                  <div className="flex items-center justify-center gap-1.5 text-ink font-bold text-lg">
                    <Bath size={16} className="text-blueprint" />
                    <span>{currentProperty.bathrooms}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] text-ink-soft uppercase tracking-wider mb-1">Area Size</span>
                  <div className="flex items-center justify-center gap-1.5 text-ink font-bold text-lg">
                    <Layout size={16} className="text-blueprint" />
                    <span>{currentProperty.area ? `${currentProperty.area} sqft` : 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-ink-soft border-b border-line pb-2 mb-4">
                  Description & Blueprint Specs
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft whitespace-pre-line">
                  {currentProperty.description}
                </p>
              </div>

              {/* Amenities */}
              {currentProperty.amenities && currentProperty.amenities.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-ink-soft border-b border-line pb-2 mb-4">
                    Key Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {currentProperty.amenities.map((item, index) => (
                      <span
                        key={index}
                        className="bg-paper-dark/60 border border-line text-ink font-mono text-[10px] uppercase px-3 py-1 rounded-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {currentProperty.documents && currentProperty.documents.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-ink-soft border-b border-line pb-2 mb-4">
                    Scans & Verification Files
                  </h3>
                  <div className="space-y-2">
                    {currentProperty.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-paper border border-line hover:border-blueprint transition-colors text-xs font-mono text-blueprint-deep"
                      >
                        <FileText size={16} className="text-blueprint" />
                        <span>Inspect Verification Document {index + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Lead capture form (Right 1 column) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-line p-6 shadow-draft relative sticky top-24">
              <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-blueprint" />
              <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-blueprint" />
              
              <div className="border-b border-line pb-4 mb-6">
                <span className="font-mono text-[9px] uppercase tracking-widest text-brick block mb-1">
                  Scheduler Engine
                </span>
                <h2 className="font-serif text-xl font-bold text-ink">
                  Request Site Visit
                </h2>
                <p className="text-[11px] text-ink-soft font-mono mt-1">
                  Connect direct with listing agent
                </p>
              </div>

              {leadSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle size={48} className="text-blueprint mx-auto" />
                  <h3 className="font-serif text-lg font-bold text-ink">Request Submitted</h3>
                  <p className="text-xs text-ink-soft font-mono leading-relaxed">
                    Your request was recorded. The listing agent has been notified and will follow up with you shortly.
                  </p>
                  <button
                    onClick={() => setLeadSuccess(false)}
                    className="w-full bg-paper hover:bg-paper-dark border border-line py-2 text-xs font-mono uppercase tracking-widest transition-colors font-semibold"
                  >
                    Request Another Visit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRequestVisit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-brick/10 border border-brick text-[11px] font-mono text-brick">
                      {formError}
                    </div>
                  )}

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] uppercase text-ink-soft">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-paper/30 border border-line px-3 py-2 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] uppercase text-ink-soft">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full bg-paper/30 border border-line px-3 py-2 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] uppercase text-ink-soft">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="9998887777"
                      className="w-full bg-paper/30 border border-line px-3 py-2 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                    />
                  </div>

                  {/* Budget */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] uppercase text-ink-soft">
                      Your Budget ($)
                    </label>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. 2400000"
                      className="w-full bg-paper/30 border border-line px-3 py-2 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                    />
                  </div>

                  {/* Source selection */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] uppercase text-ink-soft">
                      Where did you hear about us?
                    </label>
                    <select
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className="w-full bg-paper/30 border border-line px-3 py-2 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                    >
                      <option value="Website">Website Listing</option>
                      <option value="Referral">Friend / Agent Referral</option>
                      <option value="Walk-in">Physical Ad / Walk-in</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={leadLoading}
                    className="w-full mt-2 bg-ink hover:bg-blueprint-deep text-white py-3 font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[3px_3px_0px_0px_rgba(26,71,137,0.4)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send size={12} />
                    {leadLoading ? 'Submitting...' : 'Request Tour'}
                  </button>
                </form>
              )}

              {/* Agent owner details preview */}
              {currentProperty.agentId && (
                <div className="mt-6 pt-6 border-t border-line font-mono text-[10px] text-ink-soft space-y-2">
                  <span className="block uppercase text-blueprint font-bold tracking-wider">Listing Agent</span>
                  <div className="flex flex-col gap-1">
                    <span>Name: <strong>{currentProperty.agentId.name || 'Anonymous Agent'}</strong></span>
                    <span>Email: <strong>{currentProperty.agentId.email}</strong></span>
                    {currentProperty.agentId.phone && (
                      <span>Phone: <strong>{currentProperty.agentId.phone}</strong></span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
