import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "hsl(15 70% 35%)",
        tabBarInactiveTintColor: "hsl(20 10% 55%)",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "rgba(30, 25, 20, 0.06)",
          height: 88,
          paddingBottom: 28,
          paddingTop: 8,
          boxShadow: "0 -2px 8px rgba(26, 21, 18, 0.04)",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.02,
        },
        headerStyle: {
          backgroundColor: "hsl(40 20% 98%)",
          borderBottomWidth: 1,
          borderBottomColor: "rgba(30, 25, 20, 0.06)",
        },
        headerTitleStyle: {
          fontSize: 17,
          fontWeight: "600",
          color: "hsl(20 15% 10%)",
          letterSpacing: -0.02,
        },
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cadastros"
        options={{
          title: "Cadastros",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="relatorios"
        options={{
          title: "Relatórios",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
