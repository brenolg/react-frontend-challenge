import { useMoviesStore } from "@/store/useMoviesStore";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
  params: {
    language: "pt-BR",
  },
});

export async function getGenres() {
  const response = await api.get("/genre/movie/list");

  useMoviesStore.getState().setGenres(response.data.genres);

  return response.data;
}

export async function getPopularMovies() {
  const response = await api.get("/movie/popular");

  useMoviesStore.getState().setPopularMovies(response.data.results);

  return response.data;
}

export async function getMovieDetails(id: string) {
  const response = await api.get(`/movie/${id}`, {
    params: {
      append_to_response: "credits,videos",
    },
  });

  return response.data;
}

export async function searchMovies(query: string) {
  const response = await api.get("/search/movie", {
    params: {
      query,
    },
  });

  return response.data;
}

export type DiscoverFilters = {
  genreId?: number;
  year?: number;
  minRating?: number;
};

export async function discoverMovies(filters: DiscoverFilters) {
  const params = new URLSearchParams();

  if (filters.genreId) params.append("with_genres", String(filters.genreId));

  if (filters.year) params.append("primary_release_year", String(filters.year));

  if (filters.minRating)
    params.append("vote_average.gte", String(filters.minRating));

  const response = await api.get("/discover/movie", {
    params,
  });

  return response.data;
}
