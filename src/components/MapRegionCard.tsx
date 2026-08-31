import React from 'react';
import { motion } from 'motion/react';
import { PreSoummamRegion } from '../data/preSoummamRegions';
import { Shield, Swords, Users, Archive } from 'lucide-react';

interface MapRegionCardProps {
  region: PreSoummamRegion;
}

const MapRegionCard: React.FC<MapRegionCardProps> = ({ region }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="p-8 lg:p-10 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-2xl relative overflow-hidden group shadow-2xl h-full border-r-brand-green border-r-4"
      dir="rtl"
    >
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-green/[0.05] to-transparent pointer-events-none" />
      
      {/* Decorative Stamp */}
      <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-brand-green/20 rounded-full flex items-center justify-center rotate-[-15deg] opacity-20 pointer-events-none">
         <span className="text-[10px] font-black text-brand-green uppercase tracking-tighter text-center">أرشيف سري<br/>1954 - 1956</span>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-brand-green/10 rounded-2xl border border-brand-green/20">
            <Shield className="text-brand-green" size={28} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-white mb-1">{region.name}</h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
              <span className="text-brand-green text-xs font-bold uppercase tracking-widest leading-none">القائد: {region.leader}</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* General Description */}
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Archive size={12} /> السياق التاريخي
            </h4>
            <p className="text-gray-300 text-lg leading-loose italic font-serif">
              "{region.description}"
            </p>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed border-r-2 border-brand-green/20 pr-4">
              {region.historicalContext}
            </p>
          </div>

          {/* Operational Details */}
          <div className="grid grid-cols-1 gap-6">
            <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
              <h5 className="text-[10px] font-bold text-brand-green uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                <Swords size={12} /> أهم المعارك
              </h5>
              <div className="flex flex-wrap gap-2">
                {region.battles.map((battle, i) => (
                  <span key={i} className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/80">
                    {battle}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
              <h5 className="text-[10px] font-bold text-[#e11d48] uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                <Users size={12} /> من شهداء المنطقة
              </h5>
              <div className="flex flex-wrap gap-2">
                {region.martyrs.map((martyr, i) => (
                  <span key={i} className="text-xs bg-[#e11d48]/5 border border-[#e11d48]/20 px-3 py-1.5 rounded-full text-[#e11d48]">
                    {martyr}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/5">
             <div className="flex items-center gap-2 text-gray-500 text-[10px] font-mono tracking-widest uppercase">
               <div className="w-1 h-1 bg-gray-500 rounded-full" />
               Operational Territory: {region.operationalTerritory}
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapRegionCard;
