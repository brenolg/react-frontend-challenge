import { FilterSelect } from "@/components/form/FilterSelect";
import { MovieCard } from "@/components/MovieCard";
import { Input } from "@/components/ui/input";
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
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  createGenreOptions,
  createRatingOptions,
  createYearOptions,
} from "./factory";

export default function Home() {
  const { popularMovies, genres } = useMoviesStore();
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();

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
    queryKey: ["discover", selectedGenre, year, minRating],
    queryFn: () =>
      discoverMovies({
        genreId: selectedGenre ?? null,
        year: year ?? null,
        minRating: minRating ?? null,
      }),
    enabled: selectedGenre != null || year != null || minRating != null,
  });

  const initialLoading = results.some((q) => q.isPending);
  const hasError = results.some((q) => q.error);
  const isGlobalLoading = initialLoading || isSearching || isFiltering;

  if (hasError) return <p>Erro ao carregar</p>;

  if (!genres || !popularMovies) return null;

  function getMoviesToShow() {
    if (debouncedSearch && searchData) {
      return searchData.results;
    }
    if (
      (selectedGenre != null || year != null || minRating != null) &&
      discoverData
    ) {
      return discoverData.results;
    }

    return popularMovies;
  }

  const moviesToShow = getMoviesToShow();

  console.log(moviesToShow);

  const genreOptions = createGenreOptions(genres);
  const yearOptions = createYearOptions();
  const ratingOptions = createRatingOptions();

  return (
    <div className="space-y-4">
      <div>
        <button onClick={() => navigate({ to: "/favorites" })}>
          Favoritos
        </button>
      </div>
      <Input
        type="text"
        placeholder="Buscar filmes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <FilterSelect
        value={minRating}
        onChange={setMinRating}
        options={ratingOptions}
        placeholder="Nota mínima"
        className="w-[140px]"
      />
      <FilterSelect
        value={year}
        onChange={setYear}
        options={yearOptions}
        placeholder="Ano"
        className="w-[120px]"
      />

      <FilterSelect
        value={selectedGenre}
        onChange={setSelectedGenre}
        options={genreOptions}
        placeholder="Selecione um gênero"
        className="w-[200px]"
      />

      {isGlobalLoading && <p>Filtrando...</p>}

      {!isGlobalLoading && (
        <div className="flex flex-wrap gap-4">
          {moviesToShow.map((movie: Movie) => (
            <div className="w-48" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
