import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
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
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    width: "100%",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(30, 25, 20, 0.12)",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  triggerError: {
    borderColor: "hsl(0 72% 51%)",
    boxShadow: "0 0 0 3px rgba(0, 72, 51, 0.12)",
  },
  triggerText: { fontSize: 15, color: "hsl(20 15% 10%)" },
  placeholder: { fontSize: 15, color: "hsl(20 10% 65%)" },
  error: {
    fontSize: 12,
    color: "hsl(0 72% 51%)",
    marginTop: 6,
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(20, 16, 12, 0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    boxShadow: "0 -4px 24px rgba(26, 21, 18, 0.15)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(30, 25, 20, 0.06)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "hsl(20 15% 10%)",
    letterSpacing: -0.02,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(30, 25, 20, 0.04)",
  },
  optionSelected: {
    backgroundColor: "hsl(15 40% 96%)",
  },
  optionText: {
    fontSize: 15,
    color: "hsl(20 15% 10%)",
    fontWeight: "500",
  },
});

const Select = React.forwardRef<View, SelectProps>(
  ({ options, value, onValueChange, placeholder = "Selecione...", label, error, disabled }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const selectedLabel = options.find((o) => o.value === value)?.label;

    return (
      <View style={styles.container} ref={ref}>
        {label && <Text style={styles.label}>{label}</Text>}
        <Pressable
          style={[styles.trigger, error && styles.triggerError]}
          onPress={() => !disabled && setVisible(true)}
        >
          <Text style={selectedLabel ? styles.triggerText : styles.placeholder}>
            {selectedLabel || placeholder}
          </Text>
          <Ionicons name="chevron-down" size={18} color="hsl(20 10% 45%)" />
        </Pressable>
        {error && <Text style={styles.error}>{error}</Text>}

        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
          <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
            <View style={styles.modal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{placeholder}</Text>
                <Pressable onPress={() => setVisible(false)}>
                  <Ionicons name="close" size={24} color="hsl(20 10% 45%)" />
                </Pressable>
              </View>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Pressable
                    style={[styles.option, item.value === value && styles.optionSelected]}
                    onPress={() => {
                      onValueChange?.(item.value);
                      setVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                    {item.value === value && (
                      <Ionicons name="checkmark" size={20} color="hsl(65 32% 42%)" />
                    )}
                  </Pressable>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  }
);

Select.displayName = "Select";

export { Select, SelectOption };
