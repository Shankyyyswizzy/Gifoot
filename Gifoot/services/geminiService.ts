
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateLoveNote(context: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, deeply romantic, and personalized note for my girlfriend Archisha. 
      Context to use: ${context}. 
      Keep it sweet, sincere, and under 50 words. 
      Incorporate a tiny bit of "Hinglish" (Hindi + English) as it feels more personal. 
      Focus on themes of safety, home, and gaming together.`,
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });

    return response.text || "You are the most special person in my life, Archisha. ❤️";
  } catch (error) {
    console.error("Error generating love note:", error);
    return "Every moment with you is a gift, Archisha. I love you more than words can say. ❤️";
  }
}
