import { useTheme } from "../src/context/ThemeContext";
import ThemeToggleButton from "../src/components/ThemeToggloButton";
import { useTranslation } from 'react-i18next';
import { View } from "react-native";

export default function Settings(){
    const {colors} = useTheme()
    const {t,i18n} = useTranslation()

    return(
        <View style={[{backgroundColor:colors.background}]}>
            <ThemeToggleButton/>
        </View>
    )
}