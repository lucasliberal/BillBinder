import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import format from 'date-fns/format';
import { AntDesign } from '@expo/vector-icons';
import {mask, unmask, currency} from 'remask';

export default function ListItem( {data, onPress} ){
    const title = data.type === 0 && data.status === 1 ? 'Pago' :
                    data.type === 0 && data.status === 0 ? 'A pagar' :
                    data.type === 1 && data.status === 1 ? 'Recebido' : 'A receber';

    return (
        <TouchableOpacity style={styles.item} activeOpacity={0.5} onPress={onPress}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flexDirection: 'column', marginStart: 12}}>
                        <View style={{flexDirection: 'row', marginBottom:4, alignItems:'baseline'}}>
                        <Text style={[styles.titulo, data.type === 1 ? {color:"#318E22"} : {color:"#C32020"}]}>{title} </Text>
                            <Text style={styles.data}>{data.status === 1 ? `em ${format(new Date(data.debit_date), "dd/MM/yyyy")}` : `até ${format(new Date(data.expiration_date), "dd/MM/yyyy")}` }</Text>
                        </View>
                        <Text style={styles.descricao}>{data.description}</Text>
                    </View>
                </View>
                <Text style={styles.valor}>
                    {data.type === 1 ?
                        `+ ${currency.mask({locale: 'pt-BR', currency: 'BRL', value: data.value})}` :
                        `- ${currency.mask({locale: 'pt-BR', currency: 'BRL', value: data.value})}`}
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