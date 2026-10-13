import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import {
  MapPin,
  Navigation,
  Send,
  CheckCircle2,
  Clock,
  Truck,
  Star,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Phone,
} from 'lucide-react';

export const LiveTrackingMap: React.FC = () => {
  const { activeJobs, updateJobProgress, completeJob, addToast } = useStore();
  const [selectedJobId, setSelectedJobId] = useState(activeJobs[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentJob = activeJobs.find((j) => j.id === selectedJobId) || activeJobs[0];

  // Route animation simulation
  useEffect(() => {
    if (!currentJob || currentJob.status === 'completed') return;

    const interval = setInterval(() => {
      if (currentJob.routeProgress < 100) {
        const nextProgress = Math.min(100, currentJob.routeProgress + 4);
        const nextEta = Math.max(0, Math.round((100 - nextProgress) / 5));
        updateJobProgress(currentJob.id, nextProgress, nextEta);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [currentJob, updateJobProgress]);

  // Canvas signature handling
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#14161A';
    ctx.lineWidth = 2;
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleCompleteJob = () => {
    if (!currentJob) return;
    completeJob(currentJob.id, 'signed_svg_token', rating, 'Customer inspected air temperature: 21°C verified');
  };

  const handleSendWhatsAppLink = () => {
    addToast({
      title: 'WhatsApp Tracking Dispatched',
      message: `Live ETA map link sent to ${currentJob.customerPhone}`,
      type: 'info',
    });
  };

  // Coordinates on SVG map based on progress
  const startX = 140;
  const startY = 320;
  const endX = 420;
  const endY = 120;
  const currentX = startX + (endX - startX) * (currentJob?.routeProgress / 100);
  const currentY = startY + (endY - startY) * (currentJob?.routeProgress / 100);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section B · HVAC Service Support</span>
            <span>·</span>
            <span>Fleet Telematics</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Live Fleet Tracking & Arrival Sign-off
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Vectorized city route simulation with live ETA broadcast, arrival notification, and digital customer signature pad
          </p>
        </div>

        <button
          onClick={handleSendWhatsAppLink}
          className="px-4 py-2 bg-[#16A34A] text-white rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-[#15803D] transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send Customer WhatsApp Tracking Link</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Stylized SVG Map of City (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0EA5B7]" />
              <h3 className="text-sm font-semibold text-[#14161A]">
                Riyadh Urban Expressways & Fleet Radar
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-[#5B6170]">ETA:</span>
              <span className="font-mono font-bold text-sm text-[#0EA5B7]">
                {currentJob.etaMinutes} MINS
              </span>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative aspect-16/10 bg-[#FAF8F5] border border-[#ECE8E1] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
            <svg
              viewBox="0 0 600 400"
              className="w-full h-full select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background City Grid Lines */}
              <defs>
                <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ECE8E1" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="600" height="400" fill="url(#cityGrid)" />

              {/* Major Riyadh Ring Arteries */}
              {/* Northern Ring Road */}
              <path
                d="M 20 120 Q 300 130 580 120"
                stroke="#E5E1D8"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
              <text x="30" y="110" fill="#9AA0AB" fontSize="9" fontWeight="600">NORTHERN RING ROAD</text>

              {/* King Fahd Road */}
              <path
                d="M 280 20 L 280 380"
                stroke="#E5E1D8"
                strokeWidth="12"
                fill="none"
              />
              <text x="290" y="370" fill="#9AA0AB" fontSize="9" fontWeight="600">KING FAHD ROAD</text>

              {/* Al Takhassusi Street */}
              <path
                d="M 180 40 L 180 360"
                stroke="#EFECE6"
                strokeWidth="8"
                fill="none"
              />

              {/* Route Planned (Dash line) */}
              <path
                d={`M ${startX} ${startY} Q 240 240 ${endX} ${endY}`}
                stroke="#0EA5B7"
                strokeWidth="4"
                strokeDasharray="6 6"
                fill="none"
              />

              {/* Dispatch Depot Pin */}
              <circle cx={startX} cy={startY} r="8" fill="#14161A" />
              <text x={startX - 30} y={startY + 22} fill="#5B6170" fontSize="10" fontWeight="600">
                Al Olaya Depot
              </text>

              {/* Destination Customer Site Pin */}
              <circle cx={endX} cy={endY} r="10" fill="#FF8A5B" />
              <circle cx={endX} cy={endY} r="4" fill="#FFFFFF" />
              <text x={endX - 40} y={endY - 14} fill="#14161A" fontSize="10" fontWeight="bold">
                {currentJob.customerName}
              </text>

              {/* Animated Technician Moving Vehicle Marker */}
              <g transform={`translate(${currentX}, ${currentY})`}>
                <circle r="14" fill="#0EA5B7" fillOpacity="0.2" className="animate-ping" />
                <circle r="9" fill="#0EA5B7" stroke="#FFFFFF" strokeWidth="2" />
                <circle r="4" fill="#FFFFFF" />
              </g>
            </svg>

            {/* Floating Telematics Card on Map */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-[#ECE8E1] rounded-xl p-3 shadow-md text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#14161A]">
                <Truck className="w-3.5 h-3.5 text-[#0EA5B7]" />
                <span>{currentJob.technicianName}</span>
              </div>
              <div className="text-[11px] text-[#5B6170]">
                Toyota HiAce Service Van #4 · Speed: 58 km/h
              </div>
            </div>
          </div>

          {/* Stepper Status Bar */}
          <div className="pt-2">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {[
                { label: 'Assigned', done: true },
                { label: 'En Route', done: currentJob.routeProgress > 0 },
                { label: 'Arrived on Site', done: currentJob.routeProgress >= 100 },
                { label: 'Job Completed', done: currentJob.status === 'completed' },
              ].map((step, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      step.done ? 'bg-gradient-to-r from-[#0EA5B7] to-[#FF8A5B]' : 'bg-[#ECE8E1]'
                    }`}
                  />
                  <span className={`text-[11px] font-medium ${step.done ? 'text-[#14161A]' : 'text-[#9AA0AB]'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Job Details & Customer Signature Sign-off (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#ECE8E1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA0AB]">
                Work Order Details
              </span>
              <span className="font-mono text-xs text-[#0EA5B7] font-semibold">
                #{currentJob.id.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                <div className="text-[#9AA0AB] text-[10px] uppercase">Customer & Address</div>
                <div className="font-semibold text-sm text-[#14161A] mt-0.5">{currentJob.customerName}</div>
                <div className="text-[#5B6170] mt-0.5">{currentJob.address}</div>
                <div className="font-mono text-[11px] text-[#0EA5B7] mt-1">{currentJob.customerPhone}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                <div className="text-[#9AA0AB] text-[10px] uppercase">Equipment Under Service</div>
                <div className="font-semibold text-xs text-[#14161A] mt-0.5">{currentJob.equipment}</div>
                <div className="text-[#5B6170] mt-0.5 text-[11px]">{currentJob.notes}</div>
              </div>

              {/* Digital Signature Pad */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#14161A]">
                    Customer Digital Sign-Off
                  </label>
                  <button
                    onClick={clearSignature}
                    className="text-[11px] text-[#9AA0AB] hover:text-[#14161A] underline"
                  >
                    Clear Signature
                  </button>
                </div>

                <div className="border border-dashed border-[#ECE8E1] rounded-xl bg-[#FAF8F5] overflow-hidden relative">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={100}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full h-[100px] cursor-crosshair"
                  />
                  {!hasSignature && (
                    <div className="absolute inset-0 flex items-center justify-center text-[#9AA0AB] text-xs pointer-events-none">
                      Draw signature here with mouse or touch
                    </div>
                  )}
                </div>
              </div>

              {/* 5-Star Customer Rating */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#5B6170]">Post-Service Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-[#ECE8E1]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Complete Job Button */}
          <button
            onClick={handleCompleteJob}
            disabled={currentJob.status === 'completed'}
            className="w-full py-3 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:opacity-95 transition-opacity disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {currentJob.status === 'completed'
                ? 'Work Order Completed & Signed'
                : 'Confirm Arrival & Complete Work Order'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
