import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Language } from '../../types';
import {
  PhoneCall,
  PhoneOff,
  Play,
  RotateCcw,
  Languages,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Volume2,
  FileText,
  User,
  MapPin,
  Flame,
} from 'lucide-react';

export const VoiceAgentConsole: React.FC = () => {
  const {
    callLogs,
    liveCall,
    startLiveCallSimulation,
    simulateNextCallLine,
    endLiveCallSimulation,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<'all' | Language>('all');
  const [selectedOutcomeFilter, setSelectedOutcomeFilter] = useState<string>('all');
  const [previewTab, setPreviewTab] = useState<Language>('ar');

  const filteredLogs = callLogs.filter((log) => {
    const matchesSearch =
      log.callerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.phone.includes(searchQuery) ||
      log.intent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguageFilter === 'all' || log.language === selectedLanguageFilter;
    const matchesOutcome = selectedOutcomeFilter === 'all' || log.outcome === selectedOutcomeFilter;
    return matchesSearch && matchesLang && matchesOutcome;
  });

  const multilingualPreviews = {
    ar: {
      title: 'اللهجة السعودية والخليجية (Najdi & Hijazi Arabic)',
      greeting: 'أهلاً بك في ثيرميك لخدمات التكييف والتبريد، معك المساعد الآلي. كيف أقدر أخدمك اليوم؟',
      emergencyTriage: 'سلامات إن شاء الله. هل توقف التبريد تماماً أم تسمع صوت طنين من الوحدة الخارجية بالسطح؟ فريق طوارئ الرياض متواجد بحيك.',
      bookingConfirm: 'تم تأكيد حجز موعد الطوارئ برقم TH-8829، سيصلك الفني المعتمد خلال ٩٠ دقيقة ورابط التتبع أرسلناه عبر الواتساب.',
    },
    ur: {
      title: 'اردو زبان (Urdu Subcontinent Dialect)',
      greeting: 'تھرمک ایئر کنڈیشننگ اور کولنگ سروسز میں خوش آمدید۔ فرمائیے میں آپ کی کیا مدد کر سکتا ہوں؟',
      emergencyTriage: 'کیا کمپریسر بالکل بند ہو چکا ہے یا ایواپوریٹر کوائل پر برف جم رہی ہے؟ ہماری تکنیکی ٹیم دمام اور ریاض میں فوری دستیاب ہے۔',
      bookingConfirm: 'آپ کا ہنگامی وزٹ بک ہو گیا ہے۔ ٹیکنیشن کا نام اور لائیو جی پی ایس ٹریکنگ لنک آپ کے واٹس ایپ پر بھیج دیا گیا ہے۔',
    },
    en: {
      title: 'English (GCC Expat & Corporate Standard)',
      greeting: 'Welcome to Thermiq HVAC & Refrigeration Operations. How may I assist your facility or residence today?',
      emergencyTriage: 'Understood. Is this a total cooling loss with breaker trip, or a refrigerant low-pressure error? Our mobile technician is 15 minutes away.',
      bookingConfirm: 'Your emergency dispatch #TH-8829 is confirmed. Tracking link and VAT technician dispatch slip have been sent via WhatsApp.',
    },
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section A · Customer Communication</span>
            <span>·</span>
            <span>SIP & Cellular Trunk</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            24/7 AI Voice Phone Console
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Real-time streaming speech recognition with automatic dialect detection, intent extraction, and calendar dispatch
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!liveCall.isActive ? (
            <button
              onClick={startLiveCallSimulation}
              className="px-4 py-2 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm hover:opacity-95 transition-opacity"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Simulate Inbound Call</span>
            </button>
          ) : (
            <button
              onClick={endLiveCallSimulation}
              className="px-4 py-2 bg-[#E5484D] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm hover:bg-[#D03B40] transition-colors"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Hang Up Call</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Active Call Console */}
      {liveCall.isActive && (
        <div className="bg-white border-2 border-[#0EA5B7]/40 rounded-2xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0EA5B7] via-[#6C8CFF] to-[#FF8A5B]" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 animate-pulse">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#14161A]">Active Call: {liveCall.callerName}</h3>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                    Live VoIP Line
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Detected: {liveCall.detectedLanguage.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-[#5B6170] flex items-center gap-3 mt-0.5">
                  <span>{liveCall.callerPhone}</span>
                  <span>·</span>
                  <span>{liveCall.location}</span>
                  <span>·</span>
                  <span>Duration: {Math.floor(liveCall.durationSeconds / 60)}:{(liveCall.durationSeconds % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={simulateNextCallLine}
                className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#ECE8E1] hover:bg-[#F2EFE9] text-xs font-semibold text-[#14161A] rounded-lg transition-colors"
              >
                Simulate Next Speech Exchange
              </button>
              <button
                onClick={endLiveCallSimulation}
                className="px-3.5 py-1.5 bg-[#16A34A] text-white text-xs font-semibold rounded-lg hover:bg-[#15803D] transition-colors"
              >
                Confirm & Auto-Book Slot
              </button>
            </div>
          </div>

          {/* Real-time waveform & live transcription */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
            {/* Live Audio Visualizer */}
            <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold text-[#9AA0AB] uppercase tracking-wider">
                  Audio Stream & Acoustic Analysis
                </span>
                <div className="flex items-center justify-center gap-1.5 py-6">
                  {[20, 45, 75, 30, 90, 60, 40, 85, 95, 50, 70, 35, 80, 65, 30, 55, 25].map((val, i) => (
                    <span
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-[#0EA5B7] to-[#FF8A5B] rounded-full transition-all duration-200"
                      style={{ height: `${val}px` }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-[#ECE8E1] pt-3">
                <div className="flex justify-between">
                  <span className="text-[#5B6170]">Caller Sentiment:</span>
                  <span className="font-semibold text-emerald-700 capitalize">{liveCall.sentiment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6170]">Identified Equipment:</span>
                  <span className="font-semibold text-[#14161A]">{liveCall.equipment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6170]">Target Service SLA:</span>
                  <span className="font-semibold text-[#0EA5B7]">Emergency 2-Hour Dispatch</span>
                </div>
              </div>
            </div>

            {/* Live Transcript Stream */}
            <div className="lg:col-span-8 bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-4 flex flex-col max-h-72 overflow-y-auto">
              <span className="text-[10px] font-semibold text-[#9AA0AB] uppercase tracking-wider mb-2">
                Live Bilingual Transcription (Streaming)
              </span>

              <div className="space-y-2.5 flex-1">
                {liveCall.transcript.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      line.speaker === 'bot'
                        ? 'bg-white border border-[#ECE8E1] text-[#14161A]'
                        : 'bg-[#14161A] text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-70 mb-1">
                      <span className="font-semibold">
                        {line.speaker === 'bot' ? 'Thermiq AI Agent' : liveCall.callerName}
                      </span>
                      <span>{line.time}</span>
                    </div>
                    <p>{line.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multilingual Voice Engine Inspector */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
              Multilingual Voice Prompts & Logic Preview
            </h3>
            <p className="text-xs text-[#5B6170]">
              Dialect-tuned scripts automatically served based on audio accent detection
            </p>
          </div>

          {/* Language Toggle Chips */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl">
            {(['ar', 'ur', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setPreviewTab(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  previewTab === lang
                    ? 'bg-white text-[#14161A] shadow-xs border border-[#ECE8E1]'
                    : 'text-[#5B6170] hover:text-[#14161A]'
                }`}
              >
                {lang === 'ar' ? 'العربية (السعودية)' : lang === 'ur' ? 'اردو (Urdu)' : 'English (GCC)'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-1.5">
            <span className="text-[10px] font-semibold text-[#9AA0AB] uppercase">Initial Greeting</span>
            <p className="text-[#14161A] leading-relaxed italic">
              "{multilingualPreviews[previewTab].greeting}"
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-1.5">
            <span className="text-[10px] font-semibold text-[#9AA0AB] uppercase">Emergency Triage Prompt</span>
            <p className="text-[#14161A] leading-relaxed italic">
              "{multilingualPreviews[previewTab].emergencyTriage}"
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-1.5">
            <span className="text-[10px] font-semibold text-[#9AA0AB] uppercase">Dispatch Confirmation</span>
            <p className="text-[#14161A] leading-relaxed italic">
              "{multilingualPreviews[previewTab].bookingConfirm}"
            </p>
          </div>
        </div>
      </div>

      {/* Historical Call Log Table */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
              Inbound Call Records & Summaries
            </h3>
            <p className="text-xs text-[#5B6170]">
              Filter by caller dialect, call outcome, and automated summary
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#9AA0AB] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search caller, phone, intent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg text-[#14161A] placeholder-[#9AA0AB] outline-none"
              />
            </div>

            {/* Language filter */}
            <select
              value={selectedLanguageFilter}
              onChange={(e) => setSelectedLanguageFilter(e.target.value as any)}
              className="text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg px-2.5 py-1.5 text-[#14161A] outline-none"
            >
              <option value="all">All Languages</option>
              <option value="ar">Arabic</option>
              <option value="ur">Urdu</option>
              <option value="en">English</option>
            </select>

            {/* Outcome filter */}
            <select
              value={selectedOutcomeFilter}
              onChange={(e) => setSelectedOutcomeFilter(e.target.value)}
              className="text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg px-2.5 py-1.5 text-[#14161A] outline-none"
            >
              <option value="all">All Outcomes</option>
              <option value="booked">Booked</option>
              <option value="answered">Answered</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#ECE8E1] rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#9AA0AB] uppercase text-[10px] font-semibold border-b border-[#ECE8E1]">
              <tr>
                <th className="px-4 py-3">Caller & Time</th>
                <th className="px-4 py-3">Language</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Intent & Summary</th>
                <th className="px-4 py-3">Outcome</th>
                <th className="px-4 py-3 text-right">Consent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#14161A]">{log.callerName}</div>
                    <div className="font-mono text-[11px] text-[#9AA0AB]">{log.phone} · {log.timestamp}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#ECE8E1] text-[#5B6170]">
                      {log.language}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[#5B6170]">{log.duration}</td>
                  <td className="px-4 py-3 max-w-md">
                    <div className="font-medium text-[#14161A]">{log.intent}</div>
                    <div className="text-[11px] text-[#5B6170] truncate">{log.summary}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        log.outcome === 'booked'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : log.outcome === 'escalated'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {log.outcome}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-[10px] text-[#16A34A] font-medium flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Audio Recorded
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
