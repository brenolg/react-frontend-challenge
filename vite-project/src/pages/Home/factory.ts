export type Option<T = string> = {
  label: string;
  value: T;
};

export function createOptions<T>(
  items: T[],
  getLabel: (item: T) => string,
  getValue: (item: T) => string,
): Option[] {
  return items.map((item) => ({
    label: getLabel(item),
    value: getValue(item),
  }));
}

export function createOptionsWithAll<T>(
  items: T[],
  getLabel: (item: T) => string,
  getValue: (item: T) => string,
  allLabel = "Todos",
): Option[] {
  return [
    { label: allLabel, value: "all" },
    ...createOptions(items, getLabel, getValue),
  ];
}

//Gêneros
export function createGenreOptions(
  genres: { id: number; name: string }[],
): Option[] {
  return createOptionsWithAll(
    genres,
    (g) => g.name,
    (g) => String(g.id),
    "Todos os gêneros",
  );
}

// Anos
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
export function createYearOptions(): Option[] {
  return createOptionsWithAll(years, (y) => `Ano ${y}`, String, "Qualquer ano");
}

//  Rating
export function createRatingOptions(): Option[] {
  const ratings = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  return createOptionsWithAll(
    ratings,
    (r) => `⭐ ${r}+`,
    String,
    "Qualquer avaliação",
  );
}
