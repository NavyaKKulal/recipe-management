const db = require('../db');

exports.getBooks = async (req, res) => {
  const [books] = await db.execute('SELECT * FROM books');
  res.send(books);
};

exports.addBook = async (req, res) => {
  const { title, author } = req.body;
  await db.execute('INSERT INTO books (title, author) VALUES (?, ?)', [title, author]);
  res.send({ message: 'Book added' });
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  await db.execute('DELETE FROM books WHERE id = ?', [id]);
  res.send({ message: 'Book deleted' });
};
