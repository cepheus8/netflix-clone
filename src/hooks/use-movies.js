import { useState } from "react";

const useMoviesData = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchMovies = async (parameter, query) => {
    const response = await fetch(
      `http://www.omdbapi.com/?${parameter}=${query}&apikey=fd47b721`
    );

    const data = await response.json();
    setMovieData(data.Search);
    setIsLoaded(true);
  };

  return {
    movieData,
    isLoaded,
    fetchMovies,
  };
};

export default useMoviesData;
