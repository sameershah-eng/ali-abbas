import React from 'react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, CheckCircle2, AlertTriangle, PhoneCall, FileText, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-[#E5484D]" />;
      case 'booking':
        return <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />;
      case 'quote':
        return <FileText className="w-4 h-4 text-[#6C8CFF]" />;
      case 'enquiry':
        return <PhoneCall className="w-4 h-4 text-[#0EA5B7]" />;
      default:
        return <Bell className="w-4 h-4 text-[#5B6170]" />;
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto bg-white border border-[#ECEBF2] rounded-2xl p-4 shadow-xl shadow-black/[0.05] flex items-start gap-3 relative overflow-hidden"
          >
            {/* Theme accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C5CFC] to-[#A78BFA]" />
            <div className="mt-0.5 p-2 rounded-xl bg-[#F8F7FD] border border-[#ECEBF2]">
              {getIcon(toast.type)}
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-[#141416] tracking-tight">{toast.title}</h4>
                <span className="text-[10px] text-[#A1A5B7]">{toast.timestamp}</span>
              </div>
              <p className="text-xs text-[#7E8299] mt-0.5 leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#9AA0AB] hover:text-[#14161A] p-1 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
