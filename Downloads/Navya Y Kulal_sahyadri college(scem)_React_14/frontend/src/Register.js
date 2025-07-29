import React, { useState } from 'react';
import axios from './api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    await axios.post('/auth/register', form);
    alert('Registered successfully. Please login.');
    navigate('/');
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
