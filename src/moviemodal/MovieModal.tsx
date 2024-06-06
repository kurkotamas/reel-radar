import React, { useState } from 'react';
import {getMovie} from "../apis/TMDBApi";

interface MovieModalProps {
    movieId: number,
}

interface Genre {
    genreId: number,
    name: string,
}
interface Movie {
    movieId: number,
    title: string,
    tagline: string,
    release_date: Date | null,
    imdb_id: number,
    poster_path: string,
    vote_count: number,
    vote_average: number,
    overview: string,
    budget: number,
    genres: Genre[],
}

export const MovieModal: React.FC<MovieModalProps> = ({ movieId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [movie, setMovie] = useState<Movie | null>(null);

    const toggleModal = async () => {
        setIsOpen(!isOpen);
        if (!isOpen && !movie?.movieId) {
            let movieResult = await getMovie(movieId);
            let genres = movieResult.genres.map((genre: any) => {
                return {
                    genreId: genre.id,
                    name: genre.name,
                };
            });

            setMovie({
                movieId: movieResult.id,
                title: movieResult.title,
                tagline: movieResult.tagline,
                release_date: movieResult.release_date ? new Date(movieResult.release_date) : null,
                imdb_id: movieResult.imdb_id,
                poster_path: movieResult.poster_path,
                vote_count: movieResult.vote_count,
                vote_average: movieResult.vote_average ? movieResult.vote_average.toFixed(1) : 0,
                overview: movieResult.overview,
                budget: movieResult.budget,
                genres: genres,
            });
        }
    };

    return (
        <div>
            <button onClick={toggleModal} data-modal-target="default-modal" data-modal-toggle="default-modal"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">
                Read more
            </button>

            {isOpen && movie &&  (
                <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-baseline sm:items-center">
                    <div className="bg-gray-800 bg-opacity-80 absolute inset-0" onClick={toggleModal}></div>
                        <div
                            className="flex relative bg-white border border-gray-200 rounded-lg shadow
                                flex-col md:max-w-5xl sm:flex-row dark:border-gray-700 dark:bg-gray-800">
                            <button type="button"
                                    onClick={toggleModal}
                                    className="absolute top-3 end-2.5 text-black dark:text-white bg-transparent
                                        hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto
                                        inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="popup-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                            <img className="object-cover w-full h-96 md:h-auto md:max-w-xs rounded-t-lg sm:rounded-none sm:rounded-s-lg"
                                src={(movie.poster_path
                                        ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`
                                        : 'https://fakeimg.pl/440x660/?text=No+Image'
                                )}
                            />
                            <div className="text-left p-4">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {movie.title}
                                </h5>
                                <h4 className="mb-2 text-xl opacity-60 font-normal dark:text-white">
                                    {(movie.tagline ? ' ' + movie.tagline : '')}
                                </h4>
                                <div className="my-2">
                                    <span className="inline-flex text-center py-1 px-3 bg-amber-500 text-white rounded-tl rounded-bl">
                                            {movie.vote_average}
                                    </span>
                                    <span
                                        className="inline-flex text-center py-1 px-2 bg-amber-950 text-amber-200 rounded-tr rounded-br">
                                        {movie.vote_count}
                                        <svg className="text-amber-200 w-6 h-6" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd"
                                                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2
                                                    2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                                  clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                {movie.release_date ? <div className="mb-1 dark:text-white">Release date:
                                    <span className="text-gray-700 dark:text-gray-400"> {movie.release_date.toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit"
                                    })}</span>
                                    </div> : ''}
                                {movie.budget ? <div className="mb-1 dark:text-white">Budget:
                                    <span
                                        className="text-gray-700 dark:text-gray-400"> {movie.budget.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD"
                                    })}</span>
                                </div> : ''}
                                {movie.overview ? <div className="dark:text-white">Description:
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.overview}</p>
                                </div> : ''}
                                {movie.imdb_id ? <div className="mb-1 dark:text-white">IMDB: <a
                                    href={`https://imdb.com/title/${movie.imdb_id}`} target="_blank"
                                    className="text-gray-700 dark:text-gray-400 underline">https://imdb.com/title/{movie.imdb_id}</a>
                                </div> : ''}
                            </div>
                        </div>
                </div>
            )}
        </div>
    );
};
