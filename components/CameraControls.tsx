import React from 'react';
import { CametraxPayload, UpdatePayloadFunction } from '../types';
import { SliderControl } from './SliderControl';
import { Camera } from 'lucide-react';

interface CameraControlsProps {
  payload: CametraxPayload;
  onUpdate: UpdatePayloadFunction;
}

const CameraControls: React.FC<CameraControlsProps> = ({ payload, onUpdate }) => {
  const { yaw, pitch, roll, fov } = payload.camera;

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
        <Camera size={18} className="text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Camera</h2>
      </div>
      
      <SliderControl
        label="Yaw"
        value={yaw}
        min={-180}
        max={180}
        unit="°"
        onChange={(val) => onUpdate('camera.yaw', val)}
      />
      <SliderControl
        label="Pitch"
        value={pitch}
        min={-90}
        max={90}
        unit="°"
        onChange={(val) => onUpdate('camera.pitch', val)}
      />
      <SliderControl
        label="Roll"
        value={roll}
        min={-180}
        max={180}
        unit="°"
        onChange={(val) => onUpdate('camera.roll', val)}
      />
      <SliderControl
        label="Field of View"
        value={fov}
        min={10}
        max={120}
        unit="mm"
        onChange={(val) => onUpdate('camera.fov', val)}
      />
    </div>
  );
};

export default CameraControls;