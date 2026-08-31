import React from 'react';
import { motion } from 'motion/react';
import { Users, Swords, Bookmark, FolderArchive, BellRing } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    charactersCount: number;
    battlesCount: number;
    archivesCount: number;
    contributionsCount: number;
    pendingReviewsCount: number;
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const items = [
    {
      title: 'الشخصيات الرمزية',
      value: stats.charactersCount,
      subtitle: 'الأبطال والشهداء المعرفون',
      icon: Users,
      color: 'border-brand-green/20 text-brand-green bg-brand-green/5'
    },
    {
      title: 'المعارك والاشتباكات',
      value: stats.battlesCount,
      subtitle: 'العمليات العسكرية المسجلة',
      icon: Swords,
      color: 'border-rose-500/20 text-rose-500 bg-rose-500/5'
    },
    {
      title: 'الوثائق والأرشيف',
      value: stats.archivesCount,
      subtitle: 'الصور والمستندات التي رُفعت',
      icon: Bookmark,
      color: 'border-[#c6a66b]/20 text-[#c6a66b] bg-[#c6a66b]/5'
    },
    {
      title: 'مساهمات الزوار الكلية',
      value: stats.contributionsCount,
      subtitle: 'الصور والقصص المُرسلة',
      icon: FolderArchive,
      color: 'border-blue-500/20 text-blue-500 bg-blue-500/5'
    },
    {
      title: 'مراجعات معلّقة',
      value: stats.pendingReviewsCount,
      subtitle: 'مساهمات زوار بحاجة لتدقيق ومراجعة',
      icon: BellRing,
      color: stats.pendingReviewsCount > 0 
        ? 'border-yellow-500/40 text-yellow-500 bg-yellow-500/10 animate-border-pulse' 
        : 'border-gray-500/20 text-gray-400 bg-gray-500/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" dir="rtl">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-40 ${item.color}`}
          >
            {/* Background Accent */}
            <div className="absolute -bottom-8 -left-8 opacity-5">
              <Icon size={120} />
            </div>

            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-bold leading-none">{item.title}</span>
              <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                <Icon size={16} />
              </div>
            </div>

            {/* Metric Display */}
            <div className="mt-4">
              <span className="text-3xl lg:text-4xl font-black font-serif text-white tracking-tight">
                {item.value}
              </span>
              <p className="text-[10px] text-gray-500 font-bold mt-1 line-clamp-1">{item.subtitle}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
