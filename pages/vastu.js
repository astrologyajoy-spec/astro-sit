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
    setReport(null);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: selections }),
      });
      const result = await response.json();
      if (result.analysis) {
        setReport(result.analysis);
      } else {
        alert("AI could not generate a report. Check API.");
      }
    } catch (error) {
      alert("Connection Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#090a0f', color: '#fff', minHeight: '100vh' }}>
      <Header />
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f' }}>Vastu AI Expert</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
          {zones.map(zone => (
            <div key={zone} style={{ background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #333' }}>
              <label>{zone}</label>
              <select 
                value={selections[zone]} 
                onChange={(e) => setSelections({...selections, [zone]: e.target.value})}
                style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#000', color: '#fff', borderRadius: '5px' }}
              >
                {items.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button 
          onClick={handleAiAnalysis} 
          disabled={loading}
          style={{ marginTop: '50px', padding: '15px 40px', background: loading ? '#666' : '#4CAF50', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? "Gemini is Thinking..." : "Get AI Expert Advice"}
        </button>

        {report && (
          <div style={{ marginTop: '40px', padding: '30px', background: '#1a1d23', border: '2px solid #4CAF50', textAlign: 'left', borderRadius: '15px', maxWidth: '800px', margin: '40px auto' }}>
            <h3 style={{ color: '#4CAF50' }}>AI Vastu Diagnostic Report:</h3>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{report}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
