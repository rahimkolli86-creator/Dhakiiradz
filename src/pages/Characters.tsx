import React, { useEffect, useState } from 'react';
import { supabase } from '/lib/supabase';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const Characters = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    const { data, error } = await supabase!
      .from('characters')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setCharacters(data || []);
  };

  return (
    <div className="relative min-h-screen pt-24 lg:pt-32 px-6 lg:px-12 lg:pl-44 pb-32 lg:pb-20 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,95,58,0.15),transparent_70%)]"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-12 lg:mb-20 text-right">
          <h1 className="text-4xl lg:text-7xl font-black mb-4 tracking-tight text-white">
            شخصيات خالدة
          </h1>

          <p className="text-gray-500 font-mono text-xs lg:text-sm tracking-widest uppercase">
            الأرواح التي صنعت الحرية
          </p>

          <div className="w-20 h-1 bg-brand-green mt-6 mr-0 ml-auto shadow-[0_0_20px_rgba(31,95,58,0.8)]"></div>

          <div className="mt-6">
            <span className="text-3xl font-black text-brand-green">
              {characters.length}
            </span>
            <span className="text-gray-400 mr-3">
              شخصية تاريخية
            </span>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {characters.map((char, i) => (
            <motion.div
              key={char.id}
              initial={{
                opacity: 0,
                y: 80,
                rotateX: 25
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateX: 0
              }}
              whileHover={{
                scale: 1.04,
                rotateY: 6
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.08
              }}
              style={{
                transformStyle: 'preserve-3d'
              }}
              onClick={() => navigate(`/characters/${char.id}`)}
              className="group cursor-pointer"
            >

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-2xl hover:border-brand-green/50 transition-all duration-500">

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">

                  <img
                    src={char.image}
                    alt={char.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />

                  {/* Green Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                  {/* Hover Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-sm">
                    <span className="px-6 py-3 border border-white text-white text-xs font-bold tracking-widest">
                      عرض السيرة
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-right">

                  <motion.h3
                    whileHover={{ y: -4 }}
                    className="text-2xl font-black text-white mb-3 transition-all"
                  >
                    {char.name}
                  </motion.h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {char.role}
                  </p>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Characters;