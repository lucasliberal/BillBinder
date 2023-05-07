import {} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Movimentacoes( {dado} ){
    return (
        <TouchableOpacity style={styles.item} activeOpacity={0.5}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign name="checkcircleo" size={20} color="#318E22" style={styles.iconeCheck}/>
                    <View style={{flexDirection: 'column', marginStart: 12}}>
                        <View style={{flexDirection: 'row', marginBottom:4, alignItems:'baseline'}}>
                            {dado.tipo == 1 ? <Text style={[styles.titulo, {color:"#318E22"}]}>Recebido </Text> : <Text style={[styles.titulo, {color:"#C32020"}]}>Pago </Text> }
                            <Text style={styles.data}>em {dado.db}</Text>
                        </View>
                        
                        <Text style={styles.descricao}>{dado.descricao}</Text>
                    </View>
                </View>
                <Text style={styles.valor}>
                    {dado.tipo === 1 ? `R$ ${dado.valor}` : `R$ -${dado.valor}`}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles  = StyleSheet.create({
    item:{
        backgroundColor: '#efefef',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 1,
        borderRadius: 5,
        paddingEnd: 24,
        paddingStart: 24,
        paddingTop: 8,
        paddingBottom: 8
    },
    titulo:{
        color: '#318E22',
        fontSize: 16,
        fontWeight: 'bold',
    },
    data:{
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: 14,
    },
    valor:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    descricao:{
        fontSize: 16,
    },

});