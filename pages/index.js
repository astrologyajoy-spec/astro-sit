import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(null);

  const calculateSigns = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const dob = e.target.dob.value;
    const time = e.target.time.value;

    const date = new Date(`${dob}T${time}`);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Standard Sun Sign Logic
    let sunSign = "";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) sunSign = "Aries (Mesh)";
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) sunSign = "Taurus (Vrish)";
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) sunSign = "Gemini (Mithun)";
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) sunSign = "Cancer (Karkat)";
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) sunSign = "Leo (Singha)";
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) sunSign = "Virgo (Kanya)";
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) sunSign = "Libra (Tula)";
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) sunSign = "Scorpio (Vrischika)";
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) sunSign = "Sagittarius (Dhanu)";
    else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) sunSign = "Capricorn (Makara)";
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) sunSign = "Aquarius (Kumbha)";
    else sunSign = "Pisces (Meena)";

    setResult({ name, sunSign, dob, time });
  };

  return (
    <div style={{
      background: 'radial-gradient(circle at center, #1b2735 0%, #090a0f 100%)',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px'
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: '#f1c40f', textShadow: '0 0 10px rgba(241, 196, 15, 0.5)' }}>
          ASTRO AI GURU
        </h1>
        <p style={{ color: '#bdc3c7', fontSize: '1.1rem' }}>Sothik Bhobisyot, Ebar Apnar Hater Muthoy</p>
      </header>

      {/* Main Content */}
      {!result ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          padding: '40px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          width: '100%',
          maxWidth: '450px'
        }}>
          <form onSubmit={calculateSigns}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#f1c40f' }}>Apnar Nam</label>
              <input type="text" name="name" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} placeholder="Ex: Rahul Das" />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#f1c40f' }}>Jonmo Tarikh</label>
              <input type="date" name="dob" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#f1c40f' }}>Jonmo Somoy</label>
              <input type="time" name="time" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <button type="submit" style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(45deg, #f1c40f, #f39c12)',
              color: '#000',
              fontWeight: '700',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: '0.3s transform'
            }}>
              BHAGYO DEKHUN
            </button>
          </form>
        </div>
      ) : (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(15px)',
          padding: '40px',
          borderRadius: '24px',
          border: '2px solid #f1c40f',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <h2 style={{ color: '#f1c40f' }}>Swa-gotom, {result.name}!</h2>
          <div style={{ margin: '30px 0', textAlign: 'left' }}>
            <div style={{ background: 'rgba(241, 196, 15, 0.1)', padding: '15px', borderRadius: '12px', marginBottom: '10px' }}>
              <strong>🌍 Surjo Rashi:</strong> {result.sunSign}
            </div>
            <p style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>*Chandr-o rashi ebong baki folafor gulo 2nd step-e add kora hobe.</p>
          </div>
          <button onClick={() => setResult(null)} style={{ background: 'none', border: '1px solid #fff', color: '#fff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
            Back
          </button>
        </div>
      )}

      {/* Footer Info */}
      <footer style={{ marginTop: 'auto', paddingTop: '40px', color: '#555', fontSize: '0.8rem' }}>
        © 2026 ASTRO AI GURU | Made for the Universe
      </footer>
    </div>
  );
}
