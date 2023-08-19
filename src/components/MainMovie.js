import { useEffect, useState } from "react";

const MainMovie = () => {
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        "http://www.omdbapi.com/?i=tt3896198&apikey=fd47b721"
      );

      const res = await response.json();
      console.log(res);

      setMovieData({
        poster: res.Poster,
      });

      console.log(movieData);
    };
    fetchMovie();
  }, []);

  return <img src={movieData.poster} alt="movie poster" width="150px" />;
};

export default MainMovie;
