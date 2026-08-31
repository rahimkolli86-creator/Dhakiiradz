import React from 'react';
import { Target, Flag, ShieldAlert } from 'lucide-react';

const RevolutionaryLegend = () => {
  return (
    <div className="mt-12 flex flex-wrap gap-8 items-center py-6 border-t border-white/5" dir="rtl">
      <div className="flex items-center gap-3 group">
        <div className="w-4 h-4 rounded bg-brand-green/20 border border-brand-green flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-brand-green rounded-full shadow-[0_0_8px_rgba(31,95,58,1)]" />
        </div>
        <div className="text-right">
          <span className="block text-xs font-bold text-white">المنطقة الثورية</span>
          <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Revolutionary Zone</span>
        </div>
      </div>

      <div className="flex items-center gap-3 group">
        <div className="w-10 h-0.5 bg-gradient-to-r from-brand-green/50 to-transparent" />
        <div className="text-right">
          <span className="block text-xs font-bold text-white">حدود العمليات</span>
          <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Operational Limits</span>
        </div>
      </div>

      <div className="flex items-center gap-3 group">
        <Target className="text-brand-green/40" size={16} />
        <div className="text-right">
          <span className="block text-xs font-bold text-white">مركز القيادة</span>
          <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Command Center</span>
        </div>
      </div>

      <div className="flex items-center gap-3 group opacity-50">
        <div className="w-4 h-4 rounded bg-white/5 border border-white/20" />
        <div className="text-right">
          <span className="block text-xs font-bold text-white">مناطق غير منظمة</span>
          <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Unorganized Areas</span>
        </div>
      </div>
    </div>
  );
};

export default RevolutionaryLegend;
