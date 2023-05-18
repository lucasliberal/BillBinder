import {Login} from './src/pages/Login';
import Caixa from './src/pages/Caixa';
import AddPagamento from './src/pages/AddPagamento';
import React from 'react';
import {View, StatusBar, StyleSheet } from 'react-native';

export default function App (){
  return (
    <View style={styles.container}>
      <StatusBar/>
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
});