import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { router } from "./app/router";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return <RouterProvider router={router} />;
}
