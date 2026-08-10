import React, { useState } from "react";
import { View, Text, Alert, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollView } from "@/components/ui/scroll-view";
import { Select, SelectOption } from "@/components/ui/select";

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

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "hsl(40 20% 98%)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "hsl(40 20% 98%)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(30, 25, 20, 0.06)",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "hsl(20 15% 10%)",
    marginLeft: 8,
    letterSpacing: -0.02,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 0,
  },
  gap: {
    gap: 16,
  },
});

export default function NovoPagamentoScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { pedidoId: "", valor: "", metodo: "", observacoes: "" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      Alert.alert("Sucesso", "Pagamento registrado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao registrar pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.header}>
          <Button variant="ghost" size="icon" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="hsl(20 15% 10%)" />
          </Button>
          <Text style={styles.headerTitle}>Novo Pagamento</Text>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <Card variant="elevated" style={styles.card}>
              <CardHeader>
                <CardTitle>Cadastro de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.gap}>
                  <Controller control={control} name="pedidoId" render={({ field: { onChange, value } }) => (
                    <Select label="Pedido" options={pedidos} value={value} onValueChange={onChange} placeholder="Selecione o pedido" error={errors.pedidoId?.message} />
                  )} />
                  <Controller control={control} name="valor" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Valor (R$)" placeholder="94.80" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.valor?.message} keyboardType="decimal-pad" />
                  )} />
                  <Controller control={control} name="metodo" render={({ field: { onChange, value } }) => (
                    <Select label="Método de Pagamento" options={metodos} value={value} onValueChange={onChange} placeholder="Selecione o método" error={errors.metodo?.message} />
                  )} />
                  <Controller control={control} name="observacoes" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Observações (opcional)" placeholder="Troco, referência, etc." value={value} onChangeText={onChange} onBlur={onBlur} error={errors.observacoes?.message} multiline />
                  )} />
                  <Button onPress={handleSubmit(onSubmit)} loading={loading} fullWidth>
                    Registrar Pagamento
                  </Button>
                </View>
              </CardContent>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
