import React, { useState } from 'react';
import MovieAppDisplay from './MovieAppDisplay/MovieAppDisplay';

const MovieApp = () => {
    const [result, setResult] = useState();
    const [query, setQuery] = useState('');

    const fetcher = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=171116334fbdf0e64f5dd374fa23ed50&language=en-US&query=${query}&page=1&include_adult=false`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('fetch error');
                } else return res.json();
            })
            .then(json => {
                if (json.results.length === 0) {
                    throw new Error('no results');
                } else {
                    const movieNum = Math.floor(Math.random() * json.results.length);
                    setResult(json.results[movieNum]);
                    console.log(json.results[movieNum])
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="main">
            <div className="mainDiv">
                <input value={query} onChange={(e) => setQuery(e.target.value)} />
                <button onClick={fetcher}>Click for Movie Pic Search</button>
                {!result || !result.poster_path ? null : <MovieAppDisplay movie={result}/>}
            </div>
        </div>
    )
}

export default MovieApp;