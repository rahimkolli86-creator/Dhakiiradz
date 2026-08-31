import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Swords, MapPin, Calendar, Users, Trophy } from 'lucide-react';
import { Battle } from '../../types';

interface BattleDetailModalProps {
  battle: Battle | null;
  onClose: () => void;
}

const BattleDetailModal: React.FC<BattleDetailModalProps> = ({ battle, onClose }) => {
  if (!battle) return null;

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
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <Swords size={20} />
              </div>
              <div>
                <span className="text-[10px] text-[#c6a66b] font-mono font-bold tracking-widest uppercase block">سجل المعارك والملاحم الخالدة</span>
                <h3 className="text-xl font-black text-white">{battle.title}</h3>
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
            {/* Battle Image Banner if exists */}
            {battle.image && (
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img 
                  src={battle.image} 
                  alt={battle.title}
                  className="w-full h-full object-cover grayscale brightness-75 contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                  <Calendar size={13} className="text-[#c6a66b]" />
                  <span className="text-xs font-mono font-bold text-[#c6a66b]">{battle.date || battle.year}</span>
                </div>
              </div>
            )}

            {/* Quick Meta Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {battle.location && (
                <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <MapPin size={18} className="text-[#c6a66b] flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 block">ميدان الاشتباك</span>
                    <span className="text-sm font-bold text-gray-200">{battle.location}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <Calendar size={18} className="text-[#c6a66b] flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-500 block">السنة التاريخية</span>
                  <span className="text-sm font-bold text-gray-200">{battle.year} م</span>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#c6a66b] uppercase font-mono tracking-wider">سياق المعركة وتفاصيل الاشتباك</h4>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed bg-white/[0.01] p-5 rounded-2xl border border-white/5 font-normal">
                {battle.description}
              </p>
            </div>

            {/* Forces Breakdown if available */}
            {battle.forces && (
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <Users size={14} className="text-[#c6a66b]" />
                  <span>القوات والتشكيلات المشاركة:</span>
                </div>
                <p className="text-xs text-gray-300 pr-6">{battle.forces}</p>
              </div>
            )}

            {/* Outcome if available */}
            {battle.outcome && (
              <div className="p-4 bg-brand-green/10 border border-brand-green/30 rounded-2xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-green">
                  <Trophy size={14} />
                  <span>نتائج ومخرجات المعركة:</span>
                </div>
                <p className="text-xs text-gray-200 pr-6">{battle.outcome}</p>
              </div>
            )}
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

export default BattleDetailModal;
