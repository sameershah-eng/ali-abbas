import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { EscalationTicket } from '../../types';
import {
  AlertOctagon,
  CheckCircle2,
  Clock,
  UserCheck,
  Phone,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const HumanHandoff: React.FC = () => {
  const { escalations, takeOverEscalation, resolveEscalation } = useStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'resolved'>('all');

  const filtered = escalations.filter((e) => (filter === 'all' ? true : e.status === filter));

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section A · Customer Communication</span>
            <span>·</span>
            <span>Human Handoff</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Escalation & Supervisor Takeover Queue
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Automatic triggers route warranty disputes, complex multi-VRF errors, and disgruntled calls directly to supervisors
          </p>
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#ECE8E1] rounded-xl text-xs">
          {(['all', 'pending', 'in_progress', 'resolved'] as const).map((st) => (
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

      {/* Escalation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white border border-[#ECE8E1] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#E5484D]/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      ticket.urgency === 'Critical'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : ticket.urgency === 'High'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {ticket.urgency} Urgency
                  </span>
                  <h3 className="text-sm font-semibold text-[#14161A] mt-2">
                    {ticket.customerName}
                  </h3>
                </div>

                <span className="text-[10px] text-[#9AA0AB] flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> {ticket.timeWaiting}
                </span>
              </div>

              <div className="text-xs font-semibold text-[#E5484D] mt-2">
                {ticket.reason}
              </div>

              <p className="text-xs text-[#5B6170] mt-1.5 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#ECE8E1]">
                {ticket.summary}
              </p>

              <div className="mt-3 text-[11px] text-[#9AA0AB] flex items-center justify-between">
                <span>Phone: <strong className="text-[#14161A] font-mono">{ticket.phone}</strong></span>
                <span className="capitalize">Channel: {ticket.channel}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-[#ECE8E1] flex items-center justify-between gap-2">
              <span className="text-[11px] text-[#5B6170]">
                {ticket.assignedAgent ? (
                  <span className="flex items-center gap-1 font-medium text-[#16A34A]">
                    <UserCheck className="w-3.5 h-3.5" /> Assigned: {ticket.assignedAgent}
                  </span>
                ) : (
                  <span className="text-[#E5484D] font-medium">Unassigned</span>
                )}
              </span>

              <div className="flex items-center gap-2">
                {ticket.status !== 'resolved' ? (
                  <>
                    {!ticket.assignedAgent && (
                      <button
                        onClick={() => takeOverEscalation(ticket.id, 'Bandar Al-Khatib')}
                        className="px-3 py-1.5 bg-[#14161A] text-white text-xs font-medium rounded-lg hover:bg-[#2B303A] transition-colors"
                      >
                        Take Over
                      </button>
                    )}
                    <button
                      onClick={() => resolveEscalation(ticket.id)}
                      className="px-3 py-1.5 bg-[#16A34A] text-white text-xs font-semibold rounded-lg hover:bg-[#15803D] transition-colors"
                    >
                      Resolve
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-[#16A34A] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full p-12 text-center bg-white border border-dashed border-[#ECE8E1] rounded-2xl text-xs text-[#9AA0AB]">
            No escalations matching filter. All customer conversations running autonomously under AI policy.
          </div>
        )}
      </div>
    </div>
  );
};
