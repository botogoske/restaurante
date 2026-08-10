import * as React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface TextareaProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
  hint?: string;
}

const styles = StyleSheet.create({
  container: { width: "100%", marginBottom: 4 },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    color: "hsl(20 15% 10%)",
    letterSpacing: 0.02,
  },
  input: {
    minHeight: 100,
    width: "100%",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(30, 25, 20, 0.12)",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "hsl(20 15% 10%)",
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "hsl(0 72% 51%)",
    boxShadow: "0 0 0 3px rgba(0, 72, 51, 0.12)",
  },
  error: {
    fontSize: 12,
    color: "hsl(0 72% 51%)",
    marginTop: 6,
    fontWeight: "500",
  },
  hint: {
    fontSize: 12,
    color: "hsl(20 10% 45%)",
    marginTop: 6,
  },
});

const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({ label, error, hint, style, ...props }, ref) => {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={[styles.input, error && styles.inputError, style]}
          placeholderTextColor="hsl(20 10% 65%)"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          {...props}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {hint && !error && <Text style={styles.hint}>{hint}</Text>}
      </View>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
