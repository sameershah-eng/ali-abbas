import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  LayoutDashboard,
  PhoneCall,
  Inbox,
  Users,
  Calendar,
  AlertTriangle,
  FileQuestion,
  Wrench,
  Activity,
  MapPin,
  Package,
  FileText,
  DollarSign,
  Settings,
  Sparkles,
  X,
  Languages,
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    triggerRandomEvent,
    startLiveCallSimulation,
    setSelectedBranch,
    setLanguage,
  } = useStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const navigationItems = [
    { label: 'Executive Dashboard', path: '/', icon: LayoutDashboard, group: 'Navigation' },
    { label: 'Live 24/7 Voice Agent Console', path: '/voice-agent', icon: PhoneCall, group: 'Communication' },
    { label: 'Unified Omnichannel Inbox', path: '/inbox', icon: Inbox, group: 'Communication' },
    { label: 'Enquiries & Lead Qualification', path: '/leads', icon: Users, group: 'Communication' },
    { label: 'Technician Booking & Calendar', path: '/booking', icon: Calendar, group: 'Operations' },
    { label: 'Live Fleet Tracking & Route Map', path: '/tracking', icon: MapPin, group: 'Operations' },
    { label: 'Fault Prioritization & Intake', path: '/fault-assessment', icon: AlertTriangle, group: 'Operations' },
    { label: 'HVAC Guided Troubleshooting', path: '/hvac-assistant', icon: Wrench, group: 'Operations' },
    { label: 'Equipment OCR & Scanner', path: '/equipment-scanner', icon: Search, group: 'Operations' },
    { label: 'Predictive Maintenance & IoT Sensors', path: '/predictive-alerts', icon: Activity, group: 'Operations' },
    { label: 'Spare Parts Inventory & Prices', path: '/spare-parts', icon: Package, group: 'Operations' },
    { label: 'Quotations & VAT Billing (15%)', path: '/quotations', icon: FileText, group: 'Sales' },
    { label: 'Sales Funnel & Revenue Analytics', path: '/sales-reports', icon: DollarSign, group: 'Sales' },
    { label: 'Knowledge Base & Policies', path: '/knowledge', icon: FileQuestion, group: 'Operations' },
    { label: 'Automations & Rules Engine', path: '/workflows', icon: Settings, group: 'Settings' },
  ];

  const quickActions = [
    {
      label: 'Simulate Inbound Voice Call',
      action: () => {
        navigate('/voice-agent');
        startLiveCallSimulation();
        setCommandPaletteOpen(false);
      },
      icon: PhoneCall,
      group: 'Quick Action',
    },
    {
      label: 'Simulate Incoming Emergency Event (Toast)',
      action: () => {
        triggerRandomEvent();
        setCommandPaletteOpen(false);
      },
      icon: Sparkles,
      group: 'Quick Action',
    },
    {
      label: 'Switch to Riyadh Central Branch',
      action: () => {
        setSelectedBranch('riyadh-main');
        setCommandPaletteOpen(false);
      },
      icon: MapPin,
      group: 'Branch Switch',
    },
    {
      label: 'Switch to Jeddah West Branch',
      action: () => {
        setSelectedBranch('jeddah-west');
        setCommandPaletteOpen(false);
      },
      icon: MapPin,
      group: 'Branch Switch',
    },
    {
      label: 'Switch Language to Arabic (العربية)',
      action: () => {
        setLanguage('ar');
        setCommandPaletteOpen(false);
      },
      icon: Languages,
      group: 'Language',
    },
    {
      label: 'Switch Language to English',
      action: () => {
        setLanguage('en');
        setCommandPaletteOpen(false);
      },
      icon: Languages,
      group: 'Language',
    },
  ];

  const filteredNav = navigationItems.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredActions = quickActions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-[#ECEBF2] rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[75vh]"
        >
          {/* Search Header */}
          <div className="p-4 border-b border-[#ECEBF2] flex items-center gap-3">
            <Search className="w-4 h-4 text-[#A1A5B7]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or jump to page..."
              className="flex-1 bg-transparent border-0 outline-none text-sm text-[#141416] placeholder-[#A1A5B7]"
            />
            <button
              onClick={() => setCommandPaletteOpen(false)}
              className="text-xs bg-[#F4F3F8] border border-[#ECEBF2] px-2 py-0.5 rounded-full text-[#7E8299] hover:text-[#141416]"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto p-3 space-y-4 text-xs">
            {filteredActions.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[10px] font-semibold tracking-wider text-[#A1A5B7] uppercase">
                  Quick Actions
                </div>
                <div className="space-y-1">
                  {filteredActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={idx}
                        onClick={action.action}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-left text-[#141416] hover:bg-[#F8F7FD] hover:text-[#7C5CFC] transition-colors group"
                      >
                        <div className="p-1.5 rounded-xl bg-[#F4F3F8] border border-[#ECEBF2] group-hover:border-[#7C5CFC]/30 group-hover:bg-[#7C5CFC]/10">
                          <Icon className="w-3.5 h-3.5 text-[#7E8299] group-hover:text-[#7C5CFC]" />
                        </div>
                        <span className="font-medium flex-1">{action.label}</span>
                        <span className="text-[10px] text-[#A1A5B7]">{action.group}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {filteredNav.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[10px] font-semibold tracking-wider text-[#A1A5B7] uppercase">
                  Jump to Module
                </div>
                <div className="space-y-1">
                  {filteredNav.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          navigate(item.path);
                          setCommandPaletteOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-left text-[#141416] hover:bg-[#F8F7FD] hover:text-[#7C5CFC] transition-colors group"
                      >
                        <div className="p-1.5 rounded-xl bg-[#F4F3F8] border border-[#ECEBF2] group-hover:border-[#7C5CFC]/30 group-hover:bg-[#7C5CFC]/10">
                          <Icon className="w-3.5 h-3.5 text-[#7E8299] group-hover:text-[#7C5CFC]" />
                        </div>
                        <span className="font-medium flex-1">{item.label}</span>
                        <span className="text-[10px] text-[#A1A5B7]">{item.group}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {filteredNav.length === 0 && filteredActions.length === 0 && (
              <div className="p-6 text-center text-[#A1A5B7]">
                No matching results found for "{query}".
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 bg-[#F8F7FD] border-t border-[#ECEBF2] text-[11px] text-[#A1A5B7] flex justify-between items-center px-4">
            <span>Pro tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-[#ECEBF2] rounded text-[10px]">Ctrl+K</kbd> anywhere</span>
            <span className="font-medium text-[#7C5CFC]">Thermiq Operations OS</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
