import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users, BookOpen, Map as MapIcon, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Era } from '../../data/eras';

// --- Era Hero ---
export const EraHero = ({ era }: { era: Era }) => (
  <section className="relative h-[85vh] flex items-end justify-start px-8 lg:px-32 pb-24 overflow-hidden">
    <AnimatePresence mode="wait">
      <motion.div
        key={era.id}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src={era.background} 
          className={`absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3] contrast-[1.1]`} 
          alt={era.title} 
        />
        <div className={`absolute inset-0 ${era.theme.overlay}`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        
        {/* Atmospheric Effect Base */}
        <div className="absolute inset-0 pointer-events-none">
          {era.theme.atmosphere === 'dust' && (
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 mix-blend-screen" />
          )}
          {era.theme.atmosphere === 'fog' && (
             <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent blur-3xl opacity-20" />
          )}
          {era.theme.atmosphere === 'grain' && (
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')] opacity-20 mix-blend-multiply" />
          )}
        </div>
      </motion.div>
    </AnimatePresence>

    <div className="relative z-10 max-w-4xl" dir="rtl">
      <motion.div
        key={era.id + "_content"}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="flex items-center gap-4 mb-6">
           <Zap className="text-brand-green" size={24} />
           <span className="text-brand-green font-black uppercase tracking-[0.4em] text-sm" style={{ color: era.theme.glow }}>سجل الحقب التاريخية</span>
           <div className="h-[1px] flex-1 bg-white/10"></div>
        </div>
        <h1 className="text-5xl lg:text-8xl font-black text-white mb-6 leading-tight">
          {era.year} <span className="text-white/40 block text-4xl lg:text-6xl mt-2">{era.title}</span>
        </h1>
        <p className="text-xl lg:text-2xl text-white/70 font-medium mb-8 max-w-2xl border-r-4 pr-6" style={{ borderColor: era.theme.glow }}>
          {era.subtitle}
        </p>
        <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">
          {era.description}
        </p>
      </motion.div>
    </div>
  </section>
);

// --- Era Selector (Timeline) ---
export const TimeLineSelector = ({ eras, currentId, onSelect }: { eras: Era[], currentId: string, onSelect: (id: string) => void }) => (
  <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl px-8" dir="rtl">
    <div className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full p-2 flex items-center justify-between shadow-2xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      {eras.map((era) => (
        <button
          key={era.id}
          onClick={() => onSelect(era.id)}
          className={`relative z-10 py-3 px-6 lg:px-10 rounded-full text-sm font-black transition-all flex flex-col items-center gap-1 ${
            currentId === era.id 
            ? 'bg-white text-black scale-105' 
            : 'text-gray-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="text-[10px] opacity-60 font-mono tracking-tighter">{era.year}</span>
          <span className="whitespace-nowrap hidden sm:block">{era.title.split(' ')[0]}...</span>
        </button>
      ))}
    </div>
  </div>
);

// --- Era Map Context ---
export const EraMapContext = ({ era }: { era: Era }) => (
  <section className="py-24 px-8 lg:px-32 bg-[#080808]/50" dir="rtl">
    <div className="flex items-center gap-4 mb-16">
       <MapIcon className="text-brand-green" size={32} />
       <h2 className="text-3xl font-black text-white">الخارطة الجيوسياسية للحقبة</h2>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
       <div className="lg:col-span-2 relative aspect-video bg-black/40 rounded-3xl border border-white/5 overflow-hidden group">
          <img 
            src={era.archive.find(a => a.type === 'map')?.url || "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&h=800&fit=crop"} 
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen group-hover:scale-105 transition-transform duration-[10s]"
            alt="Era Map"
          />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
       </div>
       
       <div className="space-y-8">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4 uppercase tracking-widest text-[#e11d48]">أهم الأحداث الميدانية</h3>
          {era.events.map((event, idx) => (
            <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-brand-green/30 transition-colors">
               <span className="text-xs font-mono text-brand-green/50 mb-2 block">EVENT_{idx + 1}</span>
               <h4 className="text-lg font-black text-white mb-2">{event.title}</h4>
               <p className="text-sm text-gray-500 leading-relaxed">{event.description}</p>
            </div>
          ))}
       </div>
    </div>
  </section>
);

// --- Era Characters ---
export const EraCharacters = ({ era }: { era: Era }) => (
  <section className="py-24 px-8 lg:px-32" dir="rtl">
    <div className="flex items-center gap-4 mb-16">
       <Users className="text-brand-green" size={32} />
       <h2 className="text-3xl font-black text-white">قادة ورموز هذه الفترة</h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {era.characters.map((char, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -10 }}
          className="group relative h-[450px] rounded-2xl overflow-hidden border border-white/5 bg-[#0b0b0b]"
        >
          <img src={char.image} className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110 brightness-50 group-hover:brightness-100" alt={char.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 p-8 w-full text-right">
             <p className="text-brand-green font-bold text-xs mb-2 tracking-widest">{char.role}</p>
             <h3 className="text-2xl font-black text-white">{char.name}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// --- Era Archive ---
export const EraArchive = ({ era }: { era: Era }) => (
  <section className="py-24 px-8 lg:px-32 bg-[#080808]/50" dir="rtl">
    <div className="flex items-center gap-4 mb-16">
       <BookOpen className="text-brand-green" size={32} />
       <h2 className="text-3xl font-black text-white">أرشيف الحقبة</h2>
    </div>
    
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {era.archive.map((item, idx) => (
        <div key={idx} className="group relative break-inside-avoid rounded-2xl overflow-hidden border border-white/5 bg-[#0b0b0b]">
           <img src={item.url} className="w-full h-auto grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={item.title} />
           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-black text-lg p-4 text-center">{item.title}</span>
           </div>
        </div>
      ))}
    </div>
  </section>
);
