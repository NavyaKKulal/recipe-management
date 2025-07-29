import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import BookList from './BookList';
import AdminPanel from './AdminPanel';
import AddBook from './AddBook';

function App() {
  const [role, setRole] = useState(null);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    const { role } = JSON.parse(atob(token.split('.')[1]));
    setRole(role);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/books" element={<BookList role={role} />} />
        <Route path="/add" element={role === 'admin' ? <AddBook /> : <Navigate to="/books" />} />
        <Route path="/admin" element={role === "admin" ? <AdminPanel /> : <Navigate to="/" />} />
  <Route path="/register" element={<Register />} />
</Routes>
    </Router>
  );
}

export default App;
