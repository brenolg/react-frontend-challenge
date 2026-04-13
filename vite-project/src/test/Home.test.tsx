import Home from "@/pages/Home";
import * as moviesService from "@/services/movies";
import type { Movie } from "@/types/movies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/movies", () => ({
  getGenres: vi.fn(),
  getPopularMovies: vi.fn(),
  searchMovies: vi.fn(),
  discoverMovies: vi.fn(),
}));

vi.mock("@/store/useMoviesStore", () => ({
  useMoviesStore: () => ({
    genres: [{ id: 1, name: "Ação" }],
    popularMovies: [
      { id: 1, title: "Filme 1" },
      { id: 2, title: "Filme 2" },
    ],
  }),
}));

vi.mock("@/components/Header", () => ({
  Header: () => <div>Header</div>,
}));

vi.mock("@/components/MovieCard", () => ({
  MovieCard: ({ movie }: { movie: Movie }) => <div>{movie.title}</div>,
}));

vi.mock("@/components/Spinner", () => ({
  Spinner: () => <div>Loading...</div>,
}));

vi.mock("@/hooks/useDebounce", () => ({
  useDebounce: (value: string) => value,
}));

function renderWithClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>,
  );
}

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(moviesService.getGenres).mockResolvedValue({
      genres: [{ id: 1, name: "Ação" }],
    });

    vi.mocked(moviesService.getPopularMovies).mockResolvedValue({
      results: [
        { id: 1, title: "Filme 1" } as Movie,
        { id: 2, title: "Filme 2" } as Movie,
      ],
    });
  });

  it("deve renderizar header", () => {
    renderWithClient();

    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("deve renderizar filmes populares", async () => {
    renderWithClient();

    expect(await screen.findByText("Filme 1")).toBeInTheDocument();
    expect(await screen.findByText("Filme 2")).toBeInTheDocument();
  });

  it("deve mostrar loading enquanto carrega", () => {
    vi.mocked(moviesService.getPopularMovies).mockImplementation(
      () => new Promise<never>(() => {}),
    );

    renderWithClient();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("deve mostrar erro quando falhar", async () => {
    vi.mocked(moviesService.getGenres).mockRejectedValue(new Error("Erro"));

    renderWithClient();

    expect(await screen.findByText("Erro ao carregar")).toBeInTheDocument();
  });
});
