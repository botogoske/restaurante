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
  cnpj: z.string().min(14, "CNPJ inválido"),
  endereco: z.string().min(5, "Endereço é obrigatório"),
  produtos: z.string().min(2, "Produtos é obrigatório"),
  observacoes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NovoFornecedor() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "", telefone: "", cnpj: "", endereco: "", produtos: "", observacoes: "" },
  });

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    try {
      alert("Fornecedor cadastrado com sucesso!");
      navigate(-1);
    } catch {
      alert("Falha ao cadastrar fornecedor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout title="Novo Fornecedor">
      <Card variant="elevated" className="mx-0">
        <CardHeader>
          <CardTitle>Cadastro de Fornecedor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller control={control} name="nome" render={({ field }) => (
              <Input label="Nome da empresa" placeholder="Distribuidora ABC" error={errors.nome?.message} {...field} />
            )} />
            <Controller control={control} name="email" render={({ field }) => (
              <Input label="Email" placeholder="contato@empresa.com" type="email" autoComplete="email" error={errors.email?.message} {...field} />
            )} />
            <Controller control={control} name="telefone" render={({ field }) => (
              <Input label="Telefone" placeholder="(11) 99999-9999" type="tel" error={errors.telefone?.message} {...field} />
            )} />
            <Controller control={control} name="cnpj" render={({ field }) => (
              <Input label="CNPJ" placeholder="00.000.000/0001-00" error={errors.cnpj?.message} {...field} />
            )} />
            <Controller control={control} name="endereco" render={({ field }) => (
              <Input label="Endereço" placeholder="Rua, número, bairro, cidade" error={errors.endereco?.message} {...field} />
            )} />
            <Controller control={control} name="produtos" render={({ field }) => (
              <Input label="Produtos fornecidos" placeholder="Carnes, verduras, laticínios..." error={errors.produtos?.message} {...field} />
            )} />
            <Controller control={control} name="observacoes" render={({ field }) => (
              <Input label="Observações (opcional)" placeholder="Informações adicionais" {...field} />
            )} />
            <Button type="submit" loading={loading} fullWidth>
              Cadastrar Fornecedor
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormLayout>
  );
}
