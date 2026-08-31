import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, Edit, Plus, Trash2, Shield, Calendar, Users, Bookmark, Save, 
  Sparkles, Swords, ExternalLink, Search, Image as ImageIcon, FileText, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_58_WILAYAS_METADATA, generateWilayaData } from '../../data/wilayas';
import { Wilaya, Martyr, Battle, ArchivePhoto } from '../../types';

interface WilayaManagerProps {
  wilayas: Wilaya[];
  onUpdateWilaya: (id: string, updates: Partial<Wilaya>) => void;
}

const WilayaManager: React.FC<WilayaManagerProps> = ({ wilayas, onUpdateWilaya }) => {
  const [selectedId, setSelectedId] = useState('DZ-04');
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Combine provided wilayas or generate from 58 list
  const getWilaya = (id: string): Wilaya => {
    const existing = wilayas.find(w => w.id === id);
    if (existing) return existing;
    return generateWilayaData(id);
  };

  const currentWilaya = getWilaya(selectedId);

  // Form states for general info
  const [subtitle, setSubtitle] = useState('');
  const [quote, setQuote] = useState('');
  const [martyrsCount, setMartyrsCount] = useState(0);
  const [description, setDescription] = useState('');
  const [historicalOverview, setHistoricalOverview] = useState('');
  const [liberationHistory, setLiberationHistory] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [historicalZone, setHistoricalZone] = useState('');

  // Sub-add forms states
  const [newMartyrName, setNewMartyrName] = useState('');
  const [newMartyrRole, setNewMartyrRole] = useState('');
  const [newMartyrImg, setNewMartyrImg] = useState('');
  const [newMartyrQuote, setNewMartyrQuote] = useState('');
  const [newMartyrDeath, setNewMartyrDeath] = useState('');

  const [newBattleTitle, setNewBattleTitle] = useState('');
  const [newBattleYear, setNewBattleYear] = useState('');
  const [newBattleDesc, setNewBattleDesc] = useState('');
  const [newBattleLocation, setNewBattleLocation] = useState('');
  const [newBattleForces, setNewBattleForces] = useState('');

  const [newArcCaption, setNewArcCaption] = useState('');
  const [newArcUrl, setNewArcUrl] = useState('');
  const [newArcDate, setNewArcDate] = useState('');
  const [newArcSource, setNewArcSource] = useState('');

  // Sync state whenever Wilaya changes
  useEffect(() => {
    if (currentWilaya) {
      setSubtitle(currentWilaya.subtitle || '');
      setQuote(currentWilaya.quote || '');
      setMartyrsCount(currentWilaya.martyrsCount || 0);
      setDescription(currentWilaya.description || '');
      setHistoricalOverview(currentWilaya.historicalOverview || '');
      setLiberationHistory(currentWilaya.liberationHistory || '');
      setHeroImage(currentWilaya.heroImage || '');
      setHistoricalZone(currentWilaya.historicalZone || '');
    }
  }, [selectedId, currentWilaya]);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWilaya(selectedId, {
      subtitle,
      quote,
      martyrsCount: Number(martyrsCount),
      description,
      historicalOverview,
      liberationHistory,
      heroImage: heroImage || currentWilaya.heroImage,
      historicalZone
    });
    
    setFeedback(`تم حفظ وتحديث بيانات ولاية ${currentWilaya.name} بنجاح!`);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleAddMartyr = () => {
    if (!newMartyrName || !newMartyrRole) return;
    const updatedMartyrs = [
      ...(currentWilaya.martyrs || []),
      {
        id: `martyr-custom-${Date.now()}`,
        name: newMartyrName,
        role: newMartyrRole,
        image: newMartyrImg || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=600&fit=crop',
        quote: newMartyrQuote,
        deathDate: newMartyrDeath,
        biography: `${newMartyrName} - مجاهد وبطل من أبطال الولاية التاريخية.`
      }
    ];
    onUpdateWilaya(selectedId, { martyrs: updatedMartyrs });
    setNewMartyrName('');
    setNewMartyrRole('');
    setNewMartyrImg('');
    setNewMartyrQuote('');
    setNewMartyrDeath('');
  };

  const handleDeleteMartyr = (index: number) => {
    const updated = (currentWilaya.martyrs || []).filter((_, i) => i !== index);
    onUpdateWilaya(selectedId, { martyrs: updated });
  };

  const handleAddBattle = () => {
    if (!newBattleTitle || !newBattleYear || !newBattleDesc) return;
    const updatedBattles = [
      ...(currentWilaya.battles || []),
      {
        id: `battle-custom-${Date.now()}`,
        year: newBattleYear,
        title: newBattleTitle,
        description: newBattleDesc,
        location: newBattleLocation || currentWilaya.name,
        forces: newBattleForces,
        image: currentWilaya.heroImage
      }
    ];
    onUpdateWilaya(selectedId, { battles: updatedBattles, battlesCount: updatedBattles.length });
    setNewBattleTitle('');
    setNewBattleYear('');
    setNewBattleDesc('');
    setNewBattleLocation('');
    setNewBattleForces('');
  };

  const handleDeleteBattle = (index: number) => {
    const updated = (currentWilaya.battles || []).filter((_, i) => i !== index);
    onUpdateWilaya(selectedId, { battles: updated, battlesCount: updated.length });
  };

  const handleAddArchive = () => {
    if (!newArcCaption || !newArcUrl) return;
    const updatedArchives = [
      ...(currentWilaya.archives || []),
      {
        id: `arc-custom-${Date.now()}`,
        caption: newArcCaption,
        url: newArcUrl,
        date: newArcDate || 'فترة الثورة',
        source: newArcSource || 'الأرشيف الوطني'
      }
    ];
    onUpdateWilaya(selectedId, { archives: updatedArchives });
    setNewArcCaption('');
    setNewArcUrl('');
    setNewArcDate('');
    setNewArcSource('');
  };

  const handleDeleteArchive = (index: number) => {
    const updated = (currentWilaya.archives || []).filter((_, i) => i !== index);
    onUpdateWilaya(selectedId, { archives: updated });
  };

  // Filter 58 wilayas for picker
  const allWilayasList = Object.entries(ALL_58_WILAYAS_METADATA).map(([id, meta]) => ({
    id,
    code: meta.code,
    name: meta.name,
    latin: meta.latin
  }));

  const filteredWilayas = allWilayasList.filter(w => 
    w.name.includes(searchTerm) || 
    w.code.includes(searchTerm) || 
    w.latin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8" dir="rtl">
      {/* Search & Selector Toolbar */}
      <div className="bg-[#0b0b0b] p-6 border border-white/10 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c6a66b]/10 border border-[#c6a66b]/30 flex items-center justify-center text-[#c6a66b]">
              <Map size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-white">إدارة وتحديث بيانات الـ 58 ولاية</h3>
              <p className="text-xs text-gray-400">حدد الولاية المراد تعديل تاريخها ومعاركها وشهدائها وتحديثها فوراً</p>
            </div>
          </div>

          {/* Direct Live Preview Button */}
          <Link
            to={`/wilaya/${currentWilaya.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 hover:bg-[#c6a66b] text-gray-300 hover:text-black font-black rounded-xl text-xs flex items-center gap-2 border border-white/10 hover:border-[#c6a66b] transition-all cursor-pointer"
          >
            <span>معاينة صفحة {currentWilaya.name} الحية</span>
            <ExternalLink size={13} />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن ولاية بالاسم أو الرقم (مثال: أم البواقي، 04، باتنة، 05، وهران...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-2xl py-3 pr-10 pl-4 text-xs text-white outline-none"
          />
          <Search size={16} className="text-gray-400 absolute right-3.5 top-3.5" />
        </div>

        {/* Horizontal Scrollable Badges for Wilayas */}
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 pt-1">
          {filteredWilayas.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedId(w.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 shrink-0 cursor-pointer ${
                selectedId === w.id 
                  ? 'bg-[#c6a66b] text-black border-[#c6a66b] shadow-[0_0_15px_rgba(198,166,107,0.3)]' 
                  : 'bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="font-mono font-bold text-[10px] opacity-70">DZ-{w.code}</span>
              <span>{w.name}</span>
            </button>
          ))}
        </div>

        {feedback && (
          <div className="p-3 bg-brand-green/10 border border-brand-green/30 text-brand-green rounded-xl text-xs font-bold flex items-center gap-2 animate-pulse">
            <CheckCircle2 size={16} />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      {/* Main Edit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: General Wilaya Info Form (7 cols) */}
        <form onSubmit={handleSaveGeneral} className="lg:col-span-7 bg-[#0b0b0b] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 text-right shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Edit size={18} className="text-[#c6a66b]" />
              <h3 className="text-lg font-black text-white">البيانات العامة لولاية: {currentWilaya.name} (DZ-{currentWilaya.code})</h3>
            </div>
            <span className="text-xs font-mono text-[#c6a66b] bg-[#c6a66b]/10 px-2.5 py-1 rounded-full border border-[#c6a66b]/20">
              {currentWilaya.latinName}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-bold block">العنوان الفرعي والملخص</label>
              <input
                type="text"
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-2.5 px-4 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-bold block">إحصائية عدد الشهداء الأبرار</label>
              <input
                type="number"
                required
                value={martyrsCount}
                onChange={(e) => setMartyrsCount(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-2.5 px-4 text-xs font-mono text-[#c6a66b] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-bold block">المنطقة العسكرية التاريخية</label>
              <input
                type="text"
                value={historicalZone}
                onChange={(e) => setHistoricalZone(e.target.value)}
                placeholder="مثال: المنطقة الأولى - الأوراس والنمامشة"
                className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-2.5 px-4 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-bold block">مقولة تاريخية تميز الولاية</label>
              <input
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="مثال: ألقوا بالثورة إلى الشارع سيحتضنها الشعب"
                className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-2.5 px-4 text-xs text-white outline-none italic"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-bold block">رابط الصورة الرئيسية للغلاف (Hero Image)</label>
            <input
              type="url"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-2.5 px-4 text-xs text-white outline-none font-mono"
              dir="ltr"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-bold block">الخلاصة والنبذة التعريفية</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-2.5 px-4 text-xs text-white outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-bold block">الدور التاريخي والأهمية الاستراتيجية في الثورة</label>
            <textarea
              rows={4}
              required
              value={historicalOverview}
              onChange={(e) => setHistoricalOverview(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-2.5 px-4 text-xs text-white outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-bold block">سياق أول نوفمبر واسترجاع السيادة (اختياري)</label>
            <textarea
              rows={3}
              value={liberationHistory}
              onChange={(e) => setLiberationHistory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-2.5 px-4 text-xs text-white outline-none resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#c6a66b] hover:bg-[#b5955a] text-black font-black rounded-xl text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(198,166,107,0.4)] transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>تحديث وحفظ بيانات {currentWilaya.name}</span>
          </button>
        </form>

        {/* RIGHT COLUMN: Sub-entities (Martyrs, Battles, Archives) (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. MARTYRS MANAGER */}
          <div className="bg-[#0b0b0b] border border-white/10 p-6 rounded-3xl text-right space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-black text-white flex items-center gap-1.5 text-brand-green">
                <Users size={16} />
                شهداء ولاية {currentWilaya.name} ({currentWilaya.martyrs?.length || 0})
              </span>
            </div>

            <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar pl-1">
              {currentWilaya.martyrs?.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-all text-xs">
                  <div className="flex items-center gap-3">
                    <img src={m.image} alt={m.name} className="w-9 h-9 rounded-xl object-cover grayscale border border-white/10" />
                    <div>
                      <span className="font-black text-white block">{m.name}</span>
                      <span className="text-[10px] text-gray-400">{m.role}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteMartyr(i)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all cursor-pointer">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Martyr Inline Form */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2.5">
              <h4 className="text-[11px] font-black text-[#c6a66b]">إضافة شهيد جديد للولاية:</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="اسم الشهيد"
                  value={newMartyrName}
                  onChange={(e) => setNewMartyrName(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="الدور النضالي"
                  value={newMartyrRole}
                  onChange={(e) => setNewMartyrRole(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-white outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="تاريخ ومكان الاستشهاد"
                value={newMartyrDeath}
                onChange={(e) => setNewMartyrDeath(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-white outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="رابط صورة الشهيد (URL)"
                  value={newMartyrImg}
                  onChange={(e) => setNewMartyrImg(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-white outline-none flex-1 font-mono"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={handleAddMartyr}
                  className="px-4 py-2 bg-[#c6a66b] hover:bg-[#b5955a] text-black font-black rounded-lg text-xs transition-all cursor-pointer"
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>

          {/* 2. BATTLES MANAGER */}
          <div className="bg-[#0b0b0b] border border-white/10 p-6 rounded-3xl text-right space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-black text-white flex items-center gap-1.5 text-red-400">
                <Swords size={16} />
                معارك وملاحم {currentWilaya.name} ({currentWilaya.battles?.length || 0})
              </span>
            </div>

            <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar pl-1">
              {currentWilaya.battles?.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-all text-xs">
                  <div>
                    <span className="font-black text-white block">{b.title}</span>
                    <span className="text-[10px] text-[#c6a66b] font-mono">{b.year} م</span>
                  </div>
                  <button onClick={() => handleDeleteBattle(i)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all cursor-pointer">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Battle Inline Form */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2.5">
              <h4 className="text-[11px] font-black text-[#c6a66b]">إضافة معركة جديدة:</h4>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="عنوان المعركة"
                  value={newBattleTitle}
                  onChange={(e) => setNewBattleTitle(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-white outline-none col-span-2"
                />
                <input
                  type="text"
                  placeholder="السنة"
                  value={newBattleYear}
                  onChange={(e) => setNewBattleYear(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-white outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="مكان وتفاصيل الاشتباك"
                value={newBattleDesc}
                onChange={(e) => setNewBattleDesc(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-white outline-none"
              />
              <button
                type="button"
                onClick={handleAddBattle}
                className="w-full py-2 bg-[#c6a66b] hover:bg-[#b5955a] text-black font-black rounded-lg text-xs transition-all cursor-pointer"
              >
                إضافة المعركة
              </button>
            </div>
          </div>

          {/* 3. ARCHIVES & RARE PHOTOS MANAGER */}
          <div className="bg-[#0b0b0b] border border-white/10 p-6 rounded-3xl text-right space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-black text-white flex items-center gap-1.5 text-blue-400">
                <Bookmark size={16} />
                أرشيف صور ومخطوطات {currentWilaya.name} ({currentWilaya.archives?.length || 0})
              </span>
            </div>

            <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar pl-1">
              {currentWilaya.archives?.map((arc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-all text-xs">
                  <div className="flex items-center gap-3">
                    <img src={arc.url} alt={arc.caption} className="w-9 h-9 rounded-lg object-cover grayscale" />
                    <span className="font-bold text-white block line-clamp-1 max-w-[160px]">{arc.caption}</span>
                  </div>
                  <button onClick={() => handleDeleteArchive(i)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all cursor-pointer">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Archive Inline Form */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2.5">
              <h4 className="text-[11px] font-black text-[#c6a66b]">إضافة صورة أو وثيقة للأرشيف:</h4>
              <input
                type="text"
                placeholder="التسمية والشرح التوضيحي"
                value={newArcCaption}
                onChange={(e) => setNewArcCaption(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-white outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="رابط الصورة (URL)"
                  value={newArcUrl}
                  onChange={(e) => setNewArcUrl(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-white outline-none flex-1 font-mono"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={handleAddArchive}
                  className="px-4 py-2 bg-[#c6a66b] hover:bg-[#b5955a] text-black font-black rounded-lg text-xs transition-all cursor-pointer"
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WilayaManager;
