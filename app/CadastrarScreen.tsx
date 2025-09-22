import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/services/firebaseConfig'
import { useRouter } from 'expo-router';
import { useTheme } from '../src/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function CadastroScreen() {
  const { colors } = useTheme();
  // Estados para armazenar os valores digitados
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const {t} = useTranslation();

  const router = useRouter() // Hook para navegação

  // Função para simular o envio do formulário
  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert(t("attention"), t("errors.error1"));
      return;
    }
    //Criação do usuário com email e senha
    createUserWithEmailAndPassword(auth, email, senha)
      .then(async(userCredential) => {
        const user = userCredential.user
        //console.log(user)
        await AsyncStorage.setItem('@user',JSON.stringify(user))
        router.push("/HomeScreen")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
    }

    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Text style={[styles.titulo, {color: colors.text}]}>{t("createAccount")}</Text>

        {/* Campo Nome */}
        <TextInput
          style={[styles.input, {backgroundColor: colors.input, color:colors.inputText}]}
          placeholder={t("completedName")}
          placeholderTextColor={colors.inputText}
          value={nome}
          onChangeText={setNome}
        />

        {/* Campo Email */}
        <TextInput
          style={[styles.input, {backgroundColor: colors.input, color:colors.inputText}]}
          placeholder="E-mail"
          placeholderTextColor={colors.inputText}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Campo Senha */}
        <TextInput
          style={[styles.input, {backgroundColor: colors.input, color: colors.inputText}]}
          placeholder={t("pass.password")}
          placeholderTextColor={colors.inputText}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {/* Botão */}
        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.textoBotao}>{t("register.register2")}</Text>
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