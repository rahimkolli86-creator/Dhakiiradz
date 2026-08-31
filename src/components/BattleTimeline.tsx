import React from 'react';
import { motion } from 'motion/react';
import { Swords } from 'lucide-react';

interface Battle {
  year: string;
  name: string;
  description: string;
}

interface BattleTimelineProps {
  battles: Battle[];
}

const BattleTimeline: React.FC<BattleTimelineProps> = ({ battles }) => {
  return (
    <div className="relative py-8" dir="rtl">
      {/* Vertical Line */}
      <div className="absolute top-0 right-4 bottom-0 w-[1px] bg-gradient-to-b from-brand-green/50 via-white/10 to-transparent" />
      
      <div className="space-y-10">
        {battles.map((battle, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pr-12 group"
          >
            {/* Timeline Dot */}
            <div className="absolute top-1.5 right-[13px] w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(31,95,58,1)] border border-white/50 group-hover:scale-150 transition-transform duration-500" />
            
            <div className="flex flex-col gap-1">
              <span className="text-[#c6a66b] text-xs font-black font-mono tracking-widest">{battle.year}</span>
              <h4 className="text-white font-bold text-xl flex items-center gap-3">
                {battle.name}
                <Swords size={16} className="text-gray-600 group-hover:text-brand-green transition-colors" />
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed mt-2 italic border-r-2 border-brand-green/20 pr-4">
                {battle.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BattleTimeline;
