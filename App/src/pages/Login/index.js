import {} from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Botao1, Botao2} from '../../components/Botao';
import { InputBox1 } from '../../components/InputBox';
import { AntDesign } from '@expo/vector-icons';

export function Login() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../../assets/icon.png')}/>
        
        <View style={styles.formulario}>
          <InputBox1 placeholder='Digite aqui seu e-mail'/>
          <InputBox1 placeholder='Digite aqui sua senha' password={true}/>
          <Botao1/>
        </View>

        <View style = {styles.btn}>
          <Botao2 text="Cadastre-se"/>
          <Botao2 text="Esqueci a senha"/>
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