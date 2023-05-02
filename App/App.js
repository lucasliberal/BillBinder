import Login from './src/pages/Login';
import Caixa from './src/pages/Caixa';
import AddPagamento from './src/pages/AddPagamento';
import {} from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

export default function App (){
  return (
    <View style={styles.container}>
      <StatusBar/>
      <Caixa/>
    </View>
  
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
});