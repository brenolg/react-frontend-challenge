import { Divider } from "@/components/Divider";
import { Button } from "@/components/ui/button";
import { getMovieDetails } from "@/services/movies";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams({ from: "/movie/$id" });

  const { data, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id),
  });
  console.log(data);

  // const { genreArray } = useGenreNames(movie.genre_ids, genres);
  if (isLoading) return <p>Carregando...</p>;

  const crew = data.credits.crew;

  const directors = crew
    .filter((p: any) => p.job === "Director")
    .map((p: any) => p.name)
    .join(", ");

  const writers = crew
    .filter((p: any) => p.job === "Writer" || p.job === "Screenplay")
    .map((p: any) => p.name)
    .join(", ");

  const producers = crew
    .filter((p: any) => p.job === "Producer")
    .map((p: any) => p.name)
    .join(", ");

  const studios = data.production_companies?.map((c: any) => c.name).join(", ");

  const runtime = data.runtime
    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}min`
    : null;

  const cast = data.credits.cast
    .slice(0, 10)
    .map((actor: any) => actor.name)
    .join(", ");

  function toggleFavorite() {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");

    const exists = stored.find((m: any) => m.id === data.id);

    const updated = exists
      ? stored.filter((m: any) => m.id !== data.id)
      : [...stored, data];

    localStorage.setItem("favorites", JSON.stringify(updated));
  }
  const trailer = data.videos.results.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube",
  );

  return (
    <div className="min-h-screen bg-background text-foreground px-24 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/home" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <p>Voltar</p>
        </Link>

        <Button onClick={toggleFavorite}>⭐ Favoritar</Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 order-2 lg:order-1">
          {/* Hero */}
          <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          {/* Trailer */}
          {trailer && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Trailer</h2>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 order-1 lg:order-2">
          <div>
            <h1 className="text-3xl font-bold">{data.title}</h1>

            <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
              <span>⭐ {data.vote_average.toFixed(1)}</span> |
              <p className="font-medium">{runtime}</p> |
              {/* Gêneros 
                <div className="flex gap-1 flex-wrap">
                  {genreArray.map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-0.5 bg-secondary rounded-full text-[10px]"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                */}
            </div>
            <Divider className="my-2 opacity-30" />
          </div>

          {/* Sinopse */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
            <p className="text-muted-foreground">{data.overview}</p>
          </div>
          <Divider className="my-2 opacity-30" />

          {directors && (
            <div>
              <span className="text-muted-foreground"> Direção</span>
              <p className="font-medium">{directors}</p>
            </div>
          )}
          <Divider className="my-2 opacity-30" />

          <div>
            <h2 className="text-xl font-semibold mb-2">Elenco</h2>
            <p className="text-muted-foreground">{cast}</p>
          </div>
          <Divider className="my-2 opacity-30" />

          {writers && (
            <div>
              <span className="text-muted-foreground"> Roteiro</span>
              <p className="font-medium">{writers}</p>
            </div>
          )}

          {producers && (
            <div>
              <span className="text-muted-foreground"> Produção</span>
              <p className="font-medium">{producers}</p>
            </div>
          )}

          {studios && (
            <div>
              <span className="text-muted-foreground"> Estúdio</span>
              <p className="font-medium">{studios}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
