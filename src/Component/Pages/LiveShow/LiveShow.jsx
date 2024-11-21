import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./TvShow.css"
import Navbar from "../../../CommonPages/NavBar/NavBar";

const LiveShow = () => {
  const [liveShow, setLiveShow] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "09a3ce7e466286664265aa6ff05a8d01";

  const fetchPopularMovies = () => {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US`;
    axios.get(url)
      .then(response => {
        setLiveShow(response.data.results);
      })
      .catch(err => {
        setError("Error fetching movie data.");
        console.error(err);
      });
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const navigate = useNavigate();

  function handleNavigate(movieId) {
    navigate(`/movie/${movieId}`);
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="TvShow ">
        <div className="show-sidebar">
          <h1>Live Shows</h1>
        </div>
        {liveShow.length > 0 ? (
          <div className="show-container">
            {liveShow.map((video) => (
              <div
                className="show-card"
                key={video.id}
                onClick={() => handleNavigate(video.id)}
              >
                {/* Display movie poster */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${video.poster_path}`}
                  alt={video.title || video.name}
                  width="200"
                />
                {/* <div className="movie-info">
                  <h2>{video.title || video.name}</h2>
                  <p>Release Date: {video.release_date || video.first_air_date}</p>
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default LiveShow;
