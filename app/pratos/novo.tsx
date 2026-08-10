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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#0f172a", marginLeft: 8 },
  gap: { gap: 16 },
});

export default function NovoPratoScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", descricao: "", preco: "", categoria: "" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      Alert.alert("Sucesso", "Prato cadastrado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar prato");
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
            <Text style={styles.headerTitle}>Novo Prato</Text>
          </View>
          <Card>
            <CardHeader><CardTitle>Cadastro de Prato</CardTitle></CardHeader>
            <CardContent>
              <View style={styles.gap}>
                <Controller control={control} name="nome" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Nome do prato" placeholder="Filé Mignon ao Molho" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.nome?.message} />
                )} />
                <Controller control={control} name="descricao" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Descrição" placeholder="Descrição detalhada do prato" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.descricao?.message} multiline />
                )} />
                <Controller control={control} name="preco" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Preço (R$)" placeholder="45.90" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.preco?.message} keyboardType="decimal-pad" />
                )} />
                <Controller control={control} name="categoria" render={({ field: { onChange, value } }) => (
                  <Select label="Categoria" options={categorias} value={value} onValueChange={onChange} placeholder="Selecione a categoria" error={errors.categoria?.message} />
                )} />
                <Button onPress={handleSubmit(onSubmit)} loading={loading}>Cadastrar Prato</Button>
              </View>
            </CardContent>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
