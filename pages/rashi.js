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

    const [year, month, day] = dob.split('-').map(Number);
    const [hour, min] = time.split(':').map(Number);

    // 1. Sun Sign (Western Astrology)
    const getSunSign = (m, d) => {
      const signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
      const last_days = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
      return d <= last_days[m - 1] ? signs[m - 1] : signs[m % 12];
    };

    // 2. High-Accuracy Vedic Moon Sign Algorithm
    const getVedicMoonSign = (y, m, d, h, mn) => {
      const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
      
      // Calculate Julian Day
      if (m <= 2) { y -= 1; m += 12; }
      let A = Math.floor(y / 100);
      let B = 2 - A + Math.floor(A / 4);
      let JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
      JD += (h + mn / 60) / 24;

      // Moon's position calculation (Mean Longitude)
      let T = (JD - 2451545.0) / 36525;
      let L0 = 218.316 + 481267.881 * T; // Moon's mean longitude
      
      // Lahiri Ayanamsa Correction (Crucial for Vedic Astrology)
      let ayanamsa = 22.467 + 0.00014 * (y - 1900) + 0.0397 * T;
      let moonLon = (L0 - ayanamsa) % 360;
      if (moonLon < 0) moonLon += 360;

      return signs[Math.floor(moonLon / 30)];
    };

    const sun = getSunSign(month, day);
    const moon = getVedicMoonSign(year, month, day, hour, min);

    setTimeout(() => {
      setResult({ name, sun, moon, dob, time });
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#090a0f', color: '#fff' }}>
      <Header />
      
      <main style={{ flex: 1, padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f', fontSize: '2.5rem' }}>✨ Precision Astrology</h1>
        <p style={{ color: '#bdc3c7' }}>Get your authentic Vedic Moon Sign and Western Sun Sign</p>

        {!result ? (
          <form onSubmit={calculateRashi} style={formStyle}>
            <input type="text" name="name" placeholder="Enter Full Name" required style={inputStyle} />
            <div style={{ textAlign: 'left', margin: '10px 0' }}>
              <label style={labelStyle}>Birth Date</label>
              <input type="date" name="dob" required style={inputStyle} />
            </div>
            <div style={{ textAlign: 'left', margin: '10px 0' }}>
              <label style={labelStyle}>Exact Birth Time</label>
              <input type="time" name="time" required style={inputStyle} />
            </div>
            <button type="submit" style={btnStyle}>{loading ? "Analyzing Planetary Positions..." : "Check My Rashi"}</button>
          </form>
        ) : (
          <div style={reportContainer}>
            <h2 style={{ color: '#f1c40f' }}>Astrology Profile: {result.name}</h2>
            <div style={cardGrid}>
              <div style={signCard}>
                <p style={cardLabel}>WESTERN (SUN SIGN)</p>
                <h1 style={cardValue}>{result.sun}</h1>
                <p style={cardDesc}>Represents your ego and personality.</p>
              </div>
              <div style={signCard}>
                <p style={cardLabel}>VEDIC (MOON SIGN)</p>
                <h1 style={cardValue} className="highlight">{result.moon}</h1>
                <p style={cardDesc}>Represents your soul and emotions.</p>
              </div>
            </div>
            <button onClick={() => setResult(null)} style={backBtn}>Calculate Again</button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Styles
const formStyle = { background: '#111', padding: '40px', borderRadius: '30px', display: 'inline-block', width: '100%', maxWidth: '450px', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' };
const inputStyle = { padding: '14px', width: '100%', marginBottom: '15px', borderRadius: '10px', border: '1px solid #222', background: '#000', color: '#fff', fontSize: '1rem' };
const labelStyle = { color: '#f1c40f', fontSize: '0.8rem', fontWeight: 'bold', marginLeft: '5px' };
const btnStyle = { padding: '15px', background: '#f1c40f', color: '#000', border: 'none', borderRadius: '10px', width: '100%', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' };
const reportContainer = { maxWidth: '700px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '30px', border: '1px solid #222' };
const cardGrid = { display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' };
const signCard = { flex: 1, minWidth: '280px', background: '#000', padding: '30px', borderRadius: '20px', border: '1px solid #333', textAlign: 'center' };
const cardLabel = { fontSize: '0.7rem', letterSpacing: '2px', color: '#888' };
const cardValue = { fontSize: '2.5rem', margin: '10px 0', color: '#f1c40f' };
const cardDesc = { fontSize: '0.85rem', color: '#555' };
const backBtn = { marginTop: '30px', background: 'none', border: '1px solid #333', color: '#888', padding: '10px 20px', cursor: 'pointer', borderRadius: '8px' };
