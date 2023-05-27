import React from 'react';
import { StyleSheet, StatusBar, View, FlatList } from 'react-native';
import { PeriodFilter } from '../../../components/Filter';
import { ListItem } from '../../../components/List';
import styles_global from '../../style';

const list = [
    {
        id: 1,
        descricao: 'Energia',
        valor: '540,00',
        tipo: 0, // 1=receber | 0=pagar
        situacao: 0, // 1=cocluido | 0=pendente
        dv: '19/01/2023', // data de vencimento
        db: '', // data do debito/recebimento
        categoria: 'Energia',
    },
    {
        id: 2,
        descricao: 'Telefone',
        valor: '60,00',
        tipo: 0, // 1=receber | 0=pagar
        situacao: 0, // 1=cocluido | 0=pendente
        dv: '12/01/2023', // data de vencimento
        db: '', // data do debito/recebimento
        categoria: 'Telefone',
    },
]

export default function ToBePaid() {
    return(
        <View style={styles_global.container}>
            {/* <StatusBar/> */}
            <PeriodFilter/>
            <FlatList
                data={list}
                keyExtractor={ (item) => String(item.id)}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => <ListItem data={item} onPress={null}/>}
            />
        </View>
    );
}
