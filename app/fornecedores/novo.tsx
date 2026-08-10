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

export default function NovoFornecedorScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "", telefone: "", cnpj: "", endereco: "", produtos: "", observacoes: "" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      Alert.alert("Sucesso", "Fornecedor cadastrado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar fornecedor");
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
          <Text style={styles.headerTitle}>Novo Fornecedor</Text>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <Card variant="elevated" style={styles.card}>
              <CardHeader>
                <CardTitle>Cadastro de Fornecedor</CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.gap}>
                  <Controller control={control} name="nome" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Nome da empresa" placeholder="Distribuidora ABC" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.nome?.message} />
                  )} />
                  <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Email" placeholder="contato@empresa.com" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.email?.message} keyboardType="email-address" autoCapitalize="none" />
                  )} />
                  <Controller control={control} name="telefone" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Telefone" placeholder="(11) 99999-9999" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.telefone?.message} keyboardType="phone-pad" />
                  )} />
                  <Controller control={control} name="cnpj" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="CNPJ" placeholder="00.000.000/0001-00" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.cnpj?.message} keyboardType="numeric" />
                  )} />
                  <Controller control={control} name="endereco" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Endereço" placeholder="Rua, número, bairro, cidade" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.endereco?.message} />
                  )} />
                  <Controller control={control} name="produtos" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Produtos fornecidos" placeholder="Carnes, verduras, laticínios..." value={value} onChangeText={onChange} onBlur={onBlur} error={errors.produtos?.message} />
                  )} />
                  <Controller control={control} name="observacoes" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Observações (opcional)" placeholder="Informações adicionais" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.observacoes?.message} multiline />
                  )} />
                  <Button onPress={handleSubmit(onSubmit)} loading={loading} fullWidth>
                    Cadastrar Fornecedor
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
