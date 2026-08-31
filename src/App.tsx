import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, Map as MapIcon, Users, BookOpen, Music, Info, 
  Menu, X, MessageSquare, Send, ChevronRight, UserCircle, 
  CheckCircle2, Play, Download, AlertTriangle, Shield, Clock
} from 'lucide-react';
import Home from './pages/Home';

import Characters from './pages/Characters';
import BenMhidi from './pages/BenMhidi';
import Hassiba from './pages/Hassiba';
import Didouche from './pages/Didouche';
import BenBoulaid from './pages/BenBoulaid';
import CharacterDetails from './pages/CharacterDetails';
import JourneyDetail from './pages/JourneyDetail';
import Battles from './pages/Battles';
import WilayaPage from './pages/WilayaPage';
import OperationsRoom from './pages/OperationsRoom';
import NationalMartyrsMap from './pages/NationalMartyrsMap';
import TimeMachinePage from './pages/TimeMachinePage';
import AdminLogin from './pages/AdminLogin';
import DigitalLibrary from './pages/DigitalLibrary';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminDashboard';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Logo from './components/Logo';
import AnimatedLogo from './components/AnimatedLogo';

// UI COMPONENTS
const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const location = useLocation();
  const menuItems = [
    { icon: <HomeIcon size={18} />, label: 'الرئيسية', path: '/' },
    { icon: <MapIcon size={18} />, label: 'المناطق والخرائط', path: '/#map-section' },
    { icon: <Users size={18} />, label: 'شخصيات تاريخية', path: '/characters' },
    { icon: <BookOpen size={18} />, label: 'المكتبة الرقمية', path: '/library' },
    { icon: <Clock size={18} />, label: 'آلة الزمن', path: '/time-machine' },
    { icon: <Shield size={18} />, label: 'غرفة العمليات', path: '/operations-room' },
    { icon: <MapIcon size={18} />, label: 'خريطة الشهداء', path: '/national-martyrs-map' },
    { icon: <Music size={18} />, label: 'الأرشيف الصوتي', path: '/media' },
    { icon: <Info size={18} />, label: 'عن الذاكرة', path: '/about' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md" 
            onClick={onClose} 
          />
        )}
      </AnimatePresence>

      <aside className={`fixed top-0 right-0 h-screen w-[320px] bg-black/95 backdrop-blur-xl border-l border-white/5 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-[-30px_0_60px_rgba(0,0,0,0.8)]' : 'translate-x-full shadow-none'}`}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 z-50 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-brand-green/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 pt-12 flex flex-col items-center">
            <Logo size="md" className="scale-110 mb-8" />
            <div className="w-full h-[1px] bg-gradient-to-l from-white/10 via-white/5 to-transparent" />
          </div>
          
          <nav className="flex-1 px-6 overflow-y-auto custom-scrollbar">
            <ul className="space-y-3">
              {menuItems.map((item, idx) => {
                const isActive = location.pathname === item.path || (item.path.includes('#') && location.hash === item.path.split('#')[1]);
                return (
                  <li key={idx} dir="rtl">
                     <Link 
                       to={item.path} 
                       onClick={onClose}
                       className={`relative flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-500 overflow-hidden group ${
                         isActive 
                           ? 'bg-brand-green/10 text-white shadow-[0_10px_30px_rgba(31,95,58,0.05)]' 
                           : 'text-gray-500 hover:text-white hover:bg-white/5'
                       }`}
                     >
                       {/* Active Page Indicator */}
                       {isActive && (
                         <motion.div 
                           layoutId="active-nav-indicator"
                           className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-green rounded-l-full shadow-[0_0_15px_rgba(31,95,58,0.6)]"
                         />
                       )}
                       
                       <span className={`transition-all duration-500 group-hover:scale-120 group-hover:drop-shadow-[0_0_10px_rgba(31,107,71,0.4)] ${isActive ? 'text-[#c6a66b]' : 'group-hover:text-[#c6a66b]'}`}>
                         {item.icon}
                       </span>
                       
                       <span className={`text-base font-black tracking-tight transition-all duration-500 group-hover:translate-x-[-6px] ${isActive ? 'mr-1' : ''}`}>
                         {item.label}
                       </span>

                       {/* Hover Reflected Light Effect */}
                       <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/[0.03] transition-colors -z-10" />
                     </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer Branding */}
          <div className="p-8 mt-auto">
             <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-right relative overflow-hidden group/footer">
                <div className="relative z-10">
                   <p className="text-[10px] text-[#c6a66b] font-mono tracking-widest uppercase mb-3 opacity-60">الذاكرة الوطنية</p>
                   <p className="text-sm font-bold text-white/50 group-hover/footer:text-white/80 transition-colors italic leading-relaxed">"المجد والخلود لشهداءنا الأبرار"</p>
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-brand-green/5 blur-3xl rounded-full" />
                <div className="absolute top-0 right-0 w-1 h-0 bg-brand-green group-hover/footer:h-full transition-all duration-1000" />
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Navbar = ({ onToggleSidebar, onReportIssue }: { onToggleSidebar: () => void, onReportIssue: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 right-0 left-0 z-40 transition-all duration-500 border-b border-white/5 ${scrolled ? 'bg-black/90 backdrop-blur-md py-2' : 'bg-transparent py-4 lg:py-5'}`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-6">
           <Link to="/" className="flex items-center group">
             <Logo size="sm" />
           </Link>
        </div>

        <div className="flex items-center gap-6 lg:gap-12">
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={onReportIssue}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#c6a66b]/60 hover:text-[#e11d48] transition-colors"
            >
              <AlertTriangle size={12} />
              <span>بلاغ</span>
            </button>
            <div className="w-[1px] h-4 bg-white/10" />
            <Link to="/#map-section" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">الخريطة</Link>
            <div className="w-[1px] h-4 bg-white/10" />
            <Link to="/characters" className="text-[10px] font-bold uppercase tracking-widest text-[#e11d48] hover:opacity-80">الشخصيات</Link>
          </div>

          <button onClick={onToggleSidebar} className="p-2 lg:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white active:scale-95 shadow-xl border border-white/5 group">
            <Menu size={20} className="group-hover:text-brand-green transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

const MobileBottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-white/5 p-4 lg:hidden">
       <div className="flex items-center justify-around">
          <Link to="/" className="flex flex-col items-center gap-1 text-brand-green"><HomeIcon size={20} /><span className="text-[10px] font-bold">الرئيسية</span></Link>
          <Link to="/#map-section" className="flex flex-col items-center gap-1 text-gray-500"><MapIcon size={20} /><span className="text-[10px] font-bold">الخريطة</span></Link>
          <Link to="/characters" className="flex flex-col items-center gap-1 text-gray-500"><Users size={20} /><span className="text-[10px] font-bold">الشخصيات</span></Link>
          <button className="flex flex-col items-center gap-1 text-gray-500"><UserCircle size={20} /><span className="text-[10px] font-bold">بروفايل</span></button>
       </div>
    </div>
  );
};

const ChatWithMujahid = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [messages, setMessages] = useState([
    { text: "السلام عليكم يا بني، أنا عمك المجاهد. ولدت في قلب الأوراس وعشت أيام الثورة لحظة بلحظة. عما تريد أن تسألني اليوم؟", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput("");
    
    // Simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "كانت ليلة أول نوفمبر ليلة لن ننساها أبداً، كانت باردة ولكن قلوبنا كانت تشتعل بنار الحرية. خرجنا في صمت والتحقنا بالجبل...", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="fixed bottom-24 right-6 lg:bottom-12 lg:right-12 z-50 w-[calc(100vw-48px)] lg:w-[450px] h-[600px] bg-[#0b0b0b] border border-white/10 rounded-2xl lg:rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="p-6 bg-brand-green/10 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-green shadow-[0_0_15px_rgba(31,95,58,0.3)]">
                     <img src="https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80&w=100&h=100&fit=crop" className="w-full h-full object-cover filter grayscale" alt="مجاهد" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-green rounded-full border-2 border-black" />
               </div>
               <div className="text-right">
                  <h3 className="font-bold text-white">عمي المجاهد</h3>
                  <p className="text-[10px] text-brand-green font-bold uppercase tracking-widest">شاهد على التاريخ</p>
               </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-gray-400"><X size={20} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 flex flex-col" dir="rtl">
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: m.isBot ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.isBot 
                    ? 'bg-white/5 border border-white/10 text-gray-200 self-end rounded-tr-none text-right' 
                    : 'bg-brand-green/20 border border-brand-green/30 text-white self-start rounded-tl-none text-right'
                }`}
              >
                {m.text}
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-black/40 border-t border-white/5">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسأل عن أي معركة أو شخصية..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-4 pl-12 text-white text-sm outline-none focus:border-brand-green transition-colors text-right"
                dir="rtl"
              />
              <button 
                onClick={handleSend}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-brand-green hover:text-white transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ExperienceDetail = () => {
  return (
    <div className="min-h-screen pt-24 lg:pt-32 px-6 lg:px-12 lg:pl-44 pb-32 lg:pb-20" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="flex items-center gap-2 text-brand-green font-bold text-sm mb-8 hover:translate-x-[-5px] transition-transform">
             <ChevronRight size={18} className="rotate-180" /> <span>العودة للمنصة الرئيسية</span>
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="px-3 py-1 bg-[#e11d48]/10 text-[#e11d48] text-[10px] font-bold rounded-full border border-[#e11d48]/20 uppercase tracking-widest">محتوى متميز</div>
            <div className="h-[1px] flex-1 bg-white/5"></div>
          </div>
          <h1 className="text-4xl lg:text-7xl font-black mb-6 font-display text-white text-right leading-tight">معركة الجزائر: <br className="lg:hidden" /> <span className="text-brand-green">قلب القصبة</span></h1>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl group isolate border border-white/5">
          <img 
            src="https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80&w=1200&h=675&fit=crop" 
            className="w-full h-full object-cover filter grayscale opacity-60 group-hover:scale-105 transition-transform duration-[2s]" 
            alt="The Battle of Algiers"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <button className="w-16 h-16 lg:w-24 lg:h-24 bg-brand-green rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(31,95,58,0.5)] hover:scale-110 active:scale-95 transition-all group/play">
                <Play size={24} className="lg:w-8 lg:h-8 rotate-180 fill-white" />
             </button>
          </div>
          <div className="absolute bottom-6 right-8 text-right">
             <p className="text-white font-bold text-lg mb-1">وثائقي: أيام الغضب في القصبة</p>
             <p className="text-gray-400 text-xs font-mono uppercase tracking-widest">Duration: 12:45 / 1957 Archive</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-right">
          <div className="lg:col-span-2 space-y-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              تعتبر معركة الجزائر (1956-1957) واحدة من أهم محطات الثورة التحريرية، حيث واجه مجموعة من الفدائيين العُزّل في أحياء القصبة الضيقة أعتى قوات النخبة الفرنسية (المظليين).
            </p>
            <p className="text-lg text-gray-400 leading-loose">
              كانت المعركة حرب عصابات حضرية اعتمد فيها المجاهدون على ذكاء التنظيم وشجاعة التنفيذ، مما أحرج الاستعمار أمام الرأي العام العالمي وأثبت أن الثورة لا تُقهر.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-8">
               <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center group hover:border-brand-green/30 transition-colors">
                  <div className="text-brand-green font-bold text-3xl mb-2">١٠٠٠+</div>
                  <div className="text-gray-500 text-[10px] font-mono tracking-widest uppercase">فدائي مشارك</div>
               </div>
               <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center group hover:border-[#e11d48]/30 transition-colors">
                  <div className="text-[#e11d48] font-bold text-3xl mb-2">٩ أشهر</div>
                  <div className="text-gray-500 text-[10px] font-mono tracking-widest uppercase">مدة الحصار</div>
               </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="p-8 bg-[#0b0b0b] rounded-2xl border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-1 h-full bg-brand-green" />
               <h4 className="text-white font-bold mb-4 flex items-center justify-end gap-2 text-sm uppercase tracking-widest">
                  وثائق أرشيفية <CheckCircle2 size={14} className="text-brand-green" />
               </h4>
               <ul className="space-y-4">
                  {['مخطط الهجمات الفدائية', 'بيانات جبهة التحرير', 'صور الحصار العسكري'].map((doc, i) => (
                    <li key={i} className="flex items-center justify-end gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/10 group/item">
                       <span className="text-gray-400 text-sm group-hover/item:text-white">{doc}</span>
                       <div className="p-2 bg-white/5 rounded-lg text-gray-500 group-hover/item:text-brand-green transition-colors"><Download size={14} /></div>
                    </li>
                  ))}
               </ul>
            </div>
            
            <div className="p-8 bg-brand-green/5 rounded-2xl border border-brand-green/10">
               <h4 className="text-white font-bold mb-4 opacity-80">هل تعلم؟</h4>
               <p className="text-sm text-gray-400 leading-relaxed italic">
                 "بيان أول نوفمبر تمت كتابته وتوزيعه في سرية تامة باستخدام آلة كاتبة واحدة فقط، ليصبح أقوى وثيقة في تاريخ الجزائر المعاصر."
               </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const SimplePage = ({ title }: { title: string }) => (
  <div className="min-h-screen pt-32 px-12 text-center text-white" dir="rtl">
    <h1 className="text-5xl font-black mb-8">{title}</h1>
    <p className="text-gray-500">هذه الصفحة قيد التطوير ضمن الأرشيف الرقمي</p>
  </div>
);

const ReportIssueModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    type: 'bug',
    email: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const WHATSAPP_NUMBER = '213770000000'; // Replace with your actual WhatsApp number

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const typeLabel = formData.type === 'bug' ? 'مشكلة تقنية' : 'اقتراح / تحسين';
    const message = `*تقرير من منارة التاريخ*%0A%0A` +
                    `*النوع:* ${typeLabel}%0A` +
                    `*البريد:* ${formData.email || 'غير متوفر'}%0A` +
                    `*الوصف:* ${formData.description}`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success and close
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ type: 'bug', email: '', description: '' });
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0b0b0b] border border-white/10 rounded-2xl p-8 lg:p-10 shadow-2xl overflow-hidden"
            dir="rtl"
          >
             {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e11d48] to-transparent opacity-50" />
             
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-[#e11d48]/10 flex items-center justify-center text-[#e11d48]">
                      <AlertTriangle size={24} />
                   </div>
                   <div className="text-right">
                      <h3 className="text-xl font-black text-white">إرسال تقرير</h3>
                      <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Report an Issue</p>
                   </div>
                </div>
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"><X size={20} /></button>
             </div>

             {isSuccess ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex flex-col items-center justify-center py-10 text-center"
               >
                  <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green mb-6 border border-brand-green/30">
                     <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-black text-white mb-2">شكراً لمساهمتك</h4>
                  <p className="text-gray-400">تم إرسال بلاغك بنجاح. سنعمل على مراجعته في أقرب وقت.</p>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 block mr-1 uppercase tracking-widest">نوع البلاغ</label>
                     <div className="grid grid-cols-2 gap-3">
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, type: 'bug'})}
                          className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${formData.type === 'bug' ? 'bg-[#e11d48]/10 border-[#e11d48]/30 text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                        >
                           مشكلة تقنية
                        </button>
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, type: 'feedback'})}
                          className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${formData.type === 'feedback' ? 'bg-brand-green/10 border-brand-green/30 text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                        >
                           اقتراح / تحسين
                        </button>
                     </div>
                  </div>

                  <div className="space-y-2 text-right">
                     <label className="text-xs font-bold text-gray-400 block mr-1 uppercase tracking-widest">البريد الإلكتروني (اختياري)</label>
                     <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-sm outline-none focus:border-brand-green transition-all"
                        placeholder="email@example.com"
                     />
                  </div>

                  <div className="space-y-2 text-right">
                     <label className="text-xs font-bold text-gray-400 block mr-1 uppercase tracking-widest">الوصف</label>
                     <textarea 
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-sm outline-none focus:border-brand-green transition-all h-32 resize-none"
                        placeholder="اشرح لنا المشكلة أو الاقتراح بالتفصيل..."
                     />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-green hover:bg-brand-hover text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-brand-green/10 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {isSubmitting ? (
                        <>
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           <span>جاري الإرسال...</span>
                        </>
                     ) : (
                        <span>إرسال البلاغ</span>
                     )}
                  </button>
               </form>
             )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// MAIN APP COMPONENT
const AppContent = () => {
 const [isLoading, setIsLoading] = useState(() => {
  return sessionStorage.getItem('archive_intro_seen') !== 'true';
});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const bgAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const radioAudioRef = React.useRef<HTMLAudioElement | null>(null);

  // Handle Loading on Route Change (Optional: only for specific major routes)
  

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // If loading is finished, check hash
    if (!isLoading && location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location, isLoading]);

  useEffect(() => {
    // Initial audio setup
    bgAudioRef.current = new Audio("https://archive.org/download/wind-sound-effect/wind-sound-effect.mp3");
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0;
    
    radioAudioRef.current = new Audio("https://archive.org/download/AlgerianRevolutionRadio/RadioAlgeria1954.mp3");

    let audioInit = false;
    const startAudio = () => {
      if (audioInit || !bgAudioRef.current) return;
      bgAudioRef.current.play().then(() => {
        audioInit = true;
        let vol = 0;
        const fadeIn = setInterval(() => {
          if (bgAudioRef.current && vol < 0.15) {
            vol += 0.01;
            bgAudioRef.current.volume = vol;
          } else {
            clearInterval(fadeIn);
          }
        }, 200);
      }).catch(e => console.log("Audio autoplay blocked"));
    };

    window.addEventListener("click", startAudio, { once: true });
    window.addEventListener("touchstart", startAudio, { once: true });

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Handle radio sound on navigation buttons
    const handleRadioClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('a[href*="/experience"], .start-btn');
      if (btn && radioAudioRef.current) {
        radioAudioRef.current.currentTime = 0;
        radioAudioRef.current.volume = 0.5;
        radioAudioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("click", handleRadioClick);
    return () => window.removeEventListener("click", handleRadioClick);
  }, []);

  return (
    <div className="bg-[#050505] text-[#e5e5e5] font-sans selection:bg-brand-green selection:text-white" dir="rtl">
      <AnimatePresence>
  {isLoading && (
    <LoadingScreen
      onFinish={() => {
      sessionStorage.setItem('archive_intro_seen', 'true'); 
        setIsLoading(false);
      }}
    />
  )}
</AnimatePresence>

      <CustomCursor />
      {!isAdminRoute && (
        <Navbar 
          onToggleSidebar={() => setIsSidebarOpen(true)} 
          onReportIssue={() => setIsReportModalOpen(true)}
        />
      )}
      {!isAdminRoute && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home onChatToggle={() => setIsChatOpen(true)} />} />
          <Route path="/battles" element={<Battles />} />
          <Route path="/experiences" element={<SimplePage title="جميع التجارب" />} />
          <Route path="/experience/november" element={<ExperienceDetail />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/journey/:slug" element={<JourneyDetail />} />
          <Route path="/wilaya/:id" element={<WilayaPage />} />
          <Route path="/operations-room" element={<OperationsRoom />} />
          <Route path="/national-martyrs-map" element={<NationalMartyrsMap />} />
          <Route path="/time-machine" element={<TimeMachinePage />} />
          <Route path="/library" element={<DigitalLibrary />} />
          <Route path="/media" element={<SimplePage title="الأرشيف الصوتي" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about" element={<SimplePage title="عن ذاكرة الجزائر" />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </main>

      {!isAdminRoute && <ChatWithMujahid isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
      {!isAdminRoute && <ReportIssueModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />}
      {!isAdminRoute && <MobileBottomNav />}

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#1f5f3a]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#e11d48]/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
