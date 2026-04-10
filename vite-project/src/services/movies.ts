import { useMoviesStore } from "@/store/useMoviesStore";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";

export async function getGenres() {
  const response = await axios.get(`${API_URL}/genre/movie/list`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODFiZjQwZDk1M2NmMDliMTUwMzkzNDFjYjk4MjY5MiIsIm5iZiI6MTc3NTc2NDY5OC40ODE5OTk5LCJzdWIiOiI2OWQ4MDRkYTVhMzVmMWM5YWMxOTE1YjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BBbscbMIrfHV11DC48-DLvLdHDAannA0PvRSf2pAPUU`,
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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODFiZjQwZDk1M2NmMDliMTUwMzkzNDFjYjk4MjY5MiIsIm5iZiI6MTc3NTc2NDY5OC40ODE5OTk5LCJzdWIiOiI2OWQ4MDRkYTVhMzVmMWM5YWMxOTE1YjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BBbscbMIrfHV11DC48-DLvLdHDAannA0PvRSf2pAPUU`,
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODFiZjQwZDk1M2NmMDliMTUwMzkzNDFjYjk4MjY5MiIsIm5iZiI6MTc3NTc2NDY5OC40ODE5OTk5LCJzdWIiOiI2OWQ4MDRkYTVhMzVmMWM5YWMxOTE1YjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BBbscbMIrfHV11DC48-DLvLdHDAannA0PvRSf2pAPUU`,
        "Content-Type": "application/json",
      },
    },
  );

  return res.json();
}
