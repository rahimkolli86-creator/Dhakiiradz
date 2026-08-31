import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Eye, FileText, Image, BookOpen, Clock, ShieldCheck, Mail, User, Download, AlertCircle } from 'lucide-react';

interface Contribution {
  id: string;
  title: string;
  content: string;
  type: string;
  submitter_name: string;
  submitter_email: string;
  file_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

interface ContributionsTableProps {
  contributions: Contribution[];
  onAction: (id: string, action: 'app' | 'rej') => void;
  role: string | null;
}

const ContributionsTable: React.FC<ContributionsTableProps> = ({ contributions, onAction, role }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedContrib, setSelectedContrib] = useState<Contribution | null>(null);

  const filtered = contributions.filter(c => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo':
        return <Image size={14} className="text-[#c6a66b]" />;
      case 'document':
        return <FileText size={14} className="text-blue-400" />;
      case 'story':
      default:
        return <BookOpen size={14} className="text-brand-green" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'photo':
        return 'صورة تاريخية';
      case 'document':
        return 'وثيقة ثورية';
      case 'story':
      default:
        return 'شهادة / قصة تاريخية';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green">تم الاعتماد والموافقة</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500">مرفوضة</span>;
      case 'pending':
      default:
        return (
          <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 flex items-center gap-1">
            <Clock size={10} />
            قيد المراجعة والتدقيق
          </span>
        );
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Filter Tabs & Quick Instructions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.01] p-5 border border-white/5 rounded-2xl">
        <div className="flex items-center gap-2">
          {['pending', 'approved', 'rejected', 'all'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                filterStatus === status 
                  ? 'bg-[#c6a66b] text-black border-[#c6a66b]' 
                  : 'bg-transparent text-gray-400 border-white/5 hover:border-white/10'
              }`}
            >
              {status === 'pending' && 'معلّقة بالمراجعة'}
              {status === 'approved' && 'مقبولة وعلنية'}
              {status === 'rejected' && 'مرفوضة ومستبعدة'}
              {status === 'all' && 'الكل'}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-gray-500 font-bold max-w-sm text-right leading-relaxed">
          * مراجعة مساهمات زوار المتحف تتم بشكل سري ودقيق لضمان دقة المعلومة ومكافحة التزييف التاريخي. لا تظهر أي مساهمة للعامة إلا بعد اعتمادها.
        </p>
      </div>

      {/* Main Registry Table */}
      <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500 flex flex-col items-center gap-3">
            <AlertCircle size={32} className="text-gray-600" />
            <p className="font-bold text-sm">لا توجد مساهمات في هذا القسم حالياً.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-xs text-gray-400 font-bold">
                  <th className="p-4 pr-6">العنوان التعريفي للوثيقة</th>
                  <th className="p-4">نوع الملف</th>
                  <th className="p-4">اسم المرسل</th>
                  <th className="p-4">تاريخ الإرسال</th>
                  <th className="p-4">الحالة الأمنية</th>
                  <th className="p-4 pl-6 text-left">التحكم والعمليات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                {filtered.map((contrib) => (
                  <tr key={contrib.id} className="hover:bg-white/[0.01] transition-all">
                    <td className="p-4 pr-6 font-black text-white">{contrib.title}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(contrib.type)}
                        <span className="text-xs">{getTypeLabel(contrib.type)}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-bold">{contrib.submitter_name}</td>
                    <td className="p-4 text-xs text-gray-400 font-mono">
                      {new Date(contrib.created_at).toLocaleDateString('ar-DZ')}
                    </td>
                    <td className="p-4">{getStatusBadge(contrib.status)}</td>
                    <td className="p-4 pl-6 text-left space-x-2 space-x-reverse">
                      <button
                        onClick={() => setSelectedContrib(contrib)}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 transition-all inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                        title="تفاصيل الملف واستعراضه"
                      >
                        <Eye size={13} className="text-[#c6a66b]" />
                        <span>استعراض ورأي</span>
                      </button>

                      {contrib.status === 'pending' && role !== 'editor' && (
                        <>
                          <button
                            onClick={() => onAction(contrib.id, 'app')}
                            className="p-2 bg-brand-green/10 hover:bg-brand-green/20 border border-brand-green/30 hover:border-brand-green/40 text-brand-green rounded-xl transition-all cursor-pointer"
                            title="التصديق والقبول"
                          >
                            <Check size={13} />
                          </button>
                          <button
                            onClick={() => onAction(contrib.id, 'rej')}
                            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/40 text-rose-500 rounded-xl transition-all cursor-pointer"
                            title="الرفض والاستبعاد"
                          >
                            <X size={13} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Structured Detailed Review Modal */}
      <AnimatePresence>
        {selectedContrib && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-[#0b0b0b] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#c6a66b]" />
                  <h3 className="text-lg font-black text-white">تفاصيل وتدقيق المساهمة الأرشيفية</h3>
                </div>
                <button
                  onClick={() => setSelectedContrib(null)}
                  className="p-2 hover:bg-white/5 border border-transparent hover:border-white/5 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Submitter Details card */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-xs text-gray-400">
                <div className="space-y-1.5 text-right">
                  <span className="flex items-center gap-1.5 text-gray-500 font-bold">
                    <User size={13} />
                    اسم المساهم الكامل:
                  </span>
                  <p className="font-bold text-white text-sm">{selectedContrib.submitter_name}</p>
                </div>
                <div className="space-y-1.5 text-right">
                  <span className="flex items-center gap-1.5 text-gray-500 font-bold">
                    <Mail size={13} />
                    البريد الإلكتروني للتواصل وسجلات العقود:
                  </span>
                  <p className="font-bold text-white text-sm font-mono overflow-hidden text-ellipsis">{selectedContrib.submitter_email}</p>
                </div>
              </div>

              {/* Document details preview */}
              <div className="space-y-2 text-right">
                <span className="text-xs font-bold text-gray-500">عنوان السجل المصنف:</span>
                <p className="text-lg font-black text-white">{selectedContrib.title}</p>
              </div>

              <div className="space-y-2 text-right">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">محتوى المساهمة / الشهادة التاريخية:</span>
                  <span className="text-[10px] bg-white/5 px-2 py-0.5 border border-white/10 rounded-full font-bold">
                    {getTypeLabel(selectedContrib.type)}
                  </span>
                </div>
                <div className="p-5 bg-black/40 border border-white/5 rounded-2xl text-sm leading-relaxed text-gray-300 whitespace-pre-wrap font-medium">
                  "{selectedContrib.content}"
                </div>
              </div>

              {/* Submitted File Attachments */}
              {selectedContrib.file_url ? (
                <div className="space-y-2 text-right">
                  <span className="text-xs font-bold text-gray-500 block">الملحقات والصور المرفقة:</span>
                  <div className="relative aspect-video max-h-56 rounded-2xl overflow-hidden border border-white/10 bg-black/80 flex items-center justify-center">
                    <img 
                      src={selectedContrib.file_url} 
                      alt={selectedContrib.title}
                      className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <a 
                        href={selectedContrib.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 transition-all text-decoration-none"
                      >
                        <Download size={14} />
                        <span>تنزيل الملف</span>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 border border-white/5 bg-white/[0.01] rounded-2xl text-xs text-gray-500 text-center">
                  لاتوجد ملفات خارجية مرفقة مع هذه المساهمة.
                </div>
              )}

              {/* State Operations block */}
              <div className="flex items-center justify-between border-t border-white/5 pt-5">
                <p className="text-[10px] text-gray-500 font-bold">
                  تاريخ استلام الملف: {new Date(selectedContrib.created_at).toLocaleString('ar-DZ')}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedContrib(null)}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                  >
                    إغلاق المراجعة
                  </button>

                  {selectedContrib.status === 'pending' && role !== 'editor' && (
                    <>
                      <button
                        onClick={() => {
                          onAction(selectedContrib.id, 'rej');
                          setSelectedContrib(null);
                        }}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-500 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <X size={14} />
                        <span>رفض واستبعاد</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          onAction(selectedContrib.id, 'app');
                          setSelectedContrib(null);
                        }}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-green/10 hover:bg-brand-green/20 border border-brand-green/30 text-brand-green transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check size={14} />
                        <span>تأهيل واعتماد العملة كعلني</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ContributionsTable;
