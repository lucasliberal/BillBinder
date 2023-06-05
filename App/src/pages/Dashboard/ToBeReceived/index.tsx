import React, { useState, useEffect }from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem } from "../../../components/List";
import { PeriodFilter } from "../../../components/Filter";
import styles_global from '../../style';

const list = [
    {
        id: 1,
        descricao: 'Emprestimo fulano',
        valor: '2650,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 0, // 1=cocluido | 0=pendente
        dv: '2023-01-15', // data de vencimento
        db: '', // data do debito/recebimento
        categoria: 'Salário',
        status: 0
    },
];

export default function ToBeReceived({navigation}) {


    const [initDate, setInitDate] = useState();
    const [endDate, setEndDate] = useState();
        
    const onChangeDate = (initialDate, endingDate) => {
        setInitDate(initialDate);
        setEndDate(endingDate);
    } 

    useEffect(() => {
        //executa o comando após a seleção do período
        console.log('********* TELA A RECEBER **********');
        console.log('De: ' + initDate);
        console.log('Até: ' + endDate);
    }), [initDate, endDate];

    return(
        <View style={styles_global.container}>
        <PeriodFilter onChangeDate={onChangeDate}/>
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
                    category: item.categoria,
                    status: item.status
                }})
            }/>}
        />
    </View>
    );
}