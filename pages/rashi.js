import { useState } from 'react';
import Link from 'next/link';

export default function Rashifal() {
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const dob = e.target.dob.value;
    // Logic for rashi (agei jeta chhilo oitai thakbe)
    setResult({ name, rashi: "Karkat (Cancer)" }); // Example result
  };

  return (
    <div style={{ background: '#090a0f', color: '#fff', minHeight: '100vh', padding: '40px', textAlign: 'center' }}>
      <Link href="/"><button style={{ color: '#f1c40f', background: 'none', border: '1px solid #f1c40f', padding: '10px', cursor: 'pointer', borderRadius: '8px' }}>← Back to Menu</button></Link>
      <h1 style={{ marginTop: '20px' }}>Daily Rashifal Check</h1>
      
      {!result ? (
        <form onSubmit={calculate} style={{ marginTop: '30px' }}>
          <input type="text" name="name" placeholder="Nam" required style={{ padding: '10px', margin: '10px' }} /><br/>
          <input type="date" name="dob" required style={{ padding: '10px', margin: '10px' }} /><br/>
          <button type="submit" style={{ background: '#f1c40f', padding: '10px 20px', border: 'none', fontWeight: 'bold' }}>Check Rashi</button>
        </form>
      ) : (
        <div style={{ marginTop: '30px', border: '1px solid #f1c40f', padding: '20px', borderRadius: '15px' }}>
          <h2>{result.name}, Apnar Rashi: {result.rashi}</h2>
          <p>Ajker din-ti apnar jonno shuvo!</p>
        </div>
      )}
    </div>
  );
}
