import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const funcionarios = [
  { id: 1, nome: "João Silva", email: "joao@restaurante.com", cargo: "Garçom", telefone: "(11) 99999-1111", ativo: true, dataAdmissao: "15/01/2024" },
  { id: 2, nome: "Maria Santos", email: "maria@restaurante.com", cargo: "Cozinheira", telefone: "(11) 99999-2222", ativo: true, dataAdmissao: "03/03/2024" },
  { id: 3, nome: "Pedro Oliveira", email: "pedro@restaurante.com", cargo: "Gerente", telefone: "(11) 99999-3333", ativo: true, dataAdmissao: "10/06/2023" },
  { id: 4, nome: "Ana Costa", email: "ana@restaurante.com", cargo: "Caixa", telefone: "(11) 99999-4444", ativo: false, dataAdmissao: "22/08/2024" },
  { id: 5, nome: "Lucas Ferreira", email: "lucas@restaurante.com", cargo: "Cozinheiro", telefone: "(11) 99999-5555", ativo: true, dataAdmissao: "05/11/2024" },
  { id: 6, nome: "Camila Souza", email: "camila@restaurante.com", cargo: "Garçom", telefone: "(11) 99999-6666", ativo: true, dataAdmissao: "18/02/2025" },
];

const cargoColors: Record<string, string> = {
  Garçom: "hsl(15 70% 35%)",
  Cozinheira: "hsl(30 65% 42%)",
  Cozinheiro: "hsl(30 65% 42%)",
  Gerente: "hsl(65 32% 42%)",
  Caixa: "hsl(60 35% 35%)",
};

const cargoBgColors: Record<string, string> = {
  Garçom: "hsl(15 40% 96%)",
  Cozinheira: "hsl(40 40% 96%)",
  Cozinheiro: "hsl(40 40% 96%)",
  Gerente: "hsl(90 20% 96%)",
  Caixa: "hsl(90 20% 96%)",
};

const initials = (nome: string) =>
  nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export default function Funcionarios() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1.5">Funcionários</h1>
          <p className="text-[15px] text-muted-foreground">
            {funcionarios.length} funcionários cadastrados
          </p>
        </div>
        <Button onClick={() => navigate("/funcionarios/novo")}>
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Funcionário
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {funcionarios.map((func) => (
          <Card key={func.id} variant="default" className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    backgroundColor: cargoBgColors[func.cargo] || "hsl(15 40% 96%)",
                    color: cargoColors[func.cargo] || "hsl(15 70% 35%)",
                  }}
                >
                  {initials(func.nome)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15px] font-semibold text-foreground tracking-tight truncate">
                      {func.nome}
                    </h3>
                    <Badge variant={func.ativo ? "success" : "secondary"}>
                      {func.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <p className="text-[13px] text-muted-foreground truncate">{func.email}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/20 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Cargo</p>
                  <p className="text-[13px] font-medium text-foreground">{func.cargo}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Telefone</p>
                  <p className="text-[13px] font-medium text-foreground">{func.telefone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Admissão</p>
                  <p className="text-[13px] font-medium text-foreground">{func.dataAdmissao}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
