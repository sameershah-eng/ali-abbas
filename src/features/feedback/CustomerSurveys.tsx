import React from 'react';
import {
  Smile,
  Star,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  User,
} from 'lucide-react';

export const CustomerSurveys: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      customerName: 'Faisal Al-Otaibi',
      city: 'Riyadh (Hittin)',
      rating: 5,
      date: 'Today, 17:15',
      technician: 'Sultan Al-Mutairi',
      comment: 'التعامل والسرعة لا يعلى عليها. وصل الفني خلال ٤٠ دقيقة بالضبط واستبدل مكثف كاريير الأصلي والبيت رجع بارد.',
      sentiment: 'Positive',
      equipment: 'Carrier 5-Ton Ducted',
    },
    {
      id: 'rev-2',
      customerName: 'Noura Al-Sudairi',
      city: 'Jeddah (Al Rawdah)',
      rating: 5,
      date: 'Yesterday',
      technician: 'Yousef Ba-Wazir',
      comment: 'Very professional team. Cleaned all 12 VRV indoor cassettes without a drop of water on our hardwood floor. Highly recommend the annual AMC.',
      sentiment: 'Positive',
      equipment: 'Daikin VRV System',
    },
    {
      id: 'rev-3',
      customerName: 'Tariq Al-Ghamdi',
      city: 'Dammam (Al Shati)',
      rating: 4,
      date: '2 days ago',
      technician: 'Abdulaziz Al-Khaldi',
      comment: 'خدمة ممتازة لحل مشكلة اهتزاز وحدة يورك بالمطعم. التكلفة كانت معقولة والفاتورة وصلت مباشرة عبر الواتساب مع خيار مدى.',
      sentiment: 'Positive',
      equipment: 'York Sunline 10-Ton',
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section D · Reporting & Performance</span>
            <span>·</span>
            <span>CSAT & Net Promoter</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Customer Feedback & Post-Service Reviews
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Automated WhatsApp survey delivery triggered upon technician digital signature sign-off
          </p>
        </div>
      </div>

      {/* KPI Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-[#ECE8E1] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-[#9AA0AB] uppercase font-semibold">Average CSAT Rating</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif-display font-bold text-[#14161A]">4.92</span>
            <span className="text-xs text-[#9AA0AB]">/ 5.0</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-500" />
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#ECE8E1] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-[#9AA0AB] uppercase font-semibold">Net Promoter Score (NPS)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif-display font-bold text-[#16A34A]">+76</span>
            <span className="text-xs text-[#16A34A] font-semibold">World-Class GCC</span>
          </div>
          <div className="text-xs text-[#5B6170] mt-1">89% Promoters · 8% Passives · 3% Detractors</div>
        </div>

        <div className="bg-white border border-[#ECE8E1] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-[#9AA0AB] uppercase font-semibold">Total Verified Reviews</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif-display font-bold text-[#14161A]">842</span>
            <span className="text-xs text-[#0EA5B7] font-semibold">This Summer</span>
          </div>
          <div className="text-xs text-[#5B6170] mt-1">94% Response rate to WhatsApp survey prompt</div>
        </div>
      </div>

      {/* Reviews Stream */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
          Recent Post-Service Client Testimonials
        </h3>

        <div className="divide-y divide-[#ECE8E1]">
          {reviews.map((rev) => (
            <div key={rev.id} className="py-4 space-y-2 first:pt-0 last:pb-0 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#14161A]">{rev.customerName}</span>
                    <span className="text-[11px] text-[#9AA0AB]">{rev.city}</span>
                  </div>
                  <div className="text-[11px] text-[#5B6170]">
                    Technician: <strong className="text-[#14161A]">{rev.technician}</strong> · {rev.equipment}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#9AA0AB]">{rev.date}</span>
                </div>
              </div>

              <p className="text-[#14161A] bg-[#FAF8F5] p-3 rounded-xl border border-[#ECE8E1] leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
