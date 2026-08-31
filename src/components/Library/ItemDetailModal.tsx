import React from 'react';
import { X, Calendar, MapPin, Eye, Download, FileText, Music, Image as ImageIcon, Sparkles, BookOpen, ExternalLink } from 'lucide-react';
import { LibraryItem } from '../../data/libraryData';

interface ItemDetailModalProps {
  item: LibraryItem | null;
  allItems: LibraryItem[];
  onClose: () => void;
  onDownload: (item: LibraryItem) => void;
  onPlayAudio?: (item: LibraryItem) => void;
  onSelectAnotherItem: (item: LibraryItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  allItems,
  onClose,
  onDownload,
  onPlayAudio,
  onSelectAnotherItem
}) => {
  if (!item) return null;

  // Find related items by scanning tags overlaps or same media type
  const relatedItems = allItems
    .filter((x) => x.id !== item.id)
    .filter((x) => x.type === item.type || x.tags.some((t) => item.tags.includes(t)))
    .slice(0, 3);

  // Region lookup helper
  const getRegionName = (id: string) => {
    switch (id) {
      case 'DZ-05': return 'الأوراس (المنطقة الأولى)';
      case 'DZ-25': return 'الشمال القسنطيني (المنطقة الثانية)';
      case 'DZ-15': return 'القبائل (المنطقة الثالثة)';
      case 'DZ-16': return 'العاصمة وضواحيها (المنطقة الرابعة)';
      case 'DZ-31': return 'الوهراني (المنطقة الخامسة)';
      default: return id;
    }
  };

  return (
    <div 
      id="library-detail-modal-overlay" 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      {/* Container box */}
      <div 
        id="library-detail-modal-card"
        className="relative w-full max-w-4xl bg-[#090909] rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden text-right my-8"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Absolute top closing button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-40 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer shadow-lg"
        >
          <X size={18} />
        </button>

        {/* Hero Top Media Gallery layout */}
        <div className="relative aspect-[21/9] w-full bg-black flex items-center justify-center overflow-hidden border-b border-white/5">
          <img 
            src={item.thumbnail} 
            alt={item.title} 
            className="w-full h-full object-cover grayscale opacity-40 select-none blur-xs scale-105"
          />
          {/* Centered clean container */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
          
          <div className="absolute z-10 text-center px-4 max-w-2xl">
            <span className="px-3.5 py-1.5 rounded-full bg-[#c6a66b]/20 border border-[#c6a66b]/20 text-[10px] font-black text-[#c6a66b]">
              {item.type === 'pdf' ? 'وثائق ومخطوطات' : item.type === 'image' ? 'أرشيف صوري' : 'تسجيل إذاعي'}
            </span>
            <h2 className="text-lg sm:text-2xl mt-4 font-black text-white leading-snug">{item.title}</h2>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 sm:p-8">
          {/* Main Content Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-black text-[#c6a66b] flex items-center gap-1.5">
                <Sparkles size={13} />
                الوصف الأرشيفي والترابط التاريخي
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-bold leading-relaxed whitespace-pre-line text-justify">
                {item.description}
              </p>
            </div>

            {/* Custom file features */}
            {item.type === 'pdf' && (
              <div className="p-4 rounded-xl bg-red-950/10 border border-red-500/10 text-red-300 text-xs font-bold leading-relaxed flex items-center gap-3">
                <FileText size={20} className="shrink-0 text-red-400" />
                <div>
                  <h4 className="font-black text-white">معيار الملف الأكاديمي</h4>
                  <p className="text-gray-400 text-[11px] mt-0.5">تتضمن هذه الوثيقة {item.pages || 2} صفحات مرجعية بترميز عالمي جاهز للقراءة والتنزيل الفوري.</p>
                </div>
              </div>
            )}

            {item.type === 'audio' && (
              <div className="p-4 rounded-xl bg-blue-950/10 border border-blue-500/10 text-blue-300 text-xs font-bold leading-relaxed flex items-center gap-3">
                <Music size={20} className="shrink-0 text-blue-400" />
                <div>
                  <h4 className="font-black text-white">البث الإذاعي وتفاصيل الصوت</h4>
                  <p className="text-gray-400 text-[11px] mt-0.5">الملف متاح بنقاء عالي وبمدة {item.duration || '03:45'} دقيقة من البث المباشر المأخوذ عن أرشيف التلفزة والراديو الجزائري.</p>
                </div>
              </div>
            )}

            {/* Action triggering */}
            <div className="pt-2 flex flex-wrap gap-3">
              {item.type === 'pdf' && (
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onDownload(item)}
                  className="px-5 py-3 rounded-xl bg-[#c6a66b] hover:bg-[#b09159] text-black text-xs font-black transition-all cursor-pointer flex items-center gap-2 shadow"
                >
                  <Download size={14} />
                  <span>تحميل ملف الوثيقة ({item.file_size || '1.8 MB'})</span>
                </a>
              )}

              {item.type === 'image' && (
                <a
                  href={item.image_url || item.thumbnail}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onDownload(item)}
                  className="px-5 py-3 rounded-xl bg-brand-green text-white text-xs font-black transition-all cursor-pointer flex items-center gap-2 shadow"
                >
                  <ExternalLink size={14} />
                  <span>فتح الصورة بالدقة العالية الكاملة</span>
                </a>
              )}

              {item.type === 'audio' && onPlayAudio && (
                <button
                  onClick={() => {
                    onPlayAudio(item);
                    onClose();
                  }}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all cursor-pointer flex items-center gap-2 shadow"
                >
                  <Music size={14} />
                  <span>تشغيل التسجيل الصوتي الآن</span>
                </button>
              )}

              <button
                onClick={() => onDownload(item)}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-300 font-bold transition-all cursor-pointer"
              >
                توثيق القنصلية / الأرشفة
              </button>
            </div>
          </div>

          {/* Catalog Metadata Column (1/3 width sidebar) */}
          <div className="space-y-6 lg:border-r lg:border-white/5 lg:pr-6">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400">فهرس المحتوى الرقمي</h3>
              
              <div className="divide-y divide-white/5 text-xs space-y-3">
                {/* Source */}
                <div className="pt-2">
                  <span className="text-gray-500 block font-bold">المصدر الرسمي:</span>
                  <span className="text-white font-bold mt-1 block">{item.source}</span>
                </div>

                {/* Region */}
                <div className="pt-3">
                  <span className="text-gray-500 block font-bold">المنطقة والولاية العسكرية:</span>
                  <span className="text-white font-bold mt-1 block flex items-center gap-1">
                    <MapPin size={12} className="text-brand-green" />
                    {getRegionName(item.region_id)}
                  </span>
                </div>

                {/* Date */}
                <div className="pt-3">
                  <span className="text-gray-500 block font-bold">حقبة وسنة الأرشفة:</span>
                  <span className="text-[#c6a66b] font-mono font-bold mt-1 block flex items-center gap-1">
                    <Calendar size={12} />
                    {item.year} م
                  </span>
                </div>

                {/* Date Created in app */}
                <div className="pt-3">
                  <span className="text-gray-500 block font-bold">تاريخ الإدراج للجمهور:</span>
                  <span className="text-gray-400 font-mono mt-1 block">
                    {new Date(item.created_at).toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags cloud */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-gray-400">الوسوم والكلمات الدلالية</h4>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2.5 py-1 rounded bg-white/5 border border-white/5 hover:border-[#c6a66b]/20 text-[10px] text-gray-300 font-bold hover:text-white transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick stats counter */}
            <div className="grid grid-cols-2 gap-3.5 bg-white/[0.01] border border-white/5 p-3 rounded-2xl">
              <div className="text-center p-2.5 rounded-xl bg-white/[0.01]">
                <Eye size={14} className="text-purple-400 mx-auto mb-1" />
                <span className="block text-sm font-serif font-black text-white">{item.views}</span>
                <span className="text-[9px] text-gray-500 font-bold">مشاهدة</span>
              </div>
              <div className="text-center p-2.5 rounded-xl bg-white/[0.01]">
                <Download size={14} className="text-rose-400 mx-auto mb-1" />
                <span className="block text-sm font-serif font-black text-white">{item.downloads}</span>
                <span className="text-[9px] text-gray-500 font-bold">تنزيل</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar items section ("عناصر مشابهة") */}
        {relatedItems.length > 0 && (
          <div className="border-t border-white/5 p-6 sm:p-8 bg-black/40">
            <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-[#c6a66b]" />
              <span>مستندات وأرشيفات ذات صلة تهمك</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedItems.map((r) => (
                <div 
                  key={r.id}
                  onClick={() => onSelectAnotherItem(r)}
                  className="group p-3 rounded-xl bg-[#0e0e0e] border border-white/5 hover:border-[#c6a66b]/20 cursor-pointer transition-all flex items-center gap-3"
                >
                  <img 
                    src={r.thumbnail} 
                    alt={r.title} 
                    className="w-12 h-12 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all shrink-0"
                  />
                  <div className="space-y-0.5 text-right overflow-hidden">
                    <span className="text-[9px] text-[#c6a66b] font-mono block">{r.year} م</span>
                    <h4 className="text-xs font-black text-white group-hover:text-[#c6a66b] transition-colors truncate">{r.title}</h4>
                    <p className="text-[10px] text-gray-500 font-bold truncate">{r.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
