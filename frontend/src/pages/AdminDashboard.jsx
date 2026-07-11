import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useLeadStore } from '../store/leadStore';
import { Shield, Users, DollarSign, Award, CheckCircle, AlertTriangle, Eye, ShieldCheck, MapPin } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const {
    adminAgents,
    fetchAdminAgents,
    toggleAgentVerification,
    revenue,
    fetchRevenue,
    loading
  } = useLeadStore();

  useEffect(() => {
    fetchAdminAgents();
    fetchRevenue();
  }, []);

  const handleToggleVerify = async (id) => {
    if (window.confirm('Toggle verification status for this agent?')) {
      try {
        await toggleAgentVerification(id);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const averageDealSize = revenue.totalClosedLeads > 0 
    ? Math.round(revenue.totalRevenue / revenue.totalClosedLeads) 
    : 0;

  return (
    <div className="min-h-screen bg-paper-dark pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        
        {/* Admin Header card */}
        <div className="bg-white border border-line p-6 shadow-sm mb-8 flex items-center justify-between relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-blueprint" />
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blueprint/10 text-blueprint border border-blueprint/20">
              <Shield size={24} />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-ink-soft">System Overseer</span>
              <h1 className="font-serif text-2xl font-bold text-ink">Admin Dashboard</h1>
              <p className="text-xs font-mono text-ink-soft">Platform Oversight &amp; Closed Deal Volume</p>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase text-blueprint bg-blueprint/15 border border-blueprint/30 px-2.5 py-1">
            SuperAdmin Account
          </span>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Revenue */}
          <div className="bg-white border border-line p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blueprint-grid opacity-10" />
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">Closed Volume</span>
              <div className="p-1.5 bg-blueprint/10 text-blueprint border border-blueprint/25">
                <DollarSign size={16} />
              </div>
            </div>
            <div>
              <span className="block font-serif text-3xl font-bold text-ink mb-1">
                ${revenue.totalRevenue.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono text-ink-soft">Sum of all closed properties</span>
            </div>
          </div>

          {/* Card 2: Closed Leads */}
          <div className="bg-white border border-line p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blueprint-grid opacity-10" />
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">Closed Deals</span>
              <div className="p-1.5 bg-brick/10 text-brick border border-brick/25">
                <CheckCircle size={16} />
              </div>
            </div>
            <div>
              <span className="block font-serif text-3xl font-bold text-ink mb-1">
                {revenue.totalClosedLeads}
              </span>
              <span className="text-[10px] font-mono text-ink-soft">Deals marked as Closed</span>
            </div>
          </div>

          {/* Card 3: Avg Deal Price */}
          <div className="bg-white border border-line p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blueprint-grid opacity-10" />
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">Average Deal Size</span>
              <div className="p-1.5 bg-brass/10 text-brass border border-brass/25">
                <Award size={16} />
              </div>
            </div>
            <div>
              <span className="block font-serif text-3xl font-bold text-ink mb-1">
                ${averageDealSize.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono text-ink-soft">Average closed property price</span>
            </div>
          </div>

        </div>

        {/* Agent verification board */}
        <div className="bg-white border border-line shadow-sm relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-blueprint" />
          
          <div className="p-5 border-b border-line flex justify-between items-center bg-paper/20">
            <div>
              <h2 className="font-serif text-lg font-bold text-ink">Agent Registry</h2>
              <p className="text-[10px] font-mono text-ink-soft">Manage user verifications and platform listing credentials</p>
            </div>
            <span className="text-[10px] font-mono text-ink-soft border border-line bg-white px-2 py-0.5">
              Agents Registered: {adminAgents.length}
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-4 border-blueprint border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="font-mono text-xs text-ink-soft">Querying database registry...</p>
            </div>
          ) : adminAgents.length === 0 ? (
            <div className="py-16 text-center text-ink-soft font-mono text-xs">
              No registered agents found in system db.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-paper-dark/60 text-ink-soft border-b border-line uppercase tracking-wider text-[9px]">
                    <th className="p-4 font-semibold">Name / ID</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Phone</th>
                    <th className="p-4 font-semibold">Verification Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {adminAgents.map((agent) => (
                    <tr key={agent._id} className="hover:bg-paper/20">
                      <td className="p-4">
                        <div className="font-bold text-ink text-sm font-sans">{agent.name}</div>
                        <div className="text-[9px] text-ink-soft/60">#{agent._id}</div>
                      </td>
                      <td className="p-4 text-ink-soft">{agent.email}</td>
                      <td className="p-4 text-ink-soft">{agent.phone || 'N/A'}</td>
                      <td className="p-4">
                        {agent.isVerified ? (
                          <span className="inline-flex items-center gap-1 bg-blueprint/15 border border-blueprint/30 text-blueprint text-[9px] font-bold px-2 py-0.5 rounded-sm">
                            <ShieldCheck size={10} />
                            VERIFIED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-brick/15 border border-brick/30 text-brick text-[9px] font-bold px-2 py-0.5 rounded-sm animate-pulse">
                            <AlertTriangle size={10} />
                            UNVERIFIED
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleToggleVerify(agent._id)}
                          className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border rounded-sm transition-all cursor-pointer ${
                            agent.isVerified
                              ? 'border-brick hover:bg-brick hover:text-white text-brick bg-white shadow-sm'
                              : 'border-blueprint hover:bg-blueprint hover:text-white text-blueprint bg-white shadow-sm'
                          }`}
                        >
                          {agent.isVerified ? 'Revoke Status' : 'Approve & Verify'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
