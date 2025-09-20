import { useTheme } from "../src/context/ThemeContext";
import ThemeToggleButton from "../src/components/ThemeToggloButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Button, Alert, KeyboardAvoidingView, Platform,} from "react-native";
import { deleteUser } from "firebase/auth";
import {
  auth,
  collection,
  addDoc,
  db,
  getDocs,
} from "../src/services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Settings(){
    const {colors} = useTheme()
    const {t,i18n} = useTranslation()
    const router = useRouter();

    const toggleLanguage = () => {
        const newLang = i18n.language === "pt" ? "en" : "pt";
        i18n.changeLanguage(newLang);
    };

    const realizarLogoff = async () => {
    await AsyncStorage.removeItem("@user");
    router.push("/");
  };

  const excluirConta = () => {
        Alert.alert(
            t("confirmDelete"),
            t("countion.countion1"),
            [
                { text: t("cancel"), style: "cancel" },
                {
                    text: t("delete"), style: 'destructive',
                    onPress: async () => {
                        try {
                            const user = auth.currentUser
                            if (user) {
                                await deleteUser(user)//Apaga do firebase Auth
                                await AsyncStorage.removeItem('@user')
                                Alert.alert("Conta Excluída", "Sua conta foi excluída com sucesso.")
                                router.replace('/')
                            } else {
                                Alert.alert("Erro", "Nenhum usuário logado.")
                            }
                        } catch (error) {
                            console.log("Erro ao excluir conta.")
                            Alert.alert("Error", "Não foi possível excluir conta")
                        }
                    }
                }
            ]
        )
    }

    return(
        <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
            <KeyboardAvoidingView //é componente que ajusta automaticamente o layout
                style={styles.button}
                behavior={Platform.OS === "ios" ? "padding" : "height"} //No ios é utilizado padding, e no android o height
                keyboardVerticalOffset={20} //Descola o conteúdo na vertical em 20 pixel
            >
            
                    <ThemeToggleButton />
<Button title={t("logout")} onPress={realizarLogoff} />
            <Button title={t("deletaAccount")} color='red' onPress={excluirConta} />
            <Button title={t("changePass")} onPress={() => router.push("/AlterarSenha")} />
                    <Button
                        
                        title={i18n.language === "pt" ? "Mudar para Inglês" : "Switch to Portuguese"}
                        onPress={toggleLanguage}
                        color={colors.primary}
                        
                    />
                
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fffdfd',
    justifyContent: 'space-between',
    padding: 20,
  },
  section: {
    flex:1,
    marginBottom: 20,
    
  },
  button: {
    flex:0.5,
    marginTop:20,
    justifyContent:'space-between',
    marginBottom:20,
    borderRadius:10
  }
})