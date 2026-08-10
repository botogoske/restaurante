import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "terracotta" | "sage";
  children: React.ReactNode;
  style?: object;
}

const colors = {
  default: { bg: "hsl(15 70% 35%)", text: "#ffffff" },
  secondary: { bg: "hsl(35 25% 95%)", text: "hsl(20 15% 10%)" },
  destructive: { bg: "hsl(0 72% 51%)", text: "#ffffff" },
  outline: { bg: "transparent", text: "hsl(20 15% 10%)" },
  success: { bg: "hsl(65 32% 42%)", text: "#ffffff" },
  warning: { bg: "hsl(30 65% 42%)", text: "#ffffff" },
  terracotta: { bg: "hsl(15 60% 55%)", text: "#ffffff" },
  sage: { bg: "hsl(65 32% 42%)", text: "#ffffff" },
};

function Badge({ variant = "default", children, style }: BadgeProps) {
  const c = colors[variant];
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 4,
          backgroundColor: c.bg,
          borderWidth: variant === "outline" ? 1.5 : 0,
          borderColor: variant === "outline" ? "rgba(30, 25, 20, 0.15)" : "transparent",
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: c.text,
          letterSpacing: 0.02,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

export { Badge };
