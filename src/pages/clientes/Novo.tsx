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
  telefone: z.string().min(10, "Telefone inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  endereco: z.string().optional(),
  observacoes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NovoCliente() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "", telefone: "", cpf: "", endereco: "", observacoes: "" },
  });

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    try {
      alert("Cliente cadastrado com sucesso!");
      navigate(-1);
    } catch {
      alert("Falha ao cadastrar cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout title="Novo Cliente">
      <Card variant="elevated" className="mx-0">
        <CardHeader>
          <CardTitle>Cadastro de Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller control={control} name="nome" render={({ field }) => (
              <Input label="Nome completo" placeholder="Maria Santos" error={errors.nome?.message} {...field} />
            )} />
            <Controller control={control} name="email" render={({ field }) => (
              <Input label="Email" placeholder="maria@email.com" type="email" autoComplete="email" error={errors.email?.message} {...field} />
            )} />
            <Controller control={control} name="telefone" render={({ field }) => (
              <Input label="Telefone" placeholder="(11) 99999-9999" type="tel" error={errors.telefone?.message} {...field} />
            )} />
            <Controller control={control} name="cpf" render={({ field }) => (
              <Input label="CPF" placeholder="000.000.000-00" error={errors.cpf?.message} {...field} />
            )} />
            <Controller control={control} name="endereco" render={({ field }) => (
              <Input label="Endereço (opcional)" placeholder="Rua, número, bairro" {...field} />
            )} />
            <Controller control={control} name="observacoes" render={({ field }) => (
              <Input label="Observações (opcional)" placeholder="Preferências, alergias, etc." {...field} />
            )} />
            <Button type="submit" loading={loading} fullWidth>
              Cadastrar Cliente
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormLayout>
  );
}
