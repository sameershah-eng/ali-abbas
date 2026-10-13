import React from 'react';
import { useStore } from '../../store/useStore';
import { FollowUpItem } from '../../types';
import {
  Kanban,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Phone,
  DollarSign,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export const FollowUpKanban: React.FC = () => {
  const { followUps, moveFollowUp } = useStore();

  const columns: { id: FollowUpItem['column']; title: string; color: string }[] = [
    { id: 'pending', title: 'Pending Contact', color: 'border-blue-400' },
    { id: 'in_progress', title: 'In Discussion', color: 'border-amber-400' },
    { id: 'overdue', title: 'Overdue / High Risk', color: 'border-red-400' },
    { id: 'completed', title: 'Won / Completed', color: 'border-emerald-400' },
  ];

  const advanceColumn = (item: FollowUpItem) => {
    if (item.column === 'pending') moveFollowUp(item.id, 'in_progress');
    else if (item.column === 'in_progress') moveFollowUp(item.id, 'completed');
    else if (item.column === 'overdue') moveFollowUp(item.id, 'in_progress');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section C · Quotations & Sales</span>
            <span>·</span>
            <span>Pipeline Execution</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Follow-Up Manager & Pipeline Kanban
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Automated alerts for pending quotes, unreplied inquiries, and upcoming AMC renewals
          </p>
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
        {columns.map((col) => {
          const itemsInCol = followUps.filter((f) => f.column === col.id);
          return (
            <div
              key={col.id}
              className="bg-white border border-[#ECE8E1] rounded-2xl p-4 shadow-xs space-y-3 min-h-[500px]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#ECE8E1]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full border-2 ${col.color}`} />
                  <h3 className="text-xs font-semibold text-[#14161A]">{col.title}</h3>
                </div>
                <span className="text-[10px] font-mono text-[#9AA0AB] px-1.5 py-0.2 bg-[#FAF8F5] border border-[#ECE8E1] rounded">
                  {itemsInCol.length}
                </span>
              </div>

              <div className="space-y-3">
                {itemsInCol.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      col.id === 'overdue'
                        ? 'bg-red-50/20 border-red-200'
                        : 'bg-[#FAF8F5]/60 border-[#ECE8E1] hover:border-[#0EA5B7]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-semibold text-[#0EA5B7] uppercase tracking-wider">
                        {item.type}
                      </span>
                      <span
                        className={`text-[10px] font-mono ${
                          col.id === 'overdue' ? 'text-[#E5484D] font-bold' : 'text-[#9AA0AB]'
                        }`}
                      >
                        {item.dueDate}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-[#14161A] mt-1.5 leading-snug">
                      {item.title}
                    </h4>

                    <div className="text-[11px] text-[#5B6170] mt-1 flex items-center justify-between">
                      <span>{item.customerName}</span>
                      {item.amountSar && (
                        <span className="font-mono font-semibold text-[#14161A]">
                          {item.amountSar.toLocaleString()} SAR
                        </span>
                      )}
                    </div>

                    <div className="mt-2 text-[10px] text-[#9AA0AB] truncate">
                      {item.lastActivity}
                    </div>

                    {col.id !== 'completed' && (
                      <div className="mt-3 pt-2 border-t border-[#ECE8E1] flex justify-end">
                        <button
                          onClick={() => advanceColumn(item)}
                          className="text-[11px] font-semibold text-[#14161A] hover:text-[#0EA5B7] flex items-center gap-1 transition-colors"
                        >
                          <span>Advance</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {itemsInCol.length === 0 && (
                  <div className="p-6 text-center text-[11px] text-[#9AA0AB]">
                    No items in this column
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
