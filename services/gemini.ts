
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SolutionResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
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
      if (signal?.aborted) throw new Error("aborted");

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
          systemInstruction: "You are the SolveSphere Intelligence Engine. Your primary goal is to provide accurate, high-fidelity solutions for students and business owners. IMPORTANT: If the user's input contains spelling mistakes, typos, or nonsensical words, you must use your advanced linguistic capabilities to infer the intended meaning, correct the errors internally, and provide the correct answer or strategy. Never criticize or explicitly correct the user's spelling; simply deliver the intelligence they intended to request as if the input were perfectly written.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              analysis: { type: Type.STRING, description: "Problem audit and understanding. Mentally correct user spelling errors here." },
              steps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Numbered logical steps leading to the correct solution." },
              solution: { type: Type.STRING, description: "The core correct output, ignoring any typos in the original input." },
              recommendations: { type: Type.STRING, description: "Forward-looking strategic advice." },
              diagramDescription: { type: Type.STRING, description: "A detailed description for generating a schematic, non-realistic diagram, technical blueprint, or flowchart of the solution logic." },
              realisticDiagramDescription: { type: Type.STRING, description: "A vivid, detailed description of a realistic, real-world scene or high-fidelity simulation representing the solution in practice." },
              diagramNodes: {
                type: Type.ARRAY,
                description: "A list of key nodes or sections within the schematic diagram to explain to the user.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING, description: "Short name of the node or section." },
                    description: { type: Type.STRING, description: "Detailed explanation of this component's role in the logic." }
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
    } catch (error: any) {
      if (error?.message === "aborted" || signal?.aborted) {
        throw new Error("Synthesis cancelled by user.");
      }
      console.error("Gemini Engine Error:", error);
      return this.handleError(error);
    }
  }

  async generateVisual(prompt: string, context: string, isRealistic: boolean = false, signal?: AbortSignal): Promise<string> {
    try {
      if (signal?.aborted) throw new Error("aborted");

      const technicalPrompt = isRealistic 
        ? `Cinematic, photorealistic high-fidelity 3D simulation scene. Style: Professional photography, 8k resolution, detailed textures, realistic lighting and shadows, real-world environment. Subject: ${prompt}. Context: ${context}`
        : `Professional schematic 2D diagram. Style: Flat vector illustration, minimal technical design, clean lines, no realism, no 3D shading, blueprint aesthetic, schematic flowchart style. Subject: ${prompt}. Context: ${context}`;
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: technicalPrompt }],
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      if (signal?.aborted) throw new Error("aborted");

      for (const part of response.candidates?.[0]?.content.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      throw new Error("Visual generation failed - No image data returned");
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
