import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SimulationHub() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'guest';

  // All 8 templates
  const templates = [
    { id: 1, title: "Account Security Alert", content: "Your account has been locked. Click here to verify your identity immediately.", technique: "Urgency + Fear" },
    { id: 2, title: "Package Delivery Notice", content: "Your package is on hold. Click to pay the $1.99 fee and schedule delivery.", technique: "Fake Authority" },
    { id: 3, title: "Password Reset Request", content: "Someone tried to log into your account. Reset your password now.", technique: "Phishing Link" },
    { id: 4, title: "Bank Account Verification", content: "Unusual activity detected. Please verify your banking details.", technique: "Spoofed Sender" },
    { id: 5, title: "Urgent Account Security Alert", content: "Your account has been compromised. Click here to verify immediately.", technique: "Email spoofing + URL manipulation" },
    { id: 6, title: "Package Delivery Update - Action Required", content: "Your package is on hold. Click to confirm delivery address.", technique: "URL manipulation" },
    { id: 7, title: "IT Security Alert: Virus Detected", content: "Your computer is infected. Click to scan and remove the virus now.", technique: "Social engineering" },
    { id: 8, title: "Urgent: Your Account Has Been Hacked", content: "Click here to reset your password immediately or lose access.", technique: "Email spoofing" }
  ];

  const currentTemplate = templates[currentIndex];

  const handleDecision = async (choice) => {
    if (!currentTemplate) return;

    let message = '';
    let score = 0;

    if (choice === 'click') {
      message = '❌ You clicked a suspicious link!';
      score = 0;
    } else if (choice === 'delete') {
      message = '✅ Good choice! Email deleted safely.';
      score = 70;
    } else if (choice === 'report') {
      message = '✅ Excellent! Reported as phishing.';
      score = 100;
    }

    setFeedback(message);

    try {
      await fetch('https://astonishing-adaptation-production-9161.up.railway.app/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: username,
          templateId: currentTemplate.id,
          score: score,
          decision: choice,
          feedback: message
        })
      });
    } catch (err) {
      console.error('Could not save progress');
    }
  };

  const sendMockEmail = () => {
    alert('✅ Mock email sent! Check your Gmail inbox.');
  };

  const nextSimulation = () => {
    setFeedback('');
    setCurrentIndex((currentIndex + 1) % templates.length);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1>🛡️ Phishing Simulation Hub</h1>
      <p style={{ color: '#666' }}>Logged in as: <strong>{username}</strong></p>
      <p style={{ color: '#666' }}>Simulation {currentIndex + 1} of {templates.length}</p>
      
      <div style={{ border: '2px solid #ddd', borderRadius: '10px', padding: '20px', backgroundColor: '#f9f9f9', marginBottom: '20px' }}>
        <h2>{currentTemplate.title}</h2>
        <p><strong>From:</strong> support@bank.com</p>
        <hr />
        <p>{currentTemplate.content}</p>
        <p><strong>Technique:</strong> {currentTemplate.technique}</p>
      </div>

      <button onClick={sendMockEmail} style={{ marginBottom: '20px', padding: '12px 24px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '8px' }}>
        📧 Send This as a Real Mock Email
      </button>

      <h3>What would you do?</h3>
      <button onClick={() => handleDecision('click')} style={{ margin: '5px', padding: '10px 20px' }}>Click the link</button>
      <button onClick={() => handleDecision('delete')} style={{ margin: '5px', padding: '10px 20px' }}>Delete email</button>
      <button onClick={() => handleDecision('report')} style={{ margin: '5px', padding: '10px 20px' }}>Report as phishing</button>

      {feedback && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: feedback.includes('✅') ? '#d4edda' : '#f8d7da', borderRadius: '8px', fontWeight: 'bold' }}>
          {feedback}
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <button onClick={nextSimulation} style={{ padding: '12px 24px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', marginRight: '10px' }}>
          Next Simulation →
        </button>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '12px 24px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '8px' }}>
          📊 View My Dashboard
        </button>
      </div>
    </div>
  );
}

export default SimulationHub;