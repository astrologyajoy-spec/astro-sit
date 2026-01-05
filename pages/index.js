export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("আপনার তথ্য পাঠানো হচ্ছে...");
  };
  return (
    <div style={{ textAlign: 'center', padding: '50px', background: '#1a1a2e', color: 'white', minHeight: '100vh' }}>
      <h1>ভাগ্য গণনা ২০২৬</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="আপনার নাম" style={{ padding: '10px', margin: '5px' }} /><br/>
        <input type="date" style={{ padding: '10px', margin: '5px' }} /><br/>
        <button type="submit" style={{ padding: '10px 20px', background: '#e94560', border: 'none', color: 'white' }}>ফলাফল দেখুন</button>
      </form>
    </div>
  );
}
