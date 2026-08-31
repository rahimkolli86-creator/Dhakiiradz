import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, Download, Clock, Book, Image as ImageIcon, Music, MapPin, ChevronLeft, Users, X } from 'lucide-react';
import { Martyr, Battle, TimelineEvent } from '../../data/wilayas';

export const WilayaHero = ({ name, subtitle, image, description }: { name: string, subtitle: string, image: string, description: string }) => (
  <section className="relative h-[80vh] flex items-end justify-start px-8 lg:px-32 pb-24 overflow-hidden">
    <motion.img 
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.4 }}
      transition={{ duration: 2, ease: "easeOut" }}
      src={image} 
      className="absolute inset-0 w-full h-full object-cover grayscale brightness-25" 
      alt={name} 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
    
    <div className="relative z-10 max-w-4xl" dir="rtl">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
           <div className="w-12 h-[2px] bg-brand-green"></div>
           <span className="text-brand-green font-black uppercase tracking-[0.4em] text-xs">سجل الخالدين</span>
        </div>
        <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
          {name}
        </h1>
        <p className="text-xl lg:text-2xl text-white/80 font-medium mb-8 max-w-2xl border-r-4 border-brand-green pr-6">
          {subtitle}
        </p>
        <p className="text-lg text-gray-400 leading-relaxed max-w-3xl opacity-80">
          {description}
        </p>
      </motion.div>
    </div>

    {/* Ambient Particles Decor */}
    <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none overflow-hidden mix-blend-screen opacity-30">
       <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-green/20 blur-[150px] rounded-full animate-pulse" />
    </div>
  </section>
);

export const MartyrsSection = ({ martyrs }: { martyrs: Martyr[] }) => (
  <section className="py-24 px-8 lg:px-32 bg-[#080808]" dir="rtl">
    <div className="flex items-center gap-4 mb-16">
       <Users className="text-brand-green" size={32} />
       <h2 className="text-3xl font-black text-white">شهداء الولاية</h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {martyrs.map((martyr, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -10 }}
          className="group relative h-[450px] rounded-2xl overflow-hidden border border-white/5 bg-[#0b0b0b]"
        >
          <img src={martyr.image} className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110 brightness-75 group-hover:brightness-100" alt={martyr.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 p-8 w-full text-right">
             <p className="text-brand-green font-bold text-xs mb-2 tracking-widest">{martyr.role}</p>
             <h3 className="text-2xl font-black text-white mb-4">{martyr.name}</h3>
             
             {martyr.link && (
               <Link to={martyr.link} className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-bold group/link transition-colors">
                  اكتشف المسيرة 
                  <ChevronLeft size={16} className="group-hover/link:-translate-x-1 transition-transform" />
               </Link>
             )}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export const BattlesSection = ({ battles }: { battles: Battle[] }) => (
  <section className="py-24 px-8 lg:px-32" dir="rtl">
    <div className="flex items-center gap-4 mb-16">
       <Book className="text-brand-green" size={32} />
       <h2 className="text-3xl font-black text-white">معارك حاسمة</h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {battles.map((battle, idx) => (
        <div key={idx} className="p-10 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-2 h-full bg-brand-green transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
           <span className="text-4xl font-black text-brand-green/20 mb-6 block">{battle.year}</span>
           <h3 className="text-2xl font-black text-white mb-4">{battle.title}</h3>
           <p className="text-gray-400 leading-relaxed">{battle.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export const WilayaTimeline = ({ events }: { events: TimelineEvent[] }) => (
  <section className="py-24 px-8 lg:px-32 bg-[#080808]" dir="rtl">
    <div className="flex items-center gap-4 mb-16">
       <Clock className="text-brand-green" size={32} />
       <h2 className="text-3xl font-black text-white">التسلسل الزمني</h2>
    </div>
    
    <div className="relative border-r-2 border-white/10 mr-4 py-8 space-y-12">
      {events.map((event, idx) => (
        <div key={idx} className="relative pr-12">
          <div className="absolute right-[-11px] top-0 w-5 h-5 rounded-full bg-brand-green shadow-[0_0_15px_rgba(31,95,58,0.5)]"></div>
          <span className="text-brand-green font-black text-xl mb-2 block">{event.year}</span>
          <p className="text-lg text-white font-bold leading-relaxed">{event.event}</p>
        </div>
      ))}
    </div>
  </section>
);

export const HistoricalGallery = ({ images }: { images: string[] }) => (
  <section className="py-24 px-8 lg:px-32" dir="rtl">
    <div className="flex items-center gap-4 mb-16">
       <ImageIcon className="text-brand-green" size={32} />
       <h2 className="text-3xl font-black text-white">الأرشيف المصور</h2>
    </div>
    
    <div className="columns-1 md:columns-2 lg:columns-2 gap-8 space-y-8">
      {images.map((img, idx) => (
        <motion.div 
          key={idx}
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl overflow-hidden border border-white/5 bg-[#0b0b0b] cursor-zoom-in"
        >
          <img src={img} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" alt="Historical" />
        </motion.div>
      ))}
    </div>
  </section>
);

export const AudioArchive = ({ audioUrl }: { audioUrl: string }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

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
    <section className="py-24 px-8 lg:px-32 bg-[#080808]" dir="rtl">
      <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-12 text-center relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-green/10 blur-[100px] rounded-full group-hover:bg-brand-green/20 transition-colors"></div>
        
        <Music className="text-brand-green mx-auto mb-8" size={64} />
        <h3 className="text-3xl font-black text-white mb-4">الأرشيف الصوتي للولاية</h3>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto italic font-medium leading-relaxed">
          "استمع لشهادات حية وتسجيلات تاريخية تعود لسنوات الكفاح المسلح في المنطقة"
        </p>

        <button 
          onClick={togglePlay}
          className="w-24 h-24 rounded-full bg-brand-green hover:bg-brand-hover text-white flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(31,95,58,0.3)] transition-all active:scale-95 group/play"
        >
          {isPlaying ? <X size={40} /> : <Play size={40} className="mr-2" />}
        </button>

        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onEnded={() => setIsPlaying(false)}
        />
        
        <div className="mt-12 flex items-center justify-center gap-4 text-xs font-mono text-gray-500 tracking-widest uppercase">
          <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
          تسجيل أرشيف وطني
        </div>
      </div>
    </section>
  );
};
