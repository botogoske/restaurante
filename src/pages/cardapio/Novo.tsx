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
  descricao: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NovoCardapio() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", descricao: "" },
  });

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    try {
      alert("Cardápio cadastrado com sucesso!");
      navigate(-1);
    } catch {
      alert("Falha ao cadastrar cardápio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout title="Novo Cardápio">
      <Card variant="elevated" className="mx-0">
        <CardHeader>
          <CardTitle>Cadastro de Cardápio</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller control={control} name="nome" render={({ field }) => (
              <Input label="Nome do cardápio" placeholder="Cardápio Principal" error={errors.nome?.message} {...field} />
            )} />
            <Controller control={control} name="descricao" render={({ field }) => (
              <Input label="Descrição (opcional)" placeholder="Cardápio do almoço, jantar, etc." {...field} />
            )} />
            <Button type="submit" loading={loading} fullWidth>
              Cadastrar Cardápio
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormLayout>
  );
}
