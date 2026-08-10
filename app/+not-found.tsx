import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "hsl(40 20% 98%)",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "hsl(15 40% 96%)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "hsl(20 15% 10%)",
    letterSpacing: -0.03,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "hsl(20 10% 50%)",
    textAlign: "center",
    lineHeight: 22,
  },
  link: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "hsl(15 70% 35%)",
    borderRadius: 12,
  },
  linkText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: 0.01,
  },
});

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="search" size={36} color="hsl(15 70% 35%)" />
      </View>
      <Text style={styles.title}>Página não encontrada</Text>
      <Text style={styles.subtitle}>
        O conteúdo que você procura não existe ou foi movido.
      </Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Voltar para o início</Text>
      </Link>
    </View>
  );
}
