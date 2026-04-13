import * as React from "react";

import { cn } from "@/lib/utils";
type InputProps = React.ComponentProps<"input"> & {
  variant?: "default" | "ghost";
};

function Input({ className, type, variant = "default", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-input px-2.5 py-1 text-base transition-colors outline-none",

        variant === "default" && "bg-white text-black dark:bg-input",
        variant === "ghost" && "bg-transparent text-foreground",

        "placeholder:text-foreground",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        "md:text-sm",

        className,
      )}
      {...props}
    />
  );
}

export { Input };
