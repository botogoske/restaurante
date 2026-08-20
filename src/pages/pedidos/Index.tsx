import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const pedidos = [
  { id: 1, cliente: "Maria Santos", mesa: 3, prato: "Filé Mignon ao Molho", quantidade: 1, total: "R$ 45,90", status: "Em preparo" },
  { id: 2, cliente: "João Silva", mesa: 7, prato: "Salmão Grelhado", quantidade: 2, total: "R$ 105,80", status: "Entregue" },
  { id: 3, cliente: "Ana Oliveira", mesa: 1, prato: "Risoto de Camarão", quantidade: 1, total: "R$ 48,90", status: "Aguardando" },
  { id: 4, cliente: "Carlos Mendes", mesa: 5, prato: "Bruschetta Caprese", quantidade: 3, total: "R$ 68,70", status: "Em preparo" },
  { id: 5, cliente: "Fernanda Lima", mesa: 2, prato: "Petit Gâteau", quantidade: 2, total: "R$ 57,80", status: "Entregue" },
  { id: 6, cliente: "Roberto Costa", mesa: 9, prato: "X-Tudo Artesanal", quantidade: 1, total: "R$ 32,90", status: "Cancelado" },
];

const statusConfig: Record<string, { variant: "warning" | "success" | "terracotta" | "secondary"; label: string }> = {
  "Aguardando":  { variant: "warning",    label: "Aguardando" },
  "Em preparo":  { variant: "terracotta", label: "Em preparo" },
  "Entregue":    { variant: "success",    label: "Entregue" },
  "Cancelado":   { variant: "secondary",  label: "Cancelado" },
};

const statusColors: Record<string, { text: string; bg: string }> = {
  "Aguardando":  { text: "hsl(38 92% 35%)",  bg: "hsl(45 90% 96%)" },
  "Em preparo":  { text: "hsl(15 70% 35%)",  bg: "hsl(15 40% 96%)" },
  "Entregue":    { text: "hsl(150 45% 32%)", bg: "hsl(150 30% 96%)" },
  "Cancelado":   { text: "hsl(0 0% 45%)",    bg: "hsl(0 0% 96%)" },
};

function OrderIcon({ status }: { status: string }) {
  if (status === "Aguardando") {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (status === "Em preparo") {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
      </svg>
    );
  }
  if (status === "Entregue") {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  // Cancelado
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          const sc = statusColors[pedido.status] || statusColors["Aguardando"];
          const st = statusConfig[pedido.status] || statusConfig["Aguardando"];
          return (
            <Card key={pedido.id} variant="default" className="hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: sc.bg, color: sc.text }}
                  >
                    <OrderIcon status={pedido.status} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[15px] font-semibold text-foreground tracking-tight truncate">
                        {pedido.cliente}
                      </h3>
                    </div>
                    <p className="text-[13px] text-muted-foreground line-clamp-2 leading-5">
                      {pedido.prato}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/20 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Total</p>
                    <p className="text-[14px] font-bold text-foreground">{pedido.total}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Mesa</p>
                    <p className="text-[14px] font-semibold text-foreground">Mesa {pedido.mesa}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Status</p>
                    <Badge variant={st.variant}>
                      {st.label}
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
