import React, { useState } from 'react';
import axios from './api';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  const addBook = async () => {
    await axios.post('/books', { title, author });
    navigate('/books');
  };

  return (
    <div>
      <h2>Add Book</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
      <button onClick={addBook}>Add</button>
    </div>
  );
};

export default AddBook;
