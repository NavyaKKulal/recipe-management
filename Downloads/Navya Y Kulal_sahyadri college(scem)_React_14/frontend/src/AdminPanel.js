import React, { useState, useEffect } from 'react';
import axios from './api';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newRole, setNewRole] = useState('user');

  useEffect(() => {
    axios.get('/auth/users').then(res => setUsers(res.data));
  }, []);

  const updateRole = async () => {
    await axios.put(`/auth/users/${selectedUserId}/role`, { role: newRole });
    alert('Role updated');
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <select onChange={(e) => setSelectedUserId(e.target.value)}>
        <option>Select User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email}) - Current: {user.role}
          </option>
        ))}
      </select>
      <select onChange={(e) => setNewRole(e.target.value)} value={newRole}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={updateRole}>Update Role</button>
    </div>
  );
};

export default AdminPanel;
