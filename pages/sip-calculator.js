import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function SIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [annualRate, setAnnualRate] = useState(12);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState(null);

    const calculateSIP = () => {
        const P = parseFloat(monthlyInvestment);
        const i = (parseFloat(annualRate) / 100) / 12;
        const n = parseFloat(years) * 12;

        const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const investedAmount = P * n;
        const estimatedReturns = totalValue - investedAmount;

        setResult({
            invested: Math.round(investedAmount).toLocaleString('en-IN'),
            returns: Math.round(estimatedReturns).toLocaleString('en-IN'),
            total: Math.round(totalValue).toLocaleString('en-IN')
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '500px', margin: 'auto' }}>
            <Head>
                <title>SIP Calculator - Astro AI</title>
            </Head>
            <h2 style={{textAlign: 'center'}}>SIP ক্যালকুলেটর 📈</h2>
            
            <div style={{marginBottom: '15px'}}>
                <label>মাসিক বিনিয়োগ (টাকা): </label>
                <input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} style={{width: '100%', padding: '10px'}} />
            </div>

            <div style={{marginBottom: '15px'}}>
                <label>বার্ষিক রিটার্ন (%): </label>
                <input type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} style={{width: '100%', padding: '10px'}} />
            </div>

            <div style={{marginBottom: '15px'}}>
                <label>সময়কাল (বছর): </label>
                <input type="number" value={years} onChange={(e) => setYears(e.target.value)} style={{width: '100%', padding: '10px'}} />
            </div>

            <button onClick={calculateSIP} style={{width: '100%', padding: '15px', backgroundColor: '#27ae60', color: 'white', border: 'none', cursor: 'pointer'}}>হিসাব করুন</button>

            {result && (
                <div style={{marginTop: '20px', background: '#e8f5e9', padding: '15px', borderRadius: '8px'}}>
                    <p>মোট বিনিয়োগ: <b>₹{result.invested}</b></p>
                    <p>আনুমানিক লাভ: <b>₹{result.returns}</b></p>
                    <p>মোট মূল্য: <b>₹{result.total}</b></p>
                </div>
            )}
        </div>
    );
}
