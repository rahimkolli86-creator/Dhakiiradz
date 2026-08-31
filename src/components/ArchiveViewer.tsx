import React from 'react';
import { FileText, Archive as ArchiveIcon } from 'lucide-react';

interface Document {
  title: string;
  type: string;
}

interface ArchiveViewerProps {
  documents: Document[];
}

const ArchiveViewer: React.FC<ArchiveViewerProps> = ({ documents }) => {
  return (
    <div className="space-y-3">
      {documents.map((doc, index) => (
        <div 
          key={index}
          className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between group hover:bg-brand-green/5 hover:border-brand-green/20 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-brand-green transition-colors">
                <FileText size={18} />
             </div>
             <div className="text-right">
                <h5 className="text-white font-bold text-sm mb-0.5">{doc.title}</h5>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{doc.type}</span>
             </div>
          </div>
          <ArchiveIcon size={14} className="text-gray-700 group-hover:text-brand-green transition-all" />
        </div>
      ))}
    </div>
  );
};

export default ArchiveViewer;
