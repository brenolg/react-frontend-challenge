import { useMoviesStore } from "@/store/useMoviesStore";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const authorization = `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`;

export async function getGenres() {
  const response = await axios.get(`${API_URL}/genre/movie/list`, {
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    params: {
      language: "pt-BR",
    },
  });

  useMoviesStore.getState().setGenres(response.data.genres);

  return response.data;
}

export async function getPopularMovies() {
  const response = await fetch(`${API_URL}/movie/popular`, {
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  useMoviesStore.getState().setPopularMovies(data.results);

  return data;
}

export async function getMovieDetails(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos`,
    {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    },
  );

  return res.json();
}

export async function searchMovies(query: string) {
  const response = await fetch(
    `${API_URL}/search/movie?query=${query}&language=pt-BR`,
    {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    },
  );

  return response.json();
}
