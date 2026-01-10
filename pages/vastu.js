import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Vastu() {
  const [report, setReport] = useState(null);

  // আপনার ইমেজ অনুযায়ী ১৬টি প্রফেশনাল জোন
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

  // --- বিশাল বাস্তু ডাটাবেস লজিক ---
  const getDetailedFeedback = (zone, item) => {
    const db = {
      "North-East": {
        "Toilet": { status: "Fatal Defect", score: -40, effect: "Severe brain-related issues, neurological disorders, and total financial bankruptcy. This is the head of the Vastu Purusha; a toilet here is like poison.", remedy: "Immediate relocation is mandatory. No temporary remedy works for NE Toilet." },
        "Kitchen": { status: "Major Defect", score: -25, effect: "Fire in the Water zone. Causes extreme short-tempered behavior and health issues for the eldest son.", remedy: "Paint the kitchen lemon yellow and keep a yellow marble under the stove." },
        "Pooja Room": { status: "Excellent", score: 20, effect: "Best location for spirituality. Brings divine blessings, mental clarity, and peace.", remedy: "Light an oil lamp and keep the area silent." }
      },
      "South-East": {
        "Kitchen": { status: "Excellent", score: 20, effect: "Agni Zone. Ensures great health for women, steady cash flow, and vitality for the family.", remedy: "Use red or orange colors in the kitchen decor." },
        "Toilet": { status: "Major Defect", score: -25, effect: "Blocks cash liquidity and creates legal problems. It also delays marriage and childbirth.", remedy: "Apply red tape or copper strips around the toilet seat." }
      },
      "South-West": {
        "Master Bedroom": { status: "Excellent", score: 25, effect: "Stability Zone. Ensures the head of the family is in command and financially secure.", remedy: "Use heavy wooden beds and avoid blue colors here." },
        "Toilet": { status: "Fatal Defect", score: -35, effect: "Causes severe relationship instability and lack of support from ancestors or society.", remedy: "Use yellow tape or brass strips around the toilet pot." },
        "Septic Tank": { status: "Severe Defect", score: -30, effect: "Directly leads to business failure and deep family disputes.", remedy: "Must be relocated to North-West or West." }
      },
      "North": {
        "Main Entrance": { status: "Very Auspicious", score: 20, effect: "Kuber's gateway. Brings massive wealth, new business opportunities, and career growth.", remedy: "Decorate the door with green items." },
        "Toilet": { status: "Major Defect", score: -20, effect: "Flushes away money and blocks new opportunities. Causes lung and respiratory issues.", remedy: "Use blue tape or aluminum strips around the pot." }
      },
      "West": {
        "Locker/Safe": { status: "Excellent", score: 15, effect: "Zone of Gains. Ensures that your savings remain stable and grow consistently.", remedy: "The locker should open towards the North." },
        "Toilet": { status: "Acceptable", score: 0, effect: "This is a safe zone for disposal according to advanced Vastu.", remedy: "Keep the area very clean." }
      },
      "North-West": {
        "Septic Tank": { status: "Perfect", score: 15, effect: "Best zone for disposal. Helps in letting go of negative emotions and toxins.", remedy: "Clean the tank regularly." },
        "Guest Room": { status: "Good", score: 10, effect: "Helps guests feel comfortable but also ensures they don't overstay.", remedy: "Use white or cream shades." }
      }
      // এভাবেই আপনি ১৬টি জোনের ডাটা এই অবজেক্টের ভেতর বাড়াতে পারবেন।
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

    setReport({ score: Math.max(0, Math.min(totalScore, 100)), analysis: finalAnalysis });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#090a0f', color: '#fff' }}>
      <Header />
      <main style={{ flex: 1, padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f', fontSize: '2.5rem', fontWeight: 'bold' }}>Professional 16-Zone Vastu Analyzer</h1>
        <p style={{ color: '#bdc3c7', marginBottom: '40px' }}>Add multiple items for each specific direction of your property</p>

        {/* গ্রিড ডিজাইন যা আপনার ইমেজের সাথে মিলবে */}
        <div style={gridContainer}>
          {zones.map((zone) => (
            <div key={zone} style={zoneCardStyle}>
              <h4 style={{ color: '#f1c40f', textAlign: 'left', marginBottom: '10px', fontSize: '0.9rem' }}>{zone}</h4>
              {selections[zone].map((item, idx) => (
                <select key={idx} value={item} onChange={(e) => handleItemChange(zone, idx, e.target.value)} style={selectStyle}>
                  {items.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              ))}
              <button onClick={() => handleAddField(zone)} style={addBtnStyle}>+ Add More Item</button>
            </div>
          ))}
        </div>

        <button onClick={analyzeVastu} style={submitBtnStyle}>Calculate Full Vastu Score</button>
// ... আগের analyzeVastu ফাংশন ...
  const analyzeVastu = () => {
    // ... আপনার বিদ্যমান কোড ...
    setReport({ score: Math.max(0, Math.min(totalScore, 100)), analysis: finalAnalysis });
  };

  // --- এখানে নতুন AI ফাংশনটি যোগ করুন ---
  const handleAiAnalysis = async () => {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: selections }), // selections হচ্ছে আপনার বর্তমান ডাটা
    });
    const result = await response.json();
    alert(result.analysis); 
  };
        {report && (
          <div style={reportContainer}>
            <h2 style={{ color: '#f1c40f', borderBottom: '2px solid #f1c40f', paddingBottom: '10px' }}>Deep Diagnostic Report</h2>
            <div style={{ fontSize: '1.8rem', margin: '20px 0' }}>Compliance Score: {report.score}/100</div>
            
            <div style={{ textAlign: 'left' }}>
              {report.analysis.length > 0 ? report.analysis.map((res, i) => (
                <div key={i} style={analysisItem}>
                  <h3 style={{ color: res.score < 0 ? '#ff4757' : '#2ed573' }}>{res.item} in {res.zone} — {res.status}</h3>
                  <p style={{ marginTop: '10px' }}><b>Impact:</b> {res.effect}</p>
                  <p style={{ marginTop: '10px', color: '#f1c40f', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '5px' }}>
                    <b>Expert Remedy:</b> {res.remedy}
                  </p>
                </div>
              )) : <p>Your basic structure seems to follow core Vastu principles.</p>}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// --- Styles (ইমেজ অনুযায়ী) ---
const gridContainer = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
  gap: '15px', 
  maxWidth: '1200px', 
  margin: '0 auto' 
};

const zoneCardStyle = { 
  background: '#111', 
  padding: '20px', 
  borderRadius: '15px', 
  border: '1px solid #333', 
  textAlign: 'left' 
};

const selectStyle = { 
  width: '100%', 
  padding: '12px', 
  background: '#000', 
  color: '#fff', 
  border: '1px solid #444', 
  marginBottom: '10px', 
  borderRadius: '5px' 
};

const addBtnStyle = { 
  background: 'none', 
  border: '1px dashed #f1c40f', 
  color: '#f1c40f', 
  fontSize: '0.75rem', 
  padding: '5px 10px', 
  cursor: 'pointer' 
};

const submitBtnStyle = { 
  marginTop: '50px', 
  padding: '18px 60px', 
  background: '#f1c40f', 
  color: '#000', 
  fontWeight: 'bold', 
  border: 'none', 
  borderRadius: '12px', 
  cursor: 'pointer', 
  fontSize: '1.2rem',
  boxShadow: '0 5px 15px rgba(241, 196, 15, 0.3)'
};

const reportContainer = { 
  marginTop: '50px', 
  background: '#0d1117', 
  padding: '40px', 
  borderRadius: '25px', 
  border: '2px solid #f1c40f', 
  maxWidth: '900px', 
  margin: '50px auto' 
};

const analysisItem = { 
  padding: '20px', 
  borderBottom: '1px solid #222', 
  marginBottom: '10px' 
};
{/* বিদ্যমান ক্যালকুলেট বাটন */}
<button onClick={analyzeVastu} style={submitBtnStyle}>
  Calculate Full Vastu Score
</button>

{/* নতুন AI বাটন (এটি যোগ করুন) */}
<button 
  onClick={handleAiAnalysis} 
  style={{...submitBtnStyle, background: '#4CAF50', marginLeft: '10px'}}
>
  Get AI Expert Opinion
</button>
