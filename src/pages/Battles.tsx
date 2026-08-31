import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Swords,
  Shield,
  Calendar,
  MapPin,
  Search,
  ArrowRight,
  RotateCcw,
  ChevronLeft,
  ChevronDown,
  Layers,
  X,
  AlertTriangle,
} from 'lucide-react';

import { supabase } from '/lib/supabase';
import { ALL_58_WILAYAS_METADATA } from '/src/data/wilayas';

// ============================================================
//  الأنواع (Types)
// ============================================================
interface Battle {
  id: string;
  title: string;
  year: number | null;          // تم التوحيد إلى number | null
  region_id: string | null;
  description: string | null;
  status: string | null;
  created_at: string | null;
  image: string | null;
  hero_image: string | null;
  event_type: string | null;
  sources: Record<string, unknown> | null;  // تحديد النوع بدلاً من unknown
  details: Record<string, unknown> | null;
  related_battles: string[] | null;
}

interface FilterState {
  search: string;
  year: string;
  region: string;
}

// ============================================================
//  الدوال المساعدة (Pure Helpers)
// ============================================================
const getRegionDisplayName = (regionId: string | number | null): string => {
  if (!regionId) return 'غير محددة';

  const raw = String(regionId).trim();
  
  // بحث مباشر في الخريطة
  if (ALL_58_WILAYAS_METADATA[raw]) {
    return ALL_58_WILAYAS_METADATA[raw].name;
  }

  // محاولة استخراج الرقم من النص (مثل "DZ-16" أو "16")
  const numericMatch = raw.match(/\d+/);
  if (numericMatch) {
    const num = parseInt(numericMatch[0], 10);
    if (num >= 1 && num <= 58) {
      const code = num < 10 ? `DZ-0${num}` : `DZ-${num}`;
      if (ALL_58_WILAYAS_METADATA[code]) {
        return ALL_58_WILAYAS_METADATA[code].name;
      }
    }
  }

  return raw;
};

// ============================================================
//  المكوّن الرئيسي
// ============================================================
const Battles: React.FC = () => {
  // --- الحالة (State) ---
  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    year: 'all',
    region: 'all',
  });

  const [visibleCount, setVisibleCount] = useState(9);
  const ITEMS_PER_PAGE = 9;

  // --- جلب البيانات (Data Fetching) ---
  const fetchBattles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!supabase) {
        throw new Error('لم يتم تكوين الاتصال بقاعدة بيانات Supabase.');
      }

      const { data, error: queryError } = await supabase
        .from('battles')
        .select('*') // تحديد الحقول المطلوبة بدلاً من سردها كلها
        .order('year', { ascending: true, nullsFirst: false });

      if (queryError) throw queryError;

      console.log('📜 Battles loaded:', data?.length || 0);
      setBattles((data || []) as Battle[]);
    } catch (err) {
      console.error('❌ Error fetching battles:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ غير معروف');
      setBattles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBattles();
  }, [fetchBattles]);

  // --- البيانات المشتقة (Derived Data) ---
  const availableYears = useMemo(() => {
    const years = battles
      .map(b => b.year)
      .filter((year): year is number => year !== null && year !== undefined)
      .sort((a, b) => a - b);

    return [...new Set(years)].map(String);
  }, [battles]);

  const availableRegions = useMemo(() => {
    const regions = battles
      .map(b => getRegionDisplayName(b.region_id))
      .filter((name): name is string => name !== 'غير محددة');

    return [...new Set(regions)].sort((a, b) => a.localeCompare(b, 'ar'));
  }, [battles]);

  // --- التصفية (Filtering Logic) ---
  const filteredBattles = useMemo(() => {
    const { search, year, region } = filters;
    const searchLower = search.trim().toLowerCase();

    return battles.filter(battle => {
      // تصفية حسب السنة
      if (year !== 'all' && String(battle.year) !== year) {
        return false;
      }

      // تصفية حسب المنطقة
      const regionName = getRegionDisplayName(battle.region_id);
      if (region !== 'all' && regionName !== region) {
        return false;
      }

      // تصفية حسب البحث النصي
      if (searchLower) {
        return (
          battle.title?.toLowerCase().includes(searchLower) ||
          battle.description?.toLowerCase().includes(searchLower) ||
          String(battle.year || '').includes(searchLower) ||
          regionName.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [battles, filters]);

  // --- التحكم في الترحيل (Pagination) ---
  const displayedBattles = useMemo(
    () => filteredBattles.slice(0, visibleCount),
    [filteredBattles, visibleCount]
  );

  const hasMore = visibleCount < filteredBattles.length;

  // --- معالجة تغيير الفلاتر (Filter Handlers) ---
  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      setFilters(prev => ({ ...prev, [key]: value }));
      setVisibleCount(ITEMS_PER_PAGE);
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({ search: '', year: 'all', region: 'all' });
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  const hasActiveFilters = filters.search.trim() !== '' ||
                          filters.year !== 'all' ||
                          filters.region !== 'all';

  // --- زيادة عدد العناصر المعروضة ---
  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredBattles.length));
  }, [filteredBattles.length]);

  // ============================================================
  //  حالات التحميل والخطأ (Loading & Error States)
  // ============================================================
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchBattles} />;
  }

  // ============================================================
  //  العرض الأساسي (Main Render)
  // ============================================================
  return (
    <div dir="rtl" className="min-h-screen bg-[#050505] text-white font-sans pb-24 overflow-x-hidden">
      {/* خلفية متحركة */}
      <BackgroundGlow />

      {/* الهيدر */}
      <Header />

      {/* القسم الرئيسي */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* الهيرو (Hero) */}
        <HeroSection totalBattles={battles.length} totalYears={availableYears.length} />

        {/* الفلاتر (Filters) */}
        <FiltersSection
          filters={filters}
          availableYears={availableYears}
          availableRegions={availableRegions}
          totalMatches={filteredBattles.length}
          hasActiveFilters={hasActiveFilters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* قائمة المعارك (Battles Grid) */}
        <BattlesGrid
          battles={displayedBattles}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </div>
    </div>
  );
};

