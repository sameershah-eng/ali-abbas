import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  Flame,
  Send,
  Users,
  Calendar,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const SeasonalCampaigns: React.FC = () => {
  const { addToast } = useStore();
  const [audience, setAudience] = useState('Past Villa Customers (Inactive > 8 Months)');
  const [campaignTitle, setCampaignTitle] = useState('Pre-Summer AC Reliability & Chemical Wash 2027');
  const [discount, setDiscount] = useState('15% Early-Bird Discount');
  const [metrics, setMetrics] = useState({
    sent: 1420,
    delivered: 1398,
    replied: 412,
    booked: 186,
    revenueSar: 168400,
  });

  const [messageTemplate, setMessageTemplate] = useState(
    'السلام عليكم ورحمة الله، حرارة الصيف تقترب! يسر ثيرميك للتكييف تقديم فحص مجاني وتنظيف كيميائي للمكثفات بخصم ١٥٪ لعملائنا في الرياض وجدة قبل بدء موجة الحر الشديدة. اضغط الرابط لحجز موعدك المفضل:'
  );

  const handleLaunchBroadcast = () => {
    setMetrics((prev) => ({
      ...prev,
      sent: prev.sent + 250,
      delivered: prev.delivered + 245,
      booked: prev.booked + 28,
      revenueSar: prev.revenueSar + 32000,
    }));

    addToast({
      title: 'Seasonal Broadcast Dispatched',
      message: `250 WhatsApp messages queued via Official Meta Cloud API`,
      type: 'quote',
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section B · HVAC Service Support</span>
            <span>·</span>
            <span>Pre-Summer Readiness</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Pre-Summer Seasonal Campaigns & Retention
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Automated WhatsApp broadcast sequences alerting residential and commercial clients before peak summer cooling breakdown peaks
          </p>
        </div>

        <button
          onClick={handleLaunchBroadcast}
          className="px-4 py-2 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs hover:opacity-95 transition-opacity"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Launch Broadcast to 250 Segmented Clients</span>
        </button>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-[#ECE8E1] rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-[#9AA0AB]">Recipients Reached</span>
          <div className="text-xl font-serif-display font-bold text-[#14161A] mt-1 font-mono-numbers">
            {metrics.sent.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#16A34A] mt-0.5">98.4% Delivered</div>
        </div>

        <div className="bg-white border border-[#ECE8E1] rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-[#9AA0AB]">Interactive Replies</span>
          <div className="text-xl font-serif-display font-bold text-[#14161A] mt-1 font-mono-numbers">
            {metrics.replied.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#5B6170] mt-0.5">29.4% Reply Rate</div>
        </div>

        <div className="bg-white border border-[#ECE8E1] rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-[#9AA0AB]">Visits Confirmed</span>
          <div className="text-xl font-serif-display font-bold text-[#0EA5B7] mt-1 font-mono-numbers">
            {metrics.booked.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#0EA5B7] mt-0.5">Pre-Summer Bookings</div>
        </div>

        <div className="bg-white border border-[#ECE8E1] rounded-2xl p-4 shadow-xs col-span-2">
          <span className="text-[11px] text-[#9AA0AB]">Campaign Revenue Generated</span>
          <div className="text-xl font-serif-display font-bold text-[#16A34A] mt-1 font-mono-numbers">
            {metrics.revenueSar.toLocaleString()} SAR
          </div>
          <div className="text-[10px] text-[#9AA0AB] mt-0.5">Includes 15% VAT</div>
        </div>
      </div>

      {/* Campaign Builder Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
            Campaign Setup & Broadcast Template
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#5B6170] font-medium mb-1">Campaign Title</label>
              <input
                type="text"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-2.5 text-[#14161A] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#5B6170] font-medium mb-1">Target Client Segment</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-2.5 text-[#14161A] outline-none"
                >
                  <option value="Past Villa Customers (Inactive > 8 Months)">Past Villa Customers (Inactive &gt; 8 Months)</option>
                  <option value="Commercial Compound AMC Leads">Commercial Compound AMC Leads</option>
                  <option value="Restaurant Cold Chain Owners">Restaurant Cold Chain Owners</option>
                </select>
              </div>

              <div>
                <label className="block text-[#5B6170] font-medium mb-1">Early-Bird Incentive</label>
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-2.5 text-[#14161A] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#5B6170] font-medium mb-1">
                WhatsApp Broadcast Message (Arabic Najdi / Hijazi)
              </label>
              <textarea
                rows={4}
                value={messageTemplate}
                onChange={(e) => setMessageTemplate(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl p-3 text-xs text-[#14161A] outline-none font-arabic text-right"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Right Preview */}
        <div className="lg:col-span-5 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA0AB] block pb-3 border-b border-[#ECE8E1]">
              WhatsApp Mobile Screen Preview
            </span>

            <div className="mt-4 p-4 rounded-2xl bg-[#EFECE6]/50 border border-[#ECE8E1] max-w-sm mx-auto shadow-inner">
              <div className="bg-white p-3.5 rounded-xl shadow-xs text-xs space-y-2 border border-[#ECE8E1]">
                <div className="flex items-center gap-2 pb-2 border-b border-[#ECE8E1]">
                  <div className="w-6 h-6 rounded-full bg-thermal-gradient flex items-center justify-center text-white text-[9px] font-bold">
                    Th
                  </div>
                  <span className="font-semibold text-[#14161A]">Thermiq Saudi HVAC</span>
                </div>
                <p className="text-[#14161A] font-arabic leading-relaxed text-right" dir="rtl">
                  {messageTemplate}
                </p>
                <div className="p-2 rounded bg-[#FAF8F5] text-center text-[#0EA5B7] font-semibold text-[11px] border border-[#ECE8E1]">
                  [ حجز فحص الصيف بخصم ١٥٪ ]
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 leading-snug">
            Automated compliance check: 100% Meta Business Cloud API opt-in compliant with automated unsubscribe handler.
          </div>
        </div>
      </div>
    </div>
  );
};
