import { MovieCard } from "@/components/MovieCard";
import { getGenres, getPopularMovies } from "@/services/movies";
import type { GenresResponse, MoviesResponse } from "@/types/movies";
import { useQueries } from "@tanstack/react-query";

export default function Home() {
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

  const isLoading = results.some((q) => q.isPending);

  const hasError = results.some((q) => q.error);

  if (hasError) return <p>Erro ao carregar</p>;

  if (isLoading) return <p>Carregando...</p>;
  const genresData = results[0].data;
  const moviesData = results[1].data;

  console.log(genresData, moviesData);
  if (!genresData || !moviesData) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {moviesData.results.map((movie) => (
        <div className="w-48" key={movie.id}>
          <MovieCard movie={movie} genres={genresData.genres} />
        </div>
      ))}
    </div>
  );
}
