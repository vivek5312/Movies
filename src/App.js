import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retrying, setRetrying] = useState(false);

  async function fetchMovieshandler() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://swapi.dev/api/film');

      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }
      const data = await response.json();

      const transformMovies = data.results.map((moviesData) => ({
        id: moviesData.episode_id,
        title: moviesData.title,
        openingText: moviesData.opening_crawl,
        releaseDate: moviesData.release_date,
      }));

      setMovies(transformMovies);
    } catch (error) {
      setError(error.message);
      setRetrying(true);
      setRetryCount(retryCount + 1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let retryInterval;

    if (retrying && retryCount < 5) {
      retryInterval = setInterval(() => {
        fetchMovieshandler();
      }, 5000); // Retry every 5 seconds
    } else {
      clearInterval(retryInterval);
      setRetrying(false);
      setRetryCount(0);
    }

    return () => {
      clearInterval(retryInterval);
    };
  }, [retrying, retryCount]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieshandler} disabled={retrying}>
         Fetch Movies
        </button>
        {retrying && (
          <button onClick={() => setRetrying(false)}>Cancel</button>
        )}
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}
export default App;
