

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Separator({ orientation = "horizontal", className = "" }: SeparatorProps) {
  return (
    <div
      className={`bg-border/30 ${orientation === "horizontal" ? "h-px w-full" : "w-px h-full"} ${className}`}
    />
  );
}
