export type Language = 'en' | 'ar' | 'ur';

export type BranchId = 'riyadh-main' | 'jeddah-west' | 'dammam-east';

export interface Branch {
  id: BranchId;
  name: string;
  nameAr: string;
  city: string;
  manager: string;
  phone: string;
  techniciansCount: number;
  coverageZones: string[];
}

export type Channel = 'website' | 'whatsapp' | 'phone' | 'instagram' | 'facebook';

export type LeadScore = 'Hot' | 'Warm' | 'Cold';

export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  location: string;
  city: string;
  requirement: string;
  score: LeadScore;
  scoreReason: string;
  channel: Channel;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'lost';
  estimatedValue: number;
  createdAt: string;
  preferredLanguage: Language;
}

export interface CallLog {
  id: string;
  callerName: string;
  phone: string;
  timestamp: string;
  duration: string;
  channel: 'inbound_voice';
  language: Language;
  outcome: 'booked' | 'answered' | 'escalated' | 'missed';
  intent: string;
  summary: string;
  audioUrl?: string;
  hasConsent: boolean;
  transcript: {
    speaker: 'agent' | 'caller';
    text: string;
    timestamp: string;
  }[];
}

export interface LiveCallState {
  isActive: boolean;
  callerName: string;
  callerPhone: string;
  location: string;
  issue: string;
  equipment: string;
  durationSeconds: number;
  detectedLanguage: Language;
  sentiment: 'positive' | 'neutral' | 'frustrated';
  transcript: { speaker: 'bot' | 'caller'; text: string; time: string }[];
  extractedLead?: Partial<Lead>;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  detectedLanguage?: Language;
  mediaUrl?: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerPhone: string;
  channel: Channel;
  unreadCount: number;
  assignedTo?: string;
  status: 'open' | 'escalated' | 'resolved';
  language: Language;
  lastMessage: string;
  lastMessageTime: string;
  city: string;
  equipmentBrand?: string;
  messages: ChatMessage[];
  leadConverted?: boolean;
}

export interface KnowledgeItem {
  id: string;
  category: 'Services & Pricing' | 'Emergency Guidelines' | 'Service Areas' | 'Warranty & Policies' | 'Technical FAQs';
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  approvedForBot: boolean;
  timesUsed: number;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM - 12:00 PM"
  technicianId?: string;
  technicianName?: string;
  serviceType: 'Emergency Repair' | 'Preventive AMC' | 'Duct Cleaning' | 'Chiller Overhaul' | 'VRF Diagnostics';
  status: 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  syncedCalendar: 'Google Calendar' | 'Outlook';
  notes: string;
}

export interface EscalationTicket {
  id: string;
  customerName: string;
  phone: string;
  channel: Channel;
  urgency: 'Critical' | 'High' | 'Medium';
  reason: string;
  summary: string;
  timeWaiting: string;
  assignedAgent?: string;
  status: 'pending' | 'in_progress' | 'resolved';
}

export interface MissedCallItem {
  id: string;
  callerName: string;
  phone: string;
  time: string;
  attempts: number;
  followUpStatus: 'pending' | 'whatsapp_sent' | 'sms_sent' | 'called_back';
  suggestedTemplate: string;
}

export interface VoiceNoteRecord {
  id: string;
  customerName: string;
  phone: string;
  timestamp: string;
  audioDuration: string;
  transcriptArabic: string;
  transcriptEnglish: string;
  extractedEquipment: string;
  extractedSymptom: string;
  extractedLocation: string;
  urgency: 'Emergency' | 'Same-day' | 'Standard';
  processedToJobId?: string;
}

export interface Technician {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  skills: string[];
  branchId: BranchId;
  status: 'available' | 'on_route' | 'on_job' | 'off_duty';
  activeJobsToday: number;
  rating: number;
  completedJobsMonth: number;
  currentLocationName: string;
  coordinates: { x: number; y: number }; // percentage on stylized map 0-100
}

export interface ActiveJob {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  equipment: string;
  technicianId: string;
  technicianName: string;
  status: 'assigned' | 'en_route' | 'arrived' | 'completed';
  etaMinutes: number;
  routeProgress: number; // 0 to 100%
  departureTime: string;
  signatureSvg?: string;
  customerRating?: number;
  notes: string;
  totalSar: number;
}

export interface SparePart {
  id: string;
  partNumber: string;
  name: string;
  category: 'Compressor' | 'Capacitor' | 'Thermostat' | 'Fan Motor' | 'Filter & Coil' | 'Valves & Refrigerant';
  compatibleBrands: string[];
  priceSar: number;
  stockRiyadh: number;
  stockJeddah: number;
  stockDammam: number;
  reorderLevel: number;
}

export interface ServiceContract {
  id: string;
  clientName: string;
  contactPerson: string;
  phone: string;
  tier: 'Standard' | 'Premium';
  unitsCovered: number;
  facilityType: 'Villa Compound' | 'Restaurant & Cold Storage' | 'Corporate Tower' | 'Retail Mall';
  startDate: string;
  expiryDate: string;
  visitsPerYear: number;
  visitsCompleted: number;
  annualValueSar: number;
  peakSeasonPriority: boolean;
  status: 'active' | 'expiring_soon' | 'renewed';
}

export interface QuotationLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPriceSar: number;
  totalSar: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  city: string;
  items: QuotationLineItem[];
  subtotalSar: number;
  vatRate: number; // 0.15
  vatAmountSar: number;
  totalSar: number;
  status: 'draft' | 'awaiting_approval' | 'sent' | 'accepted' | 'declined';
  approvedByOwner: boolean;
  createdAt: string;
  validUntil: string;
  tabbyInstallmentSar: number; // 4 installments
  tamaraInstallmentSar: number;
  paymentLinkUrl?: string;
}

export interface FollowUpItem {
  id: string;
  title: string;
  customerName: string;
  phone: string;
  type: 'Pending Quote' | 'Unanswered Enquiry' | 'Warranty Follow-up' | 'AMC Renewal';
  amountSar?: number;
  dueDate: string;
  column: 'pending' | 'in_progress' | 'overdue' | 'completed';
  lastActivity: string;
}

export interface PredictiveAlert {
  id: string;
  clientName: string;
  equipmentType: string;
  brand: string;
  location: string;
  riskScore: number; // 0-100
  riskLevel: 'high' | 'medium' | 'low';
  identifiedRisk: string;
  historicalRootCause: string;
  recommendation: string;
  sensorConnected: boolean;
  sensorVibrationMmS: number;
  sensorDischargeTempC: number;
  sensorCurrentAmp: number;
}

export interface WorkflowRule {
  id: string;
  title: string;
  triggerEvent: string;
  condition: string;
  action: string;
  enabled: boolean;
  executionsThisMonth: number;
}

export interface IntegrationCard {
  id: string;
  name: string;
  category: 'CRM' | 'Messaging' | 'Calendar' | 'Payments' | 'ERP';
  description: string;
  connected: boolean;
  status: 'healthy' | 'needs_auth' | 'disconnected';
  lastSync?: string;
}

export interface UnansweredQuestion {
  id: string;
  question: string;
  frequency: number;
  detectedLanguage: Language;
  lastAsked: string;
  resolved: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'booking' | 'enquiry' | 'quote';
  timestamp: string;
  read: boolean;
  actionLink?: string;
}
