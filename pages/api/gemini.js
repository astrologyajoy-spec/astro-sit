import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // API Key check
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API Key missing in Vercel settings" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { data } = req.body;
    
    const prompt = `তুমি একজন বাস্তু শাস্ত্র বিশেষজ্ঞ। নিচের বাড়ির ডেটা বিশ্লেষণ করো: ${JSON.stringify(data)}. একটি বিস্তারিত রিপোর্ট বাংলায় তৈরি করো।`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); 
    
    return res.status(200).json({ analysis: text });
  } catch (error) {
    return res.status(500).json({ error: "AI processing failed: " + error.message });
  }
}
