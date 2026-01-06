import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Vastu() {
  const [report, setReport] = useState(null);

  const analyzeVastu = (e) => {
    e.preventDefault();
    const entrance = e.target.entrance.value;
    const kitchen = e.target.kitchen.value;
    const bedroom = e.target.bedroom.value;

    // Vastu Logic Simulation
    let score = 0;
    let suggestions = [];

    if (entrance === "North" || entrance === "East") {
      score += 35;
      suggestions.push("✅ Entrance is in a very auspicious direction.");
    } else {
      suggestions.push("❌ Main entrance could be better in North or East.");
    }

    if (kitchen === "South-East") {
      score += 35;
      suggestions.push("✅ Kitchen is perfectly placed in the Fire zone.");
    } else {
      suggestions.push("❌ Kitchen in " + kitchen + " may cause health or financial issues.");
    }

    if (bedroom === "South-West") {
      score += 30;
      suggestions.push("✅ Master Bedroom is in the correct stability zone.");
    } else {
      suggestions.push("❌ Consider moving the Master Bedroom to the South-West.");
    }

    setReport({ score, suggestions });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#090a0f', color: '#fff' }}>
      <Header />
      
      <main style={{ flex: 1, padding: '50px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f', fontSize: '2.5rem' }}>AI Vastu Consultant</h1>
        <p style={{ color: '#bdc3c7' }}>Check the energy flow of your home instantly</p>

        

        <form onSubmit={analyzeVastu} style={formStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>Main Entrance Direction:</label>
            <select name="entrance" style={selectStyle}>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
              <option>North-East</option>
            </select>
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Kitchen Location:</label>
            <select name="kitchen" style={selectStyle}>
              <option>South-East</option>
              <option>North-West</option>
              <option>North-East</option>
              <option>South-West</option>
            </select>
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Master Bedroom Location:</label>
            <select name="bedroom" style={selectStyle}>
              <option>South-West</option>
              <option>North-East</option>
              <option>South-East</option>
              <option>North-West</option>
            </select>
          </div>

          <button type="submit" style={btnStyle}>Analyze My Home</button>
        </form>

        {report && (
          <div style={reportBox}>
            <h2 style={{ color: '#f1c40f' }}>Vastu Compliance Score: {report.score}%</h2>
            <div style={{ textAlign: 'left', marginTop: '20px' }}>
              {report.suggestions.map((s, i) => (
                <p key={i} style={{ marginBottom: '10px' }}>{s}</p>
              ))}
            </div>
            <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '20px' }}>
              *This is an AI-generated basic analysis. For serious issues, consult a professional.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Styles
const formStyle = {
  background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '20px',
  display: 'inline-block', width: '100%', maxWidth: '500px', border: '1px solid #333', marginTop: '30px'
};
const inputGroup = { marginBottom: '20px', textAlign: 'left' };
const labelStyle = { display: 'block', marginBottom: '8px', color: '#f1c40f', fontWeight: 'bold' };
const selectStyle = { width: '100%', padding: '12px', borderRadius: '8px', background: '#000', color: '#fff', border: '1px solid #444' };
const btnStyle = { width: '100%', padding: '15px', background: '#f1c40f', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' };
const reportBox = { marginTop: '40px', padding: '30px', border: '2px solid #f1c40f', borderRadius: '20px', maxWidth: '600px', margin: '40px auto', background: '#111' };
