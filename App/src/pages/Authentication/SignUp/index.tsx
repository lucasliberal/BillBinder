import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import styles_global from '../../style';

export default function SignUp({navigation}) {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState({"msg": "", "code": 200})

    const signUp = () => {
      //run in terminal: npx json-server --host 192.168.0.114 ./mock/db.json

      if(name && email && password){
        axios.post('http://192.168.0.114:3000/users', {
          name:name,
          password: password,
          email:email
        })
        .then( (response) => {return response} )
        .then(() => {
          navigation.navigate('Login', {
            message: {
              msg: "Usuário cadastrado",
              code: 201
            }
          });
        })
        .catch( (err) => console.log(err) )
      }else{
        setMsg({"msg": "Preencha todos os campos", "code": 401})
        setTimeout(() => {
          setMsg({"msg": "", "code": 200})
        }, 4000);
      }

    }

    return (
      <View style={styles_local.container}>
        <StatusBar/>
        <View style={styles_global.msg_container}>
          {msg.code == 401 && <Text style={styles_global.msg_error}>{msg.msg}</Text>}
        </View>
        <View style={styles_local.block}>  
          <View style={{marginBottom: 50}}>
            <Image style={styles_global.logo} source={require('../../../../assets/icon-transparent.png')}/>
            <Text style={{fontSize: 30, color: "#e7e7e7", textAlign: 'center', fontWeight: 'bold'}}>Cadastro</Text>
          </View>
          
          <View style={{alignSelf: 'center'}}>
            <View style={{marginBottom: 50, gap: 30}}>
              {/* <Text style={[styles_global.txt_inputTitle, {color: '#e7e7e7', marginStart: 30}]}>Nome:</Text> */}
              <TextInput placeholder="Nome" placeholderTextColor={'#14423C'} value={name} onChangeText={setName} style={styles_global.txt_inputSignUpPage}/>
              {/* <Text style={[styles_global.txt_inputTitle, {color: '#e7e7e7', marginStart: 30}]}>E-mail:</Text> */}
              <TextInput placeholder="E-mail" placeholderTextColor={'#14423C'} value={email} onChangeText={setEmail} style={styles_global.txt_inputSignUpPage}/>
              {/* <Text style={[styles_global.txt_inputTitle, {color: '#e7e7e7', marginStart: 30}]}>Senha:</Text> */}
              <TextInput placeholder="Senha" secureTextEntry={true} placeholderTextColor={'#14423C'} value={password} onChangeText={setPassword} style={styles_global.txt_inputSignUpPage}/>
            </View>
            
            {/** Botao Cadastrar */}
            <View style={{gap: 12}}>
              <TouchableOpacity onPress={signUp} style={[styles_global.btn_login1, {marginBottom: 15}]}>
                <Text style={styles_global.txt_btnLogin}>Cadastrar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.popToTop()} style={{}}>
                <Text style={[styles_global.txt_btnLogin, {color: '#F5F5F5', fontWeight: 'normal', borderBottomColor:'#F5F5F5', borderBottomWidth:1}]}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  
  const styles_local = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#14423C',
      justifyContent: 'center',
    },
    block:{
      flex: 1,
      backgroundColor: '#14423C',
      justifyContent: 'center',
    },
    
    btn_position: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingStart: 30,
      paddingEnd: 30,
      marginTop: 30
    },
  });