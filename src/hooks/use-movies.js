import { useState } from "react";
import { useCallback } from "react";

const useMoviesData = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchMovies = useCallback(async (query, isModal, idArray) => {
    setIsLoaded(false);
    if (isModal && idArray) {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${query}&apikey=fd47b721`
      );
      const data = await response.json();
      const isfavoriteMovie = idArray.includes(query);
      const validData = !isfavoriteMovie ? data : { ...data, isFavorite: true };

      setMovieData(validData);
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
      setMovieData(favoritesMovies);
      setIsLoaded(true);
    } else {
      let i = 0;
      let data = [];
      let loopedMovies = [];
      while (i < 4) {
        i++;
        const response = await fetch(
          `https://www.omdbapi.com/?s=${query}&page=${i}&apikey=fd47b721`
        );
        data = await response.json();

        if (data.Search === undefined) {
          break;
        }
        loopedMovies.push(...data.Search);
      }

      setMovieData(loopedMovies);
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
