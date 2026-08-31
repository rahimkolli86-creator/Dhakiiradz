import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { preSoummamRegions, PreSoummamRegion } from '../data/preSoummamRegions';
import HistoricalTooltip from './HistoricalTooltip';
import MapRegionCard from './MapRegionCard';
import RevolutionaryLegend from './RevolutionaryLegend';
import { MAP_PATHS } from '../constants/MAP_PATHS';
import { fetchAllWilayas } from '/src/services/wilayasService';

// Mapping legacy SVG paths to 1954-1956 Revolutionary Zones
const ZONE_MAPPING: Record<string, string> = {
  // Zone 1: Aurès
  'DZ-05': 'zone-1', //Batna
  'DZ-40': 'zone-1', //// Khenchela
  'DZ-12': 'zone-1', // Tébessa
  'DZ-07': 'zone-1', // Biskra
  'DZ-04': 'zone-1', // Oum El Bouaghi
  
  // Zone 2: Nord-Constantinois
  'DZ-25': 'zone-2', // Constantine
  'DZ-21': 'zone-2', // Skikda
  'DZ-18': 'zone-2', // Jijel
  'DZ-23': 'zone-2', // Annaba
  'DZ-24': 'zone-2', // Guelma
  'DZ-36': 'zone-2', // El Tarf
  'DZ-43': 'zone-2', // Mila
  'DZ-41': 'zone-2', // Souk Ahras

  // Zone 3: Kabylie
  'DZ-15': 'zone-3', // Tizi Ouzou
  'DZ-06': 'zone-3', // Bejaia
  'DZ-10': 'zone-3', // Bouira

  // Zone 4: Alger
  'DZ-16': 'zone-4', // Algiers
  'DZ-09': 'zone-4', // Blida
  'DZ-26': 'zone-4', // Medea
  'DZ-42': 'zone-4', // Tipaza
  'DZ-44': 'zone-4', // Ain Defla
  'DZ-35': 'zone-4', // Boumerdes

  // Zone 5: Oranie
  'DZ-31': 'zone-4', // Oran -> Zone 5
  'DZ-13': 'zone-5', // Tlemcen
  'DZ-22': 'zone-5', // Sidi Bel Abbes
  'DZ-29': 'zone-5', // Mascara
  'DZ-27': 'zone-5', // Mostaganem
  'DZ-02': 'zone-5', // Chlef
  'DZ-48': 'zone-5', // Relizane
  'DZ-20': 'zone-5', // Saida
  'DZ-38': 'zone-5', // Tissemsilt
  'DZ-14': 'zone-5', // Tiaret
  'DZ-46': 'zone-5', // Ain Temouchent

  // Sahara (Largely unexplored/under influence of Z1 and Z5 before 1956)
  'DZ-30': 'zone-1', // Ouargla (influence)
  'DZ-01': 'zone-5', // Adrar (influence)
};

// Override Oran mapping (fixed typo above)
ZONE_MAPPING['DZ-31'] = 'zone-5';

const PreSoummamMap = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [wilayas, setWilayas] = useState<any[]>([]);
const [loadingWilayas, setLoadingWilayas] = useState(true);

useEffect(() => {
  const loadWilayas = async () => {
    try {
      const data = await fetchAllWilayas();
      setWilayas(data);
    } catch (error) {
      console.error('Failed to load wilayas from Supabase:', error);
    } finally {
      setLoadingWilayas(false);
    }
  };

  loadWilayas();
}, []);
  const selectedRegion = preSoummamRegions.find(r => r.id === selectedRegionId);
  const hoveredRegion = preSoummamRegions.find(r => r.id === hoveredRegionId);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      className="relative py-24 px-8 lg:px-32 bg-[#050505] overflow-hidden" 
      dir="rtl"
      onMouseMove={handleMouseMove}
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-[150px] -z-10 rounded-full" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Map Area */}
          <div className="w-full lg:w-3/5 relative">
            <div className="mb-12">
              <span className="text-brand-green text-xs font-bold uppercase tracking-[0.3em] mb-4 block">الخارطة الثورية الأولى</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tighter">
                الجزائر قبل <span className="text-[#e11d48]">مؤتمر الصومام</span>
              </h2>
              <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">Technological Archive: 1954 — 1956</p>
            </div>

            <div className="relative group p-4 border border-white/5 rounded-3xl bg-white/[0.02] backdrop-blur-sm">
               <svg 
                viewBox="0 0 1000 1000" 
                className="w-full h-auto drop-shadow-[0_0_30px_rgba(31,95,58,0.2)]"
                style={{ direction: 'ltr' }}
              >
                <g>
                  {MAP_PATHS.map((path) => {
                    const zoneId = ZONE_MAPPING[path.id];
                    const isHovered = hoveredRegionId === zoneId;
                    const isSelected = selectedRegionId === zoneId;
                    
                    return (
                      <motion.path
                        key={path.id}
                        d={path.d}
                        fill={isSelected ? '#1f5f3a' : (isHovered ? '#2a744a' : (zoneId ? '#1a1a1a' : '#0d0d0d'))}
                        stroke={isHovered ? '#6f9c76' : 'rgba(255,255,255,0.05)'}
                        strokeWidth={isHovered ? 2 : 0.5}
                        className="cursor-pointer transition-colors duration-500"
                        animate={{
                          fill: isSelected ? '#1f5f3a' : (isHovered ? '#2a744a' : (zoneId ? '#1a1a1a' : '#0d0d0d')),
                          stroke: isHovered ? '#6f9c76' : 'rgba(255,255,255,0.1)',
                          scale: isHovered ? 1.01 : 1,
                        }}
                        onMouseEnter={() => zoneId && setHoveredRegionId(zoneId)}
                        onMouseLeave={() => setHoveredRegionId(null)}
                        onClick={() => zoneId && setSelectedRegionId(zoneId)}
                        style={{ transformOrigin: 'center center' }}
                      />
                    );
                  })}
                </g>
              </svg>

              <AnimatePresence>
                {hoveredRegion && (
                  <HistoricalTooltip 
                    name={hoveredRegion.name} 
                    leader={hoveredRegion.leader}
                    x={mousePos.x} 
                    y={mousePos.y} 
                  />
                )}
              </AnimatePresence>
            </div>
            
            <RevolutionaryLegend />
          </div>

          {/* Info Panel */}
          <div className="w-full lg:w-2/5 sticky top-32">
            <AnimatePresence mode="wait">
              {selectedRegion ? (
                <MapRegionCard key={selectedRegionId} region={selectedRegion} />
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[600px] border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-green/5 border border-brand-green/20 flex items-center justify-center mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/FLN_Logo.png/960px-FLN_Logo.png" className="w-10 h-10 opacity-30 grayscale" alt="FLN" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">اختر منطقة ثورية</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">تصفح التقسيم العسكري الأول للثورة الجزائرية قبل إعادة التنظيم في مؤتمر الصومام 1956.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreSoummamMap;
