import { Card } from "@/components/ui/card";
import { useGenreNames } from "@/hooks/useGenreNames";
import type { Genre, Movie } from "@/types/movies";
import { formatDateYear } from "@/utils/dates";

type Props = Readonly<{
  movie: Movie;
  genres: Genre[];
}>;

export function MovieCard({ movie, genres }: Props) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const genreNames = useGenreNames(movie.genre_ids, genres);
  return (
    <Card
      className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all w-48"
      noPaddingTop
    >
      {/* Poster */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />

        {/* Rating  */}
        <div className="absolute bottom-1 left-1 bg-black/80 text-white text-sm px-2 py-1 rounded-md">
          {movie.vote_average.toFixed(1)}
        </div>
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-sm px-2 py-1 rounded-md">
          {formatDateYear(movie.release_date)}
        </div>
      </div>

      <div className="px-4">
        {/* Titulo */}
        <p className="text-sm font-semibold line-clamp-1">{movie.title}</p>
        {/* Gênero */}
        <p className="text-xs text-muted-foreground line-clamp-1">
          {genreNames}
        </p>
      </div>
    </Card>
  );
}
