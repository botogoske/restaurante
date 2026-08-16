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
  clienteId: z.string().min(1, "Cliente é obrigatório"),
  mesa: z.string().min(1, "Mesa é obrigatória"),
  pratoId: z.string().min(1, "Prato é obrigatório"),
  quantidade: z.string().min(1, "Quantidade é obrigatória"),
  observacoes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const clientes: SelectOption[] = [
  { label: "Maria Santos", value: "1" },
  { label: "João Silva", value: "2" },
  { label: "Ana Oliveira", value: "3" },
];

const pratos: SelectOption[] = [
  { label: "Filé Mignon - R$ 45,90", value: "1" },
  { label: "Salmão Grelhado - R$ 52,90", value: "2" },
  { label: "Risoto de Camarão - R$ 48,90", value: "3" },
];

export default function NovoPedido() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { clienteId: "", mesa: "", pratoId: "", quantidade: "1", observacoes: "" },
  });

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    try {
      alert("Pedido cadastrado com sucesso!");
      navigate(-1);
    } catch {
      alert("Falha ao cadastrar pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout title="Novo Pedido">
      <Card variant="elevated" className="mx-0">
        <CardHeader>
          <CardTitle>Cadastro de Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller control={control} name="clienteId" render={({ field }) => (
              <Select label="Cliente" options={clientes} value={field.value} onValueChange={field.onChange} placeholder="Selecione o cliente" error={errors.clienteId?.message} />
            )} />
            <Controller control={control} name="mesa" render={({ field }) => (
              <Input label="Número da Mesa" placeholder="1" type="number" min="1" error={errors.mesa?.message} {...field} />
            )} />
            <Controller control={control} name="pratoId" render={({ field }) => (
              <Select label="Prato" options={pratos} value={field.value} onValueChange={field.onChange} placeholder="Selecione o prato" error={errors.pratoId?.message} />
            )} />
            <Controller control={control} name="quantidade" render={({ field }) => (
              <Input label="Quantidade" placeholder="1" type="number" min="1" error={errors.quantidade?.message} {...field} />
            )} />
            <Controller control={control} name="observacoes" render={({ field }) => (
              <Input label="Observações (opcional)" placeholder="Sem cebola, ponto da carne, etc." {...field} />
            )} />
            <Button type="submit" loading={loading} fullWidth>
              Cadastrar Pedido
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormLayout>
  );
}
