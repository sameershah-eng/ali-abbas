import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { VoiceNoteRecord } from '../../types';
import {
  Mic,
  Play,
  Pause,
  Clock,
  Sparkles,
  MapPin,
  Wrench,
  AlertTriangle,
  Send,
  CheckCircle2,
  Volume2,
} from 'lucide-react';

export const VoiceNoteTranscription: React.FC = () => {
  const { voiceNotes, assignJobToTechnician, addToast } = useStore();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  const handleCreateJob = (vn: VoiceNoteRecord) => {
    addToast({
      title: 'Dispatched from Voice Note',
      message: `Emergency work order drafted for ${vn.customerName} (${vn.extractedEquipment})`,
      type: 'urgent',
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section A · Customer Communication</span>
            <span>·</span>
            <span>WhatsApp Audio AI</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            WhatsApp Voice Note Transcription
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Automatic speech-to-text extraction of equipment model, symptoms, and geographic district from customer voice messages
          </p>
        </div>
      </div>

      {/* Voice Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {voiceNotes.map((vn) => (
          <div
            key={vn.id}
            className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-5 relative overflow-hidden"
          >
            {/* Top row */}
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#14161A]">{vn.customerName}</h3>
                    <div className="text-xs text-[#5B6170] font-mono">{vn.phone} · {vn.timestamp}</div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    vn.urgency === 'Emergency'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {vn.urgency}
                </span>
              </div>

              {/* Audio Player Strip */}
              <div className="mt-4 bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-3 flex items-center gap-3">
                <button
                  onClick={() => togglePlay(vn.id)}
                  className="w-8 h-8 rounded-full bg-[#14161A] text-white flex items-center justify-center hover:bg-[#2B303A] transition-colors"
                  aria-label={playingId === vn.id ? 'Pause audio' : 'Play audio'}
                >
                  {playingId === vn.id ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>

                {/* Simulated Audio Waves */}
                <div className="flex-1 flex items-center gap-1 h-6">
                  {[20, 40, 75, 90, 50, 30, 85, 60, 45, 95, 30, 70, 80, 40, 25, 60, 85, 50].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full transition-all duration-200 ${
                        playingId === vn.id
                          ? 'bg-[#0EA5B7]'
                          : 'bg-[#CAC3B5]'
                      }`}
                      style={{ height: `${playingId === vn.id ? Math.max(6, h * 0.7) : 12}px` }}
                    />
                  ))}
                </div>

                <span className="text-[11px] font-mono text-[#5B6170]">{vn.audioDuration}</span>

                <button
                  onClick={() => setPlaybackSpeed(playbackSpeed === 1.0 ? 1.5 : 1.0)}
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#ECE8E1] text-[#14161A]"
                >
                  {playbackSpeed}x
                </button>
              </div>

              {/* Transcripts (Arabic & English Translation) */}
              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-xl bg-[#FAF8F5]/60 border border-[#ECE8E1] text-xs">
                  <span className="text-[10px] font-semibold text-[#9AA0AB] uppercase block mb-1">
                    Original Arabic Speech (Transcribed)
                  </span>
                  <p className="text-[#14161A] font-arabic leading-relaxed text-right" dir="rtl">
                    "{vn.transcriptArabic}"
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/20 border border-blue-100 text-xs">
                  <span className="text-[10px] font-semibold text-blue-700 uppercase block mb-1">
                    English Semantic Translation
                  </span>
                  <p className="text-[#14161A] leading-relaxed">
                    "{vn.transcriptEnglish}"
                  </p>
                </div>
              </div>

              {/* Structured Extracted Parameters */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                  <span className="text-[10px] text-[#9AA0AB] uppercase">Equipment Detected</span>
                  <div className="font-semibold text-[#14161A] mt-0.5">{vn.extractedEquipment}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                  <span className="text-[10px] text-[#9AA0AB] uppercase">Extracted Location</span>
                  <div className="font-semibold text-[#14161A] mt-0.5">{vn.extractedLocation}</div>
                </div>
                <div className="col-span-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                  <span className="text-[10px] text-[#9AA0AB] uppercase">Primary Symptom</span>
                  <div className="font-semibold text-[#E5484D] mt-0.5">{vn.extractedSymptom}</div>
                </div>
              </div>
            </div>

            {/* Bottom Dispatch Button */}
            <div className="pt-3 border-t border-[#ECE8E1] flex justify-end">
              <button
                onClick={() => handleCreateJob(vn)}
                className="px-4 py-2 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Create Dispatch Work Order</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
