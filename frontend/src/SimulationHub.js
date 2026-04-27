import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SimulationHub() {
  const [templates, setTemplates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'guest';

  useEffect(() => {
    fetch('http://localhost:3001/api/simulate')
      .then(res => res.json())
      .then(data => {
        setTemplates(data);
        if (data.length > 0) setCurrentIndex(0);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  const currentTemplate = templates[currentIndex];

  const handleDecision = (choice) => {
    if (!currentTemplate) return;

    let message = '';
    if (choice === 'click') message = '❌ You clicked a suspicious link!';
    else if (choice === 'delete') message = '✅ Good choice! Email deleted safely.';
    else if (choice === 'report') message = '✅ Excellent! Reported as phishing.';

    setFeedback(message);

    fetch('http://localhost:3001/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: username,
        simulationId: currentTemplate._id,
        score: choice === 'click' ? 20 : 90,
        feedback: message
      })
    });
  };

  const sendMockEmail = async () => {
    if (!currentTemplate) return;
    try {
      await fetch('http://localhost:3001/api/send-mock-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentTemplate.title,
          content: currentTemplate.content,
          subject: 'Urgent: Account Security Alert'
        })
      });
      alert('✅ Mock email sent! Check your Gmail inbox.');
    } catch (err) {
      alert('Failed to send email.');
    }
  };

  const nextSimulation = () => {
    setFeedback('');
    setCurrentIndex((currentIndex + 1) % templates.length);
  };

  if (templates.length === 0) return <p>Loading simulations...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1>🛡️ Phishing Simulation Hub</h1>
      <p style={{ color: '#666' }}>Logged in as: <strong>{username}</strong></p>
      <p style={{ color: '#666' }}>Simulation {currentIndex + 1} of {templates.length}</p>
      
      <div style={{
        border: '2px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        marginBottom: '20px'
      }}>
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
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: feedback.includes('✅') ? '#d4edda' : '#f8d7da',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
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