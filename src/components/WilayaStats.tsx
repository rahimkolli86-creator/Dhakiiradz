import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface WilayaStatsProps {
  count: number;
}

const WilayaStats: React.FC<WilayaStatsProps> = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    const duration = 2000;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e11d48]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <span className="text-[#e11d48] text-[10px] font-mono tracking-[0.4em] uppercase mb-4">Martyrs Recognition</span>
      
      <div className="flex flex-col items-center">
        <div className="text-6xl lg:text-7xl font-black text-white tracking-tighter mb-2 flex items-baseline gap-2">
          {displayCount.toLocaleString()}
          <span className="text-lg text-[#e11d48] font-bold">شهيد</span>
        </div>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#e11d48] to-transparent" />
      </div>

      <p className="mt-6 text-gray-500 text-xs font-medium text-center leading-relaxed">تضحيات جسام سُجلت في سجلات الخالدين من أبناء هذه الولاية الأبية</p>
    </div>
  );
};

export default WilayaStats;
