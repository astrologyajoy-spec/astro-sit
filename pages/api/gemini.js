export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const token = process.env.HUGGINGFACE_TOKEN;
  const { data } = req.body;

  const prompt = `<s>[INST] তুমি একজন অভিজ্ঞ বৈদিক জ্যোতিষী। নিচের বাড়ির তথ্যগুলো বিশ্লেষণ করে বাংলায় একটি সুন্দর বাস্তু রিপোর্ট তৈরি করো।
তথ্য: ${JSON.stringify(data)} [/INST]</s>`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", 
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({ 
          inputs: prompt,
          parameters: { max_new_tokens: 500 }
        }),
      }
    );

    const result = await response.json();
    
    // যদি Hugging Face থেকে কোনো টেক্সট আসে
    const rawText = result[0]?.generated_text || "";
    const analysis = rawText.split("[/INST]")[1] || rawText;

    if (!analysis) {
        return res.status(200).json({ analysis: "এআই এখন ডেটা প্রসেস করছে, দয়া করে ৩০ সেকেন্ড পর আবার চেষ্টা করুন।" });
    }

    res.status(200).json({ analysis: analysis.trim() });
  } catch (error) {
    res.status(500).json({ error: "কানেকশন সমস্যা। দয়া করে আবার চেষ্টা করুন।" });
  }
}
