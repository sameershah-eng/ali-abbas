import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { MissedCallItem } from '../../types';
import {
  PhoneMissed,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare,
  Smartphone,
  Phone,
  X,
} from 'lucide-react';

export const MissedCallsView: React.FC = () => {
  const { missedCalls, updateMissedCallStatus } = useStore();
  const [selectedCall, setSelectedCall] = useState<MissedCallItem | null>(null);
  const [templateText, setTemplateText] = useState('');

  const openTemplateModal = (call: MissedCallItem) => {
    setSelectedCall(call);
    setTemplateText(call.suggestedTemplate);
  };

  const handleSendFollowUp = (channel: 'whatsapp' | 'sms') => {
    if (!selectedCall) return;
    updateMissedCallStatus(
      selectedCall.id,
      channel === 'whatsapp' ? 'whatsapp_sent' : 'sms_sent'
    );
    setSelectedCall(null);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section A · Customer Communication</span>
            <span>·</span>
            <span>Recovery Automation</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Missed-Call Instant Recovery
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Automated SMS & WhatsApp dispatch triggers within 60 seconds of any dropped or missed inbound call
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 font-semibold">
            {missedCalls.filter((m) => m.followUpStatus === 'pending').length} Pending Follow-ups
          </span>
        </div>
      </div>

      {/* Missed Calls Table */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#9AA0AB] uppercase text-[10px] font-semibold border-b border-[#ECE8E1]">
              <tr>
                <th className="px-4 py-3.5">Caller Identification</th>
                <th className="px-4 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">Ring Attempts</th>
                <th className="px-4 py-3.5">Automated Recovery Message</th>
                <th className="px-4 py-3.5">Current Status</th>
                <th className="px-4 py-3.5 text-right">Instant Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]">
              {missedCalls.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-[#14161A]">{item.callerName}</div>
                    <div className="font-mono text-[11px] text-[#5B6170]">{item.phone}</div>
                  </td>
                  <td className="px-4 py-3.5 text-[#5B6170]">{item.time}</td>
                  <td className="px-4 py-3.5 font-mono text-[#14161A]">{item.attempts} ring</td>
                  <td className="px-4 py-3.5 max-w-sm truncate text-[#5B6170]">
                    {item.suggestedTemplate}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.followUpStatus === 'whatsapp_sent'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.followUpStatus === 'sms_sent'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : item.followUpStatus === 'called_back'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.followUpStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => openTemplateModal(item)}
                      className="px-3 py-1.5 bg-[#14161A] hover:bg-[#2B303A] text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      Send Follow-Up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Follow-up preview modal */}
      {selectedCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#ECE8E1] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <h3 className="font-serif-display text-lg font-semibold text-[#14161A]">
                Send Missed-Call Recovery
              </h3>
              <button
                onClick={() => setSelectedCall(null)}
                className="text-[#9AA0AB] hover:text-[#14161A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              <div>
                <span className="text-[#9AA0AB]">Recipient:</span>
                <div className="font-semibold text-sm text-[#14161A]">
                  {selectedCall.callerName} ({selectedCall.phone})
                </div>
              </div>

              <div>
                <label className="block text-[#5B6170] font-medium mb-1">
                  Message Template (Arabic & GCC Dialect)
                </label>
                <textarea
                  rows={4}
                  value={templateText}
                  onChange={(e) => setTemplateText(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-3 text-xs text-[#14161A] outline-none font-arabic"
                  dir="rtl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#ECE8E1]">
                <button
                  onClick={() => handleSendFollowUp('sms')}
                  className="px-3 py-2 bg-[#FAF8F5] border border-[#ECE8E1] text-[#14161A] rounded-lg font-medium flex items-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#5B6170]" />
                  <span>Send via SMS</span>
                </button>
                <button
                  onClick={() => handleSendFollowUp('whatsapp')}
                  className="px-4 py-2 bg-[#16A34A] text-white rounded-lg font-semibold flex items-center gap-1.5 hover:bg-[#15803D]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
