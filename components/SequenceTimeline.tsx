import React from 'react';
import { Keyframe, CametraxPayload } from '../types';
import { Film, Plus, Play, Trash, Copy } from 'lucide-react';

interface SequenceTimelineProps {
  keyframes: Keyframe[];
  onAddKeyframe: () => void;
  onSelectKeyframe: (payload: CametraxPayload) => void;
  onDeleteKeyframe: (id: string) => void;
}

const SequenceTimeline: React.FC<SequenceTimelineProps> = ({ 
  keyframes, 
  onAddKeyframe, 
  onSelectKeyframe,
  onDeleteKeyframe 
}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Film size={16} className="text-orange-400" />
          <span className="text-sm font-semibold text-gray-300">Sequence Timeline</span>
        </div>
        <div className="flex gap-2">
          <button 
             className="p-1.5 bg-gray-700 hover:bg-green-600 text-gray-300 hover:text-white rounded transition-colors"
             onClick={() => {/* Animation logic placeholder */}}
             title="Play Sequence (Preview)"
          >
            <Play size={14} />
          </button>
          <button 
            onClick={onAddKeyframe}
            className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-1.5 rounded transition-colors"
          >
            <Plus size={14} />
            Add Frame
          </button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar min-h-[80px]">
        {keyframes.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-gray-700 rounded-lg text-gray-500 text-xs p-4">
                <span>No keyframes added</span>
                <span className="opacity-50 mt-1">Capture current state to animate</span>
            </div>
        ) : (
            keyframes.map((kf, index) => (
            <div 
                key={kf.id}
                className="flex-shrink-0 w-24 bg-gray-900 border border-gray-700 rounded-md p-2 flex flex-col gap-2 group relative hover:border-orange-500/50 transition-colors cursor-pointer"
                onClick={() => onSelectKeyframe(kf.payload)}
            >
                <div className="text-[10px] font-mono text-gray-400 flex justify-between">
                    <span>Frame {index + 1}</span>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteKeyframe(kf.id); }}
                        className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash size={10} />
                    </button>
                </div>
                <div className="flex-1 bg-gray-800 rounded flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-[10px] text-blue-400">Y: {kf.payload.camera.yaw}°</div>
                        <div className="text-[10px] text-blue-400">P: {kf.payload.camera.pitch}°</div>
                    </div>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default SequenceTimeline;