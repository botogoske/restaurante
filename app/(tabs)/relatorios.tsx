import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollView } from "@/components/ui/scroll-view";

const stats = [
  { title: "Pedidos Hoje", value: "23", icon: "cart" as const, color: "#3b82f6" },
  { title: "Faturamento", value: "R$ 2.450", icon: "trending-up" as const, color: "#10b981" },
  { title: "Clientes Ativos", value: "156", icon: "people" as const, color: "#8b5cf6" },
  { title: "Pratos no Cardápio", value: "28", icon: "restaurant" as const, color: "#f59e0b" },
];

const pedidos = [
  { mesa: 3, cliente: "Maria Santos", valor: "R$ 94,80", status: "Concluído" },
  { mesa: 1, cliente: "João Silva", valor: "R$ 45,90", status: "Em andamento" },
  { mesa: 5, cliente: "Ana Oliveira", valor: "R$ 101,80", status: "Em andamento" },
];

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", color: "#0f172a", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#64748b", marginBottom: 24 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 },
  statHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  statLabel: { fontSize: 14, color: "#64748b" },
  statValue: { fontSize: 24, fontWeight: "bold", color: "#0f172a" },
  pedidoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  pedidoText: { fontSize: 14, fontWeight: "500", color: "#0f172a" },
  pedidoValor: { fontSize: 12, color: "#64748b", marginTop: 2 },
  statusConcluido: { fontSize: 12, fontWeight: "500", color: "#16a34a" },
  statusAndamento: { fontSize: 12, fontWeight: "500", color: "#ca8a04" },
});

export default function RelatoriosScreen() {
  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Relatórios</Text>
        <Text style={styles.subtitle}>Acompanhe as métricas do restaurante</Text>
      </View>

      <View style={styles.grid}>
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>{stat.title}</Text>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
            </CardContent>
          </Card>
        ))}
      </View>

      <Card>
        <CardHeader><CardTitle>Pedidos Recentes</CardTitle></CardHeader>
        <CardContent>
          {pedidos.map((pedido, index) => (
            <View key={index} style={styles.pedidoRow}>
              <View>
                <Text style={styles.pedidoText}>Mesa {pedido.mesa} - {pedido.cliente}</Text>
                <Text style={styles.pedidoValor}>{pedido.valor}</Text>
              </View>
              <Text style={pedido.status === "Concluído" ? styles.statusConcluido : styles.statusAndamento}>
                {pedido.status}
              </Text>
            </View>
          ))}
        </CardContent>
      </Card>
    </ScrollView>
  );
}
