import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { translations } from '../../data/i18n';
import {
  LayoutDashboard,
  PhoneCall,
  Inbox,
  Users,
  Calendar,
  AlertOctagon,
  PhoneMissed,
  Mic,
  BookOpen,
  Wrench,
  AlertTriangle,
  Camera,
  Activity,
  Truck,
  MapPin,
  Package,
  ShieldCheck,
  FileCheck,
  Building,
  Flame,
  FileText,
  Kanban,
  BarChart3,
  Disc,
  CheckCircle2,
  Smile,
  Clock,
  HelpCircle,
  GitFork,
  Boxes,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    language,
    liveCall,
    conversations,
    escalations,
    quotations,
    missedCalls,
  } = useStore();

  const t = translations[language] || translations.en;

  const unreadInboxCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const pendingEscalations = escalations.filter((e) => e.status === 'pending').length;
  const pendingQuotes = quotations.filter((q) => !q.approvedByOwner).length;
  const pendingMissed = missedCalls.filter((m) => m.followUpStatus === 'pending').length;

  const navSections = [
    {
      eyebrow: 'Main',
      items: [
        { label: t.dashboard, path: '/', icon: LayoutDashboard },
        {
          label: t.voiceAgent,
          path: '/voice-agent',
          icon: PhoneCall,
          badge: liveCall.isActive ? 'LIVE' : undefined,
          badgeType: 'urgent',
        },
        {
          label: t.unifiedInbox,
          path: '/inbox',
          icon: Inbox,
          badge: unreadInboxCount > 0 ? unreadInboxCount : undefined,
        },
        { label: t.leads, path: '/leads', icon: Users },
        { label: t.bookingCalendar, path: '/booking', icon: Calendar },
      ],
    },
    {
      eyebrow: 'Operations',
      items: [
        {
          label: t.escalations,
          path: '/escalations',
          icon: AlertOctagon,
          badge: pendingEscalations > 0 ? pendingEscalations : undefined,
          badgeType: 'urgent',
        },
        { label: t.hvacAssistant, path: '/hvac-assistant', icon: Wrench },
        { label: t.faultAssessment, path: '/fault-assessment', icon: AlertTriangle },
        { label: t.equipmentScanner, path: '/equipment-scanner', icon: Camera },
        { label: t.predictiveAlerts, path: '/predictive-alerts', icon: Activity },
        { label: t.technicianBoard, path: '/dispatch', icon: Truck },
        { label: t.liveTracking, path: '/tracking', icon: MapPin },
        { label: t.spareParts, path: '/spare-parts', icon: Package },
        { label: t.contracts, path: '/contracts', icon: FileCheck },
        { label: t.warrantyCheck, path: '/warranty', icon: ShieldCheck },
        { label: t.branches, path: '/branches', icon: Building },
        { label: t.campaigns, path: '/campaigns', icon: Flame },
      ],
    },
    {
      eyebrow: 'Tools & Sales',
      items: [
        {
          label: t.quotations,
          path: '/quotations',
          icon: FileText,
          badge: pendingQuotes > 0 ? pendingQuotes : undefined,
        },
        { label: t.followups, path: '/followups', icon: Kanban },
        { label: t.salesReports, path: '/sales-reports', icon: BarChart3 },
        {
          label: t.missedCalls,
          path: '/missed-calls',
          icon: PhoneMissed,
          badge: pendingMissed > 0 ? pendingMissed : undefined,
        },
        { label: t.voiceNotes, path: '/voice-notes', icon: Mic },
        { label: t.knowledgeBase, path: '/knowledge', icon: BookOpen },
      ],
    },
    {
      eyebrow: 'Quality & System',
      items: [
        { label: t.callRecordings, path: '/call-recordings', icon: Disc },
        { label: t.qualityReview, path: '/quality-review', icon: CheckCircle2 },
        { label: t.customerFeedback, path: '/feedback', icon: Smile },
        { label: t.slaMonitoring, path: '/sla', icon: Clock },
        { label: t.unanswered, path: '/unanswered', icon: HelpCircle },
        { label: t.workflows, path: '/workflows', icon: GitFork },
        { label: t.integrations, path: '/integrations', icon: Boxes },
        { label: t.onboarding, path: '/onboarding', icon: PlayCircle },
      ],
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-[#ECEBF2] h-screen sticky top-0 flex flex-col justify-between transition-all duration-300 z-40 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header matching attachment logo style */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-[#F0EFF6]">
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            {/* Attachment Style Purple AI Icon */}
            <div className="w-9 h-9 rounded-xl bg-[#7C5CFC]/10 flex items-center justify-center text-[#7C5CFC]">
              <span className="font-extrabold text-sm tracking-tighter flex items-center font-sans">
                <span className="text-[#7C5CFC]">Ai</span>
              </span>
            </div>
            <div>
              <div className="font-bold text-base text-[#141416] tracking-tight flex items-center gap-1.5">
                <span>THERMIQ</span>
              </div>
              <div className="text-[10px] text-[#A1A5B7] font-medium tracking-tight">
                Operations Platform
              </div>
            </div>
          </div>
        ) : (
          <div className="w-9 h-9 mx-auto rounded-xl bg-[#7C5CFC]/10 flex items-center justify-center text-[#7C5CFC] font-extrabold text-sm">
            Ai
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#A1A5B7] hover:text-[#141416] p-1.5 rounded-lg hover:bg-[#F5F4FA] transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {navSections.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <div className="px-4 py-1 text-[11px] font-medium text-[#A1A5B7]">
                {sec.eyebrow}
              </div>
            )}
            {sec.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-full text-xs transition-all group ${
                      isActive
                        ? 'bg-[#141416] text-white font-medium shadow-sm'
                        : 'text-[#7E8299] hover:text-[#141416] hover:bg-[#F5F4FA]'
                    }`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-[#7E8299] group-hover:text-[#141416]'
                        }`}
                        strokeWidth={1.75}
                      />
                      {!collapsed && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}
                      {!collapsed && item.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badgeType === 'urgent'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-[#F0EFF6] text-[#7E8299]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Branch / Status Pill */}
      {!collapsed && (
        <div className="p-4 border-t border-[#F0EFF6] m-2">
          <div className="bg-[#F8F7FC] rounded-2xl p-3 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-medium text-[#141416] text-[11px]">System Online</span>
            </div>
            <span className="text-[10px] text-[#A1A5B7] font-mono">GCC v2.4</span>
          </div>
        </div>
      )}
    </aside>
  );
};
