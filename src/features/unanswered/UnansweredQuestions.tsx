import React from 'react';
import { useStore } from '../../store/useStore';
import {
  HelpCircle,
  Plus,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const UnansweredQuestions: React.FC = () => {
  const { unansweredQuestions, addUnansweredToKb } = useStore();

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section D · Reporting & Performance</span>
            <span>·</span>
            <span>Grounding Gap Analysis</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Unanswered Questions & Missing Knowledge
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Automatic tracking of novel caller queries that triggered safe fallback responses; promote directly to approved knowledge
          </p>
        </div>

        <div className="text-xs text-[#5B6170]">
          {unansweredQuestions.filter((q) => !q.resolved).length} Pending Review
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#9AA0AB] uppercase text-[10px] font-semibold border-b border-[#ECE8E1]">
              <tr>
                <th className="px-4 py-3.5">Customer Query</th>
                <th className="px-4 py-3.5">Language</th>
                <th className="px-4 py-3.5">Frequency</th>
                <th className="px-4 py-3.5">Last Encountered</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]">
              {unansweredQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="px-4 py-3.5 max-w-md">
                    <div className="font-semibold text-[#14161A] leading-relaxed">
                      "{q.question}"
                    </div>
                  </td>
                  <td className="px-4 py-3.5 uppercase font-bold text-[10px] text-[#5B6170]">
                    {q.detectedLanguage}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-semibold text-[#14161A]">
                    {q.frequency} times
                  </td>
                  <td className="px-4 py-3.5 text-[#5B6170]">{q.lastAsked}</td>
                  <td className="px-4 py-3.5">
                    {q.resolved ? (
                      <span className="text-[10px] font-semibold text-[#16A34A] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> In Knowledge Base
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        Requires Verification
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    {!q.resolved ? (
                      <button
                        onClick={() => addUnansweredToKb(q.id)}
                        className="px-3 py-1.5 bg-[#14161A] hover:bg-[#2B303A] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 ml-auto transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#0EA5B7]" />
                        <span>Add to Knowledge Base</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#9AA0AB]">Resolved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
