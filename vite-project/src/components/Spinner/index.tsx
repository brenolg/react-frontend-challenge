import { cn } from "@/lib/utils";

type Props = Readonly<{
  className?: string;
  size?: "sm" | "md" | "lg";
}>;

export function Spinner({ className, size = "md" }: Props) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-4",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-muted border-t-primary",
        sizes[size],
        className,
      )}
    />
  );
}
