/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Hero.module.css";
import { useEffect, useState } from "react";
import Button from "../ui/button";
import axios from "axios";

function Hero() {
  // Membuat State movie
  const [movie, setMovie] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;
  const genres = movie && movie.genres.map((genre) => genre.name).join(", ");
  const trailer = 
  movie && `https://www.youtube.com/watch?v=${movie.videos.results[0].key}`;

  async function fetchMovie() {
    const url = "https://www.omdbapi.com/?apikey=fcf50ae6&i=tt2975590";
    // Melakukan Fetch data dari API omdb.
    const response = await fetch(url);
    const data = await response.json();

    // Update state movie dengan data movie (hasil fetch)
    setMovie(data);
  }

  /**
   * Menjalankan useEffect.
   * Parameter kedua digunakan untuk custom lifecycle update.
   * Jika state di dalam array berubah, maka jalankan useEffect lagi (lifecycle update).
   * Jika state di dalam array kosong, maka jalankan sekali (lifecycle mount).
   */
  useEffect(getTrendingMovie, []);

  // Mendapatkan 1 data dari trending movies
  async function getTrendingMovie() {
    const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
    const response = await axios(URL);
    return response.data.results[0];
  }

  // Membuat fungsi untuk mendapatkan detail movie
  async function getDetailMovie() {
    // ambil id dari movie
    const trendingMovie = await getTrendingMovie();
    const id = trendingMovie.id;

    // fetch detail movie by id
    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
    const response = await axios(URL);

    setMovie(response.data);
  }
  
  useEffect(getDetailMovie, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.hero__left}>
          <h2 className={styles.hero__title}>{movie.title}</h2>
          <h3 className={styles.hero__genre}>{genres}</h3>
          <p className={styles.hero__description}>{movie.overview}</p>
          <Button as="a" href={trailer} target="_blank">
            Watch
          </Button>
        </div>
        <div className="hero__right">
          <img
            className={styles.hero__image}
            src={
              `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
            }
            alt="placeholder"
          />
        </div>
      </section>
    </div>
  );
}

export default Hero;
