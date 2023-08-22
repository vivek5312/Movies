import React, { useState } from 'react';
import './form.css';

const Form = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [openingText, setOpeningText] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMovieData = {
      title,
      openingText,
      releaseDate,
    };
    onSubmit(newMovieData);

    // Clear input fields
    setTitle('');
    setOpeningText('');
    setReleaseDate('');
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='title-div'>
        <label className='title'>Title</label>
        <input
          type='text'
          className='title-text'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label className='opening'  >Opening Text</label>
        <input
          type='text'
          className='title-text'
          value={openingText}
          onChange={(event) => setOpeningText(event.target.value)}
        />
      </div>
      <div>
        <label className='release'>Release Date</label>
        <input
          type='text'
          className='title-text'
          value={releaseDate}
          onChange={(event) => setReleaseDate(event.target.value)}
        />
      </div>
      <button type='submit' className='movies-btn'>
        Add Movies
      </button>
    </form>
  );
};

export default Form;
