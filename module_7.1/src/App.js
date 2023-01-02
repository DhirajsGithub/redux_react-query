import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from './components/AddMovies';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films/')
  //   // fetch('https://swapi.dev/api/films/', {headers, body, method})
  //   // it gives a promise which can be resolve or reject
  //     .then((response) => {
  //       return response.json();
  //       // converts a json respond to javascript object
  //     })
  //     .catch((error)=>{
  //       console.log(error);
  //     })
  //     // if the promise is reolve without any catch then it return a data again as promise
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //       setMovies(transformedMovies);
  //     });
  // }

  // using async and await
  // async function fetchMoviesHandler() {
  const fetchMoviesHandler = useCallback(async function () {
    setLoading(true);
    setError(null);
    // NOTE: with promises we use .then for await and .catch for error
    // for async and await we use try and catch block
    try {
      // const response = await fetch("https://swapi.dev/api/films/");
      // firebase api 
      // const response = await fetch("https://react-http-6b42f-default-rtdb.firebaseio.com/movies.json");    // .jso
      const response = await fetch("http://localhost:3001/");
      if (!response.ok) {
        throw new Error("Somthing went Wrong !!!");
      }
      // the reason why if(!response.ok) is set before data coz if data is not found then the error thrown will not be ours

      const data = await response.json();

      const loadedMovies = [];
      for(const key in data){
        loadedMovies.push({
          id: key,
          title : data[key].title,
          openingText : data[key].openingText,
          releaseDate : data[key].releaseDate,
        })
      }

      // // const transformedMovies = data.results.map((movieData) => {     // result is swapi.dev/api specific key
      // const transformedMovies = data.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      // setMovies(transformedMovies);
      setMovies(loadedMovies);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  // and the best practice to list all dependencies you use instead of the effect function here in the dependencies array.
  // hoisting
  useEffect(() => {
    console.log("shit");
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  
  async function addMovieHandler(movie) {
    // const response = await fetch('https://react-http-6b42f-default-rtdb.firebaseio.com/movies.json', {
      const response = await fetch('http://localhost:3001/', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
      , Credentials:"include"});
    const data = await response.json();
    console.log(data);
  }
  // so we need to fetch movies for after posting to display on the page, we can avoid it by simply using useCallback hook with [] dependency and passing the addMovies function to the useEffect hook


  return (
    <React.Fragment>
    <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && !error && movies.length > 0 && (
          <MoviesList movies={movies} />
        )}
        {!loading && !error && movies.length === 0 && <p>Found No Movies !!</p>}
        {!loading && error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
