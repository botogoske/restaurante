import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
  children: React.ReactNode;
  style?: object;
}

const colors = {
  default: { bg: "#1e293b", text: "#f8fafc" },
  secondary: { bg: "#f1f5f9", text: "#0f172a" },
  destructive: { bg: "#ef4444", text: "#f8fafc" },
  outline: { bg: "transparent", text: "#0f172a" },
  success: { bg: "#22c55e", text: "#ffffff" },
  warning: { bg: "#eab308", text: "#ffffff" },
};

function Badge({ variant = "default", children, style }: BadgeProps) {
  const c = colors[variant];
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 9999,
          paddingHorizontal: 10,
          paddingVertical: 2,
          backgroundColor: c.bg,
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: variant === "outline" ? "#e2e8f0" : "transparent",
        },
        style,
      ]}
    >
      <Text style={{ fontSize: 12, fontWeight: "500", color: c.text }}>{children}</Text>
    </View>
  );
}

export { Badge };
