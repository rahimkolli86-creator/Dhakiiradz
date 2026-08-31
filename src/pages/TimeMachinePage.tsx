import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { eras } from '../data/eras';
import { 
  EraHero, 
  TimeLineSelector, 
  EraMapContext, 
  EraCharacters, 
  EraArchive 
} from '../components/timemachine/EraSections';

const TimeMachinePage = () => {
  const [selectedEraId, setSelectedEraId] = useState(eras[2].id); // Default to 1954
  const selectedEra = eras.find(e => e.id === selectedEraId) || eras[2];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedEraId]);

  return (
    <div className="bg-[#050505] min-h-screen pb-48 selection:bg-brand-green selection:text-white">
      {/* Immersive Scanline Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
      
      <AnimatePresence mode="wait">
        <motion.div
           key={selectedEraId}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.8 }}
        >
          <EraHero era={selectedEra} />
          
          <div className="relative z-10">
            <EraMapContext era={selectedEra} />
            <EraCharacters era={selectedEra} />
            <EraArchive era={selectedEra} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Particles Bottom Decor */}
      <div className="fixed bottom-0 left-0 w-full h-64 pointer-events-none overflow-hidden mix-blend-screen opacity-20">
         <div className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[120%] bg-brand-green/10 blur-[150px] rounded-full animate-pulse" />
      </div>

      <TimeLineSelector 
        eras={eras} 
        currentId={selectedEraId} 
        onSelect={setSelectedEraId} 
      />

      {/* Global Background Glow controlled by Era Theme */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-1000 -z-10"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${selectedEra.theme.glow} 0%, transparent 100%)`,
          opacity: 0.15
        }}
      />
    </div>
  );
};

export default TimeMachinePage;
