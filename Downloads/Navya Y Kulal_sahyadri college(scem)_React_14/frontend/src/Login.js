import React, { useState } from 'react';
import axios from './api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await axios.post('/auth/login', { email, password });
    onLogin(res.data.token);
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
