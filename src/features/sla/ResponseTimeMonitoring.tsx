import React from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  PhoneCall,
  MessageSquare,
  Truck,
} from 'lucide-react';

export const ResponseTimeMonitoring: React.FC = () => {
  const slaMetrics = [
    {
      channel: 'Inbound Phone (VoIP Agent)',
      target: '< 3 seconds (Zero Hold)',
      actual: '0.8 seconds',
      status: 'compliant',
      icon: PhoneCall,
      description: 'Zero ring hold time; voice engine streams audio immediately upon pickup',
    },
    {
      channel: 'WhatsApp & Instagram Inbound',
      target: '< 30 seconds',
      actual: '4.2 seconds',
      status: 'compliant',
      icon: MessageSquare,
      description: 'Auto-categorization, customer profile match, and Arabic dialect reply',
    },
    {
      channel: 'Emergency Tier-1 On-Site Dispatch',
      target: '< 120 minutes',
      actual: '48.5 minutes (Avg)',
      status: 'compliant',
      icon: Truck,
      description: 'Average time from call confirmation to technician vehicle arrival on site',
    },
    {
      channel: 'Follow-Up on High-Value Quotes (>10k SAR)',
      target: '< 24 hours',
      actual: '14.2 hours',
      status: 'compliant',
      icon: Clock,
      description: 'WhatsApp follow-up with customized Tabby / Tamara installment breakdown',
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
            <span>Service Level Agreements</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Response Time Monitoring & SLA Compliance
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Real-time latency metrics comparing customer expectations against actual operations performance across GCC metro hubs
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#16A34A] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>100% Core SLAs Currently Met</span>
        </div>
      </div>

      {/* SLA Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {slaMetrics.map((sla, idx) => {
          const Icon = sla.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                      <Icon className="w-4 h-4 text-[#0EA5B7]" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#14161A]">{sla.channel}</h3>
                  </div>

                  <span className="text-[10px] font-bold text-[#16A34A] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    SLA Compliant
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                    <span className="text-[10px] text-[#9AA0AB] uppercase">Target SLA Threshold</span>
                    <div className="font-semibold text-[#5B6170] mt-0.5">{sla.target}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                    <span className="text-[10px] text-[#9AA0AB] uppercase">Actual Operational Speed</span>
                    <div className="font-mono font-bold text-sm text-[#0EA5B7] mt-0.5 font-mono-numbers">
                      {sla.actual}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#5B6170] mt-3 leading-relaxed">
                  {sla.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#ECE8E1] flex items-center justify-between text-[11px] text-[#9AA0AB]">
                <span>Monitored 24/7 across Riyadh, Jeddah, Dammam</span>
                <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> -12% vs last month
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
