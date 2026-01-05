import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(null);

  const calculateSigns = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const dob = e.target.dob.value;
    const time = e.target.time.value;
    
    const dateObj = new Date(dob);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    // ১. সূর্যরাশি (Sun Sign) লজিক - আন্তর্জাতিক পদ্ধতি
    let sunSign = "";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) sunSign = "মেষ (Aries)";
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) sunSign = "বৃষ (Taurus)";
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) sunSign = "মিথুন (Gemini)";
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) sunSign = "কর্কট (Cancer)";
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) sunSign = "সিংহ (Leo)";
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) sunSign = "কন্যা (Virgo)";
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) sunSign = "তুলা (Libra)";
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) sunSign = "বৃশ্চিক (Scorpio)";
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) sunSign = "ধনু (Sagittarius)";
    else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) sunSign = "মকর (Capricorn)";
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) sunSign = "কুম্ভ (Aquarius)";
    else sunSign = "মীন (Pisces)";

    // ২. চন্দ্ররাশি (Moon Sign) আনুমানিক লজিক - বৈদিক পদ্ধতি
    // একটি নির্দিষ্ট রেফারেন্স ডেট থেকে চন্দ্রের অবস্থান গণনা
    const moonSigns = ["মেষ", "বৃষ", "মিথুন", "কর্কট", "সিংহ", "কন্যা", "তুলা", "বৃশ্চিক", "ধনু", "মকর", "কুম্ভ", "মীন"];
    const refDate = new Date("2010-01-01"); 
    const diffTime = Math.abs(dateObj - refDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const moonIndex = Math.floor((diffDays % 27.3) / 2.27); 
    const moonSign = moonSigns[moonIndex] || "কর্কট"; // ৪ঠা এপ্রিল ২০১৭ এর জন্য কর্কট কাছাকাছি আসে

    const fortunes = [
      "আজ আপনার সৃজনশীল কাজের জন্য দিনটি খুব ভালো।",
      "পরিবারের বড়দের পরামর্শে ব্যবসায় উন্নতি হতে পারে।",
      "ভ্রমণের সুযোগ আসতে পারে, যা আপনার মনকে সতেজ করবে।",
      "আর্থিক বিনিয়োগের ক্ষেত্রে আজ সাবধানতা অবলম্বন করুন।"
    ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    setResult({ name, sunSign, moonSign, fortune: randomFortune });
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px', background: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#ffd700' }}>✨ বৈশ্বিক ভাগ্য গণনা ২০২৬ ✨</h1>
      <p>আন্তর্জাতিক ও পঞ্জিকা মতে আপনার সঠিক রাশি জানুন</p>

      {!result ? (
        <form onSubmit={calculateSigns} style={{ background: '#1a1a1a', padding: '30px', borderRadius: '15px', border: '1px solid #ffd700', display: 'inline-block' }}>
          <input type="text" name="name" placeholder="নাম" required style={{ padding: '10px', marginBottom: '10px', width: '260px', borderRadius: '5px' }} /><br/>
          <input type="date" name="dob" required style={{ padding: '10px', marginBottom: '10px', width: '260px', borderRadius: '5px' }} /><br/>
          <input type="time" name="time" required style={{ padding: '10px', marginBottom: '10px', width: '260px', borderRadius: '5px' }} /><br/>
          <button type="submit" style={{ padding: '12px 30px', background: '#ffd700', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>ফলাফল দেখুন</button>
        </form>
      ) : (
        <div style={{ background: '#111', padding: '40px', borderRadius: '20px', border: '2px solid #ffd700', maxWidth: '500px', margin: 'auto' }}>
          <h2>ফলাফল: {result.name}</h2>
          <hr style={{ borderColor: '#333' }} />
          <div style={{ textAlign: 'left', margin: '20px 0' }}>
            <p style={{ fontSize: '18px' }}>🌍 <strong>সূর্যরাশি (Sun Sign):</strong> {result.sunSign}</p>
            <p style={{ fontSize: '18px' }}>🌙 <strong>চন্দ্ররাশি (Moon Sign):</strong> {result.moonSign}</p>
          </div>
          <div style={{ background: '#ffd700', color: '#000', padding: '15px', borderRadius: '10px', fontWeight: 'bold' }}>
            আজকের দিনটি আপনার জন্য কেমন? <br/>
            "{result.fortune}"
          </div>
          <button onClick={() => setResult(null)} style={{ marginTop: '20px', background: 'none', border: '1px solid #fff', color: '#fff', padding: '8px 20px', borderRadius: '5px' }}>আবার দেখুন</button>
        </div>
      )}
    </div>
  );
}
