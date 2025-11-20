import React, { useState } from 'react';
import { Download, Image as ImageIcon, Loader2, AlertCircle, Columns } from 'lucide-react';

interface ImageOutputProps {
  imageUrl: string | null;
  compareUrl: string | null;
  isLoading: boolean;
  error: string | null;
  onGenerate: () => void;
  onClearCompare: () => void;
}

const ImageOutput: React.FC<ImageOutputProps> = ({ 
  imageUrl, 
  compareUrl,
  isLoading, 
  error, 
  onGenerate,
  onClearCompare 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} className="text-indigo-400" />
          <h2 className="text-lg font-semibold text-white">
            {compareUrl ? "Comparison Mode" : "Preview"}
          </h2>
        </div>
        <div className="flex gap-2">
          {compareUrl && (
             <button 
               onClick={onClearCompare}
               className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-white transition-colors mr-2"
             >
               <Columns size={14} />
               Exit Compare
             </button>
          )}
          {imageUrl && !isLoading && (
            <a
              href={imageUrl}
              download="cametrax-output.png"
              className="flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Download size={14} />
              Download
            </a>
          )}
        </div>
      </div>

      <div className="relative flex-1 bg-gray-900 flex items-center justify-center overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-gray-400 animate-pulse">
            <Loader2 size={48} className="animate-spin text-indigo-500 mb-4" />
            <span className="text-sm">Rendering scene with Imagen...</span>
          </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center text-red-400 p-6 text-center">
            <AlertCircle size={48} className="mb-4" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        ) : imageUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Standard Image View */}
            {!compareUrl && (
                <img
                src={imageUrl}
                alt="Generated output"
                className="max-w-full max-h-full object-contain shadow-2xl"
                />
            )}

            {/* Comparison View */}
            {compareUrl && (
                <div className="relative w-full max-w-3xl h-[400px] select-none group cursor-ew-resize overflow-hidden">
                    {/* Underlying Image (Previous/Compare) */}
                    <div className="absolute inset-0 w-full h-full">
                         <img 
                            src={compareUrl} 
                            className="w-full h-full object-contain opacity-50 blur-sm scale-95 transition-all"
                            alt="Comparison Target" 
                        />
                         <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">Reference</div>
                    </div>

                    {/* Overlay Image (Current) - We simulate a slider using clip-path for a true split view */}
                    <div 
                        className="absolute inset-0 w-full h-full bg-gray-900"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                        <img 
                            src={imageUrl} 
                            className="w-full h-full object-contain"
                            alt="Current Output" 
                        />
                         <div className="absolute top-2 right-2 bg-indigo-600/80 text-white text-[10px] px-2 py-1 rounded">Current</div>
                    </div>

                    {/* Slider Handle */}
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sliderPosition}
                        onChange={(e) => setSliderPosition(parseFloat(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    />
                    <div 
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                             <Columns size={12} className="text-gray-800" />
                        </div>
                    </div>
                </div>
            )}
          </div>
        ) : (
          <div className="text-gray-600 flex flex-col items-center text-center p-8">
            <ImageIcon size={64} className="mb-4 opacity-20" />
            <p className="text-sm">Ready to generate.</p>
            <p className="text-xs mt-1 opacity-60">Adjust settings and click Generate</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
            isLoading
              ? 'bg-gray-600 cursor-not-allowed opacity-70'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25'
          }`}
        >
          {isLoading ? 'Processing...' : 'Generate Image'}
        </button>
      </div>
    </div>
  );
};

export default ImageOutput;