
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SolutionResult } from "../types";

export class GeminiService {
  private getAI() {
    // Correctly use process.env.API_KEY directly as per guidelines
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private handleError(error: any): never {
    const errorString = String(error?.message || error).toLowerCase();
    
    if (errorString.includes("aborted") || errorString.includes("cancelled")) {
      throw new Error("Synthesis cancelled by user.");
    }
    if (errorString.includes("429") || errorString.includes("quota")) {
      throw new Error("AI synthesis limit reached. Please wait a few moments before trying again.");
    }
    if (errorString.includes("401") || errorString.includes("403") || errorString.includes("api_key")) {
      throw new Error("Authentication failed. Ensure you have selected a valid paid project API key.");
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
    
    throw new Error(error?.message || "An unexpected error occurred during synthesis. Please refine your request.");
  }

  async processRequest(
    modulePrompt: string, 
    userInput: string, 
    image?: string, 
    useSearch: boolean = false,
    signal?: AbortSignal
  ): Promise<SolutionResult> {
    const ai = this.getAI();
    try {
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
          systemInstruction: "You are the SolveSphere Intelligence Engine. Your primary goal is to provide accurate, high-fidelity solutions. Provide results strictly in JSON format according to the schema. If the user input has typos, fix them internally.",
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
          temperature: 0.2,
          thinkingConfig: { thinkingBudget: 16000 },
          tools: useSearch ? [{ googleSearch: {} }] : undefined
        }
      });

      if (signal?.aborted) throw new Error("aborted");
      let text = response.text || '';
      
      // Robust JSON extraction
      if (text.includes("```json")) {
        text = text.split("```json")[1].split("```")[0];
      } else if (text.includes("```")) {
        text = text.split("```")[1].split("```")[0];
      }
      
      const result = JSON.parse(text.trim());
      const groundingLinks = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        uri: chunk.web?.uri || '',
        title: chunk.web?.title || 'Resource'
      })).filter((l: any) => l.uri !== '') || [];

      return {
        ...result,
        links: groundingLinks
      };
    } catch (error: any) {
      if (error?.message === "aborted" || signal?.aborted) {
        throw new Error("Synthesis cancelled by user.");
      }
      console.error("Gemini Engine Error:", error);
      return this.handleError(error);
    }
  }

  async generateVisual(prompt: string, context: string, isRealistic: boolean = false, signal?: AbortSignal): Promise<string> {
    const ai = this.getAI();
    try {
      if (signal?.aborted) throw new Error("aborted");

      const technicalPrompt = isRealistic 
        ? `High-fidelity 3D realistic cinematic scene. High resolution, professional lighting. Subject: ${prompt}. Related context: ${context}`
        : `Technical schematic diagram, 2D vector style, clean flat illustration, minimal colors. Subject: ${prompt}. Related context: ${context}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: technicalPrompt }],
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      if (signal?.aborted) throw new Error("aborted");

      const parts = response.candidates?.[0]?.content.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      throw new Error("The visual engine did not return an image. This might be due to safety filters or a model timeout.");
    } catch (error: any) {
      if (error?.message === "aborted" || signal?.aborted) {
        throw new Error("Synthesis cancelled by user.");
      }
      console.error("Gemini Visual Error:", error);
      return this.handleError(error);
    }
  }
}

export const geminiService = new GeminiService();
