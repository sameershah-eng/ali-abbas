import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { KnowledgeItem } from '../../types';
import {
  BookOpen,
  Plus,
  Search,
  CheckCircle2,
  Trash2,
  Edit2,
  Check,
  X,
  Filter,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

export const KnowledgeBase: React.FC = () => {
  const {
    knowledgeItems,
    addKnowledgeItem,
    updateKnowledgeItem,
    deleteKnowledgeItem,
    toggleKnowledgeBotUse,
  } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);

  // Form State
  const [category, setCategory] = useState<KnowledgeItem['category']>('Services & Pricing');
  const [qEn, setQEn] = useState('');
  const [qAr, setQAr] = useState('');
  const [aEn, setAEn] = useState('');
  const [aAr, setAAr] = useState('');

  const categories = [
    'all',
    'Services & Pricing',
    'Emergency Guidelines',
    'Service Areas',
    'Warranty & Policies',
    'Technical FAQs',
  ];

  const filteredItems = knowledgeItems.filter((item) => {
    const matchesSearch =
      item.questionEn.toLowerCase().includes(search.toLowerCase()) ||
      item.questionAr.toLowerCase().includes(search.toLowerCase()) ||
      item.answerEn.toLowerCase().includes(search.toLowerCase()) ||
      item.answerAr.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qEn || !aEn) return;

    if (editingItem) {
      updateKnowledgeItem(editingItem.id, {
        category,
        questionEn: qEn,
        questionAr: qAr || qEn,
        answerEn: aEn,
        answerAr: aAr || aEn,
      });
      setEditingItem(null);
    } else {
      addKnowledgeItem({
        category,
        questionEn: qEn,
        questionAr: qAr || qEn,
        answerEn: aEn,
        answerAr: aAr || aEn,
        approvedForBot: true,
      });
    }

    setShowModal(false);
    setQEn('');
    setQAr('');
    setAEn('');
    setAAr('');
  };

  const startEdit = (item: KnowledgeItem) => {
    setEditingItem(item);
    setCategory(item.category);
    setQEn(item.questionEn);
    setQAr(item.questionAr);
    setAEn(item.answerEn);
    setAAr(item.answerAr);
    setShowModal(true);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section A · Customer Communication</span>
            <span>·</span>
            <span>Grounding Data</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Knowledge Base & Verified Bot Policies
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Strictly vetted pricing guidelines, emergency protocols, and GCC technical knowledge used by Voice AI and chat
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setQEn('');
            setQAr('');
            setAEn('');
            setAAr('');
            setShowModal(true);
          }}
          className="px-4 py-2 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs hover:opacity-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Knowledge Entry</span>
        </button>
      </div>

      {/* Filter and Category Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#ECE8E1]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-[#9AA0AB] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search policies, pricing rules, error codes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg text-[#14161A] placeholder-[#9AA0AB] outline-none"
            />
          </div>

          <div className="text-xs text-[#9AA0AB]">
            {filteredItems.length} Verified Entries
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap capitalize font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#14161A] text-white shadow-xs'
                  : 'bg-white border border-[#ECE8E1] text-[#5B6170] hover:text-[#14161A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#ECE8E1] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#0EA5B7]/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0EA5B7] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleKnowledgeBotUse(item.id)}
                    className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                      item.approvedForBot
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                    title="Toggle bot usage permission"
                  >
                    {item.approvedForBot ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Bot Enabled</span>
                      </>
                    ) : (
                      <span>Draft (Offline)</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Questions (EN & AR) */}
              <div className="mt-3 space-y-1">
                <h3 className="text-xs font-semibold text-[#14161A] leading-snug">
                  {item.questionEn}
                </h3>
                <p className="text-xs text-[#5B6170] font-arabic text-right leading-snug" dir="rtl">
                  {item.questionAr}
                </p>
              </div>

              {/* Answers (EN & AR) */}
              <div className="mt-3 space-y-2 bg-[#FAF8F5] p-3 rounded-xl border border-[#ECE8E1] text-xs">
                <p className="text-[#14161A] leading-relaxed">
                  {item.answerEn}
                </p>
                <div className="border-t border-[#ECE8E1]/80 pt-2">
                  <p className="text-[#5B6170] font-arabic leading-relaxed text-right" dir="rtl">
                    {item.answerAr}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-3 border-t border-[#ECE8E1] flex items-center justify-between text-[11px] text-[#9AA0AB]">
              <span>Times quoted: <strong className="text-[#14161A] font-mono">{item.timesUsed}</strong> · Updated {item.updatedAt}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="p-1 rounded text-[#5B6170] hover:text-[#14161A]"
                  title="Edit entry"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteKnowledgeItem(item.id)}
                  className="p-1 rounded text-[#9AA0AB] hover:text-[#E5484D]"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#ECE8E1] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <h3 className="font-serif-display text-lg font-semibold text-[#14161A]">
                {editingItem ? 'Edit Knowledge Base Entry' : 'Create Knowledge Base Entry'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#9AA0AB] hover:text-[#14161A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-[#5B6170] font-medium mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                >
                  <option value="Services & Pricing">Services & Pricing</option>
                  <option value="Emergency Guidelines">Emergency Guidelines</option>
                  <option value="Service Areas">Service Areas</option>
                  <option value="Warranty & Policies">Warranty & Policies</option>
                  <option value="Technical FAQs">Technical FAQs</option>
                </select>
              </div>

              <div>
                <label className="block text-[#5B6170] font-medium mb-1">Question (English)</label>
                <input
                  type="text"
                  required
                  placeholder="What is the diagnostic fee for Daikin VRV in Jeddah?"
                  value={qEn}
                  onChange={(e) => setQEn(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#5B6170] font-medium mb-1">السؤال بالعربية (Arabic)</label>
                <input
                  type="text"
                  placeholder="كم رسوم فحص مكيفات دايكن VRV في جدة؟"
                  value={qAr}
                  onChange={(e) => setQAr(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none font-arabic text-right"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-[#5B6170] font-medium mb-1">Approved Answer (English)</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Standard VRV inspection is 350 SAR including electronic refrigerant sensor scan..."
                  value={aEn}
                  onChange={(e) => setAEn(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#5B6170] font-medium mb-1">الإجابة المعتمدة بالعربية (Arabic)</label>
                <textarea
                  rows={2}
                  placeholder="رسوم فحص أنظمة VRV هي ٣٥٠ ر.س شاملة فحص التسريب الإلكتروني..."
                  value={aAr}
                  onChange={(e) => setAAr(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none font-arabic text-right"
                  dir="rtl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#ECE8E1]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-2 bg-[#FAF8F5] border border-[#ECE8E1] text-[#14161A] rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-thermal-gradient text-white rounded-lg font-semibold hover:opacity-90"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
