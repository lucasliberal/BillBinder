import {} from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image, onPress} from 'react-native';
import Caixa from '../Caixa';

export default function Login() {
    return (
      <View style={styles.container}>
        <View style={{position: 'relative'}}>
          <Image style={styles.img_logo} source={require('../../../assets/icon.png')}></Image>
        </View>
        
        <View style={styles.bloco1}>
          <TextInput style={styles.campo_login} placeholder='Digite aqui seu e-mail' placeholderTextColor={'white'}></TextInput>
          <TextInput style={styles.campo_login} placeholder='Digite aqui sua senha' placeholderTextColor={'white'}></TextInput>
          <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.btn}>
            <Text style={styles.txt_btn}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style = {styles.campo_btn2}>
          <TouchableOpacity style={styles.btn2}>
            <Text style={{color: 'white'}}>Cadastre-se</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2}>
            <Text style={{color: 'white'}}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#14423C',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    bloco1: {
      position: 'relative',
      borderColor: 'red',
      borderWidth: 1
    },

    campo_btn2: {
      width: 300,
      position: 'relative',
      flexDirection: 'row',
      borderColor: 'red',
      borderWidth: 1,
      justifyContent: 'space-between',
      marginTop: 20
    },

    btn2: {
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 20,
      padding: 5,
    },
  
    img_logo: {
      position: 'relative',
      display: 'flex',
      borderWidth: 1,
      borderColor: 'blue',
      top: 50,
      alignSelf: 'center',
      height: 120,
      width: 120,
      marginBottom: 100,
    },
  
    campo_login: {
      position: 'relative',
      display: 'flex',
      textAlign: 'center',
      width: 300,
      height: 50,
      alignSelf: 'center',
      borderColor: 'white',
      borderLeftWidth: 10,
      borderBottomWidth: 2,
      marginBottom: 40,
      color: 'white'
    },
  
    btn:{
      width: 180,
      elevation: 8,
      backgroundColor: 'white',
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignSelf: 'center'
    },
  
    txt_btn:{
      fontSize: 18,
      color: '#14423C',
      fontWeight: 'bold',
      alignSelf: 'center',
      textTransform: 'uppercase'
    }
  });