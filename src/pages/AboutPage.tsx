import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Compass, Eye, Target, Calendar, Award, FileText, 
  Map, Users, BookOpen, Music, Shield, ArrowLeft, 
  CheckCircle2, Star, Quote, Heart, Info, Users2,
  Globe, Clock, History, Check, Landmark, GraduationCap
} from 'lucide-react';

// Animated Counter Component for Statistics
const AnimatedCounter = ({ target, suffix = '', duration = 1.5 }: { target: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  // Convert numbers to Arabic localized numerals
  const toArabicNumerals = (num: number) => {
    return num.toLocaleString('ar-DZ');
  };

  return (
    <span className="font-serif text-4xl lg:text-5xl font-black text-[#C6A66B] tracking-tight">
      {toArabicNumerals(count)}{suffix}
    </span>
  );
};

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(0);

  // Scroll to timeline sections or handle interaction
  const handleScrollToContent = () => {
    const el = document.getElementById('why-us-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const whyUsCards = [
    {
      title: "صون الذاكرة الوطنية",
      desc: "إن صون الذاكرة الوطنية وحمايتها من الاندثار هو التزام أخلاقي وتاريخي مقدس، تخليداً لتضحيات شهدائنا الأبرار ووفاءً لدمائهم الزكية التي روت أرض الجزائر الطاهرة.",
      number: "٠١",
      icon: <History className="w-8 h-8 text-[#C6A66B]" />
    },
    {
      title: "تاريخ تفاعلي للأجيال الصاعدة",
      desc: "نخاطب شباب اليوم بلغتهم العصرية، مقدمين لهم رحلات سينمائية وخرائط جغرافية تفاعلية تعيد تمثيل بطولات الأجداد بطريقة جذابة ومحفزة على التعلم والفخر.",
      number: "٠٢",
      icon: <GraduationCap className="w-8 h-8 text-[#C6A66B]" />
    },
    {
      title: "رقمنة الأرشيف التاريخي",
      desc: "نسعى لجمع وحماية الشهادات الشفوية، الوثائق، والخرائط النادرة وتحويلها إلى أصول رقمية محمية لتكون مرجعاً أكاديمياً متكاملاً وموثوقاً يسهل الوصول إليه.",
      number: "٠٣",
      icon: <FileText className="w-8 h-8 text-[#C6A66B]" />
    },
    {
      title: "تحصين الهوية الوطنية",
      desc: "حماية روايتنا التاريخية الوطنية والوقوف سداً منيعاً ضد كل محاولات الطمس أو التزييف، مع ترسيخ قيم الاعتزاز بالانتماء والمقاومة والسيادة الوطنية.",
      number: "٠٤",
      icon: <Landmark className="w-8 h-8 text-[#C6A66B]" />
    }
  ];

  const timelineSteps = [
    {
      title: "فكرة المشروع",
      period: "خريف ٢٠٢٤",
      desc: "بدأت المبادرة برؤية طموحة لتأسيس أول صرح تاريخي رقمي تفاعلي يجمع شتات الأرشيف المشتت للثورة الجزائرية، ويحوله إلى تجربة سردية سينمائية استثنائية تليق بالحدث."
    },
    {
      title: "جمع المصادر والشهادات",
      period: "شتاء ٢٠٢٥",
      desc: "أشهر من العمل الميداني الدؤوب والمقابلات مع المجاهدين البواسل وعائلات الشهداء، بالتنسيق مع المؤرخين لتوثيق وتدقيق الوقائع التاريخية والخرائط الجغرافية بدقة بالغة."
    },
    {
      title: "تطوير المنصة الرقمية",
      period: "ربيع ٢٠٢٥",
      desc: "تصميم وبناء نظام برمجي فاخر ومتقدم يجمع بين جمالية المتاحف الفنية ومؤثرات العرض المتطورة، مدعماً بخوادم سريعة تضمن استجابة تفاعلية فائقة في جميع الظروف."
    },
    {
      title: "رقمنة الأرشيف والأصوات",
      period: "صيف ٢٠٢٥",
      desc: "تحسين وترميم جودة تسجيلات الإذاعة السرية التاريخية، ومعالجة آلاف الصور النادرة والوثائق العسكرية السرية رقمياً لتقديمها بدقة لم يسبق لها مثيل."
    },
    {
      title: "إطلاق النسخة الرسمية",
      period: "أكتوبر ٢٠٢٥",
      desc: "تزامناً مع الذكرى التاريخية المجيدة، فُتحت بوابات المنصة لتكون متحفاً وطنياً متاحاً ومفتوحاً للجزائريين وللباحثين من جميع أنحاء العالم مجاناً."
    },
    {
      title: "التطوير المستمر والتحديثات",
      period: "٢٠٢٦ وما بعدها",
      desc: "إدماج خوارزميات الذكاء الاصطناعي المتقدمة (مثل المجاهد الافتراضي) وإطلاق غرف عمليات تفاعلية، مع استمرار إضافة الوثائق الجديدة أسبوعياً لتظل المنصة حية."
    }
  ];

  const featuresList = [
    {
      title: "الأرشيف الرقمي البصري",
      desc: "نافذة للاطلاع على وثائق، قصاصات صحف ومراسلات أصلية نادرة تروي تفاصيل الثورة بدقة متناهية.",
      icon: <BookOpen className="w-6 h-6 text-[#C6A66B]" />
    },
    {
      title: "الخرائط الجغرافية التفاعلية",
      desc: "استكشف الولايات التاريخية الست ومسارات المعارك ومراكز قيادة الثورة عبر خرائط ثلاثية الأبعاد تفاعلية.",
      icon: <Map className="w-6 h-6 text-[#C6A66B]" />
    },
    {
      title: "موسوعة الشخصيات العظيمة",
      desc: "سير ذاتية حية لقادة الثورة والشهداء والفدائيين مدعومة بالشهادات والوسائط النادرة والخرائط الشخصية.",
      icon: <Users className="w-6 h-6 text-[#C6A66B]" />
    },
    {
      title: "سجل المعارك الكبرى",
      desc: "توثيق استراتيجي للملاحم الكبرى والعمليات الفدائية من حيث الخطط، الأبطال، المخرج والنتائج العسكرية.",
      icon: <Shield className="w-6 h-6 text-[#C6A66B]" />
    },
    {
      title: "الرحلات التاريخية السردية",
      desc: "خوض غمار تجارب سينمائية تأخذك في خط زمني مرئي عبر محطات وقرارات الثورة الحاسمة.",
      icon: <Compass className="w-6 h-6 text-[#C6A66B]" />
    },
    {
      title: "المكتبة الرقمية للثورة",
      desc: "أكبر فضاء رقمي يضم مئات الكتب، الأطروحات العلمية، والأبحاث الموثقة حول المقاومة الوطنية والتحرير.",
      icon: <FileText className="w-6 h-6 text-[#C6A66B]" />
    }
  ];

  const coreValues = [
    { title: "الأمانة التاريخية", desc: "النقل الدقيق للأحداث التاريخية كما سُجلت ووثقت دون رتوش أو تزييف، التزاماً منا برسالة الشهداء.", icon: <Star className="w-8 h-8 text-[#C6A66B]" /> },
    { title: "الدقة العلمية", desc: "التدقيق الصارم والمطابقة الأكاديمية المستمرة لكل التواريخ، والأسماء، والمواقع الجغرافية المعروضة.", icon: <CheckCircle2 className="w-8 h-8 text-[#C6A66B]" /> },
    { title: "الموثوقية الأكاديمية", desc: "الاعتماد الكلي والمطلق على الوثائق والمصادر المعتمدة والشهادات الرسمية من المؤرخين المعتمدين.", icon: <Shield className="w-8 h-8 text-[#C6A66B]" /> },
    { title: "الهوية الوطنية", desc: "ترسيخ أبعاد الهوية الجزائرية الإسلامية العربية الأمازيغية وربط حاضر الأمة بماضيها المشرق الخالد.", icon: <Landmark className="w-8 h-8 text-[#C6A66B]" /> },
    { title: "التعليم التفاعلي", desc: "تبسيط المحتوى التاريخي الثقيل وتقديمه بنماذج تكنولوجية بصرية سهلة وممتعة تلائم الجميع.", icon: <GraduationCap className="w-8 h-8 text-[#C6A66B]" /> },
    { title: "التعاون المجتمعي", desc: "فتح باب المساهمة أمام العائلات، والباحثين، والهيئات لمشاركتنا الأرشيف والشهادات العائلية النادرة.", icon: <Users2 className="w-8 h-8 text-[#C6A66B]" /> }
  ];

  const teamProfiles = [
    {
      role: "الباحثون والأكاديميون",
      //name: "د. عبد القادر بلقاسم",
     // title: "بروفيسور في التاريخ المعاصر ورئيس اللجنة الأكاديمية للمنصة",
      //image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&h=300&fit=crop",
      //bio: "متخصص في أبحاث الثورة الجزائرية في الأوراس والشمال القسنطيني وله أكثر من ١٥ مؤلفاً تاريخياً موثقاً."
    },
    {
      role: "المؤرخون والتوثيق",
      //name: "أ. جميلة بن بوزيد",
      //title: "مستشارة تاريخية وخبيرة في شهادات الثورة الشفوية",
      //image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=300&fit=crop",
      //bio: "أشرفت على تسجيل وتدقيق أكثر من ٥٠٠ ساعة من المقابلات الحية والشهادات الشفوية للمجاهدين والمجاهدات."
    },
    {
      role: "مختصو الأرشفة الرقمية",
      //name: "م. كريم بوزيدي",
     // title: "رئيس قسم الرقمنة وترميم الوثائق والصور",
      //image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=300&fit=crop",
      //bio: "خبير في ترميم وتصحيح الوسائط والأفلام التاريخية النادرة وتحويل المخطوطات والخرائط العتيقة لنسخ تفاعلية."
    },
    {
      role: "المطورون والمصممون التقنيون",
      //name: "م. يوسف الجزائري",
     // title: "مطور واجهات أول ومصمم تجارب المستخدم السينمائية",
      //image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&fit=crop",
     // bio: "مطور شغوف يسخر تقنيات الويب ثلاثية الأبعاد والمؤثرات البصرية لرواية التاريخ بأسلوب معاصر مذهل."
    }
  ];

  const partners = [
    { name: "وزارة المجاهدين وذوي الحقوق", role: "شراكة ورعاية توثيقية" },
    { name: "الأرشيف الوطني الجزائري", role: "تزويد بالأرشيف والوثائق" },
    { name: "المتحف الوطني للمجاهد", role: "تعاون رقمي ومعرض افتراضي" },
    { name: "جامعة الجزائر - قسم التاريخ", role: "مراجعة علمية وأكاديمية" }
  ];

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen relative overflow-hidden selection:bg-[#C6A66B] selection:text-black pb-16" dir="rtl">
      
      {/* Decorative background grid and lighting effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[15%] w-[600px] h-[600px] bg-[#C6A66B]/5 blur-[200px] rounded-full" />
        <div className="absolute top-[35%] left-[5%] w-[450px] h-[450px] bg-emerald-950/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#e11d48]/5 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 pt-24 lg:pt-0 overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1600" 
            alt="Algerian History Museum Background" 
            className="w-full h-full object-cover opacity-15 grayscale brightness-50 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-5 py-2 border border-[#C6A66B]/30 rounded-full bg-black/40 backdrop-blur-md mb-2 shadow-[0_4px_20px_rgba(198,166,107,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#C6A66B] animate-pulse" />
            <span className="text-xs lg:text-sm font-bold uppercase tracking-wider text-[#C6A66B]">صرح التوثيق والذاكرة الوطنية الجزائرية</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-8xl font-black font-serif leading-[1.15] lg:leading-[1.1] tracking-tight">
              ذاكرة وطن... <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A66B] via-[#E2C799] to-[#C6A66B] drop-shadow-2xl">تـحـفـظـهـا الأجـيـال</span>
            </h1>
            
            {/* Elegant Gold Decorative Line */}
            <div className="flex items-center justify-center gap-4 py-4">
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C6A66B]/70" />
              <div className="w-3 h-3 rotate-45 border-2 border-[#C6A66B] bg-transparent" />
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C6A66B]/70" />
            </div>

            <p className="text-lg lg:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              بوابة وطنية فاخرة مخصصة لتوثيق، رقمنة، وعرض تاريخ المقاومة الجزائرية المظفرة وثورة أول نوفمبر ١٩٥٤ المجيدة بأحدث أساليب السرد التفاعلي والسينمائي الراقي.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="pt-8"
          >
            <button 
              onClick={handleScrollToContent}
              className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-[#C6A66B] to-[#B59253] hover:from-[#E2C799] hover:to-[#C6A66B] text-black font-black px-10 py-5 rounded-xl shadow-[0_15px_40px_rgba(198,166,107,0.25)] transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span className="text-lg">اكتشف الرحلة</span>
              <div className="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center group-hover:translate-x-[-4px] transition-transform">
                <ArrowLeft size={16} className="text-black stroke-[3]" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={handleScrollToContent}>
          <span className="text-[10px] uppercase tracking-widest font-mono text-gray-400">انزل لأسفل</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-6 rounded-full bg-[#C6A66B]" 
          />
        </div>
      </section>


      {/* ================= 2. WHY THIS PROJECT EXISTS ================= */}
      <section id="why-us-section" className="relative py-24 lg:py-32 px-6 lg:px-16 max-w-7xl mx-auto z-10 scroll-mt-20">
        <div className="text-center space-y-4 mb-20">
          <p className="text-[#C6A66B] text-xs lg:text-sm font-black tracking-widest uppercase">رسالة المنصة الإستراتيجية</p>
          <h2 className="text-3xl lg:text-5xl font-serif font-black text-white">لماذا تم إنشاء مشروع ذاكرة الجزائر؟</h2>
          <div className="w-16 h-1 bg-[#C6A66B] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyUsCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="relative p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-[#C6A66B]/30 hover:bg-white/[0.04] transition-all duration-500 group overflow-hidden"
            >
              {/* Corner accent glow */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#C6A66B]/5 blur-2xl rounded-full group-hover:bg-[#C6A66B]/10 transition-colors" />
              
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-[#C6A66B] group-hover:bg-[#C6A66B]/10 group-hover:border-[#C6A66B]/30 transition-all duration-500">
                  {card.icon}
                </div>
                <span className="font-mono text-3xl font-black text-white/10 group-hover:text-[#C6A66B]/20 transition-colors">
                  {card.number}
                </span>
              </div>

              <h3 className="text-xl lg:text-2xl font-black text-white mb-4 group-hover:text-[#C6A66B] transition-colors">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium text-sm lg:text-base group-hover:text-gray-300 transition-colors">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ================= 3. VISION & MISSION ================= */}
      <section className="relative py-24 bg-black/40 border-y border-white/5 px-6 lg:px-16 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6 text-right"
          >
            <p className="text-[#C6A66B] text-xs lg:text-sm font-black tracking-widest uppercase">رؤيتنا ورسالتنا للأجيال</p>
            <h2 className="text-3xl lg:text-5xl font-serif font-black text-white leading-tight">شعلة الحرية تنتقل من جيل إلى جيل</h2>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed font-medium">
              نحن نؤمن بأن التاريخ ليس مجرد أحداث جافة دُوّنت في الكتب القديمة، بل هو وجدان حي ينبض بالدروس، والتضحيات، والعزة. ومن هنا، تمثل رؤيتنا ورسالتنا إطار العمل لتوفير تجربة معرفية أصيلة ومبهرة بصرياً.
            </p>
            <div className="pt-4 flex items-center gap-6">
              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5 min-w-[120px]">
                <p className="text-2xl font-bold text-[#C6A66B] font-serif">١٠٠%</p>
                <p className="text-xs text-gray-500 mt-1">أرشيف مدقق</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5 min-w-[120px]">
                <p className="text-2xl font-bold text-emerald-500 font-serif">حماية</p>
                <p className="text-xs text-gray-500 mt-1">كاملة للأصول</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-[#C6A66B]/30 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-1.5 h-full bg-[#C6A66B]" />
              <div className="flex items-center gap-5 mb-5">
                <div className="p-3 bg-[#C6A66B]/10 rounded-xl text-[#C6A66B]">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">الرؤية الاستراتيجية</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                أن نكون البوابة الرقمية المرجعية الأوثق والأكثر تفاعلية عالمياً لتاريخ الثورة الجزائرية التحريرية، مقدمين نموذجاً متقدماً للمتاحف الوطنية الافتراضية التي تليق بعظمة ومكانة تضحيات المليون ونصف المليون شهيد.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-[#C6A66B]/30 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-1.5 h-full bg-emerald-700" />
              <div className="flex items-center gap-5 mb-5">
                <div className="p-3 bg-emerald-950/40 rounded-xl text-emerald-400">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">الرسالة النبيلة</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                جمع، رقمنة، وتبويب الوثائق التاريخية بدقة متناهية بالتعاون مع الباحثين، مع تصميم تجارب رقمية غامرة تحاكي واقع كفاح الشعب الجزائري وتسهل وصول الأجيال الحالية إليها لترسيخ قيم الانتماء والوطنية والوفاء لشهداء أول نوفمبر.
              </p>
            </motion.div>
          </div>

        </div>
      </section>


      {/* ================= 4. TIMELINE SECTION ================= */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-16 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-24">
            <p className="text-[#C6A66B] text-xs lg:text-sm font-black tracking-widest uppercase">مسار البناء والإعمار الرقمي</p>
            <h2 className="text-3xl lg:text-5xl font-serif font-black text-white">كيف شُيدت منارة الذاكرة الوطنية؟</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm lg:text-base">رحلتنا في تأسيس وبناء وتطوير هذا الصرح الرقمي خطوة بخطوة ليكون حارساً أميناً على أرشيف الثورة.</p>
            <div className="w-16 h-1 bg-[#C6A66B] mx-auto mt-4 rounded-full" />
          </div>

          <div className="relative border-r border-white/10 lg:border-r-0 lg:flex lg:justify-between lg:items-start lg:gap-6 pr-6 lg:pr-0">
            {/* Horizontal timeline connector for desktop */}
            <div className="hidden lg:block absolute top-[140px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C6A66B]/30 to-transparent z-0" />
            
            {/* Steps loop */}
            {timelineSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative mb-12 lg:mb-0 lg:flex-1 lg:text-center group"
                onClick={() => setActiveTimeline(idx)}
              >
                {/* Visual marker */}
                <div className="absolute right-[-31px] top-1.5 lg:static lg:mx-auto lg:mb-6 z-10 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 cursor-pointer ${
                    activeTimeline === idx 
                      ? 'bg-[#C6A66B] text-black border-[#C6A66B] shadow-[0_0_15px_rgba(198,166,107,0.6)] scale-110' 
                      : 'bg-black text-[#C6A66B] border-white/15 hover:border-[#C6A66B]'
                  }`}>
                    <span className="text-xs font-bold font-mono">{idx + 1}</span>
                  </div>
                </div>

                {/* Card details */}
                <div className={`p-6 rounded-2xl border transition-all duration-500 text-right lg:text-center ${
                  activeTimeline === idx 
                    ? 'bg-gradient-to-b from-[#C6A66B]/10 to-transparent border-[#C6A66B]/30 shadow-2xl' 
                    : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                }`}>
                  <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-[#C6A66B] mb-3 font-mono">
                    {step.period}
                  </span>
                  <h3 className="text-lg lg:text-xl font-black text-white mb-3 group-hover:text-[#C6A66B] transition-colors">{step.title}</h3>
                  <p className="text-gray-400 text-xs lg:text-sm leading-relaxed font-medium transition-colors group-hover:text-gray-300">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= 5. STATISTICS ================= */}
      <section className="relative py-24 bg-gradient-to-b from-black/40 to-transparent border-y border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
            
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl">
              <p className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">الشخصيات التاريخية</p>
              <AnimatedCounter target={150} suffix="+" />
              <p className="text-xs text-[#C6A66B] mt-2 font-medium">سيرة ذاتية موثقة بالكامل</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl">
              <p className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">المعارك والملاحم</p>
              <AnimatedCounter target={450} suffix="+" />
              <p className="text-xs text-[#C6A66B] mt-2 font-medium">اشتباك وعملية مسلحة موثقة</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl col-span-2 lg:col-span-1">
              <p className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">الوثائق التاريخية</p>
              <AnimatedCounter target={12000} suffix="+" />
              <p className="text-xs text-[#C6A66B] mt-2 font-medium">وثيقة ومراسلة عسكرية سرية</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl">
              <p className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">الصور والخرائط</p>
              <AnimatedCounter target={8500} suffix="+" />
              <p className="text-xs text-[#C6A66B] mt-2 font-medium">صورة أرشيفية نادرة مرقمنة</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl">
              <p className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">الولايات التاريخية</p>
              <AnimatedCounter target={6} suffix="" />
              <p className="text-xs text-[#C6A66B] mt-2 font-medium">ولايات جغرافية تحت التنظيم</p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= 6. PLATFORM FEATURES ================= */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-16 max-w-7xl mx-auto z-10">
        <div className="text-center space-y-4 mb-20">
          <p className="text-[#C6A66B] text-xs lg:text-sm font-black tracking-widest uppercase">أقسام ومميزات البوابة الرقمية</p>
          <h2 className="text-3xl lg:text-5xl font-serif font-black text-white">بنية المنصة الرقمية المتقدمة</h2>
          <div className="w-16 h-1 bg-[#C6A66B] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#C6A66B]/20 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden"
            >
              {/* Feature highlight glow */}
              <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-r from-transparent to-[#C6A66B]/40 group-hover:w-full transition-all duration-1000" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#C6A66B] group-hover:bg-[#C6A66B]/10 group-hover:scale-110 transition-all duration-500">
                  {feat.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-black text-white group-hover:text-[#C6A66B] transition-colors">{feat.title}</h3>
              </div>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ================= 7. CORE VALUES ================= */}
      <section className="relative py-24 bg-black/40 border-y border-white/5 px-6 lg:px-16 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <p className="text-[#C6A66B] text-xs lg:text-sm font-black tracking-widest uppercase">مبادئنا وثوابت عملنا</p>
            <h2 className="text-3xl lg:text-5xl font-serif font-black text-white">القيم والمبادئ الأساسية</h2>
            <div className="w-16 h-1 bg-[#C6A66B] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex items-start gap-6 group hover:border-[#C6A66B]/20 transition-all duration-500"
              >
                <div className="p-3 bg-white/5 rounded-xl text-[#C6A66B] group-hover:bg-[#C6A66B]/10 transition-colors">
                  {val.icon}
                </div>
                <div className="space-y-2 text-right">
                  <h3 className="text-lg font-black text-white group-hover:text-[#C6A66B] transition-colors">{val.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= 8. OUR TEAM ================= */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-16 max-w-7xl mx-auto z-10">
        <div className="text-center space-y-4 mb-20">
          <p className="text-[#C6A66B] text-xs lg:text-sm font-black tracking-widest uppercase">العقول والخبرات القائمة على المشروع</p>
          <h2 className="text-3xl lg:text-5xl font-serif font-black text-white">فريق العمل واللجنة الأكاديمية</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm lg:text-base">نخبة مكرسة لحماية الذاكرة الوطنية وصناعة الوعي التاريخي الجزائري.</p>
          <div className="w-16 h-1 bg-[#C6A66B] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamProfiles.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#C6A66B]/30 hover:bg-white/[0.04] transition-all duration-500 group flex flex-col items-center text-center overflow-hidden relative"
            >
              {/* Role badge */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 group-hover:text-[#C6A66B] group-hover:border-[#C6A66B]/20 transition-all">
                {member.role}
              </div>

              {/* Profile Image container */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#C6A66B] transition-all duration-500 shadow-2xl mb-6 relative mt-4">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#C6A66B] transition-colors">{member.name}</h3>
              <p className="text-xs text-[#C6A66B] font-bold mb-4 uppercase tracking-wider">{member.title}</p>
              <p className="text-gray-400 text-xs lg:text-sm leading-relaxed max-w-xs">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ================= 9. PARTNERS ================= */}
      <section className="relative py-24 bg-gradient-to-b from-transparent to-black/60 border-y border-white/5 px-6 lg:px-16 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-xs font-bold mb-12 uppercase tracking-widest">شركاء النجاح والجهات الداعمة</p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.15 }}
                className="p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:border-[#C6A66B]/20 hover:bg-[#C6A66B]/5 transition-all duration-500 group flex flex-col justify-center items-center h-28"
              >
                <span className="font-serif text-lg font-black text-gray-400 group-hover:text-[#C6A66B] transition-colors tracking-tight">
                  {partner.name}
                </span>
                <span className="text-[10px] text-gray-600 group-hover:text-gray-400 font-bold tracking-widest mt-2 uppercase transition-colors">
                  {partner.role}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= 10. FINAL QUOTE ================= */}
      <section className="relative py-32 lg:py-40 px-6 lg:px-16 z-10 text-center flex flex-col items-center justify-center overflow-hidden">
        {/* Giant decorative quotation marks */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-gray-500 select-none z-0 pointer-events-none">
          <Quote size={300} className="stroke-[0.5]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl space-y-10"
        >
          <div className="w-12 h-12 bg-[#C6A66B]/10 border border-[#C6A66B]/20 rounded-full flex items-center justify-center text-[#C6A66B] mx-auto shadow-xl">
            <Quote size={20} />
          </div>

          <h2 className="text-3xl lg:text-5xl font-serif font-black leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#C6A66B] py-2">
            "إنَّ الأمم التي تحفظ وتُخلد ذاكرتها التاريخية وتفتخر ببطولات شهدائها الأبرار... لهِي الأمم التي تصنع سيادتها بأيديها وتبني مستقبلاً لا يُقهر."
          </h2>

          <div className="space-y-2">
            <p className="text-[#C6A66B] text-sm lg:text-base font-black tracking-widest uppercase">الجمهورية الجزائرية الديمقراطية الشعبية</p>
            <p className="text-gray-500 text-xs font-mono">الذاكرة الوطنية ومجد المقاومة والتحرير</p>
          </div>
        </motion.div>
      </section>


      {/* ================= 11. FOOTER CTA ================= */}
      <section className="relative py-24 px-6 lg:px-16 z-10 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 text-center space-y-8 relative overflow-hidden"
        >
          {/* Decorative glowing lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C6A66B]/40 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-700/40 to-transparent" />
          
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-serif font-black text-white">ابدأ رحلتك التاريخية الآن</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base lg:text-lg">
              انضم إلينا واستكشف الأراشيف الرقمية، الخرائط التفاعلية الكبرى، وسير القادة الأحرار لتتعرف على عظمة الثورة الجزائرية.
            </p>
          </div>

          <div className="pt-6">
            <Link 
              to="/" 
              className="group relative inline-flex items-center gap-4 bg-transparent hover:bg-[#C6A66B] border border-[#C6A66B] hover:text-black text-[#C6A66B] font-black px-10 py-5 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="text-lg">ابدأ رحلتك</span>
              <div className="w-8 h-8 rounded-lg bg-[#C6A66B]/10 group-hover:bg-black/10 flex items-center justify-center group-hover:translate-x-[-4px] transition-transform">
                <ArrowLeft size={16} className="text-[#C6A66B] group-hover:text-black stroke-[3]" />
              </div>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
