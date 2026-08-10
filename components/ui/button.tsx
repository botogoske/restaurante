import * as React from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";

interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "terracotta" | "sage";
  size?: "default" | "sm" | "lg" | "icon" | "xl";
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  default: {
    backgroundColor: "hsl(15 70% 35%)",
  },
  destructive: {
    backgroundColor: "hsl(0 72% 51%)",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "rgba(30, 25, 20, 0.15)",
  },
  secondary: {
    backgroundColor: "hsl(35 25% 95%)",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  terracotta: {
    backgroundColor: "hsl(15 60% 55%)",
  },
  sage: {
    backgroundColor: "hsl(65 32% 42%)",
  },
  sizeDefault: {
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sizeSm: {
    height: 36,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sizeLg: {
    height: 52,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  sizeXl: {
    height: 56,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 14,
  },
  sizeIcon: {
    height: 44,
    width: 44,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: "100%",
  },
});

const textStyles = StyleSheet.create({
  base: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.01,
  },
  default: { color: "#ffffff" },
  destructive: { color: "#ffffff" },
  outline: { color: "hsl(20 15% 10%)" },
  secondary: { color: "hsl(20 15% 10%)" },
  ghost: { color: "hsl(20 15% 10%)" },
  terracotta: { color: "#ffffff" },
  sage: { color: "#ffffff" },
});

export function Button({
  variant = "default",
  size = "default",
  loading,
  disabled,
  onPress,
  children,
  fullWidth = false,
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyles.base,
        buttonStyles[`default`],
        variant === "destructive" && buttonStyles.destructive,
        variant === "outline" && buttonStyles.outline,
        variant === "secondary" && buttonStyles.secondary,
        variant === "ghost" && buttonStyles.ghost,
        variant === "terracotta" && buttonStyles.terracotta,
        variant === "sage" && buttonStyles.sage,
        buttonStyles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof buttonStyles],
        (disabled || loading) && buttonStyles.disabled,
        fullWidth && buttonStyles.fullWidth,
        pressed && { opacity: 0.92, transform: [{ scale: 0.98 }] },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === "default" || variant === "terracotta" || variant === "sage" ? "#fff" : "hsl(20 15% 10%)"} />
      ) : typeof children === "string" ? (
        <Text style={[textStyles.base, textStyles[variant]]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
