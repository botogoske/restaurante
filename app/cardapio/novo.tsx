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
        <View style={styles.header}>
          <Button variant="ghost" size="icon" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="hsl(20 15% 10%)" />
          </Button>
          <Text style={styles.headerTitle}>Novo Cardápio</Text>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <Card variant="elevated" style={styles.card}>
              <CardHeader>
                <CardTitle>Cadastro de Cardápio</CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.gap}>
                  <Controller control={control} name="nome" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Nome do cardápio" placeholder="Cardápio Principal" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.nome?.message} />
                  )} />
                  <Controller control={control} name="descricao" render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Descrição (opcional)" placeholder="Cardápio do almoço, jantar, etc." value={value} onChangeText={onChange} onBlur={onBlur} error={errors.descricao?.message} multiline />
                  )} />
                  <Button onPress={handleSubmit(onSubmit)} loading={loading} fullWidth>
                    Cadastrar Cardápio
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
