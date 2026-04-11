import { MovieCard } from "@/components/MovieCard";
import { useMoviesStore } from "@/store/useMoviesStore";

export default function Favorites() {
  const { favoriteMovies } = useMoviesStore();

  if (!favoriteMovies.length) {
    return <p className="p-4">Nenhum filme favoritado ainda.</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Meus Favoritos</h1>

      <div className="flex flex-wrap gap-4">
        {favoriteMovies.map((movie) => (
          <div key={movie.id} className="w-48">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
