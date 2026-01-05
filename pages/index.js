import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(null);

  const calculateLuck = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const dob = new Date(e.target.dob.value);
    const month = dob.getMonth() + 1;
    const day = dob.getDate();

    // ১. ওয়েস্টার্ন সূর্যরাশি (Sun Sign) লজিক
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

    // ২. পঞ্জিকা/বৈদিক চন্দ্ররাশি (Moon Sign - আনুমানিক লজিক)
    // সঠিক পঞ্জিকা গণনার জন্য জটিল API লাগে, তবে আমরা ইউজারকে অপশন দিতে পারি
    let moonSign = "পঞ্জিকা অনুযায়ী আপনার চন্দ্ররাশি ভিন্ন হতে পারে (যেমন: কর্কট)";

    const fortunes = [
      "আজকের দিনে আপনার বিদেশ যাত্রার বা নতুন যোগাযোগের সম্ভাবনা আছে।",
      "আর্থিক দিক থেকে দিনটি অত্যন্ত শুভ ও লাভদায়ক।",
      "পুরনো কোনো সমস্যার সমাধান হতে পারে আজ।",
      "কর্মক্ষেত্রে আপনার প্রভাব ও প্রতিপত্তি বাড়বে।"
    ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    setResult({ name, sunSign, moonSign, fortune: randomFortune });
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', background: '#0a0a1a', color: 'white', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h1>🌌 আন্তর্জাতিক ও বৈদিক ভাগ্যফল ২০২৬ 🌌</h1>
      
      {!result ? (
        <form onSubmit={calculateLuck} style={{ background: '#1c1c3c', padding: '30px', borderRadius: '20px', boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
          <input type="text" name="name" placeholder="আপনার নাম" required style={{ padding: '12px', width: '280px', marginBottom: '15px', borderRadius: '8px' }} /><br/>
          <input type="date" name="dob" required style={{ padding: '12px', width: '280px', marginBottom: '15px', borderRadius: '8px' }} /><br/>
          <button type="submit" style={{ padding: '15px 40px', background: '#f39c12', color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>আপনার ভাগ্য দেখুন</button>
        </form>
      ) : (
        <div style={{ background: '#16213e', padding: '40px', borderRadius: '20px', border: '2px solid #f39c12' }}>
          <h2>স্বাগতম {result.name}!</h2>
          <hr style={{ borderColor: '#f39c12' }} />
          <div style={{ margin: '20px 0' }}>
            <p>🌍 <strong>আন্তর্জাতিক (সূর্যরাশি):</strong> {result.sunSign}</p>
            <p>☸️ <strong>ভারতীয় পঞ্জিকা (চন্দ্ররাশি):</strong> ৪ঠা এপ্রিল রাত ৮:৩০ এর ক্ষেত্রে এটি 'কর্কট' হবে।</p>
          </div>
          <p style={{ fontSize: '20px', color: '#f39c12' }}>" {result.fortune} "</p>
          <button onClick={() => setResult(null)} style={{ marginTop: '20px', color: 'white', background: 'none', border: '1px solid white', padding: '8px 15px' }}>নতুন করে দেখুন</button>
        </div>
      )}
    </div>
  );
}
