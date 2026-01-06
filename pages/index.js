import Link from 'next/link';

export default function Home() {
  const menuItems = [
    { name: "Rashifal (Daily)", link: "/rashi", icon: "🌌" },
    { name: "Hasto Rekha (AI)", link: "/palmistry", icon: "✋" },
    { name: "Vastu Shastro", link: "/vastu", icon: "🏠" },
    { name: "Match Making", link: "/match", icon: "💑" },
    { name: "Numerology", link: "/numerology", icon: "🔢" },
  ];

  return (
    <div style={{
      background: 'radial-gradient(circle at center, #1b2735 0%, #090a0f 100%)',
      color: '#fff', minHeight: '100vh', fontFamily: "'Poppins', sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px'
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: '#f1c40f', textShadow: '0 0 10px rgba(241, 196, 15, 0.5)' }}>
          ASTRO AI GURU
        </h1>
        <p style={{ color: '#bdc3c7', fontSize: '1.1rem' }}>Sothik Bhobisyot, Proti Muhurte</p>
      </header>

      {/* Modern Menu Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '800px',
        padding: '20px'
      }}>
        {menuItems.map((item, index) => (
          <Link href={item.link} key={index} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              padding: '30px 20px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: '0.3s transform',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontWeight: '600', color: '#f1c40f' }}>{item.name}</div>
            </div>
          </Link>
        ))}
      </div>

      <footer style={{ marginTop: 'auto', paddingTop: '40px', color: '#555' }}>
        © 2026 ASTRO AI GURU | Shobar Jonno Sothik Poramorsho
      </footer>
    </div>
  );
}
