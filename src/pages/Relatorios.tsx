import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { title: "Pedidos Hoje", value: "23", icon: "cart" as const, color: "hsl(15 70% 35%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Faturamento", value: "R$ 2.450", icon: "trending" as const, color: "hsl(65 32% 42%)", bgColor: "hsl(90 20% 96%)" },
  { title: "Clientes Ativos", value: "156", icon: "people" as const, color: "hsl(15 60% 55%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Pratos no Cardápio", value: "28", icon: "restaurant" as const, color: "hsl(30 65% 42%)", bgColor: "hsl(40 40% 96%)" },
];

const pedidos = [
  { mesa: 3, cliente: "Maria Santos", valor: "R$ 94,80", status: "Concluído" },
  { mesa: 1, cliente: "João Silva", valor: "R$ 45,90", status: "Em andamento" },
  { mesa: 5, cliente: "Ana Oliveira", valor: "R$ 101,80", status: "Em andamento" },
];

const StatIcon = ({ name, color }: { name: string; color: string }) => {
  const icons: Record<string, React.ReactNode> = {
    cart: (
      <svg className="w-[18px] h-[18px]" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
    trending: (
      <svg className="w-[18px] h-[18px]" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    people: (
      <svg className="w-[18px] h-[18px]" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    restaurant: (
      <svg className="w-[18px] h-[18px]" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h18v18H3zM8 12h8M12 8v8" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
};

export default function Relatorios() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1.5">Relatórios</h1>
        <p className="text-[15px] text-muted-foreground">Acompanhe as métricas do restaurante</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} variant="default">
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] text-muted-foreground font-medium tracking-wide">{stat.title}</span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <StatIcon name={stat.icon} color={stat.color} />
                </div>
              </div>
              <p className="text-[26px] font-bold text-foreground tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card variant="default" className="mx-0">
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {pedidos.map((pedido, index) => (
            <div
              key={index}
              className={`flex items-center justify-between py-3.5 ${index < pedidos.length - 1 ? "border-b border-border/20" : ""}`}
            >
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-foreground tracking-tight">
                  Mesa {pedido.mesa} - {pedido.cliente}
                </p>
                <p className="text-[13px] text-muted-foreground mt-0.5">{pedido.valor}</p>
              </div>
              <div className="ml-3">
                <Badge variant={pedido.status === "Concluído" ? "success" : "warning"}>
                  {pedido.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
