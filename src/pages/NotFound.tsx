
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-5">
      <div className="text-center">
        <div className="w-20 h-20 rounded-[20px] bg-terracotta-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-9 h-9 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h1 className="text-[22px] font-bold text-foreground tracking-tight mb-2">Página não encontrada</h1>
        <p className="text-[15px] text-muted-foreground leading-6">
          O conteúdo que você procura não existe ou foi movido.
        </p>
        <Button onClick={() => navigate("/")} className="mt-6">
          Voltar para o início
        </Button>
      </div>
    </div>
  );
}
