import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollView } from "@/components/ui/scroll-view";

const menuItems: { title: string; icon: any; route: "/funcionarios/novo" | "/fornecedores/novo" | "/pratos/novo" | "/clientes/novo" | "/cardapio/novo" | "/pedidos/novo" | "/pagamentos/novo"; color: string }[] = [
  { title: "Funcionários", icon: "people", route: "/funcionarios/novo", color: "#3b82f6" },
  { title: "Fornecedores", icon: "business", route: "/fornecedores/novo", color: "#10b981" },
  { title: "Pratos", icon: "restaurant", route: "/pratos/novo", color: "#f59e0b" },
  { title: "Clientes", icon: "person", route: "/clientes/novo", color: "#8b5cf6" },
  { title: "Cardápio", icon: "book", route: "/cardapio/novo", color: "#ec4899" },
  { title: "Pedidos", icon: "cart", route: "/pedidos/novo", color: "#ef4444" },
  { title: "Pagamentos", icon: "card", route: "/pagamentos/novo", color: "#06b6d4" },
];

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", color: "#0f172a", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#64748b", marginBottom: 24 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  item: { width: "47%", marginBottom: 12 },
  iconCircle: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  itemTitle: { fontSize: 14, fontWeight: "500", color: "#0f172a", textAlign: "center" },
});

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Bem-vindo ao RestauranteApp</Text>
        <Text style={styles.subtitle}>Gerencie seu restaurante de forma simples e eficiente</Text>
      </View>
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <Pressable key={item.title} style={styles.item} onPress={() => router.push(item.route)}>
            <Card>
              <CardContent style={{ alignItems: "center", paddingVertical: 24 }}>
                <View style={[styles.iconCircle, { backgroundColor: item.color + "20" }]}>
                  <Ionicons name={item.icon} size={28} color={item.color} />
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
