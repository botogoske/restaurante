import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const clientes = [
  { id: 1, nome: "Maria Santos", email: "maria@email.com", telefone: "(11) 99999-1111", cpf: "123.456.789-00", ativo: true },
  { id: 2, nome: "João Silva", email: "joao@email.com", telefone: "(11) 98888-2222", cpf: "234.567.890-11", ativo: true },
  { id: 3, nome: "Ana Oliveira", email: "ana@email.com", telefone: "(11) 97777-3333", cpf: "345.678.901-22", ativo: true },
  { id: 4, nome: "Carlos Pereira", email: "carlos@email.com", telefone: "(11) 96666-4444", cpf: "456.789.012-33", ativo: false },
  { id: 5, nome: "Fernanda Lima", email: "fernanda@email.com", telefone: "(11) 95555-5555", cpf: "567.890.123-44", ativo: true },
  { id: 6, nome: "Roberto Almeida", email: "roberto@email.com", telefone: "(11) 94444-6666", cpf: "678.901.234-55", ativo: true },
  { id: 7, nome: "Patrícia Costa", email: "patricia@email.com", telefone: "(11) 93333-7777", cpf: "789.012.345-66", ativo: true },
];

const initials = (nome: string) =>
  nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export default function Clientes() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1.5">Clientes</h1>
          <p className="text-[15px] text-muted-foreground">
            {clientes.length} clientes cadastrados
          </p>
        </div>
        <Button onClick={() => navigate("/clientes/novo")}>
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clientes.map((c) => (
          <Card key={c.id} variant="default" className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    backgroundColor: c.ativo ? "hsl(15 40% 96%)" : "hsl(35 25% 95%)",
                    color: c.ativo ? "hsl(15 60% 55%)" : "hsl(20 10% 45%)",
                  }}
                >
                  {initials(c.nome)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15px] font-semibold text-foreground tracking-tight truncate">
                      {c.nome}
                    </h3>
                    <Badge variant={c.ativo ? "success" : "secondary"}>
                      {c.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <p className="text-[13px] text-muted-foreground truncate">{c.email}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/20 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Telefone</p>
                  <p className="text-[13px] font-medium text-foreground">{c.telefone}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">CPF</p>
                  <p className="text-[13px] font-medium text-foreground">{c.cpf}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
