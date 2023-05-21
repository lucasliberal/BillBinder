import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ListItem( {data, onPress} ){
    const title = data.tipo === 0 && data.situacao === 1 ? 'Pago' :
                    data.tipo === 0 && data.situacao === 0 ? 'A pagar' :
                    data.tipo === 1 && data.situacao === 1 ? 'Recebido' : 'A receber';

    return (
        <TouchableOpacity style={styles.item} activeOpacity={0.5} onPress={onPress}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* {data.situacao == 1 ? <AntDesign name="checkcircleo" color='#318E22' size={20}/> :
                    <AntDesign name="closecircleo" size={20} color='rgba(0, 0, 0, 0.2)'/>} */}
                    <View style={{flexDirection: 'column', marginStart: 12}}>
                        <View style={{flexDirection: 'row', marginBottom:4, alignItems:'baseline'}}>
                        <Text style={[styles.titulo, data.tipo === 1 ? {color:"#318E22"} : {color:"#C32020"}]}>{title} </Text>
                            <Text style={styles.data}>{data.situacao === 1 ? `em ${data.db}` : `até ${data.dv}` }</Text>
                        </View>
                        <Text style={styles.descricao}>{data.descricao}</Text>
                    </View>
                </View>
                <Text style={styles.valor}>
                    {data.tipo === 1 ?
                        `+ R$ ${data.valor}` :
                        `- R$ ${data.valor}`}
                </Text>
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
    },
    descricao:{
        fontSize: 16,
    },

});