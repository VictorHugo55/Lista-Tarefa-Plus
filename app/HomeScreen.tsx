import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Button, Text } from "react-native";
import { useTheme } from "../src/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.welcomeText, { color: colors.text }]}>
        {t("welcome")}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title={t("tasksList")}
          onPress={() => router.push("/TasksScreen")}
          color={colors.primary}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={t("settings")}
          onPress={() => router.push("/SettingsScreen")}
          color={colors.primary}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 20,
  },
});
