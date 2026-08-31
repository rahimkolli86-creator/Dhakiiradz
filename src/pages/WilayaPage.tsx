import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Shield, 
  Swords, 
  Users, 
  Award, 
  Calendar, 
  MapPin, 
  Quote, 
  FileText, 
  Image as ImageIcon, 
  Compass, 
  Radio,
  Share2,
  Bookmark,
  ChevronLeft,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  RotateCcw,
  Info
} from 'lucide-react';

import { Wilaya, Martyr, Battle, ArchivePhoto, HistoricalDocument } from '../types';
import { fetchWilayaDetails } from '/lib/wilayaService';
import MartyrDetailModal from '../components/wilaya/MartyrDetailModal';
import BattleDetailModal from '../components/wilaya/BattleDetailModal';
import ArchiveViewerModal from '../components/wilaya/ArchiveViewerModal';
import HistoricalAudioPlayer from '../components/wilaya/HistoricalAudioPlayer';
import WilayaMiniMap from '../components/wilaya/WilayaMiniMap';

const WilayaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [wilaya, setWilaya] = useState<Wilaya | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedMartyr, setSelectedMartyr] = useState<Martyr | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [selectedArchive, setSelectedArchive] = useState<{ item: ArchivePhoto | HistoricalDocument; type: 'photo' | 'document' } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load Wilaya Data from Supabase / Base
   const loadData = async () => {
  if (!id) return;

  setLoading(true);
  setErrorMessage(null);

  try {
    const data = await fetchWilayaDetails(id);

    if (!data) {
      throw new Error('لم يتم العثور على الولاية');
    }

    setWilaya(data);
  } catch (err: any) {
    console.error(err);
    setErrorMessage(
      err?.message || 'حدث خطأ أثناء جلب بيانات الولاية'
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Listen to admin updates in storage
    const handleStorageUpdate = () => {
      loadData();
    };
    window.addEventListener('storage_wilayas_updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage_wilayas_updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // 1. LOADING SKELETON STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-6" dir="rtl">
        {/* Navigation placeholder */}
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 border-b border-white/5 mb-8">
          <div className="w-32 h-6 bg-white/5 rounded-lg animate-pulse" />
          <div className="w-24 h-6 bg-white/5 rounded-lg animate-pulse" />
        </div>

        {/* Hero Skeleton */}
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="h-80 md:h-96 w-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col justify-end space-y-4 animate-pulse relative overflow-hidden">
            <div className="w-24 h-5 bg-[#c6a66b]/20 rounded-full" />
            <div className="w-64 md:w-96 h-12 bg-white/10 rounded-2xl" />
            <div className="w-full max-w-xl h-6 bg-white/5 rounded-xl" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 bg-white/5 rounded-xl" />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center py-8 gap-3 text-sm text-[#c6a66b] font-mono tracking-widest uppercase">
            <div className="w-5 h-5 rounded-full border-2 border-[#c6a66b]/30 border-t-[#c6a66b] animate-spin" />
            <span>جاري استحضار سجل الذاكرة والبطولات من قاعدة البيانات...</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. ERROR STATE
  if (errorMessage) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-6 text-center" dir="rtl">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black mb-3 font-serif">تعذر الاتصال بقاعدة البيانات</h2>
        <p className="text-gray-400 text-sm mb-6 max-w-md leading-relaxed">{errorMessage}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={loadData}
            className="px-6 py-3 bg-[#c6a66b] hover:bg-[#b5955a] text-black font-black text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw size={15} />
            <span>إعادة المحاولة</span>
          </button>
          <Link
            to="/"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl flex items-center gap-2 border border-white/10 transition-all"
          >
            <ArrowRight size={15} />
            <span>العودة إلى الخريطة الرئيسية</span>
          </Link>
        </div>
      </div>
    );
  }

  // 3. 404 NOT FOUND STATE
  if (!wilaya) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-6 text-center" dir="rtl">
        <Shield className="w-20 h-20 text-[#c6a66b] mb-4 opacity-40 animate-pulse" />
        <h2 className="text-2xl md:text-4xl font-black mb-3 font-serif text-white">لم يتم العثور على بيانات الولاية</h2>
        <p className="text-gray-400 text-sm mb-8 max-w-md leading-relaxed">
          الرمز أو المعرف المحدد (<span className="text-[#c6a66b] font-mono">{id}</span>) غير مسجل في السجل الوطني للولايات الـ 58.
        </p>
        <Link 
          to="/"
          className="px-6 py-3.5 bg-[#c6a66b] hover:bg-[#b5955a] text-black font-black text-xs rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(198,166,107,0.3)]"
        >
          <ArrowRight size={16} />
          <span>العودة إلى الخريطة التفاعلية</span>
        </Link>
      </div>
    );
  }

  const relatedWilayas = getRelatedWilayas(wilaya.id);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#c6a66b] selection:text-black font-sans relative pb-24" dir="rtl">
      
      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2.5 text-xs font-bold text-gray-300 hover:text-[#c6a66b] transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#c6a66b]/20 border border-white/10 group-hover:border-[#c6a66b]/40 flex items-center justify-center transition-all">
              <ArrowRight size={14} className="text-[#c6a66b] group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>العودة إلى الخريطة التفاعلية</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-mono rounded-full">
              الولاية رقم {wilaya.code}
            </span>
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              title="مشاركة رابط الصفحة"
            >
              <Share2 size={13} className="text-[#c6a66b]" />
              <span>{copiedLink ? 'تم نسخ الرابط!' : 'مشاركة'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[75vh] flex items-end pb-16 pt-24 px-4 md:px-8 overflow-hidden">
        {/* Background Hero Image with Deep Cinematic Gradients */}
        <div className="absolute inset-0 z-0">
          <img 
            src={wilaya.heroImage} 
            alt={wilaya.name}
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-50 transform scale-105 animate-pulse duration-[10000ms]"
            referrerPolicy="no-referrer"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_90%)]" />
          {/* Subtle Golden Glow Overlay */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#c6a66b]/10 blur-[120px] rounded-full pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 bg-[#c6a66b]/20 border border-[#c6a66b]/40 text-[#c6a66b] text-xs font-mono font-bold rounded-full tracking-wider flex items-center gap-1.5">
              <Shield size={13} />
              {wilaya.historicalZone || `الولاية رقم ${wilaya.code}`}
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-gray-300 text-xs font-mono rounded-full">
              {wilaya.latinName}
            </span>
          </div>

          {/* Wilaya Title */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white font-serif tracking-tight drop-shadow-2xl">
              ولاية {wilaya.name}
            </h1>
            <p className="text-lg md:text-2xl font-serif text-[#c6a66b] font-medium max-w-3xl leading-relaxed">
              {wilaya.subtitle || wilaya.description}
            </p>
          </div>

          {/* Famous Quote Banner */}
          {wilaya.quote && (
            <div className="relative max-w-3xl p-5 md:p-6 bg-gradient-to-r from-[#c6a66b]/15 via-[#c6a66b]/5 to-transparent border-r-4 border-[#c6a66b] rounded-2xl backdrop-blur-md">
              <Quote size={24} className="text-[#c6a66b]/40 mb-2 rotate-180" />
              <p className="text-base md:text-xl font-serif font-bold text-white leading-relaxed">
                "{wilaya.quote}"
              </p>
              <span className="text-[11px] font-mono text-[#c6a66b] mt-2 block tracking-wider uppercase">
                من أقوال وإرث أبطال {wilaya.name}
              </span>
            </div>
          )}

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 max-w-4xl">
            <div className="p-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl text-right">
              <span className="text-[10px] text-gray-400 font-mono block">عدد الشهداء الأبرار</span>
              <span className="text-2xl md:text-3xl font-black text-[#c6a66b] font-mono">
                +{wilaya.martyrsCount?.toLocaleString() || '30,000'}
              </span>
            </div>

            <div className="p-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl text-right">
              <span className="text-[10px] text-gray-400 font-mono block">المعارك والملاحم الكبرى</span>
              <span className="text-2xl md:text-3xl font-black text-white font-mono">
                {wilaya.battlesCount || wilaya.battles?.length || 0}
              </span>
            </div>

            <div className="p-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl text-right">
              <span className="text-[10px] text-gray-400 font-mono block">القادة والرموز التاريخية</span>
              <span className="text-2xl md:text-3xl font-black text-white font-mono">
                {wilaya.figuresCount || wilaya.figures?.length || 0}
              </span>
            </div>

            <div className="p-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl text-right">
              <span className="text-[10px] text-gray-400 font-mono block">الرمز البريدي والتاريخي</span>
              <span className="text-2xl md:text-3xl font-black text-brand-green font-mono">
                DZ-{wilaya.code}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-20 mt-8">

        {/* Section 1: Historical Overview & Liberation War Context */}
        <section className="p-8 md:p-12 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#c6a66b]/10 border border-[#c6a66b]/30 rounded-full text-[#c6a66b] text-xs font-mono font-bold">
              <Sparkles size={14} />
              <span>المكانة التاريخية والجهادية</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white font-serif">
              الدور النضالي لولاية {wilaya.name} في الثورة التحريرية
            </h2>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed font-normal">
              {wilaya.historicalOverview || wilaya.description}
            </p>

            {wilaya.liberationHistory && (
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <h3 className="text-sm font-bold text-[#c6a66b] font-mono uppercase mb-2">محطة أول نوفمبر واسترجاع السيادة</h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {wilaya.liberationHistory}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Martyrs of Freedom (سجل الخالدين) */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#c6a66b] uppercase tracking-widest block">أبطال الفداء والمقاومة</span>
              <h2 className="text-2xl md:text-4xl font-black text-white font-serif">سجل الشهداء الأبرار</h2>
            </div>
            {wilaya.martyrs && wilaya.martyrs.length > 0 && (
              <span className="text-xs text-gray-400 font-mono">
                توثيق {wilaya.martyrs.length} من رموز الولاية
              </span>
            )}
          </div>

          {wilaya.martyrs && wilaya.martyrs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wilaya.martyrs.map((martyr) => (
                <motion.div
                  key={martyr.id}
                  whileHover={{ y: -6 }}
                  className="bg-[#0b0b0b] border border-white/10 hover:border-[#c6a66b]/50 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all group"
                >
                  <div className="relative h-64 overflow-hidden bg-black/60">
                    <img 
                      src={martyr.image} 
                      alt={martyr.name}
                      className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-brand-green font-bold">
                      شهيد الواجب الوطني
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-white font-serif group-hover:text-[#c6a66b] transition-colors">
                        {martyr.name}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {martyr.role}
                      </p>
                    </div>

                    {martyr.deathDate && (
                      <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-2 border-t border-white/5">
                        <Calendar size={12} className="text-[#c6a66b]" />
                        <span>الاستشهاد: {martyr.deathDate}</span>
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedMartyr(martyr)}
                      className="w-full py-2.5 bg-white/5 hover:bg-[#c6a66b] text-gray-300 hover:text-black font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>عرض السيرة الكاملة</span>
                      <ChevronLeft size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl text-center text-gray-400 text-sm flex flex-col items-center justify-center gap-2">
              <Users size={24} className="text-gray-500" />
              <span>لا توجد سجلات شهداء مسجلة حالياً لهذه الولاية في قاعدة البيانات.</span>
            </div>
          )}
        </section>

        {/* Section 3: Epic Battles & Clashes (المعارك والملاحم) */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#c6a66b] uppercase tracking-widest block">المواجهات العسكرية الكبرى</span>
              <h2 className="text-2xl md:text-4xl font-black text-white font-serif">المعارك والملاحم الخالدة</h2>
            </div>
            {wilaya.battles && wilaya.battles.length > 0 && (
              <span className="text-xs text-gray-400 font-mono">
                {wilaya.battles.length} معارك موثقة
              </span>
            )}
          </div>

          {wilaya.battles && wilaya.battles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wilaya.battles.map((battle) => (
                <div 
                  key={battle.id}
                  className="p-6 md:p-8 bg-[#0b0b0b] border border-white/10 hover:border-red-500/40 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold rounded-full">
                        {battle.date || battle.year}
                      </span>
                      <Swords size={18} className="text-red-400 group-hover:rotate-12 transition-transform" />
                    </div>

                    <h3 className="text-xl font-black text-white font-serif group-hover:text-red-400 transition-colors">
                      {battle.title}
                    </h3>

                    {battle.location && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin size={13} className="text-[#c6a66b]" />
                        <span>{battle.location}</span>
                      </div>
                    )}

                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed line-clamp-3">
                      {battle.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedBattle(battle)}
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 text-xs font-bold text-gray-200 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>تفاصيل المعركة والتكتيك</span>
                    <ChevronLeft size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl text-center text-gray-400 text-sm flex flex-col items-center justify-center gap-2">
              <Swords size={24} className="text-gray-500" />
              <span>لا توجد معارك وملاحم مسجلة حالياً لهذه الولاية في قاعدة البيانات.</span>
            </div>
          )}
        </section>

        {/* Section 4: Historical Timeline (مسار المجد 1954 - 1962) */}
        {wilaya.timeline && wilaya.timeline.length > 0 && (
          <section className="space-y-8">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono font-bold text-[#c6a66b] uppercase tracking-widest block">المحطات المفصلية</span>
              <h2 className="text-2xl md:text-4xl font-black text-white font-serif">مسار المجد والكفاح</h2>
            </div>

            <div className="relative border-r-2 border-[#c6a66b]/30 pr-6 space-y-10 mr-4">
              {wilaya.timeline.map((event, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Node Icon */}
                  <div className="absolute -right-[33px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#c6a66b] group-hover:bg-[#c6a66b] transition-colors" />

                  <div className="p-6 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-2xl space-y-2 transition-all">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#c6a66b] bg-[#c6a66b]/10 px-2.5 py-0.5 rounded-md">
                        {event.year}
                      </span>
                      {event.date && (
                        <span className="text-xs text-gray-400 font-mono">{event.date}</span>
                      )}
                      <h3 className="text-lg font-black text-white">{event.title}</h3>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed font-normal">
                      {event.event || event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Audio Archive Player (إذاعة الجزائر المكافحة) */}
        {wilaya.audioArchives && wilaya.audioArchives.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono font-bold text-[#c6a66b] uppercase tracking-widest block">الأصوات والأهازيج الثورية</span>
              <h2 className="text-2xl md:text-4xl font-black text-white font-serif">الأرشيف الصوتي التاريخي</h2>
            </div>

            <div className="space-y-4">
              {wilaya.audioArchives.map((audio) => (
                <HistoricalAudioPlayer key={audio.id} audio={audio} />
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Archival Gallery & Rare Documents (المعرض الوثائقي) */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#c6a66b] uppercase tracking-widest block">الشواهد والمخطوطات</span>
              <h2 className="text-2xl md:text-4xl font-black text-white font-serif">المعرض الوثائقي والأرشيف النادر</h2>
            </div>
            {((wilaya.archives && wilaya.archives.length > 0) || (wilaya.historicalDocuments && wilaya.historicalDocuments.length > 0)) && (
              <span className="text-xs text-gray-400 font-mono">
                صور ومستندات معتمدة
              </span>
            )}
          </div>

          {((wilaya.archives && wilaya.archives.length > 0) || (wilaya.historicalDocuments && wilaya.historicalDocuments.length > 0)) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Photo Archives */}
              {wilaya.archives?.map((photo) => (
                <div 
                  key={photo.id}
                  onClick={() => setSelectedArchive({ item: photo, type: 'photo' })}
                  className="relative h-64 rounded-3xl overflow-hidden border border-white/10 hover:border-[#c6a66b]/50 shadow-xl cursor-pointer group bg-black/60"
                >
                  <img 
                    src={photo.url} 
                    alt={photo.caption}
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-95 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-4 right-4 left-4 space-y-1">
                    <span className="text-[10px] text-[#c6a66b] font-mono font-bold block">{photo.date || 'أرشيف الثورة'}</span>
                    <p className="text-xs text-white font-bold line-clamp-2">{photo.caption}</p>
                  </div>
                </div>
              ))}

              {/* Historical Documents */}
              {wilaya.historicalDocuments?.map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => setSelectedArchive({ item: doc, type: 'document' })}
                  className="p-6 bg-[#0b0b0b] border border-white/10 hover:border-[#c6a66b]/50 rounded-3xl space-y-4 shadow-xl cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#c6a66b]/10 border border-[#c6a66b]/20 flex items-center justify-center text-[#c6a66b] group-hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                    <span className="text-[10px] text-[#c6a66b] font-mono font-bold block uppercase">{doc.type}</span>
                    <h3 className="text-base font-black text-white line-clamp-2">{doc.title}</h3>
                    {doc.description && (
                      <p className="text-xs text-gray-400 line-clamp-2">{doc.description}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                    <span>{doc.date || '1954-1962'}</span>
                    <span className="text-[#c6a66b] flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                      <span>معاينة المخطوطة</span>
                      <ChevronLeft size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl text-center text-gray-400 text-sm flex flex-col items-center justify-center gap-2">
              <ImageIcon size={24} className="text-gray-500" />
              <span>لا توجد وثائق أو صور أرشيفية مسجلة حالياً لهذه الولاية في قاعدة البيانات.</span>
            </div>
          )}
        </section>

        {/* Section 7: Geographic & Strategic Canvas */}
        <section className="space-y-6">
          <WilayaMiniMap wilaya={wilaya} />
        </section>

        {/* Section 8: Related Wilayas Discovery */}
        <section className="p-8 bg-white/[0.02] border border-white/10 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white font-serif">استكشف ولايات تاريخية أخرى</h3>
            <Link to="/" className="text-xs text-[#c6a66b] hover:underline flex items-center gap-1 font-bold">
              <span>عرض الخريطة الكاملة</span>
              <ChevronLeft size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedWilayas.map((other) => (
              <Link
                key={other.id}
                to={`/wilaya/${other.id}`}
                className="p-4 bg-black/40 hover:bg-[#c6a66b]/10 border border-white/5 hover:border-[#c6a66b]/30 rounded-2xl flex items-center gap-4 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-[#c6a66b] group-hover:bg-[#c6a66b] group-hover:text-black transition-colors">
                  {other.code}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white group-hover:text-[#c6a66b] transition-colors">{other.name}</h4>
                  <span className="text-[10px] text-gray-400 font-mono">+{other.martyrsCount.toLocaleString()} شهيد</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* Modals */}
      <MartyrDetailModal 
        martyr={selectedMartyr} 
        onClose={() => setSelectedMartyr(null)} 
      />

      <BattleDetailModal 
        battle={selectedBattle} 
        onClose={() => setSelectedBattle(null)} 
      />

      <ArchiveViewerModal 
        item={selectedArchive?.item || null} 
        type={selectedArchive?.type || 'photo'} 
        onClose={() => setSelectedArchive(null)} 
      />
    </div>
  );
};

export default WilayaPage;