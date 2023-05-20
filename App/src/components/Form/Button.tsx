import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export function Button_PRIMARY({text, onPress}){
    return(
      <TouchableOpacity activeOpacity={0.8} style={styles.btn1} onPress={onPress}>
        <Text style={styles.txt_btn}>{text}</Text>
      </TouchableOpacity>
    );
  }

export function Button_SECONDARY({text, onPress}){
    return(
    <TouchableOpacity style={styles.btn2} onPress={onPress}>
        <Text style={{color: 'white'}}>{text}</Text>
    </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
    btn1:{
        width: 180,
        elevation: 8,
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignSelf: 'center'
    },
    btn2: {
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 20,
        padding: 5,
    },
    txt_btn:{
        fontSize: 18,
        color: '#14423C',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    }
});