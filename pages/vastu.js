import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Vastu() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const zones = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
  const items = ["None", "Main Entrance", "Kitchen", "Toilet", "Master Bedroom", "Pooja Room"];

  const [selections, setSelections] = useState(
    zones.reduce((acc, zone) => ({ ...acc, [zone]: "None" }), {})
  );

  const handleAiAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: selections }),
      });
      const result = await response.json();
      setReport(result.analysis);
    } catch (error) {
      alert("AI Analysis Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#090a0f', color: '#fff', minHeight: '100vh' }}>
      <Header />
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f' }}>Vastu AI Expert</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {zones.map(zone => (
            <div key={zone} style={{ background: '#111', padding: '15px', borderRadius: '10px' }}>
              <label>{zone}</label>
              <select 
                value={selections[zone]} 
                onChange={(e) => setSelections({...selections, [zone]: e.target.value})}
                style={{ width: '100%', marginTop: '10px', padding: '5px' }}
              >
                {items.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px' }}>
          <button 
            onClick={handleAiAnalysis} 
            disabled={loading}
            style={{ padding: '15px 30px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            {loading ? "Gemini is Thinking..." : "Get AI Expert Advice"}
          </button>
        </div>

        {report && (
          <div style={{ marginTop: '30px', padding: '20px', background: '#1a1d23', border: '1px solid #4CAF50', textAlign: 'left' }}>
            <h3 style={{ color: '#4CAF50' }}>AI Insights:</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{report}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
