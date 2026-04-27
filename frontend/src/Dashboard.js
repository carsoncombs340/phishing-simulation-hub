// Dashboard.js - Simple localStorage version (no backend fetch)
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [progress, setProgress] = useState([]);
  const [successRate, setSuccessRate] = useState(0);
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'guest';

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = JSON.parse(localStorage.getItem('progressData') || '[]');
    setProgress(savedProgress);

    if (savedProgress.length > 0) {
      const avg = savedProgress.reduce((sum, item) => sum + (item.score || 0), 0) / savedProgress.length;
      setSuccessRate(Math.round(avg));
    }

    createChart(savedProgress);
  }, []);

  const createChart = (data) => {
    const oldChart = Chart.getChart('scoreChart');
    if (oldChart) oldChart.destroy();

    const ctx = document.getElementById('scoreChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.length > 0 ? data.map((_, i) => `Sim ${i + 1}`) : ['No data yet'],
        datasets: [{
          label: 'Score (%)',
          data: data.length > 0 ? data.map(item => item.score || 0) : [0],
          backgroundColor: '#4CAF50'
        }]
      },
      options: {
        responsive: true,
        scales: { y: { min: 0, max: 100 } }
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
        <div style={{ width: '450px' }}>
          <h3>Score per Simulation</h3>
          <canvas id="scoreChart" width="400" height="300"></canvas>
        </div>

        <div style={{ width: '400px' }}>
          <h3>Quick Stats</h3>
          <p><strong>Simulations Completed:</strong> {progress.length}</p>
          <p><strong>Average Score:</strong> {successRate}%</p>
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