// ============================================================
//  المكوّنات الفرعية (Sub-Components)
// ============================================================

// --- حالة التحميل ---
const LoadingState: React.FC = () => (
  <div dir="rtl" className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-20 h-20 mx-auto rounded-3xl border border-[#c6a66b]/20 bg-white/[0.03] flex items-center justify-center">
        <Swords size={34} className="text-[#c6a66b] animate-pulse" />
      </div>
      <h1 className="mt-6 text-2xl font-black font-serif">جاري فتح سجل المعارك...</h1>
      <p className="mt-2 text-xs text-gray-500">جلب المعارك من الأرشيف الوطني</p>
      <div className="mt-6 w-48 h-1 mx-auto rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full w-1/2 bg-[#c6a66b]"
          animate={{ x: ['120%', '-220%'] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        />
      </div>
    </div>
  </div>
);

// --- حالة الخطأ ---
interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div dir="rtl" className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-5">
    <div className="w-full max-w-lg rounded-3xl border border-red-500/20 bg-white/[0.02] p-8 text-center">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <AlertTriangle size={30} className="text-red-400" />
      </div>
      <h1 className="mt-6 text-2xl font-black font-serif">تعذر تحميل سجل المعارك</h1>
      <p className="mt-3 text-sm text-gray-500 leading-7">{error}</p>
      <button
        onClick={onRetry}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#c6a66b] px-6 py-3 text-xs font-black text-black"
      >
        <RotateCcw size={14} />
        إعادة المحاولة
      </button>
    </div>
  </div>
);

// --- الخلفية المتوهجة ---
const BackgroundGlow: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute top-0 right-1/4 w-[520px] h-[520px] rounded-full bg-[#c6a66b]/[0.035] blur-[150px]" />
    <div className="absolute bottom-0 left-1/4 w-[420px] h-[420px] rounded-full bg-[#1f5f3a]/[0.045] blur-[140px]" />
  </div>
);

// --- الهيدر ---
const Header: React.FC = () => (
  <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#050505]/90 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between">
      <Link
        to="/"
        className="group flex items-center gap-2.5 text-xs font-bold text-gray-300 hover:text-[#c6a66b] transition-colors"
      >
        <span className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center group-hover:border-[#c6a66b]/40 group-hover:bg-[#c6a66b]/10 transition-all">
          <ArrowRight size={15} className="text-[#c6a66b]" />
        </span>
        العودة للرئيسية
      </Link>
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.025] text-[11px] text-gray-400">
        <Shield size={12} className="text-[#c6a66b]" />
        الأرشيف العسكري الوطني
      </div>
    </div>
  </header>
);

// --- قسم الهيرو ---
interface HeroSectionProps {
  totalBattles: number;
  totalYears: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ totalBattles, totalYears }) => (
  <section className="relative z-10 pt-16 md:pt-24 pb-12">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-end gap-3 mb-5">
        <div className="w-10 h-px bg-[#c6a66b]/40" />
        <span className="text-[10px] md:text-xs tracking-[0.28em] text-[#c6a66b] font-mono">
          HISTORICAL BATTLE ARCHIVE
        </span>
      </div>

      <h1 className="font-serif font-black text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight">
        سجل <span className="text-[#c6a66b]">المعارك</span>
      </h1>
      <p className="mt-5 text-base md:text-xl text-gray-400 font-serif">أحداث صنعت تاريخ الجزائر</p>

      {/* الإحصائيات */}
      <div className="mt-10 grid grid-cols-3 gap-2.5 md:gap-4 max-w-2xl mr-auto">
        <StatCard value="58+" label="ولاية" color="text-[#1f7a4a]" />
        <StatCard value={totalBattles} label="معركة مؤرشفة" color="text-[#c6a66b]" />
        <StatCard value={totalYears} label="سنة" color="text-white" />
      </div>
    </motion.div>
  </section>
);

interface StatCardProps {
  value: number | string;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-4 md:px-5 md:py-5">
    <div className={`text-2xl md:text-4xl font-black font-mono ${color}`}>
      {value}
    </div>
    <div className="mt-1 text-[10px] md:text-xs text-gray-500">{label}</div>
  </div>
);

// --- قسم الفلاتر ---
interface FiltersSectionProps {
  filters: FilterState;
  availableYears: string[];
  availableRegions: string[];
  totalMatches: number;
  hasActiveFilters: boolean;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  filters,
  availableYears,
  availableRegions,
  totalMatches,
  hasActiveFilters,
  onFilterChange,
  onReset,
}) => (
  <section className="relative z-20">
    <div className="rounded-3xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl p-4 md:p-5 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* حقل البحث */}
        <SearchInput
          value={filters.search}
          onChange={(val) => onFilterChange('search', val)}
        />

        {/* قائمة السنوات */}
        <FilterSelect
          value={filters.year}
          onChange={(val) => onFilterChange('year', val)}
          options={[
            { value: 'all', label: 'كل السنوات' },
            ...availableYears.map(year => ({ value: year, label: `سنة ${year}` })),
          ]}
          icon={<Calendar size={15} className="text-[#c6a66b]" />}
        />

        {/* قائمة المناطق */}
        <FilterSelect
          value={filters.region}
          onChange={(val) => onFilterChange('region', val)}
          options={[
            { value: 'all', label: 'كل المناطق' },
            ...availableRegions.map(region => ({ value: region, label: region })),
          ]}
          icon={<MapPin size={15} className="text-[#1f7a4a]" />}
        />
      </div>

      {/* شريط المعلومات السفلي */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <div className="text-xs text-gray-500">
          <span className="font-mono font-bold text-[#c6a66b]">{totalMatches}</span> معركة مطابقة
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-gray-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <RotateCcw size={12} />
            إعادة ضبط
          </button>
        )}
      </div>
    </div>
  </section>
);

