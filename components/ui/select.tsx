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
  container: { width: "100%" },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 6, color: "#0f172a" },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    width: "100%",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  triggerError: { borderColor: "#ef4444" },
  triggerText: { fontSize: 14, color: "#0f172a" },
  placeholder: { fontSize: 14, color: "#94a3b8" },
  error: { fontSize: 12, color: "#ef4444", marginTop: 4 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modal: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  modalTitle: { fontSize: 18, fontWeight: "600", color: "#0f172a" },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  optionSelected: { backgroundColor: "#f1f5f9" },
  optionText: { fontSize: 14, color: "#0f172a" },
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
          <Ionicons name="chevron-down" size={16} color="#64748b" />
        </Pressable>
        {error && <Text style={styles.error}>{error}</Text>}

        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
          <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
            <View style={styles.modal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{placeholder}</Text>
                <Pressable onPress={() => setVisible(false)}>
                  <Ionicons name="close" size={24} color="#64748b" />
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
                    {item.value === value && <Ionicons name="checkmark" size={20} color="#22c55e" />}
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
