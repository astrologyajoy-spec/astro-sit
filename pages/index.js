import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header'; // হেডার ইনক্লুড করা হলো
import Footer from '../components/Footer'; // ফুটার ইনক্লুড করা হলো

export default function Home() {
  // মেনু আইটেম লিস্ট
  const menuItems = [
    { name: "দৈনিক রাশিফল", link: "/rashi", icon: "🌌" },
    { name: "হস্তরেখা বিচার (AI)", link: "/palmistry", icon: "✋" },
    { name: "বাস্তু বিশ্লেষণ", link: "/vastu", icon: "🏠" },
    { name: "যোটক বিচার", link: "/match", icon: "💑" },
    { name: "সংখ্যাতত্ত্ব", link: "/numerology", icon: "🔢" },
  ];

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at center, #1b2735 0%, #090a0f 100%)',
      color: '#fff',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* ১. হেডার কম্পোনেন্ট */}
      <Header />

      {/* ২. মেইন কন্টেন্ট সেকশন */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            color: '#f1c40f', 
            textShadow: '0 0 15px rgba(241, 196, 15, 0.6)',
            marginBottom: '10px' 
          }}>
            ASTRO AI GURU
          </h1>
          <p style={{ color: '#bdc3c7', fontSize: '1.2rem', letterSpacing: '1px' }}>
            ভবিষ্যতের সঠিক পথ দেখাবে কৃত্রিম বুদ্ধিমত্তা
          </p>
        </header>

        {/* সার্ভিস মেনু গ্রিড */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '25px',
          width: '100%',
          maxWidth: '900px',
          padding: '20px'
        }}>
          {menuItems.map((item, index) => (
            <Link href={item.link} key={index} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(12px)',
                padding: '35px 20px',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.border = '1px solid #f1c40f';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
              }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{item.icon}</div>
                <div style={{ fontWeight: '600', color: '#f1c40f', fontSize: '1.1rem' }}>{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* ৩. ফুটার কম্পোনেন্ট */}
      <Footer />
    </div>
  );
}
