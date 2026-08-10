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

export default function NovoPedidoScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { clienteId: "", mesa: "", pratoId: "", quantidade: "1", observacoes: "" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      Alert.alert("Sucesso", "Pedido cadastrado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar pedido");
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
          <Text style={styles.headerTitle}>Novo Pedido</Text>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <Card variant="elevated" style={styles.card}>
              <CardHeader>
                <CardTitle>Cadastro de Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.gap}>
                  <Controller control={control} name="clienteId" render={({ field: { onChange, value } }) => (
                    <Select label="Cliente" options={clientes} value={value} onValueChange={onChange} placeholder="Selecione o cliente" error={errors.clienteId?.message} />
                  )} />
                  <Controller control={control} name="mesa" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Número da Mesa" placeholder="1" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.mesa?.message} keyboardType="numeric" />
                  )} />
                  <Controller control={control} name="pratoId" render={({ field: { onChange, value } }) => (
                    <Select label="Prato" options={pratos} value={value} onValueChange={onChange} placeholder="Selecione o prato" error={errors.pratoId?.message} />
                  )} />
                  <Controller control={control} name="quantidade" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Quantidade" placeholder="1" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.quantidade?.message} keyboardType="numeric" />
                  )} />
                  <Controller control={control} name="observacoes" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Observações (opcional)" placeholder="Sem cebola, ponto da carne, etc." value={value} onChangeText={onChange} onBlur={onBlur} error={errors.observacoes?.message} multiline />
                  )} />
                  <Button onPress={handleSubmit(onSubmit)} loading={loading} fullWidth>
                    Cadastrar Pedido
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
