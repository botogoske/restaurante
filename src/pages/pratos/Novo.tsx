import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectOption } from "@/components/ui/select";
import { FormLayout } from "@/components/FormLayout";

const schema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  descricao: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  preco: z.string().min(1, "Preço é obrigatório"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const categorias: SelectOption[] = [
  { label: "Entrada", value: "entrada" },
  { label: "Prato Principal", value: "principal" },
  { label: "Sobremesa", value: "sobremesa" },
  { label: "Bebida", value: "bebida" },
  { label: "Lanche", value: "lanche" },
];

export default function NovoPrato() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", descricao: "", preco: "", categoria: "" },
  });

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    try {
      alert("Prato cadastrado com sucesso!");
      navigate(-1);
    } catch {
      alert("Falha ao cadastrar prato");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout title="Novo Prato">
      <Card variant="elevated" className="mx-0">
        <CardHeader>
          <CardTitle>Cadastro de Prato</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller control={control} name="nome" render={({ field }) => (
              <Input label="Nome do prato" placeholder="Filé Mignon ao Molho" error={errors.nome?.message} {...field} />
            )} />
            <Controller control={control} name="descricao" render={({ field }) => (
              <Input label="Descrição" placeholder="Descrição detalhada do prato" error={errors.descricao?.message} {...field} />
            )} />
            <Controller control={control} name="preco" render={({ field }) => (
              <Input label="Preço (R$)" placeholder="45.90" type="number" step="0.01" error={errors.preco?.message} {...field} />
            )} />
            <Controller control={control} name="categoria" render={({ field }) => (
              <Select label="Categoria" options={categorias} value={field.value} onValueChange={field.onChange} placeholder="Selecione a categoria" error={errors.categoria?.message} />
            )} />
            <Button type="submit" loading={loading} fullWidth>
              Cadastrar Prato
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormLayout>
  );
}
