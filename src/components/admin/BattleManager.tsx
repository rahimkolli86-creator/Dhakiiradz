import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Swords } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Battle {
  id: string;
  title: string;
  year: string;
  region_id: string;
  description: string;
  status?: string;
  created_at?: string;
  image?: string;
  sources?: string[];
  details?: any[];
  related_battles?: any[];
  hero_image?: string;
  event_type?: string;
}

interface BattleManagerProps {
  battles: Battle[];
  onAdd: (battle: Omit<Battle, 'id' | 'created_at'>) => void;
  onUpdate: (id: string, updates: Partial<Battle>) => void;
  onDelete: (id: string) => void;
}

const WILAYAS_LIST = [
  { id: 'DZ-05', name: 'المنطقة الأولى: الأوراس (Aurès)' },
  { id: 'DZ-25', name: 'المنطقة الثانية: الشمال القسنطيني (Nord-Constantinois)' },
  { id: 'DZ-15', name: 'المنطقة الثالثة: القبائل (Kabylie)' },
  { id: 'DZ-16', name: 'المنطقة الرابعة: العاصمة وضواحيها (Algérois)' },
  { id: 'DZ-31', name: 'المنطقة الخامسة: الوهراني (Oranie)' }
];

const BattleManager: React.FC<BattleManagerProps> = ({ battles, onAdd, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBattle, setEditingBattle] = useState<Battle | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [region_id, setregion_id] = useState('DZ-05');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [eventType, setEventType] = useState('');
  const [sources, setSources] = useState('');
  const [details, setDetails] = useState('');
  const [relatedBattles, setRelatedBattles] = useState('');
  const [detailDate, setDetailDate] = useState('');
  const [detailPlace, setDetailPlace] = useState('');
  const [detailLeader, setDetailLeader] = useState('');

  const filtered = battles.filter(b => 
    b.title.includes(searchTerm) || 
    b.year.includes(searchTerm) ||
    b.description.includes(searchTerm)
  );

  const openAddModal = () => {
    setEditingBattle(null);
    setTitle('');
    setYear('');
    setregion_id('DZ-05');
    setDescription('');
    setImage('');
    setHeroImage('');
    setEventType('');
    setSources('');
    setDetails('');
    setIsModalOpen(true);
  };

  const openEditModal = (battle: Battle) => {
    setEditingBattle(battle);
    setTitle(battle.title);
    setYear(battle.year);
    setregion_id(battle.region_id);
    setDescription(battle.description);
    setImage(battle.image || '');
    setHeroImage(battle.hero_image || '');
    setEventType(battle.event_type || '');

setSources(
  Array.isArray(battle.sources)
    ? battle.sources.join('\n')
    : ''
);

setDetails(
  battle.details
    ? JSON.stringify(battle.details, null, 2)
    : ''
);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!title || !year || !description) return;

  if (editingBattle) {
     onUpdate(editingBattle.id, {
  title,
  year,
  region_id: region_id,
  description,
  image,
  hero_image: heroImage,
  event_type: eventType,
  sources: sources.split('\n').filter(Boolean),
  details: [
    {
      label: 'التاريخ',
      value: detailDate
    },
    {
      label: 'المكان',
      value: detailPlace
    },
    {
      label: 'القائد',
      value: detailLeader
    }
  ]
});
  } else {
    onAdd({
      title,
      year,
      region_id: region_id,
      description,
      image,
      hero_image: heroImage,
      event_type: eventType,
      sources: sources.split('\n').filter(Boolean),
      details: [
  {
    label: 'التاريخ',
    value: detailDate
  },
  {
    label: 'المكان',
    value: detailPlace
  },
  {
    label: 'القائد',
    value: detailLeader
  }
]
    });
  }

  setIsModalOpen(false);
};

  const getRegionName = (id: string) => {
    return WILAYAS_LIST.find(w => w.id === id)?.name || id;
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Search and Action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.01] p-5 border border-white/5 rounded-2xl">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="البحث عن معركة أو عملية..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#c6a66b] rounded-xl py-3 pr-10 pl-4 text-xs text-right text-white transition-all outline-none"
          />
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-brand-green hover:bg-brand-hover text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>توثيق معركة ثورية جديدة</span>
        </button>
      </div>

      {/* Battles list table */}
      <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <p className="font-bold text-sm">لا توجد معارك مسجلة تتوافق مع معايير البحث.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-xs text-gray-400 font-bold">
                  <th className="p-4 pr-6">اسم المعركة والملحمة</th>
                  <th className="p-4">السنة التاريخية</th>
                  <th className="p-4">المنطقة والولاية العسكرية</th>
                  <th className="p-4">تاريخ التسجيل</th>
                  <th className="p-4 pl-6 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                {filtered.map((battle) => (
                  <tr key={battle.id} className="hover:bg-white/[0.01] transition-all">
                    <td className="p-4 pr-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 shrink-0">
                          <Swords size={14} />
                        </div>
                        <span className="font-black text-white">{battle.title}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-4 text-xs font-serif font-black text-[#c6a66b]">
                      {battle.year} م
                    </td>
                    <td className="p-4 text-xs font-bold text-gray-400">
                      {getRegionName(battle.region_id)}
                    </td>
                    <td className="p-4 text-xs font-mono text-gray-500">
                      {new Date(battle.created_at).toLocaleDateString('ar-DZ')}
                    </td>
                    <td className="p-4 pl-6 text-left space-x-2 space-x-reverse">
                      <button
                        onClick={() => openEditModal(battle)}             
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl transition-all cursor-pointer inline-flex"
                        title="تعديل التفاصيل"
                      >
                        <Edit size={14} className="text-[#c6a66b]" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`هل أنت متأكد من حذف تفاصيل معركة: ${battle.title}؟`)) {
                            onDelete(battle.id);
                          }
                        }}
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/10 text-rose-500 rounded-xl transition-all cursor-pointer inline-flex"
                        title="حذف المصنف"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Battle Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-[#0b0b0b] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <h3 className="text-lg font-black text-white">
                  {editingBattle ? 'تعديل تفاصيل المعركة التاريخية' : 'إضافة وتوثيق معركة واشتباك لجيش التحرير'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/5 border border-transparent hover:border-white/5 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-right">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 block">عنوان أو اسم المعركة</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: معركة الجوف الكبرى"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all"
                  />
                </div>

                {/* Grid Inputs for Year and Region */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Year */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 block">سنة وقوع الاشتباك (ميلادي)</label>
                    <input
                      type="text"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="مثال: 1955"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all"
                    />
                  </div>

                  {/* Region Link */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 block">المنطقة العسكرية (الولاية التاريخية)</label>
                    <select
                      value={region_id}
                      onChange={(e) => setregion_id(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all"
                    >
                      {WILAYAS_LIST.map(w => (
                        <option key={w.id} value={w.id} className="bg-[#0b0b0b] text-white">{w.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
{/* Event Type */}
<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    نوع الحدث
  </label>

  <select
    value={eventType}
    onChange={(e) => setEventType(e.target.value)}
    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all"
  >
    <option value="" className="bg-[#0b0b0b]">
      اختر نوع الحدث
    </option>

    <option value="معركة" className="bg-[#0b0b0b]">
      معركة
    </option>

    <option value="اشتباك" className="bg-[#0b0b0b]">
      اشتباك
    </option>

    <option value="كمين" className="bg-[#0b0b0b]">
      كمين
    </option>

    <option value="هجوم/عملية عسكرية" className="bg-[#0b0b0b]">
      هجوم/عملية عسكرية
    </option>

    <option value="مظاهرة ونشاط جماهيري" className="bg-[#0b0b0b]">
      مظاهرة ونشاط جماهيري
    </option>

    <option value="عمليات المقاومة في الخارج" className="bg-[#0b0b0b]">
      عمليات المقاومة في الخارج
    </option>

    <option
      value="أحداث سياسية ودبلوماسية مرتبطة بالثورة"
      className="bg-[#0b0b0b]"
    >
      أحداث سياسية ودبلوماسية مرتبطة بالثورة
    </option>

    <option value="مجازر وقمع استعماري" className="bg-[#0b0b0b]">
      مجازر وقمع استعماري
    </option>
  </select>
</div>


                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 block">تفاصيل وسياق الملحمة العسكرية</label>
                  <textarea
                    required
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="اكتب خلاصة هذه المعركة، والقادة المشاركين فيها، وعدد جرحى وشهدائنا والجهة المحاصرة وخسائر الاستخراب ومغزى هذه المعركة المظفرة..."
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    صورة البطاقة
  </label>
  <input
    type="text"
    value={image}
    onChange={(e) => setImage(e.target.value)}
    placeholder="رابط صورة البطاقة"
    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none"
  />
</div>

<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    صورة الغلاف الرئيسية
  </label>
  <input
    type="text"
    value={heroImage}
    onChange={(e) => setHeroImage(e.target.value)}
    placeholder="رابط صورة الغلاف الكبير"
    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none"
  />
</div>

<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    المصادر (كل مصدر في سطر)
  </label>

  <textarea
    rows={4}
    value={sources}
    onChange={(e) => setSources(e.target.value)}
    placeholder="كتاب تاريخ الثورة الجزائرية
أرشيف وزارة المجاهدين
جريدة المجاهد"
    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none resize-none"
  />
</div>


<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    التاريخ
  </label>
  <input
    type="text"
    value={detailDate}
    onChange={(e) => setDetailDate(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white"
  />
</div>

<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    المكان
  </label>
  <input
    type="text"
    value={detailPlace}
    onChange={(e) => setDetailPlace(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white"
  />
</div>

<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    القائد
  </label>
  <input
    type="text"
    value={detailLeader}
    onChange={(e) => setDetailLeader(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white"
  />
</div>

                {/* Operations block */}
                <div className="flex justify-end gap-3 border-t border-white/5 pt-5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-gray-400 transition-all cursor-pointer border border-transparent hover:border-white/5"
                  >
                    إلغاء الأمر
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#c6a66b] hover:bg-[#b09159] text-black transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {editingBattle ? 'حفظ تعديلات المعركة' : 'تأكيد وحفظ السجل'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BattleManager;
