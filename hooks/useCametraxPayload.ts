import { useState, useCallback } from 'react';
import { CametraxPayload } from '../types';
import { presets, defaultPayload } from '../utils/presets';

// Helper to deeply update an object by path string (e.g., "camera.yaw")
const updateDeep = (obj: any, path: string, value: any): any => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  if (!lastKey) return obj;

  const newObj = { ...obj };
  let current = newObj;
  
  for (const key of keys) {
    current[key] = { ...current[key] };
    current = current[key];
  }
  
  current[lastKey] = value;
  return newObj;
};

export default function useCametraxPayload() {
  const [payload, setPayload] = useState<CametraxPayload>(defaultPayload);

  const updateField = useCallback((path: string, value: any) => {
    setPayload((prev) => updateDeep(prev, path, value));
  }, []);

  const applyPreset = useCallback((presetName: string) => {
    const preset = presets[presetName];
    if (preset) {
      setPayload(preset);
    }
  }, []);

  const setFullPayload = useCallback((newPayload: CametraxPayload) => {
    setPayload(newPayload);
  }, []);

  const resetPayload = useCallback(() => {
    setPayload(defaultPayload);
  }, []);

  return {
    payload,
    updateField,
    applyPreset,
    resetPayload,
    setFullPayload
  };
}