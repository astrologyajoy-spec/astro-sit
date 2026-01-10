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

  const getDetailedFeedback = (zone, item) => {
    const db = {
      "North-East": {
        "Toilet": { status: "Fatal Defect", score: -40, effect: "Severe brain-related issues.", remedy: "Immediate relocation is mandatory." },
        "Kitchen": { status: "Major Defect", score: -25, effect: "Fire in the Water zone.", remedy: "Paint kitchen lemon yellow." }
      },
      "South-East": {
        "Kitchen": { status: "Excellent", score: 20, effect: "Agni Zone. Good health.", remedy: "Use red colors." }
      }
    };
    return db[zone]?.[item] || null;
  };

  const analyzeVastu = () => {
    let finalAnalysis = [];
    let totalScore = 100;
    zones.forEach(zone => {
      selections[zone].forEach(item => {
        const feedback = getDetailedFeedback(zone, item);
        if (feedback) {
          finalAnalysis.push({ zone, item, ...feedback });
          totalScore += feedback.score;
        }
      });
    });
    setReport({ score: Math.max(0, Math.min(totalScore, 100)), analysis: finalAnalysis, aiResult: null });
  };

  // --- Gemini AI Function ---
  const handleAiAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: selections }),
      });
      const result = await response.json();
      setReport(prev => ({ ...prev, aiResult: result.analysis }));
    } catch (error) {
      alert("AI Analysis failed. Check API route.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#090a0f', color: '#fff' }}>
      <Header />
      <main style={{ flex: 1, padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f', fontSize: '2.5rem', fontWeight: 'bold' }}>Professional 16-Zone Vastu Analyzer</h1>
        
        <div style={gridContainer}>
          {zones.map((zone) => (
            <div key={zone} style={zoneCardStyle}>
              <h4 style={{ color: '#f1c40f', textAlign: 'left', marginBottom: '10px' }}>{zone}</h4>
              {selections[zone].map((item, idx) => (
                <select key={idx} value={item} onChange={(e) => handleItemChange(zone, idx, e.target.value)} style={selectStyle}>
                  {items.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              ))}
              <button onClick={() => handleAddField(zone)} style={addBtnStyle}>+ Add More Item</button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '50px' }}>
          <button onClick={analyzeVastu} style={submitBtnStyle}>Calculate Basic Score</button>
          <button 
            onClick={handleAiAnalysis} 
            disabled={loading}
            style={{ ...submitBtnStyle, background: loading ? '#666' : '#4CAF50', marginLeft: '10px' }}
          >
            {loading ? "Asking Gemini..." : "Get AI Expert Opinion"}
          </button>
        </div>

        {report && (
          <div style={reportContainer}>
            <h2 style={{ color: '#f1c40f' }}>Vastu Diagnostic Report</h2>
            <div style={{ fontSize: '1.8rem', margin: '20px 0' }}>Score: {report.score}/100</div>
            
            {report.aiResult && (
              <div style={aiBoxStyle}>
                <h3 style={{ color: '#4CAF50' }}>Gemini AI Insights:</h3>
                <p style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{report.aiResult}</p>
              </div>
            )}

            <div style={{ textAlign: 'left', marginTop: '30px' }}>
              {report.analysis.map((res, i) => (
                <div key={i} style={analysisItem}>
                  <h4 style={{ color: res.score < 0 ? '#ff4757' : '#2ed573' }}>{res.item} in {res.zone}</h4>
                  <p><b>Impact:</b> {res.effect}</p>
                  <p style={{ color: '#f1c40f' }}><b>Remedy:</b> {res.remedy}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// --- CSS Styles ---
const gridContainer = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', maxWidth: '1200px', margin: '0 auto' };
const zoneCardStyle = { background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #333' };
const selectStyle = { width: '100%', padding: '12px', background: '#000', color: '#fff', marginBottom: '10px', borderRadius: '5px' };
const addBtnStyle = { background: 'none', border: '1px dashed #f1c40f', color: '#f1c40f', cursor: 'pointer', fontSize: '0.8rem' };
const submitBtnStyle = { padding: '18px 40px', background: '#f1c40f', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '12px', cursor: 'pointer' };
const reportContainer = { marginTop: '50px', background: '#0d1117', padding: '40px', borderRadius: '25px', border: '2px solid #f1c40f', maxWidth: '900px', margin: '50px auto' };
const aiBoxStyle = { background: '#1a1d23', padding: '20px', borderRadius: '15px', border: '1px solid #4CAF50', marginTop: '20px' };
const analysisItem = { padding: '15px', borderBottom: '1px solid #222' };
