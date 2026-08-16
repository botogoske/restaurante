

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "terracotta" | "sage";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-border bg-transparent text-foreground hover:bg-secondary",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "bg-transparent text-foreground hover:bg-secondary",
  terracotta: "bg-terracotta-400 text-white hover:bg-terracotta-500",
  sage: "bg-sage-500 text-white hover:bg-sage-600",
};

const sizeClasses: Record<string, string> = {
  default: "h-12 px-5 py-3 text-sm",
  sm: "h-9 px-3.5 py-2 text-xs rounded-lg",
  lg: "h-13 px-7 py-3.5 text-base",
  xl: "h-14 px-8 py-4 text-base rounded-xl",
  icon: "h-11 w-11 p-0 justify-center",
};

export function Button({
  variant = "default",
  size = "default",
  loading,
  fullWidth,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-semibold tracking-wide transition-all duration-150 active:scale-[0.98] active:opacity-92 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
