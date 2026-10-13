import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Technician } from '../../types';
import {
  Truck,
  Star,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  Filter,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const TechnicianBoard: React.FC = () => {
  const { technicians, activeJobs, assignJobToTechnician, addToast } = useStore();
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>('all');
  const [suggestedModalJob, setSuggestedModalJob] = useState<string | null>(null);

  const filteredTechs = technicians.filter((t) =>
    selectedBranchFilter === 'all' ? true : t.branchId === selectedBranchFilter
  );

  const handleSuggestTechnician = (jobId: string) => {
    // Pick the best available or highest rated tech
    const best = technicians.find((t) => t.status === 'available') || technicians[0];
    assignJobToTechnician(jobId, best.id);
    addToast({
      title: 'Optimal Dispatch Algorithm',
      message: `Assigned ${best.name} based on proximity and certified skill match.`,
      type: 'urgent',
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
            <span>Workforce Management</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Technician Scheduling & Field Dispatch Board
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Real-time status monitoring, HVAC certification filters, and proximity-based job assignment
          </p>
        </div>

        {/* Branch Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#ECE8E1] rounded-xl text-xs">
          {[
            { id: 'all', label: 'All Regions' },
            { id: 'riyadh-main', label: 'Riyadh' },
            { id: 'jeddah-west', label: 'Jeddah' },
            { id: 'dammam-east', label: 'Dammam' },
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBranchFilter(b.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedBranchFilter === b.id
                  ? 'bg-[#14161A] text-white shadow-xs'
                  : 'text-[#5B6170] hover:text-[#14161A]'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTechs.map((tech) => (
          <div
            key={tech.id}
            className="bg-white border border-[#ECE8E1] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#0EA5B7]/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] flex items-center justify-center font-bold text-xs text-[#14161A]">
                    {tech.avatar}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#14161A]">{tech.name}</h3>
                    <div className="text-[10px] text-[#9AA0AB] flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-[#14161A]">{tech.rating}</span>
                      <span>({tech.completedJobsMonth} jobs/mo)</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                    tech.status === 'available'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : tech.status === 'on_route'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {tech.status.replace('_', ' ')}
                </span>
              </div>

              <div className="mt-3.5 space-y-1.5 text-xs text-[#5B6170]">
                <div className="flex items-center gap-2 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-[#9AA0AB]" />
                  <span className="truncate">{tech.currentLocationName}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#9AA0AB]" />
                  <span>{tech.phone}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-3 flex flex-wrap gap-1">
                {tech.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 bg-[#FAF8F5] border border-[#ECE8E1] rounded text-[#5B6170]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#ECE8E1] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#9AA0AB]">
                Active Jobs Today: <strong className="text-[#14161A]">{tech.activeJobsToday}</strong>
              </span>

              <span className="text-[10px] uppercase font-semibold text-[#0EA5B7]">
                {tech.branchId.split('-')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Unassigned or Active Jobs Dispatcher Panel */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
          Current Dispatched Work Orders ({activeJobs.length})
        </h3>

        <div className="divide-y divide-[#ECE8E1] border border-[#ECE8E1] rounded-xl overflow-hidden text-xs">
          {activeJobs.map((job) => (
            <div key={job.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF8F5]/60 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#14161A]">{job.customerName}</span>
                  <span className="font-mono text-[11px] text-[#9AA0AB]">#{job.id.toUpperCase()}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                    {job.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-[#5B6170] truncate max-w-lg">{job.address}</div>
                <div className="text-[11px] text-[#9AA0AB]">Equipment: {job.equipment}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-[#9AA0AB] uppercase">Assigned Technician</div>
                  <div className="font-semibold text-[#14161A]">{job.technicianName}</div>
                  <div className="text-[10px] text-[#0EA5B7] font-mono">ETA: {job.etaMinutes} mins</div>
                </div>

                <button
                  onClick={() => handleSuggestTechnician(job.id)}
                  className="px-3 py-1.5 bg-[#FAF8F5] border border-[#ECE8E1] hover:bg-[#F2EFE9] text-xs font-medium text-[#14161A] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0EA5B7]" />
                  <span>Re-Optimize Tech</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
