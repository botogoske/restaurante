import { useNavigate } from "react-router-dom";

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function FormLayout({ title, children }: FormLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center px-4 py-3 border-b border-border/30 bg-background">
        <button
          onClick={() => navigate(-1)}
          className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-secondary transition-colors cursor-pointer bg-transparent border-none"
        >
          <svg className="w-[22px] h-[22px] text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[17px] font-semibold text-foreground ml-2 tracking-tight">{title}</h1>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
