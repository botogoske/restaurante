

interface BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "terracotta" | "sage";
  children: React.ReactNode;
  className?: string;
}

const colors: Record<string, { bg: string; text: string; border?: string }> = {
  default: { bg: "bg-primary", text: "text-white" },
  secondary: { bg: "bg-secondary", text: "text-foreground" },
  destructive: { bg: "bg-destructive", text: "text-white" },
  outline: { bg: "bg-transparent", text: "text-foreground", border: "border-[1.5px] border-border/60" },
  success: { bg: "bg-sage-500", text: "text-white" },
  warning: { bg: "bg-amber-500", text: "text-white" },
  terracotta: { bg: "bg-terracotta-400", text: "text-white" },
  sage: { bg: "bg-sage-500", text: "text-white" },
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  const c = colors[variant];
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide ${c.bg} ${c.text} ${c.border || ""} ${className}`}
    >
      {children}
    </span>
  );
}
