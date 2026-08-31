import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, ArrowLeft } from 'lucide-react';

import MapSection from '../components/MapSection';
import ArchiveContribution from '../components/ArchiveContribution';
import Logo from '../components/Logo';
import { supabase } from '/lib/supabase';

interface Battle {
  id: string;
  title: string;
  year: number | string | null;
  region_id: string | number | null;
  description: string | null;
  status: string | null;
  image: string | null;
  hero_image: string | null;
  event_type: string | null;
}

const Home = ({
  onChatToggle: _onChatToggle,
}: {
  onChatToggle: () => void;
}) => {
  const navigate = useNavigate();

  const [battles, setBattles] = React.useState<Battle[]>([]);
  const [battlesLoading, setBattlesLoading] = React.useState(true);

  const handleScrollDown = () => {
    const section = document.getElementById('historical-records');

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  React.useEffect(() => {
    const fetchFeaturedBattles = async () => {
      setBattlesLoading(true);

      try {
        if (!supabase) {
          setBattles([]);
          return;
        }

        const { data, error } = await supabase
          .from('battles')
          .select(`
            id,
            title,
            year,
            region_id,
            description,
            status,
            image,
            hero_image,
            event_type
          `)
          .order('year', { ascending: true })
          .limit(3);

        if (error) {
          console.error(
            'Error fetching featured battles:',
            error
          );

          setBattles([]);
          return;
        }

        setBattles((data || []) as Battle[]);
      } catch (error) {
        console.error(
          'Unexpected error fetching battles:',
          error
        );

        setBattles([]);
      } finally {
        setBattlesLoading(false);
      }
    };

    fetchFeaturedBattles();
  }, []);

  const handleBattleClick = (battle: Battle) => {
    navigate(`/journey/${String(battle.id).trim()}`);
  };

  return (
    <div
      className="min-h-screen bg-[#050505]"
      dir="rtl"
    >
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[100svh] flex flex-col justify-between items-center text-center pt-24 pb-8 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden select-none">

        {/* Background */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 1,
          }}
          animate={{
            opacity: 1,
            scale: 1.06,
          }}
          transition={{
            opacity: {
              duration: 2.2,
              ease: 'easeOut',
            },
            scale: {
              duration: 22,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img
            src="https://www.echoroukonline.com/wp-content/uploads/2021/11/250708412_103791138778204_3622295149521894539_n.jpg"
            alt="الأرشيف التاريخي للثورة الجزائرية"
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-[0.32]"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/50 z-10" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505] z-10" />

          <div className="absolute inset-0 cinematic-vignette opacity-95 z-20" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c6a66b]/10 blur-[160px] rounded-full z-20 pointer-events-none" />

          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[#1f5f3a]/15 blur-[150px] rounded-full z-20 pointer-events-none" />

          <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay z-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </motion.div>

        <div className="w-full h-8 sm:h-12" />

        {/* Hero Typography */}
        <div className="relative z-40 max-w-6xl w-full mx-auto my-auto flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 px-2">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center justify-center gap-2 sm:gap-3"
          >
            <h1
              className="font-black text-white font-serif tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] leading-none select-none"
              style={{
                fontSize: 'clamp(4rem, 14vw, 10.5rem)',
              }}
            >
              ذاكرة
            </h1>

            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c6a66b]/60" />

              <span className="text-xs sm:text-base font-mono tracking-[0.35em] sm:tracking-[0.45em] text-[#c6a66b] font-bold uppercase drop-shadow">
                DHAKIRA DZ
              </span>

              <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c6a66b]/60" />
            </div>
          </motion.div>

          <motion.h2
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.4,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-black text-white font-serif tracking-tight drop-shadow-2xl leading-[1.2] max-w-4xl mx-auto"
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 3.8rem)',
            }}
          >
            ذاكرة الجزائر،{' '}
            <span className="text-[#c6a66b] font-serif">
              كما لم تُروَ من قبل.
            </span>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
              delay: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-base sm:text-xl lg:text-2xl text-gray-300 font-serif font-light leading-relaxed max-w-2xl mx-auto text-center"
          >
              ارشيفنا   
          </motion.p>
        </div>

        {/* Scroll */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1.2,
            delay: 1.3,
          }}
          className="relative z-40 pt-8 pb-2 flex flex-col items-center justify-center"
        >
          <button
            onClick={handleScrollDown}
            className="group flex flex-col items-center gap-2 text-gray-400 hover:text-[#c6a66b] transition-colors cursor-pointer outline-none focus:outline-none"
            aria-label="اكتشف الذاكرة"
          >
            <span className="text-[11px] sm:text-xs font-serif tracking-widest text-gray-400 group-hover:text-[#c6a66b] transition-colors">
              اكتشف الذاكرة
            </span>

            <motion.span
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-xs sm:text-sm text-[#c6a66b]/70 group-hover:text-[#c6a66b] transition-colors"
            >
              ↓
            </motion.span>
          </button>
        </motion.div>
      </section>

      {/* =====================================================
          FEATURED BATTLES
      ====================================================== */}

      <section
        id="historical-records"
        className="relative py-24 lg:py-32 px-6 lg:px-20 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1f5f3a]/[0.025] blur-[140px] rounded-full" />

          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c6a66b]/[0.02] blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-14">

            <div className="text-right">
              <span className="block text-[#c6a66b] text-[10px] md:text-xs font-mono tracking-[0.35em] mb-4">
                HISTORICAL ARCHIVE
              </span>

              <h2 className="font-serif text-4xl md:text-6xl font-black text-white tracking-tight">
                الأحداث
                <span className="text-[#c6a66b]">
                  {' '}البارزة
                </span>
              </h2>

              <div className="mt-4 w-20 h-[2px] bg-[#1f5f3a] mr-auto" />

              <p className="mt-5 text-sm md:text-base text-gray-500 font-serif">
                محطات خالدة من تاريخ الثورة الجزائرية
              </p>
            </div>

            {/* All battles */}
            <Link
              to="/battles"
              className="group inline-flex items-center gap-3 border border-white/10 bg-white/[0.025] hover:bg-[#c6a66b] hover:border-[#c6a66b] text-gray-300 hover:text-black px-6 py-3.5 rounded-xl text-xs font-bold transition-all"
            >
              <span>
                استكشف المزيد من المعارك
              </span>

              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Loading */}
          {battlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[430px] rounded-3xl border border-white/10 bg-white/[0.025] animate-pulse"
                />
              ))}
            </div>
          ) : battles.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {battles.map((battle, index) => {

                const image =
                  battle.hero_image ||
                  battle.image ||
                  null;

                return (
                  <motion.article
                    key={battle.id}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: '-80px',
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.12,
                    }}
                    onClick={() =>
                      handleBattleClick(battle)
                    }
                    className="group relative h-[430px] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] cursor-pointer hover:border-[#c6a66b]/40 transition-all duration-500"
                  >

                    {/* Image */}
                    {image ? (
                      <img
                        src={image}
                        alt={battle.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.35] group-hover:grayscale-0 group-hover:brightness-[0.55] group-hover:scale-105 transition-all duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#151515] to-[#050505]" />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

                    {/* Top Info */}
                    <div className="absolute top-5 right-5 left-5 flex items-center justify-between gap-3">

                      {battle.year && (
                        <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#c6a66b] text-[10px] font-mono">
                          {battle.year} م
                        </span>
                      )}

                      {battle.event_type && (
                        <span className="max-w-[150px] truncate px-3 py-1.5 rounded-full bg-[#c6a66b]/10 backdrop-blur-md border border-[#c6a66b]/20 text-[#c6a66b] text-[10px] font-bold">
                          {battle.event_type}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-right">

                      <h3 className="font-serif text-2xl md:text-3xl font-black text-white group-hover:text-[#c6a66b] transition-colors leading-snug">
                        {battle.title}
                      </h3>

                      {battle.description && (
                        <p className="mt-3 text-xs md:text-sm text-gray-400 leading-6 line-clamp-2">
                          {battle.description}
                        </p>
                      )}

                      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">

                        <span className="text-[10px] font-mono text-gray-600">
                          DHAKIRA DZ
                        </span>

                        <span className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-[#c6a66b] transition-colors">
                          اكتشف التفاصيل

                          <ArrowLeft
                            size={14}
                            className="group-hover:-translate-x-1 transition-transform"
                          />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}

            </div>

          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] py-20 text-center">
              <p className="text-sm text-gray-500">
                لا توجد معارك مؤرشفة حالياً.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          CHARACTERS
      ====================================================== */}

      <section className="py-24 lg:py-32 px-8 lg:px-32 bg-black/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

          <div className="w-full lg:w-1/2 text-right">
            <span className="text-[#1f5f3a] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              شخصيات صنعت التاريخ
            </span>

            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 font-serif leading-tight">
              وجوه
              <br />
              <span className="text-[#e11d48]">
                المقاومة
              </span>
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed mb-12">
              تعرف على الرجال والنساء الذين ضحوا بحياتهم من أجل استقلال الجزائر.
              من العربي بن مهيدي إلى حسيبة بن بوعلي، قصص من الصمود والتضحية.
            </p>

            <Link
              to="/characters"
              className="inline-flex items-center gap-4 py-4 px-10 rounded-full border border-white/10 hover:border-[#1f5f3a] hover:bg-[#1f5f3a] transition-all text-white font-bold group"
            >
              <span>
                عرض جميع الشخصيات
              </span>

              <Play
                size={14}
                className="rotate-180 fill-white group-hover:-translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">

            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 opacity-40 hover:opacity-100 transition-opacity">
              <img
                src="https://i.pinimg.com/564x/f1/24/30/f1243029e09ebdbce33360deb23954f3.jpg"
                className="w-full h-full object-cover grayscale"
                alt="Person 1"
              />
            </div>

            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 mt-12 opacity-40 hover:opacity-100 transition-opacity">
              <img
                src="https://arabicpost.net/wp-content/uploads/2024/03/00d644dd4f248d496b4673ef5ca0f658.jpg"
                className="w-full h-full object-cover grayscale"
                alt="Person 2"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Map */}
      <MapSection />

      {/* Contribution */}
      <ArchiveContribution />

      {/* Footer */}
      <footer className="py-20 text-center border-t border-white/5 bg-black/50 flex flex-col items-center">

        <Logo
          size="md"
          variant="gold"
          className="mb-8 opacity-80"
        />

        <p className="text-[10px] font-mono tracking-[0.4em] text-gray-500 uppercase">
          © ذاكرة الجزائر — الأرشيف الرقمي للثورة التحريرية
        </p>

      </footer>
    </div>
  );
};

export default Home;