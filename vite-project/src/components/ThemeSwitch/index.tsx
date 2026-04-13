import { cn } from "@/lib/utils";
import { useMoviesStore } from "@/store/useMoviesStore";
import * as Switch from "@radix-ui/react-switch";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useMoviesStore();

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">☀️</span>

      <Switch.Root
        checked={isDark}
        onCheckedChange={toggleTheme}
        className={cn(
          "w-11 h-6 rounded-full relative transition-colors",
          "bg-gray-300 dark:bg-gray-700",
          "data-[state=checked]:bg-blue-600",
        )}
      >
        <Switch.Thumb
          className={cn(
            "block w-5 h-5 bg-white rounded-full shadow",
            "translate-x-0.5",
            "data-[state=checked]:translate-x-5",
            "transition-transform",
          )}
        />
      </Switch.Root>

      <span className="text-sm">🌙</span>
    </div>
  );
}
