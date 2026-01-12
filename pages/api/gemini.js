import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // Vercel-e GEMINI_API_KEY name-e thakte hobe
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Free tier-er jonno ei model ti best
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { data } = req.body;
    
    const prompt = `তুমি একজন বাস্তু শাস্ত্র বিশেষজ্ঞ। নিচের বাড়ির ডেটা বিশ্লেষণ করো: ${JSON.stringify(data)}. 
    একটি বিস্তারিত রিপোর্ট বাংলায় তৈরি করো যেখানে প্রতিটি বিষয়ের প্রভাব ও প্রতিকার (Remedy) থাকবে।`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // await text() call kora guruttopurno
    const text = await response.text(); 
    
    if (!text) throw new Error("AI content toiri korte pareni.");

    res.status(200).json({ analysis: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "AI service error. Please check API Key and model settings." });
  }
}
