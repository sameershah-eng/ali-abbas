import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Appointment } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  MapPin,
  CheckCircle2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Filter,
  User,
  X,
  Share2,
} from 'lucide-react';

export const BookingCalendar: React.FC = () => {
  const { appointments, addAppointment, rescheduleAppointment, technicians } = useStore();
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDate, setSelectedDate] = useState('2026-10-13');
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [date, setDate] = useState('2026-10-13');
  const [timeSlot, setTimeSlot] = useState('14:00 - 16:00');
  const [serviceType, setServiceType] = useState<Appointment['serviceType']>('Emergency Repair');
  const [technicianId, setTechnicianId] = useState('tech-1');
  const [notes, setNotes] = useState('');

  const weekDays = [
    { name: 'Sun', date: '2026-10-11' },
    { name: 'Mon', date: '2026-10-12' },
    { name: 'Tue', date: '2026-10-13', isToday: true },
    { name: 'Wed', date: '2026-10-14' },
    { name: 'Thu', date: '2026-10-15' },
    { name: 'Fri', date: '2026-10-16' },
    { name: 'Sat', date: '2026-10-17' },
  ];

  const timeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00',
    '20:00 - 22:00',
  ];

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return;

    const tech = technicians.find((t) => t.id === technicianId);

    addAppointment({
      customerName,
      phone,
      address,
      city,
      date,
      timeSlot,
      technicianId,
      technicianName: tech ? tech.name : 'Duty Dispatcher',
      serviceType,
      status: 'confirmed',
      syncedCalendar: 'Google Calendar',
      notes,
    });

    setShowModal(false);
    setCustomerName('');
    setPhone('');
    setAddress('');
    setNotes('');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section A · Customer Communication</span>
            <span>·</span>
            <span>Dispatch Schedule</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Appointment Booking & Field Calendar
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Two-way calendar synchronization with Google Calendar & Microsoft 365 with automated SMS arrival holds
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Calendar Sync Badges */}
          <div className="hidden md:flex items-center gap-2 text-xs text-[#5B6170]">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#ECE8E1] rounded-lg">
              <CalendarCheck className="w-3.5 h-3.5 text-[#0EA5B7]" />
              <span>Google Calendar Live</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#ECE8E1] rounded-lg">
              <CalendarCheck className="w-3.5 h-3.5 text-[#6C8CFF]" />
              <span>Outlook Sync</span>
            </span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs hover:opacity-95"
          >
            <Plus className="w-4 h-4" />
            <span>Book Visit Slot</span>
          </button>
        </div>
      </div>

      {/* Week Day Header Strip */}
      <div className="bg-white border border-[#ECE8E1] rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#0EA5B7]" />
            <h3 className="text-sm font-semibold text-[#14161A]">October 2026 · Week 42</h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === 'week' ? 'bg-[#14161A] text-white' : 'text-[#5B6170] hover:bg-[#FAF8F5]'
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === 'day' ? 'bg-[#14161A] text-white' : 'text-[#5B6170] hover:bg-[#FAF8F5]'
              }`}
            >
              Day View
            </button>
          </div>
        </div>

        {/* Days selector */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedDate === d.date
                  ? 'border-[#0EA5B7] bg-[#FAF8F5] shadow-xs'
                  : 'border-[#ECE8E1] hover:bg-[#FAF8F5]/60'
              }`}
            >
              <div className="text-[10px] uppercase font-semibold text-[#9AA0AB]">{d.name}</div>
              <div className="text-base font-serif-display font-bold text-[#14161A] mt-0.5">
                {d.date.split('-')[2]}
              </div>
              {d.isToday && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0EA5B7] mt-1" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List for selected date */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#14161A]">
            Scheduled Visits for {selectedDate} ({appointments.filter((a) => a.date === selectedDate).length} slots)
          </h3>
          <span className="text-xs text-[#9AA0AB]">Click Reschedule to modify visit timing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments
            .filter((a) => a.date === selectedDate)
            .map((apt) => (
              <div
                key={apt.id}
                className="bg-white border border-[#ECE8E1] rounded-2xl p-5 shadow-xs space-y-3 relative overflow-hidden group hover:border-[#0EA5B7]/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        apt.serviceType === 'Emergency Repair'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {apt.serviceType}
                    </span>
                    <h4 className="text-sm font-semibold text-[#14161A] mt-1.5">
                      {apt.customerName}
                    </h4>
                  </div>

                  <span className="text-[10px] text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {apt.syncedCalendar}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#5B6170]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#9AA0AB]" />
                    <span className="font-mono font-medium text-[#14161A]">{apt.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#9AA0AB]" />
                    <span className="truncate">{apt.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#9AA0AB]" />
                    <span>{apt.technicianName}</span>
                  </div>
                </div>

                {apt.notes && (
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#ECE8E1] text-[11px] text-[#5B6170] leading-snug">
                    {apt.notes}
                  </div>
                )}

                {/* Reschedule controls */}
                <div className="pt-2 border-t border-[#ECE8E1] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#9AA0AB] font-mono">{apt.phone}</span>
                  <div className="flex items-center gap-1.5">
                    <select
                      value={apt.timeSlot}
                      onChange={(e) => rescheduleAppointment(apt.id, apt.date, e.target.value)}
                      className="text-[11px] bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg px-2 py-1 text-[#14161A] outline-none"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

          {appointments.filter((a) => a.date === selectedDate).length === 0 && (
            <div className="col-span-full p-8 text-center bg-white border border-dashed border-[#ECE8E1] rounded-2xl text-xs text-[#9AA0AB]">
              No appointments scheduled for {selectedDate}. Click "Book Visit Slot" to create one.
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#ECE8E1] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <h3 className="font-serif-display text-lg font-semibold text-[#14161A]">
                Book HVAC Technician Dispatch
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#9AA0AB] hover:text-[#14161A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Noura Al-Sudairi"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Phone (+966)</label>
                  <input
                    type="text"
                    required
                    placeholder="+966 55 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#5B6170] font-medium mb-1">Full Site Address</label>
                <input
                  type="text"
                  required
                  placeholder="Villa 22, Al Rawdah St, Jeddah"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Time Slot Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Service Type</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as any)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  >
                    <option value="Emergency Repair">Emergency Repair</option>
                    <option value="Preventive AMC">Preventive AMC</option>
                    <option value="VRF Diagnostics">VRF Diagnostics</option>
                    <option value="Chiller Overhaul">Chiller Overhaul</option>
                    <option value="Duct Cleaning">Duct Cleaning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Assigned Technician</label>
                  <select
                    value={technicianId}
                    onChange={(e) => setTechnicianId(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  >
                    {technicians.map((tech) => (
                      <option key={tech.id} value={tech.id}>
                        {tech.name} ({tech.branchId})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#5B6170] font-medium mb-1">Access Notes</label>
                <input
                  type="text"
                  placeholder="Gate passcode, ladder required, key with security..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
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
                  Confirm & Sync Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
