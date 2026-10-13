import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Star,
} from 'lucide-react';

export const QualityReview: React.FC = () => {
  const commonConcerns = [
    { concern: 'Midday Emergency SLA arrival timing (>45°C ambient heat)', frequency: '42% of calls', trend: '+8%' },
    { concern: 'Clarification on diagnostic fee deduction upon repair approval', frequency: '28% of calls', trend: '-4%' },
    { concern: 'Compatibility of R410A vs older R22 refrigerant in villas', frequency: '18% of calls', trend: '+2%' },
    { concern: 'Tabby and Tamara installment eligibility on commercial contracts', frequency: '12% of calls', trend: '+14%' },
  ];

  const suggestions = [
    {
      title: 'Auto-Clarify Diagnostic Fee in Voice Agent First Turn',
      impact: 'High Impact',
      text: 'Ensure the AI assistant explicitly states "250 SAR inspection fee is fully credited to repair" right after address verification to reduce caller hesitation.',
    },
    {
      title: 'Prompt for False Ceiling Access Height in Riyadh Villas',
      impact: 'Medium Impact',
      text: 'Add automated inquiry asking if ducted unit requires an A-frame ladder >3 meters so technicians dispatch with correct high-reach scaffolding.',
    },
    {
      title: 'Prioritize WhatsApp Follow-Up on Dropped Calls <20s',
      impact: 'High Impact',
      text: 'In extreme summer load, 6% of calls drop before dialect identification. Immediate SMS with instant booking link recovers 42% of dropped callers.',
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section D · Reporting & Performance</span>
            <span>·</span>
            <span>Quality Audit</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Call Quality Review & Operational Insights
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Systemic audit of customer objections, recurrent failure themes, and continuous voice prompt refinement
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-white border border-[#ECE8E1] px-3 py-1.5 rounded-xl font-semibold text-[#14161A]">
          <span>Overall Voice Agent Quality Score:</span>
          <span className="font-mono text-[#0EA5B7]">96.2 / 100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Common Customer Concerns (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
            Recurrent Customer Inquiries & Objections
          </h3>

          <div className="space-y-3">
            {commonConcerns.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-[#14161A] block">{item.concern}</span>
                  <span className="text-[11px] text-[#5B6170] mt-0.5 block">{item.frequency}</span>
                </div>
                <span className="font-mono text-[10px] text-[#0EA5B7] font-semibold bg-white border border-[#ECE8E1] px-2 py-0.5 rounded">
                  {item.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Operational Improvement Suggestions (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
            Automated Improvement Recommendations
          </h3>

          <div className="space-y-3">
            {suggestions.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#ECE8E1] bg-[#FAF8F5]/40 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#14161A]">{s.title}</span>
                  <span className="text-[10px] font-bold text-[#0EA5B7] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                    {s.impact}
                  </span>
                </div>
                <p className="text-[#5B6170] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
