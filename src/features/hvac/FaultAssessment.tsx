import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowRight,
  Truck,
  Building,
} from 'lucide-react';

export const FaultAssessment: React.FC = () => {
  const { addLead, addToast } = useStore();

  const [equipmentType, setEquipmentType] = useState('Chiller / Cold Room');
  const [facilityType, setFacilityType] = useState('Restaurant Cold Room (Perishable Food)');
  const [symptom, setSymptom] = useState('Complete cooling shutdown / temperature rising');
  const [ambientTemp, setAmbientTemp] = useState('44');
  const [hasVulnerableOccupants, setHasVulnerableOccupants] = useState(true);

  // Calculate Urgency
  const isEmergency =
    facilityType.includes('Perishable') ||
    facilityType.includes('Hospital') ||
    (Number(ambientTemp) >= 42 && hasVulnerableOccupants) ||
    symptom.includes('Complete cooling');

  const urgencyTier = isEmergency ? 'Tier-1 Emergency (2-Hour SLA)' : 'Tier-2 Same-Day Dispatch (4-6 Hours)';
  const recommendedSkill = equipmentType.includes('Chiller')
    ? 'Commercial Refrigeration & Chiller Master Tech'
    : equipmentType.includes('VRF')
    ? 'VRF Multi-Split Diagnostic Specialist'
    : 'Certified Residential HVAC Tech';

  const handleCreateWorkOrder = () => {
    addLead({
      customerName: 'Priority Fault Intake Assessment',
      phone: '+966 54 991 8831',
      location: 'Diplomatic Quarter, Riyadh',
      city: 'Riyadh',
      requirement: `${equipmentType} - ${symptom} (${facilityType})`,
      score: isEmergency ? 'Hot' : 'Warm',
      scoreReason: `Fault assessment categorized as ${urgencyTier}`,
      channel: 'website',
      status: 'new',
      estimatedValue: isEmergency ? 3200 : 1200,
      preferredLanguage: 'ar',
    });
    addToast({
      title: 'Work Order Generated',
      message: `Triage completed. Dispatched as ${urgencyTier}`,
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
            <span>Triage Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Fault Assessment & Prioritization Matrix
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Automatic SLA calculation based on perishable food risk, healthcare facilities, ambient heatwave severity, and system topology
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
            Symptom Intake & Site Environment
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#5B6170] font-medium mb-1">Equipment Category</label>
              <select
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-2.5 text-[#14161A] outline-none"
              >
                <option value="Chiller / Cold Room">Commercial Chiller / Walk-in Cold Storage</option>
                <option value="VRF Multi-Split">VRF / VRV Central Multi-Split System</option>
                <option value="Ducted Split Package">Ducted Split Rooftop Package (Carrier / Zamil)</option>
                <option value="Standard Mini-Split">Residential Mini-Split (Gree / Daikin)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#5B6170] font-medium mb-1">Facility / Criticality Context</label>
              <select
                value={facilityType}
                onChange={(e) => setFacilityType(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-2.5 text-[#14161A] outline-none"
              >
                <option value="Restaurant Cold Room (Perishable Food)">Restaurant / Supermarket Cold Storage (Perishable Stock)</option>
                <option value="Medical Clinic / Lab">Medical Clinic / Surgical Suite / Pharmacy</option>
                <option value="Residential Villa Compound">Residential Villa (Family Home)</option>
                <option value="Commercial Office / Retail">Commercial Office / Retail Storefront</option>
              </select>
            </div>

            <div>
              <label className="block text-[#5B6170] font-medium mb-1">Primary Reported Symptom</label>
              <select
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-2.5 text-[#14161A] outline-none"
              >
                <option value="Complete cooling shutdown / temperature rising">Total Cooling Loss: Compressor stopped, temperature climbing</option>
                <option value="Circuit breaker tripping immediately upon start">Electrical Hazard: Breaker trips, burning odor, contactor buzz</option>
                <option value="High pressure safety cutoff in afternoon heat">Thermal Cutoff: Unit cycles off during peak afternoon heat (45°C+)</option>
                <option value="Sub-cooling or airflow reduction (mild issue)">Low Efficiency: Mild cooling reduction, dirty coil or filter</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#5B6170] font-medium mb-1">Outdoor Ambient Temp (°C)</label>
                <input
                  type="number"
                  value={ambientTemp}
                  onChange={(e) => setAmbientTemp(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-2.5 text-[#14161A] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="vulnerable"
                  checked={hasVulnerableOccupants}
                  onChange={(e) => setHasVulnerableOccupants(e.target.checked)}
                  className="rounded text-[#0EA5B7]"
                />
                <label htmlFor="vulnerable" className="text-xs text-[#14161A] font-medium">
                  High Vulnerability (Food spoilage or elderly in house)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Assessment Result Card (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA0AB]">
                Prioritization Verdict
              </span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  isEmergency
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {isEmergency ? 'CRITICAL DISPATCH' : 'STANDARD PRIORITY'}
              </span>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-base font-serif-display font-semibold text-[#14161A]">
                  {urgencyTier}
                </h4>
                <p className="text-xs text-[#5B6170] mt-1 leading-relaxed">
                  {isEmergency
                    ? 'Immediate technician alert routed to closest fleet van with live GPS tracking link.'
                    : 'Scheduled for dispatch within the standard regional dispatch window.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5B6170]">Required Skill Level:</span>
                  <span className="font-semibold text-[#14161A] text-right">{recommendedSkill}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6170]">Target On-Site ETA:</span>
                  <span className="font-mono font-semibold text-[#0EA5B7]">
                    {isEmergency ? '< 120 Minutes' : 'Same-Day (by 18:00)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6170]">Diagnostic Fee:</span>
                  <span className="font-mono font-semibold text-[#14161A]">
                    {isEmergency ? '350 SAR (Credited on repair)' : '250 SAR (Credited)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateWorkOrder}
            className="w-full py-3 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:opacity-95 transition-opacity"
          >
            <Truck className="w-4 h-4" />
            <span>Approve & Dispatch Work Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
