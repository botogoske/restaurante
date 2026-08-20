import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const cardapios = [
  { id: 1, nome: "Cardápio Principal", descricao: "Opções completas para almoço e jantar", periodo: "Todos os dias", itens: 24, ativo: true },
  { id: 2, nome: "Cardápio Executivo", descricao: "Pratos rápidos para o horário do almoço", periodo: "Seg a Sex", itens: 12, ativo: true },
  { id: 3, nome: "Cardápio de Fim de Semana", descricao: "Seleção especial para sábado e domingo", periodo: "Sáb e Dom", itens: 18, ativo: true },
  { id: 4, nome: "Cardápio de Inverno", descricao: "Receitas especiais da estação", periodo: "Temporário", itens: 9, ativo: false },
];

const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export default function Cardapios() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1.5">Cardápios</h1>
          <p className="text-[15px] text-muted-foreground">
            {cardapios.length} cardápios cadastrados
          </p>
        </div>
        <Button onClick={() => navigate("/cardapio/novo")}>
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Cardápio
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cardapios.map((cardapio) => (
          <Card key={cardapio.id} variant="default" className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: cardapio.ativo ? "hsl(90 20% 96%)" : "hsl(35 25% 95%)",
                    color: cardapio.ativo ? "hsl(60 35% 35%)" : "hsl(20 10% 45%)",
                  }}
                >
                  <BookIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15px] font-semibold text-foreground tracking-tight truncate">
                      {cardapio.nome}
                    </h3>
                    <Badge variant={cardapio.ativo ? "success" : "secondary"}>
                      {cardapio.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <p className="text-[13px] text-muted-foreground line-clamp-2 leading-5">{cardapio.descricao}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/20 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Período</p>
                  <p className="text-[13px] font-medium text-foreground">{cardapio.periodo}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Itens</p>
                  <p className="text-[13px] font-medium text-foreground">{cardapio.itens} pratos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
