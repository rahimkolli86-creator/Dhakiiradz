import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Calendar, Clock, RotateCcw, Tag } from 'lucide-react';
import { WILAYAS_LIST, HISTORICAL_PERIODS } from '../../data/libraryData';

interface LibraryFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeType: 'all' | 'pdf' | 'image' | 'audio';
  setActiveType: (val: 'all' | 'pdf' | 'image' | 'audio') => void;
  selectedPeriod: string;
  setSelectedPeriod: (val: string) => void;
  selectedWilaya: string;
  setSelectedWilaya: (val: string) => void;
  selectedYear: string;
  setSelectedYear: (val: string) => void;
  onClearFilters: () => void;
}

export const LibraryFilters: React.FC<LibraryFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  activeType,
  setActiveType,
  selectedPeriod,
  setSelectedPeriod,
  selectedWilaya,
  setSelectedWilaya,
  selectedYear,
  setSelectedYear,
  onClearFilters
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Quick years options
  const years = ['1954', '1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962'];

  const hasActiveFilters = searchTerm !== '' || selectedPeriod !== '' || selectedWilaya !== '' || selectedYear !== '' || activeType !== 'all';

  return (
    <div id="library-filters-container" className="space-y-4" dir="rtl">
      {/* Top Media Type Nav Bar + Simple Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-between bg-white/[0.01] border border-white/5 rounded-2xl p-4">
        {/* Nav Tabs list */}
        <div className="flex flex-wrap gap-1 bg-black/40 p-1 rounded-xl border border-white/5 snap-x overflow-x-auto">
          {[
            { id: 'all', label: 'كافة المحتويات' },
            { id: 'pdf', label: 'وثائق ومراسيم PDF' },
            { id: 'image', label: 'معرض الصور الأرشيفية' },
            { id: 'audio', label: 'تسجيلات وإذاعات صوتية' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                activeType === tab.id
                  ? 'bg-[#c6a66b] text-black shadow-md'
                  : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Input search and toggle */}
        <div className="flex gap-2 flex-grow max-w-full lg:max-w-2xl">
          <div className="relative flex-grow">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="البحث بالعنوان، الكلمات الدلالية، تاريخ النشر، المصدر غرف السجلات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b0b0b]/60 border border-white/10 hover:border-white/20 focus:border-[#c6a66b] font-bold text-xs text-white rounded-xl py-3 pr-10 pl-4 outline-none transition-all placeholder:text-gray-500"
            />
          </div>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              showAdvanced || selectedPeriod || selectedWilaya || selectedYear
                ? 'bg-[#c6a66b]/10 border-[#c6a66b]/30 text-[#c6a66b]'
                : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-300'
            }`}
          >
            <SlidersHorizontal size={14} />
            <span>خيارات تصفية عاجلة</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters Expandable section with animation fallback */}
      {showAdvanced && (
        <div className="p-5 bg-[#0b0b0b] border border-white/5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-5 animate-slideDown">
          {/* 1. Historical Epoch */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-black block flex items-center gap-1.5">
              <Clock size={12} className="text-[#c6a66b]" />
              الحقبة والمحطة التاريخية للثورة
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#c6a66b] rounded-xl py-3 px-3.5 text-xs text-white font-bold outline-none cursor-pointer transition-all"
            >
              <option value="" className="bg-[#0b0b0b]">جميع الحقب التاريخية</option>
              {HISTORICAL_PERIODS.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0b0b0b]">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Revolutionary State / Wilaya */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-black block flex items-center gap-1.5">
              <MapPin size={12} className="text-brand-green" />
              المنطقة والولاية العسكرية التاريخية
            </label>
            <select
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#c6a66b] rounded-xl py-3 px-3.5 text-xs text-white font-bold outline-none cursor-pointer transition-all"
            >
              <option value="" className="bg-[#0b0b0b]">جميع الولايات العسكرية التاريخية</option>
              {WILAYAS_LIST.map((w) => (
                <option key={w.id} value={w.id} className="bg-[#0b0b0b]">
                  {w.name}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Year Specific Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-black block flex items-center gap-1.5">
              <Calendar size={12} className="text-blue-400" />
              السنة التاريخية المحددة (م)
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#c6a66b] rounded-xl py-3 px-3.5 text-xs text-white font-bold outline-none cursor-pointer transition-all"
            >
              <option value="" className="bg-[#0b0b0b]">جميع السنين (1954 - 1962)</option>
              {years.map((y) => (
                <option key={y} value={y} className="bg-[#0b0b0b] font-serif">
                  {y} م {y === '1954' && ' - اندلاع الثورة الخالدة'}
                  {y === '1962' && ' - الاستقلال واسترداد السيادة'}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Tags and active search tags feedback */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.01] border border-white/5 rounded-xl px-4 py-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-gray-500 font-bold block">محددات تصفية نشطة:</span>
            {searchTerm && (
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-white rounded-lg font-bold flex items-center gap-1">
                البحث: &quot;{searchTerm}&quot;
              </span>
            )}
            {activeType !== 'all' && (
              <span className="px-2.5 py-1 bg-[#c6a66b]/10 border border-[#c6a66b]/20 text-[#c6a66b] rounded-lg font-bold">
                النوع: {activeType === 'pdf' ? 'وثيقة PDF' : activeType === 'image' ? 'صورة' : 'صوت تسجيل'}
              </span>
            )}
            {selectedPeriod && (
              <span className="px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg font-bold">
                الحقبة التاريخية المحددةّ
              </span>
            )}
            {selectedWilaya && (
              <span className="px-2.5 py-1 bg-brand-green/10 border border-brand-green/20 text-[#217347] rounded-lg font-bold">
                {WILAYAS_LIST.find(w => w.id === selectedWilaya)?.name.split(':')[0] || selectedWilaya}
              </span>
            )}
            {selectedYear && (
              <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg font-bold font-serif">
                {selectedYear} م
              </span>
            )}
          </div>

          <button
            onClick={onClearFilters}
            className="text-[10px] text-gray-400 hover:text-rose-400 transition-colors cursor-pointer font-bold flex items-center gap-1"
          >
            <RotateCcw size={12} />
            <span>إعادة تعيين وبدء بحث جديد</span>
          </button>
        </div>
      )}
    </div>
  );
};
