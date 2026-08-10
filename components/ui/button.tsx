import * as React from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  className?: string;
}

const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  default: {
    backgroundColor: "#1e293b",
  },
  destructive: {
    backgroundColor: "#ef4444",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  secondary: {
    backgroundColor: "#f1f5f9",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  sizeDefault: {
    height: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sizeSm: {
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sizeLg: {
    height: 48,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  sizeIcon: {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  disabled: {
    opacity: 0.5,
  },
});

const textStyles = StyleSheet.create({
  base: {
    fontSize: 14,
    fontWeight: "500",
  },
  default: { color: "#f8fafc" },
  destructive: { color: "#f8fafc" },
  outline: { color: "#0f172a" },
  secondary: { color: "#0f172a" },
  ghost: { color: "#0f172a" },
});

export function Button({
  variant = "default",
  size = "default",
  loading,
  disabled,
  onPress,
  children,
}: ButtonProps) {
  return (
    <Pressable
      style={[
        buttonStyles.base,
        buttonStyles[`default`],
        variant === "destructive" && buttonStyles.destructive,
        variant === "outline" && buttonStyles.outline,
        variant === "secondary" && buttonStyles.secondary,
        variant === "ghost" && buttonStyles.ghost,
        buttonStyles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof buttonStyles],
        (disabled || loading) && buttonStyles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === "default" ? "#fff" : "#000"} />
      ) : typeof children === "string" ? (
        <Text style={[textStyles.base, textStyles[variant]]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
