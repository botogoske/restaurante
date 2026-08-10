import * as React from "react";
import { View, StyleSheet } from "react-native";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  style?: object;
}

function Separator({ orientation = "horizontal", style }: SeparatorProps) {
  return (
    <View
      style={[
        orientation === "horizontal"
          ? { height: 1, width: "100%", backgroundColor: "#e2e8f0" }
          : { height: "100%", width: 1, backgroundColor: "#e2e8f0" },
        style,
      ]}
    />
  );
}

Separator.displayName = "Separator";

export { Separator };
