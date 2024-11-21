import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const TopRated = () => {
  const [top, setTop] = useState([]);
  const [error, setError] = useState(null);
  const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=09a3ce7e466286664265aa6ff05a8d01";

  useEffect(() => {
    const fetchTopRatedMovies = () => {
      axios
        .get(url)
        .then((response) => {
          setTop(response.data.results);
        })
        .catch((err) => {
          setError("Error fetching movie data.");
          console.error(err);
        });
    };

    fetchTopRatedMovies();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const navigate = useNavigate()

  function handleNavigate(movieId){
    navigate(`/movie/${movieId}` )
  }

  return (
    <div className="topheading">
      <h1>Top Rated Movies</h1>
      <div className="movie-container">
        {top.map((movie) => (
          <div className="movie-card" key={movie.id} onClick={()=>handleNavigate(movie.id)}>
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            {/* <div className="movie-info">
              <h2 className="movie-title">
                <b>Title: </b>
                {movie.title}
              </h2>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
