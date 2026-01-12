import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // শুধুমাত্র POST রিকোয়েস্ট গ্রহণ করবে
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Vercel-এ GEMINI_API_KEY সেট করা থাকতে হবে
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API Key missing in Vercel settings." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // ফ্রি টায়ারের জন্য এই মডেলটি সবচেয়ে স্থিতিশীল
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { data } = req.body;
    const prompt = `তুমি একজন বাস্তু শাস্ত্র বিশেষজ্ঞ। নিচের বাড়ির ডেটা বিশ্লেষণ করো: ${JSON.stringify(data)}. একটি বিস্তারিত রিপোর্ট বাংলায় তৈরি করো যেখানে প্রতিটি বিষয়ের প্রভাব ও প্রতিকার (Remedy) থাকবে।`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); // সঠিক পদ্ধতিতে টেক্সট পাওয়া

    if (!text) {
      throw new Error("AI কোনো কন্টেন্ট তৈরি করতে পারেনি।");
    }

    return res.status(200).json({ analysis: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: "AI সার্ভিস কাজ করছে না। দয়া করে API Key চেক করুন।" });
  }
}
