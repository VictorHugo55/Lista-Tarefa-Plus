import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ThemeToggleButton() {
    const { toggleTheme, colors } = useTheme();
    const {t} = useTranslation();
    const isDarkMode = colors.mode === "dark"; // Verifica se o tema é escuro

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color:"black" }]}>
                {t("changeTheme")}
            </Text>
            <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: "#4b9cd3", true: "#4b9cd3" }} // Cores do track
                thumbColor={isDarkMode ? "#fff" : "#4b9cd3"}  // Cores do thumb
                style={styles.switch} // Estilo do switch
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      borderRadius:15,
      backgroundColor:"#a8a7a7",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 10, // Espaço entre o texto e o switch
    },
    switch: {
        transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], // Aumentando o tamanho do switch um pouco
    },
});
