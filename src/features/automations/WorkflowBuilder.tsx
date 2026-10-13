import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { WorkflowRule } from '../../types';
import {
  GitFork,
  Plus,
  CheckCircle2,
  Play,
  ToggleLeft,
  ToggleRight,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

export const WorkflowBuilder: React.FC = () => {
  const { workflowRules, toggleWorkflowRule, addToast } = useStore();

  const handleTestRule = (rule: WorkflowRule) => {
    addToast({
      title: 'Workflow Simulation Triggered',
      message: `Executed: "${rule.title}" (Mock payload passed condition check)`,
      type: 'info',
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section E · Integrations & Automation</span>
            <span>·</span>
            <span>Decision Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Visual Workflow Automation Builder
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Deterministic "When → If → Then" triggers automating emergency dispatches, overdue quote follow-ups, and post-job surveys
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#16A34A] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold">
          <Zap className="w-4 h-4" />
          <span>Rules Engine Active</span>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {workflowRules.map((rule) => (
          <div
            key={rule.id}
            className={`bg-white border rounded-2xl p-6 shadow-xs transition-all ${
              rule.enabled
                ? 'border-[#ECE8E1] hover:border-[#0EA5B7]/40'
                : 'border-[#ECE8E1] opacity-60 bg-[#FAF8F5]/50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ECE8E1]">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0EA5B7]" />
                <h3 className="text-sm font-semibold text-[#14161A]">{rule.title}</h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#9AA0AB] font-mono">
                  {rule.executionsThisMonth} executions this month
                </span>

                <button
                  onClick={() => toggleWorkflowRule(rule.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold"
                >
                  {rule.enabled ? (
                    <span className="text-[#16A34A] flex items-center gap-1">
                      <ToggleRight className="w-6 h-6" /> Enabled
                    </span>
                  ) : (
                    <span className="text-[#9AA0AB] flex items-center gap-1">
                      <ToggleLeft className="w-6 h-6" /> Paused
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Visual When -> If -> Then Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
              {/* Trigger */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-1">
                <span className="text-[10px] font-bold text-[#0EA5B7] uppercase tracking-wider">
                  WHEN (Trigger Event)
                </span>
                <p className="text-[#14161A] font-medium leading-snug">{rule.triggerEvent}</p>
              </div>

              {/* Condition */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-1">
                <span className="text-[10px] font-bold text-[#6C8CFF] uppercase tracking-wider">
                  IF (Evaluation Condition)
                </span>
                <p className="text-[#14161A] font-medium leading-snug">{rule.condition}</p>
              </div>

              {/* Action */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-1">
                <span className="text-[10px] font-bold text-[#FF8A5B] uppercase tracking-wider">
                  THEN (Automated Action)
                </span>
                <p className="text-[#14161A] font-medium leading-snug">{rule.action}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-[#ECE8E1] mt-4 flex justify-end">
              <button
                onClick={() => handleTestRule(rule)}
                className="px-3 py-1.5 bg-[#FAF8F5] border border-[#ECE8E1] hover:bg-[#F2EFE9] text-[#14161A] text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 text-[#0EA5B7]" />
                <span>Dry-Run Test Rule</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
