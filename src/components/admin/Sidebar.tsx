import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Swords, 
  Bookmark, 
  Map, 
  FileCheck, 
  ShieldCheck, 
  LogOut, 
  Sliders, 
  Database,
  Globe
} from 'lucide-react';
import Logo from '../Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: string | null;
  email: string | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  role, 
  email,
  onLogout 
}) => {
  const getRoleBadge = (roleStr: string | null) => {
    switch (roleStr) {
      case 'super_admin':
        return { text: 'صفة خارقة / مالك', color: 'border-red-500/30 bg-red-500/10 text-red-500' };
      case 'editor':
        return { text: 'مشرف / محرر بيانات', color: 'border-blue-500/30 bg-blue-500/10 text-blue-500' };
      case 'reviewer':
        return { text: 'مصحح ومراجع مساهمات', color: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500' };
      default:
        return { text: 'زائر مصرح', color: 'border-gray-500/30 bg-gray-500/10 text-gray-400' };
    }
  };

  const badge = getRoleBadge(role);

  // Group paths and tabs
  const items = [
    { id: 'stats', label: 'الإحصائيات والملخص', icon: Sliders, roles: ['super_admin', 'editor', 'reviewer'] },
    { id: 'characters', label: 'إدارة الشخصيات الرمزية', icon: Users, roles: ['super_admin', 'editor'] },
    { id: 'battles', label: 'إدارة المعارك العسكرية', icon: Swords, roles: ['super_admin', 'editor'] },
    { id: 'archives', label: 'معرض المكتبة الرقمية', icon: Bookmark, roles: ['super_admin', 'editor'] },
    { id: 'wilayas', label: 'إدارة الولايات التاريخية', icon: Map, roles: ['super_admin', 'editor'] },
    { id: 'contributions', label: 'مراجعة مساهمات الزوار', icon: FileCheck, roles: ['super_admin', 'reviewer'] },
    { id: 'admins', label: 'إدارة أذونات المشرفين', icon: ShieldCheck, roles: ['super_admin'] },
    { id: 'supabase', label: 'تهيئة الخادم وقواعد البيانات', icon: Database, roles: ['super_admin'] }
  ];

  return (
    <aside className="w-80 bg-[#0b0b0b] border-l border-white/5 flex flex-col justify-between h-screen sticky top-0" dir="rtl">
      <div>
        {/* Top Header Branding */}
        <div className="p-6 border-b border-white/5 flex flex-col items-center">
          <Logo size="sm" variant="gold" className="mb-2" />
          <h2 className="text-lg font-black text-white">منصة الإدارة والأمان</h2>
          <span className="text-[9px] text-[#c6a66b] font-mono tracking-widest uppercase mt-1">THE CLASSIFIED OFFICE</span>
        </div>

        {/* Logged Admin Metadata */}
        <div className="p-5 border-b border-white/5 bg-white/[0.01]">
          <div className="text-right">
            <p className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap" title={email || ''}>
              {email}
            </p>
            <div className="mt-2.5">
              <span className={`inline-block text-[10px] px-2.5 py-1 rounded-full border font-bold ${badge.color}`}>
                {badge.text}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 scrollbar-thin overflow-y-auto max-h-[50vh]">
          {items.map((item) => {
            if (role && !item.roles.includes(role)) return null;
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-right flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all relative ${
                  isActive 
                    ? 'text-white bg-brand-green/20 border border-brand-green/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow" 
                    className="absolute right-0 top-1/4 h-1/2 w-[3px] bg-brand-green rounded-l" 
                  />
                )}
                <Icon size={18} className={isActive ? 'text-brand-green' : 'text-gray-500'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout & Footer */}
      <div className="p-6 border-t border-white/5 space-y-4">
        <button
          onClick={() => window.open('/', '_blank')}
          className="w-full text-right flex items-center justify-between text-xs text-gray-400 hover:text-white hover:underline transition-all"
        >
          <span className="flex items-center gap-2">
            <Globe size={14} className="text-[#c6a66b]" />
            معاينة الموقع والواجهة الأرشيفية
          </span>
        </button>

        <button
          onClick={onLogout}
          className="w-full text-right flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 transition-all cursor-pointer"
        >
          <LogOut size={18} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
