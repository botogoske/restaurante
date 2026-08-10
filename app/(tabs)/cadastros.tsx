import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollView } from "@/components/ui/scroll-view";

const cadastros: {
  title: string;
  icon: any;
  route: "/funcionarios/novo" | "/fornecedores/novo" | "/pratos/novo" | "/clientes/novo" | "/cardapio/novo" | "/pedidos/novo" | "/pagamentos/novo";
  description: string;
  color: string;
  bgColor: string;
}[] = [
  { title: "Funcionários", icon: "people", route: "/funcionarios/novo", description: "Gerenciar equipe do restaurante", color: "hsl(15 70% 35%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Fornecedores", icon: "business", route: "/fornecedores/novo", description: "Cadastrar fornecedores", color: "hsl(65 32% 42%)", bgColor: "hsl(90 20% 96%)" },
  { title: "Pratos", icon: "restaurant", route: "/pratos/novo", description: "Adicionar novos pratos", color: "hsl(30 65% 42%)", bgColor: "hsl(40 40% 96%)" },
  { title: "Clientes", icon: "person", route: "/clientes/novo", description: "Cadastrar clientes", color: "hsl(15 60% 55%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Cardápio", icon: "book", route: "/cardapio/novo", description: "Montar cardápios", color: "hsl(60 35% 35%)", bgColor: "hsl(90 20% 96%)" },
  { title: "Pedidos", icon: "cart", route: "/pedidos/novo", description: "Registrar pedidos", color: "hsl(15 65% 42%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Pagamentos", icon: "card", route: "/pagamentos/novo", description: "Registrar pagamentos", color: "hsl(65 32% 42%)", bgColor: "hsl(90 20% 96%)" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(40 20% 98%)",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "hsl(20 15% 10%)",
    letterSpacing: -0.03,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "hsl(20 10% 50%)",
    lineHeight: 22,
  },
  list: {
    paddingHorizontal: 20,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  text: {
    flex: 1,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "hsl(20 15% 10%)",
    letterSpacing: -0.01,
  },
  textDesc: {
    fontSize: 13,
    color: "hsl(20 10% 45%)",
    marginTop: 3,
    lineHeight: 18,
  },
  chevron: {
    color: "hsl(20 10% 65%)",
  },
});

export default function CadastrosScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastros</Text>
        <Text style={styles.subtitle}>
          Gerencie todos os cadastros do sistema
        </Text>
      </View>
      <View style={styles.list}>
        {cadastros.map((item) => (
          <Pressable
            key={item.title}
            style={({ pressed }) => [
              pressed && { opacity: 0.95, transform: [{ scale: 0.98 }] },
            ]}
            onPress={() => router.push(item.route)}
          >
            <Card variant="default">
              <CardContent>
                <View style={styles.row}>
                  <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
                    <Ionicons name={item.icon} size={22} color={item.color} />
                  </View>
                  <View style={styles.text}>
                    <Text style={styles.textTitle}>{item.title}</Text>
                    <Text style={styles.textDesc}>{item.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} style={styles.chevron} />
                </View>
              </CardContent>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
