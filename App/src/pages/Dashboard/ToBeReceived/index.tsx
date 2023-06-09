import React, { useState, useEffect }from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem } from "../../../components/List";
import { PeriodFilter } from "../../../components/Filter";
import styles_global from '../../style';

const list = [
    {
        id: 1,
        user_id: 1,
        description: 'Emprestimo fulano',
        value: '2650,00',
        type: 1, // 1=receber | 0=pagar
        status: 0, // 1=cocluido | 0=pendente
        expiration_date: '2023-01-15', // data de vencimento
        debit_date: '', // data do debito/recebimento
        category: 'Salário',
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
                    user_id: item.user_id,
                    description:item.description,
                    value: item.value,
                    type: item.type,
                    status: item.status,
                    expiration_date: item.expiration_date, 
                    debit_date: item.debit_date,
                    category: item.category,
                }})
            }/>}
        />
    </View>
    );
}