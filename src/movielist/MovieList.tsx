import React, {useEffect} from 'react';
import {Movie} from "../searchbox/SearchBox";
import {MovieModal} from "../moviemodal/MovieModal";

interface MovieListProps {
    movies: Movie[],
    onScroll: () => void,
    loading: boolean,
}
export const MovieList: React.FC<MovieListProps> = ({ movies,onScroll, loading }) => {

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                onScroll();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handlePageRefresh = () => {
        window.location.reload();
    }

    if (!movies.length && !loading) {
        return (
            <div className="flex justify-center h-screen">
                <div
                    className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50
                        dark:bg-gray-800 dark:text-yellow-300 h-8"
                    role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0
                            1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                        />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">No movies found! </span>
                        <a href="#" className="font-semibold underline hover:no-underline" onClick={handlePageRefresh}>
                            Click here
                        </a> for weekly trending list.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center">
            <div className="movieList grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {movies.map((movie: Movie) => (
                    <div
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5"
                        key={movie.id}>
                        <div className="relative overflow-hidden">
                            <img className="rounded-t-lg hover:scale-105 transition duration-1000 ease-in-out" src={(movie.poster_path
                                ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`
                                : `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png`)}
                                 alt=""/>
                            <div className="absolute bottom-0 right-0 w-10 p-1 bg-amber-500 text-white rounded-tl-lg">{movie.vote_average}</div>
                        </div>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.overview}</p>
                            <MovieModal movieId={movie.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}