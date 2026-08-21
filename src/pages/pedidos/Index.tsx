import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ItemPedido {
  nome: string;
  quantidade: number;
  preco: string;
}

interface Pedido {
  id: number;
  cliente: string;
  mesa: number;
  itens: ItemPedido[];
  total: string;
  status: "Aguardando" | "Em preparo" | "Entregue" | "Cancelado";
  horario: string;
}

const pedidos: Pedido[] = [
  {
    id: 1,
    cliente: "Maria Santos",
    mesa: 3,
    itens: [
      { nome: "Filé Mignon ao Molho", quantidade: 1, preco: "R$ 45,90" },
      { nome: "Suco Natural de Laranja", quantidade: 2, preco: "R$ 19,80" },
    ],
    total: "R$ 65,70",
    status: "Em preparo",
    horario: "19:32",
  },
  {
    id: 2,
    cliente: "João Silva",
    mesa: 7,
    itens: [
      { nome: "Salmão Grelhado", quantidade: 2, preco: "R$ 105,80" },
    ],
    total: "R$ 105,80",
    status: "Entregue",
    horario: "18:50",
  },
  {
    id: 3,
    cliente: "Ana Oliveira",
    mesa: 1,
    itens: [
      { nome: "Bruschetta Caprese", quantidade: 1, preco: "R$ 22,90" },
      { nome: "Risoto de Camarão", quantidade: 1, preco: "R$ 48,90" },
      { nome: "Petit Gâteau", quantidade: 1, preco: "R$ 28,90" },
    ],
    total: "R$ 100,70",
    status: "Aguardando",
    horario: "20:05",
  },
  {
    id: 4,
    cliente: "Carlos Mendes",
    mesa: 5,
    itens: [
      { nome: "Bruschetta Caprese", quantidade: 3, preco: "R$ 68,70" },
    ],
    total: "R$ 68,70",
    status: "Em preparo",
    horario: "19:48",
  },
  {
    id: 5,
    cliente: "Fernanda Lima",
    mesa: 2,
    itens: [
      { nome: "Petit Gâteau", quantidade: 2, preco: "R$ 57,80" },
      { nome: "Suco Natural de Laranja", quantidade: 2, preco: "R$ 19,80" },
    ],
    total: "R$ 77,60",
    status: "Entregue",
    horario: "18:15",
  },
  {
    id: 6,
    cliente: "Roberto Costa",
    mesa: 9,
    itens: [
      { nome: "X-Tudo Artesanal", quantidade: 1, preco: "R$ 32,90" },
    ],
    total: "R$ 32,90",
    status: "Cancelado",
    horario: "20:10",
  },
];

const statusConfig: Record<Pedido["status"], { variant: "warning" | "success" | "terracotta" | "secondary"; label: string; text: string; bg: string }> = {
  "Aguardando": { variant: "warning",    label: "Aguardando", text: "hsl(38 92% 35%)",  bg: "hsl(45 90% 96%)" },
  "Em preparo": { variant: "terracotta", label: "Em preparo", text: "hsl(15 70% 35%)",  bg: "hsl(15 40% 96%)" },
  "Entregue":   { variant: "success",    label: "Entregue",   text: "hsl(150 45% 32%)", bg: "hsl(150 30% 96%)" },
  "Cancelado":  { variant: "secondary",  label: "Cancelado",  text: "hsl(0 0% 45%)",    bg: "hsl(0 0% 96%)" },
};

function MesaIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M3 14h18M10 6v12M14 6v12" />
    </svg>
  );
}

export default function Pedidos() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1.5">Pedidos</h1>
          <p className="text-[15px] text-muted-foreground">
            {pedidos.length} pedidos registrados
          </p>
        </div>
        <Button onClick={() => navigate("/pedidos/novo")}>
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Pedido
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pedidos.map((pedido) => {
          const st = statusConfig[pedido.status];
          return (
            <Card key={pedido.id} variant="default" className="hover:shadow-md transition-shadow">
              <CardContent>
                {/* Header: mesa + status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: st.bg, color: st.text }}
                    >
                      <MesaIcon />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-foreground leading-tight">Mesa {pedido.mesa}</p>
                      <p className="text-[12px] text-muted-foreground">{pedido.cliente}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={st.variant}>{st.label}</Badge>
                    <span className="text-[11px] text-muted-foreground">{pedido.horario}</span>
                  </div>
                </div>

                {/* Itens do pedido */}
                <div className="space-y-1.5 py-3 border-t border-b border-border/20">
                  {pedido.itens.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: st.bg, color: st.text }}
                        >
                          {item.quantidade}
                        </span>
                        <span className="text-[13px] text-foreground truncate">{item.nome}</span>
                      </div>
                      <span className="text-[13px] text-muted-foreground flex-shrink-0 ml-2">{item.preco}</span>
                    </div>
                  ))}
                </div>

                {/* Rodapé: total */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                    {pedido.itens.reduce((sum, i) => sum + i.quantidade, 0)} {pedido.itens.reduce((sum, i) => sum + i.quantidade, 0) === 1 ? "item" : "itens"}
                  </p>
                  <p className="text-[15px] font-bold text-foreground">{pedido.total}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
