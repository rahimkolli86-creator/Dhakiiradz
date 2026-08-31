import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'white' | 'monochrome';
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  showText = true, 
  size = 'md',
  variant = 'gold'
}) => {
  const sizes = {
    sm: { icon: 32, text: 'text-lg', sub: 'text-[7px]' },
    md: { icon: 48, text: 'text-2xl', sub: 'text-[9px]' },
    lg: { icon: 64, text: 'text-4xl', sub: 'text-[11px]' },
    xl: { icon: 120, text: 'text-6xl', sub: 'text-[14px]' }
  };

  const colors = {
    gold: {
      primary: '#c6a66b',
      secondary: '#3d6b47',
      text: 'text-[#c6a66b]',
      subtext: 'text-[#c6a66b]/60'
    },
    white: {
      primary: '#ffffff',
      secondary: '#3d6b47',
      text: 'text-white',
      subtext: 'text-white/60'
    },
    monochrome: {
      primary: 'currentColor',
      secondary: 'transparent',
      text: 'text-current',
      subtext: 'text-current/60'
    }
  };

  const currentSize = sizes[size];
  const currentColor = colors[variant];

  return (
    <div className={`flex items-center gap-4 lg:gap-6 group ${className}`} dir="rtl">
      {/* Cinematic Emblem */}
      <div className="relative" style={{ width: currentSize.icon, height: currentSize.icon }}>
        {/* Outer Glow */}
        <div 
          className="absolute inset-0 bg-[#3d6b47]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
        />
        
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(198,166,107,0.3)]"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8e6d3d" />
              <stop offset="20%" stopColor="#c6a66b" />
              <stop offset="50%" stopColor="#f7ef8a" />
              <stop offset="80%" stopColor="#c6a66b" />
              <stop offset="100%" stopColor="#8e6d3d" />
            </linearGradient>
            
            <filter id="innerGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Shield/Circle */}
          <circle cx="50" cy="50" r="48" stroke="url(#goldGradient)" strokeWidth="0.5" fill="#050505" />
          <circle cx="50" cy="50" r="45" stroke="url(#goldGradient)" strokeWidth="2" opacity="0.2" />
          
          {/* Laurel Branches (Stylized) */}
          <g opacity="0.6">
            {/* Left Branch */}
            <path d="M30 75C25 70 22 60 22 50C22 40 25 30 30 25" stroke="url(#goldGradient)" strokeWidth="1" strokeLinecap="round" />
            <circle cx="22" cy="50" r="1.5" fill="url(#goldGradient)" />
            <circle cx="24" cy="40" r="1" fill="url(#goldGradient)" />
            <circle cx="24" cy="60" r="1" fill="url(#goldGradient)" />
            
            {/* Right Branch */}
            <path d="M70 75C75 70 78 60 78 50C78 40 75 30 70 25" stroke="url(#goldGradient)" strokeWidth="1" strokeLinecap="round" />
            <circle cx="78" cy="50" r="1.5" fill="url(#goldGradient)" />
            <circle cx="76" cy="40" r="1" fill="url(#goldGradient)" />
            <circle cx="76" cy="60" r="1" fill="url(#goldGradient)" />
          </g>

          {/* Central Symbol: Crescent and Star */}
          <g filter="url(#innerGlow)">
            <path 
              d="M58 35C50 35 42 42 42 50C42 58 50 65 58 65C53 65 47 60 47 50C47 40 53 35 58 35Z" 
              fill="url(#goldGradient)" 
            />
            <path 
              d="M65 50L60.5 52.5L61.5 47.5L57.5 44L62.5 43.5L65 39L67.5 43.5L72.5 44L68.5 47.5L69.5 52.5L65 50Z" 
              fill="#e11d48"
              className="drop-shadow-[0_0_5px_rgba(225,29,72,0.5)]"
            />
          </g>
          
          {/* Decorative Inner Ring */}
          <circle cx="50" cy="50" r="38" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
          
          {/* Archivist Symbol (Book/Arch) */}
          <path d="M40 78H60M50 78V72M42 72C42 68 58 68 58 72" stroke="url(#goldGradient)" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        </svg>

        {/* Shimmer Effect */}
        <motion.div
           animate={{
             left: ['-100%', '200%'],
           }}
           transition={{
             repeat: Infinity,
             duration: 3,
             ease: "linear",
             repeatDelay: 2
           }}
           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
        />
      </div>

      {showText && (
        <div className="flex flex-col items-end">
          <h1 className={`font-display font-black tracking-tighter leading-none mb-1 transition-colors duration-500 ${currentColor.text} ${currentSize.text}`}>
            ذاكرة الجزائر
          </h1>
          <div className="flex items-center gap-2">
            <span className={`font-mono font-bold uppercase tracking-[0.3em] opacity-80 whitespace-nowrap ${currentSize.sub} ${currentColor.subtext}`}>
              أرشيف الثورة التحريرية
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-[#c6a66b]/40 to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
