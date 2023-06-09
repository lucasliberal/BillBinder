import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import styles_global from '../../style';

export default function Register({navigation}) {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = () => {
      //run in terminal: npx json-server --host 192.168.0.114 ./mock/db.json
      axios.post('http://192.168.0.114:3000/users', {
        name:name,
        password: password,
        email:email
      })
      .then( (response) => {return response} )
      .then( () => {
        Alert.alert('', 'Usuário cadastrado!');
        navigation.navigate('Login');
      } )
      .catch( (err) => console.log(err) )
    }

    return (
      <View style={styles_local.container}>
        <StatusBar/>
        <View style={{marginBottom: 50, marginTop: 50}}>
          <Image style={styles_local.logo} source={require('../../../../assets/icon.png')}/>
          <Text style={{fontSize: 30, color: "#e7e7e7", textAlign: 'center'}}>Cadastro</Text>
        </View>
        
        <View>
          <View style={{marginBottom: 50, gap: 30}}>
            {/* <Text style={[styles_global.txt_inputTitle, {color: '#e7e7e7', marginStart: 30}]}>Nome:</Text> */}
            <TextInput placeholder="Nome" placeholderTextColor={'#14423C'} value={name} onChangeText={setName} style={styles_global.txt_inputRegisterPage}/>
            {/* <Text style={[styles_global.txt_inputTitle, {color: '#e7e7e7', marginStart: 30}]}>E-mail:</Text> */}
            <TextInput placeholder="E-mail" placeholderTextColor={'#14423C'} value={email} onChangeText={setEmail} style={styles_global.txt_inputRegisterPage}/>
            {/* <Text style={[styles_global.txt_inputTitle, {color: '#e7e7e7', marginStart: 30}]}>Senha:</Text> */}
            <TextInput placeholder="Senha" secureTextEntry={true} placeholderTextColor={'#14423C'} value={password} onChangeText={setPassword} style={styles_global.txt_inputRegisterPage}/>
          </View>
          
          {/** Botao Cadastrar */}
          <View style={{gap: 12}}>
            <TouchableOpacity onPress={register} style={[styles_global.btn_login1, {marginBottom: 15}]}>
              <Text style={styles_global.txt_btnLogin}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
              <Text style={[styles_global.txt_btnLogin, {color: '#F5F5F5', fontWeight: 'normal', borderBottomColor:'#F5F5F5', borderBottomWidth:1}]}>Voltar</Text>
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
    
    logo: {
      alignSelf: 'center',
      marginBottom: 0,
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
  });