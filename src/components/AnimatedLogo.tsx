import React from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';

const AnimatedLogo = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-12">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Dust Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * 400 - 200, 
              y: Math.random() * 200 - 100 
            }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: [null, Math.random() * -100 - 50],
              x: [null, Math.random() * 50 - 25]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-[#c6a66b]/30 rounded-full blur-[1px]"
          />
        ))}
        
        {/* Subtle Smoke Effect */}
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(61,107,71,0.05)_0%,transparent_70%)]"
        />
      </div>

      {/* Main Logo Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <Logo size="xl" className="transform hover:scale-105 transition-transform duration-700 active:scale-95" />
        
        {/* Light Sweep Animation */}
        <motion.div
          animate={{ 
            left: ['-100%', '200%'] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatDelay: 5
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] pointer-events-none"
        />
      </motion.div>

      {/* Hero Subtitle or Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="mt-8 flex flex-col items-center"
      >
        <span className="text-[#c6a66b] text-[10px] font-mono uppercase tracking-[0.5em] mb-4 opacity-40">National Memorial Archive</span>
        <div className="flex items-center gap-6">
           <div className="w-12 h-[1px] bg-gradient-to-l from-[#c6a66b]/40 to-transparent" />
           <div className="w-2 h-2 rounded-full border border-[#c6a66b]/40 flex items-center justify-center">
              <div className="w-1 h-1 bg-[#e11d48] rounded-full animate-pulse" />
           </div>
           <div className="w-12 h-[1px] bg-gradient-to-r from-[#c6a66b]/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedLogo;
