import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const loadingTexts = [
  "جارٍ استعادة الذاكرة الوطنية...",
  "فتح الأرشيف التاريخي...",
  "تحميل الوثائق الثورية...",
  "جارٍ استكشاف ذاكرة الشهداء...",
  "تأمين سجلات نوفمبر...",
];

const ArchiveLoader = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-12 pt-12">
      {/* Cinematic Pulse / Scan Effect */}
      <div className="relative w-48 h-1 flex items-center justify-center">
        {/* Background Bar */}
        <div className="absolute inset-0 bg-white/5 rounded-full overflow-hidden" />
        
        {/* Progress Bar */}
        <motion.div 
          initial={{ left: '-100%' }}
          animate={{ left: '100%' }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-brand-green to-transparent"
        />

        {/* Glow Pulses */}
        <motion.div 
          animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-8 bg-brand-green/20 blur-[30px] rounded-full"
        />
      </div>

      {/* Cycling Text */}
      <div className="h-6 overflow-hidden flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={textIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] md:text-xs font-mono font-bold text-gray-500 uppercase tracking-[0.3em]"
          >
            {loadingTexts[textIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      
      {/* Historical Identification Markings */}
      <div className="flex gap-4 opacity-20">
        {[1, 2, 3].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            className="w-1 h-3 bg-white"
          />
        ))}
      </div>
    </div>
  );
};

export default ArchiveLoader;
