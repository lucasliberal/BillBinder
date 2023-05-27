import React, {useState} from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styles_global from '../style';

export default function Login({navigation}) {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');

    return (
      <View style={styles_local.container}>
        <StatusBar/>
        <Image style={styles_local.logo} source={require('../../../assets/icon.png')}/>
        
        <View>
          <TextInput placeholder=" Digite aqui seu e-mail" placeholderTextColor={'white'} value={username} onChangeText={setUsername} style={styles_global.txt_inputLoginPage}/>
          <TextInput placeholder=" Digite aqui sua senha" secureTextEntry={true} placeholderTextColor={'white'} value={password} onChangeText={setPassword} style={styles_global.txt_inputLoginPage}/>
          
          {/** Botao Entrar */}
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles_global.btn_login1}>
            <Text style={styles_global.txt_btnLogin}>Entrar</Text>
          </TouchableOpacity>
        </View>

        {/** Botao Cadastre-se e Esqueci a senha */}
        <View style = {styles_local.btn_position}>
          <TouchableOpacity onPress={null} style={styles_global.btn_login2}>
            <Text style={{color:'white'}}>Cadastre-se</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={null} style={styles_global.btn_login2}>
            <Text style={{color:'white'}}>Esqueci a senha</Text>
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