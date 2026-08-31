import React from 'react';
import { FileText, Image, Music, Eye, Download, Play, Pause, Sparkles, Calendar, BookOpen } from 'lucide-react';
import { LibraryItem } from '../../data/libraryData';

interface LibraryItemCardProps {
  item: LibraryItem;
  currentPlayingId?: string;
  isCurrentlyPlaying?: boolean;
  onPreview: (item: LibraryItem) => void;
  onPlayAudio?: (item: LibraryItem) => void;
  onDownload: (item: LibraryItem, e: React.MouseEvent) => void;
}

export const LibraryItemCard: React.FC<LibraryItemCardProps> = ({
  item,
  currentPlayingId,
  isCurrentlyPlaying = false,
  onPreview,
  onPlayAudio,
  onDownload
}) => {
  const isSelectedAudio = currentPlayingId === item.id;

  // 1. PDF DOCUMENT CARD RENDER
  if (item.type === 'pdf') {
    return (
      <div 
        id={`pdf-card-${item.id}`}
        className="group relative rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-black hover:border-[#c6a66b]/30 hover:shadow-[0_8px_30px_rgba(198,166,107,0.05)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
        dir="rtl"
      >
        <div>
          {/* Cover thumbnail wrapper */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black border-b border-white/5">
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
            />
            {/* Top widgets overlay */}
            <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#c6a66b]/25 border border-[#c6a66b]/20 text-[9px] font-black text-[#c6a66b] backdrop-blur-md">
                وثيقة أرشيفية
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-black/60 border border-white/10 text-[9px] font-mono font-bold text-white backdrop-blur-md">
                {item.year} م
              </span>
            </div>

            {/* Float icon */}
            <div className="absolute bottom-3.5 right-3.5 w-8 h-8 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 flex items-center justify-center backdrop-blur-md font-bold">
              <FileText size={14} />
            </div>
          </div>

          {/* Details */}
          <div className="p-4 space-y-2.5 text-right">
            <span className="text-[9px] text-[#c6a66b] font-bold line-clamp-1">{item.source}</span>
            <h3 className="text-sm font-black text-white hover:text-[#c6a66b] transition-colors leading-relaxed line-clamp-2">
              {item.title}
            </h3>
            <p className="text-[11px] text-gray-500 font-bold leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Footer actions panel */}
        <div className="px-4 pb-4 pt-2 border-t border-white/5 flex items-center justify-between gap-3 bg-white/[0.01]">
          {/* Metadata counters */}
          <div className="text-[10px] text-gray-500 font-bold font-mono">
            <span>{item.pages || 2} ص </span>
            <span className="text-gray-700 mx-1">|</span>
            <span>{item.file_size || '2.1 MB'}</span>
          </div>

          {/* Real action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPreview(item)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-bold text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1"
            >
              <Eye size={11} />
              <span>معاينة</span>
            </button>

            <button
              onClick={(e) => onDownload(item, e)}
              className="px-3 py-1.5 rounded-lg bg-[#c6a66b]/10 hover:bg-[#c6a66b]/20 border border-[#c6a66b]/20 hover:border-[#c6a66b]/40 text-[10px] font-bold text-[#c6a66b] transition-all cursor-pointer flex items-center gap-1"
            >
              <Download size={11} />
              <span>تحميل</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. IMAGE PHOTO CARD RENDER
  if (item.type === 'image') {
    return (
      <div 
        id={`image-card-${item.id}`}
        className="group relative rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.01] to-black hover:border-brand-green/30 hover:shadow-[0_8px_30px_rgba(33,115,71,0.05)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
        dir="rtl"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
          <img 
            src={item.thumbnail} 
            alt={item.title} 
            className="w-full h-full object-cover grayscale scale-100 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
          />

          {/* Gradients screen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Top badges */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-brand-green/25 border border-brand-green/20 text-[9px] font-black text-brand-green backdrop-blur-md">
              صورة تاريخية
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-black/60 border border-white/10 text-[9px] font-mono font-bold text-white backdrop-blur-md">
              {item.year} م
            </span>
          </div>

          {/* Large Hover Lens trigger */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xxs">
            <button
              onClick={() => onPreview(item)}
              className="w-12 h-12 rounded-full bg-brand-green border border-brand-green/20 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              <Eye size={18} />
            </button>
          </div>

          {/* Quick source bottom-left overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[9px] text-gray-300 bg-black/45 px-2 py-1 rounded border border-white/5 backdrop-blur-sm shadow font-serif">
            <Sparkles size={9} className="text-[#c6a66b]" />
            <span>{item.source}</span>
          </div>
        </div>

        {/* Content details under masonry thumbnail */}
        <div className="p-4 space-y-2 text-right">
          <h3 className="text-sm font-black text-white hover:text-brand-green transition-colors leading-relaxed line-clamp-1">
            {item.title}
          </h3>
          <p className="text-[11px] text-gray-500 font-bold leading-relaxed line-clamp-2">
            {item.description}
          </p>

          <div className="pt-2 flex justify-between items-center text-[10px]">
            <span className="text-gray-400 font-bold">المشاهدات: {item.views}</span>
            <button
              onClick={() => onPreview(item)}
              className="text-[#217347] font-black hover:underline hover:text-green-400 cursor-pointer text-[10px]"
            >
              اقرأ التفاصيل الكاملة ←
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. AUDIO TAPE CARD RENDER
  return (
    <div 
      id={`audio-card-${item.id}`}
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isSelectedAudio 
          ? 'border-[#c6a66b] bg-[#c6a66b]/5 shadow-[0_4px_25px_rgba(198,166,107,0.08)]' 
          : 'border-white/5 bg-gradient-to-b from-white/[0.01] to-black hover:border-blue-500/20 hover:shadow-[0_8px_30px_rgba(59,130,246,0.05)]'
      }`}
      dir="rtl"
    >
      <div>
        {/* Cover illustration representing dynamic cassette sound tape */}
        <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden border-b border-white/5 flex items-center justify-center">
          <img 
            src={item.thumbnail} 
            alt={item.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-35 grayscale group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
          />
          {/* Dynamic rotating tape spool effect if playing */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1629]/40 to-black/80 flex items-center justify-center gap-8 z-10">
            {/* Left spool */}
            <div className={`w-8 h-8 rounded-full border-2 border-gray-600/30 bg-black flex items-center justify-center relative ${isCurrentlyPlaying && isSelectedAudio ? 'animate-spin [animation-duration:5s]' : ''}`}>
              <div className="w-4 h-4 rounded-full border border-gray-600/50 bg-black flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c6a66b]" />
              </div>
              <span className="absolute w-[2px] h-[5px] bg-gray-500 top-1 left-4" />
              <span className="absolute w-[2px] h-[5px] bg-gray-500 bottom-1 left-4" />
            </div>

            {/* Middle decorative labels */}
            <div className="text-center font-mono text-[9px] text-gray-500 shrink-0">
              <span className="block font-black text-gray-400">SIDE A</span>
              <span className="block text-[#c6a66b] font-bold">{item.duration || '03:45'}</span>
            </div>

            {/* Right spool */}
            <div className={`w-8 h-8 rounded-full border-2 border-gray-600/30 bg-black flex items-center justify-center relative ${isCurrentlyPlaying && isSelectedAudio ? 'animate-spin [animation-duration:5s]' : ''}`}>
              <div className="w-4 h-4 rounded-full border border-gray-600/50 bg-black flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c6a66b]" />
              </div>
              <span className="absolute w-[2px] h-[5px] bg-gray-500 top-1 left-4" />
              <span className="absolute w-[2px] h-[5px] bg-gray-500 bottom-1 left-4" />
            </div>
          </div>

          {/* Top category tags */}
          <div className="absolute top-3 right-3 left-3 flex justify-between items-center z-20">
            <span className="px-2.5 py-0.5 rounded bg-blue-500/25 border border-blue-500/20 text-[9px] font-black text-blue-400 backdrop-blur-md">
              تسجيل صوتي
            </span>
            <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono font-bold text-white backdrop-blur-md">
              {item.year} م
            </span>
          </div>
        </div>

        {/* Info area */}
        <div className="p-4 space-y-2 text-right">
          <span className="text-[9px] text-[#c6a66b] font-bold block">{item.source}</span>
          <h3 className="text-sm font-black text-white hover:text-blue-400 transition-colors leading-relaxed line-clamp-1">
            {item.title}
          </h3>
          <p className="text-[11px] text-gray-500 font-bold leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>

      {/* Button play trigger */}
      <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-2.5">
        <span className="text-[9px] text-gray-400 font-bold font-mono">المدة: {item.duration || '03:45'}</span>
        
        {onPlayAudio && (
          <button
            onClick={() => onPlayAudio(item)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              isSelectedAudio
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-xl hover:scale-[1.02]'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isSelectedAudio && isCurrentlyPlaying ? (
              <>
                <Pause size={12} fill="currentColor" />
                <span>قيد الاستماع</span>
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" />
                <span>استماع للثورة</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
