import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';

interface MartyrCardProps {
  name: string;
  role: string;
}

const MartyrCard: React.FC<MartyrCardProps> = ({ name, role }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center gap-4 group transition-all hover:bg-white/[0.05] hover:border-brand-green/30"
    >
      <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-500">
        <User size={20} />
      </div>
      <div className="text-right">
        <h4 className="text-white font-bold text-lg mb-0.5">{name}</h4>
        <p className="text-[#c6a66b] text-[10px] font-bold uppercase tracking-widest leading-none">{role}</p>
      </div>
    </motion.div>
  );
};

export default MartyrCard;
