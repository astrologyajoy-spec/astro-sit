import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(null);

  const calculateSigns = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const dob = e.target.dob.value;
    const time = e.target.time.value;

    const date = new Date(`${dob}T${time}`);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();

    // 1. Sun Sign (Western)
    let sunSign = "";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) sunSign = "Mesh (Aries)";
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) sunSign = "Vrish (Taurus)";
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) sunSign = "Mithun (Gemini)";
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) sunSign = "Karkat (Cancer)";
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) sunSign = "Singha (Leo)";
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) sunSign = "Kanya (Virgo)";
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) sunSign = "Tula (Libra)";
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) sunSign = "Vrischika (Scorpio)";
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) sunSign = "Dhanu (Sagittarius)";
    else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) sunSign = "Makara (Capricorn)";
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) sunSign = "Kumbha (Aquarius)";
    else sunSign = "Meena (Pisces)";

    // 2. Moon Sign Algorithm (Vedic Estimation)
    const julianDate = (d, m, y) => {
      if (m <= 2) { y -= 1; m += 12; }
      let a = Math.floor(y / 100);
      let b = 2 - a + Math.floor(a / 4);
      return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
    };

    const jd = julianDate(day, month, year) + (hour + min / 60) / 24;
    const daysSinceEpoch = jd - 2451545.0;
    
    // Moon's Mean Longitude (Advanced Formula)
    let moonLong = 218.316 + 13.176396 * daysSinceEpoch;
    moonLong = moonLong % 360;
    if (moonLong < 0) moonLong += 360;

    // Ayanamsa Correction (Indian Panjika System)
    const ayanamsa = 23.5 + (0.000001 * daysSinceEpoch); // Lahiri Ayanamsa estimation
    let vedicLong = (moonLong - ayanamsa) % 360;
    if (vedicLong < 0) vedicLong += 360;

    const moonSigns = ["Mesh", "Vrish", "Mithun", "Karkat", "Singha", "Kanya", "Tula", "Vrischika", "Dhanu", "Makara", "Kumbha", "Meena"];
    const moonIndex = Math.floor(vedicLong / 30);
    const moonSign = moonSigns[moonIndex];

    const fortunes = [
        "Aj apnar somoy khub bhalo. Ortho uparjoner notun dik khulte pare.",
        "Poribarer sathe bhalo somoy katbe, kintu svasther dike nojor rakhun.",
        "Karmokhetre notun daitwo pete paren. Bondhuder sahajyo paben.",
        "Ajker dine kono boro biniyog na করাই bhalo hobe."
    ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    setResult({ name, sunSign, moonSign, fortune: randomFortune });
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', background: '#0a0a2a', color: 'white', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h1 style={{color: '#f1c40f'}}>🌠 Global Astrology 2026 🌠</h1>
      {!result ? (
        <form onSubmit={calculateSigns} style={{ background: '#161632', padding: '30px', borderRadius: '20px', display: 'inline-block', border: '1px solid #f1c40f' }}>
          <input type="text" name="name" placeholder="Name" required style={{ padding: '10px', marginBottom: '10px', width: '250px', borderRadius: '5px' }} /><br/>
          <input type="date" name="dob" required style={{ padding: '10px', marginBottom: '10px', width: '250px', borderRadius: '5px' }} /><br/>
          <input type="time" name="time" required style={{ padding: '10px', marginBottom: '10px', width: '250px', borderRadius: '5px' }} /><br/>
          <button type="submit" style={{ padding: '12px 30px', background: '#f1c40f', color: 'black', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }}>Check Fate</button>
        </form>
      ) : (
        <div style={{ background: '#1c1c44', padding: '40px', borderRadius: '20px', border: '2px solid #f1c40f', maxWidth: '500px', margin: 'auto' }}>
          <h2>Result for {result.name}</h2>
          <hr/>
          <p>🌍 <b>Western (Sun Sign):</b> {result.sunSign}</p>
          <p>🌙 <b>Vedic (Moon Sign):</b> {result.moonSign}</p>
          <div style={{ marginTop: '20px', padding: '15px', background: '#f1c40f', color: 'black', borderRadius: '10px' }}>
            <b>Fortune:</b><br/> "{result.fortune}"
          </div>
          <button onClick={() => setResult(null)} style={{ marginTop: '20px', color: 'white', background: 'none', border: '1px solid white', padding: '10px', cursor: 'pointer' }}>Try Again</button>
        </div>
      )}
    </div>
  );
}
