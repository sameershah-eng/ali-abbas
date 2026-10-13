import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { translations } from '../../data/i18n';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Users,
  Calendar,
  FileText,
  DollarSign,
  ArrowUpRight,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Play,
  Sun,
  Truck,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Zap,
  ArrowRight,
  Activity,
  AlertCircle,
  Eye,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

export const OwnerDashboard: React.FC = () => {
  const {
    language,
    leads,
    callLogs,
    quotations,
    appointments,
    escalations,
    activeJobs,
    liveCall,
    startLiveCallSimulation,
    simulateNextCallLine,
    endLiveCallSimulation,
  } = useStore();

  const [trendView, setTrendView] = useState<'week' | 'month'>('week');

  const t = translations[language] || translations.en;

  const totalRevenueMTD = quotations
    .filter((q) => q.status === 'sent' || q.status === 'accepted')
    .reduce((acc, q) => acc + q.totalSar, 0);

  // Modern Bar Chart data matching attachment
  const productivityData = [
    { day: 'Sun', hours: 4.2, highlight: false },
    { day: 'Mon', hours: 8.5, highlight: true, tooltip: '4 hours' },
    { day: 'Tue', hours: 6.8, highlight: false },
    { day: 'Wed', hours: 9.4, highlight: false },
    { day: 'Thu', hours: 7.6, highlight: false, pattern: true },
    { day: 'Fri', hours: 8.9, highlight: false },
    { day: 'Sat', hours: 3.1, highlight: false },
  ];

  // Performance Analytics Table data matching attachment
  const performanceTasks = [
    {
      task: 'Carrier Chillers Diagnostics',
      date: '12 Oct, 2026',
      accuracy: '97%',
      duration: '1.8m',
      status: 'Success',
      statusColor: 'text-[#10B981]',
    },
    {
      task: 'Circuit Breaker Fault Intake',
      date: '13 Oct, 2026',
      accuracy: '88%',
      duration: '1.2m',
      status: 'Warning',
      statusColor: 'text-[#FF7A00]',
    },
    {
      task: 'Zamil Inverter PCB Review',
      date: '14 Oct, 2026',
      accuracy: '74%',
      duration: '2.8s',
      status: 'Failed',
      statusColor: 'text-[#FF3B30]',
    },
    {
      task: 'Daikin VRV Capacity Balancing',
      date: '14 Oct, 2026',
      accuracy: '96%',
      duration: '1.5m',
      status: 'Success',
      statusColor: 'text-[#10B981]',
    },
  ];

  return (
    <div className="p-8 lg:p-10 space-y-8 max-w-[1500px] mx-auto">
      {/* Title & Greeting matching attachment "Hello Moni" */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#141416]">
            Hello Bandar
          </h1>
          <p className="text-sm text-[#7E8299] mt-1 font-normal">
            Monitor performance and AI insights in real time.
          </p>
        </div>

        {/* Ambient indicator pill */}
        <div className="flex items-center gap-2 bg-white border border-[#EAE9F0] rounded-full px-4 py-2 shadow-xs text-xs text-[#7E8299]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-medium text-[#141416]">Riyadh 43°C</span>
          <span>·</span>
          <span>Peak Cooling Grid Active</span>
        </div>
      </div>

      {/* TOP ROW: 3 Pastel Cards + 1 Dark Pill & Pro Card Stack (Exactly as in attachment) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Warm Peach Pastel */}
        <div className="bg-[#FEEFD8] rounded-3xl p-7 flex flex-col justify-between min-h-[175px] shadow-xs relative group hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-base font-bold text-[#141416] tracking-tight">
              Total Interaction
            </h3>
            <p className="text-xs text-[#6E7191] mt-0.5 font-medium">
              Total Interaction
            </p>
          </div>

          <div className="flex items-end justify-between mt-6">
            <span className="text-3xl font-extrabold text-[#141416] tracking-tight font-mono-numbers">
              {(callLogs.length * 40 + 12480).toLocaleString()}
            </span>

            <Link
              to="/voice-agent"
              className="w-9 h-9 rounded-full bg-[#141416] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
              title="View Inbound Voice Details"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Card 2: Soft Sky Blue Pastel */}
        <div className="bg-[#DCEBFE] rounded-3xl p-7 flex flex-col justify-between min-h-[175px] shadow-xs relative group hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-base font-bold text-[#141416] tracking-tight">
              Active Users
            </h3>
            <p className="text-xs text-[#6E7191] mt-0.5 font-medium">
              Total Interaction
            </p>
          </div>

          <div className="flex items-end justify-between mt-6">
            <span className="text-3xl font-extrabold text-[#141416] tracking-tight font-mono-numbers">
              {(leads.length * 15 + 1376).toLocaleString()}
            </span>

            <Link
              to="/dispatch"
              className="w-9 h-9 rounded-full bg-[#141416] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
              title="View Active Users & Fleet"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Card 3: Soft Lavender / Mist Pastel */}
        <div className="bg-[#EFF0F6] rounded-3xl p-7 flex flex-col justify-between min-h-[175px] shadow-xs relative group hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-base font-bold text-[#141416] tracking-tight">
              AI Accuracy
            </h3>
            <p className="text-xs text-[#6E7191] mt-0.5 font-medium">
              Total Interaction
            </p>
          </div>

          <div className="flex items-end justify-between mt-6">
            <span className="text-3xl font-extrabold text-[#141416] tracking-tight font-mono-numbers">
              96.7%
            </span>

            <Link
              to="/quality-review"
              className="w-9 h-9 rounded-full bg-[#141416] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
              title="View Accuracy Insights"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Column 4: Overlapping Dark Pill + PRO Banner (Matching attachment right top) */}
        <div className="flex flex-col justify-between space-y-3">
          {/* Overlapping Floating Dark Pills */}
          <div className="relative">
            {/* Top dark pill */}
            <div className="bg-[#18181B] text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#7C5CFC]/20 text-[#A78BFA] flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">16 hours</div>
                  <div className="text-[10px] text-[#A1A5B7] leading-tight">this month</div>
                </div>
              </div>
              <span className="text-[11px] text-[#A1A5B7] font-medium">Saved</span>
            </div>

            {/* Second overlapping dark pill behind */}
            <div className="bg-[#27272A] text-white rounded-2xl px-4 py-2.5 flex items-center justify-between -mt-2 mx-1 shadow-sm opacity-90">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 text-[#D4D4D8] flex items-center justify-center">
                  <Clock className="w-3 h-3" />
                </div>
                <div>
                  <div className="text-xs font-semibold leading-tight">14 hours</div>
                  <div className="text-[10px] text-[#A1A5B7] leading-tight">previous month</div>
                </div>
              </div>
              <span className="text-[10px] text-[#A1A5B7]">Saved</span>
            </div>
          </div>

          {/* Pro / Switch Banner with glossy dark gradient */}
          <div className="bg-gradient-to-r from-[#4A5568] via-[#5A647F] to-[#6E7A9F] rounded-2xl p-4 text-white relative overflow-hidden shadow-sm flex items-center justify-between group">
            <div className="space-y-1 pr-3">
              <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold tracking-wider uppercase">
                PRO
              </span>
              <h4 className="text-xs font-bold text-white leading-snug">
                Switch to AI Insights Professional today!
              </h4>
            </div>

            <Link
              to="/workflows"
              className="w-8 h-8 rounded-full bg-[#141416]/50 text-white flex items-center justify-center shrink-0 group-hover:bg-[#141416] transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>

      {/* SECOND ROW: Productivity Trends Bar Chart & AI Insights List (Matching attachment) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Productivity Trends Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-7 border border-[#ECEBF2] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#141416] tracking-tight">
                  Productivity Trends
                </h3>
                <p className="text-xs text-[#7E8299] mt-0.5">
                  Daily Focus hours
                </p>
              </div>

              {/* Time dropdown pill matching attachment */}
              <button
                onClick={() => setTrendView(trendView === 'week' ? 'month' : 'week')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9FD] border border-[#ECEBF2] rounded-full text-xs font-medium text-[#141416] hover:bg-[#F4F3F8] transition-colors"
              >
                <span>Week</span>
                <ChevronDown className="w-3 h-3 text-[#7E8299]" />
              </button>
            </div>

            {/* Metric + Bar Chart layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-end">
              {/* Left metric box */}
              <div className="md:col-span-4 space-y-2">
                <div className="text-3xl font-extrabold text-[#141416] tracking-tight font-mono-numbers">
                  14 h
                </div>
                <div className="text-xs text-[#7E8299]">logged this week</div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E2F7EB] text-[#10B981] text-xs font-bold">
                  <span>+12% vs last week</span>
                </div>
              </div>

              {/* Right Bars */}
              <div className="md:col-span-8 h-48 w-full relative">
                {/* Highlight floating tooltip for selected day */}
                <div className="absolute top-0 left-[24%] transform -translate-x-1/2 -translate-y-2 z-10 bg-[#141416] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                  4 hours
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productivityData} barSize={26}>
                    <XAxis
                      dataKey="day"
                      stroke="#A1A5B7"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={false}
                      contentStyle={{
                        backgroundColor: '#141416',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '11px',
                        border: 'none',
                      }}
                      formatter={(val: any) => [`${val} hours`, 'Focus Hours']}
                    />
                    <Bar dataKey="hours" radius={[12, 12, 12, 12]}>
                      {productivityData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.day === 'Sat'
                              ? '#F4F3F8'
                              : entry.day === 'Mon'
                              ? '#9373FF'
                              : entry.day === 'Thu'
                              ? '#8B5CF6'
                              : '#7C5CFC'
                          }
                          opacity={entry.day === 'Sat' ? 0.6 : 1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Insights Card (5 cols) matching attachment */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-7 border border-[#ECEBF2] shadow-xs space-y-5">
          <h3 className="text-base font-bold text-[#141416] tracking-tight">
            AI Insights
          </h3>

          <div className="space-y-4">
            {/* Item 1: Violet circle */}
            <div className="p-4 rounded-2xl bg-[#F8F7FD] border border-[#ECEBF2] space-y-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#7C5CFC] text-white flex items-center justify-center shrink-0">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-[#141416]">
                  User Behavior Trends
                </h4>
              </div>
              <p className="text-[11px] text-[#7E8299] leading-relaxed pl-9.5">
                Increased user engagement observed consistently during identified peak activity hours.
              </p>
              <div className="pl-9.5 pt-0.5">
                <Link
                  to="/voice-agent"
                  className="text-xs font-bold text-[#7C5CFC] hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Item 2: Orange circle */}
            <div className="p-4 rounded-2xl bg-[#FAF9FD] border border-[#ECEBF2] space-y-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#FF6A3D] text-white flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-[#141416]">
                  Risk & Anomaly Alerts
                </h4>
              </div>
              <p className="text-[11px] text-[#7E8299] leading-relaxed pl-9.5">
                AI detects unusual behavior patterns and alert teams for immediate operational review.
              </p>
              <div className="pl-9.5 pt-0.5">
                <Link
                  to="/predictive-alerts"
                  className="text-xs font-bold text-[#7C5CFC] hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Item 3: Green circle */}
            <div className="p-4 rounded-2xl bg-[#FAF9FD] border border-[#ECEBF2] space-y-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-[#141416]">
                  Growth Suggestions
                </h4>
              </div>
              <p className="text-[11px] text-[#7E8299] leading-relaxed pl-9.5">
                AI recommends actionable improvements to increase user engagement, retention, and overall growth.
              </p>
              <div className="pl-9.5 pt-0.5">
                <Link
                  to="/campaigns"
                  className="text-xs font-bold text-[#7C5CFC] hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THIRD ROW: Performance Analytics Table (Matching attachment) + Live Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Performance Analytics Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-7 border border-[#ECEBF2] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#141416] tracking-tight">
              Performance Analytics
            </h3>
            <span className="text-xs text-[#7E8299]">Live Operations</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[#A1A5B7] font-semibold text-[11px] border-b border-[#F0EFF6]">
                <tr>
                  <th className="pb-3 font-medium">AI Task</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Accuracy</th>
                  <th className="pb-3 font-medium">Duration</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EFF6]">
                {performanceTasks.map((t, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF9FD] transition-colors">
                    <td className="py-4 font-semibold text-[#141416]">{t.task}</td>
                    <td className="py-4 text-[#7E8299]">{t.date}</td>
                    <td className="py-4 text-[#141416] font-medium font-mono-numbers">{t.accuracy}</td>
                    <td className="py-4 text-[#7E8299] font-mono-numbers">{t.duration}</td>
                    <td className="py-4 text-right">
                      <span className={`inline-flex items-center gap-1.5 font-bold ${t.statusColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{t.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Active Voice Agent Simulator & Quick Actions (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-7 border border-[#ECEBF2] shadow-xs flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EFF6]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                <h3 className="text-sm font-bold text-[#141416]">
                  24/7 AI Voice Dispatch Console
                </h3>
              </div>

              {liveCall.isActive ? (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-700">
                  Call Active
                </span>
              ) : (
                <button
                  onClick={startLiveCallSimulation}
                  className="px-3 py-1 bg-[#141416] text-white rounded-full text-xs font-semibold hover:bg-[#2A2A30] transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3" /> Simulate Call
                </button>
              )}
            </div>

            {liveCall.isActive ? (
              <div className="mt-4 p-4 rounded-2xl bg-[#F8F7FD] border border-[#ECEBF2] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#141416]">{liveCall.callerName}</span>
                  <span className="font-mono text-[11px] text-[#7E8299]">{liveCall.callerPhone}</span>
                </div>
                <div className="text-xs text-[#7E8299] truncate">{liveCall.issue}</div>

                {/* Animated waves */}
                <div className="flex items-center justify-center gap-1 py-2">
                  {[24, 48, 16, 64, 82, 36, 70, 92, 44, 28, 54, 78, 62].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-[#7C5CFC] rounded-full transition-all duration-300"
                      style={{ height: `${Math.max(8, h * 0.4)}px` }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#ECEBF2]">
                  <button
                    onClick={simulateNextCallLine}
                    className="px-3 py-1 bg-white border border-[#ECEBF2] rounded-full text-xs font-medium text-[#141416] hover:bg-[#F4F3F8]"
                  >
                    Next Turn
                  </button>
                  <button
                    onClick={endLiveCallSimulation}
                    className="px-3 py-1 bg-[#10B981] text-white rounded-full text-xs font-bold hover:bg-[#0EA572]"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-5 rounded-2xl bg-[#F8F7FD] border border-[#ECEBF2] text-xs text-[#7E8299] space-y-3">
                <p>
                  Zero latency speech recognition active across VoIP lines in Riyadh, Jeddah, and Eastern Province.
                </p>
                <div className="flex items-center justify-between text-[#141416] font-medium pt-2 border-t border-[#ECEBF2]">
                  <span>Active Field Vans:</span>
                  <strong className="text-[#7C5CFC] font-mono">14 Trucks</strong>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <Link
              to="/dispatch"
              className="w-full py-3 bg-[#141416] text-white rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#2A2A30] transition-colors"
            >
              <span>Open Field Dispatch Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
