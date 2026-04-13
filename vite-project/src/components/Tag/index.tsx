type Props = Readonly<{
  children: React.ReactNode;
}>;

export function Tag({ children }: Props) {
  return (
    <span className="px-3 py-1 text-xs bg-white/10 backdrop-blur rounded-full border border-white/20">
      {children}
    </span>
  );
}
