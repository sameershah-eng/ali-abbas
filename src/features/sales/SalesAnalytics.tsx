import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  PieChart,
  ArrowRight,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export const SalesAnalytics: React.FC = () => {
  const { quotations, leads, addToast } = useStore();
  const [dateRange, setDateRange] = useState('q3_q4');

  const leadSources = [
    { source: 'Inbound Phone (VoIP)', percentage: 38, count: 158, color: '#0EA5B7' },
    { source: 'WhatsApp Cloud API', percentage: 32, count: 134, color: '#16A34A' },
    { source: 'Website Chatbot Widget', percentage: 15, count: 63, color: '#6C8CFF' },
    { source: 'Instagram Direct Message', percentage: 9, count: 38, color: '#E5484D' },
    { source: 'Snapchat / Google Local Ads', percentage: 6, count: 25, color: '#E9A23B' },
  ];

  const salesFunnel = [
    { stage: '1. Inbound Enquiry', count: 418, convRate: '100%', valueSar: 940000 },
    { stage: '2. Qualified & Quoted', count: 301, convRate: '72%', valueSar: 684000 },
    { stage: '3. Negotiation & Follow-up', count: 201, convRate: '48%', valueSar: 490000 },
    { stage: '4. Won / Closed Invoice', count: 130, convRate: '31%', valueSar: 348200 },
  ];

  const monthlyRevenue = [
    { month: 'May (Heatwave Start)', revenue: 198000, margin: 42 },
    { month: 'Jun (Peak Summer 49°C)', revenue: 385000, margin: 46 },
    { month: 'Jul (Severe Peak 52°C)', revenue: 442000, margin: 48 },
    { month: 'Aug (Commercial AMC Surge)', revenue: 410000, margin: 45 },
    { month: 'Sep (Chiller Overhauls)', revenue: 320000, margin: 44 },
    { month: 'Oct (Current MTD)', revenue: 245000, margin: 43 },
  ];

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Month,Revenue (SAR),Gross Margin (%)\n' +
      monthlyRevenue.map((r) => `"${r.month}",${r.revenue},${r.margin}`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Thermiq_Sales_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      title: 'Sales Report Exported',
      message: 'Thermiq_Sales_Report.csv downloaded successfully',
      type: 'info',
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section C · Quotations & Sales</span>
            <span>·</span>
            <span>Financial Reporting</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Revenue Analytics & Sales Conversion Funnel
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Channel acquisition attribution, funnel conversion efficiency, and VAT-inclusive SAR performance metrics
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-white border border-[#ECE8E1] hover:bg-[#FAF8F5] text-[#14161A] rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-[#0EA5B7]" />
          <span>Export Financial CSV</span>
        </button>
      </div>

      {/* Top Chart Strip: Revenue Trend */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
              Monthly HVAC & Cold Chain Revenue (SAR)
            </h3>
            <p className="text-xs text-[#5B6170]">Includes 15% VAT across all 3 regional hubs</p>
          </div>
          <span className="text-xs font-mono text-[#16A34A] font-semibold bg-emerald-50 px-2 py-0.5 rounded">
            +38.4% YoY Growth
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" stroke="#9AA0AB" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#9AA0AB"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val / 1000}k`}
              />
              <Tooltip
                formatter={(value: any) => [`${Number(value).toLocaleString()} SAR`, 'Revenue']}
                contentStyle={{
                  backgroundColor: '#14161A',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '11px',
                  border: 'none',
                }}
              />
              <Bar dataKey="revenue" fill="#0EA5B7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two columns: Funnel vs Channel Acquisition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Conversion Funnel (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
            Sales Funnel Conversion Velocity
          </h3>

          <div className="space-y-3">
            {salesFunnel.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#ECE8E1] bg-[#FAF8F5]/50 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-[#14161A]">{step.stage}</span>
                  <div className="text-[11px] text-[#5B6170] mt-0.5">
                    Pipeline Value: {step.valueSar.toLocaleString()} SAR
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-[#14161A]">
                    {step.count} Deals
                  </div>
                  <div className="text-[10px] font-mono text-[#0EA5B7] font-semibold">
                    {step.convRate} of Total
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Source Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
            Lead Source Channel Attribution
          </h3>

          <div className="space-y-3">
            {leadSources.map((src, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#14161A] font-medium">{src.source}</span>
                  <span className="font-mono font-semibold text-[#14161A]">
                    {src.percentage}% ({src.count})
                  </span>
                </div>
                <div className="w-full bg-[#ECE8E1] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${src.percentage}%`, backgroundColor: src.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] text-[11px] text-[#5B6170] leading-snug">
            Inbound phone calls convert at highest ticket size (average 4,200 SAR per job), while WhatsApp accounts for 74% of repeat villa AMC maintenance renewals.
          </div>
        </div>
      </div>
    </div>
  );
};
