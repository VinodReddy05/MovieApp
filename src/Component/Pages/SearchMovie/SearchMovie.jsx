import React, { useState } from 'react';
import './SearchMovie.css'



const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=09a3ce7e466286664265aa6ff05a8d01&query=${query}`
    );
    const data = await response.json();
    setMovies(data.results || []);
  };

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="movie-search">
      <h1 className="movie-search__title">Movie Search</h1>
      <form className="movie-search__form" onSubmit={handleSearch}>
        <input
          type="text"
          className="movie-search__input"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="movie-search__button">Search</button>
      </form>
      <div className="movie-search__container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-search__card">
              {movie.poster_path && (
                <img
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-search__poster"
                />
              )}
              <h2 className="movie-search__title--movie">{movie.title}</h2>
            
            </div>
          ))
        ) : (
          <p className="movie-search__no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
