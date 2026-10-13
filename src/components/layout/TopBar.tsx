import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { translations } from '../../data/i18n';
import { Language, BranchId } from '../../types';
import {
  Search,
  Globe,
  Building2,
  Bell,
  Eye,
  SlidersHorizontal,
  PhoneCall,
  Check,
  ChevronDown,
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    language,
    setLanguage,
    selectedBranch,
    setSelectedBranch,
    branches,
    notifications,
    markNotificationRead,
    isCustomerView,
    setIsCustomerView,
    setCommandPaletteOpen,
    liveCall,
  } = useStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showBranchMenu, setShowBranchMenu] = useState(false);

  const t = translations[language] || translations.en;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const currentBranchName =
    selectedBranch === 'all'
      ? t.allBranches
      : branches.find((b) => b.id === selectedBranch)?.name || t.allBranches;

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  const handleBranchSelect = (bId: BranchId | 'all') => {
    setSelectedBranch(bId);
    setShowBranchMenu(false);
  };

  return (
    <header className="h-20 bg-transparent px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Search pill matching attachment */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#E8E7EE] rounded-full text-xs text-[#7E8299] hover:border-[#7C5CFC]/40 transition-colors shadow-xs group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#A1A5B7] group-hover:text-[#141416]" />
            <span className="font-normal">Search or type a command...</span>
          </div>
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-[#F4F3F8] rounded-full font-mono text-[#7E8299] border border-[#E8E7EE]">
            ⌘ K
          </kbd>
        </button>

        {/* Live Call badge if active */}
        {liveCall.isActive && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-xs text-red-700 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-medium">Live Voice Call</span>
          </div>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Branch Selector Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setShowBranchMenu(!showBranchMenu);
              setShowLangMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E8E7EE] rounded-full text-xs font-medium text-[#141416] hover:bg-[#F5F4FA] transition-colors shadow-xs"
          >
            <Building2 className="w-3.5 h-3.5 text-[#7E8299]" />
            <span className="max-w-[130px] truncate">{currentBranchName}</span>
            <ChevronDown className="w-3 h-3 text-[#A1A5B7]" />
          </button>

          {showBranchMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#ECEBF2] rounded-2xl shadow-xl p-1.5 z-40 text-xs">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-[#A1A5B7] uppercase tracking-wider">
                {t.branch}
              </div>
              <button
                onClick={() => handleBranchSelect('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left ${
                  selectedBranch === 'all' ? 'bg-[#F4F3F8] font-semibold text-[#7C5CFC]' : 'text-[#141416] hover:bg-[#F4F3F8]'
                }`}
              >
                <span>{t.allBranches}</span>
                {selectedBranch === 'all' && <Check className="w-3.5 h-3.5 text-[#7C5CFC]" />}
              </button>
              {branches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleBranchSelect(b.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left ${
                    selectedBranch === b.id ? 'bg-[#F4F3F8] font-semibold text-[#7C5CFC]' : 'text-[#141416] hover:bg-[#F4F3F8]'
                  }`}
                >
                  <div>
                    <div className="font-medium">{b.name}</div>
                    <div className="text-[10px] text-[#A1A5B7]">{b.city}</div>
                  </div>
                  {selectedBranch === b.id && <Check className="w-3.5 h-3.5 text-[#7C5CFC]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowBranchMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E8E7EE] rounded-full text-xs font-medium text-[#141416] hover:bg-[#F5F4FA] transition-colors shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#7E8299]" />
            <span className="uppercase font-semibold">{language}</span>
            <ChevronDown className="w-3 h-3 text-[#A1A5B7]" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-[#ECEBF2] rounded-2xl shadow-xl p-1.5 z-40 text-xs">
              <button
                onClick={() => handleLangSelect('en')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left ${
                  language === 'en' ? 'bg-[#F4F3F8] font-semibold text-[#7C5CFC]' : 'text-[#141416] hover:bg-[#F4F3F8]'
                }`}
              >
                <span>English (EN)</span>
                {language === 'en' && <Check className="w-3.5 h-3.5 text-[#7C5CFC]" />}
              </button>
              <button
                onClick={() => handleLangSelect('ar')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-right font-arabic ${
                  language === 'ar' ? 'bg-[#F4F3F8] font-semibold text-[#7C5CFC]' : 'text-[#141416] hover:bg-[#F4F3F8]'
                }`}
              >
                <span>العربية (AR)</span>
                {language === 'ar' && <Check className="w-3.5 h-3.5 text-[#7C5CFC]" />}
              </button>
              <button
                onClick={() => handleLangSelect('ur')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-right font-urdu ${
                  language === 'ur' ? 'bg-[#F4F3F8] font-semibold text-[#7C5CFC]' : 'text-[#141416] hover:bg-[#F4F3F8]'
                }`}
              >
                <span>اردو (UR)</span>
                {language === 'ur' && <Check className="w-3.5 h-3.5 text-[#7C5CFC]" />}
              </button>
            </div>
          )}
        </div>

        {/* Customer View Toggle Pill */}
        <button
          onClick={() => setIsCustomerView(!isCustomerView)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all shadow-xs ${
            isCustomerView
              ? 'bg-[#141416] text-white shadow-sm'
              : 'bg-white border border-[#E8E7EE] text-[#141416] hover:bg-[#F5F4FA]'
          }`}
          title="Toggle customer website chat widget simulation"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.customerView}</span>
        </button>

        {/* Notifications Round Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowBranchMenu(false);
              setShowLangMenu(false);
            }}
            className="w-10 h-10 bg-white border border-[#E8E7EE] rounded-full text-[#7E8299] hover:text-[#141416] hover:bg-[#F5F4FA] transition-colors relative flex items-center justify-center shadow-xs"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF6A3D]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#ECEBF2] rounded-3xl shadow-xl p-4 z-40 text-xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#ECEBF2] mb-2.5">
                <span className="font-semibold text-xs text-[#141416]">{t.notifications}</span>
                <span className="text-[10px] text-[#A1A5B7]">{unreadCount} unread</span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-[#A1A5B7]">No new notifications</div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                        notif.read
                          ? 'bg-[#F8F7FC] border-[#ECEBF2] opacity-75'
                          : 'bg-white border-[#ECEBF2] hover:border-[#7C5CFC]/40 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-medium text-[#141416]">{notif.title}</span>
                        <span className="text-[10px] text-[#A1A5B7]">{notif.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-[#7E8299] mt-1 leading-snug">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Circular Avatar matching top right of attachment */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FFA800] p-0.5 shadow-xs cursor-pointer flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#E8804C] flex items-center justify-center text-white font-bold text-xs overflow-hidden">
              <span className="font-serif">BA</span>
            </div>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-white" />
        </div>
      </div>
    </header>
  );
};
