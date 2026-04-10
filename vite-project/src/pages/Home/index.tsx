import { MovieCard } from "@/components/MovieCard";
import { useDebounce } from "@/hooks/useDebounce";
import { getGenres, getPopularMovies, searchMovies } from "@/services/movies";
import { useMoviesStore } from "@/store/useMoviesStore";
import type { GenresResponse, Movie, MoviesResponse } from "@/types/movies";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const { popularMovies, genres } = useMoviesStore();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const results = useQueries({
    queries: [
      {
        queryKey: ["genres"],
        queryFn: getGenres,
      },
      {
        queryKey: ["movies"],
        queryFn: getPopularMovies,
      },
    ],
  }) as [
    { data: GenresResponse | undefined; isPending: boolean; error: unknown },
    { data: MoviesResponse | undefined; isPending: boolean; error: unknown },
  ];

  const { data: searchData, isFetching: isSearching } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchMovies(debouncedSearch),
    enabled: !!debouncedSearch,
  });

  const isLoading = results.some((q) => q.isPending);
  const hasError = results.some((q) => q.error);

  if (hasError) return <p>Erro ao carregar</p>;
  if (isLoading) return <p>Carregando...</p>;
  if (!genres || !popularMovies) return null;

  const moviesToShow =
    debouncedSearch && searchData ? searchData.results : popularMovies;

  console.log(moviesToShow);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      {isSearching && <p>Buscando...</p>}

      <div className="flex flex-wrap gap-4">
        {moviesToShow.map((movie: Movie) => (
          <div className="w-48" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
