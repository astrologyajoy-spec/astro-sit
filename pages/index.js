import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(null);

  const calculateLuck = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const dob = e.target.dob.value;
    const time = e.target.time.value;
    const place = e.target.place.value;
    
    // রাশি নির্ণয়ের লজিক (Sun Sign)
    const dateObj = new Date(dob);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

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

    const fortunes = [
      "আপনার জন্মস্থান ও সময়ের সংযোগ আজ আপনার জন্য শুভ বার্তা বয়ে আনবে।",
      "আজকের দিনে নতুন কোনো পরিকল্পনা শুরু করার জন্য চমৎকার সময়।",
      "আর্থিক ও মানসিকভাবে আপনি আজ বেশ শক্তিশালী অনুভব করবেন।",
      "পরিবার বা বন্ধুদের সাথে একটি আনন্দদায়ক সময় কাটানোর যোগ আছে।"
    ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    setResult({ name, sunSign, dob, time, place, fortune: randomFortune });
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px', background: '#050510', color: 'white', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#f1c40f' }}>✨ প্রফেশনাল ভাগ্য গণনা ২০২৬ ✨</h1>
      
      {!result ? (
        <form onSubmit={calculateLuck} style={{ background: '#111125', padding: '30px', borderRadius: '20px', display: 'inline-block', border: '1px solid #333' }}>
          <input type="text" name="name" placeholder="পুরো নাম" required style={{ padding: '12px', width: '280px', marginBottom: '15px', borderRadius: '5px' }} /><br/>
          <input type="date" name="dob" required style={{ padding: '12px', width: '280px', marginBottom: '15px', borderRadius: '5px' }} /><br/>
          <input type="time" name="time" required style={{ padding: '12px', width: '280px', marginBottom: '15px', borderRadius: '5px' }} /><br/>
          <input type="text" name="place" placeholder="জন্মস্থান (শহর/জেলা)" required style={{ padding: '12px', width: '280px', marginBottom: '15px', borderRadius: '5px' }} /><br/>
          <button type="submit" style={{ padding: '15px 40px', background: '#f1c40f', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>নিখুঁত ফলাফল দেখুন</button>
        </form>
      ) : (
        <div style={{ background: '#1a1a3a', padding: '40px', borderRadius: '20px', border: '2px solid #f1c40f', maxWidth: '500px', margin: 'auto' }}>
          <h2>ফলাফল: {result.name}</h2>
          <hr/>
          <p>📅 <strong>জন্ম তারিখ:</strong> {result.dob}</p>
          <p>⏰ <strong>জন্ম সময়:</strong> {result.time}</p>
          <p>📍 <strong>জন্মস্থান:</strong> {result.place}</p>
          <p>🌟 <strong>রাশি:</strong> {result.sunSign}</p>
          <div style={{ marginTop: '20px', padding: '15px', background: '#f1c40f', color: 'black', borderRadius: '10px' }}>
            <strong>আজকের ভাগ্যফল:</strong><br/>
            "{result.fortune}"
          </div>
          <button onClick={() => setResult(null)} style={{ marginTop: '20px', color: 'white', background: 'none', border: '1px solid white', padding: '10px' }}>আবার দেখুন</button>
        </div>
      )}
    </div>
  );
}
