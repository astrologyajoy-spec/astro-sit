import { GoogleGenerativeAI } from "@google/generative-ai";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { data } = req.body;

    // ১. Gemini AI রিপোর্ট তৈরি
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `তুমি একজন বাস্তু শাস্ত্র বিশেষজ্ঞ। নিচের বাড়ির ডেটা বিশ্লেষণ করো: ${JSON.stringify(data)}. 
    একটি বিস্তারিত রিপোর্ট বাংলায় তৈরি করো যেখানে প্রতিটি বিষয়ের প্রভাব ও প্রতিকার (Remedy) থাকবে।`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // ২. MongoDB-তে রিপোর্ট সেভ করা
    try {
      await client.connect();
      const database = client.db("vastuDB");
      const collection = database.collection("reports");
      await collection.insertOne({
        data,
        analysis: text,
        createdAt: new Date()
      });
    } catch (dbError) {
      console.error("Database Save Error:", dbError);
      // ডাটাবেসে সেভ না হলেও যেন ইউজার রিপোর্ট পায় তার জন্য এটি করা হয়েছে
    }

    res.status(200).json({ analysis: text });
  } catch (error) {
    console.error("Main Error:", error);
    res.status(500).json({ error: "AI সার্ভিস কাজ করছে না। দয়া করে API Key ও কানেকশন চেক করুন।" });
  }
}
