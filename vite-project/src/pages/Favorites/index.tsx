/* eslint-disable react-hooks/incompatible-library */
import { useMoviesStore } from "@/store/useMoviesStore";
import { Link } from "@tanstack/react-router";
import type { SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { createColumns } from "./createColumns";

export default function Favorites() {
  const { favoriteMovies, removeFavorite, genres } = useMoviesStore();

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => createColumns(genres, removeFavorite),
    [genres, removeFavorite],
  );

  const table = useReactTable({
    data: favoriteMovies,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="px-24 py-12">
      <div className="flex items-center justify-between mb-6">
        <Link to="/home" className="flex items-center gap-3">
          <ArrowLeft size={24} />
          <p className="text-2xl">Voltar</p>
        </Link>
      </div>

      <h1 className="text-xl font-bold mb-4">Meus Favoritos</h1>

      {favoriteMovies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">Nenhum favorito ainda</p>
          <p className="text-sm">Adicione filmes clicando no ❤️</p>
        </div>
      )}

      {favoriteMovies.length > 0 && (
        <div className="rounded-xl border overflow-hidden p-1">
          <div className="overflow-x-auto  scrollbar-thin">
            <table className="w-full">
              <thead className="bg-muted/50 sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const isSorted = header.column.getIsSorted();

                      return (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="text-left px-4 py-3 text-sm font-medium cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}

                            {isSorted === "asc" && "▲"}
                            {isSorted === "desc" && "▼"}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t hover:bg-muted/40 transition"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
