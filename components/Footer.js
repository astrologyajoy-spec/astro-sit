import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      padding: '40px 20px',
      background: 'rgba(10, 10, 42, 0.95)',
      borderTop: '1px solid rgba(241, 196, 15, 0.3)',
      color: '#fff',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        maxWidth: '1000px',
        margin: '0 auto 30px auto',
        gap: '20px'
      }}>
        {/* কুইক লিঙ্ক সেকশন */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: '#f1c40f', marginBottom: '15px' }}>দ্রুত লিঙ্ক</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}><Link href="/rashi" style={footerLinkStyle}>দৈনিক রাশিফল</Link></li>
            <li style={{ marginBottom: '8px' }}><Link href="/palmistry" style={footerLinkStyle}>হস্তরেখা বিচার</Link></li>
            <li style={{ marginBottom: '8px' }}><Link href="/vastu" style={footerLinkStyle}>বাস্তু টিপস</Link></li>
          </ul>
        </div>

        {/* যোগাযোগ সেকশন */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: '#f1c40f', marginBottom: '15px' }}>যোগাযোগ</h4>
          <p style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>ইমেইল: support@astroaiguru.com</p>
          <p style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>স্থান: পশ্চিমবঙ্গ, ভারত</p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        <p style={{ fontSize: '0.8rem', color: '#555' }}>
          © 2026 ASTRO AI GURU | সর্বস্বত্ব সংরক্ষিত। 
          <br/> এটি একটি AI চালিত জ্যোতিষশাস্ত্রীয় প্ল্যাটফর্ম।
        </p>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  color: '#bdc3c7',
  textDecoration: 'none',
  fontSize: '0.9rem',
  transition: '0.3s'
};
