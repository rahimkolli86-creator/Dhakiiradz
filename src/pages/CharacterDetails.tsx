import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '/lib/supabase';

export default function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadCharacter();
  }, [id]);

  useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    setMousePosition({ x, y });
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);

  const loadCharacter = async () => {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setCharacter(data);
  };

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white text-2xl">
        جاري التحميل...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#050505] text-white"
      dir="rtl"
    >
      {/* زر العودة */}
      <div className="fixed top-8 right-8 z-50">
        <Link
          to="/characters"
          className="px-5 py-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all duration-300"
        >
          العودة للشخصيات
        </Link>
      </div>

      {/* HERO CINEMATIC */}
      <section className="relative h-screen overflow-hidden">
        <motion.img
  src={character.image}
  alt={character.name}
  animate={{
    x: mousePosition.x,
    y: mousePosition.y,
    scale: 1.15
  }}
  transition={{
    type: "spring",
    stiffness: 40,
    damping: 20
  }}
  className="absolute inset-0 w-full h-full object-cover brightness-40"
/>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_90%)]"></div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-20 right-10 lg:right-24 z-10"
        >
          <div className="w-24 h-1 bg-brand-green mb-6"></div>

          <h1 className="text-5xl lg:text-8xl font-black mb-4 drop-shadow-2xl">
            {character.name}
          </h1>

          <p className="text-xl lg:text-3xl text-gray-300">
            {character.role}
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">

        {/* INFO CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <h3 className="text-gray-400 mb-2">اللقب</h3>
            <p className="font-bold text-xl">
              {character.nickname || '-'}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <h3 className="text-gray-400 mb-2">تاريخ الميلاد</h3>
            <p className="font-bold text-xl">
              {character.birth_date || '-'}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <h3 className="text-gray-400 mb-2">مكان الميلاد</h3>
            <p className="font-bold text-xl">
              {character.birth_place || '-'}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <h3 className="text-gray-400 mb-2">الرتبة</h3>
            <p className="font-bold text-xl">
              {character.rank || '-'}
            </p>
          </div>

        </div>

        {/* QUOTE */}
        {character.quote && (
          <div className="max-w-5xl mx-auto text-center mb-24">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-4xl lg:text-7xl font-black leading-relaxed text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              "{character.quote}"
            </motion.p>
          </div>
        )}

        {/* BIO + ACHIEVEMENTS */}
        <div className="grid lg:grid-cols-2 gap-16 mt-10">

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-black mb-8">
              السيرة الذاتية
            </h2>

            <p className="text-lg lg:text-xl leading-loose text-gray-300 whitespace-pre-line">
              {character.biography}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-black mb-8">
              الإنجازات
            </h2>

            <p className="text-lg lg:text-xl leading-loose text-gray-300 whitespace-pre-line">
              {character.achievements || 'لا توجد بيانات'}
            </p>
          </motion.div>

        </div>

        {/* MARTYR DATE */}
        <div className="mt-24 border-t border-white/10 pt-16 text-center">

          <h2 className="text-4xl font-black mb-6">
            تاريخ الاستشهاد
          </h2>

          <p className="text-2xl text-gray-300">
            {character.martyr_date || '-'}
          </p>

        </div>

      </div>
    </motion.div>
  );
}