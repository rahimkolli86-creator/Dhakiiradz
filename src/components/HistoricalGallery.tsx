import React from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';

interface ArchivePhoto {
  url: string;
  caption: string;
}

interface HistoricalGalleryProps {
  photos: ArchivePhoto[];
}

const HistoricalGallery: React.FC<HistoricalGalleryProps> = ({ photos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {photos.map((photo, index) => (
        <motion.div 
          key={index}
          whileHover={{ scale: 1.02 }}
          className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10"
        >
          <img 
            src={photo.url} 
            alt={photo.caption} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
          
          <div className="absolute bottom-4 right-4 left-4 text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              <Camera size={12} className="text-[#c6a66b]" />
              <span className="text-[10px] text-[#c6a66b] font-bold uppercase tracking-[0.2em]">Archive Document</span>
            </div>
            <p className="text-white text-xs font-bold leading-tight">{photo.caption}</p>
          </div>
          
          {/* Archive Texture Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
        </motion.div>
      ))}
    </div>
  );
};

export default HistoricalGallery;
