import React from 'react';
import { Sparkles } from 'lucide-react';

interface PresetButtonsProps {
  onApplyPreset: (name: string) => void;
}

const PresetButtons: React.FC<PresetButtonsProps> = ({ onApplyPreset }) => {
  const presets = [
    { id: 'studio', label: 'Studio', color: 'bg-blue-900/30 border-blue-700/50' },
    { id: 'cinematic', label: 'Cinematic', color: 'bg-purple-900/30 border-purple-700/50' },
    { id: 'portrait', label: 'Portrait', color: 'bg-pink-900/30 border-pink-700/50' },
    { id: 'macro', label: 'Macro', color: 'bg-green-900/30 border-green-700/50' },
    { id: 'noir', label: 'Noir', color: 'bg-gray-700/30 border-gray-600/50' },
    { id: 'cyberpunk', label: 'Cyberpunk', color: 'bg-yellow-900/30 border-yellow-700/50' },
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-purple-400" />
        <span className="text-sm font-semibold text-gray-300">Preset Library</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => onApplyPreset(p.id)}
            className={`py-2 px-1 text-xs font-medium text-gray-200 rounded-lg transition-all duration-200 border hover:brightness-125 active:scale-95 ${p.color}`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetButtons;