import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const menuItems = [
  { title: "Funcionários", icon: "people", route: "/funcionarios", color: "hsl(15 70% 35%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Fornecedores", icon: "business", route: "/fornecedores", color: "hsl(65 32% 42%)", bgColor: "hsl(90 20% 96%)" },
  { title: "Pratos", icon: "restaurant", route: "/pratos", color: "hsl(30 65% 42%)", bgColor: "hsl(40 40% 96%)" },
  { title: "Clientes", icon: "person", route: "/clientes/novo", color: "hsl(15 60% 55%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Cardápio", icon: "book", route: "/cardapio/novo", color: "hsl(60 35% 35%)", bgColor: "hsl(90 20% 96%)" },
  { title: "Pedidos", icon: "cart", route: "/pedidos/novo", color: "hsl(15 65% 42%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Pagamentos", icon: "card", route: "/pagamentos/novo", color: "hsl(65 32% 42%)", bgColor: "hsl(90 20% 96%)" },
];

const CardIcon = ({ name, color }: { name: string; color: string; bgColor: string }) => {
  const icons: Record<string, React.ReactNode> = {
    people: (
      <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    business: (
      <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    restaurant: (
      <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h18v18H3zM8 12h8M12 8v8" />
      </svg>
    ),
    person: (
      <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    book: (
      <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    cart: (
      <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
    card: (
      <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground font-medium mb-1">Bom dia</p>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1.5">RestauranteApp</h1>
        <p className="text-[15px] text-muted-foreground">Gerencie seu restaurante de forma simples e eficiente</p>
      </div>

      <button
        onClick={() => navigate("/pedidos/novo")}
        className="flex items-center gap-3.5 w-full bg-primary rounded-2xl p-4.5 mb-7 transition-all hover:opacity-95 active:scale-[0.98] cursor-pointer border-none shadow-lg shadow-primary/20"
      >
        <div className="w-12 h-12 rounded-[14px] bg-white/18 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <p className="text-base font-semibold text-white tracking-tight">Novo Pedido</p>
          <p className="text-[13px] text-white/70 leading-5">Registrar um novo pedido rapidamente</p>
        </div>
        <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <h2 className="text-base font-semibold text-foreground tracking-tight mb-4 px-0.5">Cadastros</h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(item.route)}
            className="bg-transparent border-none p-0 cursor-pointer transition-all hover:opacity-92 active:scale-[0.97]"
          >
            <Card variant="filled">
              <CardContent className="flex flex-col items-center py-5">
                <div
                  className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-3.5"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <CardIcon name={item.icon} color={item.color} bgColor={item.bgColor} />
                </div>
                <p className="text-sm font-semibold text-foreground tracking-tight text-center">{item.title}</p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
