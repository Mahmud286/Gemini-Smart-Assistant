
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SolutionResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  private handleError(error: any): never {
    const errorString = String(error?.message || error).toLowerCase();
    
    if (errorString.includes("429") || errorString.includes("quota")) {
      throw new Error("AI synthesis limit reached. Please wait a few moments before trying again.");
    }
    if (errorString.includes("401") || errorString.includes("403") || errorString.includes("api_key")) {
      throw new Error("Authentication failed. The AI service may be temporarily unavailable.");
    }
    if (errorString.includes("safety") || errorString.includes("blocked") || errorString.includes("candidate")) {
      throw new Error("The request was flagged by safety filters. Please try rephrasing your input.");
    }
    if (errorString.includes("503") || errorString.includes("overloaded")) {
      throw new Error("The AI model is currently overloaded. Retrying in a moment might help.");
    }
    if (errorString.includes("network") || errorString.includes("fetch") || errorString.includes("offline")) {
      throw new Error("Network connection error. Please check your internet connectivity.");
    }
    if (errorString.includes("aborted")) {
      throw new Error("Synthesis cancelled by user.");
    }
    
    throw new Error("An unexpected error occurred during synthesis. Please refine your request.");
  }

  async processRequest(
    modulePrompt: string, 
    userInput: string, 
    image?: string, 
    useSearch: boolean = false,
    signal?: AbortSignal
  ): Promise<SolutionResult> {
    try {
      // Note: The SDK itself might not fully support AbortSignal in all environments, 
      // but we wrap the call to handle the abort state gracefully in the UI.
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
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

      if (signal?.aborted) throw new Error("aborted");
      if (!response.text) throw new Error("Empty response from AI");
      
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
      return this.handleError(error);
    }
  }

  async generateVisual(prompt: string, context: string, signal?: AbortSignal): Promise<string> {
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

      if (signal?.aborted) throw new Error("aborted");

      for (const part of response.candidates?.[0]?.content.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      throw new Error("Visual generation failed - No image data returned");
    } catch (error) {
      console.error("Gemini Visual Error:", error);
      return this.handleError(error);
    }
  }
}

export const geminiService = new GeminiService();
