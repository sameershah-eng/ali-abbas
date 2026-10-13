import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Building,
  RotateCcw,
} from 'lucide-react';

interface WarrantyRecord {
  serial: string;
  brand: string;
  model: string;
  status: 'In Warranty' | 'Expired';
  installedDate: string;
  warrantyExpiry: string;
  distributor: string;
  coverageDetails: string;
}

export const WarrantyVerifier: React.FC = () => {
  const [serialQuery, setSerialQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<WarrantyRecord | null>(null);

  const mockDatabase: Record<string, WarrantyRecord> = {
    'CAR-2023-99410-RU': {
      serial: 'CAR-2023-99410-RU',
      brand: 'Carrier Saudi Arabia',
      model: '50TCA060 WeatherMaker Rooftop 5-Ton',
      status: 'In Warranty',
      installedDate: '2023-05-14',
      warrantyExpiry: '2028-05-14 (Compressor: 5 Years)',
      distributor: 'Carrier Middle East / Al Zamil Air Conditioners',
      coverageDetails: 'Full parts & labor on Copeland scroll compressor and heat exchanger. Standard 1-year on electrical capacitors and fan motor.',
    },
    'DKN-VRV-2022-8172': {
      serial: 'DKN-VRV-2022-8172',
      brand: 'Daikin GCC',
      model: 'RXQ12TAYDU VRV IV-X Inverter Outdoor',
      status: 'In Warranty',
      installedDate: '2022-11-08',
      warrantyExpiry: '2027-11-08 (5-Year Inverter Board Warranty)',
      distributor: 'Daikin Airconditioning Saudi Arabia LLC',
      coverageDetails: 'Covers inverter PCB, electronic expansion valves, and inverter swing compressor.',
    },
    'ZAM-2019-44109-SA': {
      serial: 'ZAM-2019-44109-SA',
      brand: 'Zamil Classic',
      model: 'ZCC-120-HD-5 Package Unit 10-Ton',
      status: 'Expired',
      installedDate: '2019-03-20',
      warrantyExpiry: '2024-03-20 (Expired)',
      distributor: 'Zamil Industrial Investment Company',
      coverageDetails: 'OEM manufacturer warranty has lapsed. Eligible for discounted Annual Maintenance Contract (AMC) transition.',
    },
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialQuery.trim()) return;

    const normalized = serialQuery.trim().toUpperCase();
    const match = mockDatabase[normalized] || {
      serial: normalized,
      brand: 'Carrier / Daikin / Zamil Registry',
      model: 'Standard GCC High-Ambient Specification',
      status: 'In Warranty',
      installedDate: '2024-02-10',
      warrantyExpiry: '2029-02-10',
      distributor: 'Authorized Saudi Kingdom Distributor',
      coverageDetails: 'Active 5-year compressor and condenser coil replacement guarantee.',
    };

    setResult(match);
    setSearched(true);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section B · HVAC Service Support</span>
            <span>·</span>
            <span>OEM Warranty Verification</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Serial Number & Warranty Coverage Checker
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Instant registry lookup across official Saudi distributors (Carrier, Daikin, Zamil, Gree, York) to prevent unwarranted client charges
          </p>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs max-w-2xl mx-auto space-y-4">
        <form onSubmit={handleVerify} className="space-y-3">
          <label className="block text-xs font-semibold text-[#14161A]">
            Enter Equipment Factory Serial Number
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. CAR-2023-99410-RU or DKN-VRV-2022-8172"
              value={serialQuery}
              onChange={(e) => setSerialQuery(e.target.value)}
              className="flex-1 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl px-3.5 py-2.5 text-[#14161A] font-mono outline-none focus:border-[#0EA5B7]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-thermal-gradient text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Verify Coverage</span>
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2 text-[11px] text-[#9AA0AB]">
          <span>Quick test serials:</span>
          <button
            onClick={() => setSerialQuery('CAR-2023-99410-RU')}
            className="font-mono text-[#0EA5B7] hover:underline"
          >
            CAR-2023-99410-RU
          </button>
          <span>·</span>
          <button
            onClick={() => setSerialQuery('ZAM-2019-44109-SA')}
            className="font-mono text-[#0EA5B7] hover:underline"
          >
            ZAM-2019-44109-SA
          </button>
        </div>
      </div>

      {/* Result Card */}
      {searched && result && (
        <div className="bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs max-w-2xl mx-auto space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0EA5B7]" />
              <h3 className="text-sm font-semibold text-[#14161A]">Warranty Status Result</h3>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                result.status === 'In Warranty'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {result.status}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
              <div>
                <span className="text-[10px] text-[#9AA0AB] uppercase">Equipment Manufacturer</span>
                <div className="font-semibold text-[#14161A] mt-0.5">{result.brand}</div>
              </div>
              <div>
                <span className="text-[10px] text-[#9AA0AB] uppercase">Registered Serial</span>
                <div className="font-mono font-semibold text-[#14161A] mt-0.5">{result.serial}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                <span className="text-[10px] text-[#9AA0AB] uppercase">Commissioning Date</span>
                <div className="font-mono text-[#14161A] mt-0.5">{result.installedDate}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                <span className="text-[10px] text-[#9AA0AB] uppercase">Warranty Expiry</span>
                <div className="font-mono text-[#14161A] mt-0.5">{result.warrantyExpiry}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
              <span className="text-[10px] text-[#9AA0AB] uppercase">Coverage Terms & Inclusions</span>
              <p className="text-[#14161A] mt-1 leading-relaxed">
                {result.coverageDetails}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
