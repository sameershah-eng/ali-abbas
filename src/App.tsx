import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useStore } from './store/useStore';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { CommandPalette } from './components/layout/CommandPalette';
import { CustomerWidget } from './components/layout/CustomerWidget';
import { ToastContainer } from './components/ui/ToastContainer';

// Feature Views
import { OwnerDashboard } from './features/dashboard/OwnerDashboard';
import { VoiceAgentConsole } from './features/voice/VoiceAgentConsole';
import { UnifiedInbox } from './features/inbox/UnifiedInbox';
import { LeadQualification } from './features/leads/LeadQualification';
import { BookingCalendar } from './features/booking/BookingCalendar';
import { HumanHandoff } from './features/escalation/HumanHandoff';
import { MissedCallsView } from './features/missed-calls/MissedCallsView';
import { VoiceNoteTranscription } from './features/voice-notes/VoiceNoteTranscription';
import { KnowledgeBase } from './features/knowledge/KnowledgeBase';
import { HvacAssistant } from './features/hvac/HvacAssistant';
import { FaultAssessment } from './features/hvac/FaultAssessment';
import { EquipmentScanner } from './features/hvac/EquipmentScanner';
import { PredictiveAlerts } from './features/hvac/PredictiveAlerts';
import { TechnicianBoard } from './features/dispatch/TechnicianBoard';
import { LiveTrackingMap } from './features/tracking/LiveTrackingMap';
import { SparePartsLookup } from './features/parts/SparePartsLookup';
import { ContractsManager } from './features/contracts/ContractsManager';
import { WarrantyVerifier } from './features/warranty/WarrantyVerifier';
import { BranchManager } from './features/branches/BranchManager';
import { SeasonalCampaigns } from './features/campaigns/SeasonalCampaigns';
import { QuotationBuilder } from './features/quotations/QuotationBuilder';
import { FollowUpKanban } from './features/followups/FollowUpKanban';
import { SalesAnalytics } from './features/sales/SalesAnalytics';
import { CallRecordingsView } from './features/recordings/CallRecordingsView';
import { QualityReview } from './features/quality/QualityReview';
import { CustomerSurveys } from './features/feedback/CustomerSurveys';
import { ResponseTimeMonitoring } from './features/sla/ResponseTimeMonitoring';
import { UnansweredQuestions } from './features/unanswered/UnansweredQuestions';
import { WorkflowBuilder } from './features/automations/WorkflowBuilder';
import { IntegrationsHub } from './features/integrations/IntegrationsHub';
import { SetupChecklist } from './features/onboarding/SetupChecklist';

// Route wrapper for page transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="p-8 space-y-6 max-w-[1500px] mx-auto animate-pulse">
        <div className="h-9 bg-[#E8E7EE] rounded-2xl w-64" />
        <div className="h-4 bg-[#E8E7EE] rounded-lg w-96" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          <div className="h-36 bg-[#E8E7EE] rounded-3xl" />
          <div className="h-36 bg-[#E8E7EE] rounded-3xl" />
          <div className="h-36 bg-[#E8E7EE] rounded-3xl" />
          <div className="h-36 bg-[#E8E7EE] rounded-3xl" />
        </div>
        <div className="h-96 bg-[#E8E7EE]/80 rounded-3xl mt-6" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-200">
      {children}
    </div>
  );
};

export default function App() {
  const { language, triggerRandomEvent } = useStore();

  // Set RTL or LTR on body
  useEffect(() => {
    document.documentElement.dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Periodic simulated events (every 30 seconds a realistic event arrives)
  useEffect(() => {
    const interval = setInterval(() => {
      triggerRandomEvent();
    }, 32000);
    return () => clearInterval(interval);
  }, [triggerRandomEvent]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-[#FAF8F5] text-[#14161A]">
        {/* Persistent Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />

          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<PageWrapper><OwnerDashboard /></PageWrapper>} />
              <Route path="/voice-agent" element={<PageWrapper><VoiceAgentConsole /></PageWrapper>} />
              <Route path="/inbox" element={<PageWrapper><UnifiedInbox /></PageWrapper>} />
              <Route path="/leads" element={<PageWrapper><LeadQualification /></PageWrapper>} />
              <Route path="/booking" element={<PageWrapper><BookingCalendar /></PageWrapper>} />
              <Route path="/escalations" element={<PageWrapper><HumanHandoff /></PageWrapper>} />
              <Route path="/missed-calls" element={<PageWrapper><MissedCallsView /></PageWrapper>} />
              <Route path="/voice-notes" element={<PageWrapper><VoiceNoteTranscription /></PageWrapper>} />
              <Route path="/knowledge" element={<PageWrapper><KnowledgeBase /></PageWrapper>} />
              <Route path="/hvac-assistant" element={<PageWrapper><HvacAssistant /></PageWrapper>} />
              <Route path="/fault-assessment" element={<PageWrapper><FaultAssessment /></PageWrapper>} />
              <Route path="/equipment-scanner" element={<PageWrapper><EquipmentScanner /></PageWrapper>} />
              <Route path="/predictive-alerts" element={<PageWrapper><PredictiveAlerts /></PageWrapper>} />
              <Route path="/dispatch" element={<PageWrapper><TechnicianBoard /></PageWrapper>} />
              <Route path="/tracking" element={<PageWrapper><LiveTrackingMap /></PageWrapper>} />
              <Route path="/spare-parts" element={<PageWrapper><SparePartsLookup /></PageWrapper>} />
              <Route path="/contracts" element={<PageWrapper><ContractsManager /></PageWrapper>} />
              <Route path="/warranty" element={<PageWrapper><WarrantyVerifier /></PageWrapper>} />
              <Route path="/branches" element={<PageWrapper><BranchManager /></PageWrapper>} />
              <Route path="/campaigns" element={<PageWrapper><SeasonalCampaigns /></PageWrapper>} />
              <Route path="/quotations" element={<PageWrapper><QuotationBuilder /></PageWrapper>} />
              <Route path="/followups" element={<PageWrapper><FollowUpKanban /></PageWrapper>} />
              <Route path="/sales-reports" element={<PageWrapper><SalesAnalytics /></PageWrapper>} />
              <Route path="/call-recordings" element={<PageWrapper><CallRecordingsView /></PageWrapper>} />
              <Route path="/quality-review" element={<PageWrapper><QualityReview /></PageWrapper>} />
              <Route path="/feedback" element={<PageWrapper><CustomerSurveys /></PageWrapper>} />
              <Route path="/sla" element={<PageWrapper><ResponseTimeMonitoring /></PageWrapper>} />
              <Route path="/unanswered" element={<PageWrapper><UnansweredQuestions /></PageWrapper>} />
              <Route path="/workflows" element={<PageWrapper><WorkflowBuilder /></PageWrapper>} />
              <Route path="/integrations" element={<PageWrapper><IntegrationsHub /></PageWrapper>} />
              <Route path="/onboarding" element={<PageWrapper><SetupChecklist /></PageWrapper>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Global Overlays & Widgets */}
        <CommandPalette />
        <ToastContainer />
        <CustomerWidget />
      </div>
    </BrowserRouter>
  );
}
