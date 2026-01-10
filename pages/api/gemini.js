import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // API Key চেক করা
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API Key is missing in Environment Variables' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { data } = req.body;
    const prompt = `You are a professional Vastu Expert. Analyze the following 8-zone house data and provide detailed remedies in English: ${JSON.stringify(data)}. Please keep the tone helpful and professional.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text) {
      return res.status(200).json({ analysis: text });
    } else {
      throw new Error("Empty response from AI");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
