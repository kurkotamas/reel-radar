import React, {useState} from 'react';
import './App.css';
import './searchbox/SearchBox.css';
import SearchBox, {Movie, MoviesResult} from "./searchbox/SearchBox";
import {MovieList} from "./movielist/MovieList";
import {Loading} from "./loading/Loading";

function App() {

    const INITIAL_PAGE: number = 1;
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(INITIAL_PAGE);
    const [newSearch, setNewSearch] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);

    const handleSearched = (moviesResult: MoviesResult) => {
        setMovies(newSearch ? moviesResult.movies : [...movies, ...moviesResult.movies]);
        setNewSearch(true);
        if (newSearch) {
            setPage(INITIAL_PAGE);
        }
    }

    const handleLoading = (load:boolean) => {
        setLoading(load);
    }

    const handleScroll = () => {
        setPage(prevPage => prevPage + 1);
        setNewSearch(false);
    }

    return (
        <div className="App">
          <SearchBox onSearch={handleSearched} onLoading={handleLoading} page={page} />
          <MovieList movies={movies} onScroll={handleScroll} loading={loading} />
          {loading ? <Loading /> : ''}
        </div>
    );
}

export default App;
