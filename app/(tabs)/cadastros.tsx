import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollView } from "@/components/ui/scroll-view";

const cadastros: { title: string; icon: any; route: "/funcionarios/novo" | "/fornecedores/novo" | "/pratos/novo" | "/clientes/novo" | "/cardapio/novo" | "/pedidos/novo" | "/pagamentos/novo"; description: string }[] = [
  { title: "Funcionários", icon: "people", route: "/funcionarios/novo", description: "Gerenciar equipe do restaurante" },
  { title: "Fornecedores", icon: "business", route: "/fornecedores/novo", description: "Cadastrar fornecedores" },
  { title: "Pratos", icon: "restaurant", route: "/pratos/novo", description: "Adicionar novos pratos" },
  { title: "Clientes", icon: "person", route: "/clientes/novo", description: "Cadastrar clientes" },
  { title: "Cardápio", icon: "book", route: "/cardapio/novo", description: "Montar cardápios" },
  { title: "Pedidos", icon: "cart", route: "/pedidos/novo", description: "Registrar pedidos" },
  { title: "Pagamentos", icon: "card", route: "/pagamentos/novo", description: "Registrar pagamentos" },
];

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", color: "#0f172a", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#64748b", marginBottom: 24 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 16 },
  iconBox: { width: 48, height: 48, borderRadius: 8, backgroundColor: "#f1f5f9", alignItems: "center", justifyContent: "center", marginRight: 16 },
  text: { flex: 1 },
  textTitle: { fontSize: 16, fontWeight: "500", color: "#0f172a" },
  textDesc: { fontSize: 14, color: "#64748b", marginTop: 2 },
  gap: { gap: 12 },
});

export default function CadastrosScreen() {
  const router = useRouter();

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Cadastros</Text>
        <Text style={styles.subtitle}>Gerencie todos os cadastros do sistema</Text>
      </View>
      <View style={styles.gap}>
        {cadastros.map((item) => (
          <Pressable key={item.title} onPress={() => router.push(item.route)}>
            <Card>
              <CardContent>
                <View style={styles.row}>
                  <View style={styles.iconBox}>
                    <Ionicons name={item.icon} size={24} color="#222" />
                  </View>
                  <View style={styles.text}>
                    <Text style={styles.textTitle}>{item.title}</Text>
                    <Text style={styles.textDesc}>{item.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
                </View>
              </CardContent>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
