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
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: z.string(),
  cargo: z.string().min(1, "Cargo é obrigatório"),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.string().optional(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não conferem",
  path: ["confirmarSenha"],
});

type FormData = z.infer<typeof schema>;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#0f172a", marginLeft: 8 },
  gap: { gap: 16 },
  mt: { marginTop: 8 },
});

export default function NovoFuncionarioScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "", senha: "", confirmarSenha: "", cargo: "", telefone: "", endereco: "" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      Alert.alert("Sucesso", "Funcionário cadastrado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar funcionário");
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
            <Text style={styles.headerTitle}>Novo Funcionário</Text>
          </View>
          <Card>
            <CardHeader><CardTitle>Cadastro de Funcionário</CardTitle></CardHeader>
            <CardContent>
              <View style={styles.gap}>
                <Controller control={control} name="nome" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Nome completo" placeholder="João Silva" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.nome?.message} />
                )} />
                <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Email" placeholder="joao@restaurante.com" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.email?.message} keyboardType="email-address" autoCapitalize="none" />
                )} />
                <Controller control={control} name="cargo" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Cargo" placeholder="Garçom, Cozinheiro, etc." value={value} onChangeText={onChange} onBlur={onBlur} error={errors.cargo?.message} />
                )} />
                <Controller control={control} name="telefone" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Telefone" placeholder="(11) 99999-9999" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.telefone?.message} keyboardType="phone-pad" />
                )} />
                <Controller control={control} name="endereco" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Endereço (opcional)" placeholder="Rua, número, bairro" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.endereco?.message} />
                )} />
                <Controller control={control} name="senha" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Senha" placeholder="••••••" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.senha?.message} secureTextEntry />
                )} />
                <Controller control={control} name="confirmarSenha" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Confirmar senha" placeholder="••••••" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.confirmarSenha?.message} secureTextEntry />
                )} />
                <Button onPress={handleSubmit(onSubmit)} loading={loading}>Cadastrar Funcionário</Button>
              </View>
            </CardContent>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
