import React, {useState} from 'react';
import './App.css';
import './searchbox/SearchBox.css';
import SearchBox, {Movie, MoviesResult} from "./searchbox/SearchBox";
import {MovieList} from "./movielist/MovieList";

function App() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [newSearch, setNewSearch] = useState<boolean>(true);

    const handleSearched = (moviesResult: MoviesResult) => {
        setMovies(newSearch ? moviesResult.movies : [...movies, ...moviesResult.movies]);
        setNewSearch(true);
        if (newSearch) {
            setPage(1);
        }
    }

    const handleScroll = () => {
        setPage(prevPage => prevPage + 1);
        setNewSearch(false);
    }

    return (
      <div className="App">
          <SearchBox onSearch={handleSearched} page={page} />
          <MovieList movies={movies} onScroll={handleScroll} />
      </div>
    );
}

export default App;
