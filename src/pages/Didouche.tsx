import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Didouche() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-[#050505] text-white font-serif"
      dir="rtl"
    >
      {/* BACK BUTTON */}
      <div className="fixed top-8 right-8 z-50">
        <Link to="/characters" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full transition-all group">
          <span className="text-sm font-bold">العودة للشخصيات</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-end justify-start px-8 lg:px-32 pb-16 overflow-hidden">
        <img src="/image/Didouch.jpg" loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale brightness-50" alt="ديدوش مراد" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="w-16 h-1 bg-brand-green mb-6"></div>
          <h1 className="text-5xl lg:text-7xl font-black mb-4 drop-shadow-2xl">ديدوش مراد</h1>
          <p className="text-xl text-gray-300 font-medium italic opacity-80">"أصغر القادة الستة ومحرر بيان أول نوفمبر"</p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-8 lg:px-0 py-20 space-y-24">
        
        {/* BIO */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-right">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold border-r-4 border-brand-green pr-4">الشهيد والمنظر الثوري</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              ديدوش مراد (1927 - 1955) المعروف بلقب "سي عبد القادر"، هو أحد القادة الستة الذين أعدوا لاندلاع الثورة التحريرية، وهو أول قائد ولاية يستشهد في ساحة المعركة.
            </p>
            <p className="text-xl text-gray-400 leading-relaxed">
              ولد في المرادية بالعاصمة، ترأس المنظمة الخاصة في عدة مناطق وساهم في صياغة بيان أول نوفمبر الذي حدد معالم القضية الجزائرية.
            </p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 h-fit">
            <h3 className="text-xl font-bold mb-6 text-brand-green">معلومات حول الشهيد</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex justify-between"><span>تاريخ الميلاد</span><span className="text-white">1927</span></li>
              <li className="flex justify-between"><span>مسقط الرأس</span><span className="text-white">المرادية، الجزائر العاصمة</span></li>
              <li className="flex justify-between"><span>الرتبة</span><span className="text-white">قائد الولاية الثانية (شمال قسنطينة)</span></li>
              <li className="flex justify-between"><span>اللقب الثوري</span><span className="text-white">سي عبد القادر</span></li>
            </ul>
          </div>
        </section>

        {/* QUOTE */}
        <section className="max-w-3xl mx-auto py-10 text-right">
          <div className="border-r-4 border-brand-green pr-8 italic">
            <p className="text-3xl lg:text-5xl font-bold leading-tight">"إذا استشهدنا، فدافعوا عن ذاكرتنا."</p>
            <cite className="block mt-6 text-brand-green font-bold">— ديدوش مراد لرفاقه</cite>
          </div>
        </section>

        {/* ROLE & ACHIEVEMENTS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-right">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">المسؤولية القيادية</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              تولى ديدوش مراد قيادة منطقة الشمال القسنطيني (الولاية الثانية)، حيث قام بتنظيم الخلايا الثورية وتدريب المجاهدين وتجهيزهم لضرب مراكز الاستعمار.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              كان له الفضل في ترسيخ العمل العسكري في المنطقة وتحويلها إلى قلعة حصينة صمدت أمام أعنف الهجمات الفرنسية.
            </p>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">إنجازاته التاريخية</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 justify-start flex-row-reverse">
                <div className="mt-2 w-2 h-2 bg-brand-green rounded-full shadow-[0_0_8px_#1f5f3a]"></div>
                <p><span className="font-bold text-white">صياغة البيان:</span> ساهم بفعالية في تحرير بيان أول نوفمبر 1954.</p>
              </li>
              <li className="flex items-start gap-4 justify-start flex-row-reverse">
                <div className="mt-2 w-2 h-2 bg-brand-green rounded-full shadow-[0_0_8px_#1f5f3a]"></div>
                <p><span className="font-bold text-white">التنظيم العسكري:</span> وضع الهيكلة الأولى لجيش التحرير في الشرق الجزائري.</p>
              </li>
              <li className="flex items-start gap-4 justify-start flex-row-reverse">
                <div className="mt-2 w-2 h-2 bg-brand-green rounded-full shadow-[0_0_8px_#1f5f3a]"></div>
                <p><span className="font-bold text-white">معركة وادي بوكركر:</span> قاد المعركة التي استشهد فيها ببطولة نادرة.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* ENDING */}
        <section className="text-center py-20 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-4">أول الشهداء القادة</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            استشهد ديدوش مراد في 18 جانفي 1955 في معركة وادي بوكركر، ليكون أول قائد من مجموعة الستة يسقط في ميدان الشرف، تاركاً خلفه وصية بضرورة مواصلة الكفاح حتى الاستقلال.
          </p>
        </section>

      </main>

      <footer className="py-12 text-center border-t border-white/5 opacity-40">
        <p>© منارة التاريخ - الأرشيف الوطني الرقمي</p>
      </footer>
    </motion.div>
  );
}
