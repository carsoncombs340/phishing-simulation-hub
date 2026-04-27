// Login.js - LocalStorage version (no backend call)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Fake login - just store username
      localStorage.setItem('username', username);
      alert('Login successful!');
      navigate('/');
    } else {
      // Fake register
      localStorage.setItem('username', username);
      setMessage('Account created! You can now log in.');
      setIsLogin(true);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px' }}>
      <h1 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Create Account'}</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} 
          required 
        />

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

      {message && <p style={{ textAlign: 'center', color: 'green', marginTop: '15px' }}>{message}</p>}

      <button onClick={() => navigate('/')} style={{ marginTop: '20px', width: '100%', padding: '10px' }}>
        ← Back to Simulation (as Guest)
      </button>
    </div>
  );
}

export default Login;