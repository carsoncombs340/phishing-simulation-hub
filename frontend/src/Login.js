// Login.js
// Handles user login and registration

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://astonishing-adaptation-production-9161.up.railway.app';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? '/api/login' : '/api/register';
    const body = isLogin ? { username, password } : { username, password, email };

    try {
      const res = await fetch(`${API_BASE}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem('username', data.username || username);
          alert('Login successful!');
          navigate('/');
        } else {
          setMessage('Account created! You can now log in.');
          setIsLogin(true);
        }
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch (err) {
      setMessage('Could not connect to server.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px' }}>
      <h1 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Create Account'}</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0' }} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0' }} required />

        {!isLogin && (
          <input type="email" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        )}

        <button type="submit" style={{ width: '100%', padding: '12px', marginTop: '15px' }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#1a73e8', cursor: 'pointer', marginLeft: '5px' }}>
          {isLogin ? ' Register here' : ' Login here'}
        </span>
      </p>

      {message && <p style={{ textAlign: 'center', color: 'red', marginTop: '15px' }}>{message}</p>}

      <button onClick={() => navigate('/')} style={{ marginTop: '20px', width: '100%', padding: '10px' }}>
        ← Back to Simulation (as Guest)
      </button>
    </div>
  );
}

export default Login;