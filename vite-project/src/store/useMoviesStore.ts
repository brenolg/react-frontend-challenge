import type { Genre, Movie } from "@/types/movies";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";

type MoviesStore = {
  genres: Genre[];
  popularMovies: Movie[];
  favoriteMovies: Movie[];

  setGenres: (genres: Genre[]) => void;
  setPopularMovies: (movies: Movie[]) => void;

  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;

  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useMoviesStore = create<MoviesStore>()(
  persist(
    (set, get) => ({
      genres: [],
      popularMovies: [],

      favoriteMovies: [],

      setGenres: (genres) => set({ genres }),
      setPopularMovies: (movies) => set({ popularMovies: movies }),

      addFavorite: (movie) =>
        set((state) => ({
          favoriteMovies: [...state.favoriteMovies, movie],
        })),

      removeFavorite: (movieId) =>
        set((state) => ({
          favoriteMovies: state.favoriteMovies.filter((m) => m.id !== movieId),
        })),

      toggleFavorite: (movie) => {
        const exists = get().favoriteMovies.some((m) => m.id === movie.id);

        set((state) => ({
          favoriteMovies: exists
            ? state.favoriteMovies.filter((m) => m.id !== movie.id)
            : [...state.favoriteMovies, movie],
        }));
      },

      theme: "dark",

      setTheme: (theme) => set({ theme }),

      toggleTheme: () => {
        const current = get().theme;
        set({ theme: current === "dark" ? "light" : "dark" });
      },
    }),
    {
      name: "movies-storage",

      partialize: (state) => ({
        favoriteMovies: state.favoriteMovies,
        genres: state.genres,
        theme: state.theme,
      }),
    },
  ),
);
