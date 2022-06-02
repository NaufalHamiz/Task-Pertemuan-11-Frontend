import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Movies from "../../components/Movies/Movies";

function NowPlayingMovie() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`;

  // Membuat state movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getNowPlaying();
  }, []);

  async function getNowPlaying() {
    // Fetch data dari axios
    const response = await axios(URL);

    setMovies(response.data.results);
  }

  console.log(movies);
  return (
    <>
      <Hero />
      <Movies movies={movies}/>
    </>
  );
}

export default NowPlayingMovie;
