import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Map as MapIcon, Play, History, Globe } from 'lucide-react';
import { MAP_PATHS } from '../constants/MAP_PATHS';
import PreSoummamMap from './PreSoummamMap';

const MapSection = () => {
  const navigate = useNavigate();
  const [mapMode, setMapMode] = useState<'modern' | 'revolutionary'>('modern');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [hoveredRegion, setHoveredRegion] = useState<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleRegionClick = (region: any) => {
    setSelectedRegion(region);
  };

  const handleExploreClick = () => {
    if (selectedRegion) {
      const digits = selectedRegion.id.replace(/[^0-9]/g, '');
      const padded = digits.length === 1 ? `0${digits}` : digits;
      const targetId = padded ? `DZ-${padded}` : selectedRegion.id;
      navigate(`/wilaya/${targetId}`);
    }
  };

  return (
    <section className="py-24 px-6 lg:px-32 bg-[#050505] relative overflow-hidden" onMouseMove={handleMouseMove} id="map-section">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-green/5 blur-[120px] -z-10" />
      
      {/* Map Mode Toggle */}
      <div className="flex justify-center mb-16 relative z-20" dir="rtl">
        <div className="bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl flex items-center gap-1">
          <button 
            onClick={() => {
              setMapMode('modern');
              setSelectedRegion(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all ${mapMode === 'modern' ? 'bg-brand-green text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <Globe size={14} />
            <span>التقسيم الإداري (ولايات)</span>
          </button>
          <button 
            onClick={() => {
              setMapMode('revolutionary');
              setSelectedRegion(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all ${mapMode === 'revolutionary' ? 'bg-[#e11d48] text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <History size={14} />
            <span>المناطق الثورية (قبل 1956)</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mapMode === 'modern' ? (
          <motion.div 
            key="modern-map"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row-reverse gap-16 items-center"
          >
            {/* Right: SVG Map */}
            <div className="w-full lg:w-3/5 flex justify-center relative group isolate">
              <svg 
                viewBox="0 0 1000 1000" 
                className="w-full max-w-[800px] h-auto filter drop-shadow-[0_0_50px_rgba(31,95,58,0.1)]"
                style={{ direction: 'ltr' }}
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <g id="features">
                  {MAP_PATHS.map((region) => (
                    <motion.path
                      key={region.id}
                      d={region.d}
                      id={region.id}
                      fill={selectedRegion?.id === region.id ? '#1f5f3a' : '#1a1a1a'}
                      className="cursor-pointer outline-none transition-colors duration-300"
                      animate={{
                        scale: hoveredRegion?.id === region.id ? 1.02 : 1,
                        stroke: hoveredRegion?.id === region.id ? '#6f9c76' : 'rgba(255,255,255,0.2)',
                        strokeWidth: hoveredRegion?.id === region.id ? 1.5 : 0.5,
                        strokeOpacity: hoveredRegion?.id === region.id ? [0.4, 1, 0.4] : 1,
                        zIndex: hoveredRegion?.id === region.id ? 50 : 1,
                        fill: selectedRegion?.id === region.id || hoveredRegion?.id === region.id ? '#1f5f3a' : '#1a1a1a'
                      }}
                      transition={{
                        strokeOpacity: { 
                          repeat: hoveredRegion?.id === region.id ? Infinity : 0, 
                          duration: 1.5 
                        },
                        default: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
                      }}
                      onMouseEnter={() => setHoveredRegion(region)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => handleRegionClick(region)}
                      style={{ transformOrigin: 'center center' }}
                    />
                  ))}
                </g>
              </svg>

              {/* Mouse Follow Tooltip */}
              <AnimatePresence>
                {hoveredRegion && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    style={{ 
                      left: mousePos.x + 20, 
                      top: mousePos.y - 40,
                      position: 'fixed',
                      pointerEvents: 'none',
                      zIndex: 300
                    }}
                    className="bg-black/95 border border-brand-green/40 px-5 py-2.5 rounded-xl backdrop-blur-xl shadow-2xl flex items-center gap-3 border-b-brand-green"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_10px_rgba(31,95,58,1)]" />
                    <span className="text-white text-sm font-bold tracking-tight whitespace-nowrap text-right">{hoveredRegion.name}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Left: Info Panel */}
            <div className="w-full lg:w-2/5 text-right flex flex-col items-center lg:items-end">
              <div className="flex items-center justify-end gap-3 mb-6">
                <span className="text-brand-green text-xs font-bold uppercase tracking-widest">خريطة تفاعلية</span>
                <div className="w-8 h-[1px] bg-brand-green/30"></div>
              </div>
              <h2 className="text-4xl font-bold text-white mb-8 font-display leading-tight text-center lg:text-right">استكشف التاريخ عبر <br/> <span className="text-brand-green">خريطة الجزائر</span></h2>
              
              <div className="w-full min-h-[400px] relative">
                <AnimatePresence mode="wait">
                  {selectedRegion ? (
                    <motion.div 
                      key={selectedRegion.id}
                      initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                      transition={{ duration: 0.5 }}
                      className="p-8 bg-white/5 border border-brand-green/20 rounded-2xl backdrop-blur-xl relative overflow-hidden group/panel h-full"
                    >
                      <div className="absolute top-0 right-0 w-1 h-full bg-brand-green/50" />
                      
                      <div className="flex items-center justify-end gap-3 mb-4">
                        <h3 className="text-3xl font-black text-brand-green">{selectedRegion.name}</h3>
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(31,95,58,1)]" />
                      </div>
                      
                      <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden border border-white/10 group/img">
                        <img 
                          src={`https://picsum.photos/seed/${selectedRegion.id}/800/450?grayscale`} 
                          alt={selectedRegion.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-3 right-4">
                          <span className="text-[10px] text-white/50 font-mono uppercase tracking-[0.2em]">وثيقة تاريخية - المنطقة {selectedRegion.id.replace('DZ', '')}</span>
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold text-white mb-2 text-right">
                        {selectedRegion.event}
                      </h4>
                      
                      <div className="flex items-center justify-end gap-2 mb-6 opacity-60">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">الحدث التاريخي</span>
                        <div className="w-4 h-[1px] bg-brand-green/30" />
                      </div>

                      <div className="space-y-4 mb-10 text-right">
                        <h5 className="text-xs font-bold text-white/40 uppercase tracking-widest">الدور التاريخي للولاية</h5>
                        <p className="text-gray-300 text-base leading-loose">
                          {selectedRegion.desc}
                        </p>
                      </div>
                      
                      <button 
                        onClick={handleExploreClick}
                        className="flex ml-auto items-center gap-4 py-4 px-8 rounded-full bg-brand-green text-white font-black text-sm group hover:bg-brand-hover transition-all shadow-lg"
                      >
                         <span>استكشف سجل الولاية</span>
                         <Play size={14} className="rotate-180 fill-white group-hover:translate-x-[-4px] transition-transform" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-12 border border-dashed border-white/10 rounded-2xl bg-white/[0.01] flex flex-col items-center justify-center text-center h-[400px]"
                    >
                       <div className="w-20 h-20 rounded-full border border-brand-green/20 flex items-center justify-center mb-8 text-brand-green/40 bg-brand-green/5">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <MapIcon size={32} />
                          </motion.div>
                       </div>
                       <h3 className="text-white font-bold text-lg mb-2">اختر ولاية من الخريطة</h3>
                       <p className="text-gray-500 text-sm max-w-[200px] leading-relaxed">تصفح تاريخ 58 ولاية جزائرية ومساهمتها في الثورة المجيدة</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revolutionary-map"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
          >
            <PreSoummamMap />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MapSection;
