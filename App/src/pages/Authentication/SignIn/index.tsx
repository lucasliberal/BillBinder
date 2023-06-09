import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles_global from '../../style';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
      //run in terminal: npx json-server --host 192.168.0.114 ./mock/db.json

      fetch(`http://192.168.0.114:3000/users?email=${email}&password=${password}`)
        .then ( (response) => {return response.json()})
        .then ( (json) => {
          if (Object.keys(json).length === 0){
            Alert.alert('', 'Login inválido');
          }else {
            AsyncStorage.setItem('userId', JSON.stringify(json[0]['id']));
            navigation.navigate('Dashboard')
          }
        })
        .catch((err) => {
          console.log(err);
        })
      //navigation.navigate('Dashboard')
    }

    return (
      <View style={styles_local.container}>
        <StatusBar/>
        <Image style={styles_local.logo} source={require('../../../../assets/icon.png')}/>
        
        <View>
          <TextInput placeholder="E-mail" placeholderTextColor={'white'} value={email} onChangeText={setEmail} style={styles_global.txt_inputLoginPage}/>
          <TextInput placeholder="Senha" secureTextEntry={true} placeholderTextColor={'white'} value={password} onChangeText={setPassword} style={styles_global.txt_inputLoginPage}/>
          
          {/** Botao Entrar */}
          <TouchableOpacity onPress={signIn} style={styles_global.btn_login1}>
            <Text style={styles_global.txt_btnLogin}>Entrar</Text>
          </TouchableOpacity>
        </View>

        {/** Botao Cadastre-se e Esqueci a senha */}
        <View style = {styles_local.btn_position}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles_global.btn_login2}>
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
    );
  }
  
  const styles_local = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#14423C',
      justifyContent:'center'
    },
    
    logo: {
      alignSelf: 'center',
      marginBottom: 50,
      height: 120,
      width: 120,
    },
    
    btn_position: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingStart: 30,
      paddingEnd: 30,
      marginTop: 30
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
      marginTop: 32,
      marginBottom: 32
    },

    btnAlternativo:{
      flexDirection:'row',
      justifyContent: 'center',
      gap: 50
    }
  });