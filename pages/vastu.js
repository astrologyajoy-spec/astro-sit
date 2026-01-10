import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Vastu() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const zones = [
    "North", "North-North-East", "North-East", "East-North-East",
    "East", "East-South-East", "South-East", "South-South-East",
    "South", "South-South-West", "South-West", "West-South-West",
    "West", "West-North-West", "North-West", "North-North-West"
  ];

  const items = ["None", "Main Entrance", "Kitchen", "Toilet", "Master Bedroom", "Pooja Room"];

  const [selections, setSelections] = useState(
    zones.reduce((acc, zone) => ({ ...acc, [zone]: "None" }), {})
  );

  // --- AI ফাংশন (এটি return এর বাইরে থাকতে হবে) ---
  const handleAiAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: selections }),
      });
      const result = await response.json();
      setReport(result.analysis || result.result);
    } catch (error) {
      alert("AI Error! Check if package.json has @google/generative-ai");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#090a0f', color: '#fff', minHeight: '100vh' }}>
      <Header />
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f' }}>Vastu AI Analyzer</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {zones.map(zone => (
            <div key={zone} style={{ background: '#111', padding: '15px', borderRadius: '10px', border: '1px solid #333' }}>
              <h4 style={{ color: '#f1c40f' }}>{zone}</h4>
              <select 
                value={selections[zone]} 
                onChange={(e) => setSelections({...selections, [zone]: e.target.value})}
                style={{ width: '100%', padding: '8px', background: '#000', color: '#fff' }}
              >
                {items.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button 
          onClick={handleAiAnalysis} 
          disabled={loading}
          style={{ marginTop: '40px', padding: '15px 40px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? "Gemini is Analyzing..." : "Get AI Vastu Advice"}
        </button>

        {report && (
          <div style={{ marginTop: '30px', padding: '20px', background: '#1a1d23', borderRadius: '10px', border: '1px solid #4CAF50', textAlign: 'left' }}>
            <h3 style={{ color: '#4CAF50' }}>AI Expert Report:</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{report}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
