import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const getIndulgenceCopy = async (
  currentProduct: string,
  recommendedProduct: string
): Promise<string> => {
  // If no API key, return a default generic message
  if (!genAI) {
    return `That ${recommendedProduct} is a grail. Cop it before it's gone.`;
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a hypebeast die-cast car collector and expert.
      A user just added "${currentProduct}" to their garage (cart).
      Convince them in ONE short, punchy sentence (max 15 words) why they need to cop "${recommendedProduct}" too.
      Use Gen Z slang like "grail", "clean", "fire", "drift", "garage", "aesthetic".
      Don't be cringy, be cool. No quotes.
    `;

    const response = await genAI.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text?.trim() || `The ${recommendedProduct} is pure fire. Add to garage.`;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Your collection needs the ${recommendedProduct}. Trust.`;
  }
};