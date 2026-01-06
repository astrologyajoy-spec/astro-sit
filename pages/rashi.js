import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Rashi() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateRashi = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const name = e.target.name.value;
    const dob = e.target.dob.value;
    const time = e.target.time.value;

    const dateObj = new Date(dob);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const [hour, min] = time.split(':').map(Number);

    // 1. Sun Sign (Western)
    const getSunSign = (m, d) => {
      const days = [21, 20, 21, 21, 21, 21, 23, 23, 23, 23, 22, 22];
      const signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
      return d < days[m - 1] ? signs[m - 1] : signs[m % 12];
    };

    // 2. Accurate Moon Sign Calculation (Luni-Solar Logic)
    const getMoonSign = (y, m, d, h, mn) => {
      const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
      
      // Epoch calculation for 2000-01-01
      const decimalDate = y + (m - 1) / 12 + d / 365;
      const daysSinceEpoch = (y - 2000) * 365.25 + (m - 1) * 30.6 + d + (h / 24);
      
      // Moon's mean longitude
      let moonLon = 218.316 + 13.176396 * daysSinceEpoch;
      moonLon = moonLon % 360;
      if (moonLon < 0) moonLon += 360;

      // Vedic Ayanamsa Correction (Approx. 24 degrees for current era)
      const ayanamsa = 23.85 + (0.013 * (y - 1900));
      let vedicMoonLon = moonLon - ayanamsa;
      if (vedicMoonLon < 0) vedicMoonLon += 360;

      const index = Math.floor(vedicMoonLon / 30);
      return signs[index];
    };

    const sun = getSunSign(month, day);
    const moon = getMoonSign(year, month, day, hour, min);

    setTimeout(() => {
      setResult({ name, sun, moon });
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#090a0f', color: '#fff' }}>
      <Header />
      <main style={{ flex: 1, padding: '50px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f' }}>Accurate Zodiac Finder</h1>
        
        <form onSubmit={calculateRashi} style={{ background: '#111', padding: '30px', borderRadius: '20px', display: 'inline-block', width: '100%', maxWidth: '400px', border: '1px solid #333' }}>
          <input type="text" name="name" placeholder="Name" required style={inputStyle} />
          <input type="date" name="dob" required style={inputStyle} />
          <input type="time" name="time" required style={inputStyle} />
          <button type="submit" style={btnStyle}>{loading ? "Processing..." : "Find My Rashi"}</button>
        </form>

        {result && (
          <div style={{ marginTop: '30px', padding: '20px', border: '2px solid #f1c40f', borderRadius: '15px', display: 'inline-block' }}>
            <h2>Results for {result.name}</h2>
            <p>☀️ Sun Sign: <b>{result.sun}</b></p>
            <p>🌙 Moon Sign (Vedic): <b>{result.moon}</b></p>
            <p style={{fontSize: '0.8rem', color: '#888'}}>*Based on Vedic Ayanamsa correction</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

const inputStyle = { padding: '12px', width: '100%', marginBottom: '15px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' };
const btnStyle = { padding: '12px', background: '#f1c40f', color: '#000', border: 'none', borderRadius: '8px', width: '100%', cursor: 'pointer', fontWeight: 'bold' };
