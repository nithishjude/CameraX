import React from 'react';
import { CametraxPayload } from '../types';
import { Eye, Move3d } from 'lucide-react';

interface Visualizer3DProps {
  payload: CametraxPayload;
}

const Visualizer3D: React.FC<Visualizer3DProps> = ({ payload }) => {
  const { yaw, fov } = payload.camera;

  // Calculate visuals based on props
  // Yaw controls rotation around center
  // FOV controls the width of the cone
  const coneWidth = Math.tan((fov * Math.PI) / 180) * 80;
  const rotation = -yaw; // Invert for visual logic

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg mb-4">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
        <Move3d size={18} className="text-emerald-400" />
        <h2 className="text-lg font-semibold text-white">Spatial Visualizer</h2>
      </div>

      <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center">
        
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(#374151 1px, transparent 1px), linear-gradient(90deg, #374151 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}>
        </div>

        {/* Scene Container */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          
          {/* Subject (Center) */}
          <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10 relative">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400">Subject</div>
          </div>

          {/* Camera Orbit Ring */}
          <div className="absolute w-24 h-24 border border-dashed border-gray-600 rounded-full opacity-50"></div>

          {/* Camera Representation */}
          <div 
            className="absolute w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* The Camera Group (Pushed to orbit radius) */}
            <div className="absolute top-0 flex flex-col items-center">
                {/* Camera Icon */}
                <div className="w-6 h-4 bg-blue-500 rounded-sm relative z-20 shadow-lg border border-blue-400">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-blue-600"></div>
                </div>

                {/* Field of View Cone */}
                <div 
                  className="w-0 h-0 border-l-transparent border-r-transparent border-t-blue-500/20 border-t-[60px] absolute top-2 z-0 origin-top blur-[1px]"
                  style={{ 
                    borderLeftWidth: `${Math.max(10, coneWidth/2)}px`,
                    borderRightWidth: `${Math.max(10, coneWidth/2)}px`,
                  }}
                ></div>
            </div>
          </div>

        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-2 right-2 text-[10px] text-gray-500 font-mono">
          Top-Down View
        </div>
      </div>
    </div>
  );
};

export default Visualizer3D;