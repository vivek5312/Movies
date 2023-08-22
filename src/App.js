
import React, { useEffect, useState,useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
 const [isLoading,setLoading]=useState(false);
 const [error,setError]=useState(null);




  const fetchMovieshandler=useCallback(async ()=>{ 
    try {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/films') 
    
      if(!response.ok){
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
      
      setError()
    } catch (error) {
      setError(error.message)
    }
    setLoading(false);
  },[]);

  useEffect(()=>{
    fetchMovieshandler();
   },[fetchMovieshandler])
 
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieshandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && !error && <p>No movies found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}
export default App;