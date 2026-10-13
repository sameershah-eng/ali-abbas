import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { SparePart } from '../../types';
import {
  Package,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building,
  Filter,
  Plus,
  ArrowRight,
} from 'lucide-react';

export const SparePartsLookup: React.FC = () => {
  const { spareParts, addToast } = useStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    'all',
    'Compressor',
    'Capacitor',
    'Thermostat',
    'Fan Motor',
    'Valves & Refrigerant',
  ];

  const filteredParts = spareParts.filter((part) => {
    const matchesSearch =
      part.name.toLowerCase().includes(search.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(search.toLowerCase()) ||
      part.compatibleBrands.some((b) => b.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || part.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleRequestTransfer = (part: SparePart) => {
    addToast({
      title: 'Inter-Branch Stock Transfer',
      message: `Stock reservation created for ${part.partNumber} across Central Hub.`,
      type: 'info',
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
            <span>OEM Supply Chain</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Spare Parts Catalog & Multi-Hub Inventory
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Real-time warehouse stock in Riyadh, Jeddah, and Dammam for genuine Carrier, Daikin, Copeland, and Danfoss parts
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#ECE8E1]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-[#9AA0AB] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search part name, OEM number (e.g. Copeland, R410A, Capacitor)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg text-[#14161A] placeholder-[#9AA0AB] outline-none"
            />
          </div>

          <div className="text-xs text-[#9AA0AB]">
            {filteredParts.length} Parts Available
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap capitalize font-medium transition-all ${
                categoryFilter === cat
                  ? 'bg-[#14161A] text-white shadow-xs'
                  : 'bg-white border border-[#ECE8E1] text-[#5B6170] hover:text-[#14161A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Parts Table */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#9AA0AB] uppercase text-[10px] font-semibold border-b border-[#ECE8E1]">
              <tr>
                <th className="px-4 py-3.5">Part Details & SKU</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">OEM Compatibility</th>
                <th className="px-4 py-3.5 text-center">Riyadh Hub</th>
                <th className="px-4 py-3.5 text-center">Jeddah Hub</th>
                <th className="px-4 py-3.5 text-center">Dammam Hub</th>
                <th className="px-4 py-3.5">Unit Price (SAR)</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]">
              {filteredParts.map((part) => (
                <tr key={part.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-[#14161A]">{part.name}</div>
                    <div className="font-mono text-[11px] text-[#9AA0AB]">{part.partNumber}</div>
                  </td>
                  <td className="px-4 py-3.5 text-[#5B6170]">{part.category}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {part.compatibleBrands.map((b, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.2 bg-[#FAF8F5] border border-[#ECE8E1] rounded text-[#5B6170]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center font-mono font-medium">
                    <span className={part.stockRiyadh <= part.reorderLevel ? 'text-[#E5484D] font-bold' : 'text-[#14161A]'}>
                      {part.stockRiyadh} units
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center font-mono font-medium">
                    <span className={part.stockJeddah <= part.reorderLevel ? 'text-[#E5484D] font-bold' : 'text-[#14161A]'}>
                      {part.stockJeddah} units
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center font-mono font-medium">
                    <span className={part.stockDammam <= part.reorderLevel ? 'text-[#E5484D] font-bold' : 'text-[#14161A]'}>
                      {part.stockDammam} units
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-[#14161A]">
                    {part.priceSar.toLocaleString()} SAR
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleRequestTransfer(part)}
                      className="px-2.5 py-1 text-xs bg-[#FAF8F5] border border-[#ECE8E1] hover:bg-[#F2EFE9] text-[#14161A] font-medium rounded-lg transition-colors"
                    >
                      Hold Stock
                    </button>
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