// --- مكوّن حقل البحث ---
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="md:col-span-6 relative">
    <Search size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="ابحث في أرشيف المعارك..."
      className="w-full h-12 rounded-2xl border border-white/10 bg-white/[0.035] pr-11 pl-10 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#c6a66b]/50 transition-colors"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
      >
        <X size={15} />
      </button>
    )}
  </div>
);

// --- مكوّن القائمة المنسدلة ---
interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  icon: React.ReactNode;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ value, onChange, options, icon }) => (
  <div className="md:col-span-3 relative">
    {icon && <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</div>}
    <ChevronDown size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none w-full h-12 rounded-2xl border border-white/10 bg-white/[0.035] pr-10 pl-8 text-sm text-white outline-none cursor-pointer focus:border-[#c6a66b]/50"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value} className="bg-[#0a0a0a]">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// --- شبكة المعارك ---
interface BattlesGridProps {
  battles: Battle[];
  hasMore: boolean;
  onLoadMore: () => void;
}

const BattlesGrid: React.FC<BattlesGridProps> = ({ battles, hasMore, onLoadMore }) => {
  if (battles.length === 0) {
    return <EmptyState />;
  }

  return (
    <main className="mt-10 md:mt-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
        <AnimatePresence mode="popLayout">
          {battles.map((battle, index) => (
            <BattleCard key={battle.id} battle={battle} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="flex justify-center pt-10">
          <button
            onClick={onLoadMore}
            className="group flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.035] px-7 py-4 text-xs md:text-sm font-black hover:border-[#c6a66b]/40 hover:bg-white/[0.06] transition-all"
          >
            <Layers size={16} className="text-[#c6a66b] group-hover:rotate-12 transition-transform" />
            عرض المزيد من المعارك
          </button>
        </div>
      )}
    </main>
  );
};

// --- بطاقة المعركة ---
interface BattleCardProps {
  battle: Battle;
  index: number;
}

const BattleCard: React.FC<BattleCardProps> = ({ battle, index }) => {
  const regionName = getRegionDisplayName(battle.region_id);
  const image = battle.hero_image || battle.image;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-xl hover:border-[#c6a66b]/45 transition-all"
    >
      {/* صورة المعركة */}
      <div className="relative h-56 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={battle.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-[0.62] contrast-110 group-hover:grayscale-0 group-hover:brightness-[0.82] group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#151515] to-[#050505] flex items-center justify-center">
            <Swords size={42} className="text-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/25 to-transparent" />

        {/* البطاقات العلوية (السنة والمنطقة) */}
        <div className="absolute top-4 right-4 left-4 flex items-center justify-between gap-2">
          {battle.year && (
            <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[#c6a66b] text-[11px] font-mono backdrop-blur-md">
              {battle.year} م
            </span>
          )}
          <span className="max-w-[150px] truncate flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 text-gray-300 text-[10px] backdrop-blur-md">
            <MapPin size={10} className="text-[#1f7a4a] shrink-0" />
            {regionName}
          </span>
        </div>
      </div>

      {/* المحتوى النصي */}
      <div className="p-5 md:p-6">
        <h2 className="font-serif font-black text-xl md:text-2xl leading-snug text-white group-hover:text-[#c6a66b] transition-colors">
          {battle.title}
        </h2>

        {battle.event_type && (
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full border border-[#c6a66b]/20 bg-[#c6a66b]/10 px-3 py-1.5 text-[10px] md:text-xs font-bold text-[#c6a66b]">
              نوع الحدث: {battle.event_type}
            </span>
          </div>
        )}

        <p className="mt-2.5 text-xs md:text-sm leading-7 text-gray-500 line-clamp-3">
          {battle.description || 'لا يوجد وصف لهذه المعركة حالياً.'}
        </p>

        <div className="mt-5 pt-4 border-t border-white/[0.06]">
          <Link
            to={`/journey/${battle.id}`}
            className="w-full h-11 rounded-xl bg-white/[0.035] border border-white/10 flex items-center justify-center gap-2 text-xs font-bold text-gray-300 group-hover:bg-[#c6a66b] group-hover:border-[#c6a66b] group-hover:text-black transition-all"
          >
            <span>اكتشف التفاصيل</span>
            <ChevronLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

// --- حالة عدم وجود نتائج ---
const EmptyState: React.FC = () => (
  <div className="max-w-lg mx-auto rounded-3xl border border-white/10 bg-[#0a0a0a] p-12 text-center mt-10">
    <Swords size={38} className="mx-auto text-gray-700" />
    <h3 className="mt-5 font-serif text-xl font-black">لم نعثر على أي معارك</h3>
    <p className="mt-2 text-xs leading-6 text-gray-500">لا توجد نتائج مطابقة للبحث أو الفلاتر الحالية.</p>
  </div>
);

export default Battles;