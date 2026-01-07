import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Vastu() {
  const [report, setReport] = useState(null);
  
  // ৯টি জোনের জন্য স্টেট (North-West to South-East)
  const [grid, setGrid] = useState(Array(9).fill("Empty"));

  const zones = [
    "North-West", "North", "North-East",
    "West", "Center (Brahmasthan)", "East",
    "South-West", "South", "South-East"
  ];

  const items = ["Empty", "Kitchen", "Toilet", "Master Bedroom", "Pooja Room", "Living Room", "Staircase", "Main Entrance"];

  const handleSelect = (index, value) => {
    const newGrid = [...grid];
    newGrid[index] = value;
    setGrid(newGrid);
  };

  const analyzeGridVastu = () => {
    let suggestions = [];
    let score = 100;

    // কিছু গুরুত্বপূর্ণ বাস্তু লজিক
    if (grid[2] !== "Pooja Room" && grid[2] !== "Empty") {
      suggestions.push("⚠️ North-East (Ishanya): Best for Pooja Room. Avoid Toilet/Kitchen here.");
      score -= 15;
    }
    if (grid[8] !== "Kitchen" && grid[8] !== "Empty") {
      suggestions.push("⚠️ South-East (Agneya): Ideal for Kitchen (Fire zone).");
      score -= 15;
    }
    if (grid[6] !== "Master Bedroom" && grid[6] !== "Empty") {
      suggestions.push("⚠️ South-West (Nairutya): Best for Master Bedroom or heavy items.");
      score -= 15;
    }
    if (grid[1] === "Toilet" || grid[4] === "Toilet") {
      suggestions.push("❌ Center or North: Toilet here can cause health or financial blockages.");
      score -= 20;
    }

    if (suggestions.length === 0) suggestions.push("✅ Your basic layout looks Vastu compliant!");

    setReport({ score, suggestions });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#090a0f', color: '#fff' }}>
      <Header />
      
      <main style={{ flex: 1, padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f' }}>Interactive Vastu Grid Analysis</h1>
        <p style={{ color: '#bdc3c7', marginBottom: '30px' }}>Select items in each direction of your home layout</p>

        

        {/* ৩x৩ বর্গাকার গ্রিড */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          maxWidth: '500px',
          margin: '0 auto',
          background: '#222',
          padding: '15px',
          borderRadius: '15px',
          border: '2px solid #f1c40f'
        }}>
          {grid.map((cell, index) => (
            <div key={index} style={{
              background: '#000',
              padding: '10px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}>
              <span style={{ fontSize: '0.7rem', color: '#f1c40f' }}>{zones[index]}</span>
              <select 
                onChange={(e) => handleSelect(index, e.target.value)}
                style={{ background: '#111', color: '#fff', border: '1px solid #444', fontSize: '0.8rem', padding: '5px' }}
              >
                {items.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button onClick={analyzeGridVastu} style={{
          marginTop: '30px', padding: '15px 40px', background: '#f1c40f', 
          color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer'
        }}>Analyze Layout</button>

        {report && (
          <div style={{ marginTop: '40px', background: 'rgba(241, 196, 15, 0.1)', padding: '30px', borderRadius: '20px', border: '1px solid #f1c40f', maxWidth: '600px', margin: '30px auto' }}>
            <h2>Vastu Score: {report.score}/100</h2>
            <div style={{ textAlign: 'left', marginTop: '20px' }}>
              {report.suggestions.map((s, i) => <p key={i} style={{ marginBottom: '10px' }}>{s}</p>)}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
