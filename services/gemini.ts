
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SolutionResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async processRequest(
    modulePrompt: string, 
    userInput: string, 
    image?: string, 
    useSearch: boolean = false
  ): Promise<SolutionResult> {
    try {
      const modelName = 'gemini-3-pro-preview';
      
      const response = await this.ai.models.generateContent({
        model: modelName,
        contents: [{ 
          role: 'user', 
          parts: [
            { text: `Instruction: ${modulePrompt}\nInput: ${userInput}` },
            ...(image ? [{ inlineData: { mimeType: 'image/png', data: image.split(',')[1] || image } }] : [])
          ] 
        }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              analysis: { type: Type.STRING, description: "Problem audit and understanding." },
              steps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Numbered logical steps." },
              solution: { type: Type.STRING, description: "The core output." },
              recommendations: { type: Type.STRING, description: "Forward-looking strategic advice." }
            },
            required: ["analysis", "steps", "solution", "recommendations"]
          },
          temperature: 0.2,
          thinkingConfig: { thinkingBudget: 16000 },
          tools: useSearch ? [{ googleSearch: {} }] : undefined
        }
      });

      const result = JSON.parse(response.text);
      const groundingLinks = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        uri: chunk.web?.uri || '',
        title: chunk.web?.title || 'Resource'
      })).filter((l: any) => l.uri !== '') || [];

      return {
        ...result,
        links: groundingLinks
      };
    } catch (error) {
      console.error("Gemini Engine Error:", error);
      throw error;
    }
  }

  async generateVisual(prompt: string, context: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `Professional, clean, high-resolution product visual: ${prompt}. Context: ${context}` }],
        },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });

      for (const part of response.candidates?.[0]?.content.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      throw new Error("Visual generation failed");
    } catch (error) {
      console.error("Gemini Visual Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
