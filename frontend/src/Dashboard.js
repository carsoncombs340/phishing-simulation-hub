import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [progress, setProgress] = useState([]);     
  const [successRate, setSuccessRate] = useState(0); 
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'guest'; 

  useEffect(() => {
    fetch(`http://localhost:3001/api/progress?userId=${username}`)
      .then(res => res.json())
      .then(data => {
        setProgress(data);
        if (data.length > 0) {
          const average = data.reduce((sum, item) => sum + item.score, 0) / data.length;
          setSuccessRate(Math.round(average));
        }

        createChart(data); 
      })
      .catch(err => console.error('Error loading dashboard data:', err));
  }, [username]);

  const createChart = (data) => {
    const oldChart = Chart.getChart('scoreChart');
    if (oldChart) oldChart.destroy();

    const ctx = document.getElementById('scoreChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((item, index) => `Sim ${index + 1}`),
        datasets: [{
          label: 'Score (%)',
          data: data.map(item => item.score),
          backgroundColor: '#4CAF50'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 100
          }
        }
      }
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>📊 Your Performance Dashboard</h1>
      <p style={{ color: '#666' }}>Logged in as: <strong>{username}</strong></p>

      <div style={{ marginBottom: '30px' }}>
        <h2>Overall Success Rate: <span style={{ color: '#4CAF50' }}>{successRate}%</span></h2>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Bar Chart */}
        <div style={{ width: '450px' }}>
          <h3>Score per Simulation</h3>
          <canvas id="scoreChart" width="400" height="300"></canvas>
        </div>

        {/* Quick Stats */}
        <div style={{ width: '400px' }}>
          <h3>Quick Stats</h3>
          <p><strong>Simulations Completed:</strong> {progress.length}</p>
          <p><strong>Average Score:</strong> {successRate}%</p>
          <p><strong>Best Decision:</strong> Reporting Phishing</p>
        </div>
      </div>

      <button 
        onClick={() => navigate('/')}
        style={{ marginTop: '40px', padding: '12px 24px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        ← Back to Simulation Hub
      </button>
    </div>
  );
}

export default Dashboard;