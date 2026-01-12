import { GoogleGenerativeAI } from "@google/generative-ai";
import { MongoClient } from "mongodb";

// MongoDB কানেকশন সেটআপ
const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { data } = req.body;

    // ১. Gemini AI কনফিগারেশন
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `তুমি একজন বাস্তু শাস্ত্র বিশেষজ্ঞ। নিচের বাড়ির ডেটা বিশ্লেষণ করো: ${JSON.stringify(data)}. 
    একটি বিস্তারিত রিপোর্ট বাংলায় তৈরি করো যেখানে প্রতিটি বিষয়ের প্রভাব ও প্রতিকার (Remedy) থাকবে।`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // ২. মঙ্গোডিবি-তে ডেটা সেভ করা (ঐচ্ছিক কিন্তু ভালো)
    try {
      await client.connect();
      const db = client.db("vastuDB");
      await db.collection("reports").insertOne({
        inputData: data,
        analysis: text,
        createdAt: new Date()
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
    }

    res.status(200).json({ analysis: text });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "AI সার্ভিস কাজ করছে না। দয়া করে API Key ও কানেকশন চেক করুন।" });
  }
}
