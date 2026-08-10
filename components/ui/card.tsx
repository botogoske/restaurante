import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: object[];
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});

function Card({ children, style }: CardProps) {
  return <View style={[styles.card, ...((style || []) as any[])]}>{children}</View>;
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <View style={{ marginBottom: 16 }}>{children}</View>;
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <Text style={{ fontSize: 20, fontWeight: "600", color: "#0f172a" }}>{children}</Text>;
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return <Text style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>{children}</Text>;
}

function CardContent({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={style}>{children}</View>;
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return <View style={{ flexDirection: "row", alignItems: "center" }}>{children}</View>;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
