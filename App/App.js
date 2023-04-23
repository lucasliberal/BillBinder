import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';

const AppButton = ({onPress, title}) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.btn}>
    <Text style={styles.txt_btn}>{title}</Text>
  </TouchableOpacity>
)

const App = () => {
  return (
    <View style={styles.container}>
      <View style={{position: 'relative'}}>
        <Image style={styles.img_logo} source={require('./assets/icon.png')}></Image>
      </View>
      
      <View style={styles.bloco1}>
        <TextInput style={styles.campo_login} placeholder='Digite aqui seu e-mail' placeholderTextColor={'white'}></TextInput>
        <TextInput style={styles.campo_login} placeholder='Digite aqui sua senha' placeholderTextColor={'white'}></TextInput>
        <AppButton title='Entrar'/>
      </View>

      <StatusBar style='light'/>
    </View>
  );
}

export default App;

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
