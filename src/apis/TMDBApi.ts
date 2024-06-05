const fetch = require('node-fetch');

const API_KEY = 'a040ded43637724cfe7b99cc3d51dce7'
const BASE_URL = 'https://api.themoviedb.org';

export async function TMDBApi(query: string, method: string = 'GET') {
    try {
        const url = `${BASE_URL}${query}&api_key=${API_KEY}`;
        const options = {
            method: method,
            headers: {
                accept: 'application/json'
            }
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Error fetching movies: ${error.status_message}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export async function getMovies(keyword: string) {
    return await TMDBApi(`/3/search/movie?query=${keyword}`);
}

export async function getTrendingMovies() {
    return await TMDBApi(`/3/trending/movie/week?language=en-US`);
}