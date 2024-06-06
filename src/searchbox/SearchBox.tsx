import React, {useState, FormEvent, useEffect} from 'react';
import {getMovies, getTrendingMovies} from "../apis/TMDBApi";
import {DarkThemeToggle} from "../darkthemetoggle/DarkThemeToggle";

interface SearchProps {
    onSearch: (moviesResult: MoviesResult) => void,
    onLoading: (loading: boolean) => void,
    page: number,
}
export interface Movie {
    id: number,
    title: string,
    original_title: string,
    release_date: string,
    overview: string,
    poster_path: string,
    vote_count: number,
    vote_average: number,
}

export interface MoviesResult {
    page: number,
    movies: Movie[],
    total_pages: number,
}

export const SearchBox: React.FC<SearchProps> = ({ onSearch, onLoading, page }) => {
    const [keyword, setKeyword] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.target && event.preventDefault();

        onLoading(true);

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
                    original_title: movie.original_title,
                    overview: movie.overview,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                    vote_count: movie.vote_count,
                    vote_average: movie.vote_average.toFixed(1),
                };
            });
        }
        onLoading(false);
        onSearch(moviesResult);
    };

    useEffect(() => {
        handleSubmit({} as FormEvent<HTMLFormElement>);
    }, [page]);

    return (
        <form className="flex items-center max-w-lg mx-auto py-10 px-2" onSubmit={handleSubmit}>
            <label htmlFor="voice-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input type="text" id="voice-search"
                       onChange={handleInputChange}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                        focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search Movies..."
                />
                <DarkThemeToggle />
            </div>
            <button type="submit"
                className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700
                    rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
            </button>
        </form>
    );
};
