import React, { useState } from 'react';
import { Database, Copy, Check, Terminal, ExternalLink, HelpCircle } from 'lucide-react';
import { createClient } from "@supabase/supabase-js";

const SupabaseConsole = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DDL_SETUP_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Educational Box */}
      <div className="bg-[#0b0b0b] border border-white/5 p-6 rounded-2xl text-right space-y-3">
        <h3 className="text-base font-black text-white flex items-center gap-2">
          <Database size={16} className="text-[#c6a66b]" />
          تعليمات ربط وتهيئة خادم وبطاقات Supabase قاعدة البيانات
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed font-semibold">
          نظراً لأن البيئة الافتراضية تعمل على حاويات معزولة وآمنة، فقد قمنا ببناء محاكي ذكي لقاعدة البيانات يحفظ تصفحات المشرفين وتعديلاتهم في الذاكرة المحلية (LocalStorage). لربط لوحة التحكم هذه بمستودع قاعدة بيانات Supabase سحابي حقيقي وبشكل دائم ومحمي برقم سري، يرجى اتباع الخطوات البسيطة التالية:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 text-xs">
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
            <span className="font-bold text-[#c6a66b] block">الخطوة الأولى:</span>
            <p className="text-gray-500 font-bold leading-relaxed">
              أنشئ مشروعاً مجانياً جديداً في منصة <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-brand-green underline inline-flex items-center gap-0.5">Supabase<ExternalLink size={10} /></a>.
            </p>
          </div>
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
            <span className="font-bold text-[#c6a66b] block">الخطوة الثانية:</span>
            <p className="text-gray-500 font-bold leading-relaxed">
              افتح لوحة <b>SQL Editor</b> في حسابك على السحاب، ثم انسخ الاسكربت بالأسفل والصقه بالكامل واضغط على زر تشغيل (Run) لتخليق جميع الجداول وتدابير الحماية المذكورة في السياسات.
            </p>
          </div>
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
            <span className="font-bold text-[#c6a66b] block">الخطوة الثالثة:</span>
            <p className="text-gray-500 font-bold leading-relaxed">
              انتقل لعلامة التبويب <b>Settings</b> في لوحة تحكم AI Studio ثم أضف المتغيرات السرية: <code>VITE_SUPABASE_URL</code> و <code>VITE_SUPABASE_ANON_KEY</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Code DDL terminal block */}
      <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl overflow-hidden text-right">
        {/* Top title and copy button */}
        <div className="bg-white/[0.02] border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-gray-500" />
            <span className="text-xs font-mono font-bold text-gray-400">Database Schema / RLS Policies Script</span>
          </div>
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={12} className="text-brand-green" />
                <span className="text-brand-green">تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>نسخ الاسكربت SQL</span>
              </>
            )}
          </button>
        </div>

        {/* Console Box editor */}
        <div className="p-5 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-[450px] bg-black/40 leading-relaxed font-bold border-t border-white/5" dir="ltr">
          <pre className="whitespace-pre">{DDL_SETUP_SCRIPT}</pre>
        </div>
      </div>
    </div>
  );
};

export default SupabaseConsole;
