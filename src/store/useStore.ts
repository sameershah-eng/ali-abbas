import { create } from 'zustand';
import {
  Language,
  BranchId,
  Branch,
  Lead,
  CallLog,
  LiveCallState,
  Conversation,
  KnowledgeItem,
  Appointment,
  EscalationTicket,
  MissedCallItem,
  VoiceNoteRecord,
  Technician,
  ActiveJob,
  SparePart,
  ServiceContract,
  Quotation,
  FollowUpItem,
  PredictiveAlert,
  WorkflowRule,
  IntegrationCard,
  UnansweredQuestion,
  NotificationItem,
} from '../types';
import {
  initialBranches,
  initialLeads,
  initialCallLogs,
  initialConversations,
  initialKnowledgeItems,
  initialAppointments,
  initialEscalations,
  initialMissedCalls,
  initialVoiceNotes,
  initialTechnicians,
  initialActiveJobs,
  initialSpareParts,
  initialContracts,
  initialQuotations,
  initialFollowUps,
  initialPredictiveAlerts,
  initialWorkflowRules,
  initialIntegrations,
  initialUnansweredQuestions,
  initialNotifications,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'booking' | 'enquiry' | 'quote' | 'info';
  timestamp: string;
}

interface AppState {
  language: Language;
  selectedBranch: BranchId | 'all';
  isCustomerView: boolean;
  commandPaletteOpen: boolean;
  toasts: ToastMessage[];

  // Entities
  branches: Branch[];
  leads: Lead[];
  callLogs: CallLog[];
  liveCall: LiveCallState;
  conversations: Conversation[];
  activeConversationId: string;
  knowledgeItems: KnowledgeItem[];
  appointments: Appointment[];
  escalations: EscalationTicket[];
  missedCalls: MissedCallItem[];
  voiceNotes: VoiceNoteRecord[];
  technicians: Technician[];
  activeJobs: ActiveJob[];
  spareParts: SparePart[];
  contracts: ServiceContract[];
  quotations: Quotation[];
  followUps: FollowUpItem[];
  predictiveAlerts: PredictiveAlert[];
  workflowRules: WorkflowRule[];
  integrations: IntegrationCard[];
  unansweredQuestions: UnansweredQuestion[];
  notifications: NotificationItem[];

  // Actions
  setLanguage: (lang: Language) => void;
  setSelectedBranch: (branch: BranchId | 'all') => void;
  setIsCustomerView: (isOpen: boolean) => void;
  setCommandPaletteOpen: (isOpen: boolean) => void;
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;

  // Leads & Calls
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  startLiveCallSimulation: () => void;
  endLiveCallSimulation: () => void;
  simulateNextCallLine: () => void;

  // Chat & Inbox
  setActiveConversationId: (id: string) => void;
  sendMessage: (convId: string, text: string, sender?: 'agent' | 'bot') => void;
  assignConversation: (convId: string, agentName: string) => void;
  convertConversationToLead: (convId: string) => void;

  // Knowledge base
  addKnowledgeItem: (item: Omit<KnowledgeItem, 'id' | 'timesUsed' | 'updatedAt'>) => void;
  updateKnowledgeItem: (id: string, item: Partial<KnowledgeItem>) => void;
  deleteKnowledgeItem: (id: string) => void;
  toggleKnowledgeBotUse: (id: string) => void;

  // Appointments
  addAppointment: (apt: Omit<Appointment, 'id'>) => void;
  rescheduleAppointment: (id: string, date: string, timeSlot: string) => void;

  // Escalations
  takeOverEscalation: (id: string, agent: string) => void;
  resolveEscalation: (id: string) => void;

  // Missed Calls
  updateMissedCallStatus: (id: string, status: MissedCallItem['followUpStatus']) => void;

  // Technicians & Dispatch
  assignJobToTechnician: (jobId: string, techId: string) => void;
  updateJobProgress: (jobId: string, progress: number, etaMinutes: number) => void;
  completeJob: (jobId: string, signatureSvg: string, rating: number, notes: string) => void;

