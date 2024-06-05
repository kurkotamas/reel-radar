import React, {useState, FormEvent, useEffect} from 'react';
import {getMovies, getTrendingMovies} from "../apis/TMDBApi";

interface SearchProps {
    onSearch: (moviesResult: MoviesResult) => void,
    page: number,
}
export interface Movie {
    id: number,
    title: string,
    release_date: string,
    overview: string,
    poster_path: string,
}

export interface MoviesResult {
    page: number,
    movies: Movie[],
    total_pages: number,
}

const SearchBox: React.FC<SearchProps> = ({ onSearch, page }) => {
    const [keyword, setKeyword] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.target && event.preventDefault();

        let moviesResult: MoviesResult = {
            page: 0,
            movies: [],
            total_pages: 0
        }

        let result = (keyword !== '' ? await getMovies(keyword, page) : await getTrendingMovies(page));

        if (result) {
            moviesResult.page = result.page;
            moviesResult.total_pages = result.total_pages;
            moviesResult.movies = result.results.map((movie: Movie) => {
                return {
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                };
            });
        }

        onSearch(moviesResult);
    };

    useEffect(() => {
        handleSubmit({} as FormEvent<HTMLFormElement>);
    }, [page]);

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search"
                           onChange={handleInputChange}
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Search Mockups, Logos..."/>
                    <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBox;
