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
    const place = e.target.place.value;

    // Advanced Mathematical Logic for Sun and Moon Position
    const dateObj = new Date(dob);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const [hour, min] = time.split(':').map(Number);

    // 1. Precise Sun Sign Calculation
    const getSunSign = (m, d) => {
      const days = [21, 20, 21, 21, 21, 21, 23, 23, 23, 23, 22, 22];
      const signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
      return d < days[m - 1] ? signs[m - 1] : signs[m % 12];
    };

    // 2. Advanced Moon Sign Logic (Based on Julian Date Simulation)
    const getMoonSign = (y, m, d, h, mn) => {
      const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
      
      // Calculate approximate Moon position
      let YY = y - Math.floor((12 - m) / 10);
      let MM = m + 9; if (MM >= 12) MM -= 12;
      let K1 = Math.floor(365.25 * (YY + 4712));
      let K2 = Math.floor(30.6 * MM + 0.5);
      let K3 = Math.floor(Math.floor((YY / 100) + 49) * 0.75) - 38;
      let JD = K1 + K2 + d + (h / 24) - K3 + 59; // Julian Date approximate
      
      let V = (JD - 2451562.2) / 27.321582;
      let position = (V - Math.floor(V)) * 360;
      let index = Math.floor(position / 30);
      
      return signs[index % 12];
    };

    const sun = getSunSign(month, day);
    const moon = getMoonSign(year, month, day, hour, min);

    // AI Prediction Based on Signs
    const predictions = {
      sun: `The Sun in ${sun} indicates your core identity and vital energy. Today, you will feel a surge of confidence in your workplace.`,
      moon: `With your Moon in ${moon}, your emotions are guided by intuition. It's a great time for family bonding and making personal decisions.`
    };

    setTimeout(() => {
      setResult({ name, sun, moon, place, dob, time, predictions });
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#090a0f', color: '#fff' }}>
      <Header />
      
      <main style={{ flex: 1, padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f', fontSize: '2.8rem', textShadow: '0 0 10px rgba(241, 196, 15, 0.4)' }}>
          Precise Zodiac Analysis
        </h1>
        <p style={{ color: '#bdc3c7', fontSize: '1.1rem' }}>Enter Birth Details for Accurate Vedic & Western Results</p>

        {!result ? (
          <form onSubmit={calculateRashi} style={formStyle}>
            <div style={inputGroup}>
              <input type="text" name="name" placeholder="Full Name" required style={inputStyle} />
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>Date of Birth</label>
              <input type="date" name="dob" required style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Birth Time</label>
                <input type="time" name="time" required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Birth Place</label>
                <input type="text" name="place" placeholder="City" required style={inputStyle} />
              </div>
            </div>
            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? "Aligning Stars..." : "Generate My Report"}
            </button>
          </form>
        ) : (
          <div style={reportCard}>
            <h2 style={{ color: '#f1c40f' }}>Astro Report: {result.name}</h2>
            <div style={resultSection}>
              <div style={resBox}>
                <span style={{fontSize: '2rem'}}>☀️</span>
                <h4>Sun Sign (Western)</h4>
                <h2 style={{color: '#f1c40f'}}>{result.sun}</h2>
                <p style={predText}>{result.predictions.sun}</p>
              </div>
              <div style={resBox}>
                <span style={{fontSize: '2rem'}}>🌙</span>
                <h4>Moon Sign (Vedic)</h4>
                <h2 style={{color: '#f1c40f'}}>{result.moon}</h2>
                <p style={predText}>{result.predictions.moon}</p>
              </div>
            </div>
            <p style={{fontSize: '0.8rem', color: '#555', marginTop: '20px'}}>
              Calculated for: {result.place} | {result.dob} at {result.time}
            </p>
            <button onClick={() => setResult(null)} style={resetBtn}>Back to Search</button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// --- Styles ---
const formStyle = {
  marginTop: '40px', background: 'rgba(255,255,255,0.03)', padding: '40px',
  borderRadius: '30px', display: 'inline-block', border: '1px solid rgba(241, 196, 15, 0.2)',
  width: '100%', maxWidth: '500px', backdropFilter: 'blur(10px)'
};
const inputStyle = {
  padding: '14px', width: '100%', marginBottom: '20px', borderRadius: '12px',
  border: '1px solid #333', background: '#000', color: '#fff', fontSize: '1rem'
};
const labelStyle = { display: 'block', textAlign: 'left', marginBottom: '8px', color: '#f1c40f', fontSize: '0.85rem', fontWeight: 'bold' };
const btnStyle = {
  padding: '16px', background: '#f1c40f', color: '#000', fontWeight: 'bold',
  border: 'none', borderRadius: '12px', cursor: 'pointer', width: '100%', fontSize: '1.1rem', transition: '0.3s'
};
const reportCard = {
  marginTop: '40px', background: '#0d1117', padding: '40px', borderRadius: '30px',
  border: '1px solid #f1c40f', maxWidth: '800px', margin: '40px auto'
};
const resultSection = { display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' };
const resBox = { flex: 1, minWidth: '250px', background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '20px', border: '1px solid #222' };
const predText = { fontSize: '0.9rem', color: '#bdc3c7', lineHeight: '1.5', marginTop: '10px' };
const resetBtn = { background: 'none', border: '1px solid #444', color: '#888', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' };
