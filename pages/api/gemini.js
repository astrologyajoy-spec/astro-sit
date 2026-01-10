import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { data } = req.body;
    const prompt = `You are a Vastu Expert. Analyze this 16-zone data and give remedies: ${JSON.stringify(data)}`;
    
    const result = await model.generateContent(prompt);
    res.status(200).json({ analysis: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
