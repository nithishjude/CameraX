export interface CameraConfig {
  yaw: number;
  pitch: number;
  roll: number;
  fov: number;
}

export interface LightingConfig {
  preset: string;
  intensity: number;
  temperature: number;
}

export interface CompositionConfig {
  aspectRatio: string;
}

export interface RenderConfig {
  quality: string;
  hdr: boolean;
}

export interface CametraxPayload {
  camera: CameraConfig;
  lighting: LightingConfig;
  composition: CompositionConfig;
  render: RenderConfig;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  payload: CametraxPayload;
  imageUrl: string;
}

export interface Keyframe {
  id: string;
  label: string;
  payload: CametraxPayload;
}

export type UpdatePayloadFunction = (path: string, value: any) => void;