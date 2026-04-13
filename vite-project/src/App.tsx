import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { router } from "./app/router";
import { useMoviesStore } from "@/store/useMoviesStore";

export default function App() {
  const theme = useMoviesStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <RouterProvider router={router} />;
}
