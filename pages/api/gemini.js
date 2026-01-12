import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // Vercel Settings থেকে API Key সংগ্রহ
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { data } = req.body;
    
    // প্রম্পটটি বাংলায় যাতে রিপোর্ট বাংলায় আসে
    const prompt = `তুমি একজন বাস্তু শাস্ত্র বিশেষজ্ঞ। নিচের বাড়ির ডেটা বিশ্লেষণ করো: ${JSON.stringify(data)}. 
    একটি বিস্তারিত রিপোর্ট বাংলায় তৈরি করো যেখানে প্রতিটি বিষয়ের প্রভাব ও প্রতিকার (Remedy) থাকবে।`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // টেক্সট পাওয়ার জন্য await ব্যবহার করা হয়েছে
    const text = await response.text(); 
    
    if (!text) throw new Error("AI কোনো কন্টেন্ট তৈরি করতে পারেনি।");

    res.status(200).json({ analysis: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "AI সার্ভিস কাজ করছে না। দয়া করে API Key ও কানেকশন চেক করুন।" });
  }
}
