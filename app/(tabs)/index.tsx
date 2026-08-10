import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollView } from "@/components/ui/scroll-view";

const menuItems: {
  title: string;
  icon: any;
  route: "/funcionarios/novo" | "/fornecedores/novo" | "/pratos/novo" | "/clientes/novo" | "/cardapio/novo" | "/pedidos/novo" | "/pagamentos/novo";
  color: string;
  bgColor: string;
}[] = [
  { title: "Funcionários", icon: "people", route: "/funcionarios/novo", color: "hsl(15 70% 35%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Fornecedores", icon: "business", route: "/fornecedores/novo", color: "hsl(65 32% 42%)", bgColor: "hsl(90 20% 96%)" },
  { title: "Pratos", icon: "restaurant", route: "/pratos/novo", color: "hsl(30 65% 42%)", bgColor: "hsl(40 40% 96%)" },
  { title: "Clientes", icon: "person", route: "/clientes/novo", color: "hsl(15 60% 55%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Cardápio", icon: "book", route: "/cardapio/novo", color: "hsl(60 35% 35%)", bgColor: "hsl(90 20% 96%)" },
  { title: "Pedidos", icon: "cart", route: "/pedidos/novo", color: "hsl(15 65% 42%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Pagamentos", icon: "card", route: "/pagamentos/novo", color: "hsl(65 32% 42%)", bgColor: "hsl(90 20% 96%)" },
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
  greeting: {
    fontSize: 14,
    color: "hsl(20 10% 45%)",
    fontWeight: "500",
    marginBottom: 4,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "hsl(20 15% 10%)",
    marginBottom: 16,
    letterSpacing: -0.01,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 20,
  },
  item: {
    width: "47%",
    marginBottom: 0,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "hsl(20 15% 10%)",
    textAlign: "center",
    letterSpacing: -0.01,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "hsl(15 70% 35%)",
    borderRadius: 16,
    padding: 18,
    gap: 14,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 2,
    letterSpacing: -0.01,
  },
  actionSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 18,
  },
  actionArrow: {
    color: "rgba(255, 255, 255, 0.6)",
  },
});

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bom dia</Text>
        <Text style={styles.title}>RestauranteApp</Text>
        <Text style={styles.subtitle}>
          Gerencie seu restaurante de forma simples e eficiente
        </Text>
      </View>

      <View style={styles.quickActions}>
        <Pressable
          style={({ pressed }) => [
            styles.actionCard,
            pressed && { opacity: 0.95, transform: [{ scale: 0.98 }] },
          ]}
          onPress={() => router.push("/pedidos/novo")}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons name="add-circle" size={26} color="#ffffff" />
          </View>
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Novo Pedido</Text>
            <Text style={styles.actionSubtitle}>
              Registrar um novo pedido rapidamente
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={20} style={styles.actionArrow} />
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
        <Text style={styles.sectionTitle}>Cadastros</Text>
      </View>

      <View style={styles.grid}>
        {menuItems.map((item) => (
          <Pressable
            key={item.title}
            style={({ pressed }) => [
              styles.item,
              pressed && { opacity: 0.92, transform: [{ scale: 0.97 }] },
            ]}
            onPress={() => router.push(item.route)}
          >
            <Card variant="filled">
              <CardContent style={{ alignItems: "center", paddingVertical: 22 }}>
                <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </CardContent>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
