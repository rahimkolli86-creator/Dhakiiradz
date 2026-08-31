import React from 'react';
import { motion } from 'motion/react';
import { FileText, Image, Music, Eye, Download, ShieldCheck, History } from 'lucide-react';

interface LibraryHeroProps {
  stats: {
    pdfs: number;
    images: number;
    audios: number;
    totalViews: number;
    totalDownloads: number;
  };
}

export const LibraryHero: React.FC<LibraryHeroProps> = ({ stats }) => {
  return (
    <div id="library-hero-section" className="relative w-full rounded-3xl overflow-hidden mb-12 border border-white/5 bg-[#080808]">
      {/* Cinematic Animated Background Grid with radial light & soft golden nebulas */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(198,166,107,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(21,115,71,0.05),transparent_40%)]" />
        {/* Animated Dust Particle Simulator overlay using CSS */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-20 text-center space-y-8" dir="rtl">
        {/* Glowing top emblem */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#c6a66b]/30 bg-[#c6a66b]/5 backdrop-blur-md text-[#c6a66b] text-[10px] font-black tracking-wide"
        >
          <History size={12} className="animate-pulse" />
          <span>الذاكرة الوطنية المسترجعة والسيادة الثقافية</span>
        </motion.div>

        {/* Dynamic Title and Description */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-normal"
          >
            المكتبة <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#c6a66b] via-[#e2cf9d] to-white">الرقمية الوطنية</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm text-gray-400 font-bold leading-relaxed max-w-2xl mx-auto"
          >
            المستودع الرقمي التفاعلي الشامل لتوثيق وأرشفة بيان أول نوفمبر ومحاضر مؤتمر الصومام والتسجيلات النادرة لإذاعة الجزائر الحرة المكافحة في الجبال الغابرة، مبرهنين زيف الاستعمار وناقلين العهد الثوري جيلاً بعد جيل.
          </motion.p>
        </div>

        {/* Dynamic Interactive Stats Dashboard Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto pt-6 text-right"
        >
          {/* Docs box */}
          <div className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-[#c6a66b]/20 transition-all flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#c6a66b]/10 text-[#c6a66b] border border-[#c6a66b]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FileText size={18} />
            </div>
            <div>
              <span className="block text-2xl font-serif font-black text-white">{stats.pdfs}</span>
              <span className="text-[10px] text-gray-500 font-bold">وثائق سريّة PDF</span>
            </div>
          </div>

          {/* Images box */}
          <div className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-[#217347]/20 transition-all flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-[#217347] border border-brand-green/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Image size={18} />
            </div>
            <div>
              <span className="block text-2xl font-serif font-black text-white">{stats.images}</span>
              <span className="text-[10px] text-gray-500 font-bold">صور فوتوغرافية</span>
            </div>
          </div>

          {/* Audio box */}
          <div className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-blue-400/20 transition-all flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Music size={18} />
            </div>
            <div>
              <span className="block text-2xl font-serif font-black text-white">{stats.audios}</span>
              <span className="text-[10px] text-gray-500 font-bold">تسجيلات صوتية نادرّة</span>
            </div>
          </div>

          {/* Views box */}
          <div className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 transition-all flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/10 flex items-center justify-center shrink-0">
              <Eye size={18} />
            </div>
            <div>
              <span className="block text-xxs font-serif font-black text-white">{(stats.totalViews / 1000).toFixed(1)}k+</span>
              <span className="text-[10px] text-gray-400 font-bold">إجمالي المشاهدات</span>
            </div>
          </div>

          {/* Downloads box */}
          <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 transition-all flex items-center justify-center md:justify-start gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/10 flex items-center justify-center shrink-0">
              <Download size={18} />
            </div>
            <div className="text-right">
              <span className="block text-xxs font-serif font-black text-white">{(stats.totalDownloads / 1000).toFixed(1)}k+</span>
              <span className="text-[10px] text-gray-400 font-bold">تنزيلات معتمدة</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Aesthetic bottom border highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c6a66b]/20 to-transparent" />
    </div>
  );
};

export default LibraryHero;