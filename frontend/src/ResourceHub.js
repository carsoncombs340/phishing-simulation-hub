import React from 'react';

function ResourceHub() {
  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <h1>📚 Resource Hub</h1>
      <p style={{ fontSize: '18px', color: '#555' }}>
        Latest articles, videos, infographics, and real-time threat intelligence to help you stay safe.
      </p>

      {/* Articles Section */}
      <h2 style={{ marginTop: '40px' }}>📄 Recent Articles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px' }}>
          <h3>How to Recognize and Avoid Phishing Scams</h3>
          <p>Federal Trade Commission official guide with real examples.</p>
          <a href="https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams" 
             target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8' }}>
            Read Article →
          </a>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px' }}>
          <h3>Avoiding Social Engineering and Phishing Attacks</h3>
          <p>U.S. Cybersecurity & Infrastructure Security Agency (CISA).</p>
          <a href="https://www.cisa.gov/uscert/ncas/tips/ST04-014" 
             target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8' }}>
            Read Article →
          </a>
        </div>

      </div>

      {/* Videos Section */}
      <h2 style={{ marginTop: '40px' }}>🎥 Educational Videos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px' }}>
          <h3>Six Signs of a Phishing Attack</h3>
          <p>Clear breakdown of common phishing red flags.</p>
          <a href="https://www.youtube.com/watch?v=GOaTH25CvmM" 
             target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8' }}>
            Watch Video →
          </a>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px' }}>
          <h3>How To Spot a Phishing Email</h3>
          <p>Short and practical guide with real examples.</p>
          <a href="https://www.youtube.com/watch?v=iHetr8xTWIU" 
             target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8' }}>
            Watch Video →
          </a>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px' }}>
          <h3>Phishing Awareness Training for Employees 2025</h3>
          <p>Full training video covering current threats.</p>
          <a href="https://www.youtube.com/watch?v=1jfm2E_wvBo" 
             target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8' }}>
            Watch Video →
          </a>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px' }}>
          <h3>Is That Microsoft Email Real?</h3>
          <p>How to spot fake Microsoft / Office 365 phishing scams.</p>
          <a href="https://www.youtube.com/watch?v=Uz4sx4MrYF4" 
             target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8' }}>
            Watch Video →
          </a>
        </div>

      </div>

      {/* Real-time Threats */}
      <h2 style={{ marginTop: '40px' }}>🚨 Real-Time Threat Updates</h2>
      <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '10px', border: '1px solid #ffeaa7' }}>
        <p><strong>Active Campaign:</strong> “Microsoft 365 Account Verification” scam spreading rapidly.</p>
        <p><strong>Tip:</strong> Never click links in unsolicited emails asking for your password or personal info.</p>
      </div>

      {/* Back Button */}
      <button 
        onClick={() => window.location.href = '/'}
        style={{ marginTop: '40px', padding: '12px 24px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        ← Back to Simulation Hub
      </button>

    </div>
  );
}

export default ResourceHub;