import React, {useState} from 'react';
import './App.css';
import './searchbox/SearchBox.css';
import SearchBox, {Movie, MoviesResult} from "./searchbox/SearchBox";
import {MovieList} from "./movielist/MovieList";

function App() {

    const [movies, setMovies] = useState<Movie[]>([]);

    const handleSearched = (moviesResult: MoviesResult) => {
        setMovies(moviesResult.movies);
    }

    return (
      <div className="App">
          <SearchBox onSearch={handleSearched}/>
          <MovieList movies={movies}/>
      </div>
    );
}

export default App;
