import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="funcionarios/novo" options={{ headerShown: false }} />
        <Stack.Screen name="fornecedores/novo" options={{ headerShown: false }} />
        <Stack.Screen name="pratos/novo" options={{ headerShown: false }} />
        <Stack.Screen name="clientes/novo" options={{ headerShown: false }} />
        <Stack.Screen name="cardapio/novo" options={{ headerShown: false }} />
        <Stack.Screen name="pedidos/novo" options={{ headerShown: false }} />
        <Stack.Screen name="pagamentos/novo" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
