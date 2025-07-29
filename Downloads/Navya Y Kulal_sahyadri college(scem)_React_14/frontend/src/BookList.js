import React, { useEffect, useState } from 'react';
import axios from './api';
import { useNavigate } from 'react-router-dom';

const BookList = ({ role }) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/books').then(res => setBooks(res.data));
  }, []);

  const deleteBook = async (id) => {
    await axios.delete(`/books/${id}`);
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div>
      <h2>Books</h2>
      {role === 'admin' && <button onClick={() => navigate('/add')}>Add Book</button>}
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author}
            {role === 'admin' && <button onClick={() => deleteBook(book.id)}>Delete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
