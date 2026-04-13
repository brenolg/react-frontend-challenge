import { FilterSelect } from "@/components/form/FilterSelect";
import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { Spinner } from "@/components/Spinner";
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
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const [page, setPage] = useState(1);

  const results = useQueries({
    queries: [
      {
        queryKey: ["genres"],
        queryFn: getGenres,
      },
      {
        queryKey: ["movies", page],
        queryFn: () => getPopularMovies(page),
        placeholderData: (prev: { results: Movie[] } | undefined) => prev,
      },
    ],
  });

  const { data: searchData, isFetching: isSearching } = useQuery({
    queryKey: ["search", debouncedSearch, page],
    queryFn: () =>
      searchMovies({
        query: debouncedSearch,
        page,
      }),
    enabled: debouncedSearch.trim().length > 0,
    placeholderData: (prev) => prev,
  });

  const { data: discoverData, isFetching: isFiltering } = useQuery({
    queryKey: ["discover", selectedGenre, year, minRating, page],
    queryFn: () =>
      discoverMovies({
        genreId: selectedGenre ?? null,
        year: year ?? null,
        minRating: minRating ?? null,
        page,
      }),
    enabled: selectedGenre != null || year != null || minRating != null,
    placeholderData: (prev) => prev,
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
    <>
      <Header />
      <div className="px-24 pb-12">
        {/* Filtros */}
        <div className="pb-8 pt-10 flex flex-wrap justify-center items-center gap-4">
          <Input
            type="text"
            placeholder="Buscar filmes..."
            value={search}
            variant="ghost"
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-[260px] p-2 border rounded-md"
          />
          <FilterSelect
            value={minRating}
            onChange={(value) => {
              setMinRating(value);
              setPage(1);
            }}
            options={ratingOptions}
            placeholder="Nota mínima"
            className="w-[160px]"
          />

          <FilterSelect
            value={year}
            onChange={(value) => {
              setYear(value);
              setPage(1);
            }}
            options={yearOptions}
            placeholder="Ano"
            className="w-[140px]"
          />

          <FilterSelect
            value={selectedGenre}
            onChange={(value) => {
              setSelectedGenre(value);
              setPage(1);
            }}
            options={genreOptions}
            placeholder="Gênero"
            className="w-[220px]"
          />
        </div>

        {isGlobalLoading && (
          <div className="flex justify-center py-10">
            <Spinner size="lg" />
          </div>
        )}

        {!isGlobalLoading && (
          <>
            <div className="flex flex-wrap gap-4 justify-center">
              {moviesToShow.map((movie: Movie) => (
                <div className="w-48" key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
            {/* Paginação */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2  disabled:opacity-50 flex justify-center items-center gap-2"
              >
                <ArrowLeft size={12} /> Anterior
              </button>

              <span className="text-sm">Página {page}</span>

              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 flex justify-center items-center gap-2"
              >
                Próxima <ArrowRight size={12} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
