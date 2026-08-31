import React from 'react';
import { ShieldCheck } from 'lucide-react';

const ContributionNotice = () => {
  return (
    <div className="relative group max-w-2xl mx-auto" dir="rtl">
      <div className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
      <div className="relative p-8 flex items-start gap-5">
        <div className="w-12 h-12 rounded-xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center shrink-0">
          <ShieldCheck className="text-brand-green" size={24} />
        </div>
        <div className="text-right">
          <h4 className="text-lg font-bold text-white mb-2">ملاحظة أمنية وتاريخية</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            جميع المساهمات تخضع للمراجعة والتحقق من قبل مختصين في التاريخ والأرشيف قبل إضافتها إلى المنصة. نحن نلتزم بأعلى معايير المصداقية التاريخية وحماية الخصوصية الشخصية.
          </p>
        </div>
      </div>
      
      {/* Archive Stamp Effect */}
      <div className="absolute -bottom-6 -left-6 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
        <div className="w-24 h-24 border-4 border-brand-green rounded-full flex items-center justify-center rotate-[-25deg]">
          <span className="text-[10px] font-black text-brand-green text-center uppercase tracking-tighter">أرشيف معتمد<br/>VERIFIED</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionNotice;
