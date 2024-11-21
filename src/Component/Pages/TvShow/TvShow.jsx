import React, { useEffect, useState } from "react";
import axios from "axios";
import './TvShow.css'
import { useNavigate } from 'react-router-dom';
import Navbar from "../../../CommonPages/NavBar/NavBar";


const TvShow = () => {
  const [TvShow, setTvShow] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "09a3ce7e466286664265aa6ff05a8d01";

  const fetchPopularMovies = () => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=1`;
    axios.get(url)
      .then(response => {
        setTvShow(response.data.results); 
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

  const navigate =useNavigate()

  function handleNavigate(movieId){
    navigate(`/movie/${movieId}`)
  }


  return (
    <div>
       <div className="navbar">
        <Navbar/>
      </div>
      <div className="TvShow ">
      <div className="show-sidebar">
        <h1>Tv Shows</h1>
      </div>
      {TvShow.length > 0 ? (
        <div className="show-container">
          {TvShow.map(movie => (
            <div className="show-card" key={movie.id} onClick={()=>handleNavigate(movie.id)}>
                {/* <h3>View Details</h3> */}
                <img 
                className="show-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="show-info">
                {/* <h2 className="movie-title">
                  <b>Title: </b>
                  {movie.title}
                </h2> */}
                {/* <p><b>Overview:</b> {movie.overview}</p> */}
                {/* <p><b>Release Date:</b> {movie.release_date}</p> */}
                {/* <p><b>Rating:</b> {movie.vote_average}</p> */}
                {/* Link to navigate to the movie details page */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>

      
    </div>
  )
}

export default TvShow
