export function formatDateYear(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
  });
}
