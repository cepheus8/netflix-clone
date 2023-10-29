import { useState } from "react";
import { useCallback } from "react";

const useMoviesData = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchMovies = useCallback(async (query, isModal, idArray) => {
    if (isModal && idArray) {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${query}&apikey=fd47b721`
      );
      const data = await response.json();
      const isfavoriteMovie = idArray.includes(query);
      const validData = !isfavoriteMovie ? data : { ...data, isFavorite: true };

      setMovieData(validData);
      console.log(validData);
      setIsLoaded(true);
    } else if (!isModal && idArray) {
      let favoritesMovies = [];
      for await (const favoriteMovie of idArray) {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${favoriteMovie}&apikey=fd47b721`
        );
        const data = await response.json();
        favoritesMovies.push(data);
      }
      console.log(favoritesMovies);
      setMovieData(favoritesMovies);
      setIsLoaded(true);
    } else {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=fd47b721`
      );

      const data = await response.json();

      setMovieData(data.Search);
      console.log(data);
      setIsLoaded(true);
    }
  }, []);

  return {
    movieData,
    isLoaded,
    fetchMovies,
  };
};

export default useMoviesData;
