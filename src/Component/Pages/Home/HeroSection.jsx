import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './HeroSection.css'; // Add your styles here

const HeroSection = () => {
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [error, setError] = useState(null);
  const apiKey = "09a3ce7e466286664265aa6ff05a8d01";

  const fetchNowPlaying = () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
    axios.get(url)
      .then(response => {
        setHeroMovies(response.data.results.slice(0, 9)); 
      })
      .catch(err => {
        setError("Error fetching movie data.");
        console.error(err);
      });
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleNext = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % heroMovies.length);
  };

  const handlePrev = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex - 1 + heroMovies.length) % heroMovies.length);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (heroMovies.length === 0) {
    return <div>Loading...</div>;
  }

  const currentMovie = heroMovies[currentMovieIndex];

  return (
    <div className="hero-section">
      <div
    
        className="hero-background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
        }}
      >
       
       
      </div>

      <div className="hero-content">
          <h1>{currentMovie.title}</h1>
          <button onClick={() => handleNavigate(currentMovie.id)}>More Details</button>
        </div>
      <div className="hero-navigation">
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default HeroSection;

