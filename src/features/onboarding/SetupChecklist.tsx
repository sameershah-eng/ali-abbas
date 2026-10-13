import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  PlayCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  PhoneCall,
  RotateCcw,
} from 'lucide-react';

export const SetupChecklist: React.FC = () => {
  const { addToast } = useStore();
  const [testJourneyStep, setTestJourneyStep] = useState<number>(0);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const checklistItems = [
    { title: 'Commercial Registration & VAT ID Verified', done: true, desc: 'ZATCA Phase 2 compliance & e-invoice signing active' },
    { title: 'WhatsApp Business Cloud API Connected', done: true, desc: 'Verified green badge account linked to Saudi mobile gateway' },
    { title: 'Multi-Branch Hubs & Technician Geofences', done: true, desc: 'Riyadh, Jeddah, and Dammam service districts mapped' },
    { title: 'Knowledge Base Policies Approved for AI Use', done: true, desc: '5 vetted pricing guidelines and emergency protocols live' },
    { title: 'Simulate End-to-End Customer Service Journey', done: testJourneyStep >= 4, desc: 'Dry-run test journey verifying call triage, booking, and WhatsApp alert' },
  ];

  const completedCount = checklistItems.filter((i) => i.done).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);

  const runTestJourney = () => {
    setIsRunningTest(true);
    setTestJourneyStep(1);

    setTimeout(() => {
      setTestJourneyStep(2);
    }, 1200);

    setTimeout(() => {
      setTestJourneyStep(3);
    }, 2400);

    setTimeout(() => {
      setTestJourneyStep(4);
      setIsRunningTest(false);
      addToast({
        title: 'End-to-End Journey Verified',
        message: 'All 4 operations nodes validated: Voice → Triage → Fleet Dispatch → WhatsApp SLA',
        type: 'booking',
      });
    }, 3600);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section E · Integrations & Automation</span>
            <span>·</span>
            <span>Go-Live Checklist</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Setup & Deployment Readiness
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Operational verification framework guaranteeing 99.98% uptime and flawless SLA handoffs
          </p>
        </div>

        <button
          onClick={runTestJourney}
          disabled={isRunningTest}
          className="px-4 py-2 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs hover:opacity-95 transition-opacity disabled:opacity-50"
        >
          {isRunningTest ? (
            <>
              <RotateCcw className="w-3.5 h-3.5 animate-spin" />
              <span>Simulating Live Test Journey...</span>
            </>
          ) : (
            <>
              <PlayCircle className="w-4 h-4" />
              <span>Run Automated Test Journey</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Progress Ring & Checklist (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#ECE8E1]">
            <div>
              <span className="text-xs font-semibold text-[#14161A]">System Readiness Score</span>
              <div className="text-[11px] text-[#5B6170] mt-0.5">
                {completedCount} of {checklistItems.length} Milestones Verified
              </div>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#ECE8E1"
                  strokeWidth="5"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="url(#progressGrad)"
                  strokeWidth="5"
                  strokeDasharray="163"
                  strokeDashoffset={163 - (163 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0EA5B7" />
                    <stop offset="100%" stopColor="#FF8A5B" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute font-mono text-xs font-bold text-[#14161A]">
                {progressPercent}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {checklistItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#ECE8E1] bg-[#FAF8F5]/50 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-[#14161A] flex items-center gap-2">
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-[#5B6170]">{item.desc}</p>
                </div>

                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-4 h-4 text-[#9AA0AB] shrink-0 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Simulated Journey Execution Screen (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA0AB]">
                Test Journey Simulation Console
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  testJourneyStep === 4
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : isRunningTest
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {testJourneyStep === 4 ? 'PASSED 100%' : isRunningTest ? 'RUNNING' : 'STANDBY'}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              {[
                {
                  step: 1,
                  title: 'Step 1: Inbound Emergency Voice Call Intake',
                  detail: 'Simulated customer in Hittin with Carrier breaker trip tripping outdoor compressor.',
                },
                {
                  step: 2,
                  title: 'Step 2: AI Voice Dialect Recognition & Triage',
                  detail: 'Identified Najdi Arabic, confirmed 350 SAR diagnostic fee credit, allocated Tier-1 Emergency 2h SLA.',
                },
                {
                  step: 3,
                  title: 'Step 3: Workforce Dispatch & Proximity Routing',
                  detail: 'Sultan Al-Mutairi (Carrier certified) assigned from Central Olaya depot with 14-min ETA.',
                },
                {
                  step: 4,
                  title: 'Step 4: WhatsApp Tracking & E-Invoice Delivery',
                  detail: 'Client received live vector map link and ZATCA Phase 2 tax quotation on WhatsApp.',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`p-3.5 rounded-xl border transition-all ${
                    testJourneyStep >= s.step
                      ? 'bg-emerald-50/20 border-emerald-200'
                      : 'bg-[#FAF8F5]/30 border-[#ECE8E1] opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#14161A]">{s.title}</span>
                    {testJourneyStep >= s.step && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#5B6170] mt-1 leading-snug">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] text-[11px] text-[#5B6170]">
            All automated tests are sandboxed and do not bill client credit balances or cellular SMS carrier credits.
          </div>
        </div>
      </div>
    </div>
  );
};
