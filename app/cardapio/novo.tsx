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
  descricao: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#0f172a", marginLeft: 8 },
  gap: { gap: 16 },
});

export default function NovoCardapioScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", descricao: "" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      Alert.alert("Sucesso", "Cardápio cadastrado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar cardápio");
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
            <Text style={styles.headerTitle}>Novo Cardápio</Text>
          </View>
          <Card>
            <CardHeader><CardTitle>Cadastro de Cardápio</CardTitle></CardHeader>
            <CardContent>
              <View style={styles.gap}>
                <Controller control={control} name="nome" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Nome do cardápio" placeholder="Cardápio Principal" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.nome?.message} />
                )} />
                <Controller control={control} name="descricao" render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Descrição (opcional)" placeholder="Cardápio do almoço, jantar, etc." value={value} onChangeText={onChange} onBlur={onBlur} error={errors.descricao?.message} multiline />
                )} />
                <Button onPress={handleSubmit(onSubmit)} loading={loading}>Cadastrar Cardápio</Button>
              </View>
            </CardContent>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
