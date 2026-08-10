import * as React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface TextareaProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 6, color: "#0f172a" },
  input: {
    minHeight: 80,
    width: "100%",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#0f172a",
    textAlignVertical: "top",
  },
  inputError: { borderColor: "#ef4444" },
  error: { fontSize: 12, color: "#ef4444", marginTop: 4 },
});

const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({ label, error, style, ...props }, ref) => {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={[styles.input, error && styles.inputError, style]}
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          {...props}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
