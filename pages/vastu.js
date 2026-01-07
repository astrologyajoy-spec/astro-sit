import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Vastu() {
  const [report, setReport] = useState(null);

  // ১৬টি জোনের লিস্ট (Advanced Vastu Zones)
  const zones = [
    "North", "North-North-East", "North-East", "East-North-East",
    "East", "East-South-East", "South-East", "South-South-East",
    "South", "South-South-West", "South-West", "West-South-West",
    "West", "West-North-West", "North-West", "North-North-West"
  ];

  const items = [
    "None", "Main Entrance", "Kitchen", "Master Bedroom", "Children Room", 
    "Guest Room", "Toilet", "Pooja Room", "Living Room", "Dining Area", 
    "Staircase", "Septic Tank", "Safe/Locker", "Balcony", "Garden"
  ];

  // প্রতিটি জোনের জন্য আলাদা স্টেট (Object আকারে)
  const [selections, setSelections] = useState(
    zones.reduce((acc, zone) => ({ ...acc, [zone]: ["None"] }), {})
  );

  const handleAddField = (zone) => {
    setSelections({
      ...selections,
      [zone]: [...selections[zone], "None"]
    });
  };

  const handleItemChange = (zone, index, value) => {
    const updatedZone = [...selections[zone]];
    updatedZone[index] = value;
    setSelections({ ...selections, [zone]: updatedZone });
  };

  const analyzeVastu = () => {
    let suggestions = [];
    let score = 100;

    // Advanced Logic based on Multi-item grid
    if (selections["North-East"].includes("Toilet") || selections["North-East"].includes("Kitchen")) {
      suggestions.push("❌ North-East (Ishanya): Toilet or Kitchen here is a major defect. It blocks positive energy.");
      score -= 30;
    }
    if (selections["South-East"].includes("Kitchen")) {
      suggestions.push("✅ South-East (Agneya): Excellent! Kitchen in the zone of Fire brings prosperity.");
      score += 5;
    }
    if (selections["South-West"].includes("Master Bedroom")) {
      suggestions.push("✅ South-West (Nairutya): Master Bedroom here ensures stability and leadership.");
      score += 5;
    }
    if (selections["North"].includes("Main Entrance")) {
      suggestions.push("✅ North: Entrance here is highly auspicious for wealth (Kuber Zone).");
      score += 5;
    }

    setReport({ score: Math.min(score, 100), suggestions });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#090a0f', color: '#fff' }}>
      <Header />
      
      <main style={{ flex: 1, padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f', fontSize: '2.5rem' }}>Professional 16-Zone Vastu Analyzer</h1>
        <p style={{ color: '#bdc3c7', marginBottom: '40px' }}>Add multiple items for each specific direction of your property</p>

        

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {zones.map((zone) => (
            <div key={zone} style={zoneCardStyle}>
              <h4 style={{ color: '#f1c40f', marginBottom: '10px' }}>{zone}</h4>
              {selections[zone].map((selectedItem, idx) => (
                <select
                  key={idx}
                  value={selectedItem}
                  onChange={(e) => handleItemChange(zone, idx, e.target.value)}
                  style={selectStyle}
                >
                  {items.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
              ))}
              <button onClick={() => handleAddField(zone)} style={addBtnStyle}>+ Add More Item</button>
            </div>
          ))}
        </div>

        <button onClick={analyzeVastu} style={submitBtnStyle}>Calculate Full Vastu Score</button>

        {report && (
          <div style={reportBoxStyle}>
            <h2>Final Vastu Score: {report.score}/100</h2>
            <div style={{ textAlign: 'left', marginTop: '20px' }}>
              {report.suggestions.map((s, i) => <p key={i} style={{ marginBottom: '10px', fontSize: '1.1rem' }}>{s}</p>)}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// --- Styles ---
const zoneCardStyle = {
  background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '15px',
  border: '1px solid #333', textAlign: 'left'
};
const selectStyle = {
  width: '100%', padding: '10px', borderRadius: '5px', background: '#000', 
  color: '#fff', border: '1px solid #444', marginBottom: '10px'
};
const addBtnStyle = {
  background: 'none', border: '1px dashed #f1c40f', color: '#f1c40f', 
  padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem'
};
const submitBtnStyle = {
  marginTop: '50px', padding: '18px 60px', background: '#f1c40f', 
  color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '12px', 
  cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 0 20px rgba(241,196,15,0.3)'
};
const reportBoxStyle = {
  marginTop: '40px', background: '#111', padding: '30px', borderRadius: '25px', 
  border: '2px solid #f1c40f', maxWidth: '800px', margin: '40px auto'
};
