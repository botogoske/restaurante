import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: object | object[];
  variant?: "default" | "elevated" | "outlined" | "filled";
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
  },
  default: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "rgba(30, 25, 20, 0.08)",
    boxShadow: "0 2px 8px rgba(26, 21, 18, 0.06)",
  },
  elevated: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "rgba(30, 25, 20, 0.04)",
    boxShadow: "0 8px 24px rgba(26, 21, 18, 0.1)",
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "rgba(30, 25, 20, 0.12)",
  },
  filled: {
    backgroundColor: "hsl(35 25% 95%)",
    borderWidth: 0,
  },
});

function Card({ children, style, variant = "default" }: CardProps) {
  const styleArray = Array.isArray(style) ? style : style ? [style] : [];
  return (
    <View style={[styles.card, styles[variant], ...styleArray]}>
      {children}
    </View>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <View style={{ marginBottom: 16 }}>{children}</View>;
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontSize: 18,
        fontWeight: "600",
        color: "hsl(20 15% 10%)",
        letterSpacing: -0.02,
      }}
    >
      {children}
    </Text>
  );
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontSize: 14,
        color: "hsl(20 10% 45%)",
        marginTop: 4,
        lineHeight: 20,
      }}
    >
      {children}
    </Text>
  );
}

function CardContent({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={style}>{children}</View>;
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(30, 25, 20, 0.06)",
      }}
    >
      {children}
    </View>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
