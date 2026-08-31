import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Shield, Key, Mail, AlertTriangle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { supabase, hasSupabaseCreds, localDb } from '/lib/supabase';
import CinematicOverlay from '../components/CinematicOverlay';
import Logo from '../components/Logo';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('يرجى ملء جميع الحقول المطلوبة.');
      setLoading(false);
      return;
    }

    try {
      if (hasSupabaseCreds && supabase) {
        // Real Supabase Connection
        const { data, error: authError } = await supabase.auth.signInWithPassword({
              email,
              password
      });
             console.log("AUTH DATA:", data);
             console.log("AUTH ERROR FULL:", authError);

           if (authError) {
           console.error("AUTH ERROR JSON:", JSON.stringify(authError, null, 2));
            throw authError;
        }

        // Verify if user is listed in admins table
        const { data: adminUser, error: dbError } = await supabase
          .from('admins')
          .select('role')
          .eq('id', data.user?.id)
          .single();

        if (dbError || !adminUser) {
          await supabase.auth.signOut();
          setError('ليس لديك صلاحية الوصول للمشرفين. يرجى مراجعة المسؤول.');
          setLoading(false);
          return;
        }

        // Store role and redirect
        localStorage.setItem('admin_role', adminUser.role);
        localStorage.setItem('admin_email', email);
        localStorage.setItem('admin_token', 'real_session');
        navigate('/admin');
      } else {
        // Classifed Local Sandbox Emulator
        const found = localDb.admins.getByEmail(email);
        if (!found) {
          setError('بريد إلكتروني غير مسجل في قائمة المشرفين المرخصين بالنموذج التجريبي.');
          setLoading(false);
          return;
        }

        // Simulate successful login
        localStorage.setItem('admin_role', found.role);
        localStorage.setItem('admin_email', found.email);
        localStorage.setItem('admin_token', `sandbox_${found.role}_${Date.now()}`);
        
        // Short timeout for realism
        setTimeout(() => {
          navigate('/admin');
        }, 1200);
      }
    } catch (err: any) {
      console.error('Error logging in:', err);
      setError(err.message || 'فشل الاتصال بالخادم. يرجى التحقق من صحة البيانات.');
    } finally {
      if (hasSupabaseCreds) setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e5e5e5] flex items-center justify-center p-6 select-none" dir="rtl">
      {/* Background Ambience */}
      <CinematicOverlay />

      <div className="relative z-10 w-full max-w-lg mt-8">
        
        {/* Header Branding */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo size="lg" variant="gold" className="mb-4" />
          <h1 className="text-3xl font-black text-white leading-tight">بوابة الإشراف والأرشيف</h1>
          <p className="text-[#c6a66b] text-xs font-bold font-mono tracking-widest mt-1">THE CLASSIFIED REVOLUTIONARY ARCHIVE SYSTEM</p>
        </div>

        {/* Informative Help Banner for Sandboxed environment */}
        {!hasSupabaseCreds && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex items-start gap-3 text-right text-xs leading-relaxed text-yellow-500"
          >
            <AlertTriangle className="shrink-0 text-yellow-500" size={18} />
            <div>
              <p className="font-bold mb-1">تنبيه: محاكي البيئة التجريبية نشط</p>
              <p className="opacity-90">
                لم يتم تكوين متغيرات Supabase في إعدادات المنصة بعد. لتجربة لوحة التحكم والأدوار بشكل كامل، استخدم أحد الحسابات المصرحة التالية (بأي كلمة مرور تختارها):
              </p>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px] bg-black/40 p-2 rounded border border-white/5 text-gray-400">
                <div>• المالك (صفة خارقة): <span className="text-[#c6a66b]">rahimelchikour@gmail.com</span></div>
                <div>• المشرف (معدل بيانات): <span className="text-[#c6a66b]">editor@shaheed.dz</span></div>
                <div>• المراجع (قبول المساهمات): <span className="text-[#c6a66b]">reviewer@shaheed.dz</span></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Login Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-[#0b0b0b]/90 border border-white/10 p-8 rounded-3xl backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4 justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Shield size={18} className="text-[#c6a66b]" />
              تسجيل الدخول للمصرحين
            </h2>
            <span className="text-[10px] uppercase font-mono bg-[#c6a66b]/10 text-[#c6a66b] px-2 py-0.5 rounded border border-[#c6a66b]/20 font-bold">
              AUTHORIZED ONLY
            </span>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-500 text-right">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 block text-right">البريد الإلكتروني المهني</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#c6a66b] rounded-2xl py-3.5 px-4 pl-12 text-sm text-right text-white transition-all outline-none"
                  placeholder="name@archive.dz"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 block text-right">كلمة المرور المشفرة</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#c6a66b] rounded-2xl py-3.5 px-4 pl-12 text-sm text-right text-white transition-all outline-none"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            {/* Note on Login Security */}
            <p className="text-[10px] text-gray-500 text-right leading-relaxed border-r border-white/10 pr-3">
              يتم رصد ومراقبة جميع مدخلات نظام تسجيل الدخول عبر سجلات أمان الحظر التلقائي. يمنع منعا باتا محاولة الدخول غير المرخص به للأفراد لعدم تفعيل العقوبات القانونية.
            </p>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full bg-[#c6a66b] hover:bg-[#b09159] disabled:bg-gray-700 disabled:cursor-not-allowed transition-all text-black font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-[0_10px_30px_rgba(198,166,107,0.2)]"
            >
              {loading ? (
                <span>جاري المصادقة والأمان...</span>
              ) : (
                <>
                  <span>ولوج الأرشيف السري</span>
                  <Key size={16} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Back to platform */}
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')} 
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors font-bold"
          >
            <span>العودة للمقصد العام للمتحف</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
