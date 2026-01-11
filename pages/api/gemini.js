import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // শুধুমাত্র POST রিকোয়েস্ট অ্যালাউ করবে
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Environment Variable থেকে API Key নেবে
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { data } = req.body; // ফ্রন্টএন্ড থেকে পাঠানো বাস্তু ডেটা
    
    // প্রম্পটটি আপডেট করা হয়েছে যাতে উত্তর বাংলায় আসে
    const prompt = `তুমি একজন বাস্তু শাস্ত্র বিশেষজ্ঞ। নিচে একটি বাড়ির বিভিন্ন দিকের ডেটা দেওয়া হলো: ${JSON.stringify(data)}. 
    এই ডেটা বিশ্লেষণ করে একটি বিস্তারিত বাস্তু রিপোর্ট বাংলায় তৈরি করো। 
    প্রতিটি পয়েন্টের জন্য 'অবস্থান', 'প্রভাব' এবং যদি কোনো সমস্যা থাকে তবে তার 'প্রতিকার' (Remedy) উল্লেখ করো। 
    সম্পূর্ণ উত্তরটি অবশ্যই বাংলা ভাষায় দেবে।`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); // await যোগ করা হয়েছে সঠিক রেজাল্টের জন্য

    res.status(200).json({ analysis: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message });
  }
}
