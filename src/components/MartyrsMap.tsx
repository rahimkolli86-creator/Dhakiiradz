import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MAP_PATHS } from '../constants/MAP_PATHS';
import { wilayasData } from '../data/wilayas';

interface MartyrsMapProps {
  onWilayaSelect: (wilayaId: string) => void;
  selectedId: string | null;
}

const MartyrsMap: React.FC<MartyrsMapProps> = ({ onWilayaSelect, selectedId }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const hoveredWilaya = wilayasData.find(w => w.id === hoveredId);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4" onMouseMove={handleMouseMove}>
      <svg 
        viewBox="0 0 1000 1000" 
        className="w-full h-auto max-h-[85vh] drop-shadow-[0_0_50px_rgba(31,95,58,0.15)]"
        style={{ direction: 'ltr' }}
      >
        <g>
          {MAP_PATHS.map((path) => {
            const isSelected = selectedId === path.id;
            const isHovered = hoveredId === path.id;
            const hasData = wilayasData.some(w => w.id === path.id);

            return (
              <motion.path
                key={path.id}
                d={path.d}
                fill={isSelected ? '#e11d48' : (isHovered ? (hasData ? '#1f5f3a' : '#222') : '#111')}
                stroke={isHovered ? (hasData ? '#6f9c76' : '#444') : 'rgba(255,255,255,0.05)'}
                strokeWidth={isHovered ? 2 : 0.5}
                className="cursor-pointer transition-colors duration-500"
                animate={{
                  fill: isSelected ? '#1f5f3a' : (isHovered ? (hasData ? '#1f5f3a' : '#1a1a1a') : '#0a0a0a'),
                  stroke: isHovered ? (hasData ? '#1f5f3a' : '#333') : 'rgba(255,255,255,0.1)',
                  scale: isHovered ? 1.015 : 1,
                  filter: isHovered && hasData ? 'drop-shadow(0 0 8px rgba(31,95,58,0.5))' : 'none'
                }}
                onMouseEnter={() => setHoveredId(path.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onWilayaSelect(path.id)}
                style={{ transformOrigin: 'center center' }}
              />
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{ 
              left: mousePos.x + 20, 
              top: mousePos.y - 40,
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 300
            }}
            className="bg-black/95 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col items-end gap-1 border-b-2 border-b-brand-green"
            dir="rtl"
          >
            <span className="text-white text-lg font-black tracking-tight whitespace-nowrap">
              {MAP_PATHS.find(p => p.id === hoveredId)?.name}
            </span>
            {hoveredWilaya ? (
              <span className="text-brand-green text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">اضغط لاستكشاف الأرشيف</span>
            ) : (
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">بيانات تحت المراجعة</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MartyrsMap;
