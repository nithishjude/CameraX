import { GoogleGenAI } from "@google/genai";
import { CametraxPayload } from '../types';

// Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (payload: CametraxPayload): Promise<Blob> => {
  try {
    // Construct a natural language prompt from the structured payload
    const { camera, lighting, composition, render } = payload;

    const cameraDesc = `Camera parameters: Yaw ${camera.yaw}°, Pitch ${camera.pitch}°, Roll ${camera.roll}°, FOV ${camera.fov}mm.`;
    const lightingDesc = `Lighting setup: ${lighting.preset} preset, Intensity ${lighting.intensity}, Temperature ${lighting.temperature}K.`;
    const hdrDesc = render.hdr ? "Apply High Dynamic Range (HDR) processing for vibrant colors and deep contrast." : "";
    const renderDesc = `Quality: ${render.quality}. Style: Photorealistic studio photography, highly detailed, cinematic lighting. ${hdrDesc}`;
    
    // Combine into a comprehensive prompt for the model
    const prompt = `Create a photorealistic image based on these technical specifications: ${cameraDesc} ${lightingDesc} ${renderDesc}`;

    // Validate and map aspect ratio to Imagen supported types
    const supportedRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    let aspectRatio = composition.aspectRatio;
    if (!supportedRatios.includes(aspectRatio)) {
      aspectRatio = "16:9"; // Default fallback
    }

    // Call Google GenAI Imagen model
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio as any,
      },
    });

    const generatedImage = response.generatedImages?.[0];
    
    if (!generatedImage || !generatedImage.image?.imageBytes) {
      throw new Error("Failed to generate image data.");
    }

    // Convert Base64 string to Blob
    const byteCharacters = atob(generatedImage.image.imageBytes);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    
    return new Blob([byteArray], { type: 'image/jpeg' });

  } catch (error: any) {
    console.error("Generate Image Error:", error);
    throw new Error(error.message || "Failed to generate image. Please check your API key and try again.");
  }
};