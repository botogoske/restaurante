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
  safe: { flex: 1, backgroundColor: "#ffffff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#0f172a", marginLeft: 8 },
  gap: { gap: 16 },
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
        <ScrollView>
          <View style={styles.header}>
            <Button variant="ghost" size="icon" onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </Button>
            <Text style={styles.headerTitle}>Novo Fornecedor</Text>
          </View>
          <Card>
            <CardHeader><CardTitle>Cadastro de Fornecedor</CardTitle></CardHeader>
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
                <Button onPress={handleSubmit(onSubmit)} loading={loading}>Cadastrar Fornecedor</Button>
              </View>
            </CardContent>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
