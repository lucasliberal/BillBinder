import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export function TextInput_PRIMARY({placeholder, type, value, setValue}){
    type = type ? type : ''; 
    return(
        <TextInput
            value = {value}
            onChangeText={setValue}
            secureTextEntry={type == 'password' ? true : false}
            style={styles.campo_login}
            placeholder={placeholder}
            placeholderTextColor={'white'}>
        </TextInput>   
    );
}

export function TextInput_SECONDARY({title, tamanho, placeholder, type, value, setValue}) {
    type = type ? type : ''; 
    return(
        <View>
            <Text style={styles.title}>{title}</Text>
            <TextInput 
            value={value}
            onChangeText={setValue}
            secureTextEntry={type == 'password' ? true : false}
            style={[styles.input, {width:tamanho}]}
            placeholder={placeholder}/>
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
    title:{
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