import React, {useState} from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, StatusBar} from 'react-native';
import {Button_PRIMARY, Button_SECONDARY} from '../../components/Form/Button';
import { TextInput_PRIMARY, TextInput_SECONDARY } from '../../components/Form/TextInput';
import { AntDesign } from '@expo/vector-icons';

export default function Login({navigation}) {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');

    return (
      <View style={styles.container}>
        <StatusBar/>
        <Image style={styles.logo} source={require('../../../assets/icon.png')}/>
        
        <View>
          <TextInput_PRIMARY 
            placeholder='Digite aqui seu e-mail'
            type='text'
            value={username}
            setValue={setUsername}
          />
          <TextInput_PRIMARY
            placeholder='Digite aqui sua senha'
            type='password'
            value={password}
            setValue={setPassword}
            />
          <Button_PRIMARY onPress={() => navigation.navigate('HomeScreen')} text={"Entrar"}/>
        </View>

        <View style = {styles.btn}>
          <Button_SECONDARY onPress={''} text="Cadastre-se"/>
          <Button_SECONDARY onPress={''} text="Esqueci a senha"/>
        </View>

        <View style = {styles.divisor}>
          <View style={styles.linha}/>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Ou</Text>
          <View style={styles.linha}/>
        </View>

        <View style={styles.btnAlternativo}>
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
  
  const styles = StyleSheet.create({
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
    
    btn: {
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