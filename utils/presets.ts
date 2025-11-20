import { CametraxPayload } from '../types';

const defaultBase: CametraxPayload = {
  camera: { yaw: 0, pitch: 0, roll: 0, fov: 50 },
  lighting: { preset: 'studio', intensity: 1.0, temperature: 5500 },
  composition: { aspectRatio: '16:9' },
  render: { quality: 'high', hdr: false }
};

export const presets: Record<string, CametraxPayload> = {
  studio: {
    ...defaultBase,
    camera: { yaw: 0, pitch: 5, roll: 0, fov: 50 },
    lighting: { preset: 'softbox', intensity: 1.2, temperature: 5600 },
  },
  cinematic: {
    ...defaultBase,
    camera: { yaw: 15, pitch: -5, roll: 0, fov: 35 },
    lighting: { preset: 'dramatic', intensity: 0.8, temperature: 4200 },
    render: { ...defaultBase.render, hdr: true }
  },
  portrait: {
    ...defaultBase,
    camera: { yaw: 0, pitch: 0, roll: 0, fov: 85 },
    lighting: { preset: 'butterfly', intensity: 1.0, temperature: 5000 },
  },
  macro: {
    ...defaultBase,
    camera: { yaw: 0, pitch: 45, roll: 0, fov: 100 },
    lighting: { preset: 'studio', intensity: 1.5, temperature: 6000 },
  },
  noir: {
    ...defaultBase,
    camera: { yaw: -30, pitch: 10, roll: 5, fov: 35 },
    lighting: { preset: 'hard', intensity: 0.6, temperature: 3200 },
  },
  cyberpunk: {
    ...defaultBase,
    camera: { yaw: 0, pitch: -20, roll: 0, fov: 24 },
    lighting: { preset: 'dramatic', intensity: 1.8, temperature: 8000 },
    render: { ...defaultBase.render, hdr: true }
  }
};

export const defaultPayload = presets.studio;