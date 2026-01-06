import Link from 'next/link';

export default function Header() {
  return (
    <nav style={{
      width: '100%',
      padding: '15px 0',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(241, 196, 15, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      gap: '20px'
    }}>
      <Link href="/" style={navLinkStyle}>হোম</Link>
      <Link href="/rashi" style={navLinkStyle}>রাশিফল</Link>
      <Link href="/palmistry" style={navLinkStyle}>হস্তরেখা</Link>
      <Link href="/vastu" style={navLinkStyle}>বাস্তু</Link>
      <Link href="/match" style={navLinkStyle}>যোটক</Link>
    </nav>
  );
}

const navLinkStyle = {
  color: '#f1c40f',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '600',
  transition: '0.3s'
};
