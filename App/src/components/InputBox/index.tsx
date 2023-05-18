import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export function InputBox1({placeholder, password}){
    return(
        <TextInput secureTextEntry={password} style={styles.campo_login} placeholder={placeholder} placeholderTextColor={'white'}></TextInput>
    );
}
  
export function InputBox2({titulo, tamanho, placeholder}) {
    return(
        <View>
            <Text style={styles.titulo}>{titulo}</Text>
            <TextInput style={[styles.input, {width:tamanho}]} placeholder={placeholder}/>
        </View>
    );
}


const styles = StyleSheet.create({
    input:{
        height: 36,
        borderColor: "#14423C",
        borderLeftWidth: 6,
        borderBottomWidth: 2,
        paddingLeft: 14,
        marginBottom: 24,
    },
    titulo:{
        color: '#14423C',
        fontSize: 16,
        fontWeight: 'bold'
    },
    campo_login: {
        position: 'relative',
        display: 'flex',
        textAlign: 'left',
        paddingStart: 16,
        width: 300,
        height: 50,
        alignSelf: 'center',
        borderColor: 'white',
        borderLeftWidth: 10,
        borderBottomWidth: 2,
        marginBottom: 40,
        color: 'white',
      },
});