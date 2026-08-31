import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Map as MapIcon, History, Search } from 'lucide-react';
import { wilayasData } from '../data/wilayas';
import MartyrsMap from '../components/MartyrsMap';
import WilayaPanel from '../components/WilayaPanel';

const NationalMartyrsMap = () => {
  const [selectedWilayaId, setSelectedWilayaId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedWilaya = wilayasData.find(w => w.id === selectedWilayaId) || null;

  const filteredWilayas = wilayasData.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.arabicName.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 relative overflow-hidden" dir="rtl">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-green/5 blur-[200px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#e11d48]/5 blur-[200px] rounded-full -z-10" />

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="text-right">
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center justify-end gap-3 mb-4"
             >
                <div className="w-10 h-[1px] bg-brand-green" />
                <span className="text-brand-green text-xs font-bold uppercase tracking-[0.4em]">الموسوعة الوطنية للتاريخ</span>
             </motion.div>
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-5xl lg:text-7xl font-black text-white leading-tight mb-4 tracking-tighter"
             >
               خريطة <span className="text-[#c6a66b]">الشهداء</span> الوطنية
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="text-gray-500 text-lg max-w-2xl font-medium leading-relaxed"
             >
               سجل رقمي تفاعلي يوثق تضحيات الشعب الجزائري عبر مختلف الولايات، مستحضراً بطولات الشهداء وأهم المعارك التاريخية التي شكلت مسار الثورة التحريرية.
             </motion.p>
          </div>

          {/* Search/Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full lg:w-96 relative group"
          >
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-green transition-colors" size={20} />
            <input 
              type="text"
              placeholder="ابحث عن ولاية أو منطقة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pr-16 pl-8 text-white focus:outline-none focus:border-brand-green/50 focus:bg-white/[0.08] transition-all text-right font-bold"
            />
          </motion.div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 flex-1">
          {/* Map Region */}
          <div className="w-full lg:w-3/4 bg-white/[0.01] border border-white/5 rounded-[40px] relative overflow-hidden backdrop-blur-sm group">
            <div className="absolute top-8 right-10 flex items-center gap-4 z-10">
               <div className="flex flex-col items-end">
                  <span className="text-white font-bold">نمط العرض: أطلس تاريخي</span>
                  <span className="text-[10px] text-brand-green font-mono tracking-widest uppercase">Active Operations Map</span>
               </div>
               <div className="p-3 bg-brand-green/10 rounded-2xl border border-brand-green/20">
                  <MapIcon className="text-brand-green" size={24} />
               </div>
            </div>

            <MartyrsMap onWilayaSelect={setSelectedWilayaId} selectedId={selectedWilayaId} />
            
            {/* Map Decorative Elements */}
            <div className="absolute top-[20%] left-10 pointer-events-none">
               <div className="flex flex-col items-start gap-1">
                  <span className="text-[9px] text-white/20 font-mono tracking-[0.5em] uppercase rotate-90 origin-left">Archive Ref: ALG-1954</span>
               </div>
            </div>
          </div>

          {/* Side List (Desktop Only) */}
          <div className="hidden lg:flex w-1/4 flex-col gap-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] px-4 flex items-center justify-between">
              <span>المناطق الموثقة</span>
              <History size={14} />
            </h3>
            <div className="flex flex-col gap-3">
              {filteredWilayas.map((wilaya) => (
                <button
                  key={wilaya.id}
                  onClick={() => setSelectedWilayaId(wilaya.id)}
                  className={`p-6 rounded-3xl border transition-all text-right relative overflow-hidden group ${
                    selectedWilayaId === wilaya.id 
                    ? 'bg-brand-green/10 border-brand-green/40 shadow-[0_10px_30px_rgba(31,95,58,0.2)]' 
                    : 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-white/10'
                  }`}
                >
                  <div className="flex flex-col gap-1 relative z-10">
                    <span className="text-white font-black text-xl">{wilaya.arabicName}</span>
                    <span className={`text-xs font-bold ${selectedWilayaId === wilaya.id ? 'text-brand-green' : 'text-gray-500'}`}>
                      {wilaya.martyrsCount.toLocaleString()} شهيد
                    </span>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-1 h-3/4 transition-all duration-500 ${selectedWilayaId === wilaya.id ? 'bg-brand-green' : 'bg-transparent group-hover:bg-brand-green/30'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel Overlay */}
      <AnimatePresence>
        {selectedWilaya && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWilayaId(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]" 
            />
            <WilayaPanel wilaya={selectedWilaya} onClose={() => setSelectedWilayaId(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NationalMartyrsMap;
