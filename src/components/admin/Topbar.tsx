import React from 'react';
import { Shield, Cloud, CloudOff, RefreshCw, Layers } from 'lucide-react';
import { hasSupabaseCreds } from '/lib/supabase';

interface TopbarProps {
  activeTab: string;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ activeTab, onRefresh, isRefreshing }) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'stats':
        return 'نظرة عامة على الأرشيف وإحصائيات الثورة';
      case 'characters':
        return 'إدارة الشخصيات الرمزية والأبطال';
      case 'battles':
        return 'إدارة المعارك العسكرية والعمليات';
      case 'archives':
        return 'معرض المستندات والوثائق الأرشيفية';
      case 'wilayas':
        return 'إدارة وتعديل بيانات الولايات التاريخية الخمس';
      case 'contributions':
        return 'مراجعة وتوثيق مساهمات زوار المعرض';
      case 'admins':
        return 'المشرفون المصرح لهم وصلاحيات أدوار RBAC';
      case 'supabase':
        return 'تهيئة خادم Supabase وإعداد المزامنة';
      default:
        return 'لوحة التحكم والمراقبة والتوثيق';
    }
  };

  return (
    <header className="h-20 bg-[#0b0b0b] border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40" dir="rtl">
      {/* Title & Section Breadcrumbs */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-green/10 border border-brand-green/20 rounded-xl flex items-center justify-center text-brand-green">
          <Layers size={18} />
        </div>
        <div>
          <span className="text-[10px] text-gray-500 font-mono tracking-wider block font-bold">بوابة التحكم والتوثيق / المشرف</span>
          <h1 className="text-base font-black text-white">{getTabTitle(activeTab)}</h1>
        </div>
      </div>

      {/* Dynamic Connection/Status Area */}
      <div className="flex items-center gap-4">
        {/* Refresh Actions Trigger */}
        <button 
          onClick={onRefresh}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          title="تحديث البيانات يدويًا"
        >
          <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-[#c6a66b]' : ''} />
        </button>

        {/* Database Mode Details */}
        {hasSupabaseCreds ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-green/10 border border-brand-green/20 text-brand-green rounded-xl text-xs font-bold font-mono">
            <Cloud size={14} className="animate-pulse" />
            <span>متصل سحابياً (Supabase)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-xl text-xs font-bold font-mono">
            <CloudOff size={14} />
            <span>النموذج التجريبي النشط</span>
          </div>
        )}

        <div className="h-8 w-[1px] bg-white/5" />

        {/* Dynamic Display Indicators */}
        <div className="text-left font-mono text-[10px] text-gray-500 font-bold hidden md:block">
          <div>نظام حماية الأرشيف</div>
          <div>{new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
