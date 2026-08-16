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
  pedidoId: z.string().min(1, "Pedido é obrigatório"),
  valor: z.string().min(1, "Valor é obrigatório"),
  metodo: z.string().min(1, "Método de pagamento é obrigatório"),
  observacoes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const pedidos: SelectOption[] = [
  { label: "Pedido #1 - Mesa 3 - R$ 94,80", value: "1" },
  { label: "Pedido #2 - Mesa 1 - R$ 45,90", value: "2" },
  { label: "Pedido #3 - Mesa 5 - R$ 101,80", value: "3" },
];

const metodos: SelectOption[] = [
  { label: "Dinheiro", value: "dinheiro" },
  { label: "Cartão de Crédito", value: "credito" },
  { label: "Cartão de Débito", value: "debito" },
  { label: "PIX", value: "pix" },
  { label: "Vale Refeição", value: "vale" },
];

export default function NovoPagamento() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { pedidoId: "", valor: "", metodo: "", observacoes: "" },
  });

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    try {
      alert("Pagamento registrado com sucesso!");
      navigate(-1);
    } catch {
      alert("Falha ao registrar pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout title="Novo Pagamento">
      <Card variant="elevated" className="mx-0">
        <CardHeader>
          <CardTitle>Cadastro de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller control={control} name="pedidoId" render={({ field }) => (
              <Select label="Pedido" options={pedidos} value={field.value} onValueChange={field.onChange} placeholder="Selecione o pedido" error={errors.pedidoId?.message} />
            )} />
            <Controller control={control} name="valor" render={({ field }) => (
              <Input label="Valor (R$)" placeholder="94.80" type="number" step="0.01" error={errors.valor?.message} {...field} />
            )} />
            <Controller control={control} name="metodo" render={({ field }) => (
              <Select label="Método de Pagamento" options={metodos} value={field.value} onValueChange={field.onChange} placeholder="Selecione o método" error={errors.metodo?.message} />
            )} />
            <Controller control={control} name="observacoes" render={({ field }) => (
              <Input label="Observações (opcional)" placeholder="Troco, referência, etc." {...field} />
            )} />
            <Button type="submit" loading={loading} fullWidth>
              Registrar Pagamento
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormLayout>
  );
}
