import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles_global from '../../style';

export default function SignIn({navigation, route}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState({"msg": "Teste", "code": 200})

    const signIn = () => {
        fetch(`http://192.168.0.114:3000/users?email=${email}&password=${password}`)
        .then ( (response) => {return response.json()})
        .then ( (json) => {
          if (Object.keys(json).length === 0){
            setMsg({"msg": "E-mail e/ou senha inválidos!", "code": 401})
            setTimeout(() => {
              setMsg({"msg":"", "code": 200})
            }, 4000);
          }else {
            AsyncStorage.setItem('userId', JSON.stringify(json[0]['id']));
            navigation.replace('Dashboard')
          }
        })
        .catch((err) => {
          console.error(err);
        })
    }

    //Recebe parâmetros da rota
    useEffect(() => {
      if(route.params){
        setMsg({"msg": route.params.message.msg, "code": route.params.message.code})
        setTimeout(() => {
          setMsg({"msg":"", "code": 200})
        }, 4000);
      }
    }, [route.params]);

    //limpa os campos ao voltar para a tela de login
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setEmail("");
        setPassword("");
      });
      return unsubscribe;
    }, [navigation])

    return (
      <View style={styles_local.container}>
      <StatusBar/>
        <View style={styles_global.msg_container}>
          {msg.code == 401 && <Text style={styles_global.msg_error}>{msg.msg}</Text>/*401*/}
          {msg.code == 201 && <Text style={styles_global.msg_success}>{msg.msg}</Text>/*201*/}
        </View>
        <View style={styles_local.block}>
          <View style={{marginBottom: 40}}>
            <Image style={styles_global.logo} source={require('../../../../assets/icon-transparent.png')}/>
            <Text style={{fontSize: 30, color: "#e7e7e7", textAlign: 'center', fontWeight: 'bold'}}>Login</Text>
          </View>

          <View style={{alignSelf: 'center'}}>
            <View style={{gap: 25, marginBottom:45}}>
              <TextInput placeholder="E-mail" placeholderTextColor={'white'} value={email} onChangeText={setEmail} style={styles_global.txt_inputLoginPage}/>
              <TextInput placeholder="Senha" secureTextEntry={true} placeholderTextColor={'white'} value={password} onChangeText={setPassword} style={styles_global.txt_inputLoginPage}/>
            </View>
            
            {/** Botao Entrar */}
            <TouchableOpacity onPress={signIn} style={styles_global.btn_login1}>
              <Text style={styles_global.txt_btnLogin}>Entrar</Text>
            </TouchableOpacity>
          </View>

          {/* * Botao Cadastre-se e Esqueci a senha */}
          <View style = {styles_local.btn_position}>
            <TouchableOpacity onPress={() => navigation.push('SignUp')} style={styles_global.btn_login2}>
              <Text style={{color:'white', fontSize: 14, borderBottomColor: 'white', borderBottomWidth: 1}}>Cadastre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={null} style={styles_global.btn_login2}>
              <Text style={{color:'white', fontSize: 14, borderBottomColor: 'white', borderBottomWidth: 1}}>Esqueci a senha</Text>
            </TouchableOpacity>
          </View>

          <View style = {styles_local.divisor}>
            <View style={styles_local.linha}/>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Ou</Text>
            <View style={styles_local.linha}/>
          </View>

          <View style={styles_local.btnAlternativo}>
            <TouchableOpacity>
              <AntDesign name="facebook-square" size={40} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="google" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    );
  }
  
  const styles_local = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#14423C',
    },
    block:{
      backgroundColor: '#14423C',
      justifyContent: 'center',
      flex: 1
    },
    
    btn_position: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingStart: 30,
      paddingEnd: 30,
      marginTop: 20
    },
    
    linha: {
      width: 120,
      height:2,
      backgroundColor: 'white',
      alignSelf: 'center'
    },
    
    divisor:{
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingStart: 30,
      paddingEnd: 30,
      marginTop: 20,
      marginBottom: 20
    },

    btnAlternativo:{
      flexDirection:'row',
      justifyContent: 'center',
      gap: 50
    }
  });