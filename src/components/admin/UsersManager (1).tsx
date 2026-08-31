import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, Shield, Eye, Mail, Lock, AlertTriangle, Key } from 'lucide-react';
import { motion } from 'motion/react';

interface Admin {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

interface UsersManagerProps {
  admins: Admin[];
  onAddAdmin: (admin: Omit<Admin, 'id' | 'created_at'>) => void;
  onDeleteAdmin: (id: string) => void;
  currentUserEmail: string | null;
}

const UsersManager: React.FC<UsersManagerProps> = ({ 
  admins, 
  onAddAdmin, 
  onDeleteAdmin,
  currentUserEmail 
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('يرجى كتابة البريد الإلكتروني للموظف المصرح له.');
      return;
    }

    const exists = admins.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setError('هذا البريد الإلكتروني مسجل بالفعل ويمتلك صلاحيات وصول.');
      return;
    }

    onAddAdmin({ email, role });
    setEmail('');
    setRole('editor');
  };

  const getRoleLabel = (roleStr: string) => {
    switch (roleStr) {
      case 'super_admin':
        return <span className="px-2.5 py-1 text-[10px] font-black rounded-full border border-red-500/30 bg-red-500/10 text-red-500">منظم خارق وسر الإمضاء</span>;
      case 'editor':
        return <span className="px-2.5 py-1 text-[10px] font-black rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">محرر أرشيفي وبيانات</span>;
      case 'reviewer':
        return <span className="px-2.5 py-1 text-[10px] font-black rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500">مراجع مساهمات زوار</span>;
      default:
        return <span className="px-2.5 py-1 text-[10px] font-black rounded-full border border-gray-500/30 bg-gray-500/10 text-gray-400">زائر</span>;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Informative Security Banner */}
      <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl flex items-start gap-3 text-right">
        <Lock className="shrink-0 text-red-500 mt-1" size={20} />
        <div>
          <h3 className="text-sm font-black text-red-400 mb-1">تنبيه أمان الأنظمة وإدارة الأدوار (Role-Based Access Control)</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-semibold">
            أي بريد يتم تسجيله في قائمة المصرح لهم بالأسفل يستطيع الولوج الكامل إلى الإدارة وتعديل أو حذف ذاكرة الجزائر التاريخية وفقاً لدوره المعين. يمنع إضافة أشخاص من خارج هيئة إدارة الأرشيف الوطني بوزارة المجاهدين.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* INVITE/ADD FORM */}
        <div className="lg:col-span-5 bg-[#0b0b0b] border border-white/5 p-6 rounded-2xl h-fit text-right">
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
            <ShieldCheck size={18} className="text-[#c6a66b]" />
            <h3 className="text-sm font-black text-white">إضافة حساب مشرف مرخص له</h3>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-bold">البريد الإلكتروني المهني المقيد</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input
                  type="email"
                  required
                  placeholder="staff@shaheed.dz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-2.5 px-3 pl-10 text-xs text-white outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-bold">الدور والصلاحيات الأمنية (RBAC)</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-2.5 px-3 text-xs text-white outline-none transition-all"
              >
                <option value="super_admin" className="bg-[#0b0b0b] text-white">المنظم الخارق (super_admin)</option>
                <option value="editor" className="bg-[#0b0b0b] text-white">معدل ومحرر الأرشيف (editor)</option>
                <option value="reviewer" className="bg-[#0b0b0b] text-white">مراجع مساهمات الشعب (reviewer)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#c6a66b] hover:bg-[#b09159] text-black font-black rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Plus size={14} />
              <span>إضافة وتأهيل المشرف</span>
            </button>
          </form>
        </div>

        {/* ADMINS DIRECTORY TABLE */}
        <div className="lg:col-span-7 bg-[#0b0b0b] border border-white/5 p-6 rounded-2xl text-right">
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
            <Shield size={18} className="text-[#c6a66b]" />
            <h3 className="text-sm font-black text-white">سجل العناوين المصرح لها حالياً</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-gray-400 font-bold">
                  <th className="p-3">البريد المسجل كأمين</th>
                  <th className="p-3">مستوى الصلاحيات</th>
                  <th className="p-3 pl-4 text-left">إلغاء الترخيص</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-white/[0.01] transition-all">
                    <td className="p-3 font-mono font-bold">{admin.email}</td>
                    <td className="p-3">{getRoleLabel(admin.role)}</td>
                    <td className="p-3 pl-4 text-left">
                      {admin.email.toLowerCase() === currentUserEmail?.toLowerCase() ? (
                        <span className="text-[10px] text-gray-500 italic">حسابك الحالي</span>
                      ) : (
                        <button
                          onClick={() => {
                            if (window.confirm(`هل أنت متأكد من سحب الترخيص ووقف صلاحيات المشرف: ${admin.email} من الوصول السري؟`)) {
                              onDeleteAdmin(admin.id);
                            }
                          }}
                          className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-all cursor-pointer inline-flex"
                          title="سحب الترخيص"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UsersManager;
