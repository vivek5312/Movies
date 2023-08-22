
import React, { useEffect, useState,useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import Form from './components/form';

function App() {
  const [movies, setMovies] = useState([]);
 const [isLoading,setLoading]=useState(false);
 const [error,setError]=useState(null);
const [newMovieObj,setnewMovies]=useState()



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

   const handleNewMovies=(moviesData)=>{
    setnewMovies(moviesData);
   }
 console.log('new movies is set',newMovieObj)
  return (
    <React.Fragment>
       <Form onSubmit={handleNewMovies}/>
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