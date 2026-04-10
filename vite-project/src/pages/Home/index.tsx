import { MovieCard } from "@/components/MovieCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import {
  discoverMovies,
  getGenres,
  getPopularMovies,
  searchMovies,
} from "@/services/movies";
import { useMoviesStore } from "@/store/useMoviesStore";
import type { Movie } from "@/types/movies";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const { popularMovies, genres } = useMoviesStore();
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | "all">("all");
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
  });

  const { data: searchData, isFetching: isSearching } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchMovies(debouncedSearch),
    enabled: !!debouncedSearch,
  });

  const { data: discoverData, isFetching: isFiltering } = useQuery({
    queryKey: ["discover", selectedGenre],
    queryFn: () =>
      discoverMovies({
        genreId: selectedGenre === "all" ? undefined : selectedGenre,
      }),
    enabled: selectedGenre !== "all", //
  });

  const initialLoading = results.some((q) => q.isPending);
  const hasError = results.some((q) => q.error);
  const isGlobalLoading = initialLoading || isSearching || isFiltering;

  if (hasError) return <p>Erro ao carregar</p>;

  if (!genres || !popularMovies) return null;

  function getMoviesToShow() {
    if (selectedGenre !== "all" && discoverData) {
      return discoverData.results;
    }
    if (debouncedSearch && searchData) {
      return searchData.results;
    }
    return popularMovies;
  }

  const moviesToShow = getMoviesToShow();
  console.log(moviesToShow);

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Buscar filmes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <Select
        value={selectedGenre === "all" ? "all" : String(selectedGenre)}
        onValueChange={(value) =>
          setSelectedGenre(value === "all" ? "all" : Number(value))
        }
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecione um gênero" />
        </SelectTrigger>

        <SelectContent className="z-50 bg-background">
          <SelectItem value="all">Todos</SelectItem>

          {genres.map((genre) => (
            <SelectItem key={genre.id} value={String(genre.id)}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isGlobalLoading && <p>Filtrando...</p>}

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
