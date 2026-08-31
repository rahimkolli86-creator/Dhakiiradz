import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Quote, Shield, Award } from 'lucide-react';
import { Martyr } from '../../types';

interface MartyrDetailModalProps {
  martyr: Martyr | null;
  onClose: () => void;
}

const MartyrDetailModal: React.FC<MartyrDetailModalProps> = ({ martyr, onClose }) => {
  if (!martyr) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto" dir="rtl">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#0b0b0b] border border-[#c6a66b]/30 rounded-3xl overflow-hidden shadow-2xl z-10 text-white my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c6a66b]/10 border border-[#c6a66b]/30 flex items-center justify-center text-[#c6a66b]">
                <Award size={20} />
              </div>
              <div>
                <span className="text-[10px] text-[#c6a66b] font-mono font-bold tracking-widest uppercase block">سجل الشهداء الخالدين</span>
                <h3 className="text-xl font-black text-white">{martyr.name}</h3>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">
            {/* Martyr Hero Profile */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
              <div className="relative w-32 h-44 rounded-2xl overflow-hidden border border-[#c6a66b]/30 shadow-lg flex-shrink-0">
                <img 
                  src={martyr.image} 
                  alt={martyr.name}
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div className="space-y-3 text-center sm:text-right flex-1">
                <div className="inline-block px-3 py-1 bg-brand-green/20 border border-brand-green/30 text-brand-green text-xs font-bold rounded-full">
                  {martyr.role}
                </div>
                <h2 className="text-2xl font-black text-white font-serif">{martyr.name}</h2>

                {/* Date & Location Badges */}
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start pt-2">
                  {martyr.birthDate && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                      <Calendar size={13} className="text-[#c6a66b]" />
                      <span>الميلاد: <strong className="text-gray-200">{martyr.birthDate}</strong></span>
                    </div>
                  )}
                  {martyr.deathDate && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                      <Shield size={13} className="text-red-400" />
                      <span>الاستشهاد: <strong className="text-gray-200">{martyr.deathDate}</strong></span>
                    </div>
                  )}
                  {martyr.deathPlace && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 w-full">
                      <MapPin size={13} className="text-[#c6a66b]" />
                      <span>مكان الاستشهاد: <strong className="text-gray-200">{martyr.deathPlace}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Historical Quote */}
            {martyr.quote && (
              <div className="relative p-6 bg-[#c6a66b]/[0.05] border-r-4 border-[#c6a66b] rounded-2xl italic">
                <Quote size={20} className="text-[#c6a66b]/40 mb-2 rotate-180" />
                <p className="text-base font-serif text-gray-200 leading-relaxed font-bold">
                  "{martyr.quote}"
                </p>
              </div>
            )}

            {/* Full Biography */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-[#c6a66b] uppercase tracking-wider font-mono">
                السيرة النضالية ومسار البطولة
              </h4>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-normal bg-white/[0.01] p-5 rounded-2xl border border-white/5">
                {martyr.biography || `${martyr.name}، بطل من أبطال جيش التحرير الوطني الذين كتبوا بدمائهم الطاهرة أروع ملاحم الفداء والتضحية دفاعاً عن حرية واستقلال الجزائر.`}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-white/10 bg-white/[0.01] flex justify-end">
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

export default MartyrDetailModal;
