import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // আপনার API Key Vercel-এ GEMINI_API_KEY নামে থাকতে হবে
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // ফ্রি টায়ারের জন্য gemini-1.5-flash সবচেয়ে ভালো
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { data } = req.body;
    
    const prompt = `তুমি একজন বাস্তু শাস্ত্র বিশেষজ্ঞ। নিচের বাড়ির ডেটা বিশ্লেষণ করো: ${JSON.stringify(data)}. 
    একটি বিস্তারিত রিপোর্ট বাংলায় তৈরি করো যেখানে প্রতিটি বিষয়ের প্রভাব ও প্রতিকার (Remedy) থাকবে।`;
    
    // কনটেন্ট জেনারেট করা
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text(); // সরাসরি text() কল করুন
    
    if (!text) throw new Error("AI কোনো উত্তর দিতে পারেনি।");

    res.status(200).json({ analysis: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // এরর মেসেজটি সরাসরি পাঠালে বুঝতে সুবিধা হবে
    res.status(500).json({ error: "AI সার্ভিস কাজ করছে না। দয়া করে API Key ও মডেল চেক করুন।" });
  }
}
