
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SolutionResult } from "../types";

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private async retry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      const isRetryable = error?.message?.includes("429") || error?.message?.includes("503") || error?.message?.includes("overloaded");
      if (isRetryable && retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retry(fn, retries - 1, delay * 2);
      }
      throw error;
    }
  }

  private handleError(error: any): never {
    const errorString = String(error?.message || error).toLowerCase();
    
    if (errorString.includes("aborted") || errorString.includes("cancelled")) {
      throw new Error("Synthesis cancelled by user.");
    }
    if (errorString.includes("429") || errorString.includes("quota")) {
      throw new Error("Rate limit reached. We are retrying, but the AI is currently under high demand.");
    }
    if (errorString.includes("401") || errorString.includes("403") || errorString.includes("api_key")) {
      throw new Error("Authentication failed. Please check your project billing and API key settings.");
    }
    if (errorString.includes("safety") || errorString.includes("blocked")) {
      throw new Error("The request was filtered for safety. Please try rephrasing your input.");
    }
    
    throw new Error(error?.message || "Synthesis engine error. Please try again in a few seconds.");
  }

  async processRequest(
    modulePrompt: string, 
    userInput: string, 
    image?: string, 
    useSearch: boolean = false,
    signal?: AbortSignal
  ): Promise<SolutionResult> {
    return this.retry(async () => {
      const ai = this.getAI();
      if (signal?.aborted) throw new Error("aborted");

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ 
          role: 'user', 
          parts: [
            { text: `Instruction: ${modulePrompt}\nInput: ${userInput}` },
            ...(image ? [{ inlineData: { mimeType: 'image/png', data: image.split(',')[1] || image } }] : [])
          ] 
        }],
        config: {
          systemInstruction: "You are the SolveSphere Intelligence Engine. Return strictly valid JSON. If the input has typos, ignore them and provide the correct logical output.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              analysis: { type: Type.STRING },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              solution: { type: Type.STRING },
              recommendations: { type: Type.STRING },
              diagramDescription: { type: Type.STRING },
              realisticDiagramDescription: { type: Type.STRING },
              diagramNodes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["label", "description"]
                }
              }
            },
            required: ["analysis", "steps", "solution", "recommendations", "diagramDescription", "realisticDiagramDescription", "diagramNodes"]
          },
          temperature: 0.1,
          thinkingConfig: { thinkingBudget: 8000 }, // Reduced for faster response
          tools: useSearch ? [{ googleSearch: {} }] : undefined
        }
      });

      if (signal?.aborted) throw new Error("aborted");
      let text = response.text || '';
      
      // Clean up potential markdown artifacts
      text = text.replace(/```json\n?/, "").replace(/\n?```/, "").trim();
      
      try {
        const result = JSON.parse(text);
        const groundingLinks = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
          uri: chunk.web?.uri || '',
          title: chunk.web?.title || 'Knowledge Source'
        })).filter((l: any) => l.uri !== '') || [];

        return { ...result, links: groundingLinks };
      } catch (e) {
        console.error("JSON Parse Error. Raw text:", text);
        throw new Error("Failed to parse AI response. The model may have returned malformed data.");
      }
    }).catch(err => this.handleError(err));
  }

  async generateVisual(prompt: string, context: string, isRealistic: boolean = false, signal?: AbortSignal): Promise<string> {
    return this.retry(async () => {
      const ai = this.getAI();
      if (signal?.aborted) throw new Error("aborted");

      const technicalPrompt = isRealistic 
        ? `A photorealistic high-fidelity real-world cinematic scene depicting: ${prompt}. Context: ${context}`
        : `A clean, professional 2D schematic diagram, minimal technical vector style. Subject: ${prompt}. Context: ${context}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: technicalPrompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });

      if (signal?.aborted) throw new Error("aborted");

      const parts = response.candidates?.[0]?.content.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      throw new Error("Visual generation failed.");
    }).catch(err => this.handleError(err));
  }
}

export const geminiService = new GeminiService();
