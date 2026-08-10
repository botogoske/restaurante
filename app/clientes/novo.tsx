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
  cpf: z.string().min(11, "CPF inválido"),
  endereco: z.string().optional(),
  observacoes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#0f172a", marginLeft: 8 },
  gap: { gap: 16 },
});

export default function NovoClienteScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "", telefone: "", cpf: "", endereco: "", observacoes: "" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      Alert.alert("Sucesso", "Cliente cadastrado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar cliente");
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
            <Text style={styles.headerTitle}>Novo Cliente</Text>
          </View>
          <Card>
            <CardHeader><CardTitle>Cadastro de Cliente</CardTitle></CardHeader>
            <CardContent>
              <View style={styles.gap}>
                <Controller control={control} name="nome" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Nome completo" placeholder="Maria Santos" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.nome?.message} />
                )} />
                <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Email" placeholder="maria@email.com" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.email?.message} keyboardType="email-address" autoCapitalize="none" />
                )} />
                <Controller control={control} name="telefone" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Telefone" placeholder="(11) 99999-9999" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.telefone?.message} keyboardType="phone-pad" />
                )} />
                <Controller control={control} name="cpf" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="CPF" placeholder="000.000.000-00" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.cpf?.message} keyboardType="numeric" />
                )} />
                <Controller control={control} name="endereco" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Endereço (opcional)" placeholder="Rua, número, bairro" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.endereco?.message} />
                )} />
                <Controller control={control} name="observacoes" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Observações (opcional)" placeholder="Preferências, alergias, etc." value={value} onChangeText={onChange} onBlur={onBlur} error={errors.observacoes?.message} multiline />
                )} />
                <Button onPress={handleSubmit(onSubmit)} loading={loading}>Cadastrar Cliente</Button>
              </View>
            </CardContent>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
