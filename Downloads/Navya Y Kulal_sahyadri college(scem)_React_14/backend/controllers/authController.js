const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);
  res.send({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  const user = users[0];
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).send({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.send({ token });
};


exports.listUsers = async (req, res) => {
  const [users] = await db.execute('SELECT id, name, email, role FROM users');
  res.send(users);
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  await db.execute('UPDATE users SET role = ? WHERE id = ?', [role, id]);
  res.send({ message: 'Role updated' });
};
