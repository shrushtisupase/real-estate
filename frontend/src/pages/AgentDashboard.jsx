import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useLeadStore } from '../store/leadStore';
import { usePropertyStore } from '../store/propertyStore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Layers,
  User,
  DollarSign,
  Plus,
  Briefcase,
  Upload,
  Calendar,
  Save,
  Check,
  AlertCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

const COLUMNS = ['New', 'Contacted', 'Site Visit', 'Negotiation', 'Closed'];

export default function AgentDashboard() {
  const { user } = useAuthStore();
  const { leads, fetchLeads, updateLeadStatus, updateLeadDetails, loading: leadsLoading } = useLeadStore();
  const { createProperty, loading: propLoading } = usePropertyStore();

  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' or 'create-property'
  const [selectedLead, setSelectedLead] = useState(null); // lead details modal
  
  // Lead details edit state
  const [leadNotes, setLeadNotes] = useState('');
  const [leadBudget, setLeadBudget] = useState('');
  const [leadFollowUp, setLeadFollowUp] = useState('');
  const [leadSaveSuccess, setLeadSaveSuccess] = useState(false);

  // Property creation form state
  const [propTitle, setPropTitle] = useState('');
  const [propDescription, setPropDescription] = useState('');
  const [propPrice, setPropPrice] = useState('');
  const [propType, setPropType] = useState('Apartment');
  const [propBeds, setPropBeds] = useState('1');
  const [propBaths, setPropBaths] = useState('1');
  const [propArea, setPropArea] = useState('');
  const [propAddress, setPropAddress] = useState('');
  const [propAmenities, setPropAmenities] = useState('');
  
  const [propImages, setPropImages] = useState([]);
  const [propDocs, setPropDocs] = useState([]);
  
  const [propSuccess, setPropSuccess] = useState(false);
  const [propError, setPropError] = useState('');

  useEffect(() => {
    if (user && user.isVerified) {
      fetchLeads();
    }
  }, [user]);

  // Open lead modal and init form values
  const openLeadModal = (lead) => {
    setSelectedLead(lead);
    setLeadNotes(lead.notes || '');
    setLeadBudget(lead.budget || '');
    setLeadFollowUp(lead.nextFollowUp ? new Date(lead.nextFollowUp).toISOString().split('T')[0] : '');
    setLeadSaveSuccess(false);
  };

  const handleUpdateLeadDetails = async (e) => {
    e.preventDefault();
    try {
      await updateLeadDetails(selectedLead._id, {
        notes: leadNotes,
        budget: leadBudget ? Number(leadBudget) : undefined,
        nextFollowUp: leadFollowUp || undefined,
      });
      setLeadSaveSuccess(true);
      setTimeout(() => setLeadSaveSuccess(false), 3000);
      fetchLeads(); // refresh Kanban cards
    } catch (err) {
      alert(err.message);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    try {
      await updateLeadStatus(draggableId, destination.droppableId);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    setPropError('');
    setPropSuccess(false);

    if (!propTitle || !propDescription || !propPrice || !propAddress) {
      setPropError('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', propTitle);
    formData.append('description', propDescription);
    formData.append('price', propPrice);
    formData.append('propertyType', propType);
    formData.append('bedrooms', propBeds);
    formData.append('bathrooms', propBaths);
    formData.append('area', propArea || '0');
    formData.append('location[address]', propAddress);

    if (propAmenities) {
      const amenitiesArray = propAmenities.split(',').map((x) => x.trim()).filter(Boolean);
      amenitiesArray.forEach((amenity) => {
        formData.append('amenities[]', amenity);
      });
    }

    for (let i = 0; i < propImages.length; i++) {
      formData.append('images', propImages[i]);
    }
    for (let i = 0; i < propDocs.length; i++) {
      formData.append('documents', propDocs[i]);
    }

    try {
      await createProperty(formData);
      setPropSuccess(true);
      
      // Reset form
      setPropTitle('');
      setPropDescription('');
      setPropPrice('');
      setPropType('Apartment');
      setPropBeds('1');
      setPropBaths('1');
      setPropArea('');
      setPropAddress('');
      setPropAmenities('');
      setPropImages([]);
      setPropDocs([]);
      
      // Clear file inputs manually
      document.getElementById('images-file').value = '';
      document.getElementById('docs-file').value = '';
    } catch (err) {
      setPropError(err.message || 'Failed to submit property listing.');
    }
  };

  // Block dashboard if unverified agent
  if (user && !user.isVerified) {
    return (
      <div className="min-h-screen bg-paper pt-28 pb-12 flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-lg bg-white border border-brick p-8 shadow-draft text-center relative">
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l border-t border-brick" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r border-t border-brick" />
          
          <AlertCircle size={48} className="text-brick mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-ink">Verification Required</h2>
          <p className="text-sm font-mono text-ink-soft mt-3 mb-6 leading-relaxed">
            Your agent account is currently <strong>Pending Verification</strong>.
            An administrator must review your application and approve it before you can access the Kanban CRM or publish listings.
          </p>
          <div className="text-[10px] font-mono text-ink-soft/70 border-t border-line pt-4 bg-paper/30 p-3">
            Registered: {new Date(user.createdAt || Date.now()).toLocaleDateString()} · Status: Pending Approval
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-dark pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        
        {/* Profile Card Summary */}
        <div className="bg-white border border-line p-6 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-blueprint" />
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blueprint/10 text-blueprint border border-blueprint/20">
              <Briefcase size={24} />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-ink-soft">Verified Agent</span>
              <h1 className="font-serif text-2xl font-bold text-ink">{user?.name}</h1>
              <p className="text-xs font-mono text-ink-soft">{user?.email}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                activeTab === 'kanban'
                  ? 'border-blueprint bg-blueprint/10 text-blueprint font-bold'
                  : 'border-line text-ink-soft hover:bg-paper/50 bg-white'
              }`}
            >
              Kanban CRM Board
            </button>
            <button
              onClick={() => setActiveTab('create-property')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                activeTab === 'create-property'
                  ? 'border-blueprint bg-blueprint/10 text-blueprint font-bold'
                  : 'border-line text-ink-soft hover:bg-paper/50 bg-white'
              }`}
            >
              Publish Listing
            </button>
          </div>
        </div>

        {/* Tab Content 1: Kanban Board */}
        {activeTab === 'kanban' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-ink">Lead Management</h2>
              <span className="text-xs font-mono text-ink-soft bg-white border border-line px-2.5 py-1">
                Drag-and-drop to update pipeline
              </span>
            </div>

            {leadsLoading ? (
              <div className="py-24 text-center bg-white border border-line">
                <div className="w-8 h-8 border-4 border-blueprint border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="font-mono text-xs text-ink-soft">Loading lead cards...</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
                  
                  {COLUMNS.map((colName) => {
                    const colLeads = leads.filter((l) => l.status === colName);
                    return (
                      <div key={colName} className="bg-paper border border-line shadow-sm min-w-[220px]">
                        
                        {/* Column Header */}
                        <div className="p-3 bg-white border-b border-line flex justify-between items-center">
                          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-ink-soft">
                            {colName}
                          </span>
                          <span className="bg-paper-dark text-ink font-mono text-[10px] px-2 py-0.5 font-bold border border-line">
                            {colLeads.length}
                          </span>
                        </div>

                        {/* Droppable Area */}
                        <Droppable droppableId={colName}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`p-3 min-h-[400px] transition-colors space-y-3 ${
                                snapshot.isDraggingOver ? 'bg-blueprint-grid/20' : 'bg-transparent'
                              }`}
                            >
                              {colLeads.map((lead, index) => (
                                <Draggable key={lead._id} draggableId={lead._id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      onClick={() => openLeadModal(lead)}
                                      className={`bg-white border p-4 shadow-sm hover:border-blueprint cursor-grab transition-all relative ${
                                        snapshot.isDragging ? 'shadow-draft border-blueprint bg-blueprint/5 rotate-1' : 'border-line'
                                      }`}
                                    >
                                      {/* Visual strip indicator */}
                                      <div className={`absolute top-0 left-0 w-full h-1 ${
                                        colName === 'Closed' ? 'bg-blueprint' : colName === 'Negotiation' ? 'bg-brass' : 'bg-brick'
                                      }`} />

                                      <div className="font-mono text-[9px] text-ink-soft/70 mb-1 flex justify-between">
                                        <span>#{lead._id.slice(-6).toUpperCase()}</span>
                                        <span>{lead.source}</span>
                                      </div>

                                      <h4 className="font-serif text-sm font-bold text-ink mb-1 truncate">
                                        {lead.buyerName}
                                      </h4>

                                      <p className="text-[10px] font-mono text-ink-soft truncate mb-3">
                                        {lead.propertyId?.title || 'Unknown Property'}
                                      </p>

                                      <div className="flex items-center justify-between border-t border-line/50 pt-2.5 font-mono text-[9px] text-ink-soft">
                                        {lead.budget ? (
                                          <span className="font-bold text-ink">${lead.budget.toLocaleString()}</span>
                                        ) : (
                                          <span>Budget: N/A</span>
                                        )}
                                        {lead.nextFollowUp && (
                                          <span className="flex items-center gap-0.5 text-brick">
                                            <Clock size={10} />
                                            {new Date(lead.nextFollowUp).toLocaleDateString()}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>

                      </div>
                    );
                  })}

                </div>
              </DragDropContext>
            )}
          </div>
        )}

        {/* Tab Content 2: Create Property Form */}
        {activeTab === 'create-property' && (
          <div className="max-w-3xl mx-auto bg-white border border-line p-6 sm:p-8 shadow-draft relative">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l border-t border-blueprint" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r border-t border-blueprint" />
            
            <div className="border-b border-line pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-brick block mb-1">List Property</span>
              <h2 className="font-serif text-2xl font-bold text-ink">Publish New Listing</h2>
              <p className="text-xs text-ink-soft font-mono mt-1">Provide blueprints and verify parameters</p>
            </div>

            {propSuccess && (
              <div className="mb-6 p-4 bg-blueprint/10 border border-blueprint text-blueprint text-xs font-mono flex items-start gap-2.5">
                <Check size={16} className="shrink-0 mt-0.5" />
                <div>Listing created successfully! Your property is now available on the public grid.</div>
              </div>
            )}

            {propError && (
              <div className="mb-6 p-4 bg-brick/10 border border-brick text-brick text-xs font-mono flex items-start gap-2.5">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <div>{propError}</div>
              </div>
            )}

            <form onSubmit={handleCreateProperty} className="space-y-5">
              
              {/* Title */}
              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">Title *</label>
                <input
                  type="text"
                  value={propTitle}
                  onChange={(e) => setPropTitle(e.target.value)}
                  placeholder="e.g. Modern Floor 3 Apartment"
                  className="w-full bg-paper/30 border border-line px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">Description (Min 20 characters) *</label>
                <textarea
                  value={propDescription}
                  onChange={(e) => setPropDescription(e.target.value)}
                  rows={4}
                  placeholder="Provide details about structural integrity, walkability, light angles..."
                  className="w-full bg-paper/30 border border-line px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                  required
                />
              </div>

              {/* Grid 3 col (Price, Type, Size) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">Price ($) *</label>
                  <input
                    type="number"
                    value={propPrice}
                    onChange={(e) => setPropPrice(e.target.value)}
                    placeholder="e.g. 1850000"
                    className="w-full bg-paper/30 border border-line px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">Property Type</label>
                  <select
                    value={propType}
                    onChange={(e) => setPropType(e.target.value)}
                    className="w-full bg-paper/30 border border-line px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">Size (Sqft)</label>
                  <input
                    type="number"
                    value={propArea}
                    onChange={(e) => setPropArea(e.target.value)}
                    placeholder="e.g. 1250"
                    className="w-full bg-paper/30 border border-line px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                  />
                </div>
              </div>

              {/* Grid 2 col (Beds, Baths) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">Bedrooms</label>
                  <select
                    value={propBeds}
                    onChange={(e) => setPropBeds(e.target.value)}
                    className="w-full bg-paper/30 border border-line px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                  >
                    <option value="0">Studio / 0 Beds</option>
                    <option value="1">1 Bed</option>
                    <option value="2">2 Beds</option>
                    <option value="3">3 Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">Bathrooms</label>
                  <select
                    value={propBaths}
                    onChange={(e) => setPropBaths(e.target.value)}
                    className="w-full bg-paper/30 border border-line px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                  >
                    <option value="0">0 Baths</option>
                    <option value="1">1 Bath</option>
                    <option value="2">2 Baths</option>
                    <option value="3">3+ Baths</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">Address *</label>
                <input
                  type="text"
                  value={propAddress}
                  onChange={(e) => setPropAddress(e.target.value)}
                  placeholder="e.g. 789 Blueprint Street, Sector 2"
                  className="w-full bg-paper/30 border border-line px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                  required
                />
              </div>

              {/* Amenities */}
              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={propAmenities}
                  onChange={(e) => setPropAmenities(e.target.value)}
                  placeholder="e.g. Parking, Elevator, Rooftop access, Commute station"
                  className="w-full bg-paper/30 border border-line px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-blueprint focus:bg-white"
                />
              </div>

              {/* File Uploads (Images & Docs) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-line/60 pt-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
                    Photos (Max 10)
                  </label>
                  <div className="flex items-center justify-center border border-dashed border-line p-4 bg-paper/20">
                    <input
                      id="images-file"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setPropImages(e.target.files)}
                      className="text-xs font-mono text-ink-soft file:bg-paper file:border file:border-line file:px-2 file:py-1 file:text-xs file:font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
                    Verification Documents (Max 5)
                  </label>
                  <div className="flex items-center justify-center border border-dashed border-line p-4 bg-paper/20">
                    <input
                      id="docs-file"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,image/*"
                      onChange={(e) => setPropDocs(e.target.files)}
                      className="text-xs font-mono text-ink-soft file:bg-paper file:border file:border-line file:px-2 file:py-1 file:text-xs file:font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={propLoading}
                className="w-full mt-4 bg-blueprint hover:bg-blueprint-deep text-white py-3 font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-solid disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload size={14} />
                {propLoading ? 'Uploading parameters & files to Cloudinary...' : 'Publish Listing'}
              </button>

            </form>
          </div>
        )}

      </div>

      {/* Kanban details modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[100] flex items-center justify-center p-5">
          <div className="w-full max-w-lg bg-white border border-line p-6 shadow-draft relative">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l border-t border-blueprint" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r border-t border-blueprint" />
            
            <div className="flex justify-between items-start border-b border-line pb-3 mb-5">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-brick">
                  Pipeline Record
                </span>
                <h3 className="font-serif text-xl font-bold text-ink">Lead Details</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-ink-soft hover:text-ink font-mono text-xs border border-line px-2 py-0.5 bg-paper/30"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleUpdateLeadDetails} className="space-y-4">
              
              {/* Buyer info read-only */}
              <div className="grid grid-cols-2 gap-4 bg-paper/40 p-3 border border-line/60 font-mono text-[10px] text-ink-soft">
                <div className="space-y-1">
                  <span>Buyer:</span>
                  <div className="font-bold text-ink text-xs">{selectedLead.buyerName}</div>
                </div>
                <div className="space-y-1">
                  <span>Email:</span>
                  <div className="font-bold text-ink truncate">{selectedLead.buyerEmail}</div>
                </div>
                <div className="space-y-1">
                  <span>Phone:</span>
                  <div className="font-bold text-ink">{selectedLead.buyerPhone || 'N/A'}</div>
                </div>
                <div className="space-y-1">
                  <span>Source:</span>
                  <div className="font-bold text-ink">{selectedLead.source}</div>
                </div>
              </div>

              {/* Associated Property */}
              <div className="p-3 border border-line bg-blueprint-grid/5 font-mono text-[10px] text-ink-soft">
                <span className="text-[9px] uppercase text-blueprint block mb-1">Target Property</span>
                <div className="font-serif font-bold text-ink text-xs line-clamp-1">
                  {selectedLead.propertyId?.title || 'Unknown Property'}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span>Address: {selectedLead.propertyId?.location?.address || 'N/A'}</span>
                  {selectedLead.propertyId && (
                    <Link
                      to={`/properties/${selectedLead.propertyId._id}`}
                      target="_blank"
                      className="text-blueprint flex items-center gap-0.5 hover:underline"
                    >
                      Inspect <ExternalLink size={10} />
                    </Link>
                  )}
                </div>
              </div>

              {/* Form Save success notify */}
              {leadSaveSuccess && (
                <div className="p-2 bg-blueprint/10 border border-blueprint text-blueprint text-[10px] font-mono">
                  Lead details updated successfully!
                </div>
              )}

              {/* Budget edit */}
              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase text-ink-soft">Buyer Budget ($)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-line">
                    <DollarSign size={12} />
                  </span>
                  <input
                    type="number"
                    value={leadBudget}
                    onChange={(e) => setLeadBudget(e.target.value)}
                    className="w-full bg-paper/30 border border-line pl-8 pr-3 py-1.5 text-xs font-mono focus:outline-none focus:border-blueprint"
                    placeholder="e.g. 1500000"
                  />
                </div>
              </div>

              {/* Next Follow Up edit */}
              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase text-ink-soft">Next Follow Up Date</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-line">
                    <Calendar size={12} />
                  </span>
                  <input
                    type="date"
                    value={leadFollowUp}
                    onChange={(e) => setLeadFollowUp(e.target.value)}
                    className="w-full bg-paper/30 border border-line pl-8 pr-3 py-1.5 text-xs font-mono focus:outline-none focus:border-blueprint"
                  />
                </div>
              </div>

              {/* Notes edit */}
              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase text-ink-soft">Interaction Notes</label>
                <textarea
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-paper/30 border border-line px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-blueprint"
                  placeholder="Record visit outcomes, negotiation items..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-ink hover:bg-blueprint-deep text-white py-2.5 font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[2px_2px_0px_0px_rgba(26,71,137,0.4)] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Save size={12} />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2.5 border border-line hover:bg-paper/50 font-mono text-xs uppercase tracking-widest text-ink-soft bg-white"
                >
                  Close
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
