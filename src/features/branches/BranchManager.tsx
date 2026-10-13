import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Branch } from '../../types';
import {
  Building,
  MapPin,
  Phone,
  Truck,
  Plus,
  CheckCircle2,
  Sliders,
  Sparkles,
} from 'lucide-react';

export const BranchManager: React.FC = () => {
  const { branches, setSelectedBranch, selectedBranch, addToast } = useStore();
  const [selectedHub, setSelectedHub] = useState<string>(branches[0]?.id || 'riyadh-main');

  const activeHub = branches.find((b) => b.id === selectedHub) || branches[0];

  const handleUpdateRouting = () => {
    addToast({
      title: 'Dispatch Routing Rules Saved',
      message: `Geographic geofencing updated for ${activeHub.name}`,
      type: 'info',
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
            <span>Geographic Topology</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Multi-Branch Hubs & Service Areas
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Territory boundaries, district geofences, and intelligent dispatch routing across Riyadh, Jeddah, and Eastern Province
          </p>
        </div>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {branches.map((b) => (
          <div
            key={b.id}
            onClick={() => setSelectedHub(b.id)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              selectedHub === b.id
                ? 'bg-white border-[#0EA5B7] shadow-sm ring-1 ring-[#0EA5B7]/30'
                : 'bg-white border-[#ECE8E1] hover:bg-[#FAF8F5]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold text-[#0EA5B7] uppercase tracking-wider">
                  {b.city} Operations
                </span>
                <h3 className="text-sm font-semibold text-[#14161A] mt-1">{b.name}</h3>
                <div className="text-xs text-[#5B6170] font-arabic mt-0.5" dir="rtl">{b.nameAr}</div>
              </div>
              <Building className="w-5 h-5 text-[#9AA0AB]" />
            </div>

            <div className="mt-4 space-y-2 text-xs text-[#5B6170]">
              <div className="flex items-center justify-between">
                <span>Branch Director:</span>
                <strong className="text-[#14161A]">{b.manager}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Active Field Technicians:</span>
                <strong className="text-[#0EA5B7] font-mono">{b.techniciansCount} Vans</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Direct Hotline:</span>
                <span className="font-mono text-[#14161A]">{b.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#ECE8E1] flex items-center justify-between">
              <span className="text-[10px] text-[#9AA0AB]">{b.coverageZones.length} Key Districts Covered</span>
              {selectedBranch === b.id ? (
                <span className="text-[10px] text-[#16A34A] font-semibold">Active Scope</span>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBranch(b.id);
                  }}
                  className="text-[11px] text-[#0EA5B7] font-semibold hover:underline"
                >
                  Set as Active
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Geofence & District Coverage Configuration */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA0AB]">
              Coverage Geofence Configuration
            </span>
            <h3 className="text-sm font-semibold text-[#14161A] mt-0.5">
              {activeHub.name} · Priority Service Districts
            </h3>
          </div>

          <button
            onClick={handleUpdateRouting}
            className="px-4 py-2 bg-thermal-gradient text-white rounded-xl text-xs font-semibold hover:opacity-90"
          >
            Save District Routing
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between text-[#5B6170]">
            <span>Calls originating from these postal zones route directly to this hub's VoIP dispatchers:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {activeHub.coverageZones.map((zone, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] text-[#14161A] font-medium flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#0EA5B7]" />
                <span>{zone}</span>
              </span>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-2">
            <span className="text-[10px] font-semibold text-[#9AA0AB] uppercase">
              Overflow & High-Load Failover Rule
            </span>
            <p className="text-[#5B6170] leading-relaxed">
              If {activeHub.city} dispatch queue exceeds 6 pending emergency work orders simultaneously during afternoon heat waves, inbound VoIP calls auto-reroute to the central overflow queue with instant WhatsApp arrival holds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
