import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Shield, Radio, Map as MapIcon, 
  Terminal, Activity, Clock, ChevronLeft, 
  X, Play, Lock, AlertCircle, Zap
} from 'lucide-react';
import { operations, Operation } from '../data/operations';

// --- Typewriter Effect Component ---
const TypewriterText = ({ text, delay = 50 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

// --- Intelligence Panel ---
const IntelligencePanel = () => (
  <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 space-y-8" dir="rtl">
    <div className="flex items-center justify-between border-b border-white/5 pb-4">
      <div className="flex items-center gap-3">
        <Activity size={18} className="text-brand-green animate-pulse" />
        <span className="text-xs font-mono font-black text-white uppercase tracking-widest">تحليل البيانات</span>
      </div>
      <div className="text-[10px] font-mono text-gray-500">LIVE FEED: OPS/SEC</div>
    </div>

    <div className="space-y-4">
      {[
        { label: "المناطق النشطة", value: "الولاية 1, 2, 3", color: "text-brand-green" },
        { label: "مستوى التهديد", value: "مرتفع جداً", color: "text-[#e11d48]" },
        { label: "الاتصالات", value: "مشفرة (RSA-8)", color: "text-blue-400" },
      ].map((item, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-bold">{item.label}</span>
          <span className={`text-xs font-black ${item.color}`}>{item.value}</span>
        </div>
      ))}
    </div>

    <div className="pt-4">
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "75%" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="h-full bg-brand-green shadow-[0_0_10px_rgba(31,95,58,0.5)]"
        />
      </div>
      <div className="mt-2 text-[9px] font-mono text-gray-600 text-center">CORE SYSTEM READY</div>
    </div>
  </div>
);

// --- Operations Timeline ---
const OperationsTimeline = () => (
  <div className="p-8 bg-[#0b0b0b]/60 backdrop-blur-md rounded-2xl border border-white/5" dir="rtl">
    <div className="flex items-center gap-3 mb-10">
      <Clock className="text-brand-green" size={20} />
      <h3 className="text-sm font-black text-white uppercase tracking-widest">تاريخ العمليات الكبرى</h3>
    </div>
    
    <div className="space-y-8 relative">
      <div className="absolute top-0 right-3 bottom-0 w-[1px] bg-white/10" />
      {[
        { year: "1954", event: "انطلاق الرصاصة الأولى", desc: "بدء الكفاح المسلح في الأوراس" },
        { year: "1955", event: "هجومات الشمال القسنطيني", desc: "كسر الحصار التاريخي" },
        { year: "1956", event: "مؤتمر الصومام", desc: "تنظيم الهيكل الثوري" }
      ].map((item, idx) => (
        <div key={idx} className="relative pr-10">
          <div className="absolute right-[9px] top-1.5 w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(31,95,58,0.8)]" />
          <span className="text-[10px] font-black text-brand-green block mb-1">{item.year}</span>
          <h4 className="text-sm font-bold text-white mb-1">{item.event}</h4>
          <p className="text-[11px] text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

// --- Radio Archive ---
const RadioArchive = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  
  // Historical Radio Source: Voice of Free Algeria / Sawt al-Jazair al-Hurra
  const RADIO_SOURCE = "voc/Radio.mp3";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="p-8 bg-brand-green/5 border border-brand-green/20 rounded-2xl relative overflow-hidden group" dir="rtl">
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-green/10 blur-3xl rounded-full group-hover:bg-brand-green/20 transition-colors" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <Radio className={`text-brand-green mb-6 ${isPlaying ? 'animate-pulse scale-110' : ''}`} size={48} />
        <h3 className="text-lg font-black text-white mb-2">تسجيلات صوت الجزائر الحرة</h3>
        <p className="text-xs text-gray-500 mb-8 italic">"الإذاعة السرية من قلب معارك التحرير"</p>
        
        <div className="w-full flex flex-col items-center gap-6">
          <button 
            onClick={togglePlay}
            className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all active:scale-95 shadow-lg ${
              isPlaying 
              ? 'bg-[#e11d48]/10 border-[#e11d48]/30 text-[#e11d48]' 
              : 'bg-brand-green/10 border-brand-green/30 text-brand-green hover:bg-brand-green/20'
            }`}
          >
            {isPlaying ? <X size={24} /> : <Play size={24} className="rotate-180 mr-1" />}
          </button>

          <div className="w-full h-12 flex items-end gap-1 px-4">
            {[...Array(24)].map((_, i) => (
              <motion.div 
                key={i}
                className="flex-1 bg-brand-green/30 rounded-t-sm"
                animate={{ 
                  height: isPlaying ? ["20%", "80%", "40%", "95%", "30%"] : "10%" 
                }}
                transition={{ 
                  duration: 0.4 + Math.random(), 
                  repeat: Infinity, 
                  delay: i * 0.05 
                }}
              />
            ))}
          </div>

          <audio 
            ref={audioRef} 
            src={RADIO_SOURCE} 
            onEnded={() => setIsPlaying(false)}
            preload="none"
          />
        </div>

        <div className="mt-8 flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
          <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-gray-600'}`}></div>
          LIVE BROADCAST ARCHIVE
        </div>
      </div>
    </div>
  );
};

// --- Classified Files Grid ---
const ClassifiedFiles = ({ onSelect }: { onSelect: (op: Operation) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
    {operations.map((op) => (
      <motion.div 
        key={op.id}
        whileHover={{ y: -5 }}
        onClick={() => onSelect(op)}
        className="group cursor-pointer"
      >
        <div className="relative p-6 bg-[#0b0b0b] border border-white/5 rounded-2xl overflow-hidden transition-all group-hover:border-brand-green/30">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-green/20 group-hover:bg-brand-green transition-all" />
          
          <div className="flex items-start justify-between mb-8">
            <div className="p-3 bg-white/5 rounded-xl text-gray-500 group-hover:text-brand-green transition-colors">
              <FileText size={24} />
            </div>
            <div className={`px-2 py-1 rounded text-[8px] font-black tracking-widest uppercase border ${
              op.classification === 'TOP_SECRET' ? 'border-[#e11d48]/30 text-[#e11d48]' : 'border-brand-green/30 text-brand-green'
            }`}>
              {op.classification}
            </div>
          </div>

          <h3 className="text-xl font-black text-white mb-2 leading-tight">{op.title}</h3>
          <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-4">{op.codeName}</p>
          
          <div className="flex items-center gap-2 text-xs text-white/40 group-hover:text-white transition-colors">
            <span className="font-mono">{op.date}</span>
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </div>

          {/* Red Stamp Effect */}
          {op.classification === 'TOP_SECRET' && (
            <div className="absolute -bottom-2 -right-2 rotate-[-20deg] border-4 border-[#e11d48]/40 text-[#e11d48]/40 px-3 py-1 font-black rounded opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
              سري للغاية
            </div>
          )}
        </div>
      </motion.div>
    ))}
  </div>
);

// --- Operation Modal ---
const OperationDetailModal = ({ op, onClose }: { op: Operation | null, onClose: () => void }) => (
  <AnimatePresence>
    {op && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-5xl bg-[#080808] border border-white/10 rounded-3xl overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
          dir="rtl"
        >
          <div className="absolute top-0 right-0 w-full h-[300px] pointer-events-none overflow-hidden opacity-50">
             <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-b from-brand-green/20 via-transparent to-transparent blur-[100px]" />
          </div>

          <div className="relative p-8 lg:p-16">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green border border-brand-green/20">
                    <Shield size={32} />
                 </div>
                 <div className="text-right">
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-2">{op.title}</h2>
                    <p className="text-xs text-brand-green font-mono font-black tracking-[0.4em] uppercase">{op.codeName}</p>
                 </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all active:scale-95 border border-white/5"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-6">
                  <h4 className="text-xs font-mono font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">تفاصيل العملية</h4>
                  <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed font-black">
                     <TypewriterText text={op.description} />
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                   <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-brand-green/30 transition-colors">
                      <h5 className="text-brand-green font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Lock size={12} /> الأهداف المنشودة
                      </h5>
                      <p className="text-gray-400 leading-relaxed">{op.objective}</p>
                   </div>
                   <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-brand-green/30 transition-colors">
                      <h5 className="text-brand-green font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Zap size={12} /> النتائج الميدانية
                      </h5>
                      <p className="text-gray-400 leading-relaxed">{op.outcome}</p>
                   </div>
                </div>
              </div>

              <aside className="space-y-8">
                <div className="p-8 bg-[#0b0b0b] rounded-2xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-1 h-full bg-brand-green" />
                  <h4 className="text-white font-bold mb-6 flex items-center justify-end gap-2 text-sm uppercase tracking-widest">
                    بيانات القيادة <Terminal size={14} className="text-brand-green" />
                  </h4>
                  <div className="space-y-6">
                     <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-1">Commander</p>
                        <p className="text-brand-green font-black">{op.commander}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-1">Location</p>
                        <p className="text-white font-bold">{op.location}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-1">Date</p>
                        <p className="text-white font-bold">{op.date}</p>
                     </div>
                  </div>
                </div>

                <div className="p-8 bg-[#e11d48]/5 rounded-2xl border border-[#e11d48]/10 text-center relative group">
                   <div className="absolute top-[-10px] right-[-10px] p-2 bg-[#e11d48] rounded-lg text-white font-black text-[9px] shadow-lg">SECRET</div>
                   <AlertCircle size={32} className="text-[#e11d48] mx-auto mb-4" />
                   <p className="text-xs text-gray-400 italic leading-relaxed">
                     هذه الوثيقة محفوظة في الأرشيف الوطني وتخضع لقانون حماية الذاكرة التاريخية.
                   </p>
                </div>
              </aside>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- MAIN PAGE ---
const OperationsRoom = () => {
  const [selectedOp, setSelectedOp] = useState<Operation | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen pt-24 pb-32">
       {/* Ambient Tactical Overlay */}
       <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50" />
          <div className="absolute top-0 left-0 w-full h-[100px] bg-brand-green/20 blur-[100px]" />
       </div>

       <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
          {/* Hero Header */}
          <section className="mb-20 text-right">
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
             >
                <div className="flex items-center justify-end gap-3 mb-6">
                   <div className="w-12 h-[2px] bg-brand-green"></div>
                   <span className="text-brand-green font-black uppercase tracking-[0.4em] text-xs">نظام الاستعلامات الثوري</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  غرفة العمليات <span className="text-brand-green">السرية</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-500 max-w-2xl ml-auto border-r-4 border-[#e11d48] pr-6">
                  مركز القيادة والتنسيق التاريخي - أرشيف المهمات الخاصة والعمليات الفدائية.
                </p>
             </motion.div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
             {/* Left Panel: Stats/Timeline/Radio */}
             <div className="lg:col-span-1 space-y-8">
                <IntelligencePanel />
                <OperationsTimeline />
                <RadioArchive />
             </div>

             {/* Center/Right Panel: Map & Grid */}
             <div className="lg:col-span-3 space-y-8">
                {/* Big Strategy Map Area */}
                <div className="relative aspect-video lg:aspect-[21/9] bg-[#0b0b0b] border border-white/5 rounded-3xl overflow-hidden group">
                   <img 
                    src="image/map2.png" 
                    className="w-full h-full object-cover grayscale brightness-[0.2] contrast-[1.2] transition-transform duration-[5s] group-hover:scale-110" 
                    alt="Map" 
                   />
                   <div className="absolute inset-0 bg-brand-green/5 mix-blend-overlay"></div>
                   
                   {/* Tactical Markers */}
                   {operations.map((op, i) => (
                     <motion.div
                       key={op.id}
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       transition={{ delay: 0.5 + (i * 0.2) }}
                       className="absolute cursor-pointer group/marker"
                       style={{ top: `${op.coordinates?.y}%`, left: `${op.coordinates?.x}%` }}
                       onClick={() => setSelectedOp(op)}
                     >
                        <div className="relative">
                           <div className="w-4 h-4 bg-brand-green rounded-full shadow-[0_0_20px_rgba(31,95,58,0.8)] animate-ping absolute inset-0" />
                           <div className="w-4 h-4 bg-brand-green rounded-full shadow-[0_0_10px_rgba(31,95,58,1)] relative z-10" />
                           
                           <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[10px] text-white font-black whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none">
                              {op.title}
                           </div>
                        </div>
                     </motion.div>
                   ))}

                   {/* Scanning Grid Overlay */}
                   <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                      <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] bg-[size:50px_50px]" />
                   </div>

                   <div className="absolute bottom-8 left-8 flex items-center gap-4">
                      <div className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-xs font-mono text-brand-green flex items-center gap-3">
                         <MapIcon size={16} /> DATA: DZ/OPS/MAP_V4
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8" dir="rtl">
                   <h2 className="text-2xl font-black text-white flex items-center gap-3">
                      <Shield className="text-brand-green" size={24} /> السجلات المصنفة
                   </h2>
                   <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">3 Operations Found</div>
                </div>

                <ClassifiedFiles onSelect={setSelectedOp} />
             </div>
          </div>
       </div>

       <OperationDetailModal op={selectedOp} onClose={() => setSelectedOp(null)} />
    </div>
  );
};

export default OperationsRoom;
