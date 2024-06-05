import React from 'react';
import {Movie} from "../searchbox/SearchBox";

interface MovieListProps {
    movies: Movie[]
}
export const MovieList: React.FC<MovieListProps> = ({ movies }) => {

    return (
        <div className="w-full flex justify-center">
            <div className="movieList grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
                {movies.map((movie: Movie) => (
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        key={movie.id}>
                        <a href="#">
                            <img className="rounded-t-lg" src={(movie.poster_path
                                ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`
                                : `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png`)}
                                 alt=""/>
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.overview}</p>
                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}