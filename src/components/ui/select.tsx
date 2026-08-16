import { useState, useRef, useEffect } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = "Selecione...",
  label,
  error,
  disabled,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find((o) => o.value === value)?.label;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full mb-1 relative" ref={ref}>
      {label && (
        <label className="block text-[13px] font-semibold mb-2 text-foreground tracking-wide">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        className={`flex items-center justify-between h-12 w-full rounded-xl border-[1.5px] border-border/60 bg-white px-4 py-3 text-sm text-left transition-colors cursor-pointer ${error ? "border-destructive" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className={selectedLabel ? "text-foreground" : "text-muted-foreground/60"}>
          {selectedLabel || placeholder}
        </span>
        <svg className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {error && (
        <p className="text-xs text-destructive mt-1.5 font-medium">{error}</p>
      )}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-xl border border-border shadow-lg max-h-64 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange?.(option.value);
                setOpen(false);
              }}
              className={`flex items-center justify-between w-full px-5 py-4 text-sm text-left border-b border-border/20 last:border-0 hover:bg-terracotta-50 transition-colors cursor-pointer ${option.value === value ? "bg-terracotta-50 font-medium" : ""}`}
            >
              <span className="text-foreground">{option.label}</span>
              {option.value === value && (
                <svg className="w-5 h-5 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export type { SelectOption };
