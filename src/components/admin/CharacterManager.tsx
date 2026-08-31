import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Check, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Character {
  id: string;
  name: string;
  role: string;
  biography: string;
  image?: string;
  created_at: string;
}

interface CharacterManagerProps {
  characters: Character[];
  onAdd: (char: Omit<Character, 'id' | 'created_at'>) => void;
  onUpdate: (id: string, updates: Partial<Character>) => void;
  onDelete: (id: string) => void;
}

const CharacterManager: React.FC<CharacterManagerProps> = ({ characters, onAdd, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChar, setEditingChar] = useState<Character | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [biography, setBiography] = useState('');
  const [image, setImage] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [martyrDate, setMartyrDate] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [rank, setRank] = useState('');
  const [nickname, setNickname] = useState('');
  const [quote, setQuote] = useState('');
  const [achievements, setAchievements] = useState('');

  const filtered = characters.filter(c => 
    c.name.includes(searchTerm) || 
    c.role.includes(searchTerm) ||
    c.biography.includes(searchTerm)
  );

  const openAddModal = () => {
    setEditingChar(null);
    setName('');
    setRole('');
    setBiography('');
    setImage('');
    setIsModalOpen(true);
  };

  const openEditModal = (char: Character) => {
    setEditingChar(char);
    setName(char.name);
    setRole(char.role);
    setBiography(char.biography);
    setImage(char.image || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !biography) return;

    if (editingChar) {
      onUpdate(editingChar.id, {
  name,
  role,
  biography,
  image,
  birth_date: birthDate,
  martyr_date: martyrDate,
  birth_place: birthPlace,
  rank,
  nickname,
  quote,
  achievements
});
    } else {
      onAdd({
  name,
  role,
  biography,
  image,
  birth_date: birthDate,
  martyr_date: martyrDate,
  birth_place: birthPlace,
  rank,
  nickname,
  quote,
  achievements
});
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Search and Action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.01] p-5 border border-white/5 rounded-2xl">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="البحث عن شخصية ثورية..."
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
          <span>إضافة شخصية رمادية جديدة</span>
        </button>
      </div>

      {/* Characters list table */}
      <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <p className="font-bold text-sm">لا توجد شخصيات للشهداء تتوافق مع معايير البحث.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-xs text-gray-400 font-bold">
                  <th className="p-4 pr-6">بطل المقاومة</th>
                  <th className="p-4">الدور النضالي</th>
                  <th className="p-4">تاريخ الإضافة</th>
                  <th className="p-4 pl-6 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                {filtered.map((char) => (
                  <tr key={char.id} className="hover:bg-white/[0.01] transition-all">
                    <td className="p-4 pr-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black">
                          {char.image ? (
                            <img src={char.image} alt={char.name} className="w-full h-full object-cover grayscale" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#c6a66b]">؟</div>
                          )}
                        </div>
                        <span className="font-black text-white">{char.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-bold text-gray-400 max-w-xs truncate" title={char.role}>
                      {char.role}
                    </td>
                    <td className="p-4 text-xs font-mono text-gray-500">
                      {new Date(char.created_at).toLocaleDateString('ar-DZ')}
                    </td>
                    <td className="p-4 pl-6 text-left space-x-2 space-x-reverse">
                      <button
                        onClick={() => openEditModal(char)}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl transition-all cursor-pointer inline-flex"
                        title="تعديل"
                      >
                        <Edit size={14} className="text-[#c6a66b]" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`هل أنت متأكد من حذف الشخصية الرمزية الحرة: ${char.name}؟`)) {
                            onDelete(char.id);
                          }
                        }}
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/10 text-rose-500 rounded-xl transition-all cursor-pointer inline-flex"
                        title="حذف"
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

      {/* Add / Edit Character Modal */}
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
                  {editingChar ? 'تعديل السيرة النضالية للشهيد البطل' : 'إضافة شخصية وطنية رمزية تاريخية'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/5 border border-transparent hover:border-white/5 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-right">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 block">اسم الشهيد الكامل</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: العربي بن مهيدي"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all"
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 block">الدور القيادي أو النضالي</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="مثال: حكيم الثورة وعضو لجنة التنسيق والتنفيذ"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all"
                  />
                </div>

                {/* Photo Image URL */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 block">رابط صورة البورتريه الأرشيفية (خيارى)</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/portrait.jpg"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all"
                  />
                </div>

<div className="space-y-2">
  <label>اللقب</label>
  <input
    value={nickname}
    onChange={(e) => setNickname(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
  />
</div>

<div className="space-y-2">
  <label>تاريخ الميلاد</label>
  <input
    value={birthDate}
    onChange={(e) => setBirthDate(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
  />
</div>

<div className="space-y-2">
  <label>تاريخ الاستشهاد</label>
  <input
    value={martyrDate}
    onChange={(e) => setMartyrDate(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
  />
</div>

<div className="space-y-2">
  <label>مكان الميلاد</label>
  <input
    value={birthPlace}
    onChange={(e) => setBirthPlace(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
  />
</div>

<div className="space-y-2">
  <label>الرتبة</label>
  <input
    value={rank}
    onChange={(e) => setRank(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
  />
</div>

<div className="space-y-2">
  <label>مقولة الشهيد</label>
  <textarea
    rows={3}
    value={quote}
    onChange={(e) => setQuote(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
  />
</div>

<div className="space-y-2">
  <label>الإنجازات</label>
  <textarea
    rows={5}
    value={achievements}
    onChange={(e) => setAchievements(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
  />
</div>


                {/* Biography */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 block">السيرة التاريخية والتضحيات</label>
                  <textarea
                    required
                    rows={6}
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                    placeholder="اكتب السيرة المعمقة للشهيد وتفاصيل كفاحه العسكري والسياسي واستشهاده البطولي..."
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all resize-none leading-relaxed"
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
                    {editingChar ? 'حفظ تعديلات البطل' : 'إضافة وتثبيت في السجل'}
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

export default CharacterManager;
