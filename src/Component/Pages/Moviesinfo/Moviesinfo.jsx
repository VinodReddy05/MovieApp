import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Movieinfo.css";

const TopMovies = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "09a3ce7e466286664265aa6ff05a8d01";
  const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

  let endPoints = [
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=1`,
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`,
    "https://api.themoviedb.org/3/movie/top_rated?api_key=09a3ce7e466286664265aa6ff05a8d01"
  ]

  const fetchMovieDetails = () => {
    axios.all(endPoints.map((endPoint)=> axios.get(endPoint)))
      .then((response) =>{
        console.log(response)
        const finalMoviesResponse = []
        response.map(item => finalMoviesResponse.push(item.data.results))
        let finalResponse = [...finalMoviesResponse[0],...finalMoviesResponse[1],...finalMoviesResponse[2]]
        console.log(finalResponse)
        let selectedMovie = finalResponse.find((movie)=> movie.id == +movieId)
        setMovie(selectedMovie);
      })
      .catch(err => {
        setError("Error fetching movie data.");
        console.error(err);
      });
  };

  const fetchMovieTrailer = () => {
    axios.get(videoUrl)
      .then((response) => {
        const trailerData = response.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailerData) {
          setTrailer(trailerData.key);
        }
      })
      .catch(err => {
        setError("Error fetching movie trailer.");
        console.error(err);
      });
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
      fetchMovieTrailer();
    }
  }, [movieId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='movie-info'>

      <div className='heading'><h2>More About <b>Movie Details</b></h2></div>

      {movie ? (
        <div className="movie-details" >
          <img className="movie-im"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.original_title}
          />
          <h1>{movie.original_title}</h1>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>

          {trailer && (
            <div className="movie-trailer">
              <h3>Trailer</h3>
              <iframe
                width="460"
                height="215"
                src={`https://www.youtube.com/embed/${trailer}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Movie Trailer"
              ></iframe>
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TopMovies;
