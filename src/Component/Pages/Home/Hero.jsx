import React from 'react';
import Movie from '../MovieApp/Movie';
import TopRated from '../TopRated/TopRated';
import HeroSection from './HeroSection';
import Navbar from '../../../CommonPages/NavBar/NavBar';
import MovieSearch from '../SearchMovie/SearchMovie';
import SearchMovie from '../SearchMovie/SearchMovie'


const Hero = () => {
  return (
    <>
    <Navbar />
    <SearchMovie/>
      <HeroSection />
      {/* <MovieSearch/> */}
      <Movie movieId={1} /> 
      <TopRated /> 
    </>
  );
};

export default Hero;
