import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';


interface ParticlePoint {
  x: number;
  y: number;
  size: number;
  delay: number;
  startX: number;
  startY: number;
}


interface LoadingScreenProps {
  onFinish: () => void;
}

const phrases = [
  'هنا تبدأ الحكاية.',
  'من أرضٍ صنعت الحرية...',
  'ومن ذاكرةٍ رفضت أن تموت.',
  'الجزائر... ذاكرة وطن.',
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(-1);
  const [showExplore, setShowExplore] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [faceParticles, setFaceParticles] = useState<ParticlePoint[]>([]);
const [particlesReady, setParticlesReady] = useState(false);
const [faceFormed, setFaceFormed] = useState(false);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const speechTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
  if (!visible) return;

  const image = new Image();

  image.src = '/image/hologram-face.png';

  image.onload = () => {
    const canvas = document.createElement('canvas');

    const width = 180;
    const height = 240;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.drawImage(image, 0, 0, width, height);

    const imageData = ctx.getImageData(
      0,
      0,
      width,
      height
    );

    const points: ParticlePoint[] = [];

    /*
     * نأخذ نقاطًا من المناطق المضيئة في الصورة.
     * كلما كانت البكسلات أكثر إضاءة،
     * زادت فرصة اختيارها كنقطة من نقاط الهولوغرام.
     */

   for (let y = 0; y < height; y += 3) {
  for (let x = 0; x < width; x += 3) {
        const index = (y * width + x) * 4;

        const r = imageData.data[index];
        const g = imageData.data[index + 1];
        const b = imageData.data[index + 2];
        const alpha = imageData.data[index + 3];

        const brightness =
          (r + g + b) / 3;

        if (
          alpha > 80 &&
          brightness > 35 &&
          Math.random() > 0.35
        ) {
          points.push({
            x: (x / width - 0.5) * 100,
            y: (y / height - 0.5) * 135,
            size: Math.random() * 1.8 + 0.6,
            delay: Math.random() * 1.8,
          });
        }
      }
    }

    setFaceParticles(points);
    setParticlesReady(true);

    /*
     * بعد وصول النقاط إلى أماكنها،
     * نعتبر الوجه قد تشكل.
     */
    setTimeout(() => {
      setFaceFormed(true);
    }, 3200);
  };

  return () => {
    image.onload = null;
  };
}, [visible]);

  /*
   * ============================================================
   * FIRST VISIT CHECK
   * ============================================================
   */

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('archive_intro_seen');

    if (alreadySeen === 'true') {
      setVisible(false);
      onFinish();
    }
  }, [onFinish]);

  /*
   * ============================================================
   * MOUSE 3D PARALLAX
   * ============================================================
   */

  useEffect(() => {
    if (!visible) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      setMouse({
        x,
        y,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [visible]);

  /*
   * ============================================================
   * SPEECH
   * ============================================================
   */

  const speakPhrase = (text: string) => {
    if (
      typeof window === 'undefined' ||
      !('speechSynthesis' in window)
    ) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = 'ar-SA';
      utterance.rate = 0.78;
      utterance.pitch = 0.85;
      utterance.volume = 1;

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = () => {
        resolve();
      };

      window.speechSynthesis.speak(utterance);

      /*
       * Fallback in case the browser does not fire onend.
       */
      speechTimeoutRef.current = window.setTimeout(() => {
        resolve();
      }, 4500);
    });
  };

  /*
   * ============================================================
   * HISTORICAL SEQUENCE
   * ============================================================
   */

  useEffect(() => {
    if (!visible) return;

   const startSequence = async () => {
  // انتظار اكتمال تشكل الهولوغرام
  await new Promise((resolve) =>
    setTimeout(resolve, 5200)
  );

  for (let i = 0; i < phrases.length; i++) {
    if (!visible) return;

    setPhraseIndex(i);

    await speakPhrase(phrases[i]);

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );
  }

  setPhraseIndex(phrases.length);

  await new Promise((resolve) =>
    setTimeout(resolve, 800)
  );

  setShowExplore(true);
};

    startSequence();

    return () => {
      window.speechSynthesis?.cancel();

      if (speechTimeoutRef.current) {
        window.clearTimeout(speechTimeoutRef.current);
      }
    };
  }, [visible]);

  /*
   * ============================================================
   * EXPLORE
   * ============================================================
   */

  const handleExplore = () => {
    if (isLeaving) return;

    setIsLeaving(true);

    /*
     * Stop speech immediately.
     */
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    /*
     * Remember that the intro has been seen.
     */
    sessionStorage.setItem(
      'archive_intro_seen',
      'true'
    );

    /*
     * Cinematic dissolve.
     */
    setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        onFinish();
      }, 900);
    }, 900);
  };

  if (!visible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: isLeaving ? 0 : 1,
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
        className="fixed inset-0 z-[9999] overflow-hidden bg-[#020202] text-white"
        dir="rtl"
      >
        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(198,166,107,0.09) 0%, rgba(0,0,0,0.88) 45%, #020202 80%)',
          }}
        />

        {/* Golden atmosphere */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 top-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] bg-[#c6a66b] pointer-events-none"
        />

        {/* =====================================================
            HOLOGRAM SCENE
        ===================================================== */}

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            perspective: '1400px',
            pointerEvents: 'none',
          }}
        >
   <motion.div
  animate={{
    rotateY: mouse.x * 7,
    rotateX: -mouse.y * 5,
    x: mouse.x * 12,
    y: mouse.y * 8,
  }}
  transition={{
    type: 'spring',
    stiffness: 35,
    damping: 20,
    mass: 1.2,
  }}
  className="relative w-[310px] h-[460px] sm:w-[380px] sm:h-[530px] md:w-[460px] md:h-[620px]"
  style={{
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  }}
>

            {/* =================================================
                OUTER RINGS
            ================================================= */}

            <motion.div
              animate={{
                rotateZ: 360,
                rotateX: mouse.y * 3,
                rotateY: mouse.x * 3,
              }}
              transition={{
                rotateZ: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              className="absolute left-1/2 top-1/2 w-[300px] h-[300px] sm:w-[390px] sm:h-[390px] md:w-[470px] md:h-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c6a66b]/20"
            />

            <motion.div
              animate={{
                rotateZ: -360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute left-1/2 top-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[540px] md:h-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c6a66b]/10 border-dashed"
            />

            <motion.div
              animate={{
                rotateZ: 360,
                scale: [1, 1.04, 1],
              }}
              transition={{
                rotateZ: {
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear',
                },
                scale: {
                  duration: 4,
                  repeat: Infinity,
                },
              }}
              className="absolute left-1/2 top-1/2 w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] md:w-[390px] md:h-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c6a66b]/30"
            />

            {/* =================================================
                HOLOGRAM FACE
            ================================================= */}

            {particlesReady && (
  <div
    className="absolute inset-0 flex items-center justify-center"
    style={{
      transform: 'translateZ(120px)',
    }}
  >
    <div
      className="relative"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {faceParticles.map((particle, index) => (
        <motion.span
          key={index}
          initial={{
  left: `${50 + particle.startX}%`,
  top: `${50 + particle.startY}%`,
  opacity: 0,
  scale: 0,
}}
          animate={{
            left: `${50 + particle.x / 2}%`,
            top: `${50 + particle.y / 2}%`,
            opacity: [0, 0.9, 1],
            scale: [0, 1.4, 1],
          }}
          transition={{
            duration: 2.8,
            delay: particle.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute rounded-full bg-[#c6a66b]"
          style={{
            width: particle.size,
            height: particle.size,
            boxShadow:
              '0 0 4px rgba(198,166,107,0.7)',
          }}
        />
      ))}

      <AnimatePresence>
        {faceFormed && (
          <motion.img
            src="/image/hologram-face.png"
            alt="هولوغرام ذاكرة الجزائر"
            initial={{
              opacity: 0,
              filter: 'blur(10px)',
              scale: 1.03,
            }}
            animate={{
              opacity: 0.50,
              filter: 'blur(0px)',
              scale: 1,
            }}
            transition={{
              duration: 1.8,
              ease: 'easeOut',
            }}
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              filter:
                'sepia(0.25) saturate(0.8) contrast(1.2) drop-shadow(0 0 12px rgba(198,166,107,0.55)) drop-shadow(0 0 35px rgba(198,166,107,0.15))',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  </div>
)}

              {/* =================================================
                  SCANLINES
              ================================================= */}

              <motion.div
                animate={{
                  top: ['5%', '95%'],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute left-[8%] right-[8%] h-[2px] z-30"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(198,166,107,0.95), transparent)',
                  boxShadow:
                    '0 0 20px rgba(198,166,107,0.8)',
                }}
              />

              {/* Horizontal digital lines */}

              <div
                className="absolute inset-[8%] z-20 opacity-[0.12]"
                style={{
                  background:
                    'repeating-linear-gradient(to bottom, transparent 0px, transparent 5px, rgba(198,166,107,0.8) 6px)',
                  mixBlendMode: 'screen',
                }}
              />

              {/* Glitch */}

              <motion.div
                animate={{
                  opacity: [0, 0.3, 0, 0.15, 0],
                  x: [0, -4, 3, -2, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="absolute inset-[10%] z-40 border border-[#c6a66b]/20"
              />

            </motion.div>

            {/* =================================================
                HUD
            ================================================= */}

            <div className="absolute inset-0 z-50 pointer-events-none">

              <div className="absolute top-[15%] left-0 text-[8px] font-mono tracking-widest text-[#c6a66b]/60">
                ARCHIVE // 1954
              </div>

              <div className="absolute top-[15%] right-0 text-[8px] font-mono tracking-widest text-[#c6a66b]/60">
                DZ // MEMORY
              </div>

              <div className="absolute bottom-[17%] left-0 text-[8px] font-mono text-[#c6a66b]/50">
                MEMORY SYSTEM
              </div>

              <div className="absolute bottom-[17%] right-0 text-[8px] font-mono text-[#c6a66b]/50">
                ARCHIVE SECURE
              </div>

            </div>

        </div>


        {/* =====================================================
                   HISTORICAL TEXT AREA
         ===================================================== */}

<div className="absolute left-0 right-0 bottom-[13%] z-[200] flex justify-center px-6">
  <div
    className="
      w-full
      max-w-[650px]
      rounded-2xl
      border
      border-[#c6a66b]/35
      bg-[#050505]/80
      px-6
      py-5
      text-center
    "
    style={{
      boxShadow:
        '0 0 30px rgba(198,166,107,0.08), inset 0 0 25px rgba(198,166,107,0.04)',
    }}
  >
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="h-[1px] w-10 bg-[#c6a66b]/30" />

      <span className="text-[8px] md:text-[10px] font-mono tracking-[0.25em] text-[#c6a66b]/60">
        MEMORY TRANSMISSION
      </span>

      <div className="h-[1px] w-10 bg-[#c6a66b]/30" />
    </div>

    <div className="space-y-2">
  {phrases.map((phrase, index) => (
    index <= phraseIndex && (
      <motion.p
        key={index}
        initial={{
          opacity: 0,
          y: 15,
          filter: 'blur(6px)',
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="text-lg md:text-2xl font-black text-[#f1dfb1]"
      >
        {phrase}
      </motion.p>
    )
  ))}
</div>
  </div>
</div>

        {/* =====================================================
            PARTICLES
        ===================================================== */}

        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {Array.from({ length: 45 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: `${Math.random() * 100}%`,
                y: `${100 + Math.random() * 20}%`,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                y: '-20%',
              }}
              transition={{
                duration: 5 + Math.random() * 6,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-[2px] h-[2px] rounded-full bg-[#c6a66b]"
              style={{
                boxShadow:
                  '0 0 8px rgba(198,166,107,0.9)',
              }}
            />
          ))}

        </div>

     

        {/* =====================================================
            EXPLORE BUTTON
        ===================================================== */}

        <AnimatePresence>

          {showExplore && (

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="absolute bottom-[5%] left-0 right-0 z-[500] flex justify-center"
              style={{
                pointerEvents: 'auto',
              }}
            >

              <motion.button
                type="button"
                onClick={handleExplore}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="relative group min-w-[190px] px-10 py-4 rounded-xl border border-[#c6a66b]/70 bg-[#c6a66b]/10 text-[#f0dca5] font-black text-sm tracking-widest overflow-hidden cursor-pointer"
                style={{
                  pointerEvents: 'auto',
                  boxShadow:
                    '0 0 25px rgba(198,166,107,0.18), inset 0 0 25px rgba(198,166,107,0.05)',
                }}
              >

                {/* Light sweep */}

                <motion.span
                  animate={{
                    x: ['-120%', '120%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'linear',
                  }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#c6a66b]/30 to-transparent skew-x-12 pointer-events-none"
                />

                <span className="relative z-10">
                  استكشف
                </span>

              </motion.button>

            </motion.div>

          )}

        </AnimatePresence>

        {/* =====================================================
            TITLE
        ===================================================== */}

        <div className="absolute top-[5%] left-0 right-0 z-[300] text-center pointer-events-none">

          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1,
              duration: 1.2,
            }}
          >

            <div className="flex items-center justify-center gap-3 mb-2">

              <div className="w-10 h-[1px] bg-[#c6a66b]/30" />

              <span className="text-[8px] md:text-[10px] font-mono text-[#c6a66b]/70 tracking-[0.4em]">
                ALGERIAN HISTORICAL ARCHIVE
              </span>

              <div className="w-10 h-[1px] bg-[#c6a66b]/30" />

            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white">
              ذاكرة الجزائر
            </h2>

            <p className="mt-1 text-[9px] md:text-xs text-[#c6a66b]/70 font-bold">
              الأرشيف الوطني للثورة التحريرية
            </p>

          </motion.div>

        </div>

        {/* =====================================================
            VIGNETTE
        ===================================================== */}

        <div
          className="absolute inset-0 z-[800] pointer-events-none"
          style={{
            boxShadow:
              'inset 0 0 180px rgba(0,0,0,0.95)',
          }}
        />

        {/* =====================================================
            GRAIN
        ===================================================== */}

        <div
          className="absolute inset-0 z-[801] pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/stardust.png")',
          }}
        />

      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;