export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const token = process.env.HUGGINGFACE_TOKEN;
  if (!token) return res.status(500).json({ error: "Hugging Face Token missing!" });

  const { data } = req.body;

  // System Prompting: AI-কে বিশেষজ্ঞ জ্যোতিষী বানানো
  const prompt = `<s>[INST] তুমি একজন অভিজ্ঞ বৈদিক জ্যোতিষী এবং বাস্তু বিশেষজ্ঞ। নিচের বাড়ির তথ্যগুলো বিশ্লেষণ করে বাংলায় একটি বিস্তারিত এবং সুন্দর বাস্তু রিপোর্ট তৈরি করো।
তথ্য: ${JSON.stringify(data)} [/INST]</s>`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({ 
          inputs: prompt,
          parameters: { max_new_tokens: 600, temperature: 0.7 }
        }),
      }
    );

    const result = await response.json();
    
    // AI-এর উত্তর থেকে অপ্রয়োজনীয় অংশ বাদ দেওয়া
    const rawText = result[0]?.generated_text || "";
    const analysis = rawText.split("[/INST]")[1] || rawText;

    res.status(200).json({ analysis: analysis.trim() });
  } catch (error) {
    console.error("HF Error:", error);
    res.status(500).json({ error: "AI এখন ব্যস্ত আছে, ১ মিনিট পর আবার চেষ্টা করুন।" });
  }
}
