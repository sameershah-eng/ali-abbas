import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Lead, LeadScore, Channel, Language } from '../../types';
import {
  Users,
  Plus,
  Search,
  Filter,
  Flame,
  CheckCircle2,
  Clock,
  Phone,
  ArrowRight,
  Sparkles,
  MapPin,
  X,
} from 'lucide-react';

export const LeadQualification: React.FC = () => {
  const { leads, addLead, updateLeadStatus } = useStore();
  const [search, setSearch] = useState('');
  const [scoreFilter, setScoreFilter] = useState<'all' | LeadScore>('all');
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [district, setDistrict] = useState('');
  const [requirement, setRequirement] = useState('');
  const [score, setScore] = useState<LeadScore>('Hot');
  const [scoreReason, setScoreReason] = useState('Critical breakdown in extreme ambient heat');
  const [estimatedValue, setEstimatedValue] = useState('2500');
  const [channel, setChannel] = useState<Channel>('whatsapp');

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.customerName.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.requirement.toLowerCase().includes(search.toLowerCase());
    const matchesScore = scoreFilter === 'all' || l.score === scoreFilter;
    return matchesSearch && matchesScore;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !requirement) return;

    addLead({
      customerName: name,
      phone,
      location: `${district || 'Central'}, ${city}`,
      city,
      requirement,
      score,
      scoreReason,
      channel,
      status: 'new',
      estimatedValue: Number(estimatedValue) || 1500,
      preferredLanguage: 'ar',
    });

    setShowModal(false);
    setName('');
    setPhone('');
    setRequirement('');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section A · Customer Communication</span>
            <span>·</span>
            <span>Lead Intake</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Enquiry Collection & Lead Qualification
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Automated lead scoring (Hot / Warm / Cold) based on breakdown severity, equipment type, and budget intent
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs hover:opacity-95 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Manual Lead Intake</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#ECE8E1]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-[#9AA0AB] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search customer, phone, requirement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg text-[#14161A] placeholder-[#9AA0AB] outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[11px] text-[#9AA0AB] mr-1">Score:</span>
          {(['all', 'Hot', 'Warm', 'Cold'] as const).map((sc) => (
            <button
              key={sc}
              onClick={() => setScoreFilter(sc)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                scoreFilter === sc
                  ? 'bg-[#14161A] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5B6170] hover:text-[#14161A]'
              }`}
            >
              {sc}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#9AA0AB] uppercase text-[10px] font-semibold border-b border-[#ECE8E1]">
              <tr>
                <th className="px-4 py-3.5">Customer & Phone</th>
                <th className="px-4 py-3.5">Channel</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">HVAC Requirement</th>
                <th className="px-4 py-3.5">Qualification Score</th>
                <th className="px-4 py-3.5">Est. Value</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-[#14161A]">{lead.customerName}</div>
                    <div className="font-mono text-[11px] text-[#9AA0AB]">{lead.phone}</div>
                  </td>
                  <td className="px-4 py-3.5 capitalize font-medium text-[#5B6170]">{lead.channel}</td>
                  <td className="px-4 py-3.5 text-[#5B6170]">{lead.location}</td>
                  <td className="px-4 py-3.5 max-w-xs">
                    <div className="text-[#14161A] font-medium leading-snug">{lead.requirement}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          lead.score === 'Hot'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : lead.score === 'Warm'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {lead.score}
                      </span>
                      <div className="text-[10px] text-[#9AA0AB] mt-1 max-w-[180px] leading-tight">
                        {lead.scoreReason}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono font-semibold text-[#14161A]">
                    {lead.estimatedValue.toLocaleString()} SAR
                  </td>
                  <td className="px-4 py-3.5">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                      className="text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg px-2 py-1 text-[#14161A] outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => updateLeadStatus(lead.id, 'quoted')}
                      className="px-2.5 py-1 text-xs bg-[#FAF8F5] border border-[#ECE8E1] hover:bg-[#F2EFE9] text-[#14161A] font-medium rounded-lg transition-colors"
                    >
                      Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Intake Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#ECE8E1] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <h3 className="font-serif-display text-lg font-semibold text-[#14161A]">
                Manual Lead Intake & Scoring
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#9AA0AB] hover:text-[#14161A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Customer Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sultan Al-Harbi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Saudi Phone (+966)</label>
                  <input
                    type="text"
                    required
                    placeholder="+966 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">City Hub</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  >
                    <option value="Riyadh">Riyadh</option>
                    <option value="Jeddah">Jeddah</option>
                    <option value="Dammam">Dammam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">District / Neighborhood</label>
                  <input
                    type="text"
                    placeholder="e.g. Hittin, Al Malqa"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#5B6170] font-medium mb-1">HVAC Fault / Requirement</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Carrier ducted unit making grinding noise, burning odor..."
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Lead Score</label>
                  <select
                    value={score}
                    onChange={(e) => setScore(e.target.value as LeadScore)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  >
                    <option value="Hot">Hot (Emergency)</option>
                    <option value="Warm">Warm (Scheduled)</option>
                    <option value="Cold">Cold (Research)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Inbound Channel</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as Channel)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">Phone Call</option>
                    <option value="website">Website</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Estimated SAR</label>
                  <input
                    type="number"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#ECE8E1]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-2 bg-[#FAF8F5] border border-[#ECE8E1] text-[#14161A] rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-thermal-gradient text-white rounded-lg font-semibold hover:opacity-90"
                >
                  Save Lead & Score
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
