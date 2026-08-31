import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpLeft,
  Calendar,
  ChevronLeft,
  ExternalLink,
  FileText,
  MapPin,
  RotateCcw,
  Shield,
  Swords,
  Trophy,
  Users,
  AlertTriangle,
} from 'lucide-react';

import { supabase } from '/lib/supabase';
import { ALL_58_WILAYAS_METADATA } from '/src/data/wilayas';

interface Battle {
  id: string;
  title: string;
  year: number | string | null;
  region_id: string | number | null;
  description: string | null;
  status: string | null;
  created_at: string | null;
  image: string | null;
  hero_image: string | null;
  event_type: string | null;
  sources: unknown;
  details: unknown;
  related_battles: unknown;
}

const getRegionDisplayName = (regionId: string | number | null): string => {
  if (regionId === null || regionId === undefined || regionId === '') {
    return 'غير محددة';
  }

  const raw = String(regionId).trim();

  if (ALL_58_WILAYAS_METADATA[raw]) {
    return `${ALL_58_WILAYAS_METADATA[raw].name} (${raw})`;
  }

  const num = parseInt(raw.replace(/[^0-9]/g, ''), 10);

  if (!Number.isNaN(num) && num >= 1 && num <= 58) {
    const code = num < 10 ? `DZ-0${num}` : `DZ-${num}`;

    if (ALL_58_WILAYAS_METADATA[code]) {
      return `${ALL_58_WILAYAS_METADATA[code].name} (${code})`;
    }
  }

  return raw;
};

const normalizeObject = (value: unknown): Record<string, unknown> | null => {
  if (!value) return null;

  if (typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return null;
    }
  }

  return null;
};

const normalizeList = (value: unknown): unknown[] => {
  if (Array.isArray(value)) return value;

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};

const formatValue = (value: unknown): string | null => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return null;
};

