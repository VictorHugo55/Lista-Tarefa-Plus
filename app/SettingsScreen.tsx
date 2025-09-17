import { useTheme } from "../src/context/ThemeContext";
import ThemeToggleButton from "../src/components/ThemeToggloButton";
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from "react-native";

export default function Settings(){
    const {colors} = useTheme()
    const {t,i18n} = useTranslation()

    return(
        <View style={[style.container,{backgroundColor:colors.background}]}>
            <ThemeToggleButton/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
})