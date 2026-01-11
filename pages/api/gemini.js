import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { data } = req.body;
    const prompt = `Act as a Vastu Shastra expert. Analyze the following house layout data: ${JSON.stringify(data)}. Provide detailed remedies and practical advice in English.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.status(200).json({ analysis: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
