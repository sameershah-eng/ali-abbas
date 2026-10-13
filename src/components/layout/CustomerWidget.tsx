import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Phone,
  Flame,
} from 'lucide-react';

interface WidgetMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const CustomerWidget: React.FC = () => {
  const { isCustomerView, setIsCustomerView, addLead } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<WidgetMessage[]>([
    {
      id: 'wm-1',
      sender: 'bot',
      text: 'مرحباً بك في ثيرميك لخدمات التكييف والتبريد بالمملكة! كيف يمكننا مساعدتك اليوم؟ يمكنك اختيار استفسار سريع أو كتابة مشكلتك مباشرة.',
      time: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If customer view is enabled from topbar, open the widget
  useEffect(() => {
    if (isCustomerView) {
      setIsOpen(true);
    }
  }, [isCustomerView]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickChips = [
    'طلب فحص طارئ (عطل تكييف)',
    'أسعار عقود الصيانة السنوية (AMC)',
    'مناطق التغطية في الرياض وجدة والدمام',
    'استفسار عن تعبئة فريون R410a',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: WidgetMessage = {
      id: 'wm-' + Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = 'شكراً لتواصلك مع ثيرميك. تم توجيه استفسارك مباشرة لمهندس العمليات المناوب وسنتصل بك خلال دقائق.';

      if (text.includes('طارئ') || text.includes('عطل') || text.includes('Emergency')) {
        botReply = '⚠️ تم تصنيف طلبك كحالة طارئة بأولوية ساعتين. يرجى تزويدنا برقم الجوال والحي لنرسل الفني المعتمد فوراً (رسوم الكشف ٢٥٠ ر.س تخصم من تكلفة الإصلاح).';
        addLead({
          customerName: 'Customer (Website Widget)',
          phone: '+966 50 000 0000',
          location: 'Riyadh / Jeddah Central',
          city: 'Riyadh',
          requirement: text,
          score: 'Hot',
          scoreReason: 'Emergency trigger initiated via customer chat widget',
          channel: 'website',
          status: 'new',
          estimatedValue: 1200,
          preferredLanguage: 'ar',
        });
      } else if (text.includes('عقود') || text.includes('AMC')) {
        botReply = 'عقود الصيانة الوقائية (AMC) تبدأ من ١,٤٥٠ ر.س للفلل السكنية وتشمل ٤ زيارات دورية، تنظيف الكندنسر بالمواد الكيميائية، وأولوية الاستدعاء في الصيف مع إمكانية التقسيط عبر تابي وتمارا.';
      } else if (text.includes('تغطية') || text.includes('مناطق')) {
        botReply = 'نغطي بالكامل: الرياض (جميع الأحياء)، جدة (الروضة، الزهراء، الشاطئ، أبحر)، والمنطقة الشرقية (الدمام، الخبر، الظهران) مع زمن استجابة قياسي.';
      } else if (text.includes('فريون')) {
        botReply = 'نستخدم فريون أصلي معتمد مع اختبار ضغط النيتروجين وفحص التسريب، بسعر يبدأ من ٢٥٠ ر.س للوحدة شامل الضريبة.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'wm-' + (Date.now() + 1),
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="h-14 px-6 rounded-full bg-[#7C5CFC] hover:bg-[#6D44FE] text-white shadow-xl flex items-center gap-3 transition-all group"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-white" />
          </div>
          <span className="text-xs font-bold tracking-tight">Thermiq AI Assistant</span>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-[380px] sm:w-[420px] h-[580px] bg-white border border-[#ECEBF2] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#141416] text-white p-4.5 flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#7C5CFC]/20 flex items-center justify-center text-[#A78BFA] font-bold text-sm">
                  Ai
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    Thermiq AI Concierge
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#A1A5B7]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span>24/7 Operations Active</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {isCustomerView && (
                  <button
                    onClick={() => setIsCustomerView(false)}
                    className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-[#ECE8E1] transition-colors mr-1"
                    title="Exit Customer Mode"
                  >
                    Exit Preview
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub-banner */}
            <div className="bg-[#FAF8F5] px-4 py-2 border-b border-[#ECE8E1] text-[11px] text-[#5B6170] flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#0EA5B7]" /> 2-Hour Emergency SLA
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#16A34A]" /> ZATCA Phase 2 E-Invoice
              </span>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]/40 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed text-xs ${
                      m.sender === 'user'
                        ? 'bg-[#14161A] text-white rounded-br-none'
                        : 'bg-white border border-[#ECE8E1] text-[#14161A] shadow-xs rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-[#9AA0AB] mt-1 px-1">{m.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-2 bg-white border border-[#ECE8E1] rounded-xl w-16 text-[#9AA0AB]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5B7] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6C8CFF] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A5B] animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick response chips */}
            <div className="p-2.5 bg-white border-t border-[#ECE8E1] overflow-x-auto flex gap-1.5 no-scrollbar">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="shrink-0 text-[11px] px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#ECE8E1] text-[#5B6170] hover:text-[#14161A] hover:bg-[#F2EFE9] transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-[#ECE8E1] flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اكتب استفسارك هنا أو رقم المبنى..."
                className="flex-1 bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl px-3 py-2 text-xs text-[#14161A] placeholder-[#9AA0AB] outline-none focus:border-[#0EA5B7]"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-thermal-gradient text-white hover:opacity-90 transition-opacity"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
