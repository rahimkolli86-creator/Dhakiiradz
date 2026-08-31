import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Image, FileText, Bookmark, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArchiveItem {
  id: string;
  title: string;
  caption: string;
  type: string; // 'photo' | 'document' | 'audio'
  url: string;
  description?: string;
  created_at: string;
}

interface ArchiveManagerProps {
  archives: ArchiveItem[];
  onAdd: (item: Omit<ArchiveItem, 'id' | 'created_at'>) => void;
  onUpdate: (id: string, updates: Partial<ArchiveItem>) => void;
  onDelete: (id: string) => void;
}

const ArchiveManager: React.FC<ArchiveManagerProps> = ({ archives, onAdd, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'photo' | 'document' | 'audio'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ArchiveItem | null>(null);
  const [file, setFile] = useState<File | null>(null);
  

  // Form states
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [type, setType] = useState('photo');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [year, setYear] = useState('');
  const [regionId, setRegionId] = useState('');
  const [periodId, setPeriodId] = useState('');
  const [tags, setTags] = useState('');
  const [featured, setFeatured] = useState(false);
  const [pages, setPages] = useState('');
  const [duration, setDuration] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [status, setStatus] = useState('approved');

  const filtered = archives.filter(item => {
    const matchSearch = item.title.includes(searchTerm) || item.caption.includes(searchTerm) || (item.description && item.description.includes(searchTerm));
    const matchType = filterType === 'all' || item.type === filterType;
    return matchSearch && matchType;
  });

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setCaption('');
    setType('photo');
    setUrl('');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: ArchiveItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCaption(item.caption);
    setType(item.type);
    setUrl(item.url);
    setDescription(item.description || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     if (!title || !caption) {
  alert("املأ جميع الحقول");
  return;
}

if (!selectedFile) {
  alert("اختر ملفاً");
  return;
}

    if (editingItem) {
      onUpdate(editingItem.id, { title, caption, type, file, description });
    } else {
      console.log("SELECTED FILE:", selectedFile);
      onAdd({ title, 
              caption, 
              type, 
              file, 
              description,
              source, 
              year, 
              regionId, 
              periodId, 
              tags, 
              featured, 
              pages, 
              duration, 
              status,
              file: selectedFile

            });
      
    }
    setIsModalOpen(false);
  };

  const getIcon = (itemType: string) => {
    switch (itemType) {
      case 'photo':
        return <Image size={15} className="text-[#c6a66b]" />;
      case 'document':
        return <FileText size={15} className="text-blue-400" />;
      case 'audio':
        return <Music size={15} className="text-brand-green" />;
      default:
        return <Bookmark size={15} className="text-gray-400" />;
    }
  };

  const getTypeLabel = (itemType: string) => {
    switch (itemType) {
      case 'photo':
        return 'صورة تاريخية';
      case 'document':
        return 'وثائق ومراسيم';
      case 'audio':
        return 'تسجيل صوتي نادر';
      default:
        return 'مستند';
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Search, Filter & Action buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.01] p-5 border border-white/5 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:max-w-xl">
          <div className="relative w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="البحث في الأرشيف والصور..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#c6a66b] rounded-xl py-3 pr-10 pl-4 text-xs text-right text-white transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {['all', 'photo', 'document', 'audio'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t as any)}
                className={`px-3 py-2 rounded-lg text-[10px] font-bold border transition-all ${
                  filterType === t 
                    ? 'bg-brand-green/20 text-brand-green border-brand-green/30' 
                    : 'bg-transparent text-gray-400 border-white/5 hover:border-white/10'
                }`}
              >
                {t === 'all' && 'الكل'}
                {t === 'photo' && 'صور فقط'}
                {t === 'document' && 'وثائق فقط'}
                {t === 'audio' && 'صوتيات'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-brand-green hover:bg-brand-hover text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all w-full sm:w-auto justify-center cursor-pointer"
        >
          <Plus size={16} />
          <span>إضافة مستند أو ملف للمجموعات</span>
        </button>
      </div>

      {/* Grid of Archive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-[#0b0b0b] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col justify-between group h-[380px] hover:shadow-2xl transition-all"
            >
              <div className="space-y-4">
                {/* Visual Attachment Preview container */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black/80 border border-white/10 group-hover:border-[#c6a66b]/30 transition-all">
                  {item.type === 'photo' ? (
  <img
    src={item.image_url || item.url}
    alt={item.title}
    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
  />
) : item.type === 'document' ? (
  <div className="w-full h-full flex flex-col items-center justify-center bg-red-500/5 text-red-400">
    <FileText size={48} />
    <span className="mt-3 text-xs font-bold">
      PDF DOCUMENT
    </span>
  </div>
) : (
  <div className="w-full h-full flex flex-col items-center justify-center bg-brand-green/5 text-brand-green">
    <Music size={48} className="animate-pulse" />
    <span className="mt-3 text-xs font-bold">
      AUDIO ARCHIVE
    </span>
  </div>
)}

                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 text-[9px] font-black text-white flex items-center gap-1.5 backdrop-blur-md">
                    {getIcon(item.type)}
                    <span>{getTypeLabel(item.type)}</span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="text-right space-y-1">
                  <h4 className="text-base font-black text-white group-hover:text-brand-green transition-colors leading-snug line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-[#c6a66b] font-bold line-clamp-1">{item.caption}</p>
                  {item.description && (
                    <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-3 pt-1.5 border-t border-white/5">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom control buttons */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                <span className="text-[10px] text-gray-500 font-mono font-bold">
                  {new Date(item.created_at).toLocaleDateString('ar-DZ')}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#c6a66b] transition-all cursor-pointer"
                    title="تعديل"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`هل أنت متأكد من حذف هذا السجل الأرشيفي: ${item.title}؟`)) {
                        onDelete(item.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/10 text-rose-500 transition-all cursor-pointer"
                    title="حذف الأرشيف"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="py-24 text-center text-gray-500 border border-dashed border-white/5 rounded-2xl">
          <p className="font-bold text-sm">لم يتم العثور على أي صور أو وثائق تطابق الفلتر الحالي.</p>
        </div>
      )}

      {/* Add / Edit Archive Modal */}
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
                  {editingItem ? 'تعديل السجل والمحتوى الأرشيفي' : 'إضافة مستند أو ملف تاريخي سري جديد'}
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
                  <label className="text-xs font-bold text-gray-400 block font-semibold">العنوان الأرشيفي الرئيسي</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: ميثاق مؤتمر الصومام الصادر رسمياً بمجلة المجاهد"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all"
                  />
                </div>

                {/* Grid Type and Caption */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Caption */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 block font-semibold">عنوان تعريفي ووصف مقتضب</label>
                    <input
                      type="text"
                      required
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="مثال: وثيقة تأسيسية تحدد نظام القيادة العسكرية للثورة"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all"
                    />
                  </div>

                  {/* Type Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 block font-semibold font-semibold">تصنيف الملف</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#c6a66b] rounded-xl py-3 px-4 text-xs text-white outline-none transition-all"
                    >
                      <option value="photo" className="bg-[#0b0b0b] text-white">صورة تاريخية أرشيفية (Photo)</option>
                      <option value="document" className="bg-[#0b0b0b] text-white">وثائق ثورية ومراسلات (Document)</option>
                      <option value="audio" className="bg-[#0b0b0b] text-white">تسجيلات إذاعية وصوتيات (Audio)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    تحميل الملف
  </label>

  
   <input
  type="file"
  accept={
    type === "photo"
      ? "image/*"
      : type === "document"
      ? ".pdf"
      : "audio/mp3,audio/*"
  }
  onChange={(e) => {
    console.log("FILE:", e.target.files?.[0]);
    setSelectedFile(e.target.files?.[0] || null);
  }}
/>
   
</div>

            {/* SOURCE */}
<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    المصدر
  </label>
  <input
    type="text"
    value={source}
    onChange={(e) => setSource(e.target.value)}
    placeholder="وزارة المجاهدين"
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white"
  />
</div>

{/* YEAR */}
<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    السنة
  </label>
  <input
    type="text"
    value={year}
    onChange={(e) => setYear(e.target.value)}
    placeholder="1956"
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white"
  />
</div>

{/* REGION */}
<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    رقم الولاية
  </label>
  <input
    type="text"
    value={regionId}
    onChange={(e) => setRegionId(e.target.value)}
    placeholder="16"
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white"
  />
</div>

{/* PERIOD */}
<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    الفترة التاريخية
  </label>
  <input
    type="text"
    value={periodId}
    onChange={(e) => setPeriodId(e.target.value)}
    placeholder="ثورة التحرير"
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white"
  />
</div>

{/* TAGS */}
<div className="space-y-2">
  <label className="text-xs font-bold text-gray-400 block">
    الوسوم
  </label>
  <input
    type="text"
    value={tags}
    onChange={(e) => setTags(e.target.value)}
    placeholder="الأوراس, بن بولعيد, 1954"
    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white"
  />
</div>


                {/* Detailed Description */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 block">الوصف التفصيلي والبيانات المرجعية</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="تفاصيل تصفية المخطوطة، وظروف تجميعها وسياقاتها السياسية..."
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
                    {editingItem ? 'حفظ تعديلات الملف' : 'تضمين السجل في الأرشيف'}
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

export default ArchiveManager;
