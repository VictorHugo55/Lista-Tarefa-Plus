import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import{auth} from '../src/services/firebaseConfig'
import { useTheme } from '../src/context/ThemeContext';

import { useTranslation } from 'react-i18next';
import ThemeToggleButton from '../src/components/ThemeToggloButton';


export default function LoginScreen() {
  //Hook dp i18next, que fornece a função t,
  //para buscar e traduzir para o idioma atual
  const{t,i18n} = useTranslation()

  const {colors} = useTheme()

  // Estados para armazenar os valores digitados

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter()//Hook de navegação

  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      try {
        const usuarioSalvo = await AsyncStorage.getItem('@user')
        if (usuarioSalvo) {
          router.push('/HomeScreen')//Se tiver algo armazenado local, redireciona para HomeScreen
        }
      } catch (error) {
        console.log("Erro ao verificar login", error)
      }
    }

    //Chama a função estruturada acima
    verificarUsuarioLogado()
  },[])

// Função para simular o envio do formulário
const handleLogin = () => {
  if (!email || !senha) {
    Alert.alert(t("attention"), t("errors.error1"));
    return;
  }
  //Função para realizar o login
  signInWithEmailAndPassword(auth, email, senha)
    .then(async(userCredential)=>{
      const user = userCredential.user
      await AsyncStorage.setItem('@user',JSON.stringify(user))
      router.push('/HomeScreen')
    })
    .catch((error)=>{
      const errorCode = error.code
      const errorMessage = error.message
      console.log("Error Mensagem: ",errorMessage)
      if(error.code === 'auth/invalid-credential'){
        Alert.alert(t("error"),t("verify.v1"))
      }
    })
};

//Função enviar o e-mail de reset de senha para o usuário
const esqueceuSenha = ()=>{
  if(!email){
    alert("recovery.r1")
    return
  }
  sendPasswordResetEmail(auth,email)
    .then(()=>{alert(t("recovery.r2"))})
    .catch((error)=>{
      console.log("Error ao enviar email",error.message)
      alert("Erro ao enviar e-mail. Verifique se o email está correto.")
    })
}

//Função para alterar o idioma 
const mudarIdioma = (lang:string)=>{
  i18n.changeLanguage(lang)
}

return (
  <View style={[styles.container,{backgroundColor:colors.background}]}>
    <Text style={[styles.titulo,{color:colors.text}]}>{t("login")}</Text>
    

    {/* Campo Email */}
    <TextInput
      style={[styles.input,{backgroundColor:colors.input,color:colors.inputText}]}
      placeholder="E-mail"
      placeholderTextColor={colors.inputText}
      keyboardType="email-address"
      autoCapitalize="none"
      value={email}
      onChangeText={setEmail}
    />

    {/* Campo Senha */}
    <View>
      <TextInput
      style={[styles.input,
        { backgroundColor:colors.input,
          color:colors.inputText}
      ]}
      placeholder={t('password')}
      placeholderTextColor={colors.inputText}
      secureTextEntry={true}
      value={senha}
      onChangeText={setSenha}
    />
      
    </View>
   
    
    

    {/* Botão */}


    <TouchableOpacity style={[styles.botao,{backgroundColor:colors.button}]} onPress={handleLogin}>
      <Text style={styles.textoBotao}>Login</Text>
    </TouchableOpacity>

    <Link href="CadastrarScreen" style={{ marginTop: 20, color:colors.text, marginLeft: 150 }}>{t('register')}</Link>    

     {/* Texto Esqueceu a senha */}
    <Text style={{color:colors.text,justifyContent:"center",marginLeft: 130}} 
      onPress={esqueceuSenha}>{t("forgotPass")}
    </Text>
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
  idiomaBotao:{

  }
});