import { Card } from "@/components/ui/card";
import { useGenreNames } from "@/hooks/useGenreNames";
import { useMoviesStore } from "@/store/useMoviesStore";
import type { Movie } from "@/types/movies";
import { formatDateYear } from "@/utils/dates";
import { useNavigate } from "@tanstack/react-router";

type Props = Readonly<{
  movie: Movie;
}>;

export function MovieCard({ movie }: Props) {
  const { genres } = useMoviesStore();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=Sem+Imagem";

  const navigate = useNavigate();

  const { genreString } = useGenreNames(movie.genre_ids, genres);

  return (
    <Card
      className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all w-48 cursor-pointer"
      noPaddingTop
      onClick={() =>
        navigate({ to: "/movie/$id", params: { id: movie.id.toString() } })
      }
    >
      {/* Poster */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />

        {/* Rating  */}
        {!!movie.vote_average && (
          <div className="absolute bottom-1 left-1 bg-black/80 text-white text-sm px-2 py-1 rounded-md">
            {movie.vote_average.toFixed(1)}
          </div>
        )}

        {movie.release_date && (
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-sm px-2 py-1 rounded-md">
            {formatDateYear(movie.release_date)}
          </div>
        )}
      </div>

      <div className="px-4">
        {/* Titulo */}
        <p className="text-sm font-semibold line-clamp-1">{movie.title}</p>
        {/* Gênero */}
        <p className="text-xs text-muted-foreground line-clamp-1">
          {genreString || "Não especificado"}
        </p>
      </div>
    </Card>
  );
}
