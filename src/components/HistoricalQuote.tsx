import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const quotes = [
  "إذا استشهدنا، فدافعوا عن ذاكرتنا.",
  "الثورة الجزائرية مدرسة الشعوب في الكفاح.",
  "التاريخ لا يرحم من ينسى مآسي الماضي وبطولات الأجداد.",
  "المجد والخلود لشهداءنا الأبرار.",
  "الجزائر أمانة في أعناقنا.",
  "لا حرية بدون ذاكرة، ولا مستقبل بدون تاريخ.",
];

const HistoricalQuote = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-20 flex flex-col items-center justify-center text-center px-6">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#c6a66b]/60 italic font-serif leading-relaxed max-w-2xl"
          dir="rtl"
        >
          "{quotes[index]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default HistoricalQuote;
