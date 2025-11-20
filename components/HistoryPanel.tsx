import React from 'react';
import { HistoryItem } from '../types';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryPanelProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ items, onSelect, onClear }) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock size={14} />
          <span className="text-xs font-semibold uppercase tracking-wider">Recent History</span>
        </div>
        <button 
          onClick={onClear} 
          className="text-gray-600 hover:text-red-400 transition-colors"
          title="Clear history"
        >
          <Trash2 size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="group relative aspect-square rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <img
              src={item.imageUrl}
              alt={`History ${item.id}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;