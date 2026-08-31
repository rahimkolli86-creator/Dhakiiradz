import React from 'react';
import { motion } from 'motion/react';

const ContributionHero = () => {
  return (
    <div className="text-center mb-16 lg:mb-24" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-brand-green/30 bg-brand-green/5 text-brand-green text-[10px] font-bold uppercase tracking-[0.4em] mb-8">نداء الأجيال</span>
        
        <h2 className="text-5xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tighter">
          ساهم في حفظ <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-green to-brand-hover drop-shadow-[0_0_30px_rgba(31,95,58,0.4)]">الذاكرة الوطنية</span>
        </h2>
        
        <p className="text-xl lg:text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed italic">
          "شارك صورًا ووثائق وشهادات تاريخية للمساهمة في توثيق تاريخ الجزائر للأجيال القادمة. كل وثيقة هي لبنة في بناء هويتنا."
        </p>
      </motion.div>
      
      {/* Cinematic Pulse Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full -z-10 opacity-20">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-brand-green blur-[150px] rounded-full opacity-30"
        />
      </div>
    </div>
  );
};

export default ContributionHero;
