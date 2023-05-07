import {} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, Entypo, Feather, MaterialIcons } from '@expo/vector-icons';

export default function BarraInferior(botaoAtivo){
    var valor = botaoAtivo.valor.toLowerCase();
    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <TouchableOpacity style={[styles.btn, valor == 'menu' ?  styles.btnAtivo : null]}>
                    <Feather name="menu" size={18} color="#14423C" />
                    <Text style={styles.txt}>Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, valor == 'caixa' ?  styles.btnAtivo : null]}>
                    <FontAwesome5 name="cash-register" size={18} color="#14423C" />
                    <Text style={styles.txt}>Caixa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, valor == 'adicionar' ?  styles.btnAtivo : null]}>
                <Entypo name="add-to-list" size={18} color="#14423C" />
                    <Text style={styles.txt}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, valor == 'pagar' ?  styles.btnAtivo : null]}>
                    <MaterialIcons name="money-off" size={18} color="#14423C" />
                    <Text style={styles.txt}>A pagar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, valor == 'receber' ?  styles.btnAtivo : null]}>
                    <MaterialIcons name="attach-money" size={18} color="#14423C" />
                    <Text style={styles.txt}>A receber</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    menu:{
        paddingTop: 12,
        paddingBottom: 12,
        paddingStart: 24,
        paddingEnd: 24,
        backgroundColor: '#e7e7e7',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopColor: 'rgba(0, 0, 0, 0.5)',
        borderTopWidth: 1,
    },
    btn:{
        width: 54,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderTopWidth: 2,  
        borderColor: '#e7e7e7',
    },
    btnAtivo:{
        borderBottomColor: '#14423C',
        borderBottomWidth: 2,
    },
    txt:{
        fontSize: 13,
        color: '#14423C',
        letterSpacing: -0.5
    }
});