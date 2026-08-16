import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/FormLayout";

const schema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: z.string(),
  cargo: z.string().min(1, "Cargo é obrigatório"),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.string().optional(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não conferem",
  path: ["confirmarSenha"],
});

type FormData = z.infer<typeof schema>;

export default function NovoFuncionario() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "", senha: "", confirmarSenha: "", cargo: "", telefone: "", endereco: "" },
  });

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    try {
      alert("Funcionário cadastrado com sucesso!");
      navigate(-1);
    } catch {
      alert("Falha ao cadastrar funcionário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout title="Novo Funcionário">
      <Card variant="elevated" className="mx-0">
        <CardHeader>
          <CardTitle>Cadastro de Funcionário</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller control={control} name="nome" render={({ field }) => (
              <Input label="Nome completo" placeholder="João Silva" error={errors.nome?.message} {...field} />
            )} />
            <Controller control={control} name="email" render={({ field }) => (
              <Input label="Email" placeholder="joao@restaurante.com" type="email" autoComplete="email" error={errors.email?.message} {...field} />
            )} />
            <Controller control={control} name="cargo" render={({ field }) => (
              <Input label="Cargo" placeholder="Garçom, Cozinheiro, etc." error={errors.cargo?.message} {...field} />
            )} />
            <Controller control={control} name="telefone" render={({ field }) => (
              <Input label="Telefone" placeholder="(11) 99999-9999" type="tel" error={errors.telefone?.message} {...field} />
            )} />
            <Controller control={control} name="endereco" render={({ field }) => (
              <Input label="Endereço (opcional)" placeholder="Rua, número, bairro" {...field} />
            )} />
            <Controller control={control} name="senha" render={({ field }) => (
              <Input label="Senha" placeholder="••••••" type="password" autoComplete="new-password" error={errors.senha?.message} {...field} />
            )} />
            <Controller control={control} name="confirmarSenha" render={({ field }) => (
              <Input label="Confirmar senha" placeholder="••••••" type="password" autoComplete="new-password" error={errors.confirmarSenha?.message} {...field} />
            )} />
            <Button type="submit" loading={loading} fullWidth>
              Cadastrar Funcionário
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormLayout>
  );
}
