import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = "", ...props }, ref) => {
    return (
      <div className="w-full mb-1">
        {label && (
          <label className="block text-[13px] font-semibold mb-2 text-foreground tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`min-h-[100px] w-full rounded-xl border-[1.5px] border-border/60 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/12 transition-colors resize-y ${error ? "border-destructive focus:border-destructive focus:ring-destructive/12" : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive mt-1.5 font-medium">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
