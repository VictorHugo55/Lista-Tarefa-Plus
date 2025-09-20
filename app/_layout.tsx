import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/ThemeContext";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "../src/services/i18n";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient} > 
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </QueryClientProvider>   
    </I18nextProvider>
  );
}