  // Quotations & Payments
  addQuotation: (quote: Omit<Quotation, 'id' | 'quoteNumber' | 'createdAt'>) => void;
  approveQuotation: (id: string) => void;
  updateQuotationStatus: (id: string, status: Quotation['status']) => void;

  // Follow-ups
  moveFollowUp: (id: string, column: FollowUpItem['column']) => void;

  // Automations & Integrations
  toggleWorkflowRule: (id: string) => void;
  toggleIntegration: (id: string) => void;
  resolveUnansweredQuestion: (id: string) => void;
  addUnansweredToKb: (questionId: string) => void;
  markNotificationRead: (id: string) => void;

  // Simulation
  triggerRandomEvent: () => void;
}

const STORAGE_KEY = 'thermiq_app_state_v1';

const getInitialOrSaved = () => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading state from localStorage', e);
  }
  return null;
};

const savedState = getInitialOrSaved();

export const useStore = create<AppState>((set, get) => ({
  language: savedState?.language || 'en',
  selectedBranch: savedState?.selectedBranch || 'all',
  isCustomerView: false,
  commandPaletteOpen: false,
  toasts: [],

  branches: savedState?.branches || initialBranches,
  leads: savedState?.leads || initialLeads,
  callLogs: savedState?.callLogs || initialCallLogs,
  liveCall: {
    isActive: false,
    callerName: 'Hussam Al-Dossari',
    callerPhone: '+966 50 782 1199',
    location: 'Al Yasmin, Riyadh',
    issue: 'Outdoor condenser fan stopped turning; room temp climbing to 31°C',
    equipment: 'Carrier WeatherMaker Rooftop 7.5 Ton',
    durationSeconds: 0,
    detectedLanguage: 'ar',
    sentiment: 'neutral',
    transcript: [],
  },
  conversations: savedState?.conversations || initialConversations,
  activeConversationId: savedState?.activeConversationId || 'conv-01',
  knowledgeItems: savedState?.knowledgeItems || initialKnowledgeItems,
  appointments: savedState?.appointments || initialAppointments,
  escalations: savedState?.escalations || initialEscalations,
  missedCalls: savedState?.missedCalls || initialMissedCalls,
  voiceNotes: savedState?.voiceNotes || initialVoiceNotes,
  technicians: savedState?.technicians || initialTechnicians,
  activeJobs: savedState?.activeJobs || initialActiveJobs,
  spareParts: savedState?.spareParts || initialSpareParts,
  contracts: savedState?.contracts || initialContracts,
  quotations: savedState?.quotations || initialQuotations,
  followUps: savedState?.followUps || initialFollowUps,
  predictiveAlerts: savedState?.predictiveAlerts || initialPredictiveAlerts,
  workflowRules: savedState?.workflowRules || initialWorkflowRules,
  integrations: savedState?.integrations || initialIntegrations,
  unansweredQuestions: savedState?.unansweredQuestions || initialUnansweredQuestions,
  notifications: savedState?.notifications || initialNotifications,

  setLanguage: (lang) => {
    set({ language: lang });
    // Update HTML dir and lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
    persist(get());
  },

  setSelectedBranch: (branch) => {
    set({ selectedBranch: branch });
    persist(get());
  },

  setIsCustomerView: (isOpen) => set({ isCustomerView: isOpen }),
  setCommandPaletteOpen: (isOpen) => set({ commandPaletteOpen: isOpen }),

  addToast: (toast) => {
    const newToast: ToastMessage = {
      ...toast,
      id: 'toast-' + Math.random().toString(36).substring(2, 9),
      timestamp: 'Just now',
    };
    set((state) => ({
      toasts: [newToast, ...state.toasts.slice(0, 4)],
    }));
    setTimeout(() => {
      get().removeToast(newToast.id);
    }, 6000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  addLead: (leadData) => {
    const newLead: Lead = {
      ...leadData,
      id: 'lead-' + Date.now(),
      createdAt: 'Just now',
    };
    set((state) => ({
      leads: [newLead, ...state.leads],
      notifications: [
        {
          id: 'notif-' + Date.now(),
          title: 'New Lead Qualified',
          message: `${newLead.customerName} (${newLead.score}) - ${newLead.requirement.slice(0, 45)}...`,
          type: 'enquiry',
          timestamp: 'Just now',
          read: false,
          actionLink: '/leads',
        },
        ...state.notifications,
      ],
    }));
    get().addToast({
      title: 'New Enquiry Captured',
      message: `${newLead.customerName} - ${newLead.score} priority (${newLead.city})`,
      type: 'enquiry',
    });
    persist(get());
  },

  updateLeadStatus: (id, status) => {
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, status } : l)),
    }));
    persist(get());
  },

  startLiveCallSimulation: () => {
    set({
      liveCall: {
        isActive: true,
        callerName: 'Hussam Al-Dossari',
        callerPhone: '+966 50 782 1199',
        location: 'Al Yasmin, Riyadh',
        issue: 'Outdoor condenser fan stopped turning; room temp climbing to 31°C',
        equipment: 'Carrier WeatherMaker Rooftop 7.5 Ton',
        durationSeconds: 1,
        detectedLanguage: 'ar',
        sentiment: 'neutral',
        transcript: [
          { speaker: 'bot', text: 'أهلاً بك في ثيرميك للتكييف والتبريد. كيف أقدر أساعدك؟', time: '00:02' },
          { speaker: 'caller', text: 'السلام عليكم، مروحة المكيف الخارجي بالسطح وقفت والحرارة بدت ترتفع في الدور الثاني.', time: '00:08' },
        ],
      },
    });
  },

  simulateNextCallLine: () => {
    const current = get().liveCall;
    if (!current.isActive) return;

    const scriptedSteps = [
      { speaker: 'bot' as const, text: 'وعليكم السلام يا أستاذ حسام. سلامات إن شاء الله. هل تسمع صوت طنين من الضاغط أو صمت تام؟', time: '00:15' },
      { speaker: 'caller' as const, text: 'فيه صوت طنين خفيف كل دقيقة بعدين يفصل.', time: '00:23' },
      { speaker: 'bot' as const, text: 'واضح جداً، هذا غالباً عطل في مكثف التشغيل (Capacitor) أو حماية الحرارة الزائدة. موقعك بحي الياسمين متاح له فني خلال ٤٥ دقيقة. هل تعتمد الحجز؟', time: '00:35' },
      { speaker: 'caller' as const, text: 'نعم اعتمد، ومستعد للفحص.', time: '00:42' },
      { speaker: 'bot' as const, text: 'تم تأكيد حجز الطوارئ برقم TH-8829 وأرسلنا تفاصيل الفني سلطان ورابط التتبع عبر الواتساب.', time: '00:54' },
    ];

    const currentLen = current.transcript.length;
    if (currentLen - 2 < scriptedSteps.length) {
      const nextStep = scriptedSteps[currentLen - 2];
      set({
        liveCall: {
          ...current,
          durationSeconds: current.durationSeconds + 12,
          sentiment: currentLen > 4 ? 'positive' : 'neutral',
          transcript: [...current.transcript, nextStep],
        },
      });
    } else {
      get().endLiveCallSimulation();
    }
  },

  endLiveCallSimulation: () => {
    const current = get().liveCall;
    const completedLog: CallLog = {
      id: 'call-' + Date.now(),
      callerName: current.callerName,
      phone: current.callerPhone,
      timestamp: 'Just now',
      duration: '1m 15s',
      channel: 'inbound_voice',
      language: current.detectedLanguage,
      outcome: 'booked',
      intent: 'Carrier condenser fan stall & capacitor failure',
      summary: 'Caller reported outdoor fan stopped with buzzing hum. Auto-diagnosed capacitor failure, quoted 250 SAR checkup, and booked emergency slot.',
      hasConsent: true,
      transcript: current.transcript.map((t) => ({
        speaker: t.speaker === 'bot' ? 'agent' : 'caller',
        text: t.text,
        timestamp: t.time,
      })),
    };

    set((state) => ({
      liveCall: { ...state.liveCall, isActive: false },
      callLogs: [completedLog, ...state.callLogs],
    }));

    get().addToast({
      title: 'Call Successfully Booked',
      message: `${completedLog.callerName} - Slot confirmed in Al Yasmin`,
      type: 'booking',
    });
    persist(get());
  },

  setActiveConversationId: (id) => set({ activeConversationId: id }),

  sendMessage: (convId, text, sender = 'agent') => {
    const newMsg = {
      id: 'msg-' + Date.now(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === convId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: newMsg.timestamp,
              messages: [...c.messages, newMsg],
            }
          : c
      ),
    }));
    persist(get());
  },

  assignConversation: (convId, agentName) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === convId ? { ...c, assignedTo: agentName } : c
      ),
    }));
    persist(get());
  },

  convertConversationToLead: (convId) => {
    const conv = get().conversations.find((c) => c.id === convId);
    if (!conv) return;

    get().addLead({
      customerName: conv.customerName,
      phone: conv.customerPhone,
      location: `${conv.city} District`,
      city: conv.city,
      requirement: conv.lastMessage || 'Customer inquiry from ' + conv.channel,
      score: 'Hot',
      scoreReason: 'Direct conversation qualified via unified inbox',
      channel: conv.channel,
      status: 'contacted',
      estimatedValue: 2200,
      preferredLanguage: conv.language,
    });

    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === convId ? { ...c, leadConverted: true } : c
      ),
    }));
    persist(get());
  },

  addKnowledgeItem: (item) => {
    const newItem: KnowledgeItem = {
      ...item,
      id: 'kb-' + Date.now(),
      timesUsed: 0,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    set((state) => ({ knowledgeItems: [newItem, ...state.knowledgeItems] }));
    get().addToast({
      title: 'Knowledge Base Updated',
      message: `Added FAQ: "${newItem.questionEn.slice(0, 35)}..."`,
      type: 'info',
    });
    persist(get());
  },

  updateKnowledgeItem: (id, updates) => {
    set((state) => ({
      knowledgeItems: state.knowledgeItems.map((k) =>
        k.id === id ? { ...k, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : k
      ),
    }));
    persist(get());
  },

  deleteKnowledgeItem: (id) => {
    set((state) => ({
      knowledgeItems: state.knowledgeItems.filter((k) => k.id !== id),
    }));
    persist(get());
  },

  toggleKnowledgeBotUse: (id) => {
    set((state) => ({
      knowledgeItems: state.knowledgeItems.map((k) =>
        k.id === id ? { ...k, approvedForBot: !k.approvedForBot } : k
      ),
    }));
    persist(get());
  },

  addAppointment: (aptData) => {
    const newApt: Appointment = {
      ...aptData,
      id: 'apt-' + Date.now(),
    };
    set((state) => ({ appointments: [newApt, ...state.appointments] }));
    get().addToast({
      title: 'Appointment Booked',
      message: `${newApt.customerName} · ${newApt.date} (${newApt.timeSlot})`,
      type: 'booking',
    });
    persist(get());
  },

  rescheduleAppointment: (id, date, timeSlot) => {
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id ? { ...a, date, timeSlot, status: 'rescheduled' } : a
      ),
    }));
    get().addToast({
      title: 'Appointment Rescheduled',
      message: `Updated to ${date} (${timeSlot})`,
      type: 'info',
    });
    persist(get());
  },

  takeOverEscalation: (id, agent) => {
    set((state) => ({
      escalations: state.escalations.map((e) =>
        e.id === id ? { ...e, assignedAgent: agent, status: 'in_progress' } : e
      ),
    }));
    get().addToast({
      title: 'Escalation Claimed',
      message: `Assigned to ${agent}. Transferred to human control.`,
      type: 'info',
    });
    persist(get());
  },

  resolveEscalation: (id) => {
    set((state) => ({
      escalations: state.escalations.map((e) =>
        e.id === id ? { ...e, status: 'resolved' } : e
      ),
    }));
    get().addToast({
      title: 'Escalation Resolved',
      message: 'Ticket closed and client notified.',
      type: 'info',
    });
    persist(get());
  },

  updateMissedCallStatus: (id, status) => {
    set((state) => ({
      missedCalls: state.missedCalls.map((m) =>
        m.id === id ? { ...m, followUpStatus: status } : m
      ),
    }));
    get().addToast({
      title: 'Follow-up Sent',
      message: `Status updated to ${status.replace('_', ' ')}`,
      type: 'info',
    });
    persist(get());
  },

  assignJobToTechnician: (jobId, techId) => {
    const tech = get().technicians.find((t) => t.id === techId);
    if (!tech) return;

    set((state) => ({
      activeJobs: state.activeJobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              technicianId: tech.id,
              technicianName: tech.name,
              status: 'en_route',
            }
          : j
      ),
      technicians: state.technicians.map((t) =>
        t.id === techId ? { ...t, status: 'on_route', activeJobsToday: t.activeJobsToday + 1 } : t
      ),
    }));
    get().addToast({
      title: 'Technician Dispatched',
      message: `${tech.name} assigned to job #${jobId.toUpperCase()}`,
      type: 'urgent',
    });
    persist(get());
  },

  updateJobProgress: (jobId, progress, etaMinutes) => {
    set((state) => ({
      activeJobs: state.activeJobs.map((j) =>
        j.id === jobId ? { ...j, routeProgress: progress, etaMinutes } : j
      ),
    }));
  },

  completeJob: (jobId, signatureSvg, rating, notes) => {
    set((state) => ({
      activeJobs: state.activeJobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              status: 'completed',
              signatureSvg,
              customerRating: rating,
              notes: notes || j.notes,
              etaMinutes: 0,
              routeProgress: 100,
            }
          : j
      ),
    }));
    get().addToast({
      title: 'Job Completed & Signed',
      message: `Customer signed off with ${rating}-star review. Invoice issued.`,
      type: 'info',
    });
    persist(get());
  },

  addQuotation: (quoteData) => {
    const subtotal = quoteData.items.reduce((acc, curr) => acc + curr.totalSar, 0);
    const vatAmount = subtotal * 0.15;
    const total = subtotal + vatAmount;
    const count = get().quotations.length + 1;
    const qNum = `TH-QT-2026-${count < 10 ? '0' + count : count}`;

    const newQuote: Quotation = {
      ...quoteData,
      id: 'qt-' + Date.now(),
      quoteNumber: qNum,
      subtotalSar: subtotal,
      vatRate: 0.15,
      vatAmountSar: vatAmount,
      totalSar: total,
      createdAt: new Date().toISOString().split('T')[0],
      tabbyInstallmentSar: Number((total / 4).toFixed(2)),
      tamaraInstallmentSar: Number((total / 4).toFixed(2)),
      paymentLinkUrl: `https://pay.thermiq.sa/link/${qNum.toLowerCase()}`,
    };

    set((state) => ({
      quotations: [newQuote, ...state.quotations],
    }));
    get().addToast({
      title: 'Quotation Generated',
      message: `${qNum} for ${newQuote.customerName} (${total.toLocaleString()} SAR)`,
      type: 'quote',
    });
    persist(get());
  },

  approveQuotation: (id) => {
    set((state) => ({
      quotations: state.quotations.map((q) =>
        q.id === id ? { ...q, approvedByOwner: true, status: 'sent' } : q
      ),
    }));
    get().addToast({
      title: 'Quotation Approved',
      message: 'Sent to customer via WhatsApp with Mada & Tabby payment links.',
      type: 'quote',
    });
    persist(get());
  },

  updateQuotationStatus: (id, status) => {
    set((state) => ({
      quotations: state.quotations.map((q) => (q.id === id ? { ...q, status } : q)),
    }));
    persist(get());
  },

  moveFollowUp: (id, column) => {
    set((state) => ({
      followUps: state.followUps.map((f) => (f.id === id ? { ...f, column } : f)),
    }));
    persist(get());
  },

  toggleWorkflowRule: (id) => {
    set((state) => ({
      workflowRules: state.workflowRules.map((w) =>
        w.id === id ? { ...w, enabled: !w.enabled } : w
      ),
    }));
    persist(get());
  },

  toggleIntegration: (id) => {
    set((state) => ({
      integrations: state.integrations.map((i) =>
        i.id === id
          ? {
              ...i,
              connected: !i.connected,
              status: !i.connected ? 'healthy' : 'disconnected',
              lastSync: !i.connected ? 'Just now' : undefined,
            }
          : i
      ),
    }));
    persist(get());
  },

  resolveUnansweredQuestion: (id) => {
    set((state) => ({
      unansweredQuestions: state.unansweredQuestions.map((u) =>
        u.id === id ? { ...u, resolved: true } : u
      ),
    }));
    persist(get());
  },

  addUnansweredToKb: (questionId) => {
    const q = get().unansweredQuestions.find((item) => item.id === questionId);
    if (!q) return;

    get().addKnowledgeItem({
      category: 'Technical FAQs',
      questionEn: q.question,
      questionAr: q.question,
      answerEn: 'Approved resolution drafted for customer clarification and operations team.',
      answerAr: 'إجابة معتمدة رسمياً للرد على استفسار العميل والعمليات الميدانية.',
      approvedForBot: true,
    });
    get().resolveUnansweredQuestion(questionId);
  },

  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
    persist(get());
  },

  triggerRandomEvent: () => {
    const events = [
      () => {
        const names = ['Saad Al-Qarni', 'Fahad Al-Malki', 'Ziyad Ba-Khashab', 'Mona Al-Ghamdi'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const cities = ['Riyadh', 'Jeddah', 'Dammam'];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        get().addLead({
          customerName: randomName,
          phone: '+966 50 ' + Math.floor(1000000 + Math.random() * 9000000),
          location: randomCity + ' District',
          city: randomCity,
          requirement: 'Compressor humming loudly without cooling room',
          score: 'Hot',
          scoreReason: 'Extreme outdoor heat wave, rapid cooling loss reported',
          channel: 'whatsapp',
          status: 'new',
          estimatedValue: 1800,
          preferredLanguage: 'ar',
        });
      },
      () => {
        get().addToast({
          title: 'Incoming Inbound Call',
          message: 'Caller in Al Olaya requesting emergency chiller reset',
          type: 'urgent',
        });
      },
      () => {
        get().addToast({
          title: 'Payment Received',
          message: '1,460.50 SAR paid via Mada for Job #JOB-902',
          type: 'quote',
        });
      },
    ];

    const randomAction = events[Math.floor(Math.random() * events.length)];
    randomAction();
  },
}));

function persist(state: AppState) {
  if (typeof window === 'undefined') return;
  try {
    const dataToSave = {
      language: state.language,
      selectedBranch: state.selectedBranch,
      branches: state.branches,
      leads: state.leads,
      callLogs: state.callLogs,
      conversations: state.conversations,
      activeConversationId: state.activeConversationId,
      knowledgeItems: state.knowledgeItems,
      appointments: state.appointments,
      escalations: state.escalations,
      missedCalls: state.missedCalls,
      voiceNotes: state.voiceNotes,
      technicians: state.technicians,
      activeJobs: state.activeJobs,
      spareParts: state.spareParts,
      contracts: state.contracts,
      quotations: state.quotations,
      followUps: state.followUps,
      predictiveAlerts: state.predictiveAlerts,
      workflowRules: state.workflowRules,
      integrations: state.integrations,
      unansweredQuestions: state.unansweredQuestions,
      notifications: state.notifications,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (err) {
    console.error('Failed to persist store', err);
  }
}
