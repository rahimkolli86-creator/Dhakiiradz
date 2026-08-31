import React from 'react';
import { motion } from 'motion/react';
import ContributionHero from './ContributionHero';
import WhatsAppContributionButton from './WhatsAppContributionButton';
import ContributionNotice from './ContributionNotice';

const ArchiveContribution = () => {
  return (
    <section className="relative py-32 lg:py-48 px-8 lg:px-32 overflow-hidden bg-[#050505]">
      {/* Immersive Background Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay z-0 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-0" />
      
      {/* Subtle Floating Dust Particles Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              scale: [0.5, 1, 0.5],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * -400]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute bottom-0 w-1 h-1 bg-white rounded-full blur-[1px]"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <ContributionHero />
        
        <div className="flex flex-col items-center gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <WhatsAppContributionButton phoneNumber="+213659521442" />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl" dir="rtl">
             <ContributionType icon="🖼️" label="صور تاريخية" />
             <ContributionType icon="📜" label="وثائق ثورية" />
             <ContributionType icon="🎙️" label="شهادات حية" />
             <ContributionType icon="📓" label="مذكرات خاصة" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <ContributionNotice />
        </motion.div>
      </div>
      
      {/* Decorative Border Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />
    </section>
  );
};

const ContributionType = ({ icon, label }: { icon: string, label: string }) => (
  <div className="flex flex-col items-center gap-4 group">
    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:bg-brand-green/10 group-hover:border-brand-green/30 group-hover:scale-110 transition-all shadow-xl">
      {icon}
    </div>
    <span className="text-sm font-bold text-gray-500 group-hover:text-white transition-colors">{label}</span>
  </div>
);

export default ArchiveContribution;
