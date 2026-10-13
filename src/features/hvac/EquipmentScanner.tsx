import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Search,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ScanResult {
  brand: string;
  model: string;
  serial: string;
  capacity: string;
  refrigerant: string;
  manufacturingYear: string;
  detectedIssues: string[];
  warrantyStatus: 'In Warranty' | 'Expired';
}

export const EquipmentScanner: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedSample, setSelectedSample] = useState<number>(0);
  const [result, setResult] = useState<ScanResult | null>(null);

  const sampleUnits = [
    {
      name: 'Carrier WeatherMaker 50TCA (Rooftop Package)',
      brand: 'Carrier',
      model: '50TCA060-A-501',
      serial: 'CAR-2023-99410-RU',
      capacity: '5.0 Ton (60,000 BTU/h)',
      refrigerant: 'R-410A (Factory Charge: 3.8 kg)',
      manufacturingYear: '2023',
      detectedIssues: [
        'Oil stain on high-pressure service Schrader valve (Likely seal leak)',
        'Heavy dust compaction on exterior condenser coil fins (35% airflow reduction)',
      ],
      warrantyStatus: 'In Warranty' as const,
      aspect: 'Commercial Rooftop Unit',
    },
    {
      name: 'Daikin VRV IV-X Heat Recovery System',
      brand: 'Daikin',
      model: 'RXQ12TAYDU',
      serial: 'DKN-VRV-2022-8172',
      capacity: '12.0 HP (114,000 BTU/h)',
      refrigerant: 'R-410A (Inverter Variable Speed)',
      manufacturingYear: '2022',
      detectedIssues: [
        'PCB LED diagnostic indicator shows 3 red blinks (Inverter IPM high temperature)',
        'Condenser fan #2 bearing shows slight mechanical wobble',
      ],
      warrantyStatus: 'In Warranty' as const,
      aspect: 'Multi-Split Central Cassette',
    },
    {
      name: 'Zamil Classic Package Unit 10-Ton',
      brand: 'Zamil',
      model: 'ZCC-120-HD-5',
      serial: 'ZAM-2019-44109-SA',
      capacity: '10.0 Ton (120,000 BTU/h)',
      refrigerant: 'R-22 Retrofit Compatible / R-407C',
      manufacturingYear: '2019',
      detectedIssues: [
        'Dual run capacitor casing visibly bulging at terminal top',
        'Severe oxidation on contactor copper contacts',
      ],
      warrantyStatus: 'Expired' as const,
      aspect: 'Heavy Industrial Villa Package',
    },
  ];

  const handleRunScan = () => {
    setIsScanning(true);
    setResult(null);
    setTimeout(() => {
      const active = sampleUnits[selectedSample];
      setResult({
        brand: active.brand,
        model: active.model,
        serial: active.serial,
        capacity: active.capacity,
        refrigerant: active.refrigerant,
        manufacturingYear: active.manufacturingYear,
        detectedIssues: active.detectedIssues,
        warrantyStatus: active.warrantyStatus,
      });
      setIsScanning(false);
    }, 1800);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section B · HVAC Service Support</span>
            <span>·</span>
            <span>Computer Vision & OCR</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Equipment Photo & Model Recognition
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Instant OCR nameplate extraction and thermal coil defect recognition for technician camera uploads
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Scanner Viewport (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#14161A]">Nameplate / Unit Photo Intake</h3>
            <span className="text-xs text-[#9AA0AB]">Select Sample or Upload</span>
          </div>

          {/* Sample Selector */}
          <div className="grid grid-cols-3 gap-2">
            {sampleUnits.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedSample(idx);
                  setResult(null);
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedSample === idx
                    ? 'border-[#0EA5B7] bg-[#FAF8F5] shadow-xs'
                    : 'border-[#ECE8E1] hover:bg-[#FAF8F5]/60'
                }`}
              >
                <div className="font-semibold text-[#14161A] truncate">{sample.brand}</div>
                <div className="text-[10px] text-[#9AA0AB] truncate">{sample.aspect}</div>
              </button>
            ))}
          </div>

          {/* Simulated Camera Viewport */}
          <div className="relative aspect-4/3 bg-[#14161A] rounded-2xl overflow-hidden flex items-center justify-center border border-[#2B303A]">
            {/* Viewfinder crosshairs */}
            <div className="absolute inset-8 border border-white/20 rounded-xl pointer-events-none flex flex-col justify-between p-2">
              <div className="flex justify-between text-[10px] text-white/50 font-mono">
                <span>[OCR TARGET]</span>
                <span>ISO 400 · 4K</span>
              </div>
              <div className="flex justify-between text-[10px] text-white/50 font-mono">
                <span>{sampleUnits[selectedSample].brand.toUpperCase()}</span>
                <span>NAMEPLATE 24V</span>
              </div>
            </div>

            {/* Simulated Equipment Badge Graphic */}
            <div className="text-center p-6 text-white/80 space-y-2 z-10">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Camera className="w-8 h-8 text-[#0EA5B7]" />
              </div>
              <div className="text-sm font-semibold text-white">
                {sampleUnits[selectedSample].name}
              </div>
              <div className="text-xs text-white/60 font-mono">
                Serial Tag: {sampleUnits[selectedSample].serial}
              </div>
            </div>

            {/* Laser scanning beam animation */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0EA5B7] to-transparent shadow-[0_0_12px_#0EA5B7] animate-bounce top-10 pointer-events-none" />
            )}
          </div>

          {/* Scan trigger button */}
          <button
            onClick={handleRunScan}
            disabled={isScanning}
            className="w-full py-3 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:opacity-95 transition-opacity disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Running Computer Vision OCR Scan...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Scan & Recognize Equipment Parameters</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Detected Results (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA0AB]">
                OCR Model Specifications
              </span>
              {result && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    result.warrantyStatus === 'In Warranty'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {result.warrantyStatus}
                </span>
              )}
            </div>

            {result ? (
              <div className="space-y-4 mt-4 text-xs">
                {/* Brand & Model */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                  <div>
                    <span className="text-[10px] text-[#9AA0AB] uppercase">Manufacturer</span>
                    <div className="font-semibold text-sm text-[#14161A]">{result.brand}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9AA0AB] uppercase">Exact Model Number</span>
                    <div className="font-mono font-semibold text-sm text-[#14161A]">{result.model}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                    <span className="text-[10px] text-[#9AA0AB] uppercase">Cooling Capacity</span>
                    <div className="font-semibold text-[#14161A] mt-0.5">{result.capacity}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                    <span className="text-[10px] text-[#9AA0AB] uppercase">Refrigerant</span>
                    <div className="font-semibold text-[#14161A] mt-0.5">{result.refrigerant}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                    <span className="text-[10px] text-[#9AA0AB] uppercase">Year Built</span>
                    <div className="font-mono font-semibold text-[#14161A] mt-0.5">{result.manufacturingYear}</div>
                  </div>
                </div>

                {/* Serial Number */}
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#9AA0AB] uppercase">Factory Serial Number</span>
                    <div className="font-mono font-semibold text-[#14161A]">{result.serial}</div>
                  </div>
                  <button
                    onClick={() => navigate('/warranty')}
                    className="text-xs text-[#0EA5B7] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Verify Warranty</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Detected Physical Defects */}
                <div className="p-3.5 rounded-xl bg-red-50/20 border border-red-200 space-y-1.5">
                  <span className="text-[10px] font-bold text-red-700 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Computer Vision Identified Defects
                  </span>
                  <ul className="space-y-1 text-xs text-[#14161A]">
                    {result.detectedIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-[#E5484D] font-bold">·</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-[#9AA0AB]">
                Click "Scan & Recognize Equipment Parameters" to extract OEM model tag and physical defect insights.
              </div>
            )}
          </div>

          {result && (
            <button
              onClick={() => navigate('/spare-parts')}
              className="w-full py-2.5 bg-[#14161A] text-white rounded-xl text-xs font-semibold hover:bg-[#2B303A] transition-colors"
            >
              Search Compatible Spare Parts in Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
