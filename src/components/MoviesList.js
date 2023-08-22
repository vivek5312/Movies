import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MoviesList = (props) => {
  const handleDeleteClick = () => {
    if (props.onDeleteMovies) {
      props.onDeleteMovies();
    }
  };

  return (
    <div>
      <ul className={classes['movies-list']}>
        {props.movies.map((movie) => (
          <Movie
            key={movie.id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            openingText={movie.openingText}
          />
        ))}
      </ul>
      <button onClick={handleDeleteClick}>Delete Movies</button>
    </div>
  );
};

export default MoviesList;

