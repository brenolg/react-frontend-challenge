import { ThemeSwitch } from "@/components/ThemeSwitch";
import { useNavigate } from "@tanstack/react-router";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="relative flex items-center h-16 px-6">
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl  font-bold">
          The Movies App
        </h1>

        <div className="ml-auto flex items-center gap-4">
          <ThemeSwitch />

          <button
            onClick={() => navigate({ to: "/favorites" })}
            className="px-3 py-2 text-sm border rounded-md hover:bg-muted transition"
          >
            ❤️ Favoritos
          </button>
        </div>
      </div>
    </header>
  );
}
