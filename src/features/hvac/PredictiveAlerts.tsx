import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { PredictiveAlert } from '../../types';
import {
  Activity,
  AlertTriangle,
  Radio,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Gauge,
  Thermometer,
  Zap,
} from 'lucide-react';

export const PredictiveAlerts: React.FC = () => {
  const { predictiveAlerts, addToast } = useStore();
  const [selectedAlertId, setSelectedAlertId] = useState(predictiveAlerts[0]?.id);

  // Simulated live sensor values for the selected unit
  const [simulatedVibration, setSimulatedVibration] = useState(7.2);
  const [simulatedTemp, setSimulatedTemp] = useState(98.4);
  const [simulatedCurrent, setSimulatedCurrent] = useState(84.2);

  const selectedAlert = predictiveAlerts.find((a) => a.id === selectedAlertId) || predictiveAlerts[0];

  const handleSimulateStressTest = () => {
    setSimulatedVibration(8.9);
    setSimulatedTemp(106.2);
    setSimulatedCurrent(96.5);
    addToast({
      title: 'High-Temperature Safety Warning',
      message: `${selectedAlert.clientName} discharge temp exceeded 105°C threshold`,
      type: 'urgent',
    });
  };

  const handleResetSensor = () => {
    setSimulatedVibration(3.4);
    setSimulatedTemp(78.5);
    setSimulatedCurrent(62.0);
    addToast({
      title: 'Sensors Normalized',
      message: 'Telemetry readings returned to nominal operating envelope',
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
            <span>Predictive Telemetry</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Predictive Maintenance & IoT Sensor Network
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Real-time vibration spectral analysis, discharge superheat drift, and motor winding phase imbalance monitoring
          </p>
        </div>

        {/* Sensor connection pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#ECE8E1] rounded-xl text-xs">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
          <span className="font-semibold text-[#14161A]">3 Connected IoT Gateways Live</span>
        </div>
      </div>

      {/* Advisory banner */}
      <div className="bg-[#FAF8F5] border border-[#ECE8E1] rounded-2xl p-4 flex items-center justify-between text-xs text-[#5B6170]">
        <div className="flex items-center gap-2.5">
          <Radio className="w-4 h-4 text-[#0EA5B7]" />
          <span>
            <strong>Note on Accuracy:</strong> Basic failure forecasting uses historical maintenance work logs. High-precision predictive warnings require continuous Modbus / 4G LoRaWAN telemetry.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Risk Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-semibold text-[#14161A] tracking-tight">
            High-Risk Commercial Assets ({predictiveAlerts.length})
          </h3>

          <div className="space-y-3">
            {predictiveAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => {
                  setSelectedAlertId(alert.id);
                  setSimulatedVibration(alert.sensorVibrationMmS);
                  setSimulatedTemp(alert.sensorDischargeTempC);
                  setSimulatedCurrent(alert.sensorCurrentAmp);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedAlert.id === alert.id
                    ? 'bg-white border-[#0EA5B7] shadow-sm ring-1 ring-[#0EA5B7]/30'
                    : 'bg-white border-[#ECE8E1] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-[#9AA0AB] uppercase">{alert.location}</span>
                    <h4 className="text-xs font-semibold text-[#14161A] mt-0.5">{alert.clientName}</h4>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      alert.riskLevel === 'high'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : alert.riskLevel === 'medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    Risk Score: {alert.riskScore}/100
                  </span>
                </div>

                <div className="text-xs text-[#E5484D] font-medium mt-2">{alert.identifiedRisk}</div>
                <div className="text-[11px] text-[#5B6170] mt-1">{alert.equipmentType}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Sensor Telemetry Studio (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA0AB]">
                Live IoT Telemetry Node
              </span>
              <h3 className="text-sm font-semibold text-[#14161A] mt-0.5">
                {selectedAlert.clientName} · {selectedAlert.brand}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetSensor}
                className="px-2.5 py-1 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg text-[#5B6170] hover:text-[#14161A]"
              >
                Nominal
              </button>
              <button
                onClick={handleSimulateStressTest}
                className="px-2.5 py-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg font-medium hover:bg-red-100"
              >
                Simulate Heat Spike
              </button>
            </div>
          </div>

          {/* Real-time Telemetry Gauges */}
          <div className="grid grid-cols-3 gap-3">
            {/* Vibration */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] text-center space-y-1">
              <div className="flex items-center justify-center text-[#9AA0AB] mb-1">
                <Activity className="w-4 h-4 text-[#0EA5B7]" />
              </div>
              <span className="text-[10px] uppercase font-semibold text-[#5B6170]">Vibration RMS</span>
              <div className="text-xl font-mono font-bold text-[#14161A] font-mono-numbers">
                {simulatedVibration.toFixed(1)} <span className="text-xs font-normal text-[#9AA0AB]">mm/s</span>
              </div>
              <div className={`text-[10px] font-semibold ${simulatedVibration > 5.5 ? 'text-[#E5484D]' : 'text-[#16A34A]'}`}>
                {simulatedVibration > 5.5 ? 'Above ISO Limit' : 'Within Tolerance'}
              </div>
            </div>

            {/* Discharge Temp */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] text-center space-y-1">
              <div className="flex items-center justify-center text-[#9AA0AB] mb-1">
                <Thermometer className="w-4 h-4 text-[#FF8A5B]" />
              </div>
              <span className="text-[10px] uppercase font-semibold text-[#5B6170]">Discharge Temp</span>
              <div className="text-xl font-mono font-bold text-[#14161A] font-mono-numbers">
                {simulatedTemp.toFixed(1)} <span className="text-xs font-normal text-[#9AA0AB]">°C</span>
              </div>
              <div className={`text-[10px] font-semibold ${simulatedTemp > 95 ? 'text-[#E5484D]' : 'text-[#16A34A]'}`}>
                {simulatedTemp > 95 ? 'High Superheat' : 'Optimal Condensation'}
              </div>
            </div>

            {/* Current */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] text-center space-y-1">
              <div className="flex items-center justify-center text-[#9AA0AB] mb-1">
                <Zap className="w-4 h-4 text-[#6C8CFF]" />
              </div>
              <span className="text-[10px] uppercase font-semibold text-[#5B6170]">Compressor Load</span>
              <div className="text-xl font-mono font-bold text-[#14161A] font-mono-numbers">
                {simulatedCurrent.toFixed(1)} <span className="text-xs font-normal text-[#9AA0AB]">Amps</span>
              </div>
              <div className="text-[10px] font-semibold text-[#16A34A]">
                Phase Balance 98%
              </div>
            </div>
          </div>

          {/* Historical Root Cause & Technical Recommendation */}
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
              <span className="text-[10px] font-semibold text-[#9AA0AB] uppercase">Historical Root Cause</span>
              <p className="text-[#14161A] mt-1 leading-relaxed">
                {selectedAlert.historicalRootCause}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50/30 border border-teal-200">
              <span className="text-[10px] font-bold text-teal-800 uppercase">Automated Operational Recommendation</span>
              <p className="text-[#14161A] mt-1 leading-relaxed">
                {selectedAlert.recommendation}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#ECE8E1] flex justify-end">
            <button
              onClick={() => {
                addToast({
                  title: 'Preventive Dispatch Queued',
                  message: `Maintenance scheduled for ${selectedAlert.clientName} prior to breakdown failure`,
                  type: 'booking',
                });
              }}
              className="px-4 py-2 bg-[#14161A] hover:bg-[#2B303A] text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Schedule Pre-emptive Service Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
