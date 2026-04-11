import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type FilterSelectProps = Readonly<{
  value: number | null;
  onChange: (value: number | null) => void;
  options: Option[];
  placeholder: string;
  className?: string;
}>;

export function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  className,
}: FilterSelectProps) {
  return (
    <Select
      value={value == null ? "all" : String(value)}
      onValueChange={(val) => onChange(val === "all" ? null : Number(val))}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="z-50 bg-background">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
