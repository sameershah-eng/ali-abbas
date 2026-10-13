import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Quotation, QuotationLineItem } from '../../types';
import {
  FileText,
  Plus,
  CheckCircle2,
  Printer,
  CreditCard,
  Send,
  Building,
  DollarSign,
  Trash2,
  X,
  ShieldCheck,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

export const QuotationBuilder: React.FC = () => {
  const { quotations, addQuotation, approveQuotation, updateQuotationStatus, addToast } = useStore();
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<'mada' | 'apple_pay' | 'visa' | 'stc_pay'>('mada');

  // Form State for new quotation
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [items, setItems] = useState<QuotationLineItem[]>([
    {
      id: 'i-1',
      description: 'Carrier 5-Ton Copeland Scroll Compressor Replacement & Oil Flush',
      quantity: 1,
      unitPriceSar: 3450,
      totalSar: 3450,
    },
    {
      id: 'i-2',
      description: 'Nitrogen Pressure Test & Virgin R410A Refrigerant Charge (3.8 kg)',
      quantity: 1,
      unitPriceSar: 680,
      totalSar: 680,
    },
  ]);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: 'i-' + Date.now(),
        description: 'New Line Item / Service Labor',
        quantity: 1,
        unitPriceSar: 250,
        totalSar: 250,
      },
    ]);
  };

  const handleUpdateItem = (id: string, field: string, val: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: val };
          updated.totalSar = Number(updated.quantity) * Number(updated.unitPriceSar);
          return updated;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || items.length === 0) return;

    addQuotation({
      customerName,
      customerPhone,
      customerEmail: 'customer@gcc-client.sa',
      customerAddress,
      city,
      items,
      subtotalSar: 0,
      vatRate: 0.15,
      vatAmountSar: 0,
      totalSar: 0,
      status: 'awaiting_approval',
      approvedByOwner: false,
      validUntil: '2026-10-28',
      tabbyInstallmentSar: 0,
      tamaraInstallmentSar: 0,
    });

    setShowCreateModal(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
  };

  const subtotalForm = items.reduce((acc, i) => acc + i.totalSar, 0);
  const vatForm = subtotalForm * 0.15;
  const totalForm = subtotalForm + vatForm;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section C · Quotations & Sales</span>
            <span>·</span>
            <span>ZATCA Phase 2 Compliant</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Quotation Builder & BNPL Billing
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Auto-calculated line items with standard 15% VAT, Tabby / Tamara 4-installment splitting, and owner approval workflow
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-thermal-gradient text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs hover:opacity-95 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Draft New Quotation</span>
        </button>
      </div>

      {/* Quotations List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {quotations.map((q) => (
          <div
            key={q.id}
            className="bg-white border border-[#ECE8E1] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#0EA5B7]/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#0EA5B7]">{q.quoteNumber}</span>
                  <h3 className="text-sm font-semibold text-[#14161A] mt-1">{q.customerName}</h3>
                  <div className="text-[11px] text-[#5B6170]">{q.city} · {q.customerPhone}</div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    q.status === 'accepted'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : q.status === 'awaiting_approval'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : q.status === 'sent'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {q.status.replace('_', ' ')}
                </span>
              </div>

              {/* Items summary */}
              <div className="mt-3.5 space-y-1.5 text-xs text-[#5B6170]">
                {q.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex justify-between truncate">
                    <span className="truncate pr-2">{item.quantity}x {item.description}</span>
                    <span className="font-mono font-medium text-[#14161A] shrink-0">
                      {item.totalSar.toLocaleString()} SAR
                    </span>
                  </div>
                ))}
                {q.items.length > 2 && (
                  <div className="text-[10px] text-[#9AA0AB]">+{q.items.length - 2} additional items...</div>
                )}
              </div>

              {/* Financial Box */}
              <div className="mt-4 p-3 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-1 text-xs">
                <div className="flex justify-between text-[#5B6170]">
                  <span>Subtotal:</span>
                  <span className="font-mono">{q.subtotalSar.toLocaleString()} SAR</span>
                </div>
                <div className="flex justify-between text-[#5B6170]">
                  <span>VAT (15%):</span>
                  <span className="font-mono">{q.vatAmountSar.toLocaleString()} SAR</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#14161A] pt-1 border-t border-[#ECE8E1]">
                  <span>Total Amount:</span>
                  <span className="font-mono font-serif-display text-base text-[#14161A]">
                    {q.totalSar.toLocaleString()} SAR
                  </span>
                </div>

                {/* Tabby / Tamara installment badge */}
                <div className="pt-2 border-t border-[#ECE8E1]/60 flex items-center justify-between text-[10px]">
                  <span className="text-[#5B6170]">Or 4 payments of:</span>
                  <span className="font-mono font-bold text-[#16A34A]">
                    {q.tabbyInstallmentSar.toLocaleString()} SAR / mo
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#ECE8E1] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setSelectedQuote(q);
                    setShowPrintModal(true);
                  }}
                  className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2EFE9] text-[#5B6170] hover:text-[#14161A] transition-colors"
                  title="Print / PDF Preview"
                >
                  <Printer className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedQuote(q);
                    setShowPaymentModal(true);
                  }}
                  className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2EFE9] text-[#5B6170] hover:text-[#14161A] transition-colors"
                  title="Payment Links (Mada / Apple Pay)"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                {!q.approvedByOwner ? (
                  <button
                    onClick={() => approveQuotation(q.id)}
                    className="px-3 py-1.5 bg-[#14161A] hover:bg-[#2B303A] text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Owner Approve
                  </button>
                ) : (
                  <span className="text-xs text-[#16A34A] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Quotation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#ECE8E1] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <h3 className="font-serif-display text-lg font-semibold text-[#14161A]">
                Create HVAC Service Quotation
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#9AA0AB] hover:text-[#14161A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateQuote} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Customer / Organization Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Al-Faisaliyah Tower Penthouse"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Saudi Phone (+966)</label>
                  <input
                    type="text"
                    required
                    placeholder="+966 50 882 1199"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">Hub Location</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  >
                    <option value="Riyadh">Riyadh Central</option>
                    <option value="Jeddah">Jeddah West</option>
                    <option value="Dammam">Dammam / Khobar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#5B6170] font-medium mb-1">District / Building Address</label>
                  <input
                    type="text"
                    placeholder="Al Olaya, King Fahd Rd"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg p-2 text-[#14161A] outline-none"
                  />
                </div>
              </div>

              {/* Line items editor */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-[#14161A]">Quote Line Items</label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-[11px] font-semibold text-[#0EA5B7] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-2 items-center p-2 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]"
                    >
                      <input
                        type="text"
                        className="col-span-6 bg-white border border-[#ECE8E1] rounded p-1.5 text-xs text-[#14161A] outline-none"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        placeholder="Description..."
                      />
                      <input
                        type="number"
                        min="1"
                        className="col-span-2 bg-white border border-[#ECE8E1] rounded p-1.5 text-xs text-[#14161A] outline-none text-center"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, 'quantity', e.target.value)}
                      />
                      <input
                        type="number"
                        className="col-span-3 bg-white border border-[#ECE8E1] rounded p-1.5 text-xs text-[#14161A] outline-none text-right font-mono"
                        value={item.unitPriceSar}
                        onChange={(e) => handleUpdateItem(item.id, 'unitPriceSar', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="col-span-1 text-[#9AA0AB] hover:text-[#E5484D] p-1 text-center"
                      >
                        <Trash2 className="w-3.5 h-3.5 mx-auto" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation Review */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] space-y-1 text-xs">
                <div className="flex justify-between text-[#5B6170]">
                  <span>Subtotal:</span>
                  <span className="font-mono">{subtotalForm.toLocaleString()} SAR</span>
                </div>
                <div className="flex justify-between text-[#5B6170]">
                  <span>15% Saudi VAT (ZATCA):</span>
                  <span className="font-mono">{vatForm.toLocaleString()} SAR</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#14161A] pt-1 border-t border-[#ECE8E1]">
                  <span>Total Amount Payable:</span>
                  <span className="font-mono font-serif-display text-base text-[#14161A]">
                    {totalForm.toLocaleString()} SAR
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#ECE8E1]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-2 bg-[#FAF8F5] border border-[#ECE8E1] text-[#14161A] rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-thermal-gradient text-white rounded-lg font-semibold hover:opacity-90"
                >
                  Generate & Queue for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Links Modal */}
      {showPaymentModal && selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#ECE8E1] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1]">
              <h3 className="font-serif-display text-base font-semibold text-[#14161A]">
                Instant Payment Gateway Links
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-[#9AA0AB] hover:text-[#14161A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] text-center">
                <span className="text-[10px] text-[#9AA0AB] uppercase">Payable Total</span>
                <div className="text-xl font-serif-display font-bold text-[#14161A] font-mono-numbers mt-0.5">
                  {selectedQuote.totalSar.toLocaleString()} SAR
                </div>
                <div className="text-[10px] text-[#16A34A] mt-0.5">Includes 15% VAT</div>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'mada', label: 'Mada Debit Card' },
                  { id: 'apple_pay', label: 'Apple Pay' },
                  { id: 'visa', label: 'Visa / Mastercard' },
                  { id: 'stc_pay', label: 'STC Pay Wallet' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setActivePaymentMethod(pm.id as any)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      activePaymentMethod === pm.id
                        ? 'border-[#0EA5B7] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#ECE8E1] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>

              {/* Generated Link Box */}
              <div>
                <label className="block text-[#5B6170] font-medium mb-1">Generated Payment URL</label>
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] font-mono text-[11px] text-[#14161A] truncate">
                  {selectedQuote.paymentLinkUrl}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#ECE8E1]">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(selectedQuote.paymentLinkUrl || '');
                    addToast({
                      title: 'Payment Link Copied',
                      message: 'Ready to paste into WhatsApp customer chat',
                      type: 'info',
                    });
                    setShowPaymentModal(false);
                  }}
                  className="w-full py-2.5 bg-thermal-gradient text-white rounded-xl text-xs font-semibold hover:opacity-90"
                >
                  Copy & Send via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Printable Quote Preview Modal */}
      {showPrintModal && selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-[#ECE8E1] rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto print:p-0 print:border-0">
            <div className="flex items-center justify-between pb-4 border-b border-[#ECE8E1] no-print">
              <h3 className="text-sm font-semibold text-[#14161A]">Official Tax Quotation (ZATCA Phase 2)</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-[#14161A] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="text-[#9AA0AB] hover:text-[#14161A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="space-y-6 pt-4 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif-display font-bold text-[#14161A]">THERMIQ HVAC</h2>
                  <div className="text-[11px] text-[#5B6170] mt-1">
                    Thermiq Operations Ltd. · Commercial Reg: 1010892211
                    <br />
                    VAT ID: 310984210900003 · Riyadh, Kingdom of Saudi Arabia
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-[#0EA5B7]">{selectedQuote.quoteNumber}</div>
                  <div className="text-[11px] text-[#9AA0AB]">Date: {selectedQuote.createdAt}</div>
                  <div className="text-[11px] text-[#9AA0AB]">Valid until: {selectedQuote.validUntil}</div>
                </div>
              </div>

              {/* Client Info */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1]">
                <div className="text-[10px] text-[#9AA0AB] uppercase font-semibold">Billed To</div>
                <div className="font-semibold text-sm text-[#14161A] mt-0.5">{selectedQuote.customerName}</div>
                <div className="text-[#5B6170]">{selectedQuote.customerAddress}, {selectedQuote.city}</div>
                <div className="font-mono text-[11px] text-[#5B6170]">{selectedQuote.customerPhone}</div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left text-xs border border-[#ECE8E1] rounded-xl overflow-hidden">
                <thead className="bg-[#FAF8F5] border-b border-[#ECE8E1] text-[10px] font-semibold text-[#9AA0AB] uppercase">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price (SAR)</th>
                    <th className="p-3 text-right">Total (SAR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE8E1]">
                  {selectedQuote.items.map((it) => (
                    <tr key={it.id}>
                      <td className="p-3 text-[#14161A] font-medium">{it.description}</td>
                      <td className="p-3 text-center font-mono">{it.quantity}</td>
                      <td className="p-3 text-right font-mono">{it.unitPriceSar.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono font-semibold">{it.totalSar.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#5B6170]">
                    <span>Subtotal:</span>
                    <span className="font-mono">{selectedQuote.subtotalSar.toLocaleString()} SAR</span>
                  </div>
                  <div className="flex justify-between text-[#5B6170]">
                    <span>VAT 15%:</span>
                    <span className="font-mono">{selectedQuote.vatAmountSar.toLocaleString()} SAR</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#14161A] pt-1 border-t border-[#ECE8E1]">
                    <span>Total Amount:</span>
                    <span className="font-mono font-serif-display text-base text-[#14161A]">
                      {selectedQuote.totalSar.toLocaleString()} SAR
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#ECE8E1] text-[10px] text-[#9AA0AB] text-center">
                This document is a certified electronic quotation compliant with ZATCA Phase 2 electronic invoicing regulations in Saudi Arabia.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
