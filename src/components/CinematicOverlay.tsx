import React from 'react';
import { motion } from 'motion/react';

const CinematicOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dust Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%' 
          }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: ['-10%', '110%'],
            x: (Math.random() - 0.5) * 50 + '%'
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
        />
      ))}

      {/* Smoky Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-green/5 blur-[120px] rounded-full"
      />
      
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#c6a66b]/5 blur-[150px] rounded-full"
      />

      {/* Historical Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
    </div>
  );
};

export default CinematicOverlay;
