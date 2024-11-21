import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Movie.css";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "09a3ce7e466286664265aa6ff05a8d01";

  const fetchPopularMovies = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    axios.get(url)
      .then(response => {
        setMovies(response.data.results); 
      })
      .catch(err => {
        setError("Error fetching movie data.");
        console.error(err);
      });
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []); 

  if (error) {
    return <div>{error}</div>;
  }

  const navigate = useNavigate()

  function handleNavigate(movieId){
    navigate(`/movie/${movieId}`)
  }
  return (
    <div className="parent">
      <div className="sideBar">
        <h1>Popular Movies</h1>
      </div>
      {movies.length > 0 ? (
        <div className="movie-container">
          {movies.map(movie => (
            <div className="movie-card" key={movie.id} onClick={()=>handleNavigate(movie.id)}>
                {/* <h3>View Details</h3> */}
                <img 
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
      
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Movie;
