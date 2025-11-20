import React from 'react';
import { CametraxPayload, UpdatePayloadFunction } from '../types';
import { SliderControl } from './SliderControl';
import { Lightbulb, Zap } from 'lucide-react';

interface LightingControlsProps {
  payload: CametraxPayload;
  onUpdate: UpdatePayloadFunction;
}

const LightingControls: React.FC<LightingControlsProps> = ({ payload, onUpdate }) => {
  const { preset, intensity, temperature } = payload.lighting;
  const { hdr } = payload.render;

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
        <Lightbulb size={18} className="text-yellow-400" />
        <h2 className="text-lg font-semibold text-white">Lighting</h2>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
          Setup Style
        </label>
        <select
          value={preset}
          onChange={(e) => onUpdate('lighting.preset', e.target.value)}
          className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
        >
          <option value="studio">Studio Standard</option>
          <option value="softbox">Softbox Diffused</option>
          <option value="hard">Hard Light</option>
          <option value="dramatic">Dramatic/Noir</option>
          <option value="butterfly">Butterfly</option>
          <option value="rembrandt">Rembrandt</option>
        </select>
      </div>

      <SliderControl
        label="Intensity"
        value={intensity}
        min={0}
        max={2}
        step={0.01}
        onChange={(val) => onUpdate('lighting.intensity', val)}
      />
      
      <SliderControl
        label="Temperature"
        value={temperature}
        min={2000}
        max={8000}
        step={100}
        unit="K"
        onChange={(val) => onUpdate('lighting.temperature', val)}
      />

      <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Zap size={14} className={hdr ? "text-yellow-400" : "text-gray-500"} />
            <span className="text-xs font-medium text-gray-300">High Dynamic Range (HDR)</span>
        </div>
        <button 
            onClick={() => onUpdate('render.hdr', !hdr)}
            className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${hdr ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${hdr ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </button>
      </div>
    </div>
  );
};

export default LightingControls;