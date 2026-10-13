import React from 'react';
import { useStore } from '../../store/useStore';
import { IntegrationCard } from '../../types';
import {
  Boxes,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Power,
  ShieldCheck,
} from 'lucide-react';

export const IntegrationsHub: React.FC = () => {
  const { integrations, toggleIntegration, addToast } = useStore();

  const handleToggle = (item: IntegrationCard) => {
    toggleIntegration(item.id);
    addToast({
      title: item.connected ? 'Integration Disconnected' : 'Integration Connected',
      message: `${item.name} status updated`,
      type: 'info',
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section E · Integrations & Automation</span>
            <span>·</span>
            <span>API Connectors</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Enterprise Integrations & Webhook Hub
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Pre-built native connectors syncing calendars, WhatsApp Business Cloud, ERPs, and Saudi payment gateways
          </p>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-[#0EA5B7]/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#0EA5B7] uppercase tracking-wider bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-semibold text-[#14161A] mt-2">{item.name}</h3>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    item.connected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {item.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <p className="text-xs text-[#5B6170] mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#ECE8E1] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#9AA0AB]">
                {item.lastSync ? `Synced ${item.lastSync}` : 'Offline'}
              </span>

              <button
                onClick={() => handleToggle(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  item.connected
                    ? 'bg-[#FAF8F5] border border-[#ECE8E1] text-[#5B6170] hover:text-[#E5484D]'
                    : 'bg-[#14161A] text-white hover:bg-[#2B303A]'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{item.connected ? 'Disconnect' : 'Connect API'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
