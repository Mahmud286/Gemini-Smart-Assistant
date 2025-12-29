
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Message, MessagePart } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async solveProblem(
    toolPrompt: string, 
    userInput: string, 
    image?: string, 
    useSearch: boolean = false
  ): Promise<Partial<Message>> {
    try {
      const modelName = useSearch ? 'gemini-3-pro-preview' : 'gemini-3-pro-preview'; // Prefer Pro for high-quality logic
      
      const systemInstruction = `You are an elite reasoning engine for SolveSphere AI. 
      Your goal is to solve problems using a "First Principles" approach.
      ALWAYS break your answer into the following sections:
      1. **Analysis**: Briefly describe your understanding of the core problem.
      2. **Logical Steps**: Provide a numbered, step-by-step breakdown of the solution.
      3. **The Solution**: The final definitive answer or output.
      4. **Recommendations**: Strategic advice for the student or business owner.
      
      Maintain a professional, encouraging, and highly structured tone.`;

      const parts: any[] = [{ text: `${toolPrompt}\n\nUser Input: ${userInput}` }];
      
      if (image) {
        const [mime, data] = image.split(',');
        const mimeType = mime.match(/:(.*?);/)?.[1] || 'image/png';
        parts.push({
          inlineData: {
            mimeType,
            data: data || image
          }
        });
      }

      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts }],
        config: {
          systemInstruction,
          temperature: 0.4, // Lower temperature for more consistent reasoning
          thinkingConfig: { thinkingBudget: 32768 },
          tools: useSearch ? [{ googleSearch: {} }] : undefined
        }
      });

      const text = response.text || "I processed your request but couldn't generate a text response.";
      const groundingLinks = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        uri: chunk.web?.uri || '',
        title: chunk.web?.title || 'Resource'
      })).filter((l: any) => l.uri !== '') || [];

      return {
        content: text,
        groundingLinks
      };
    } catch (error) {
      console.error("Gemini Reasoning Error:", error);
      throw error;
    }
  }

  async generateVisual(prompt: string, context: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `High quality, clean, professional diagram or visual for: ${prompt}. Context: ${context}` }],
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
      throw new Error("No image data in response");
    } catch (error) {
      console.error("Gemini Visual Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
