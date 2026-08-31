import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function BenMhidi() {
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
        <img src="/image/Larbi.jpg" loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale brightness-50" alt="العربي بن مهيدي" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="w-16 h-1 bg-brand-green mb-6"></div>
          <h1 className="text-5xl lg:text-7xl font-black mb-4 drop-shadow-2xl">العربي بن مهيدي</h1>
          <p className="text-xl text-gray-300 font-medium italic opacity-80">"حكيم الثورة الجزائرية"</p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-8 lg:px-0 py-20 space-y-24">
        
        {/* BIO */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-right">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold border-r-4 border-brand-green pr-4">من هو العربي بن مهيدي؟</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              محمد العربي بن مهيدي (1923 - 1957) هو مناضل جزائري وأحد الوجوه البارزة في الحركة الوطنية والقيادة التاريخية للثورة الجزائرية منذ اندلاعها في 1 نوفمبر 1954. لُقب بـ "الحكيم" و"عقل الثورة" لرجاحة عقله ودهائه السياسي.
            </p>
            <p className="text-xl text-gray-400 leading-relaxed">
              ولد بعين مليلة في شرق الجزائر، وانخرط مبكراً في العمل السياسي والكفاح المسلح، حيث كان عضواً في المنظمة الخاصة (OS) وأحد "مجموعة الستة" الذين خططوا لاندلاع الثورة.
            </p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 h-fit">
            <h3 className="text-xl font-bold mb-6 text-brand-green">معلومات حول الشهيد</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex justify-between"><span>تاريخ الميلاد</span><span className="text-white">1923</span></li>
              <li className="flex justify-between"><span>مسقط الرأس</span><span className="text-white">عين مليلة</span></li>
              <li className="flex justify-between"><span>اللقب</span><span className="text-white">الحكيم / عقل الثورة</span></li>
              <li className="flex justify-between"><span>الرتبة</span><span className="text-white">قائد الولاية الخامسة</span></li>
            </ul>
          </div>
        </section>

        {/* QUOTE */}
        <section className="max-w-3xl mx-auto py-10 text-right">
          <div className="border-r-4 border-brand-green pr-8 italic">
            <p className="text-3xl lg:text-5xl font-bold leading-tight">"ألقوا بالثورة إلى الشارع سيحتضنها الشعب."</p>
            <cite className="block mt-6 text-brand-green font-bold">— العربي بن مهيدي</cite>
          </div>
        </section>

        {/* ROLE & ACHIEVEMENTS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-right">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">دوره في الثورة</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              تولى بن مهيدي قيادة الولاية الخامسة (وهران) وأثبت جدارة عسكرية وتنظيمية فائقة. ساهم في تنظيم مؤتمر الصومام (1956) الذي وضع الأسس التنظيمية للدولة الجزائرية والثورة.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              كان المهندس الفعلي لإضراب الثمانية أيام التاريخي وواحد من أبرز قادة معركة الجزائر في قلب القصبة.
            </p>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">أبرز المحطات</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 justify-start flex-row-reverse">
                <div className="mt-2 w-2 h-2 bg-brand-green rounded-full shadow-[0_0_8px_#1f5f3a]"></div>
                <p><span className="font-bold text-white">1954:</span> المشاركة في تأسيس جبهة التحرير الوطني.</p>
              </li>
              <li className="flex items-start gap-4 justify-start flex-row-reverse">
                <div className="mt-2 w-2 h-2 bg-brand-green rounded-full shadow-[0_0_8px_#1f5f3a]"></div>
                <p><span className="font-bold text-white">1956:</span> المشاركة الفعالة في مؤتمر الصومام.</p>
              </li>
              <li className="flex items-start gap-4 justify-start flex-row-reverse">
                <div className="mt-2 w-2 h-2 bg-brand-green rounded-full shadow-[0_0_8px_#1f5f3a]"></div>
                <p><span className="font-bold text-white">1957:</span> اعتقاله واستشهاده تحت التعذيب.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* ENDING */}
        <section className="text-center py-20 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-4">"ابتسامة في وجه الجلاد"</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            حتى لحظة اعتقاله، ظل العربي بن مهيدي محافظاً على ابتسامته الشهيرة وهدوئه المستفز لجلاديه، مما جعل الجنرال الفرنسي "بيجار" ينحني له احتراماً لعظمته.
          </p>
        </section>

      </main>

      <footer className="py-12 text-center border-t border-white/5 opacity-40">
        <p>© منارة التاريخ - الأرشيف الوطني الرقمي</p>
      </footer>
    </motion.div>
  );
}
