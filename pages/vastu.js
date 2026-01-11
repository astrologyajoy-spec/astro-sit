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
      // শুধুমাত্র সেই দিকগুলো পাঠাবে যেখানে "None" নেই
      const filteredData = Object.fromEntries(
        Object.entries(selections).filter(([_, value]) => value !== "None")
      );

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: filteredData }), // ফিল্টার করা ডেটা পাঠানো হচ্ছে
      });

      const result = await response.json();
      if (result.analysis) {
        setReport(result.analysis);
      } else {
        alert("AI রিপোর্ট তৈরি করতে পারেনি। দয়া করে API Key চেক করুন।");
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
        <p>আপনার বাড়ির কোন দিকে কী আছে সিলেক্ট করুন</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
          {zones.map(zone => (
            <div key={zone} style={{ background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #333' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>{zone}</label>
              <select 
                value={selections[zone]} 
                onChange={(e) => setSelections({...selections, [zone]: e.target.value})}
                style={{ width: '100%', padding: '10px', background: '#000', color: '#fff', borderRadius: '5px', border: '1px solid #444' }}
              >
                {items.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button 
          onClick={handleAiAnalysis} 
          disabled={loading}
          style={{ 
            marginTop: '50px', 
            padding: '15px 40px', 
            background: loading ? '#555' : '#4CAF50', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '10px', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            fontWeight: 'bold',
            fontSize: '18px',
            transition: '0.3s'
          }}
        >
          {loading ? "AI বিশ্লেষণ করছে..." : "ফ্রি বাস্তু রিপোর্ট পান"}
        </button>

        {report && (
          <div style={{ 
            marginTop: '40px', 
            padding: '30px', 
            background: '#1a1d23', 
            border: '2px solid #4CAF50', 
            textAlign: 'left', 
            borderRadius: '15px', 
            maxWidth: '800px', 
            margin: '40px auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            <h3 style={{ color: '#4CAF50', borderBottom: '1px solid #4CAF50', paddingBottom: '10px' }}>আপনার বাস্তু রিপোর্ট:</h3>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', marginTop: '20px', fontSize: '16px' }}>
              {report}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
