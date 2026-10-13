import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ServiceContract } from '../../types';
import {
  FileCheck,
  ShieldCheck,
  Calendar,
  Send,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
} from 'lucide-react';

export const ContractsManager: React.FC = () => {
  const { contracts, addToast } = useStore();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = contracts.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSendRenewal = (contract: ServiceContract) => {
    addToast({
      title: 'Renewal Reminder Dispatched',
      message: `Personalized AMC renewal proposal sent to ${contract.contactPerson} via WhatsApp`,
      type: 'quote',
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section B · HVAC Service Support</span>
            <span>·</span>
            <span>Recurring Revenue</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Service Contract (AMC) Management
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Quarterly preventive schedules, villa compounds, cold chains, and guaranteed summer peak priority queue
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#ECE8E1] rounded-xl text-xs">
          {(['all', 'active', 'expiring_soon'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                filter === st
                  ? 'bg-[#14161A] text-white shadow-xs'
                  : 'text-[#5B6170] hover:text-[#14161A]'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#9AA0AB] uppercase text-[10px] font-semibold border-b border-[#ECE8E1]">
              <tr>
                <th className="px-4 py-3.5">Client & Facility</th>
                <th className="px-4 py-3.5">Contract Tier</th>
                <th className="px-4 py-3.5">Units Covered</th>
                <th className="px-4 py-3.5">Quarterly Visits</th>
                <th className="px-4 py-3.5">Expiry Date</th>
                <th className="px-4 py-3.5">Annual Value (SAR)</th>
                <th className="px-4 py-3.5">Peak Season VIP</th>
                <th className="px-4 py-3.5 text-right">Renewal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]">
              {filtered.map((contract) => (
                <tr key={contract.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-[#14161A]">{contract.clientName}</div>
                    <div className="text-[11px] text-[#5B6170]">{contract.facilityType} · {contract.contactPerson}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        contract.tier === 'Premium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {contract.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[#14161A]">
                    {contract.unitsCovered} Units
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium text-[#14161A]">
                        {contract.visitsCompleted} / {contract.visitsPerYear}
                      </span>
                      <div className="w-16 bg-[#ECE8E1] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0EA5B7] h-full rounded-full"
                          style={{
                            width: `${(contract.visitsCompleted / contract.visitsPerYear) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-mono text-[#5B6170]">{contract.expiryDate}</div>
                    {contract.status === 'expiring_soon' && (
                      <span className="text-[10px] text-red-600 font-semibold">Expiring in &lt;30 days</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-[#14161A]">
                    {contract.annualValueSar.toLocaleString()} SAR
                  </td>
                  <td className="px-4 py-3.5">
                    {contract.peakSeasonPriority ? (
                      <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 border border-teal-200 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                        <ShieldCheck className="w-3 h-3" /> 2h SLA Priority
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#9AA0AB]">Standard</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleSendRenewal(contract)}
                      className="px-2.5 py-1 text-xs bg-[#FAF8F5] border border-[#ECE8E1] hover:bg-[#F2EFE9] text-[#14161A] font-medium rounded-lg transition-colors flex items-center gap-1 ml-auto"
                    >
                      <Send className="w-3 h-3 text-[#16A34A]" />
                      <span>Send Renewal</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
