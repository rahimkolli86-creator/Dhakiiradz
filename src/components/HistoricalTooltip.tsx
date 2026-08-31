import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';

interface HistoricalTooltipProps {
  name: string;
  leader: string;
  x: number;
  y: number;
}

const HistoricalTooltip: React.FC<HistoricalTooltipProps> = ({ name, leader, x, y }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      style={{ 
        left: x + 20, 
        top: y - 40,
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 500
      }}
      className="bg-black/95 border border-brand-green/40 px-6 py-4 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b-brand-green border-b-2 flex flex-col gap-1 min-w-[200px]"
      dir="rtl"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_10px_rgba(31,95,58,1)]" />
        <span className="text-white text-base font-black tracking-tight">{name}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <User size={12} className="text-brand-green" />
        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">القائد: {leader}</span>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand-green/30 rounded-tr-xl" />
    </motion.div>
  );
};

export default HistoricalTooltip;
