type DividerProps = {
  className?: string;
};

export function Divider({ className = "" }: DividerProps) {
  return (
    <div className={`w-full h-px bg-border opacity-50 my-4 ${className}`} />
  );
}
