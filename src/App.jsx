import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movie from './Component/Pages/MovieApp/Movie';
import Hero from './Component/Pages/Home/Hero';
import TopRated from './Component/Pages/TopRated/TopRated';
import TopMovies from './Component/Pages/Moviesinfo/Moviesinfo';
import TvShow from './Component/Pages/TvShow/TvShow';
import LiveShow from './Component/Pages/LiveShow/LiveShow';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/toprated/:movieId' element={<TopRated />} />
          <Route path='/movie/:movieId' element={<TopMovies />} />
          <Route path="/TopMovies" element={<TopMovies />} />
          <Route path='/tvshows' element={<TvShow/>} />
          <Route path='/liveshows' element={<LiveShow/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
