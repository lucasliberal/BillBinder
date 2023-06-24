import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles_global from "../../style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Menu({navigation}) {
    const signOut = async () => {
        AsyncStorage.clear();
        //navigation.navigate('BillInformation');
    }

    return(
        <View style={[styles_global.container]}>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.txt_btn}>Alterar dados</Text>
                </TouchableOpacity>
                <View style={styles.divisor}/>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.txt_btn}>Sobre nós</Text>
                </TouchableOpacity>
                <View style={styles.divisor}/>
                <TouchableOpacity style={styles.btn} onPress={signOut}>
                    <Text style={styles.txt_btn}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    menu:{
        flex:1,
        gap: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    btn:{
        
    },
    txt_btn:{
        color: "#14423C",
        fontWeight: '400',
        fontSize: 20,
    },
    divisor:{
        height:1,
        backgroundColor: '#14423C',
        width: 150
    }
});