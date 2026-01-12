import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // Vercel Settings-এ GEMINI_API_KEY অবশ্যই থাকতে হবে
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API Key is missing in Vercel settings." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // মডেলের নাম 'gemini-1.5-flash' অথবা 'gemini-pro' ট্রাই করুন
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { data } = req.body;
    const prompt = `তুমি একজন বাস্তু শাস্ত্র বিশেষজ্ঞ। নিচের বাড়ির ডেটা বিশ্লেষণ করো: ${JSON.stringify(data)}. একটি বিস্তারিত রিপোর্ট বাংলায় তৈরি করো।`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); 
    
    if (!text) throw new Error("Empty response from AI");

    res.status(200).json({ analysis: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // সঠিক এরর মেসেজ পাঠানো হচ্ছে যাতে কারণ বোঝা যায়
    res.status(500).json({ error: "AI সার্ভিস কাজ করছে না। দয়া করে API Key চেক করুন।" });
  }
}
