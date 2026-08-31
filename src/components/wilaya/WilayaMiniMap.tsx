import React from 'react';
import { MapPin, Compass, Shield, Navigation } from 'lucide-react';
import { Wilaya } from '../../types';

interface WilayaMiniMapProps {
  wilaya: Wilaya;
}

const WilayaMiniMap: React.FC<WilayaMiniMapProps> = ({ wilaya }) => {
  const zone = wilaya.historicalZone || 'المنطقة التاريخية لجيش التحرير الوطني';
  const coords = wilaya.coordinates || { lat: 35.8, lng: 7.1, x: 700, y: 120 };

  return (
    <div className="p-8 bg-[#0b0b0b] border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl" dir="rtl">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#c6a66b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left / Text Side */}
        <div className="space-y-6 flex-1 text-right">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#c6a66b]/10 border border-[#c6a66b]/30 rounded-full text-[#c6a66b] text-xs font-mono font-bold">
              <Compass size={14} />
              <span>المكان في الذاكرة الثورية</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-black text-white font-serif">
              الموقع الجغرافي والاستراتيجي لـ {wilaya.name}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-normal">
              شكلت ولاية {wilaya.name} نقطة ارتكاز استراتيجية نظراً لموقعها الحيوي وتضاريسها الجبلية الحصينة التي أمنت خطوط الاتصال والإمداد بالسلاح بين مختلف المناطق الثورية وقواعد جيش التحرير الوطني.
            </p>
          </div>

          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center text-brand-green flex-shrink-0 mt-0.5">
                <Shield size={18} />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-mono block">المنطقة الثورية التاريخية</span>
                <span className="text-xs font-bold text-gray-200 leading-snug">{zone}</span>
              </div>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#c6a66b]/10 border border-[#c6a66b]/30 flex items-center justify-center text-[#c6a66b] flex-shrink-0 mt-0.5">
                <Navigation size={18} />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-mono block">الإحداثيات الجغرافية</span>
                <span className="text-xs font-mono font-bold text-[#c6a66b]">
                  {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Visual Geographic Canvas */}
        <div className="relative w-full lg:w-96 h-64 bg-black/60 rounded-2xl border border-[#c6a66b]/20 p-6 flex flex-col items-center justify-center overflow-hidden group">
          {/* Subtle stylized radar effect */}
          <div className="absolute w-48 h-48 rounded-full border border-[#c6a66b]/20 animate-ping opacity-20 pointer-events-none" />
          <div className="absolute w-32 h-32 rounded-full border border-brand-green/30 animate-pulse pointer-events-none" />

          {/* Silhouette Representation */}
          <div className="relative z-10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#c6a66b]/20 border-2 border-[#c6a66b] flex items-center justify-center text-[#c6a66b] mx-auto shadow-[0_0_30px_rgba(198,166,107,0.5)]">
              <MapPin size={32} className="animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#c6a66b] tracking-widest uppercase block">نقطة الارتكاز الثورية</span>
              <h4 className="text-lg font-black text-white">{wilaya.name}</h4>
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{wilaya.latinName} — DZ {wilaya.code}</span>
            </div>
          </div>

          {/* Corner Grid Crosshairs */}
          <span className="absolute top-2 left-2 text-[8px] font-mono text-gray-600">N 36°20'</span>
          <span className="absolute bottom-2 right-2 text-[8px] font-mono text-gray-600">E 07°10'</span>
        </div>
      </div>
    </div>
  );
};

export default WilayaMiniMap;
