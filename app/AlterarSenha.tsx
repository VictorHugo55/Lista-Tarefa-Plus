import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../src/services/firebaseConfig'
import { useRouter } from 'expo-router';
import { useTheme } from '../src/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen() {
  const {colors} = useTheme()
  const {t} = useTranslation();
  // Estados para armazenar os valores digitados
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');

  const router = useRouter() // Hook para navegação

  // Função para realizar update de senha
  const handleAlterarSenha = async() => {
    if (!novaSenha || !confirmarSenha || !senhaAtual) {
      Alert.alert(t("attention"), t("errors.error1"));
      return;
    }
    //Verificar se a nova senha é igual a confirmação da senha
    if(novaSenha!== confirmarSenha){
        Alert.alert(t("error"),t("errors.error2"))
        return
    }
    //Tratamento do tamanho da senha se for menos 6 caracteres
    if(novaSenha.length<6){
        Alert.alert(t("error"),t("errors.error3"))
        return
    }
    try{
        const user = auth.currentUser;
        if(!user || !user.email){
            Alert.alert(t("error"),t("countion3"))
            return
        }
        //Cria as credenciais com e-mail e senha atual para reatenticar
        const credencial = EmailAuthProvider.credential(user.email,senhaAtual)
        await reauthenticateWithCredential(user,credencial)

        //Após reautenticar , vamos alterar senha
        await updatePassword(user,novaSenha)
        Alert.alert(t("success"),t("pass.successChange"))
        router.push('/HomeScreen')
    }catch(error){
      console.log("Erro ao alterar senha")
    }

    
    }

    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Text style={[styles.titulo, {color: colors.text}]}>{t("pass.changePass")}</Text>

        {/* Campo Nome */}
        <TextInput
          style={[styles.input, {backgroundColor: colors.input, color:colors.inputText}]}
          placeholder={t("pass.actPass")}
          placeholderTextColor={colors.inputText}
          value={senhaAtual}
          onChangeText={setSenhaAtual}
        />

        {/* Campo Email */}
        <TextInput
          style={[styles.input, {backgroundColor: colors.input, color:colors.inputText}]}
          placeholder={t("pass.newPass")}
          placeholderTextColor={colors.inputText}
          value={novaSenha}
          onChangeText={setNovaSenha}
        />

        {/* Campo Senha */}
        <TextInput
          style={[styles.input, {backgroundColor: colors.input, color:colors.inputText}]}
          placeholder={t("pass.confirmNewPass")}
          placeholderTextColor={colors.inputText}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        {/* Botão */}
        <TouchableOpacity style={[styles.botao, {backgroundColor: colors.button}]} onPress={handleAlterarSenha}>
          <Text style={[styles.textoBotao, {color: colors.buttonText}]}>{t("pass.changePass")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Estilização
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      justifyContent: 'center',
      padding: 20,
    },
    titulo: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 30,
      textAlign: 'center',
    },
    input: {
      backgroundColor: '#1E1E1E',
      color: '#fff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#333',
    },
    botao: {
      backgroundColor: '#00B37E',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    textoBotao: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });