import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const pratos = [
  { id: 1, nome: "Filé Mignon ao Molho", descricao: "Filé mignon grelhado com molho madeira e batatas rústicas", preco: "R$ 45,90", categoria: "Principal", disponivel: true },
  { id: 2, nome: "Salmão Grelhado", descricao: "Salmão fresco com legumes assados e molho de maracujá", preco: "R$ 52,90", categoria: "Principal", disponivel: true },
  { id: 3, nome: "Risoto de Camarão", descricao: "Risoto cremoso com camarões grelhados e finalizado com parmesão", preco: "R$ 48,90", categoria: "Principal", disponivel: true },
  { id: 4, nome: "Bruschetta Caprese", descricao: "Pão italiano com tomate, mozzarella de búfala e manjericão", preco: "R$ 22,90", categoria: "Entrada", disponivel: true },
  { id: 5, nome: "Creme de Abóbora", descricao: "Creme velvety de abóbora cabotiá com croutons e gergelim", preco: "R$ 18,90", categoria: "Entrada", disponivel: false },
  { id: 6, nome: "Petit Gâteau", descricao: "Bolo de chocolate belga com sorvete de baunilha e calda de frutas vermelhas", preco: "R$ 28,90", categoria: "Sobremesa", disponivel: true },
  { id: 7, nome: "Suco Natural de Laranja", descricao: "Laranja fresca espremida na hora, 400ml", preco: "R$ 9,90", categoria: "Bebida", disponivel: true },
  { id: 8, nome: "X-Tudo Artesanal", descricao: "Pão brioche, hambúrguer 180g, queijo cheddar, bacon crocante e molho especial", preco: "R$ 32,90", categoria: "Lanche", disponivel: true },
];

const categoriaColors: Record<string, { text: string; bg: string }> = {
  Entrada: { text: "hsl(65 32% 42%)", bg: "hsl(90 20% 96%)" },
  Principal: { text: "hsl(15 70% 35%)", bg: "hsl(15 40% 96%)" },
  Sobremesa: { text: "hsl(15 60% 55%)", bg: "hsl(15 40% 96%)" },
  Bebida: { text: "hsl(60 35% 35%)", bg: "hsl(90 20% 96%)" },
  Lanche: { text: "hsl(30 65% 42%)", bg: "hsl(40 40% 96%)" },
};

const categoriaIcons: Record<string, React.ReactNode> = {
  Entrada: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  ),
  Principal: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h18v18H3zM8 12h8M12 8v8" />
    </svg>
  ),
  Sobremesa: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 003 16.5v-1.23a1 1 0 01.658-.942l2.342-.936a2 2 0 001.342-1.878l.1-.8A6 6 0 0112 3a6 6 0 014.8 2.8l.1.8a2 2 0 001.342 1.878l2.342.936a1 1 0 01.658.942V16.5z" />
    </svg>
  ),
  Bebida: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 21h8m-4-4v4m-4-8a4 4 0 01-4-4V4a1 1 0 011-1h10a1 1 0 011 1v5a4 4 0 01-4 4zm-4 0h8" />
    </svg>
  ),
  Lanche: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
};

export default function Pratos() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1.5">Pratos</h1>
          <p className="text-[15px] text-muted-foreground">
            {pratos.length} pratos cadastrados
          </p>
        </div>
        <Button onClick={() => navigate("/pratos/novo")}>
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Prato
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pratos.map((prato) => {
          const cat = categoriaColors[prato.categoria] || categoriaColors.Principal;
          return (
            <Card key={prato.id} variant="default" className="hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: cat.bg, color: cat.text }}
                  >
                    {categoriaIcons[prato.categoria]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[15px] font-semibold text-foreground tracking-tight truncate">
                        {prato.nome}
                      </h3>
                    </div>
                    <p className="text-[13px] text-muted-foreground line-clamp-2 leading-5">
                      {prato.descricao}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/20 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Preço</p>
                    <p className="text-[14px] font-bold text-foreground">{prato.preco}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Categoria</p>
                    <Badge variant="outline" className="text-[11px] mt-0.5">
                      {prato.categoria}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Status</p>
                    <Badge variant={prato.disponivel ? "success" : "secondary"}>
                      {prato.disponivel ? "Disponível" : "Indisponível"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
