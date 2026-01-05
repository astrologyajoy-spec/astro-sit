import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(null);

  const calculateLuck = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const dob = new Date(e.target.dob.value);
    const month = dob.getMonth() + 1;
    const day = dob.getDate();

    // রাশি বের করার লজিক
    let zodiac = "";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) zodiac = "মেষ (Aries)";
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) zodiac = "বৃষ (Taurus)";
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) zodiac = "মিথুন (Gemini)";
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) zodiac = "কর্কট (Cancer)";
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) zodiac = "সিংহ (Leo)";
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) zodiac = "কন্যা (Virgo)";
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) zodiac = "তুলা (Libra)";
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) zodiac = "বৃশ্চিক (Scorpio)";
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) zodiac = "ধনু (Sagittarius)";
    else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) zodiac = "মকর (Capricorn)";
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) zodiac = "কুম্ভ (Aquarius)";
    else zodiac = "মীন (Pisces)";

    const fortunes = [
      "আজ আপনার জন্য নতুন কোনো সুযোগ আসতে পারে।",
      "অর্থনৈতিক দিকে উন্নতির যোগ আছে।",
      "পরিবারের সাথে ভালো সময় কাটবে।",
      "আজকের দিনে যেকোনো গুরুত্বপূর্ণ সিদ্ধান্ত ভেবেচিন্তে নিন।",
      "আপনার কঠোর পরিশ্রমের ফল আজ পেতে পারেন।"
    ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    setResult({ name, zodiac, fortune: randomFortune });
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', background: '#1a1a2e', color: 'white', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h1>✨ ভাগ্য গণনা ২০২৬ ✨</h1>
      
      {!result ? (
        <form onSubmit={calculateLuck} style={{ background: '#16213e', padding: '30px', borderRadius: '15px', display: 'inline-block' }}>
          <input type="text" name="name" placeholder="আপনার নাম" required style={{ padding: '12px', width: '250px', marginBottom: '15px', borderRadius: '5px', border: 'none' }} /><br/>
          <input type="date" name="dob" required style={{ padding: '12px', width: '250px', marginBottom: '15px', borderRadius: '5px', border: 'none' }} /><br/>
          <button type="submit" style={{ padding: '12px 30px', background: '#e94560', border: 'none', color: 'white', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }}>ভাগ্যফল দেখুন</button>
        </form>
      ) : (
        <div style={{ background: '#0f3460', padding: '30px', borderRadius: '15px', display: 'inline-block', marginTop: '20px' }}>
          <h2>প্রিয় {result.name},</h2>
          <p style={{ fontSize: '20px' }}>আপনার রাশি হলো: <strong>{result.zodiac}</strong></p>
          <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#e94560' }}>"{result.fortune}"</p>
          <button onClick={() => setResult(null)} style={{ marginTop: '20px', padding: '10px 20px', background: 'transparent', border: '1px solid white', color: 'white', borderRadius: '5px' }}>আবার চেষ্টা করুন</button>
        </div>
      )}
    </div>
  );
}
