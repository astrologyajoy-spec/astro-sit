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

  const items = [
    "None", "Main Entrance", "Kitchen", "Toilet", "Master Bedroom", "Children Room", 
    "Guest Room", "Pooja Room", "Living Room", "Staircase", "Septic Tank", "Safe/Locker"
  ];

  const [selections, setSelections] = useState(
    zones.reduce((acc, zone) => ({ ...acc, [zone]: ["None"] }), {})
  );

  const handleAddField = (zone) => {
    setSelections({ ...selections, [zone]: [...selections[zone], "None"] });
  };

  const handleItemChange = (zone, index, value) => {
    const updatedZone = [...selections[zone]];
    updatedZone[index] = value;
    setSelections({ ...selections, [zone]: updatedZone });
  };

  const analyzeVastu = () => {
    // Basic Analysis logic
    let totalScore = 100;
    setReport({ score: totalScore, analysis: [], aiResult: null });
  };

  // --- AI ফাংশনটি এখানে থাকবে (Return এর বাইরে) ---
  const handleAiAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: selections }),
      });
      const result = await response.json();
      setReport(prev => ({ ...prev, aiResult: result.result || result.analysis }));
    } catch (error) {
      alert("AI Analysis error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#090a0f', color: '#fff', minHeight: '100vh' }}>
      <Header />
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1>16-Zone Vastu Analyzer</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {zones.map(zone => (
            <div key={zone} style={{ background: '#111', padding: '15px', borderRadius: '10px' }}>
              <h3>{zone}</h3>
              {selections[zone].map((val, i) => (
                <select key={i} value={val} onChange={(e) => handleItemChange(zone, i, e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '5px' }}>
                  {items.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
              ))}
              <button onClick={() => handleAddField(zone)}>+ Add</button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px' }}>
          <button onClick={analyzeVastu} style={{ padding: '15px 30px', background: '#f1c40f', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Calculate Basic Score</button>
          
          {/* AI বাটন */}
          <button onClick={handleAiAnalysis} disabled={loading} style={{ padding: '15px 30px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>
            {loading ? "Asking Gemini..." : "Get AI Expert Opinion"}
          </button>
        </div>

        {report && report.aiResult && (
          <div style={{ marginTop: '30px', padding: '20px', background: '#1a1d23', borderRadius: '10px', textAlign: 'left', border: '1px solid #4CAF50' }}>
            <h2 style={{ color: '#4CAF50' }}>Gemini AI Analysis:</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{report.aiResult}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
