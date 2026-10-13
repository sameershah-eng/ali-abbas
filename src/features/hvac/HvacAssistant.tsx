import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  Wrench,
  AlertTriangle,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  PhoneCall,
  Flame,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface DiagnosticStep {
  id: string;
  question: string;
  options: { label: string; nextStepId: string; diagnosis?: string; isUrgent?: boolean }[];
}

export const HvacAssistant: React.FC = () => {
  const { addLead } = useStore();
  const [selectedIssue, setSelectedIssue] = useState<'cooling' | 'noise' | 'leak' | 'breaker'>('cooling');
  const [currentStepId, setCurrentStepId] = useState('q1');
  const [finalDiagnosis, setFinalDiagnosis] = useState<{ text: string; urgent: boolean } | null>(null);

  const issueTrees: Record<string, Record<string, DiagnosticStep>> = {
    cooling: {
      q1: {
        id: 'q1',
        question: 'Is the outdoor condenser fan spinning when the thermostat calls for cooling?',
        options: [
          { label: 'Yes, outdoor fan is spinning normally', nextStepId: 'q2' },
          { label: 'No, fan is completely stationary or twitching', nextStepId: 'q3' },
          { label: 'The indoor blower fan is also not blowing air', nextStepId: 'q4' },
        ],
      },
      q2: {
        id: 'q2',
        question: 'Is the large copper suction line cold and sweating with condensation?',
        options: [
          {
            label: 'Suction pipe is warm/ambient with no condensation',
            nextStepId: 'end',
            diagnosis: 'Refrigerant loss (gas leak in evaporator coil or flare connection) or faulty expansion valve.',
            isUrgent: true,
          },
          {
            label: 'Suction pipe is covered in thick white ice/frost',
            nextStepId: 'end',
            diagnosis: 'Severe airflow restriction (clogged filters/blower wheel) or liquid floodback.',
            isUrgent: false,
          },
        ],
      },
      q3: {
        id: 'q3',
        question: 'Do you hear a deep buzzing hum every 45-60 seconds from the outdoor unit?',
        options: [
          {
            label: 'Yes, buzzing hum followed by a metallic click',
            nextStepId: 'end',
            diagnosis: 'Failed dual run capacitor (70/7.5 uF) or compressor locked rotor (LRA thermal trip).',
            isUrgent: true,
          },
          {
            label: 'No sound at all, completely silent',
            nextStepId: 'end',
            diagnosis: '24V control voltage loss, burnt contactor coil, or high-pressure safety switch tripped.',
            isUrgent: false,
          },
        ],
      },
      q4: {
        id: 'q4',
        question: 'Is the indoor thermostat screen lit or blank?',
        options: [
          {
            label: 'Thermostat screen is completely blank',
            nextStepId: 'end',
            diagnosis: 'Float switch tripped due to clogged condensate drain pan or blown 3A control board fuse.',
            isUrgent: false,
          },
          {
            label: 'Thermostat is on, but indoor blower motor does not start',
            nextStepId: 'end',
            diagnosis: 'Failed indoor blower motor capacitor or faulty ECM motor control module.',
            isUrgent: true,
          },
        ],
      },
    },
    breaker: {
      q1: {
        id: 'q1',
        question: 'Does the circuit breaker trip immediately when switched on, or after 2-5 minutes?',
        options: [
          {
            label: 'Immediately (instant spark / snap)',
            nextStepId: 'end',
            diagnosis: 'Direct short to ground in compressor motor windings or shorted contactor wiring.',
            isUrgent: true,
          },
          {
            label: 'After 2-5 minutes when outdoor compressor engages',
            nextStepId: 'end',
            diagnosis: 'Compressor hard-starting under extreme head pressure or weak/aging circuit breaker.',
            isUrgent: true,
          },
        ],
      },
    },
    leak: {
      q1: {
        id: 'q1',
        question: 'Where is the water dripping from inside the room?',
        options: [
          {
            label: 'Dripping from the false ceiling duct grille',
            nextStepId: 'end',
            diagnosis: 'Clogged PVC condensate P-trap or disconnected drain hose causing drain pan overflow.',
            isUrgent: false,
          },
          {
            label: 'Spitting ice droplets through the air louvers',
            nextStepId: 'end',
            diagnosis: 'Evaporator coil freeze-up melting rapidly under high fan speed.',
            isUrgent: true,
          },
        ],
      },
    },
    noise: {
      q1: {
        id: 'q1',
        question: 'What kind of noise does the HVAC unit produce?',
        options: [
          {
            label: 'High-pitched squealing or screetching',
            nextStepId: 'end',
            diagnosis: 'Blower drive belt slipping or motor bearings dry of grease.',
            isUrgent: false,
          },
          {
            label: 'Violent rattling or vibration through walls',
            nextStepId: 'end',
            diagnosis: 'Loose condenser fan blade, broken motor mount rubber, or failing scroll compressor spiral.',
            isUrgent: true,
          },
        ],
      },
    },
  };

  const handleSelectOption = (opt: any) => {
    if (opt.diagnosis) {
      setFinalDiagnosis({ text: opt.diagnosis, urgent: !!opt.isUrgent });
    } else {
      setCurrentStepId(opt.nextStepId);
    }
  };

  const handleReset = () => {
    setCurrentStepId('q1');
    setFinalDiagnosis(null);
  };

  const currentTree = issueTrees[selectedIssue] || issueTrees.cooling;
  const currentStep = currentTree[currentStepId] || currentTree.q1;

  const handleDispatchTicket = () => {
    addLead({
      customerName: 'Diagnostic Lead (HVAC Flow)',
      phone: '+966 50 882 1920',
      location: 'Central District, Riyadh',
      city: 'Riyadh',
      requirement: `${selectedIssue.toUpperCase()} Diagnosis: ${finalDiagnosis?.text}`,
      score: finalDiagnosis?.urgent ? 'Hot' : 'Warm',
      scoreReason: 'Guided troubleshooting indicated critical mechanical fault',
      channel: 'website',
      status: 'new',
      estimatedValue: finalDiagnosis?.urgent ? 2800 : 950,
      preferredLanguage: 'ar',
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
            <span>Diagnostic Wizard</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            HVAC Assistant & Guided Troubleshooting
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Step-by-step diagnostic logic calibrated for GCC extreme summer heat (up to 52°C) across Carrier, Daikin, Zamil, and Gree
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#ECE8E1] hover:bg-[#F2EFE9] text-xs font-medium text-[#14161A] rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#5B6170]" />
          <span>Reset Flow</span>
        </button>
      </div>

      {/* Issue Category Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: 'cooling', title: 'AC Not Cooling / Warm Air', sub: 'Most common midday complaint' },
          { key: 'breaker', title: 'Tripping Circuit Breaker', sub: 'Electrical short or locked rotor' },
          { key: 'leak', title: 'Water Leakage / Ice Drops', sub: 'Drain pan overflow or freeze' },
          { key: 'noise', title: 'Grinding / Screeching Noise', sub: 'Bearing wear or loose mount' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setSelectedIssue(item.key as any);
              handleReset();
            }}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedIssue === item.key
                ? 'bg-white border-[#0EA5B7] shadow-sm ring-1 ring-[#0EA5B7]/30'
                : 'bg-white border-[#ECE8E1] hover:bg-[#FAF8F5]'
            }`}
          >
            <div className="text-xs font-semibold text-[#14161A]">{item.title}</div>
            <div className="text-[11px] text-[#9AA0AB] mt-0.5">{item.sub}</div>
          </button>
        ))}
      </div>

      {/* Guided Wizard Box */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
        {!finalDiagnosis ? (
          <div>
            <div className="flex items-center gap-2 text-xs text-[#0EA5B7] font-semibold uppercase tracking-wider mb-2">
              <span>Step Diagnostic Inspection</span>
            </div>
            <h2 className="text-lg font-serif-display font-semibold text-[#14161A]">
              {currentStep.question}
            </h2>

            <div className="space-y-3 mt-6">
              {currentStep.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full p-4 rounded-xl border border-[#ECE8E1] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] hover:border-[#0EA5B7] text-left text-xs font-medium text-[#14161A] flex items-center justify-between transition-colors group"
                >
                  <span>{opt.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#9AA0AB] group-hover:text-[#0EA5B7] transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  finalDiagnosis.urgent
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }`}
              >
                {finalDiagnosis.urgent ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <CheckCircle2 className="w-6 h-6" />
                )}
              </div>
              <div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    finalDiagnosis.urgent
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {finalDiagnosis.urgent ? 'CRITICAL HVAC COMPONENT FAULT' : 'STANDARD MAINTENANCE REQUIRED'}
                </span>
                <h3 className="text-base font-serif-display font-semibold text-[#14161A] mt-1">
                  Root Cause Diagnosis Identified
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] text-xs text-[#14161A] leading-relaxed">
              <strong className="block text-[#5B6170] mb-1">Technical Assessment:</strong>
              {finalDiagnosis.text}
            </div>

            <div className="p-4 rounded-xl bg-blue-50/30 border border-blue-200 text-xs space-y-1.5">
              <div className="font-semibold text-blue-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0EA5B7]" />
                <span>Recommended Standard Action for Operations</span>
              </div>
              <p className="text-[#5B6170] leading-snug">
                Technician must bring nitrogen pressure testing kit, vacuum pump, and multi-capacitance meter. Disconnect power breaker before touching terminal block.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#ECE8E1]">
              <button
                onClick={handleReset}
                className="text-xs text-[#5B6170] hover:text-[#14161A] underline font-medium"
              >
                Start Over
              </button>

              <button
                onClick={handleDispatchTicket}
                className="px-4 py-2 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center gap-2 hover:opacity-95 transition-opacity"
              >
                <span>Generate Emergency Dispatch Ticket</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
