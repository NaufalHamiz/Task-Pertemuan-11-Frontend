import axios from "axios";
import { useEffect, useState } from "react";
import Movies from "../../components/Movies/Movies";
import Hero from "../../components/Hero/Hero";

function PopularMovie() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  // Membuat state movies
  const [movies, setMovies] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
   getPopularMovie();
  }, []);

  async function getPopularMovie() {
     // Fetch data dari axios
     const response = await axios(URL);
    
     // Simpan data ke state movie
     setMovies(response.data.results);
  }

  console.log(movies);
  return (
    <>
      <Hero />
      <Movies movies={movies} />
    </>
  );
}

export default PopularMovie;
