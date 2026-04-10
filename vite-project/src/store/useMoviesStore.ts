import type { Genre, Movie } from "@/types/movies";
import { create } from "zustand";

type MoviesStore = {
  genres: Genre[];
  popularMovies: Movie[];

  setGenres: (genres: Genre[]) => void;
  setPopularMovies: (movies: Movie[]) => void;
};

export const useMoviesStore = create<MoviesStore>((set) => ({
  genres: [],
  popularMovies: [],

  setGenres: (genres) => set({ genres }),
  setPopularMovies: (movies) => set({ popularMovies: movies }),
}));
