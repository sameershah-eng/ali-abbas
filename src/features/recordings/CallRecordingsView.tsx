import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CallLog } from '../../types';
import {
  Disc,
  Play,
  Pause,
  ShieldCheck,
  Clock,
  User,
  Phone,
  FileText,
  Volume2,
} from 'lucide-react';

export const CallRecordingsView: React.FC = () => {
  const { callLogs } = useStore();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedCall, setSelectedCall] = useState<CallLog>(callLogs[0]);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section D · Reporting & Performance</span>
            <span>·</span>
            <span>Audio Compliance</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Call Recordings & Executive Summaries
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Legally permitted call recordings under Saudi communications compliance with automated extractive summaries
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#16A34A] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Full Legal Recording Consent Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recordings List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
            Recorded Calls ({callLogs.length})
          </h3>

          <div className="space-y-2.5">
            {callLogs.map((log) => (
              <div
                key={log.id}
                onClick={() => setSelectedCall(log)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedCall?.id === log.id
                    ? 'bg-white border-[#0EA5B7] shadow-sm ring-1 ring-[#0EA5B7]/30'
                    : 'bg-white border-[#ECE8E1] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-[#14161A]">{log.callerName}</h4>
                    <div className="text-[11px] text-[#5B6170] font-mono">{log.phone}</div>
                  </div>

                  <span className="text-[10px] font-mono text-[#9AA0AB]">{log.timestamp}</span>
                </div>

                <div className="text-xs text-[#14161A] font-medium mt-2 truncate">
                  {log.intent}
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-[#9AA0AB]">
                  <span className="font-mono">{log.duration}</span>
                  <span className="uppercase text-[10px] font-bold text-[#0EA5B7]">
                    {log.language} · {log.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Detailed Player & Full Transcript (7 cols) */}
        {selectedCall && (
          <div className="lg:col-span-7 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA0AB]">
                  Recording Session
                </span>
                <h3 className="text-sm font-semibold text-[#14161A] mt-0.5">
                  {selectedCall.callerName} ({selectedCall.phone})
                </h3>
              </div>

              <span className="text-xs font-mono text-[#5B6170]">Duration: {selectedCall.duration}</span>
            </div>

            {/* Audio Wave Player */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] flex items-center gap-3">
              <button
                onClick={() => togglePlay(selectedCall.id)}
                className="w-10 h-10 rounded-full bg-[#14161A] text-white flex items-center justify-center hover:bg-[#2B303A] transition-colors shrink-0"
              >
                {playingId === selectedCall.id ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <div className="flex-1 flex items-center gap-1 h-8">
                {[15, 30, 60, 85, 45, 90, 70, 30, 80, 95, 65, 40, 75, 50, 30, 60, 80, 45, 25, 70, 85, 40, 20].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      playingId === selectedCall.id ? 'bg-[#0EA5B7]' : 'bg-[#CAC3B5]'
                    }`}
                    style={{ height: `${playingId === selectedCall.id ? Math.max(8, h * 0.8) : 12}px` }}
                  />
                ))}
              </div>

              <span className="text-xs font-mono text-[#5B6170] shrink-0">01:15 / {selectedCall.duration}</span>
            </div>

            {/* Executive AI Summary Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-[#0EA5B7] uppercase tracking-wider">
                Automated Operational Summary
              </span>
              <p className="text-[#14161A] leading-relaxed">
                {selectedCall.summary}
              </p>
            </div>

            {/* Complete Transcript Stream */}
            <div className="space-y-3">
              <span className="text-[10px] font-semibold text-[#9AA0AB] uppercase tracking-wider block">
                Verbatim Bilingual Transcript
              </span>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {selectedCall.transcript.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      line.speaker === 'agent'
                        ? 'bg-[#FAF8F5] border border-[#ECE8E1] text-[#14161A]'
                        : 'bg-white border border-[#ECE8E1] text-[#14161A]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#9AA0AB] mb-1">
                      <span className="font-semibold">
                        {line.speaker === 'agent' ? 'Thermiq AI Assistant' : selectedCall.callerName}
                      </span>
                      <span className="font-mono">{line.timestamp}</span>
                    </div>
                    <p>{line.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
