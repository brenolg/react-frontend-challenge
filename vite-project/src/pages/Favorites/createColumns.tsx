import type { Genre, Movie } from "@/types/movies";
import { formatDateYear } from "@/utils/dates";
import type { ColumnDef } from "@tanstack/react-table";

export function createColumns(
  genres: Genre[],
  removeFavorite: (id: number) => void,
): ColumnDef<Movie>[] {
  function getGenreName(ids: number[]) {
    return ids
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  }

  return [
    {
      accessorKey: "title",
      header: "Título",
    },
    {
      accessorFn: (row) => getGenreName(row.genre_ids),
      id: "genre",
      header: "Gênero",
    },
    {
      accessorKey: "release_date",
      header: "Data",
      cell: (info) => {
        const value = info.getValue() as string | undefined;
        return value ? formatDateYear(value) : "-";
      },
    },
    {
      accessorKey: "vote_average",
      header: "Rating",
      cell: (info) => {
        const value = info.getValue() as number | undefined;
        return value ? `⭐ ${value.toFixed(1)}` : "-";
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <button
          onClick={() => removeFavorite(row.original.id)}
          className="text-yellow-500 hover:underline"
        >
          Remover
        </button>
      ),
    },
  ];
}
