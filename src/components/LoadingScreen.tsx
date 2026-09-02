import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface ParticlePoint {
  x: number;
  y: number;
  size: number;
  delay: number;
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

// ============================================================
//  دوال مساعدة
// ============================================================
const generateParticles = (imageData: ImageData, width: number, height: number): ParticlePoint[] => {
  const points: ParticlePoint[] = [];
  const step = 3;
  const brightnessThreshold = 35;
  const alphaThreshold = 80;
  const randomThreshold = 0.35;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const index = (y * width + x) * 4;
      const r = imageData.data[index];
      const g = imageData.data[index + 1];
      const b = imageData.data[index + 2];
      const alpha = imageData.data[index + 3];
      const brightness = (r + g + b) / 3;

      if (alpha > alphaThreshold && brightness > brightnessThreshold && Math.random() > randomThreshold) {
        points.push({
          x: (x / width - 0.5) * 100,
          y: (y / height - 0.5) * 135,
          size: Math.random() * 1.8 + 0.6,
          delay: Math.random() * 1.8,
        });
      }
    }
  }
  return points;
};

// ============================================================
//  المكوّن الرئيسي
// ============================================================
const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(-1);
  const [showExplore, setShowExplore] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [faceParticles, setFaceParticles] = useState<ParticlePoint[]>([]);
  const [particlesReady, setParticlesReady] = useState(false);
  const [faceFormed, setFaceFormed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const speechTimeoutRef = useRef<number | null>(null);

  // ============================================================
  //  تحميل الصورة بالكود الأصلي (180x240)
  // ============================================================
  useEffect(() => {
    if (!visible) return;

    const image = new Image();
    image.src = '/image/hologram-face.png';

    image.onload = () => {
      setImageLoaded(true);
      const canvas = document.createElement('canvas');
      const width = 180;
      const height = 240;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(image, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const points = generateParticles(imageData, width, height);

      setFaceParticles(points);
      setParticlesReady(true);

      setTimeout(() => {
        setFaceFormed(true);
      }, 2800);
    };

    image.onerror = () => {
      // Fallback في حال فشل تحميل الصورة
      setImageLoaded(true);
      const fallbackPoints: ParticlePoint[] = Array.from({ length: 300 }, (_, i) => ({
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 100,
        size: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 1.5,
      }));
      setFaceParticles(fallbackPoints);
      setParticlesReady(true);
      setTimeout(() => setFaceFormed(true), 2000);
    };

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [visible]);

  // ============================================================
  //  التحقق من الزيارة الأولى
  // ============================================================
  useEffect(() => {
    if (sessionStorage.getItem('archive_intro_seen') === 'true') {
      setVisible(false);
      onFinish();
    }
  }, [onFinish]);

  // ============================================================
  //  حركة الماوس
  // ============================================================
  useEffect(() => {
    if (!visible) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [visible]);

  // ============================================================
  //  النطق
  // ============================================================
  const speakPhrase = useCallback((text: string): Promise<void> => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.78;
      utterance.pitch = 0.85;
      utterance.volume = 1;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);

      speechTimeoutRef.current = window.setTimeout(resolve, 4000);
    });
  }, []);

  // ============================================================
  //  التسلسل الزمني
  // ============================================================
  useEffect(() => {
    if (!visible) return;

    const startSequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3800));

      for (let i = 0; i < phrases.length; i++) {
        if (!visible) return;
        setPhraseIndex(i);
        await speakPhrase(phrases[i]);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      setPhraseIndex(phrases.length);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setShowExplore(true);
    };

    startSequence();

    return () => {
      window.speechSynthesis?.cancel();
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
    };
  }, [visible, speakPhrase]);

  // ============================================================
  //  استكشاف
  // ============================================================
  const handleExplore = useCallback(() => {
    if (isLeaving) return;
    setIsLeaving(true);

    window.speechSynthesis?.cancel();
    sessionStorage.setItem('archive_intro_seen', 'true');

    setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 600);
    }, 600);
  }, [isLeaving, onFinish]);

  // ============================================================
  //  جسيمات الخلفية
  // ============================================================
  const backgroundParticles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 4,
    })), []
  );

  if (!visible) return null;

  // ============================================================
  //  العرض
  // ============================================================
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLeaving ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] overflow-hidden bg-[#020202] text-white"
        dir="rtl"
      >
        {/* خلفية */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(198,166,107,0.07) 0%, rgba(0,0,0,0.9) 50%, #020202 80%)',
          }}
        />

        {/* توهج ذهبي */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 w-[350px] h-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] bg-[#c6a66b] pointer-events-none"
        />

        {/* =====================================================
            الهولوغرام
        ===================================================== */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: '1200px', pointerEvents: 'none' }}
        >
          <motion.div
            animate={{
              rotateY: mouse.x * 6,
              rotateX: -mouse.y * 4.5,
              x: mouse.x * 10,
              y: mouse.y * 7,
            }}
            transition={{ type: 'spring', stiffness: 30, damping: 18, mass: 1 }}
            className="relative w-[280px] h-[400px] sm:w-[340px] sm:h-[480px] md:w-[420px] md:h-[560px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* حلقات خارجية */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute left-1/2 top-1/2 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c6a66b]/15"
            />

            <motion.div
              animate={{ rotateZ: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="absolute left-1/2 top-1/2 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c6a66b]/10 border-dashed"
            />

            <motion.div
              animate={{ rotateZ: 360, scale: [1, 1.03, 1] }}
              transition={{ rotateZ: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
              className="absolute left-1/2 top-1/2 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c6a66b]/20"
            />

            {/* جسيمات الوجه */}
            {particlesReady && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(80px)' }}>
                <div className="relative w-full h-full">
                  {faceParticles.map((particle, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        left: `${50 + particle.x / 2.5}%`,
                        top: `${50 + particle.y / 2.5}%`,
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{
                        opacity: [0, 0.9, 1],
                        scale: [0, 1.3, 1]
                      }}
                      transition={{
                        duration: 2.5,
                        delay: particle.delay * 0.7,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="absolute rounded-full bg-[#c6a66b]"
                      style={{
                        width: particle.size,
                        height: particle.size,
                        boxShadow: '0 0 5px rgba(198,166,107,0.7)',
                      }}
                    />
                  ))}

                  {/* صورة الهولوغرام */}
                  {faceFormed && imageLoaded && (
                    <motion.img
                      src="/image/hologram-face.png"
                      alt="هولوغرام ذاكرة الجزائر"
                      initial={{
                        opacity: 0,
                        filter: 'blur(8px)',
                        scale: 1.03,
                      }}
                      animate={{
                        opacity: 0.55,
                        filter: 'blur(0px)',
                        scale: 1,
                      }}
                      transition={{
                        duration: 1.8,
                        ease: 'easeOut',
                      }}
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{
                        filter: `
                          sepia(0.2)
                          saturate(0.8)
                          contrast(1.15)
                          drop-shadow(0 0 20px rgba(198,166,107,0.5))
                          drop-shadow(0 0 50px rgba(198,166,107,0.15))
                        `,
                      }}
                    />
                  )}
                </div>
              </div>
            )}

            {/* خط المسح */}
            <motion.div
              animate={{ top: ['8%', '92%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              className="absolute left-[10%] right-[10%] h-[1.5px] z-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(198,166,107,0.8), transparent)',
                boxShadow: '0 0 20px rgba(198,166,107,0.6)',
              }}
            />

            {/* خطوط رقمية */}
            <div
              className="absolute inset-[10%] z-20 opacity-[0.1]"
              style={{
                background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 6px, rgba(198,166,107,0.6) 7px)',
                mixBlendMode: 'screen',
              }}
            />
          </motion.div>
        </div>

        {/* =====================================================
            HUD
        ===================================================== */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="absolute top-[12%] left-4 text-[7px] font-mono tracking-widest text-[#c6a66b]/50">ARCHIVE // 1954</div>
          <div className="absolute top-[12%] right-4 text-[7px] font-mono tracking-widest text-[#c6a66b]/50">DZ // MEMORY</div>
          <div className="absolute bottom-[15%] left-4 text-[7px] font-mono text-[#c6a66b]/40">MEMORY SYSTEM</div>
          <div className="absolute bottom-[15%] right-4 text-[7px] font-mono text-[#c6a66b]/40">ARCHIVE SECURE</div>
        </div>

        {/* =====================================================
            النص التاريخي
        ===================================================== */}
        <div className="absolute left-0 right-0 bottom-[10%] z-[200] flex justify-center px-4">
          <div
            className="w-full max-w-[500px] rounded-xl border border-[#c6a66b]/30 bg-[#050505]/70 px-4 py-4 text-center"
            style={{ boxShadow: '0 0 20px rgba(198,166,107,0.05)' }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-[#c6a66b]/25" />
              <span className="text-[7px] font-mono tracking-[0.2em] text-[#c6a66b]/50">MEMORY TRANSMISSION</span>
              <div className="h-[1px] w-8 bg-[#c6a66b]/25" />
            </div>

            <div className="space-y-1.5">
              {phrases.map((phrase, index) => (
                index <= phraseIndex && (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-base md:text-xl font-black text-[#f1dfb1]"
                  >
                    {phrase}
                  </motion.p>
                )
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            جسيمات الخلفية
        ===================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {backgroundParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: `${p.x}%`, y: '100%' }}
              animate={{ opacity: [0, 0.5, 0], y: '-20%' }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[1.5px] h-[1.5px] rounded-full bg-[#c6a66b]"
              style={{ boxShadow: '0 0 6px rgba(198,166,107,0.6)' }}
            />
          ))}
        </div>

        {/* =====================================================
            زر الاستكشاف
        ===================================================== */}
        <AnimatePresence>
          {showExplore && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-[4%] left-0 right-0 z-[500] flex justify-center"
              style={{ pointerEvents: 'auto' }}
            >
              <motion.button
                type="button"
                onClick={handleExplore}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative group min-w-[150px] px-8 py-3 rounded-xl border border-[#c6a66b]/60 bg-[#c6a66b]/10 text-[#f0dca5] font-black text-xs tracking-widest overflow-hidden cursor-pointer"
                style={{
                  boxShadow: '0 0 20px rgba(198,166,107,0.12), inset 0 0 20px rgba(198,166,107,0.03)',
                }}
              >
                <motion.span
                  animate={{ x: ['-130%', '130%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
                  className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-[#c6a66b]/25 to-transparent skew-x-12 pointer-events-none"
                />
                <span className="relative z-10">استكشف</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            العنوان
        ===================================================== */}
        <div className="absolute top-[4%] left-0 right-0 z-[300] text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-8 h-[1px] bg-[#c6a66b]/25" />
              <span className="text-[7px] font-mono text-[#c6a66b]/60 tracking-[0.3em]">ALGERIAN ARCHIVE</span>
              <div className="w-8 h-[1px] bg-[#c6a66b]/25" />
            </div>
            <h2 className="text-xl md:text-3xl font-black text-white">ذاكرة الجزائر</h2>
            <p className="mt-0.5 text-[8px] text-[#c6a66b]/60 font-bold">الأرشيف الوطني للثورة التحريرية</p>
          </motion.div>
        </div>

        {/* =====================================================
            تأثيرات نهائية
        ===================================================== */}
        <div
          className="absolute inset-0 z-[800] pointer-events-none"
          style={{ boxShadow: 'inset 0 0 120px rgba(0,0,0,0.9)' }}
        />
        <div
          className="absolute inset-0 z-[801] pointer-events-none opacity-[0.015]"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;