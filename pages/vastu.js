import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Vastu() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState({
    North: "None", "North-East": "None", East: "None", "South-East": "None",
    South: "None", "South-West": "None", West: "None", "North-West": "None"
  });

  const zones = Object.keys(selections);
  const items = ["None", "Main Entrance", "Kitchen", "Toilet", "Master Bedroom", "Pooja Room"];

  const handleAiAnalysis = async () => {
    setLoading(true);
    setReport(null);
    try {
      const filteredData = Object.fromEntries(
        Object.entries(selections).filter(([_, value]) => value !== "None")
      );

      if (Object.keys(filteredData).length === 0) {
        alert("দয়া করে অন্তত একটি দিক সিলেক্ট করুন!");
        setLoading(false);
        return;
      }

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: filteredData }),
      });

      const result = await response.json();
      if (result.analysis) {
        setReport(result.analysis);
      } else {
        alert(result.error || "রিপোর্ট তৈরি করা যায়নি।");
      }
    } catch (error) {
      alert("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#090a0f', color: '#fff', minHeight: '100vh' }}>
      <Header />
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f' }}>Vastu AI Expert (Bengali)</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {zones.map(zone => (
            <div key={zone} style={{ background: '#111', padding: '20px', borderRadius: '15px' }}>
              <label>{zone}</label>
              <select 
                value={selections[zone]} 
                onChange={(e) => setSelections({...selections, [zone]: e.target.value})}
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              >
                {items.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleAiAnalysis} disabled={loading} style={{ marginTop: '30px', padding: '15px 40px', background: '#4CAF50', color: '#fff', borderRadius: '10px', cursor: 'pointer' }}>
          {loading ? "AI বিশ্লেষণ করছে..." : "ফ্রি বাস্তু রিপোর্ট পান"}
        </button>
        {report && (
          <div style={{ marginTop: '40px', padding: '30px', background: '#1a1d23', border: '1px solid #4CAF50', borderRadius: '15px', textAlign: 'left' }}>
            <h3 style={{ color: '#4CAF50' }}>আপনার বাস্তু রিপোর্ট:</h3>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{report}</div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
