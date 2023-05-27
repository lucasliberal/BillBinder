import React from 'react';
import { StyleSheet, StatusBar, View, FlatList } from 'react-native';
import { PeriodFilter } from '../../../components/Filter';
import { ListItem } from '../../../components/List';
import styles_global from '../../style';

const list = [
    {
        id: 1,
        descricao: 'Salário',
        valor: '3160,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '01/01/2023', // data de vencimento
        db: '01/01/2023', // data do debito/recebimento
        categoria: 'Salário',
    },
    {
        id: 2,
        descricao: 'Cartão',
        valor: '987,00',
        tipo: 0, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '13/01/2023', // data de vencimento
        db: '10/01/2023', // data do debito/recebimento
        categoria: 'Cartão',
    },
    {
        id: 3,
        descricao: 'Aluguel',
        valor: '1200,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '06/01/2023', // data de vencimento
        db: '06/01/2023', // data do debito/recebimento
        categoria: 'Aluguel',
    },
    {
        id: 4,
        descricao: 'Internet',
        valor: '150,00',
        tipo: 0, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '16/01/2023', // data de vencimento
        db: '16/01/2023', // data do debito/recebimento
        categoria: 'Internet',
    }
]

export default function Caixa({navigation}) {
    return(
        <View style={styles_global.container}>
            <StatusBar/>
            <PeriodFilter/>
            <FlatList
                data={list}
                keyExtractor={ (item) => String(item.id)}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => <ListItem data={item} onPress={() => navigation.navigate('BillInformation', {params: {id:item.descricao}})}/>}
            />
        </View>
    );
}