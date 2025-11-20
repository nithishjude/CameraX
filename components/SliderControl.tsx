import React from 'react';

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
}

export const SliderControl: React.FC<SliderControlProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
        <span className="text-xs font-mono text-blue-400">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
    </div>
  );
};