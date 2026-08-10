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

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "hsl(40 20% 98%)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: "hsl(15 70% 35%)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    boxShadow: "0 8px 24px rgba(15, 70, 35, 0.25)",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "hsl(20 15% 10%)",
    letterSpacing: -0.04,
  },
  subtitle: {
    color: "hsl(20 10% 50%)",
    marginTop: 8,
    fontSize: 16,
    letterSpacing: -0.01,
  },
  form: {
    gap: 16,
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "hsl(20 10% 50%)",
  },
  linkText: {
    fontSize: 13,
    color: "hsl(15 70% 35%)",
    fontWeight: "600",
  },
});

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", senha: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      if (data.email === "admin@restaurante.com" && data.senha === "123456") {
        router.replace("/(tabs)");
      } else {
        Alert.alert("Erro", "Email ou senha incorretos");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="restaurant" size={42} color="#ffffff" />
          </View>
          <Text style={styles.title}>RestauranteApp</Text>
          <Text style={styles.subtitle}>Sistema de Gestão</Text>
        </View>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Bem-vindo de volta</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    placeholder="seu@email.com"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              <Controller
                control={control}
                name="senha"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Senha"
                    placeholder="••••••"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.senha?.message}
                    secureTextEntry
                  />
                )}
              />
              <Button onPress={handleSubmit(onSubmit)} loading={loading} fullWidth>
                Entrar
              </Button>
              <View style={styles.footer}>
                <Button
                  variant="ghost"
                  onPress={() => router.push("/funcionarios/novo")}
                >
                  Criar conta de funcionário
                </Button>
              </View>
            </View>
          </CardContent>
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
