import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, Calendar, FileText, Download, ShieldCheck } from 'lucide-react';
import { ArchivePhoto, HistoricalDocument } from '../../types';

interface ArchiveViewerModalProps {
  item: ArchivePhoto | HistoricalDocument | null;
  type: 'photo' | 'document';
  onClose: () => void;
}

const ArchiveViewerModal: React.FC<ArchiveViewerModalProps> = ({ item, type, onClose }) => {
  if (!item) return null;

  const title = (item as HistoricalDocument).title || (item as ArchivePhoto).caption || 'وثيقة أرشيفية';
  const imageUrl = (item as ArchivePhoto).url || 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80&w=1200&h=800&fit=crop';
  const description = (item as HistoricalDocument).description || (item as ArchivePhoto).caption || '';
  const date = item.date || 'فترة الثورة التحريرية (1954-1962)';
  const source = item.source || 'الأرشيف الوطني للمجاهدين - وزارة المجاهدين وذوي الحقوق';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto" dir="rtl">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-[#0b0b0b] border border-[#c6a66b]/30 rounded-3xl overflow-hidden shadow-2xl z-10 text-white my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c6a66b]/10 border border-[#c6a66b]/30 flex items-center justify-center text-[#c6a66b]">
                <FileText size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#c6a66b] font-mono font-bold tracking-widest uppercase">
                    {type === 'document' ? 'وثيقة ومخطوطة أرشيفية' : 'صورة نادرة موثقة'}
                  </span>
                  <span className="px-2 py-0.5 bg-brand-green/20 border border-brand-green/30 text-brand-green text-[9px] rounded-full flex items-center gap-1">
                    <ShieldCheck size={10} /> معتمدة
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">{title}</h3>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">
            {/* High Res Visual Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 max-h-[50vh] flex items-center justify-center group">
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full max-h-[48vh] object-contain transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 text-xs text-gray-300 pointer-events-none">
                <ZoomIn size={14} className="text-[#c6a66b]" />
                <span>معاينة عالية الدقة</span>
              </div>
            </div>

            {/* Document Metadata Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-3">
                <Calendar size={16} className="text-[#c6a66b] flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-500 block font-mono">تاريخ الأرشفة</span>
                  <span className="text-xs font-bold text-gray-200">{date}</span>
                </div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-3">
                <ShieldCheck size={16} className="text-brand-green flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-500 block font-mono">المصدر المعتمد</span>
                  <span className="text-xs font-bold text-gray-200">{source}</span>
                </div>
              </div>
            </div>

            {/* Description Text */}
            {description && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#c6a66b] uppercase font-mono tracking-wider">شرح الوثيقة والسياق التاريخي</h4>
                <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.01] p-5 rounded-2xl border border-white/5 font-normal">
                  {description}
                </p>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-5 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
            <span className="text-[11px] text-gray-500 font-mono">المرجع الأرشيفي: DZ-ARCH-{Date.now().toString().slice(-4)}</span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#c6a66b] hover:bg-[#b5955a] text-black font-black text-xs rounded-xl transition-all cursor-pointer shadow-lg"
            >
              إغلاق
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ArchiveViewerModal;
