import {} from 'react';
import {StyleSheet, StatusBar, Dimensions, View, Text, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

var statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 44;
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default function BarraSuperior({titulo}) {
    return (
        <View style={styles.container}>
            <Image style={styles.imgLogo} source={(require('../../../assets/icon-transparent.png'))}></Image>
            <Text style={styles.titulo}>{titulo}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#14423C',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    titulo:{
        alignSelf: 'flex-end',
        marginTop: 12,
        marginEnd: 24,
        marginBottom: 12,
        color: 'white',
        fontSize: 20,
        fontWeight: 'normal',
    },

    imgLogo:{
        width: 23,
        height: 30,
        alignSelf: 'center',
        marginStart: 24
    },

    btnMenu:{
        textAlign: 'center',
        alignSelf: 'center',
        height: 31,
        marginStart: 24,
    }
});