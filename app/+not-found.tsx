import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  link: { marginTop: 16, paddingVertical: 8 },
  linkText: { fontSize: 16, color: "#3b82f6" },
});

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página não encontrada</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Voltar para o início</Text>
      </Link>
    </View>
  );
}
