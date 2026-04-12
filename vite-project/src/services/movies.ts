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

export async function getPopularMovies(page: number = 1) {
  const response = await api.get("/movie/popular", {
    params: { page },
  });

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

export async function searchMovies({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}) {
  const response = await api.get("/search/movie", {
    params: {
      query,
      page,
    },
  });

  return response.data;
}

export type DiscoverFilters = {
  genreId: number | null;
  year: number | null;
  minRating: number | null;
  page?: number;
};

export async function discoverMovies(filters: DiscoverFilters) {
  const params: Record<string, string | number> = {};

  if (filters.genreId != null) {
    params.with_genres = filters.genreId;
  }

  if (filters.year != null) {
    params.primary_release_year = filters.year;
  }

  if (filters.minRating != null) {
    params["vote_average.gte"] = filters.minRating;
  }

  params.page = filters.page ?? 1;

  const response = await api.get("/discover/movie", {
    params,
  });

  return response.data;
}
