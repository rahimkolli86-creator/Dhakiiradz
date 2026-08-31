import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Users, Swords, Camera, FileText } from 'lucide-react';
import { WilayaData } from '../data/wilayas';
import WilayaStats from './WilayaStats';
import MartyrCard from './MartyrCard';
import BattleTimeline from './BattleTimeline';
import HistoricalGallery from './HistoricalGallery';
import ArchiveViewer from './ArchiveViewer';

interface WilayaPanelProps {
  wilaya: WilayaData | null;
  onClose: () => void;
}

const WilayaPanel: React.FC<WilayaPanelProps> = ({ wilaya, onClose }) => {
  if (!wilaya) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 h-screen w-full lg:w-[600px] bg-[#0a0a0a] z-[100] shadow-[-50px_0_100px_rgba(0,0,0,0.8)] border-l border-white/5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      dir="rtl"
    >
      {/* Header Image/Overlay */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <img 
          src={`image/Larbi.jpg/${wilaya.id}/1200/800?grayscale`} 
          alt={wilaya.name}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-[#e11d48] transition-all z-20 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>

        <div className="absolute bottom-8 right-12 text-right">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-black text-white mb-2 leading-none"
          >
            {wilaya.arabicName}
          </motion.h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-[1px] bg-brand-green" />
            <span className="text-brand-green text-xs font-bold uppercase tracking-[0.3em]">{wilaya.name} ARCHIVE</span>
          </div>
        </div>
      </div>

      <div className="px-8 lg:px-12 py-12 space-y-16">
        
        {/* Overview Side-by-Side */}
        <section>
          <div className="grid grid-cols-1 gap-8">
            <div className="text-right">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                <BookOpen size={14} className="text-[#c6a66b]" /> نظرة عامة
              </h3>
              <p className="text-white text-2xl font-black mb-6 leading-tight italic font-serif">
                "{wilaya.description}"
              </p>
              <p className="text-gray-400 text-lg leading-loose border-r-2 border-brand-green/20 pr-6">
                {wilaya.historicalOverview}
              </p>
            </div>
            
            <WilayaStats count={wilaya.martyrsCount} />
          </div>
        </section>

        {/* Leaders Section */}
        <section>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
            <Users size={14} className="text-[#c6a66b]" /> شخصيات ثورية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {wilaya.leaders.map((leader, i) => (
               <MartyrCard key={i} name={leader.name} role={leader.role} />
             ))}
          </div>
        </section>

        {/* Battles Section */}
        <section>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
            <Swords size={14} className="text-[#c6a66b]" /> سجل المعارك والاشتباكات
          </h3>
          <BattleTimeline battles={wilaya.battles} />
        </section>

        {/* Gallery Section */}
        <section>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
            <Camera size={14} className="text-[#c6a66b]" /> الأرشيف الصوري
          </h3>
          <HistoricalGallery photos={wilaya.archives} />
        </section>

        {/* Documents Section */}
        <section className="pb-24">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
            <FileText size={14} className="text-[#c6a66b]" /> وثائق تاريخية
          </h3>
          <ArchiveViewer documents={wilaya.historicalDocuments} />
        </section>

      </div>

      {/* Background Cinematic Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
    </motion.div>
  );
};

export default WilayaPanel;
