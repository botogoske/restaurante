

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "filled";
}

const variantClasses: Record<string, string> = {
  default: "bg-white border border-border shadow-sm",
  elevated: "bg-white border border-border/40 shadow-lg",
  outlined: "bg-transparent border-[1.5px] border-border/60",
  filled: "bg-secondary border-0",
};

export function Card({ children, className = "", variant = "default" }: CardProps) {
  return (
    <div className={`rounded-2xl p-5 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-lg font-semibold text-foreground tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-muted-foreground mt-1 leading-5 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center mt-4 pt-4 border-t border-border/30 ${className}`}>
      {children}
    </div>
  );
}