const JourneyDetail: React.FC = () => {
  // The route remains /journey/:slug, but the value is the battle UUID.
  const { slug } = useParams<{ slug: string }>();

  const [battle, setBattle] = useState<Battle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBattle = async () => {
    if (!slug) {
      setError('معرّف المعركة غير موجود في الرابط.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!supabase) {
        throw new Error('لم يتم تكوين الاتصال بقاعدة بيانات Supabase.');
      }

      const { data, error: queryError } = await supabase
        .from('battles')
        .select('*')
        .eq('id', slug)
       // .eq('status', 'approved')
        .maybeSingle();

      if (queryError) throw queryError;

      if (!data) {
        throw new Error('لم يتم العثور على هذه المعركة في الأرشيف المعتمد.');
      }

      setBattle(data as Battle);
    } catch (err: any) {
      console.error('Error fetching battle:', err);
      setError(err?.message || 'تعذر تحميل تفاصيل المعركة.');
      setBattle(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBattle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const regionName = useMemo(
    () => getRegionDisplayName(battle?.region_id ?? null),
    [battle?.region_id]
  );

  const details = useMemo(
    () => normalizeObject(battle?.details),
    [battle?.details]
  );

  const sourceItems = useMemo(
    () => normalizeList(battle?.sources),
    [battle?.sources]
  );

  const relatedItems = useMemo(
    () => normalizeList(battle?.related_battles),
    [battle?.related_battles]
  );

  const heroImage = battle?.hero_image || battle?.image || null;

  if (loading) {
    return (
      <div
        className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6"
        dir="rtl"
      >
        <div className="relative w-full max-w-md text-center">
          <div className="absolute -inset-20 bg-[#c6a66b]/10 blur-[100px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <div className="mx-auto w-20 h-20 rounded-3xl border border-[#c6a66b]/25 bg-white/[0.03] flex items-center justify-center">
              <Swords className="w-9 h-9 text-[#c6a66b] animate-pulse" />
            </div>

            <h1 className="mt-7 text-2xl font-black font-serif">
              جاري فتح سجل المعركة...
            </h1>

            <p className="mt-2 text-xs text-gray-500">
              جلب التفاصيل من الأرشيف الوطني
            </p>

            <div className="mt-7 h-1 w-52 mx-auto rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full w-1/2 bg-[#c6a66b]"
                animate={{ x: ['120%', '-220%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error || !battle) {
    return (
      <div
        className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-5"
        dir="rtl"
      >
        <div className="w-full max-w-lg rounded-3xl border border-red-500/20 bg-white/[0.02] p-8 text-center shadow-2xl">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          <h1 className="mt-6 text-xl md:text-2xl font-black font-serif">
            تعذر فتح المعركة
          </h1>

          <p className="mt-3 text-sm text-gray-400 leading-7">
            {error || 'المعركة غير موجودة.'}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={fetchBattle}
              className="px-5 py-3 rounded-xl bg-[#c6a66b] text-black font-black text-xs flex items-center justify-center gap-2 hover:bg-[#b5955a] transition-all"
            >
              <RotateCcw size={14} />
              إعادة المحاولة
            </button>

            <Link
              to="/battles"
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              <ArrowRight size={14} />
              العودة إلى المعارك
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#050505] text-white overflow-x-hidden pb-24"
      dir="rtl"
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-[#c6a66b]/[0.06] blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] bg-[#1f5f3a]/[0.08] blur-[130px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <Link
            to="/battles"
            className="flex items-center gap-2.5 text-xs font-bold text-gray-300 hover:text-[#c6a66b] transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <ArrowRight size={14} className="text-[#c6a66b]" />
            </span>
            العودة إلى سجل المعارك
          </Link>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
            <Shield size={12} className="text-[#c6a66b]" />
            <span className="text-[10px] text-gray-400">
              الأرشيف العسكري الوطني
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative min-h-[58vh] md:min-h-[64vh] flex items-end overflow-hidden">
          {heroImage ? (
            <motion.img
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              src={heroImage}
              alt={battle.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.34] contrast-125"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#101010] to-[#050505]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#050505]/80 via-transparent to-[#050505]/30" />

          <div className="relative w-full max-w-6xl mx-auto px-5 md:px-8 pb-12 md:pb-16 pt-28">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="px-3 py-1.5 rounded-full bg-[#c6a66b]/15 border border-[#c6a66b]/30 text-[#c6a66b] text-[10px] font-black flex items-center gap-1.5">
                  <Swords size={12} />
                  سجل المعارك
                </span>

                {battle.year && (
                  <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-gray-200 text-[10px] font-mono">
                    {battle.year} م
                  </span>
                )}

                <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-gray-300 text-[10px] flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#1f7a4a]" />
                  {regionName}
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black font-serif leading-[1.08] tracking-tight"
              >
                {battle.title}
              </motion.h1>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-px w-12 bg-[#c6a66b]" />
                <span className="text-[9px] tracking-[0.35em] text-gray-500 uppercase">
                  Historical Battle Record
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="max-w-5xl mx-auto px-5 md:px-8 -mt-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main article */}
            <article className="lg:col-span-2 space-y-5">
              <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 md:p-8 shadow-2xl">
                <div className="flex items-center gap-2 text-[#c6a66b]">
                  <FileText size={16} />
                  <span className="text-xs font-black">السياق التاريخي</span>
                </div>

                <div className="mt-5 text-sm md:text-base text-gray-300 leading-8 whitespace-pre-line">
                  {battle.description || 'لا يوجد وصف موثق لهذه المعركة حالياً.'}
                </div>
              </div>

              {/* Structured details */}
              {details && Object.keys(details).length > 0 && (
                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 md:p-8 shadow-xl">
                  <div className="flex items-center gap-2 text-[#c6a66b] mb-6">
                    <Swords size={16} />
                    <span className="text-xs font-black">
                      تفاصيل السجل
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(details).map(([key, value]) => {
                      const text = formatValue(value);
                      if (!text) return null;

                      return (
                        <div
                          key={key}
                          className="rounded-2xl bg-white/[0.02] border border-white/5 p-4"
                        >
                          <div className="text-[10px] text-gray-500 mb-1">
                            {key}
                          </div>
                          <div className="text-sm text-gray-200 leading-6 whitespace-pre-line">
                            {text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sources */}
              {sourceItems.length > 0 && (
                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 md:p-8 shadow-xl">
                  <div className="flex items-center gap-2 text-[#c6a66b] mb-5">
                    <FileText size={16} />
                    <span className="text-xs font-black">
                      المصادر والتوثيق
                    </span>
                  </div>

                  <div className="space-y-3">
                    {sourceItems.map((source, index) => {
                      if (typeof source === 'string') {
                        return (
                          <div
                            key={index}
                            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-sm text-gray-300"
                          >
                            {source}
                          </div>
                        );
                      }

                      if (source && typeof source === 'object') {
                        const item = source as Record<string, unknown>;
                        const title =
                          formatValue(item.title) ||
                          formatValue(item.name) ||
                          `مصدر ${index + 1}`;
                        const url =
                          formatValue(item.url) ||
                          formatValue(item.link);

                        return (
                          <div
                            key={index}
                            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4"
                          >
                            <span className="text-sm text-gray-300">
                              {title}
                            </span>

                            {url && /^https?:\/\//i.test(url) && (
                              <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="shrink-0 text-[#c6a66b] hover:text-white transition-colors"
                                aria-label="فتح المصدر"
                              >
                                <ExternalLink size={15} />
                              </a>
                            )}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              )}

              {/* Related battles */}
              {relatedItems.length > 0 && (
                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 md:p-8 shadow-xl">
                  <div className="flex items-center gap-2 text-[#c6a66b] mb-5">
                    <Swords size={16} />
                    <span className="text-xs font-black">
                      أحداث ومعارك مرتبطة
                    </span>
                  </div>

                  <div className="space-y-2">
                    {relatedItems.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-gray-300"
                      >
                        {typeof item === 'string'
                          ? item
                          : JSON.stringify(item)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-5 shadow-xl">
                <div className="text-[10px] text-gray-500 mb-4 font-bold">
                  بطاقة المعركة
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.02] border border-white/5 p-4">
                    <Calendar size={17} className="text-[#c6a66b]" />
                    <div>
                      <div className="text-[10px] text-gray-500">السنة</div>
                      <div className="text-sm font-bold text-white">
                        {battle.year ? `${battle.year} م` : 'غير محددة'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.02] border border-white/5 p-4">
                    <MapPin size={17} className="text-[#1f7a4a]" />
                    <div>
                      <div className="text-[10px] text-gray-500">المنطقة</div>
                      <div className="text-sm font-bold text-white">
                        {regionName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.02] border border-white/5 p-4">
                    <Shield size={17} className="text-[#c6a66b]" />
                    <div>
                      <div className="text-[10px] text-gray-500">الحالة</div>
                      <div className="text-sm font-bold text-brand-green">
                        موثقة ومعتمدة
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {battle.created_at && (
                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-5">
                  <div className="text-[10px] text-gray-500">
                    تاريخ إدراج السجل
                  </div>
                  <div className="mt-2 text-xs text-gray-300 font-mono">
                    {new Date(battle.created_at).toLocaleDateString('ar-DZ')}
                  </div>
                </div>
              )}

              <Link
                to="/battles"
                className="group w-full rounded-2xl bg-[#c6a66b] text-black px-5 py-4 flex items-center justify-center gap-2 text-xs font-black hover:bg-[#b5955a] transition-all shadow-lg"
              >
                <ArrowRight size={15} />
                العودة إلى جميع المعارك
                <ChevronLeft
                  size={15}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </Link>

              <Link
                to="/"
                className="w-full rounded-2xl bg-white/5 border border-white/10 text-gray-300 px-5 py-4 flex items-center justify-center gap-2 text-xs font-bold hover:bg-white/10 hover:text-white transition-all"
              >
                <ArrowUpLeft size={15} />
                الرئيسية
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default JourneyDetail;
