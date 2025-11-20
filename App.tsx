import React, { useState, useCallback } from 'react';
import useCametraxPayload from './hooks/useCametraxPayload';
import { generateImage } from './services/api';
import { HistoryItem, Keyframe } from './types';
import CameraControls from './components/CameraControls';
import LightingControls from './components/LightingControls';
import PresetButtons from './components/PresetButtons';
import JsonPreview from './components/JsonPreview';
import ImageOutput from './components/ImageOutput';
import HistoryPanel from './components/HistoryPanel';
import Visualizer3D from './components/Visualizer3D';
import SequenceTimeline from './components/SequenceTimeline';
import { Aperture } from 'lucide-react';

const App: React.FC = () => {
  const { payload, updateField, applyPreset, setFullPayload } = useCametraxPayload();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [compareImageUrl, setCompareImageUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [keyframes, setKeyframes] = useState<Keyframe[]>([]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // If we have a current image, move it to compare before generating new one
      if (currentImageUrl) {
         // Optional: Automatically set previous image as compare target
         // setCompareImageUrl(currentImageUrl);
      }

      const blob = await generateImage(payload);
      const url = URL.createObjectURL(blob);
      
      setCurrentImageUrl(url);

      // Add to history
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        payload: JSON.parse(JSON.stringify(payload)), // Deep copy
        imageUrl: url
      };

      setHistory(prev => [newItem, ...prev].slice(0, 8)); // Keep last 8
    } catch (err: any) {
      setError(err.message || "Failed to communicate with backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = useCallback((item: HistoryItem) => {
    // Check if shift key is held (simulated via UI logic here for simplicity)
    // Realistically, let's just load it.
    // If we wanted "Compare", we'd need a dedicated button in HistoryPanel
    
    // Logic: If we already have an image, ask if we want to load or compare?
    // For now, left click loads, let's assume a future "Compare" button on history items.
    // But for this demo, selecting history loads it as main, unless we are in specific mode.
    setFullPayload(item.payload);
    setCurrentImageUrl(item.imageUrl);
    setCompareImageUrl(null); // Reset compare when loading new state
    setError(null);
  }, [setFullPayload]);

  // Function to set a history item specifically as comparison target
  const handleSetCompare = useCallback((item: HistoryItem) => {
     setCompareImageUrl(item.imageUrl);
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const handleAddKeyframe = useCallback(() => {
      const newKeyframe: Keyframe = {
          id: Date.now().toString(),
          label: `Frame ${keyframes.length + 1}`,
          payload: JSON.parse(JSON.stringify(payload))
      };
      setKeyframes([...keyframes, newKeyframe]);
  }, [keyframes, payload]);

  const handleDeleteKeyframe = useCallback((id: string) => {
      setKeyframes(keyframes.filter(kf => kf.id !== id));
  }, [keyframes]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
               <Aperture size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Cametrax<span className="text-blue-400 font-light">Studio</span>
            </h1>
          </div>
          <div className="text-xs text-gray-500 font-mono">v1.1.0</div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Controls (3 cols on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
            <PresetButtons onApplyPreset={applyPreset} />
            <Visualizer3D payload={payload} />
            <CameraControls payload={payload} onUpdate={updateField} />
            <LightingControls payload={payload} onUpdate={updateField} />
          </div>

          {/* Center Column: Output (6 cols on desktop) */}
          <div className="lg:col-span-6 flex flex-col gap-4 order-1 lg:order-2 sticky top-24">
            <ImageOutput 
              imageUrl={currentImageUrl} 
              compareUrl={compareImageUrl}
              isLoading={isLoading} 
              error={error}
              onGenerate={handleGenerate}
              onClearCompare={() => setCompareImageUrl(null)}
            />
            
            <SequenceTimeline 
                keyframes={keyframes} 
                onAddKeyframe={handleAddKeyframe}
                onSelectKeyframe={setFullPayload}
                onDeleteKeyframe={handleDeleteKeyframe}
            />

            {/* Modify History Panel to allow setting compare image */}
            <div className="relative">
                 {history.length > 0 && (
                    <div className="absolute right-0 -top-6 text-[10px] text-gray-500">
                        Tip: Click to load
                    </div>
                 )}
                <HistoryPanel 
                  items={history} 
                  onSelect={(item) => {
                      // If Ctrl/Cmd click, set as compare
                      // Note: standard click is handled here, we'd need to pass event in HistoryPanel
                      // simplified for now: just load.
                      handleHistorySelect(item);
                  }} 
                  onClear={handleClearHistory}
                />
                 {/* Hacky generic "Compare Recent" button for demo if history exists */}
                 {history.length > 1 && !compareImageUrl && (
                     <button 
                        onClick={() => setCompareImageUrl(history[0].imageUrl)}
                        className="text-xs text-indigo-400 mt-2 hover:underline w-full text-right"
                     >
                        Compare with previous
                     </button>
                 )}
            </div>
          </div>

          {/* Right Column: JSON (3 cols on desktop) */}
          <div className="lg:col-span-3 h-[500px] lg:h-[calc(100vh-8rem)] sticky top-24 order-3">
            <JsonPreview payload={payload} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;