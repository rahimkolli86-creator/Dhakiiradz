import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Hassiba() {
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
        <img src="/image/Hassiba.jpg" loading="lazy" className="absolute inset-0 w-full h-full object-contain scale-100 grayscale brightness-50" alt="حسيبة بن بوعلي" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="w-16 h-1 bg-[#e11d48] mb-6"></div>
          <h1 className="text-5xl lg:text-7xl font-black mb-4 drop-shadow-2xl">حسيبة بن بوعلي</h1>
          <p className="text-xl text-gray-300 font-medium italic opacity-80">"رمز التضحية وبطلة معركة الجزائر"</p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-8 lg:px-0 py-20 space-y-24">
        
        {/* BIO */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-right">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold border-r-4 border-[#e11d48] pr-4">مسيرة الفدائية الشابة</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              حسيبة بن بوعلي (1938 - 1957) هي فدائية جزائرية ولدت في مدينة الشلف. انتقلت مع عائلتها إلى العاصمة حيث واصلت تعليمها وانخرطت مبكراً في صفوف جبهة التحرير الوطني، لتصبح واحدة من أبرز الوجوه النسائية في الثورة.
            </p>
            <p className="text-xl text-gray-400 leading-relaxed">
              اشتهرت بشجاعتها الفائقة في تنفيذ العمليات الفدائية بقلب العاصمة، وكانت حلقة وصل أساسية بين قادة الثورة في القصبة.
            </p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 h-fit">
            <h3 className="text-xl font-bold mb-6 text-[#e11d48]">معلومات حول الشهيد</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex justify-between"><span>تاريخ الميلاد</span><span className="text-white">1938</span></li>
              <li className="flex justify-between"><span>مسقط الرأس</span><span className="text-white">الشلف (الأصنام سابقاً)</span></li>
              <li className="flex justify-between"><span>اللقب</span><span className="text-white">زهرة القصبة</span></li>
              <li className="flex justify-between"><span>العمر عند الاستشهاد</span><span className="text-white">19 عاماً</span></li>
            </ul>
          </div>
        </section>

        {/* QUOTE */}
        <section className="max-w-3xl mx-auto py-10 text-right">
          <div className="border-r-4 border-[#e11d48] pr-8 italic">
            <p className="text-3xl lg:text-5xl font-bold leading-tight">"إن متنا، لا تنسوا أننا كنا نطالب بالحرية لأجلكم."</p>
            <cite className="block mt-6 text-[#e11d48] font-bold">— رسالة حسيبة في مذكراتها</cite>
          </div>
        </section>

        {/* ROLE & ACHIEVEMENTS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-right">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">دروها في معركة الجزائر</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              كانت حسيبة ضمن المجموعة الفدائية التي ضمت علي لابلوانت وعمر الصغير. ساهمت في نقل المتفجرات والتخطيط للعمليات التي هزت أركان الاستعمار في قلب العاصمة.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              رغم مطاردة قوات النخبة الفرنسية لها، رفضت مغادرة القصبة وفضلت البقاء بجانب رفاقها حتى الرمق الأخير.
            </p>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">المحطات الأخيرة</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 justify-start flex-row-reverse">
                <div className="mt-2 w-2 h-2 bg-[#e11d48] rounded-full shadow-[0_0_8px_#e11d48]"></div>
                <p><span className="font-bold text-white">1954:</span> الانضمام لصفوف الاتحاد العام للطلبة المسلمين الجزائريين.</p>
              </li>
              <li className="flex items-start gap-4 justify-start flex-row-reverse">
                <div className="mt-2 w-2 h-2 bg-[#e11d48] rounded-full shadow-[0_0_8px_#e11d48]"></div>
                <p><span className="font-bold text-white">1956:</span> ملاحقتها من قبل المخابرات الفرنسية واختفاؤها في القصبة.</p>
              </li>
              <li className="flex items-start gap-4 justify-start flex-row-reverse">
                <div className="mt-2 w-2 h-2 bg-[#e11d48] rounded-full shadow-[0_0_8px_#e11d48]"></div>
                <p><span className="font-bold text-white">1957:</span> استشهادها في نسف المنزل الذي كانت تأوي إليه رفقة علي لابلوانت.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* ENDING */}
        <section className="text-center py-20 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-4">الملحمة التاريخية</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            في 8 أكتوبر 1957، حاصرت القوات الفرنسية منزلاً في حي القصبة، ورفضت حسيبة ومن معها الاستسلام، فقام جيش الاحتلال بنسف المنزل بالكامل، لتسجل بدمائها ملحمة بطولية خالدة.
          </p>
        </section>

      </main>

      <footer className="py-12 text-center border-t border-white/5 opacity-40">
        <p>© منارة التاريخ - الأرشيف الوطني الرقمي</p>
      </footer>
    </motion.div>
  );
}
