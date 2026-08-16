import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fornecedores = [
  { id: 1, nome: "Distribuidora Alimentos do Campo", email: "contato@doc.com.br", telefone: "(11) 3456-7890", cnpj: "12.345.678/0001-01", produtos: "Carnes, Aves", ativo: true },
  { id: 2, nome: "Pescados Oceano Fresco", email: "vendas@oceano.com.br", telefone: "(11) 3322-1100", cnpj: "23.456.789/0001-02", produtos: "Peixes, Frutos do Mar", ativo: true },
  { id: 3, nome: "Hortifruti Serra Verde", email: "pedidos@serraverde.com.br", telefone: "(11) 4567-8901", cnpj: "34.567.890/0001-03", produtos: "Hortaliças, Frutas", ativo: true },
  { id: 4, nome: "Laticínios Minas Boa", email: "contato@minasboa.com.br", telefone: "(31) 3456-7890", cnpj: "45.678.901/0001-04", produtos: "Queijos, Leites, Manteigas", ativo: false },
  { id: 5, nome: "Padaria Forno Dourado", email: "atendimento@fornodourado.com.br", telefone: "(11) 2345-6789", cnpj: "56.789.012/0001-05", produtos: "Pães, Massas, Farinhas", ativo: true },
];

const initials = (nome: string) =>
  nome
    .split(" ")
    .filter((n) => n.length > 3)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export default function Fornecedores() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1.5">Fornecedores</h1>
          <p className="text-[15px] text-muted-foreground">
            {fornecedores.length} fornecedores cadastrados
          </p>
        </div>
        <Button onClick={() => navigate("/fornecedores/novo")}>
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Fornecedor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {fornecedores.map((f) => (
          <Card key={f.id} variant="default" className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    backgroundColor: f.ativo ? "hsl(90 20% 96%)" : "hsl(35 25% 95%)",
                    color: f.ativo ? "hsl(65 32% 42%)" : "hsl(20 10% 45%)",
                  }}
                >
                  {initials(f.nome)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15px] font-semibold text-foreground tracking-tight truncate">
                      {f.nome}
                    </h3>
                    <Badge variant={f.ativo ? "success" : "secondary"}>
                      {f.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <p className="text-[13px] text-muted-foreground truncate">{f.email}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/20 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">CNPJ</p>
                  <p className="text-[13px] font-medium text-foreground">{f.cnpj}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Telefone</p>
                  <p className="text-[13px] font-medium text-foreground">{f.telefone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Produtos</p>
                  <p className="text-[13px] font-medium text-foreground">{f.produtos}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
