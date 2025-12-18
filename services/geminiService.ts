
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const explainHighDimensions = async (n: number, currentRotation: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the concept of rotation in ${n} dimensions, specifically focusing on the current active planes: ${currentRotation}. 
      Keep the explanation intuitive but mathematically sound for someone using a visualizer with vertical arrows representing orthogonal dimensions. 
      Mention how "planes of rotation" work in N-dimensions versus 3-dimensions.`,
      config: {
        systemInstruction: "You are a friendly senior physics and mathematics professor with a talent for visual analogies.",
        temperature: 0.7,
      },
    });

    return {
      text: response.text || "I'm contemplating the geometry...",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "Error connecting to the math engine.", sources: [] };
  }
};
