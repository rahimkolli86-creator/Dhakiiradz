import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';

interface WhatsAppContributionButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

const WhatsAppContributionButton: React.FC<WhatsAppContributionButtonProps> = ({ 
  phoneNumber, 
  message = "السلام عليكم أرغب في مشاركة أرشيف تاريخي",
  className = "" 
}) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative flex items-center gap-4 bg-[#075e54]/20 hover:bg-[#075e54]/30 backdrop-blur-xl border border-[#25d366]/30 px-10 py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(37,211,102,0.1)] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#25d366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      
      <div className="relative z-10 w-12 h-12 rounded-full bg-[#25d366] flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] group-hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all">
        <MessageSquare className="text-white fill-white" size={24} />
      </div>
      
      <div className="relative z-10 text-right">
        <span className="block text-xs font-bold text-[#25d366] uppercase tracking-[0.2em] mb-1">تواصل معنا عبر واتساب</span>
        <span className="block text-xl font-black text-white tracking-tight">إرسال مساهمة أرشيفية</span>
      </div>
      
      {/* Cinematic Light Sweep Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <motion.div 
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
        />
      </div>
    </motion.a>
  );
};

export default WhatsAppContributionButton;
