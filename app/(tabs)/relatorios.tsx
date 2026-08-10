import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollView } from "@/components/ui/scroll-view";

const stats = [
  { title: "Pedidos Hoje", value: "23", icon: "cart" as const, color: "hsl(15 70% 35%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Faturamento", value: "R$ 2.450", icon: "trending-up" as const, color: "hsl(65 32% 42%)", bgColor: "hsl(90 20% 96%)" },
  { title: "Clientes Ativos", value: "156", icon: "people" as const, color: "hsl(15 60% 55%)", bgColor: "hsl(15 40% 96%)" },
  { title: "Pratos no Cardápio", value: "28", icon: "restaurant" as const, color: "hsl(30 65% 42%)", bgColor: "hsl(40 40% 96%)" },
];

const pedidos = [
  { mesa: 3, cliente: "Maria Santos", valor: "R$ 94,80", status: "Concluído" },
  { mesa: 1, cliente: "João Silva", valor: "R$ 45,90", status: "Em andamento" },
  { mesa: 5, cliente: "Ana Oliveira", valor: "R$ 101,80", status: "Em andamento" },
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    width: "47%",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    fontSize: 13,
    color: "hsl(20 10% 45%)",
    fontWeight: "500",
    letterSpacing: 0.01,
  },
  statValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "hsl(20 15% 10%)",
    letterSpacing: -0.03,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  pedidoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(30, 25, 20, 0.04)",
  },
  pedidoRowLast: {
    borderBottomWidth: 0,
  },
  pedidoInfo: {
    flex: 1,
  },
  pedidoText: {
    fontSize: 15,
    fontWeight: "600",
    color: "hsl(20 15% 10%)",
    letterSpacing: -0.01,
  },
  pedidoValor: {
    fontSize: 13,
    color: "hsl(20 10% 45%)",
    marginTop: 3,
  },
  statusBadge: {
    marginLeft: 12,
  },
});

export default function RelatoriosScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatórios</Text>
        <Text style={styles.subtitle}>
          Acompanhe as métricas do restaurante
        </Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <Card key={stat.title} variant="default" style={[styles.statCard]}>
            <CardContent>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>{stat.title}</Text>
                <View style={[styles.statIconContainer, { backgroundColor: stat.bgColor }]}>
                  <Ionicons name={stat.icon} size={18} color={stat.color} />
                </View>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
            </CardContent>
          </Card>
        ))}
      </View>

      <Card variant="default" style={styles.sectionCard}>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {pedidos.map((pedido, index) => (
            <View
              key={index}
              style={[
                styles.pedidoRow,
                index === pedidos.length - 1 && styles.pedidoRowLast,
              ]}
            >
              <View style={styles.pedidoInfo}>
                <Text style={styles.pedidoText}>
                  Mesa {pedido.mesa} - {pedido.cliente}
                </Text>
                <Text style={styles.pedidoValor}>{pedido.valor}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Badge
                  variant={pedido.status === "Concluído" ? "success" : "warning"}
                >
                  {pedido.status}
                </Badge>
              </View>
            </View>
          ))}
        </CardContent>
      </Card>
    </ScrollView>
  );
}
