import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem } from "../../../components/List";
import { PeriodFilter } from "../../../components/Filter";
import styles_global from '../../style';

export default function ToBeReceived({navigation}) {

    const list = [
        {
            id: 1,
            descricao: 'Emprestimo fulano',
            valor: '2650,00',
            tipo: 1, // 1=receber | 0=pagar
            situacao: 0, // 1=cocluido | 0=pendente
            dv: '15/01/2023', // data de vencimento
            db: '', // data do debito/recebimento
            categoria: 'Salário',
        },
    ];

    return(
        <View style={styles_global.container}>
        <PeriodFilter/>
        <FlatList
            data={list}
            keyExtractor={ (item) => String(item.id)}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => <ListItem data={item}
            onPress={() => navigation.navigate('BillInformation', {
                item: {
                    id:item.id, 
                    description:item.descricao,
                    value: item.valor,
                    type: item.tipo,
                    situation: item.situacao,
                    dv: item.dv, 
                    db: item.db,
                    category: item.categoria
                }})
            }/>}
        />
    </View>
    );
}