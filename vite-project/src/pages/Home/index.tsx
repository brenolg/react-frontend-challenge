import { useFetch } from "@/hooks/useFetch";
import { useEffect } from "react";

export default function Home() {
  const { data, loading, error, fetchData } = useFetch({
    url: "https://api.themoviedb.org/3/movie/popular",
    config: {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODFiZjQwZDk1M2NmMDliMTUwMzkzNDFjYjk4MjY5MiIsIm5iZiI6MTc3NTc2NDY5OC40ODE5OTk5LCJzdWIiOiI2OWQ4MDRkYTVhMzVmMWM5YWMxOTE1YjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BBbscbMIrfHV11DC48-DLvLdHDAannA0PvRSf2pAPUU`,
        "Content-Type": "application/json",
      },
    },
  });
  console.log(data);

  useEffect(() => {
    fetchData({
      params: {
        language: "pt-BR",
        page: 1,
      },
    });
  }, []);
  return <h1>Home</h1>;
}
