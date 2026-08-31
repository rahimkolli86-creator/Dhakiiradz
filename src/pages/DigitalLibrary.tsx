import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  TrendingUp, 
  History, 
  ChevronLeft, 
  ChevronRight, 
  FolderSync, 
  Award,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  Music
} from 'lucide-react';

import { supabase, hasSupabaseCreds } from '/lib/supabase';
import { INITIAL_LIBRARY_ITEMS, LibraryItem } from '../data/libraryData';
import LibraryHero from '../components/Library/LibraryHero';
import { LibraryFilters } from '../components/Library/LibraryFilters';
import { AudioPlayer } from '../components/Library/AudioPlayer';
import { LibraryItemCard } from '../components/Library/LibraryItemCard';
import { ItemDetailModal } from '../components/Library/ItemDetailModal';

export default function DigitalLibrary() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Audio Player track state
  const [activeTrack, setActiveTrack] = useState<LibraryItem | null>(null);
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState<'all' | 'pdf' | 'image' | 'audio'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Selected single item detail modal state
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 1. Fetch library items from Supabase or Sandbox Storage
  useEffect(() => {
    const fetchLibrary = async () => {
      setIsLoading(true);
      try {
        if (hasSupabaseCreds && supabase) {
         const { data, error } = await supabase
               .from('digital_library')
               .select('*')
               .order('created_at', { ascending: false });
           
                         console.log('DA consolTA:', data);
                         console.log('ERROR:', error);     
                         
                         
          if (!error && data && data.length > 0) {
            const parsed: LibraryItem[] = data.map((x: any) => ({
              ...x,
              tags: Array.isArray(x.tags) ? x.tags : (x.tags ? x.tags.split(',') : [])
            }));
            setItems(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Supabase load failed, falling back to Sandbox data", err);
      }

      // Initialize with falling back local storage
      const localData = localStorage.getItem('sandbox_library_items');
      if (localData) {
        setItems(JSON.parse(localData));
      } else {
        localStorage.setItem('sandbox_library_items', JSON.stringify(INITIAL_LIBRARY_ITEMS));
        setItems(INITIAL_LIBRARY_ITEMS);
      }
      setIsLoading(false);
    };

    fetchLibrary();
  }, []);

  // 2. Increment view counter
  const handlePreviewItem = async (item: LibraryItem) => {
    setSelectedItem(item);
    
    // Increment view locally and dynamically
    const updated = items.map((x) => 
      x.id === item.id ? { ...x, views: (x.views || 0) + 1 } : x
    );
    setItems(updated);
    localStorage.setItem('sandbox_library_items', JSON.stringify(updated));

    // Async increment in Supabase
    if (hasSupabaseCreds && supabase) {
      try {
        await supabase
          .from('digital_library')
          .update({ views: (item.views || 0) + 1 })
          .eq('id', item.id);
      } catch (err) {
        console.log("Supabase views update error ignored:", err);
      }
    }
  };

  // 3. Increment download counter
  const handleDownloadItem = async (item: LibraryItem, e?: React.MouseEvent) => {
    // Increment download locally and dynamically
    const updated = items.map((x) => 
      x.id === item.id ? { ...x, downloads: (x.downloads || 0) + 1 } : x
    );
    setItems(updated);
    localStorage.setItem('sandbox_library_items', JSON.stringify(updated));

    // If PDF or audio, trigger real browser download
    if (item.type === 'pdf') {
      window.open(item.file_url, '_blank');
    } else if (item.type === 'image') {
      window.open(item.image_url || item.thumbnail, '_blank');
    }

    // Async increment in Supabase
    if (hasSupabaseCreds && supabase) {
      try {
        await supabase
          .from('digital_library')
          .update({ downloads: (item.downloads || 0) + 1 })
          .eq('id', item.id);
      } catch (err) {
        console.log("Supabase downloads update error ignored:", err);
      }
    }
  };

  // 4. Loading track directly to user custom engine
  const handlePlayAudio = (item: LibraryItem) => {
    setActiveTrack(item);
    
    // Register it as a view since user interacts with it
    const updated = items.map((x) => 
      x.id === item.id ? { ...x, views: (x.views || 0) + 1 } : x
    );
    setItems(updated);
    localStorage.setItem('sandbox_library_items', JSON.stringify(updated));
  };

  // 5. Hard resetting all parameters
  const clearFilters = () => {
    setSearchTerm('');
    setActiveType('all');
    setSelectedPeriod('');
    setSelectedWilaya('');
    setSelectedYear('');
    setCurrentPage(1);
  };

  // Reset page when any filter modifies
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeType, selectedPeriod, selectedWilaya, selectedYear]);

  // STAT GENERATOR
  const stats = {
    pdfs: items.filter(x => x.type === 'pdf').length,
    images: items.filter(x => x.type === 'image').length,
    audios: items.filter(x => x.type === 'audio').length,
    totalViews: items.reduce((acc, curr) => acc + (curr.views || 0), 0),
    totalDownloads: items.reduce((acc, curr) => acc + (curr.downloads || 0), 0)
  };

  // HIGHLIGHT FILTERED LISTS
  const filteredItems = items.filter((item) => {
    // Search overlap check
    const matchesSearch = 
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    // Media type check
    const matchesType = activeType === 'all' || item.type === activeType;

    // Period check matches tags/description logic
    const matchesPeriod = 
      selectedPeriod === '' ||
      (selectedPeriod === 'pre-1954' && parseInt(item.year) < 1954) ||
      (selectedPeriod === '1954-1956' && parseInt(item.year) >= 1954 && parseInt(item.year) <= 1956) ||
      (selectedPeriod === '1956-1959' && parseInt(item.year) > 1956 && parseInt(item.year) <= 1959) ||
      (selectedPeriod === '1959-1962' && parseInt(item.year) > 1959 && parseInt(item.year) <= 1962);

    // Wilaya list matching
    const matchesWilaya = selectedWilaya === '' || item.region_id === selectedWilaya;

    // Year matching
    const matchesYear = selectedYear === '' || item.year === selectedYear;

    return matchesSearch && matchesType && matchesPeriod && matchesWilaya && matchesYear;
  });

  // HIGHLIGHT SPECIAL SUB-SECTIONS
  // A. "الأكثر مشاهدة" (Most Viewed) first 3
  const mostViewedItems = [...items]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  // B. "آخر الإضافات" (Latest Additions) first 3
  const latestAdditions = [...items]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  // PAGINATION CALCULATOR
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentPaginatedItems = filteredItems.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 1. HERO SECTION WITH AGGREGATE STAT COUNTERS */}
        <LibraryHero stats={stats} />

        {/* 2. DYNAMIC ROW VIEW: "الأكثر مشاهدة" (MOST VIEWED) & "آخر الإضافات" (LATEST ADDITIONS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-right" dir="rtl">
          {/* Section: Most Viewed Cards block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <TrendingUp className="text-[#c6a66b]" size={16} />
              <h2 className="text-base font-black text-white">الأرشيفات الرقمية الأكثر تصفحاً وقراءة</h2>
            </div>
            
            <div className="space-y-3">
              {isLoading ? (
                <div className="h-20 rounded-xl bg-white/[0.01] border border-white/5 animate-pulse" />
              ) : mostViewedItems.map((item) => (
                <div 
                  key={`most-viewed-${item.id}`}
                  onClick={() => handlePreviewItem(item)}
                  className="p-3.5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-[#c6a66b]/20 transition-all cursor-pointer flex items-center gap-4 group justify-between"
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    {/* Media Type Icon & index Indicator */}
                    <div className="relative w-11 h-11 rounded-xl bg-black border border-white/5 flex items-center justify-center shrink-0">
                      {item.type === 'pdf' && <FileText size={16} className="text-red-400" />}
                      {item.type === 'image' && <ImageIcon size={16} className="text-brand-green" />}
                      {item.type === 'audio' && <Music size={16} className="text-blue-400" />}
                    </div>
                    
                    <div className="text-right overflow-hidden">
                      <span className="text-[9px] text-[#c6a66b] font-mono block">{item.year} م | {item.source}</span>
                      <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#c6a66b] transition-colors truncate mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="text-left shrink-0 font-mono text-[10px] text-gray-500 font-bold">
                    <span>{item.views} قراءة</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Latest Additions Cards block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <History className="text-brand-green" size={16} />
              <h2 className="text-base font-black text-white">آخر المستندات والصور المفرج عنها حديثاً</h2>
            </div>

            <div className="space-y-3">
              {isLoading ? (
                <div className="h-20 rounded-xl bg-white/[0.01] border border-white/5 animate-pulse" />
              ) : latestAdditions.map((item) => (
                <div 
                  key={`latest-${item.id}`}
                  onClick={() => handlePreviewItem(item)}
                  className="p-3.5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-brand-green/20 transition-all cursor-pointer flex items-center gap-4 group justify-between"
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-black border border-white/5 shrink-0">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                      />
                    </div>
                    
                    <div className="text-right overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                        <span className="text-[9px] text-gray-400 font-bold font-mono">أضيف مؤخراً</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-brand-green transition-colors truncate mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <span className="text-[9px] text-[#c6a66b] font-bold px-2 py-1 rounded bg-white/5">
                    {item.type === 'pdf' ? 'PDF' : item.type === 'image' ? 'صورة' : 'صوت'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. MULTI-CONTROL SEARCH AND FILTERS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2" dir="rtl">
            <span className="text-[10px] text-gray-400 font-black block">محرك وفهارس السير التاريخية للملفات</span>
            <span className="text-[10px] text-gray-500 font-bold block font-mono">
              وجدنا {filteredItems.length} عنصر أرشيفي متاح
            </span>
          </div>
          
          <LibraryFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeType={activeType}
            setActiveType={setActiveType}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            selectedWilaya={selectedWilaya}
            setSelectedWilaya={setSelectedWilaya}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            onClearFilters={clearFilters}
          />
        </div>

        {/* 4. CUSTOM AUDIO PLAYER INTERACTION COMPONENT */}
        <AudioPlayer 
          activeTrack={activeTrack} 
          onCloseTrack={() => setActiveTrack(null)}
        />

        {/* 5. MAIN FILTERED GRID LISTINGS */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-3xl bg-white/[0.01] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl" dir="rtl">
            <FolderSync size={36} className="text-gray-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-base font-black text-white">لم نعثر على وثائق أو أرشيفات تطابق هذه التصفية!</h3>
            <p className="text-xs text-gray-500 mt-1">يرجى تعديل محددات البحث أو تصفية الحقب التاريخية وإعادة المحاولة.</p>
            <button
              onClick={clearFilters}
              className="mt-6 px-4 py-2 bg-[#c6a66b] text-black text-xs font-black rounded-xl hover:bg-[#b09159] transition-all cursor-pointer"
            >
              إعادة تهيئة كاملة وفك الحجب
            </button>
          </div>
        ) : (
          <div className="space-y-8" dir="rtl">
            {/* Masonry-equivalent adaptive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPaginatedItems.map((item) => (
                <LibraryItemCard
                  key={item.id}
                  item={item}
                  currentPlayingId={activeTrack?.id}
                  isCurrentlyPlaying={activeTrack !== null}
                  onPreview={handlePreviewItem}
                  onPlayAudio={handlePlayAudio}
                  onDownload={handleDownloadItem}
                />
              ))}
            </div>

            {/* Pagination Controls block */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 1
                      ? 'border-white/5 text-gray-700 cursor-not-allowed'
                      : 'border-white/10 hover:border-[#c6a66b] text-white hover:bg-white/5'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>

                <div className="flex items-center gap-1 font-mono text-xs">
                  <span className="text-[#c6a66b] font-black">{currentPage}</span>
                  <span className="text-gray-600">/</span>
                  <span className="text-gray-400">{totalPages}</span>
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === totalPages
                      ? 'border-white/5 text-gray-700 cursor-not-allowed'
                      : 'border-white/10 hover:border-[#c6a66b] text-white hover:bg-white/5'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. PARTNERS AND LINKED ARCHIVES (الأرشيفات المرتبطة) */}
        <div className="p-8 sm:p-10 rounded-3xl border border-white/5 bg-gradient-to-l from-white/[0.01] via-black to-black text-right space-y-6" dir="rtl">
          <div className="flex items-center gap-2">
            <Award className="text-[#c6a66b]" size={18} />
            <h2 className="text-base sm:text-lg font-black text-white">الأرشيفات الوطنية والمتاحف الشريكة الممثلة</h2>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-400 font-bold leading-relaxed max-w-4xl">
            يتم السهر على تحديث ومراجعة هذا المجمع الوثائقي بالتنسيق الكامل مع الهيئات الثقافية والسيادية الوطنية، لضمان دقة المحتوى وسلامة المعطيات المعروضة للباحثين والطلبة والمواطنين الأحرار.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[
              { title: 'المركز الوطني للأرشيف الجزائري', url: 'https://www.archives-nationales.dz' },
              { title: 'المتحف الوطني للمجاهد', url: '#mousm' },
              { title: 'المؤسسة الوطنية للتلفزة والإذاعة', url: 'https://www.entv.dz' },
              { title: 'وزارة المجاهدين وذوي الحقوق', url: 'https://m-moudjahidine.dz' }
            ].map((p, idx) => (
              <a 
                key={idx}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-[#090909] hover:bg-[#0f0f0f] border border-white/5 hover:border-[#c6a66b]/20 transition-all text-center flex flex-col justify-center gap-1 cursor-pointer group"
              >
                <h4 className="text-xs font-black text-white group-hover:text-[#c6a66b] transition-colors leading-normal">{p.title}</h4>
                <span className="text-[9px] text-gray-500 font-bold leading-tight mt-1 group-hover:underline">زيارة البوابة الرسمية</span>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* 7. DETAILS OVERLAY MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <ItemDetailModal
            item={selectedItem}
            allItems={items}
            onClose={() => setSelectedItem(null)}
            onDownload={handleDownloadItem}
            onPlayAudio={handlePlayAudio}
            onSelectAnotherItem={(newItem) => {
              // Smooth select another related item in modal directly
              handlePreviewItem(newItem);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
