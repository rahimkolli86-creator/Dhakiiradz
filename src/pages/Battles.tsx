import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  Swords,
  Calendar,
  MapPin,
  ArrowLeft,
  X,
  Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase, hasSupabaseCreds } from '/lib/supabase';

interface Battle {
  id: string;
  title: string;
  year: string | number;
  region_id: string;
  description: string;
  image?: string;
  hero_image?: string;
  event_type?: string;
  created_at?: string;
  status?: string;
}

const Battles = () => {
  const navigate = useNavigate();

  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const loadBattles = async () => {
    try {
      setLoading(true);

      if (!hasSupabaseCreds) {
        console.error('Supabase credentials are missing');
        setBattles([]);
        return;
      }

      const { data, error } = await supabase
        .from('battles')
        .select('*')
        .order('year', { ascending: true });

      if (error) {
        console.error('Error loading battles:', error);
        return;
      }

      setBattles(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBattles();
  }, []);

  /* استخراج السنوات الموجودة فعليًا */
  const years = useMemo(() => {
    return [...new Set(battles.map((battle) => String(battle.year)))]
      .filter(Boolean)
      .sort((a, b) => Number(a) - Number(b));
  }, [battles]);

  /* استخراج المناطق المكتوبة في Supabase */
  const regions = useMemo(() => {
    return [...new Set(battles.map((battle) => battle.region_id))]
      .filter(Boolean)
      .sort();
  }, [battles]);

  /* استخراج أنواع الأحداث */
  const eventTypes = useMemo(() => {
    return [...new Set(battles.map((battle) => battle.event_type))]
      .filter(Boolean)
      .sort();
  }, [battles]);

  /* الفلترة */
  const filteredBattles = useMemo(() => {
    return battles.filter((battle) => {
      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !search ||
        battle.title?.toLowerCase().includes(search) ||
        battle.description?.toLowerCase().includes(search) ||
        battle.region_id?.toLowerCase().includes(search);

      const matchesYear =
        !selectedYear ||
        String(battle.year) === selectedYear;

      const matchesRegion =
        !selectedRegion ||
        battle.region_id === selectedRegion;

      const matchesType =
        !selectedType ||
        battle.event_type === selectedType;

      return (
        matchesSearch &&
        matchesYear &&
        matchesRegion &&
        matchesType
      );
    });
  }, [
    battles,
    searchTerm,
    selectedYear,
    selectedRegion,
    selectedType,
  ]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedYear('');
    setSelectedRegion('');
    setSelectedType('');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedYear ||
    selectedRegion ||
    selectedType;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#050505] text-white overflow-hidden"
    >
      {/* ================= HERO ================= */}

      <section className="relative min-h-[72vh] flex items-end overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">

          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1579912437765-e8e5b7d0f7f3?q=90&w=2000"
              alt="تاريخ الثورة الجزائرية"
              className="w-full h-full object-cover grayscale brightness-[0.28] contrast-125"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-black/30" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/40" />

          {/* Cinematic glow */}
          <div className="absolute bottom-0 right-[20%] w-[600px] h-[400px] bg-[#c6a66b]/10 blur-[180px] rounded-full" />
        </div>

        {/* Content */}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-20">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-[1px] bg-[#c6a66b]" />

              <span className="text-[#c6a66b] text-xs tracking-[0.35em] font-bold">
                ARCHIVE OF BATTLES
              </span>

            </div>

            <div className="flex items-center gap-5 mb-6">

              <div className="w-16 h-16 rounded-2xl border border-[#c6a66b]/30 bg-[#c6a66b]/10 flex items-center justify-center">

                <Swords
                  size={30}
                  className="text-[#c6a66b]"
                />

              </div>

              <div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">

                  المعارك

                </h1>

              </div>

            </div>

            <p className="text-gray-300 text-lg md:text-2xl leading-relaxed max-w-3xl">

              سجلٌ رقمي يوثق المعارك والاشتباكات والعمليات التي صنعت تاريخ الثورة الجزائرية.

            </p>

            <div className="flex items-center gap-6 mt-10 text-sm text-gray-400">

              <div>

                <span className="text-[#c6a66b] font-black text-xl">
                  {battles.length}
                </span>

                <span className="mr-2">
                  حدث موثق
                </span>

              </div>

              <div className="w-px h-5 bg-white/10" />

              <div>
                ذاكرة المقاومة الجزائرية
              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* ================= SEARCH & FILTER ================= */}

      <section className="relative z-20 -mt-10 px-5 lg:px-10">

        <div className="max-w-7xl mx-auto">

          <div className="bg-[#0b0b0b]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-5 lg:p-7 shadow-2xl">

            {/* Search */}

            <div className="relative mb-5">

              <Search
                size={20}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#c6a66b]"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="ابحث عن معركة، منطقة أو حدث تاريخي..."
                className="w-full bg-white/[0.04] border border-white/10 focus:border-[#c6a66b]/60 rounded-2xl py-5 pr-14 pl-5 text-sm lg:text-base text-white outline-none transition-all placeholder:text-gray-600"
              />

            </div>

            {/* Filters */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Year */}

              <div className="relative">

                <select
                  value={selectedYear}
                  onChange={(e) =>
                    setSelectedYear(e.target.value)
                  }
                  className="w-full appearance-none bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-[#c6a66b]/60 rounded-xl py-4 px-5 text-xs text-white outline-none cursor-pointer"
                >

                  <option
                    value=""
                    className="bg-[#111]"
                  >
                    جميع السنوات
                  </option>

                  {years.map((year) => (

                    <option
                      key={year}
                      value={year}
                      className="bg-[#111]"
                    >
                      {year}
                    </option>

                  ))}

                </select>

                <Calendar
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />

              </div>

              {/* Region */}

              <div className="relative">

                <select
                  value={selectedRegion}
                  onChange={(e) =>
                    setSelectedRegion(e.target.value)
                  }
                  className="w-full appearance-none bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-[#c6a66b]/60 rounded-xl py-4 px-5 text-xs text-white outline-none cursor-pointer"
                >

                  <option
                    value=""
                    className="bg-[#111]"
                  >
                    جميع المناطق
                  </option>

                  {regions.map((region) => (

                    <option
                      key={region}
                      value={region}
                      className="bg-[#111]"
                    >
                      {region}
                    </option>

                  ))}

                </select>

                <MapPin
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />

              </div>

              {/* Event type */}

              <div className="relative">

                <select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value)
                  }
                  className="w-full appearance-none bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-[#c6a66b]/60 rounded-xl py-4 px-5 text-xs text-white outline-none cursor-pointer"
                >

                  <option
                    value=""
                    className="bg-[#111]"
                  >
                    جميع أنواع الأحداث
                  </option>

                  {eventTypes.map((type) => (

                    <option
                      key={type}
                      value={type}
                      className="bg-[#111]"
                    >
                      {type}
                    </option>

                  ))}

                </select>

                <SlidersHorizontal
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />

              </div>

              {/* Reset */}

              <button
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 hover:border-[#c6a66b]/50 hover:bg-[#c6a66b]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-bold"
              >

                <X size={16} />

                مسح الفلاتر

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ================= BATTLES ================= */}

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-24">

        {/* Header */}

        <div className="flex items-end justify-between mb-12">

          <div>

            <p className="text-[#c6a66b] text-xs tracking-[0.3em] mb-3">
              HISTORICAL RECORDS
            </p>

            <h2 className="text-3xl lg:text-5xl font-black">
              السجل العسكري
            </h2>

          </div>

          <p className="text-gray-500 text-xs">

            {filteredBattles.length} نتيجة

          </p>

        </div>

        {/* Loading */}

        {loading && (

          <div className="min-h-[400px] flex flex-col items-center justify-center gap-5">

            <Loader2
              size={35}
              className="animate-spin text-[#c6a66b]"
            />

            <span className="text-gray-500 text-sm">
              جاري استرجاع السجل التاريخي...
            </span>

          </div>

        )}

        {/* Empty */}

        {!loading && filteredBattles.length === 0 && (

          <div className="border border-white/5 rounded-3xl py-24 text-center bg-white/[0.01]">

            <Swords
              size={40}
              className="mx-auto mb-5 text-gray-700"
            />

            <h3 className="text-xl font-bold text-gray-400">
              لا توجد نتائج
            </h3>

            <p className="text-sm text-gray-600 mt-3">
              حاول تغيير كلمات البحث أو خيارات الفلترة.
            </p>

          </div>

        )}

        {/* Grid */}

        {!loading && filteredBattles.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

            <AnimatePresence>

              {filteredBattles.map((battle, index) => (

                <motion.article
                  key={battle.id}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.05,
                  }}
                  onClick={() =>
  navigate(`/journey/${battle.id}`)
}
                  className="group relative h-[520px] rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-[#c6a66b]/40 transition-all duration-700"
                >

                  {/* Image */}

                  <img
                    src={
                      battle.image ||
                      battle.hero_image ||
                      'https://images.unsplash.com/photo-1579912437765-e8e5b7d0f7f3?q=90&w=1200'
                    }
                    alt={battle.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.28] group-hover:grayscale-0 group-hover:brightness-[0.6] group-hover:scale-110 transition-all duration-[1200ms]"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

                  {/* Gold line */}

                  <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#c6a66b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Content */}

                  <div className="absolute inset-0 p-8 flex flex-col justify-between">

                    {/* Top */}

                    <div className="flex justify-between items-start">

                      <div className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[#c6a66b] text-xs font-black">

                        {battle.year}

                      </div>

                      {battle.event_type && (

                        <div className="px-3 py-2 rounded-full bg-[#c6a66b]/10 border border-[#c6a66b]/20 text-[#d8bd86] text-[10px]">

                          {battle.event_type}

                        </div>

                      )}

                    </div>

                    {/* Bottom */}

                    <div>

                      {battle.region_id && (

                        <div className="flex items-center gap-2 text-[#c6a66b] text-xs mb-4">

                          <MapPin size={14} />

                          <span>
                            {battle.region_id}
                          </span>

                        </div>

                      )}

                      <h3 className="text-3xl font-black leading-tight mb-4 group-hover:text-[#d8bd86] transition-colors">

                        {battle.title}

                      </h3>

                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">

                        {battle.description}

                      </p>

                      <div className="flex items-center gap-3 mt-7 text-sm font-bold text-white group-hover:text-[#c6a66b] transition-colors">

                        <span>
                          استكشف تفاصيل الحدث
                        </span>

                        <ArrowLeft
                          size={18}
                          className="group-hover:-translate-x-2 transition-transform"
                        />

                      </div>

                    </div>

                  </div>

                </motion.article>

              ))}

            </AnimatePresence>

          </div>

        )}

      </section>

      {/* ================= FOOTER TEXT ================= */}

      <section className="border-t border-white/5 py-16 text-center">

        <p className="text-[#c6a66b] font-serif text-2xl mb-4">
          ذاكرة لا تموت.
        </p>

        <p className="text-gray-600 text-xs tracking-widest">
          DHAKIRA DZ — ARCHIVE OF ALGERIAN MEMORY
        </p>

      </section>

    </div>
  );
};

export default Battles;