import { useMemo } from "react";

type Genre = {
  id: number;
  name: string;
};

export function useGenreNames(genreIds: number[], genres: Genre[]) {
  return useMemo(() => {
    const genreMap = new Map(genres.map((g) => [g.id, g.name]));

    const genreList = genreIds
      .map((id) => genreMap.get(id))
      .filter((name): name is string => Boolean(name));

    return {
      genreString: genreList.join(", "),
      genreArray: genreList,
    };
  }, [genreIds, genres]);
}
