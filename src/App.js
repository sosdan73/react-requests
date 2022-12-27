import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const handleFetchMovie = async () => {
    //     fetch('https://swapi.dev/api/films/')
    //     .then(response => {
    //         return response.json()
    //     }).then(data => {
    //         const transformedMovies = data.results.map(movie => {
    //             return {
    //                 id: movie.episode_id,
    //                 title: movie.title,
    //                 openingText: movie.opening_crawl,
    //                 releaseDate: movie.release_date
    //             }
    //         })
    //         setMovies(transformedMovies)
    //     }).catch(err => {
    //         console.error(err)
    //     })
    // }
    const handleFetchMovie = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://swapi.dev/api/films/');
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json();

            const transformedMovies = data.results.map(movie => {
                return {
                    id: movie.episode_id,
                    title: movie.title,
                    openingText: movie.opening_crawl,
                    releaseDate: movie.release_date
                }
            })
            setMovies(transformedMovies);
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false);
    }, [])

    useEffect(() => {
        handleFetchMovie()
    }, [handleFetchMovie])

    let content = <p>Found no movies</p>;
    if (!!movies.length) {
        content = <MoviesList movies={movies} />
    }
    if (error) {
        content = <p>Error</p>
    }
    if (isLoading) {
        content = <p>Loading...</p>
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={handleFetchMovie}>Fetch Movies</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    );
}

export default App;
