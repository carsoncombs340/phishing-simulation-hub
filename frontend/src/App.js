import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SimulationHub from './SimulationHub';
import Dashboard from './Dashboard';
import ResourceHub from './ResourceHub';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{
          backgroundColor: '#1e3a8a',
          padding: '16px 30px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
            Phishing Simulation Hub
          </div>
          
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Simulation</Link>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Dashboard</Link>
          <Link to="/resources" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Resources</Link>
          
          <Link to="/login" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            marginLeft: 'auto',
            padding: '8px 20px',
            border: '2px solid white',
            borderRadius: '9999px',
            fontSize: '15px'
          }}>
            🔑 Login
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<SimulationHub />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;