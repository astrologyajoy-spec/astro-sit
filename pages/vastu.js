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
      if (response.ok && result.analysis) {
        setReport(result.analysis);
      } else {
        alert(result.error || "এআই রিপোর্ট তৈরি করতে পারেনি।");
      }
    } catch (error) {
      alert("সার্ভারের সাথে যোগাযোগ করা সম্ভব হচ্ছে না!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#090a0f', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header />
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#f1c40f' }}>Vastu AI Expert (Bengali)</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
          {zones.map(zone => (
            <div key={zone} style={{ background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #333' }}>
              <label style={{ fontWeight: 'bold' }}>{zone}</label>
              <select 
                value={selections[zone]} 
                onChange={(e) => setSelections({...selections, [zone]: e.target.value})}
                style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#000', color: '#fff', borderRadius: '5px' }}
              >
                {items.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button 
          onClick={handleAiAnalysis} 
          disabled={loading}
          style={{ marginTop: '50px', padding: '15px 40px', background: loading ? '#555' : '#4CAF50', color: '#fff', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? "AI বিশ্লেষণ করছে..." : "ফ্রি বাস্তু রিপোর্ট পান"}
        </button>
        {report && (
          <div style={{ marginTop: '40px', padding: '30px', background: '#1a1d23', border: '2px solid #4CAF50', borderRadius: '15px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
            <h3 style={{ color: '#4CAF50' }}>আপনার বাস্তু রিপোর্ট:</h3>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', marginTop: '20px' }}>{report}</div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
